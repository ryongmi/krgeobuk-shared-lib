import { Injectable, Logger } from '@nestjs/common';
import type { CacheOptions, AggregationResult } from '../types/index.js';

/**
 * 도메인별 캐싱 전략
 * 
 * 책임:
 * - 메모리 기반 캐싱 로직
 * - TTL 관리
 * - 캐시 무효화 정책
 * - 캐시 히트율 모니터링
 */
@Injectable()
export class CacheStrategy {
  private readonly logger = new Logger(CacheStrategy.name);
  private readonly cache = new Map<string, CacheEntry>();
  private readonly stats = {
    hits: 0,
    misses: 0,
    evictions: 0,
  };

  /**
   * 캐시에서 값 조회
   * @param key 캐시 키
   * @param options 캐시 옵션
   * @returns 캐시된 값 또는 null
   */
  get<T>(key: string, options?: CacheOptions): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      this.logger.debug('Cache miss', { key });
      return null;
    }

    // TTL 체크
    if (this.isExpired(entry, options?.ttl)) {
      this.cache.delete(key);
      this.stats.misses++;
      this.stats.evictions++;
      this.logger.debug('Cache expired', { key, ttl: options?.ttl });
      return null;
    }

    // 리프레시 임계값 체크
    if (options?.enableRefresh && this.shouldRefresh(entry, options)) {
      this.logger.debug('Cache refresh needed', { 
        key, 
        age: Date.now() - entry.timestamp,
        threshold: options.refreshThreshold 
      });
      // 비동기 리프레시 트리거 (실제 구현에서는 이벤트 발행)
    }

    this.stats.hits++;
    entry.lastAccessed = Date.now();
    this.logger.debug('Cache hit', { key, age: Date.now() - entry.timestamp });
    
    return entry.value as T;
  }

  /**
   * 캐시에 값 저장
   * @param key 캐시 키
   * @param value 저장할 값
   * @param options 캐시 옵션
   */
  set<T>(key: string, value: T, options?: CacheOptions): void {
    // 최대 크기 체크
    if (options?.maxSize && this.cache.size >= options.maxSize) {
      this.evictLRU();
    }

    const entry: CacheEntry = {
      value,
      timestamp: Date.now(),
      lastAccessed: Date.now(),
      ttl: options?.ttl || 300, // 기본 5분
    };

    this.cache.set(key, entry);
    
    this.logger.debug('Cache set', { 
      key, 
      ttl: entry.ttl,
      cacheSize: this.cache.size 
    });
  }

  /**
   * 캐시에서 값 삭제
   * @param key 캐시 키
   */
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.logger.debug('Cache deleted', { key });
    }
    return deleted;
  }

  /**
   * 패턴으로 캐시 무효화
   * @param pattern 키 패턴 (정규식)
   */
  invalidateByPattern(pattern: RegExp): number {
    let deletedCount = 0;
    
    for (const key of this.cache.keys()) {
      if (pattern.test(key)) {
        this.cache.delete(key);
        deletedCount++;
      }
    }

    this.logger.debug('Cache invalidated by pattern', { 
      pattern: pattern.source, 
      deletedCount 
    });
    
    return deletedCount;
  }

  /**
   * 전체 캐시 클리어
   */
  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    this.logger.debug('Cache cleared', { previousSize: size });
  }

  /**
   * 캐시 통계 조회
   * @returns 캐시 히트율 및 통계
   */
  getStats(): CacheStats {
    const total = this.stats.hits + this.stats.misses;
    const hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0;

    return {
      ...this.stats,
      hitRate: Math.round(hitRate * 100) / 100,
      cacheSize: this.cache.size,
    };
  }

  /**
   * 캐시와 함께 결과 래핑
   * @param data 결과 데이터
   * @param fromCache 캐시에서 가져왔는지 여부
   * @param processingTime 처리 시간
   * @returns 집계 결과
   */
  wrapResult<T>(
    data: T,
    fromCache: boolean = false,
    processingTime: number = 0,
  ): AggregationResult<T> {
    return {
      data,
      enriched: true,
      fromCache,
      processingTime,
    };
  }

  /**
   * 캐시 키 생성 헬퍼
   * @param prefix 접두사
   * @param ...parts 키 구성 요소들
   * @returns 생성된 캐시 키
   */
  generateKey(prefix: string, ...parts: (string | number)[]): string {
    return [prefix, ...parts].join(':');
  }

  /**
   * TTL 만료 체크
   * @param entry 캐시 엔트리
   * @param customTtl 커스텀 TTL
   * @returns 만료 여부
   */
  private isExpired(entry: CacheEntry, customTtl?: number): boolean {
    const ttl = customTtl || entry.ttl;
    return Date.now() - entry.timestamp > ttl * 1000;
  }

  /**
   * 리프레시 필요 여부 체크
   * @param entry 캐시 엔트리
   * @param options 캐시 옵션
   * @returns 리프레시 필요 여부
   */
  private shouldRefresh(entry: CacheEntry, options: CacheOptions): boolean {
    const age = Date.now() - entry.timestamp;
    const ttlMs = entry.ttl * 1000;
    const refreshThreshold = (options.refreshThreshold / 100) * ttlMs;
    
    return age > refreshThreshold;
  }

  /**
   * LRU 방식으로 캐시 엔트리 제거
   */
  private evictLRU(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.stats.evictions++;
      this.logger.debug('LRU eviction', { evictedKey: oldestKey });
    }
  }
}

interface CacheEntry {
  value: unknown;
  timestamp: number;
  lastAccessed: number;
  ttl: number; // seconds
}

interface CacheStats {
  hits: number;
  misses: number;
  evictions: number;
  hitRate: number; // percentage
  cacheSize: number;
}