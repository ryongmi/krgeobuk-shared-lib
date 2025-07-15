import { Injectable, Logger } from '@nestjs/common';

import { CacheStrategy } from '../strategies/cache.strategy.js';
import { TcpFallbackStrategy } from '../strategies/tcp-fallback.strategy.js';
import type {
  EnrichmentContext,
  AggregationResult,
  CacheOptions,
  FallbackOptions,
} from '../types/index.js';

/**
 * 기본 데이터 집계 클래스
 *
 * 책임:
 * - 외부 데이터와의 통합 및 집계
 * - 캐시 전략 적용
 * - 폴백 처리
 * - 성능 모니터링
 */
@Injectable()
export class BaseEnrichmentAggregator {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    protected readonly cacheStrategy: CacheStrategy,
    protected readonly fallbackStrategy: TcpFallbackStrategy
  ) {}

  /**
   * 단일 엔터티 enrichment
   * @param entity 기본 엔터티
   * @param context enrichment 컨텍스트
   * @param enrichFn enrichment 함수
   * @param cacheOptions 캐시 옵션
   * @returns enriched 결과
   */
  async enrichSingle<T, R>(
    entity: T,
    context: EnrichmentContext,
    enrichFn: (entity: T, context: EnrichmentContext) => Promise<R>,
    cacheOptions?: CacheOptions
  ): Promise<AggregationResult<R>> {
    const startTime = Date.now();
    const cacheKey = this.generateCacheKey(context, entity);

    // 캐시 확인
    if (cacheOptions) {
      const cached = this.cacheStrategy.get<R>(cacheKey, cacheOptions);
      if (cached) {
        return this.cacheStrategy.wrapResult(cached, true, Date.now() - startTime);
      }
    }

    try {
      this.logger.debug('Starting single enrichment', {
        sourceType: context.sourceType,
        sourceId: context.sourceId,
      });

      const result = await enrichFn(entity, context);

      // 캐시 저장
      if (cacheOptions && result) {
        this.cacheStrategy.set(cacheKey, result, cacheOptions);
      }

      const processingTime = Date.now() - startTime;

      this.logger.debug('Single enrichment completed', {
        sourceType: context.sourceType,
        sourceId: context.sourceId,
        processingTime,
      });

      return this.cacheStrategy.wrapResult(result, false, processingTime);
    } catch (error: unknown) {
      this.logger.error('Single enrichment failed', {
        sourceType: context.sourceType,
        sourceId: context.sourceId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      throw error;
    }
  }

  /**
   * 배치 엔터티 enrichment
   * @param entities 기본 엔터티 배열
   * @param context enrichment 컨텍스트
   * @param enrichFn enrichment 함수
   * @param cacheOptions 캐시 옵션
   * @returns enriched 결과 배열
   */
  async enrichBatch<T, R>(
    entities: T[],
    context: EnrichmentContext,
    enrichFn: (entities: T[], context: EnrichmentContext) => Promise<R[]>,
    cacheOptions?: CacheOptions
  ): Promise<AggregationResult<R[]>> {
    const startTime = Date.now();

    if (entities.length === 0) {
      return this.cacheStrategy.wrapResult([], false, 0);
    }

    try {
      this.logger.debug('Starting batch enrichment', {
        sourceType: context.sourceType,
        batchSize: entities.length,
      });

      // 캐시에서 조회할 수 있는 것들 먼저 확인
      const { cached, uncached } = await this.splitCachedAndUncached(
        entities,
        context,
        cacheOptions
      );

      let enrichedResults: R[] = [];

      // 캐시되지 않은 항목들만 enrichment 수행
      if (uncached.entities.length > 0) {
        const freshResults = await enrichFn(uncached.entities, context);

        // 새로 조회한 결과를 캐시에 저장
        if (cacheOptions) {
          freshResults.forEach((result, index) => {
            const entity = uncached.entities[index];
            const cacheKey = this.generateCacheKey(context, entity);
            this.cacheStrategy.set(cacheKey, result, cacheOptions);
          });
        }

        enrichedResults = [...(cached.results as R[]), ...freshResults];
      } else {
        enrichedResults = cached.results as R[];
      }

      const processingTime = Date.now() - startTime;

      this.logger.debug('Batch enrichment completed', {
        sourceType: context.sourceType,
        totalEntities: entities.length,
        fromCache: cached.results.length,
        freshlyEnriched: uncached.entities.length,
        processingTime,
      });

      return this.cacheStrategy.wrapResult(
        enrichedResults,
        cached.results.length > 0,
        processingTime
      );
    } catch (error: unknown) {
      this.logger.error('Batch enrichment failed', {
        sourceType: context.sourceType,
        batchSize: entities.length,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      throw error;
    }
  }

  /**
   * 폴백과 함께 안전한 enrichment
   * @param entities 기본 엔터티 배열
   * @param context enrichment 컨텍스트
   * @param enrichFn enrichment 함수
   * @param fallbackOptions 폴백 옵션
   * @param cacheOptions 캐시 옵션
   * @returns enriched 결과 (폴백 포함)
   */
  async enrichWithFallback<T, R>(
    entities: T[],
    context: EnrichmentContext,
    enrichFn: (entities: T[], context: EnrichmentContext) => Promise<R[]>,
    fallbackOptions: FallbackOptions<R[]>,
    cacheOptions?: CacheOptions
  ): Promise<AggregationResult<R[]>> {
    try {
      return await this.enrichBatch(entities, context, enrichFn, cacheOptions);
    } catch (error: unknown) {
      this.logger.warn('Enrichment failed, applying fallback', {
        sourceType: context.sourceType,
        batchSize: entities.length,
        fallbackStrategy: fallbackOptions.fallbackStrategy,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      const fallbackResult = (fallbackOptions.fallbackValue || []) as R[];

      return this.cacheStrategy.wrapResult(fallbackResult, false, 0);
    }
  }

  /**
   * 캐시된 항목과 캐시되지 않은 항목 분리
   * @param entities 엔터티 배열
   * @param context enrichment 컨텍스트
   * @param cacheOptions 캐시 옵션
   * @returns 분리된 결과
   */
  private async splitCachedAndUncached<T, R>(
    entities: T[],
    context: EnrichmentContext,
    cacheOptions?: CacheOptions
  ): Promise<{
    cached: { results: R[] };
    uncached: { entities: T[] };
  }> {
    const cached: R[] = [];
    const uncached: T[] = [];

    if (!cacheOptions) {
      return {
        cached: { results: [] as R[] },
        uncached: { entities },
      };
    }

    entities.forEach((entity) => {
      const cacheKey = this.generateCacheKey(context, entity);
      const cachedResult = this.cacheStrategy.get<R>(cacheKey, cacheOptions);

      if (cachedResult) {
        cached.push(cachedResult);
      } else {
        uncached.push(entity);
      }
    });

    return {
      cached: { results: cached },
      uncached: { entities: uncached },
    };
  }

  /**
   * 캐시 키 생성
   * @param context enrichment 컨텍스트
   * @param entity 엔터티
   * @returns 캐시 키
   */
  private generateCacheKey<T>(context: EnrichmentContext, entity: T): string {
    const entityId = this.extractEntityId(entity);
    return this.cacheStrategy.generateKey('enrichment', context.sourceType, entityId);
  }

  /**
   * 엔터티에서 ID 추출 (오버라이드 가능)
   * @param entity 엔터티
   * @returns 엔터티 ID
   */
  protected extractEntityId<T>(entity: T): string {
    // 기본적으로 id 필드를 찾음
    if (entity && typeof entity === 'object' && 'id' in entity) {
      return String((entity as { id: unknown }).id);
    }

    // 문자열인 경우 그대로 사용
    if (typeof entity === 'string') {
      return entity;
    }

    // 기타 경우 JSON으로 변환
    return JSON.stringify(entity);
  }
}
