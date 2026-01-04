import { ErrorClassifier } from './error-classifier.js';
import { RetryOptions, DEFAULT_RETRY_OPTIONS } from '../interfaces/retry-options.interface.js';

/**
 * 스마트 재시도 유틸리티
 *
 * Exponential backoff와 오류 분류를 통한 지능형 재시도 로직을 제공합니다.
 */
export class RetryUtil {
  /**
   * 재시도 로직과 함께 함수를 실행합니다.
   *
   * @param stepName - 단계 이름 (로깅용)
   * @param fn - 실행할 함수
   * @param options - 재시도 옵션
   * @param onRetry - 재시도 시 호출될 콜백 (optional)
   * @returns 함수 실행 결과
   * @throws 최대 재시도 횟수 초과 또는 영구적 오류 시 예외 발생
   */
  static async executeWithRetry<T>(
    stepName: string,
    fn: () => Promise<T>,
    options: Partial<RetryOptions> = {},
    onRetry?: (attempt: number, error: any) => Promise<void>
  ): Promise<T> {
    const config: RetryOptions = { ...DEFAULT_RETRY_OPTIONS, ...options };
    let lastError: any;

    for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
      try {
        // 타임아웃과 함께 함수 실행
        const result = await Promise.race([fn(), this.createTimeout(config.timeoutMs, stepName)]);

        // 성공 시 (재시도 했다면 로그)
        if (attempt > 1) {
          console.log(`[RetryUtil] ${stepName} succeeded after ${attempt} attempts`);
        }

        return result as T;
      } catch (error) {
        lastError = error;

        // 오류 분류
        const classification = ErrorClassifier.classify(error);
        const isLastAttempt = attempt === config.maxRetries;

        // 로깅
        console.warn(`[RetryUtil] ${stepName} failed (attempt ${attempt}/${config.maxRetries})`, {
          error: error instanceof Error ? error.message : String(error),
          classification,
        });

        // 영구적 오류 또는 마지막 시도인 경우 즉시 실패
        if (classification.isPermanent || isLastAttempt) {
          throw error;
        }

        // 재시도 불가능한 오류인 경우 즉시 실패
        if (!classification.isRetryable) {
          throw error;
        }

        // 재시도 콜백 실행
        if (onRetry) {
          try {
            await onRetry(attempt, error);
          } catch (callbackError) {
            console.error('[RetryUtil] onRetry callback failed', callbackError);
          }
        }

        // 재시도 전 대기 (exponential backoff)
        const delayMs = this.calculateDelay(attempt, config);
        console.log(`[RetryUtil] Retrying ${stepName} after ${delayMs}ms...`);
        await this.sleep(delayMs);
      }
    }

    // 모든 재시도 실패 시
    throw lastError;
  }

  /**
   * 지연 시간을 계산합니다.
   *
   * @param attempt - 현재 시도 횟수 (1부터 시작)
   * @param options - 재시도 옵션
   * @returns 지연 시간 (밀리초)
   */
  private static calculateDelay(attempt: number, options: RetryOptions): number {
    const { baseDelayMs, maxDelayMs, backoffType = 'exponential' } = options;

    let delay: number;

    switch (backoffType) {
      case 'exponential':
        // 지수 백오프: 1s, 2s, 4s, 8s, ...
        delay = Math.pow(2, attempt - 1) * baseDelayMs;
        break;

      case 'linear':
        // 선형 백오프: 1s, 2s, 3s, 4s, ...
        delay = attempt * baseDelayMs;
        break;

      case 'constant':
        // 고정 지연: 1s, 1s, 1s, ...
        delay = baseDelayMs;
        break;

      default:
        delay = baseDelayMs;
    }

    // 최대 지연 시간 제한
    return Math.min(delay, maxDelayMs);
  }

  /**
   * 타임아웃 Promise를 생성합니다.
   *
   * @param ms - 타임아웃 시간 (밀리초)
   * @param stepName - 단계 이름 (에러 메시지용)
   * @returns 타임아웃 Promise
   */
  private static createTimeout(ms: number, stepName: string): Promise<never> {
    return new Promise((_, reject) =>
      setTimeout(() => {
        reject(new Error(`${stepName} timeout after ${ms}ms`));
      }, ms)
    );
  }

  /**
   * 지정된 시간만큼 대기합니다.
   *
   * @param ms - 대기 시간 (밀리초)
   * @returns Promise
   */
  private static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
