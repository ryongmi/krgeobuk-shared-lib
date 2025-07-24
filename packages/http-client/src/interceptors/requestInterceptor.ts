import type { InternalAxiosRequestConfig } from 'axios';

import {
  SecuritySession,
  SecurityLogger,
  validateURL,
  validateApiRequestData,
} from '../security/index.js';
import type { TokenManager } from '../token/TokenManager.js';

/**
 * 보안 강화된 요청 인터셉터 생성 함수
 */
export function createRequestInterceptor(
  tokenManager: TokenManager,
  allowedOrigins: string[] = ['localhost', 'krgeobuk.com', '127.0.0.1']
) {
  return (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // CSRF 토큰 추가
    const csrfToken = SecuritySession.getCSRFToken();
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    // Authorization 헤더 추가
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 요청 URL 검증
    if (config.url && config.baseURL) {
      const fullUrl = new URL(config.url, config.baseURL).toString();
      if (!validateURL(fullUrl, allowedOrigins)) {
        SecurityLogger.logSecurityEvent('INVALID_REQUEST_URL', {
          url: fullUrl,
          baseURL: config.baseURL,
        });
        throw new Error('Invalid request URL');
      }
    }

    // 요청 데이터 검증
    if (config.data) {
      // API 요청 데이터 보안 검증 (JSON 객체 고려)
      if (!validateApiRequestData(config.data)) {
        SecurityLogger.logSecurityEvent('SUSPICIOUS_INPUT_DETECTED', {
          data: JSON.stringify(config.data).substring(0, 100), // 로그에는 일부만 기록
        });
        throw new Error('Invalid input data detected');
      }
    }

    // 요청 ID 추가 (추적용)
    config.headers['X-Request-ID'] = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // User-Agent 헤더 추가 (브라우저에서 자동으로 설정되지 않는 경우)
    if (!config.headers['User-Agent'] && typeof navigator !== 'undefined') {
      config.headers['User-Agent'] = navigator.userAgent;
    }

    return config;
  };
}

/**
 * 요청 에러 인터셉터
 */
export function createRequestErrorInterceptor() {
  return (error: unknown): Promise<never> => {
    SecurityLogger.logSecurityEvent('REQUEST_INTERCEPTOR_ERROR', { error });
    return Promise.reject(error);
  };
}
