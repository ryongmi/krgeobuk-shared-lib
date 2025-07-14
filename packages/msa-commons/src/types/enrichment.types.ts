/**
 * 데이터 집계 및 enrichment 관련 타입 정의
 */

export interface EnrichmentContext {
  sourceId: string;
  sourceType: string;
  requestId?: string;
  userId?: string;
}

export interface BatchProcessResult<T> {
  success: T[];
  failed: BatchProcessError[];
  total: number;
}

export interface BatchProcessError {
  id: string;
  error: string;
  retryable: boolean;
}

export interface FallbackOptions<T> {
  enableFallback: boolean;
  fallbackValue: T | null;
  fallbackStrategy: 'empty' | 'default' | 'cached' | 'custom';
}

export interface CacheOptions {
  ttl: number; // seconds
  maxSize: number;
  enableRefresh: boolean;
  refreshThreshold: number; // percentage
}

export interface AggregationResult<T> {
  data: T;
  enriched: boolean;
  fromCache: boolean;
  processingTime: number;
}