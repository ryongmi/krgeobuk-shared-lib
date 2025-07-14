import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom, timeout, retry, catchError, throwError, timer } from 'rxjs';

import type {
  TcpClientConfig,
  TcpMessagePattern,
  TcpMessagePayload,
  TcpOperationResponse,
} from '../types/index.js';

/**
 * TCP 클라이언트 베이스 클래스
 *
 * 책임:
 * - TCP 통신의 공통 로직 제공
 * - 재시도 및 타임아웃 처리
 * - 에러 처리 및 로깅
 * - 폴백 메커니즘 지원
 */
@Injectable()
export abstract class TcpClientBase {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    protected readonly client: ClientProxy,
    protected readonly config: TcpClientConfig
  ) {}

  /**
   * TCP 메시지 전송 (재시도 및 타임아웃 지원)
   * @param pattern 메시지 패턴
   * @param payload 전송할 데이터
   * @returns 응답 데이터
   */
  protected async sendMessage<T, R>(pattern: TcpMessagePattern, payload: T): Promise<R> {
    const startTime = Date.now();

    try {
      this.logger.debug('TCP message sending', {
        service: this.config.serviceName,
        pattern,
        hasPayload: !!payload,
      });

      const messagePayload: TcpMessagePayload<T> = {
        data: payload,
        timestamp: Date.now(),
        traceId: this.generateTraceId(),
      };

      const result = await firstValueFrom(
        this.client.send<R>(pattern, messagePayload).pipe(
          timeout(this.config.timeout.requestTimeout),
          retry({
            count: this.config.retry.maxRetries,
            delay: (error, retryCount) => {
              const retryDelay =
                this.config.retry.retryDelay *
                Math.pow(this.config.retry.backoffMultiplier, retryCount - 1);

              this.logger.warn('TCP message retry', {
                service: this.config.serviceName,
                pattern,
                retryCount,
                delay: retryDelay,
                error: error.message,
              });

              return timer(retryDelay);
            },
          }),
          catchError((error) => {
            this.logger.error('TCP message failed', {
              service: this.config.serviceName,
              pattern,
              error: error instanceof Error ? error.message : String(error),
              processingTime: Date.now() - startTime,
            });
            return throwError(() => error);
          })
        )
      );

      this.logger.debug('TCP message success', {
        service: this.config.serviceName,
        pattern,
        processingTime: Date.now() - startTime,
      });

      return result;
    } catch (error: unknown) {
      if (this.config.enableFallback) {
        return this.handleFallback<R>(pattern, payload, error);
      }
      throw error;
    }
  }

  /**
   * 병렬 TCP 메시지 전송 (기존 방식)
   * @param pattern 메시지 패턴
   * @param payloads 전송할 데이터 배열
   * @returns 응답 데이터 배열
   */
  protected async sendParallelMessage<T, R>(pattern: TcpMessagePattern, payloads: T[]): Promise<R[]> {
    if (payloads.length === 0) return [];

    this.logger.debug('TCP parallel message sending', {
      service: this.config.serviceName,
      pattern,
      batchSize: payloads.length,
    });

    const results = await Promise.allSettled(
      payloads.map((payload) => this.sendMessage<T, R>(pattern, payload))
    );

    const successResults: R[] = [];
    const failedCount = results.filter((result) => result.status === 'rejected').length;

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        successResults.push(result.value);
      } else {
        this.logger.warn('TCP parallel item failed', {
          service: this.config.serviceName,
          pattern,
          index,
          error: result.reason instanceof Error ? result.reason.message : String(result.reason) || 'Unknown error',
        });
      }
    });

    this.logger.debug('TCP parallel message completed', {
      service: this.config.serviceName,
      pattern,
      total: payloads.length,
      success: successResults.length,
      failed: failedCount,
    });

    return successResults;
  }

  /**
   * 진짜 배치 TCP 메시지 전송 (한번에 전송)
   * @param pattern 메시지 패턴
   * @param batchPayload 배치 데이터
   * @returns 배치 응답 데이터
   */
  protected async sendBatchMessage<T, R>(pattern: TcpMessagePattern, batchPayload: T): Promise<R> {
    this.logger.debug('TCP batch message sending', {
      service: this.config.serviceName,
      pattern,
      isBatch: true,
    });

    return this.sendMessage<T, R>(pattern, batchPayload);
  }

  /**
   * 폴백 처리 (서브클래스에서 구현)
   * @param pattern 실패한 메시지 패턴
   * @param payload 원본 페이로드
   * @param error 발생한 에러
   * @returns 폴백 결과
   */
  protected abstract handleFallback<R>(
    pattern: TcpMessagePattern,
    payload: unknown,
    error: unknown
  ): Promise<R>;

  /**
   * 헬스체크 메시지 전송
   * @returns 서비스 상태
   */
  async healthCheck(): Promise<TcpOperationResponse> {
    try {
      return await this.sendMessage<void, TcpOperationResponse>('health.check', undefined);
    } catch (error: unknown) {
      this.logger.error('Health check failed', {
        service: this.config.serviceName,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return { success: false, message: 'Service unavailable' };
    }
  }

  /**
   * 추적 ID 생성
   * @returns 고유한 추적 ID
   */
  private generateTraceId(): string {
    return `${this.config.serviceName}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
