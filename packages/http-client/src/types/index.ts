import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import type { JwtPayload as BaseJwtPayload } from '@krgeobuk/jwt/interfaces';
import type { ResponseFormat } from '@krgeobuk/core/interfaces';

// JWT 표준 필드를 포함한 디코딩된 토큰 구조
export interface DecodedJwtPayload extends BaseJwtPayload {
  iat: number; // 발행 시간 (issued at)
  exp: number; // 만료 시간 (expiration)
  sub?: string; // 주체 (subject) - 선택적 필드
}

// 기존 JwtPayload 타입을 공유 패키지에서 가져와서 재사용
export type JwtPayload = BaseJwtPayload;

// API 응답 타입 (core 패키지의 ResponseFormat 사용)
export type ApiResponse<T = unknown> = ResponseFormat<T>;

// 에러 응답 타입
export interface ApiErrorData {
  message?: string;
  errors?: string[] | Record<string, string[]>;
}

// 에러 객체 타입
export interface ApiError {
  config?: {
    url?: string;
    method?: string;
  };
  response?: {
    status?: number;
    data?: ApiErrorData;
    headers?: Record<string, string>;
  };
  message?: string;
  code?: string;
}

// HTTP 클라이언트 설정
export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  withCredentials?: boolean;
  headers?: Record<string, string>;
  allowedOrigins?: string[];
}

// 서버 타입
export type ServerType = 'auth' | 'authz' | 'portal';

// 멀티 서버 설정
export interface MultiServerConfig {
  auth: HttpClientConfig;
  authz: HttpClientConfig;
  portal: HttpClientConfig;
}

// 토큰 관리자 이벤트
export interface TokenEvent {
  type: 'tokenUpdated' | 'tokenCleared' | 'tokenExpired';
  data?: {
    accessToken?: string;
  };
}

// 보안 로그 엔트리
export interface SecurityLogEntry {
  timestamp: string;
  event: string;
  details: Record<string, unknown>;
  userAgent: string;
  url: string;
  sessionId: string;
}

// Axios 인터셉터 타입
export type RequestInterceptor = (
  config: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
export type ResponseInterceptor = (
  response: AxiosResponse<ApiResponse>
) => AxiosResponse<ApiResponse> | Promise<AxiosResponse<ApiResponse>>;
export type ErrorInterceptor = (error: unknown) => Promise<never>;

// 토큰 새로고침 설정
export interface TokenRefreshConfig {
  refreshUrl: string;
  refreshBeforeExpiry?: number; // 만료 전 몇 분전에 갱신할지 (기본: 5분)
}

// 보안 정책 설정
export interface SecurityPolicy {
  allowedOrigins: string[];
  enableCSRF: boolean;
  enableInputValidation: boolean;
  enableSecurityLogging: boolean;
  rateLimitConfig?: {
    maxAttempts: number;
    windowMs: number;
  };
}

// 인터셉터 설정
export interface InterceptorOptions {
  skipGlobalErrorHandler?: boolean;
  enableSecurityLogging?: boolean;
  customErrorHandler?: (error: ApiError) => void;
}
