import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { TokenManager } from '../token/TokenManager.js';
import { SecuritySession, SecurityLogger, RateLimiter } from '../security/index.js';
import {
  createRequestInterceptor,
  createRequestErrorInterceptor,
  createResponseInterceptor,
  createResponseErrorInterceptor,
} from '../interceptors/index.js';
import type {
  HttpClientConfig,
  MultiServerConfig,
  ServerType,
  SecurityPolicy,
  TokenRefreshConfig,
  ApiResponse,
} from '../types/index.js';

export class HttpClient {
  private instances: Map<ServerType, AxiosInstance> = new Map();
  private tokenManager: TokenManager;
  private rateLimiter: RateLimiter;
  private securityPolicy: SecurityPolicy;

  constructor(
    config: MultiServerConfig,
    tokenRefreshConfig: TokenRefreshConfig,
    securityPolicy?: Partial<SecurityPolicy>
  ) {
    // 토큰 매니저 초기화
    this.tokenManager = TokenManager.getInstance(tokenRefreshConfig);

    // 레이트 리미터 초기화
    this.rateLimiter = new RateLimiter(
      securityPolicy?.rateLimitConfig?.maxAttempts || 100,
      securityPolicy?.rateLimitConfig?.windowMs || 60 * 1000
    );

    // 보안 정책 설정
    this.securityPolicy = {
      allowedOrigins: this.getAllowedOrigins(),
      enableCSRF: true,
      enableInputValidation: true,
      enableSecurityLogging: true,
      ...securityPolicy,
    };

    // 각 서버별 Axios 인스턴스 생성
    this.createInstances(config);

    // 보안 세션 초기화
    if (!SecuritySession.validateSession()) {
      SecuritySession.generateSession();
    }
  }

  private createInstances(config: MultiServerConfig): void {
    Object.entries(config).forEach(([serverType, serverConfig]) => {
      const instance = this.createAxiosInstance(serverConfig);
      this.instances.set(serverType as ServerType, instance);
    });
  }

  private createAxiosInstance(config: HttpClientConfig): AxiosInstance {
    const instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      withCredentials: config.withCredentials !== false, // 기본값 true
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...config.headers,
      },
    });

    // 요청 인터셉터 설정
    instance.interceptors.request.use(
      createRequestInterceptor(this.tokenManager, this.securityPolicy.allowedOrigins),
      createRequestErrorInterceptor()
    );

    // 응답 인터셉터 설정
    instance.interceptors.response.use(
      createResponseInterceptor(this.tokenManager),
      createResponseErrorInterceptor(this.tokenManager)
    );

    return instance;
  }

  // 특정 서버로 GET 요청
  async get<T = unknown>(
    serverType: ServerType,
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const instance = this.getServerInstance(serverType);
    const response = await instance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  // 특정 서버로 POST 요청
  async post<T = unknown>(
    serverType: ServerType,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    // 레이트 리미터 체크
    const identifier = this.getRequestIdentifier(url);
    if (!this.rateLimiter.isAllowed(identifier)) {
      SecurityLogger.logNetworkSecurityEvent('rate_limit_exceeded', {
        url,
        identifier,
      });
      throw new Error('Rate limit exceeded');
    }

    const instance = this.getServerInstance(serverType);
    const response = await instance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  // 특정 서버로 PUT 요청
  async put<T = unknown>(
    serverType: ServerType,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const instance = this.getServerInstance(serverType);
    const response = await instance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  // 특정 서버로 DELETE 요청
  async delete<T = unknown>(
    serverType: ServerType,
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const instance = this.getServerInstance(serverType);
    const response = await instance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // 특정 서버로 PATCH 요청
  async patch<T = unknown>(
    serverType: ServerType,
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const instance = this.getServerInstance(serverType);
    const response = await instance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  // 서버 인스턴스 가져오기
  private getServerInstance(serverType: ServerType): AxiosInstance {
    const instance = this.instances.get(serverType);
    if (!instance) {
      throw new Error(`Server instance for ${serverType} not found`);
    }
    return instance;
  }

  // 요청 식별자 생성 (레이트 리미터용)
  private getRequestIdentifier(url: string): string {
    // 세션 ID와 URL을 조합하여 고유 식별자 생성
    const sessionId = SecuritySession.getSessionId() || 'anonymous';
    return `${sessionId}:${url}`;
  }

  // 토큰 매니저 접근자
  getTokenManager(): TokenManager {
    return this.tokenManager;
  }

  // 특정 서버의 베이스 URL 업데이트
  updateServerConfig(serverType: ServerType, config: Partial<HttpClientConfig>): void {
    const instance = this.instances.get(serverType);
    if (instance) {
      if (config.baseURL) {
        instance.defaults.baseURL = config.baseURL;
      }
      if (config.timeout) {
        instance.defaults.timeout = config.timeout;
      }
      if (config.headers) {
        instance.defaults.headers = { ...instance.defaults.headers, ...config.headers };
      }
    }
  }

  // 보안 정책 업데이트
  updateSecurityPolicy(policy: Partial<SecurityPolicy>): void {
    this.securityPolicy = { ...this.securityPolicy, ...policy };

    // 레이트 리미터 설정 업데이트
    if (policy.rateLimitConfig) {
      this.rateLimiter.updateConfig(
        policy.rateLimitConfig.maxAttempts,
        policy.rateLimitConfig.windowMs
      );
    }
  }

  // 세션 갱신
  refreshSession(): void {
    SecuritySession.refreshSession();
  }

  // 모든 서버의 인스턴스 목록 가져오기
  getAvailableServers(): ServerType[] {
    return Array.from(this.instances.keys());
  }

  // 특정 서버의 설정 정보 가져오기
  getServerConfig(serverType: ServerType): Partial<HttpClientConfig> {
    const instance = this.instances.get(serverType);
    if (!instance) {
      throw new Error(`Server instance for ${serverType} not found`);
    }

    return {
      baseURL: instance.defaults.baseURL,
      timeout: instance.defaults.timeout,
      headers: instance.defaults.headers as Record<string, string>,
    };
  }

  // 환경변수에서 허용된 오리진 목록 가져오기
  private getAllowedOrigins(): string[] {
    const envOrigins = process.env.ALLOWED_ORIGINS;
    
    if (!envOrigins) {
      // 환경변수가 없을 때 기본값 사용
      return ['localhost', 'krgeobuk.com', '127.0.0.1'];
    }

    // 콤마로 구분된 문자열을 배열로 파싱
    return envOrigins
      .split(',')
      .map(origin => origin.trim())
      .filter(origin => origin.length > 0);
  }

  // 정리 함수
  cleanup(): void {
    this.tokenManager.cleanup();
    this.rateLimiter.cleanup();
    SecuritySession.clearSession();
  }
}
