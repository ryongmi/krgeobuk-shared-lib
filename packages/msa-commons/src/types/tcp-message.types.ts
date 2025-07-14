/**
 * TCP 메시지 관련 공통 타입 정의
 */

export interface TcpOperationResponse {
  success: boolean;
  message?: string;
}

export interface TcpErrorResponse {
  success: false;
  error: string;
  code?: string;
}

export interface TcpRetryConfig {
  maxRetries: number;
  retryDelay: number;
  backoffMultiplier: number;
}

export interface TcpTimeoutConfig {
  requestTimeout: number;
  connectionTimeout: number;
}

export interface TcpClientConfig {
  serviceName: string;
  retry: TcpRetryConfig;
  timeout: TcpTimeoutConfig;
  enableFallback: boolean;
}

export type TcpMessagePattern = string;

export interface TcpMessagePayload<T = unknown> {
  data: T;
  timestamp?: number;
  traceId?: string;
}