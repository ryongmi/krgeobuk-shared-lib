import { Logger } from '@nestjs/common';

import { RetryUtil } from '../retry/retry.util.js';
import { SagaStep } from './saga-step.interface.js';
import { SagaContext } from './saga-context.interface.js';

/**
 * Saga 오케스트레이터 추상 베이스 클래스
 *
 * 분산 트랜잭션을 Saga 패턴으로 관리합니다.
 * - 순차적 단계 실행
 * - 스마트 재시도 (exponential backoff)
 * - 실패 시 보상 트랜잭션 (역순 롤백)
 *
 * @template TRequest - 요청 데이터 타입
 * @template TSnapshot - 스냅샷 데이터 타입 (롤백용)
 */
export abstract class BaseSagaOrchestrator<TRequest, TSnapshot> {
  protected readonly logger: Logger;

  constructor(loggerContext?: string) {
    this.logger = new Logger(loggerContext || this.constructor.name);
  }

  /**
   * Saga 단계 목록을 반환합니다.
   *
   * @returns Saga 단계 배열
   */
  protected abstract getSteps(): SagaStep<TRequest>[];

  /**
   * 롤백용 스냅샷을 생성합니다.
   *
   * @param request - 요청 데이터
   * @returns 스냅샷 데이터
   */
  protected abstract createSnapshot(request: TRequest): Promise<TSnapshot>;

  /**
   * 보상 트랜잭션을 실행합니다 (역순 롤백).
   *
   * @param completedSteps - 완료된 단계 목록 (역순)
   * @param snapshot - 스냅샷 데이터
   */
  protected abstract compensate(completedSteps: string[], snapshot: TSnapshot): Promise<void>;

  /**
   * Saga를 실행합니다.
   *
   * @param request - 요청 데이터
   * @returns 실행 컨텍스트
   * @throws 실패 시 예외 발생 (보상 트랜잭션 실행 후)
   */
  async execute(request: TRequest): Promise<SagaContext> {
    const context: SagaContext = {
      startedAt: new Date(),
      completedSteps: [],
      totalRetries: 0,
    };

    const steps = this.getSteps();
    let snapshot: TSnapshot | null = null;

    this.logger.log(`Starting Saga with ${steps.length} steps`, {
      requestType: (request as any)?.constructor?.name ?? 'unknown',
    });

    try {
      // 1. 스냅샷 생성
      snapshot = await this.createSnapshot(request);
      this.logger.debug('Snapshot created successfully');

      // 2. 각 단계 순차 실행
      for (const step of steps) {
        context.currentStep = step.name;

        this.logger.log(`Executing step: ${step.name}`);

        try {
          // 재시도 로직과 함께 단계 실행
          await RetryUtil.executeWithRetry(
            step.name,
            () => step.execute(request),
            step.retryOptions,
            async (attempt, error) => {
              context.totalRetries++;

              // onRetry 콜백 실행
              if (step.onRetry) {
                await step.onRetry(attempt, error);
              }
            }
          );

          // 단계 완료
          context.completedSteps.push(step.name);
          this.logger.log(`Step completed: ${step.name}`, {
            completedSteps: context.completedSteps.length,
            totalSteps: steps.length,
          });
        } catch (error) {
          this.logger.error(`Step failed: ${step.name}`, {
            error: error instanceof Error ? error.message : String(error),
            completedSteps: context.completedSteps,
          });

          throw error; // 보상 트랜잭션으로 진행
        }
      }

      // 3. 모든 단계 성공
      this.logger.log('Saga completed successfully', {
        totalSteps: steps.length,
        totalRetries: context.totalRetries,
        duration: Date.now() - context.startedAt.getTime(),
      });

      return context;
    } catch (error) {
      // 4. 실패 시 보상 트랜잭션 실행
      this.logger.warn('Saga failed, starting compensation', {
        completedSteps: context.completedSteps,
        failedStep: context.currentStep,
      });

      if (snapshot) {
        try {
          // 역순으로 보상 실행
          await this.compensate([...context.completedSteps].reverse(), snapshot);

          this.logger.log('Compensation completed successfully');
        } catch (compensationError) {
          this.logger.error('Compensation failed', {
            error:
              compensationError instanceof Error
                ? compensationError.message
                : String(compensationError),
            completedSteps: context.completedSteps,
          });

          // 보상 실패는 심각한 문제 - 관리자 개입 필요
          throw new Error(
            `Saga compensation failed: ${compensationError instanceof Error ? compensationError.message : String(compensationError)}`
          );
        }
      }

      // 원래 오류 재발생
      throw error;
    }
  }

  /**
   * Saga 실행을 시도하고 결과를 반환합니다.
   *
   * @param request - 요청 데이터
   * @returns 성공 여부와 컨텍스트
   */
  async tryExecute(
    request: TRequest
  ): Promise<{ success: boolean; context?: SagaContext; error?: Error }> {
    try {
      const context = await this.execute(request);
      return { success: true, context };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }
}
