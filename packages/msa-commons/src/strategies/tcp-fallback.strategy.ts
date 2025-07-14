import type { FallbackOptions } from '../types/index.js';

/**
 * TCP 통신 실패 시 폴백 전략
 * 
 * 책임:
 * - TCP 통신 실패 시 대체 로직 제공
 * - 서비스별 맞춤형 폴백 전략
 * - 폴백 결과 로깅 및 모니터링
 */
export class TcpFallbackStrategy {
  private readonly logger = console;

  /**
   * 사용자 정보 조회 실패 시 폴백
   * @param userIds 조회 실패한 사용자 ID 목록
   * @param options 폴백 옵션
   * @returns 폴백 사용자 정보
   */
  createFallbackUsers<T extends { id: string; name: string }>(
    userIds: string[],
    options: FallbackOptions<T[]> = { 
      enableFallback: true, 
      fallbackValue: [], 
      fallbackStrategy: 'default' 
    },
  ): T[] {
    if (!options.enableFallback) {
      this.logger.warn('Fallback disabled, returning empty array', { userCount: userIds.length });
      return [];
    }

    switch (options.fallbackStrategy) {
      case 'empty':
        return [];
        
      case 'default':
        const fallbackUsers = userIds.map(id => ({
          id,
          name: `Unknown User (${id.slice(0, 8)})`,
          email: null,
          isActive: false,
        })) as unknown as T[];
        
        this.logger.warn('Created fallback users', {
          userCount: userIds.length,
          strategy: 'default',
        });
        
        return fallbackUsers;
        
      case 'cached':
        // TODO: 캐시에서 사용자 정보 조회
        this.logger.debug('Cache fallback not implemented, using default', { userCount: userIds.length });
        return this.createFallbackUsers(userIds, { ...options, fallbackStrategy: 'default' });
        
      case 'custom':
        return options.fallbackValue || [];
        
      default:
        this.logger.warn('Unknown fallback strategy, using empty', { 
          strategy: options.fallbackStrategy,
          userCount: userIds.length 
        });
        return [];
    }
  }

  /**
   * 서비스 정보 조회 실패 시 폴백
   * @param serviceIds 조회 실패한 서비스 ID 목록
   * @param options 폴백 옵션
   * @returns 폴백 서비스 정보
   */
  createFallbackServices<T extends { id: string; name: string }>(
    serviceIds: string[],
    options: FallbackOptions<T[]> = { 
      enableFallback: true, 
      fallbackValue: [], 
      fallbackStrategy: 'default' 
    },
  ): T[] {
    if (!options.enableFallback) {
      this.logger.warn('Fallback disabled, returning empty array', { serviceCount: serviceIds.length });
      return [];
    }

    switch (options.fallbackStrategy) {
      case 'empty':
        return [];
        
      case 'default':
        const fallbackServices = serviceIds.map(id => ({
          id,
          name: `Unknown Service (${id.slice(0, 8)})`,
          description: 'Service information unavailable',
          isActive: false,
        })) as unknown as T[];
        
        this.logger.warn('Created fallback services', {
          serviceCount: serviceIds.length,
          strategy: 'default',
        });
        
        return fallbackServices;
        
      case 'cached':
        // TODO: 캐시에서 서비스 정보 조회
        this.logger.debug('Cache fallback not implemented, using default', { serviceCount: serviceIds.length });
        return this.createFallbackServices(serviceIds, { ...options, fallbackStrategy: 'default' });
        
      case 'custom':
        return options.fallbackValue || [];
        
      default:
        this.logger.warn('Unknown fallback strategy, using empty', { 
          strategy: options.fallbackStrategy,
          serviceCount: serviceIds.length 
        });
        return [];
    }
  }

  /**
   * 권한 정보 조회 실패 시 폴백
   * @param permissionIds 조회 실패한 권한 ID 목록
   * @param options 폴백 옵션
   * @returns 폴백 권한 정보
   */
  createFallbackPermissions<T extends { id: string; action: string }>(
    permissionIds: string[],
    options: FallbackOptions<T[]> = { 
      enableFallback: true, 
      fallbackValue: [], 
      fallbackStrategy: 'empty' // 보안상 권한은 기본적으로 빈 배열
    },
  ): T[] {
    if (!options.enableFallback) {
      this.logger.warn('Permission fallback disabled', { permissionCount: permissionIds.length });
      return [];
    }

    switch (options.fallbackStrategy) {
      case 'empty':
        this.logger.warn('Permission fallback: empty for security', { 
          permissionCount: permissionIds.length 
        });
        return [];
        
      case 'default':
        // 권한은 보안상 기본값 제공하지 않음
        this.logger.warn('Permission fallback: default not allowed for security, using empty', { 
          permissionCount: permissionIds.length 
        });
        return [];
        
      case 'cached':
        // TODO: 캐시에서 권한 정보 조회
        this.logger.debug('Permission cache fallback not implemented, using empty', { 
          permissionCount: permissionIds.length 
        });
        return [];
        
      case 'custom':
        // 커스텀 폴백은 명시적으로 허용
        return options.fallbackValue || [];
        
      default:
        this.logger.warn('Unknown permission fallback strategy, using empty', { 
          strategy: options.fallbackStrategy,
          permissionCount: permissionIds.length 
        });
        return [];
    }
  }

  /**
   * 단일 값 폴백 처리
   * @param value 원본 값
   * @param fallbackValue 폴백 값
   * @param reason 폴백 사유
   * @returns 폴백 처리된 값
   */
  handleSingleValueFallback<T>(
    value: T | null | undefined,
    fallbackValue: T,
    reason: string,
  ): T {
    if (value !== null && value !== undefined) {
      return value;
    }

    this.logger.debug('Single value fallback applied', { reason, hasFallback: !!fallbackValue });
    return fallbackValue;
  }
}