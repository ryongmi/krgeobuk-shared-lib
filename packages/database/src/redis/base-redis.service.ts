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

  /**
   * 키가 존재하지 않을 때만 값 저장 (SET NX)
   * @param key - Redis 키
   * @param value - 저장할 값
   * @returns 저장 성공 여부 (이미 존재하면 false)
   */
  protected async setNxValue(key: string, value: string): Promise<boolean> {
    const result = await this.redisClient.setnx(key, value);
    return result === 1;
  }

  /**
   * 키가 존재하지 않을 때만 만료 시간과 함께 값 저장 (SET NX EX)
   * @param key - Redis 키
   * @param expire - 만료 시간 (초)
   * @param value - 저장할 값
   * @returns 저장 성공 여부 (이미 존재하면 false)
   */
  protected async setNxExValue(
    key: string,
    expire: number,
    value: string | number | Buffer
  ): Promise<boolean> {
    const result = await this.redisClient.set(key, value, 'EX', expire, 'NX');
    return result === 'OK';
  }

  // ==================== 다중 키 연산 ====================

  /**
   * 여러 값 동시 조회
   * @param keys - Redis 키 배열
   * @returns 값 배열 (존재하지 않는 키는 null)
   */
  protected async getValues(keys: string[]): Promise<(string | null)[]> {
    if (keys.length === 0) return [];
    return this.redisClient.mget(...keys);
  }

  /**
   * 여러 값 동시 저장
   * @param keyValues - 키-값 쌍 객체
   */
  protected async setValues(keyValues: Record<string, string>): Promise<void> {
    const entries = Object.entries(keyValues);
    if (entries.length === 0) return;
    await this.redisClient.mset(...entries.flat());
  }

  /**
   * 여러 키 동시 삭제
   * @param keys - 삭제할 키 배열
   * @returns 삭제된 키 개수
   */
  protected async deleteValues(keys: string[]): Promise<number> {
    if (keys.length === 0) return 0;
    return this.redisClient.del(...keys);
  }

  // ==================== 숫자 연산 ====================

  /**
   * 값 1 증가
   * @param key - Redis 키
   * @returns 증가 후 값
   */
  protected async incr(key: string): Promise<number> {
    return this.redisClient.incr(key);
  }

  /**
   * 값 1 감소
   * @param key - Redis 키
   * @returns 감소 후 값
   */
  protected async decr(key: string): Promise<number> {
    return this.redisClient.decr(key);
  }

  /**
   * 지정한 수만큼 증가
   * @param key - Redis 키
   * @param increment - 증가량
   * @returns 증가 후 값
   */
  protected async incrBy(key: string, increment: number): Promise<number> {
    return this.redisClient.incrby(key, increment);
  }

  /**
   * 지정한 수만큼 감소
   * @param key - Redis 키
   * @param decrement - 감소량
   * @returns 감소 후 값
   */
  protected async decrBy(key: string, decrement: number): Promise<number> {
    return this.redisClient.decrby(key, decrement);
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

  // ==================== 패턴 기반 연산 (SCAN 기반) ====================

  /**
   * 패턴에 매칭되는 모든 키 조회 (SCAN 기반 - 논블로킹)
   *
   * KEYS 명령 대신 SCAN을 사용하여 프로덕션 환경에서도 안전하게 사용 가능
   *
   * @param pattern - Redis 키 패턴 (예: "user:*", "session:123:*")
   * @param count - SCAN 명령당 처리할 키 개수 힌트 (기본값: 100)
   * @returns 매칭된 키 목록
   *
   * @example
   * ```typescript
   * // 모든 사용자 세션 키 조회
   * const sessionKeys = await this.scanByPattern('session:*');
   *
   * // 특정 사용자의 모든 권한 캐시 키 조회
   * const userPermKeys = await this.scanByPattern('user:permissions:123:*');
   * ```
   */
  protected async scanByPattern(pattern: string, count = 100): Promise<string[]> {
    const keys: string[] = [];
    let cursor = '0';

    do {
      const [nextCursor, foundKeys] = await this.redisClient.scan(
        cursor,
        'MATCH',
        pattern,
        'COUNT',
        count
      );
      cursor = nextCursor;
      keys.push(...foundKeys);
    } while (cursor !== '0');

    return keys;
  }

  /**
   * 패턴에 매칭되는 모든 키 삭제 (SCAN 기반 - 논블로킹)
   *
   * KEYS 명령 대신 SCAN을 사용하여 프로덕션 환경에서도 안전하게 사용 가능
   * 매칭된 키를 배치로 삭제하여 효율적으로 처리
   *
   * @param pattern - Redis 키 패턴 (예: "user:*", "cache:temp:*")
   * @param count - SCAN 명령당 처리할 키 개수 힌트 (기본값: 100)
   * @returns 삭제된 키 개수
   *
   * @example
   * ```typescript
   * // 특정 사용자의 모든 캐시 삭제
   * const deletedCount = await this.deleteByPattern('user:permissions:123:*');
   *
   * // 임시 캐시 전체 삭제
   * const count = await this.deleteByPattern('cache:temp:*');
   * ```
   */
  protected async deleteByPattern(pattern: string, count = 100): Promise<number> {
    let cursor = '0';
    let deletedCount = 0;

    do {
      const [nextCursor, keys] = await this.redisClient.scan(
        cursor,
        'MATCH',
        pattern,
        'COUNT',
        count
      );
      cursor = nextCursor;

      if (keys.length > 0) {
        await this.redisClient.del(...keys);
        deletedCount += keys.length;
      }
    } while (cursor !== '0');

    return deletedCount;
  }

  // ==================== Hash 연산 ====================

  /**
   * 해시 필드 저장
   * @param key - Redis 키
   * @param field - 필드 이름
   * @param value - 저장할 값
   */
  protected async hset(key: string, field: string, value: string): Promise<void> {
    await this.redisClient.hset(key, field, value);
  }

  /**
   * 해시 여러 필드 동시 저장
   * @param key - Redis 키
   * @param fieldValues - 필드-값 쌍 객체
   */
  protected async hmset(key: string, fieldValues: Record<string, string>): Promise<void> {
    const entries = Object.entries(fieldValues);
    if (entries.length === 0) return;
    await this.redisClient.hmset(key, ...entries.flat());
  }

  /**
   * 해시 필드 조회
   * @param key - Redis 키
   * @param field - 필드 이름
   * @returns 필드 값 또는 null
   */
  protected async hget(key: string, field: string): Promise<string | null> {
    return this.redisClient.hget(key, field);
  }

  /**
   * 해시 여러 필드 동시 조회
   * @param key - Redis 키
   * @param fields - 필드 이름 배열
   * @returns 필드 값 배열 (존재하지 않는 필드는 null)
   */
  protected async hmget(key: string, fields: string[]): Promise<(string | null)[]> {
    if (fields.length === 0) return [];
    return this.redisClient.hmget(key, ...fields);
  }

  /**
   * 해시 전체 조회
   * @param key - Redis 키
   * @returns 필드-값 쌍 객체
   */
  protected async hgetAll(key: string): Promise<Record<string, string>> {
    return this.redisClient.hgetall(key);
  }

  /**
   * 해시 필드 삭제
   * @param key - Redis 키
   * @param fields - 삭제할 필드 이름 (단일 또는 배열)
   * @returns 삭제된 필드 개수
   */
  protected async hdel(key: string, ...fields: string[]): Promise<number> {
    if (fields.length === 0) return 0;
    return this.redisClient.hdel(key, ...fields);
  }

  /**
   * 해시 필드 존재 여부 확인
   * @param key - Redis 키
   * @param field - 필드 이름
   * @returns 존재 여부
   */
  protected async hexists(key: string, field: string): Promise<boolean> {
    const result = await this.redisClient.hexists(key, field);
    return result === 1;
  }

  /**
   * 해시 필드 개수 조회
   * @param key - Redis 키
   * @returns 필드 개수
   */
  protected async hlen(key: string): Promise<number> {
    return this.redisClient.hlen(key);
  }

  // ==================== Set 연산 ====================

  /**
   * 집합에 멤버 추가
   * @param key - Redis 키
   * @param members - 추가할 멤버 (단일 또는 배열)
   * @returns 새로 추가된 멤버 개수
   */
  protected async sadd(key: string, ...members: string[]): Promise<number> {
    if (members.length === 0) return 0;
    return this.redisClient.sadd(key, ...members);
  }

  /**
   * 집합에서 멤버 제거
   * @param key - Redis 키
   * @param members - 제거할 멤버 (단일 또는 배열)
   * @returns 제거된 멤버 개수
   */
  protected async srem(key: string, ...members: string[]): Promise<number> {
    if (members.length === 0) return 0;
    return this.redisClient.srem(key, ...members);
  }

  /**
   * 집합 전체 멤버 조회
   * @param key - Redis 키
   * @returns 멤버 배열
   */
  protected async smembers(key: string): Promise<string[]> {
    return this.redisClient.smembers(key);
  }

  /**
   * 집합 멤버 존재 여부 확인
   * @param key - Redis 키
   * @param member - 확인할 멤버
   * @returns 존재 여부
   */
  protected async sismember(key: string, member: string): Promise<boolean> {
    const result = await this.redisClient.sismember(key, member);
    return result === 1;
  }

  /**
   * 집합 멤버 개수 조회
   * @param key - Redis 키
   * @returns 멤버 개수
   */
  protected async scard(key: string): Promise<number> {
    return this.redisClient.scard(key);
  }

  // ==================== List 연산 ====================

  /**
   * 리스트 왼쪽에 값 추가
   * @param key - Redis 키
   * @param values - 추가할 값 (단일 또는 배열)
   * @returns 추가 후 리스트 길이
   */
  protected async lpush(key: string, ...values: string[]): Promise<number> {
    if (values.length === 0) return 0;
    return this.redisClient.lpush(key, ...values);
  }

  /**
   * 리스트 오른쪽에 값 추가
   * @param key - Redis 키
   * @param values - 추가할 값 (단일 또는 배열)
   * @returns 추가 후 리스트 길이
   */
  protected async rpush(key: string, ...values: string[]): Promise<number> {
    if (values.length === 0) return 0;
    return this.redisClient.rpush(key, ...values);
  }

  /**
   * 리스트 왼쪽에서 값 제거 및 반환
   * @param key - Redis 키
   * @returns 제거된 값 또는 null
   */
  protected async lpop(key: string): Promise<string | null> {
    return this.redisClient.lpop(key);
  }

  /**
   * 리스트 오른쪽에서 값 제거 및 반환
   * @param key - Redis 키
   * @returns 제거된 값 또는 null
   */
  protected async rpop(key: string): Promise<string | null> {
    return this.redisClient.rpop(key);
  }

  /**
   * 리스트 범위 조회
   * @param key - Redis 키
   * @param start - 시작 인덱스 (0부터 시작, 음수는 끝에서부터)
   * @param stop - 종료 인덱스 (포함, -1은 마지막 요소)
   * @returns 값 배열
   */
  protected async lrange(key: string, start: number, stop: number): Promise<string[]> {
    return this.redisClient.lrange(key, start, stop);
  }

  /**
   * 리스트 길이 조회
   * @param key - Redis 키
   * @returns 리스트 길이
   */
  protected async llen(key: string): Promise<number> {
    return this.redisClient.llen(key);
  }

  /**
   * 리스트 특정 인덱스 값 조회
   * @param key - Redis 키
   * @param index - 인덱스 (0부터 시작, 음수는 끝에서부터)
   * @returns 값 또는 null
   */
  protected async lindex(key: string, index: number): Promise<string | null> {
    return this.redisClient.lindex(key, index);
  }
}
