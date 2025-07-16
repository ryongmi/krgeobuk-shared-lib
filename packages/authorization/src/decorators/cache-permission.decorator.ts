import { SetMetadata, applyDecorators } from '@nestjs/common';

import {
  PERMISSION_CACHE_TTL_META_KEY,
  PERMISSION_CACHE_META_KEY,
} from '../constants/authorization.constants.js';

/**
 * 권한 검증 결과를 캐시하는 데코레이터
 * 
 * @param options - 캐시 옵션
 * @param options.ttl - 캐시 생존 시간 (초 단위, 기본값: 300초 = 5분)
 * @param options.key - 캐시 키 접두사 (선택사항)
 * 
 * @example
 * ```typescript
 * @RequirePermission('user:read')
 * @CachePermission({ ttl: 600 })  // 10분 캐시
 * @Get('users')
 * async getUsers() {
 *   // user:read 권한 검증 결과를 10분간 캐시
 * }
 * 
 * @RequireAnyPermission(['admin:read', 'user:read'])
 * @CachePermission({ ttl: 180, key: 'admin-cache' })  // 3분 캐시, 커스텀 키
 * @Get('admin/users')
 * async getAdminUsers() {
 *   // 권한 검증 결과를 3분간 캐시 (커스텀 키 사용)
 * }
 * ```
 */
export const CachePermission = (options: { ttl?: number; key?: string } = {}) => {
  const { ttl = 300, key } = options;
  
  return applyDecorators(
    SetMetadata(PERMISSION_CACHE_TTL_META_KEY, ttl),
    SetMetadata(PERMISSION_CACHE_META_KEY, key)
  );
};