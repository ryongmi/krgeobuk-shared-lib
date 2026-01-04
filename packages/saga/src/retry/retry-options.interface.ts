/**
 * 재시도 옵션 인터페이스
 */
export interface RetryOptions {
  /**
   * 최대 재시도 횟수
   * @default 3
   */
  maxRetries: number;

  /**
   * 기본 지연 시간 (밀리초)
   * @default 1000
   */
  baseDelayMs: number;

  /**
   * 최대 지연 시간 (밀리초)
   * @default 5000
   */
  maxDelayMs: number;

  /**
   * 각 단계별 타임아웃 (밀리초)
   * @default 5000
   */
  timeoutMs: number;

  /**
   * 백오프 전략
   * - exponential: 지수 백오프 (1s, 2s, 4s, ...)
   * - linear: 선형 백오프 (1s, 2s, 3s, ...)
   * - constant: 고정 지연
   * @default 'exponential'
   */
  backoffType?: 'exponential' | 'linear' | 'constant';
}

/**
 * 기본 재시도 옵션
 */
export const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 3,
  baseDelayMs: 1000,
  maxDelayMs: 5000,
  timeoutMs: 5000,
  backoffType: 'exponential',
};
