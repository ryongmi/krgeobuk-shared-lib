import { Inject } from '@nestjs/common';

import type { Redis } from 'ioredis';

import { REDIS_CLIENT_TOKEN } from '../constants/database.constants.js';

/**
 * Redis 서비스 기본 추상 클래스
 *
 * 모든 서비스에서 공통으로 사용하는 Redis 연산을 제공합니다.
 * 각 서비스는 이 클래스를 상속받아 도메인 특화 메서드를 구현합니다.
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class RedisService extends BaseRedisService {
 *   constructor(
 *     @Inject(REDIS_CLIENT_TOKEN) redisClient: Redis,
 *     configService: ConfigService
 *   ) {
 *     const keyPrefix = configService.get<string>('redis.keyPrefix') ?? '';
 *     super(redisClient, keyPrefix);
 *   }
 *
 *   // 도메인 특화 메서드 구현
 *   async setSession(sessionId: string, data: SessionData): Promise<void> {
 *     const key = this.buildKey('session', sessionId);
 *     await this.setExValue(key, 3600, JSON.stringify(data));
 *   }
 * }
 * ```
 */
export abstract class BaseRedisService {
  constructor(
    @Inject(REDIS_CLIENT_TOKEN) protected readonly redisClient: Redis,
    /**
     * 환경별 Redis 키 접두사
     * @example 'dev', 'prod', ''
     */
    protected readonly envPrefix: string = ''
  ) {}

  // ==================== 키 관리 ====================

  /**
   * Redis 키 생성 헬퍼 메서드
   * @param baseKey - 기본 키
   * @param id - 선택적 ID (접두사 키의 경우)
   * @returns 환경 prefix가 적용된 완전한 Redis 키
   */
  protected buildKey(baseKey: string, id?: string | number): string {
    const key = id !== undefined ? `${baseKey}:${id}` : baseKey;
    return this.envPrefix ? `${this.envPrefix}:${key}` : key;
  }

  // ==================== 기본 Redis 연산 ====================

  /**
   * 만료 시간이 있는 값 저장
   * @param key - Redis 키
   * @param expire - 만료 시간 (초)
   * @param value - 저장할 값
   */
  protected async setExValue(
    key: string,
    expire: number,
    value: string | number | Buffer
  ): Promise<void> {
    await this.redisClient.setex(key, expire, value);
  }

  /**
   * 값 저장 (만료 시간 없음)
   * @param key - Redis 키
   * @param value - 저장할 값
   */
  protected async setValue(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  /**
   * 값 조회
   * @param key - Redis 키
   * @returns 저장된 값 또는 null
   */
  protected async getValue(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  /**
   * 값 삭제
   * @param key - Redis 키
   */
  protected async deleteValue(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  // ==================== 유틸리티 메서드 ====================

  /**
   * 키 존재 여부 확인
   * @param key - Redis 키
   * @returns 존재 여부
   */
  protected async exists(key: string): Promise<boolean> {
    const result = await this.redisClient.exists(key);
    return result === 1;
  }

  /**
   * 키의 TTL(남은 만료 시간) 조회
   * @param key - Redis 키
   * @returns 남은 시간(초), 키가 없거나 만료 없으면 -1 또는 -2
   */
  protected async getTtl(key: string): Promise<number> {
    return this.redisClient.ttl(key);
  }

  /**
   * 키의 만료 시간 설정/갱신
   * @param key - Redis 키
   * @param seconds - 만료 시간 (초)
   * @returns 성공 여부
   */
  protected async expire(key: string, seconds: number): Promise<boolean> {
    const result = await this.redisClient.expire(key, seconds);
    return result === 1;
  }
}
