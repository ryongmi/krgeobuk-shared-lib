import { RetryOptions } from './retry-options.interface.js';

/**
 * Saga 단계 인터페이스
 *
 * @template TRequest - 요청 데이터 타입
 */
export interface SagaStep<TRequest> {
  /**
   * 단계 이름 (로깅 및 상태 추적용)
   */
  name: string;

  /**
   * 단계 실행 함수
   *
   * @param request - 요청 데이터
   * @returns Promise
   */
  execute: (request: TRequest) => Promise<void>;

  /**
   * 재시도 옵션
   */
  retryOptions?: Partial<RetryOptions>;

  /**
   * 재시도 시 호출될 콜백
   *
   * @param attempt - 현재 시도 횟수
   * @param error - 발생한 오류
   */
  onRetry?: (attempt: number, error: any) => Promise<void>;
}
