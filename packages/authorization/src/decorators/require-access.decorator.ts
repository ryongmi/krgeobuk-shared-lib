import { SetMetadata, applyDecorators } from '@nestjs/common';

import {
  REQUIRED_ANY_PERMISSIONS_META_KEY,
  REQUIRED_ALL_PERMISSIONS_META_KEY,
  REQUIRED_ANY_ROLES_META_KEY,
  REQUIRED_ALL_ROLES_META_KEY,
  COMBINATION_OPERATOR_META_KEY,
  PERMISSION_SERVICE_ID_META_KEY,
  ROLE_SERVICE_ID_META_KEY,
  PERMISSION_CACHE_TTL_META_KEY,
  PERMISSION_CACHE_META_KEY,
} from '../constants/authorization.constants.js';

/**
 * 복합 권한 및 역할 조건을 지원하는 통합 데코레이터
 * 
 * @param config - 권한 및 역할 설정
 * @param config.permissions - 확인할 권한 목록
 * @param config.roles - 확인할 역할 목록
 * @param config.permissionOperator - 권한 조건 연산자 ('AND' | 'OR', 기본값: 'AND')
 * @param config.roleOperator - 역할 조건 연산자 ('AND' | 'OR', 기본값: 'AND')
 * @param config.combinationOperator - 권한과 역할 조합 연산자 ('AND' | 'OR', 기본값: 'AND')
 * @param config.serviceId - 권한을 체크할 서비스 ID (선택사항)
 * @param config.cache - 캐시 설정 (선택사항)
 * 
 * @example
 * ```typescript
 * // 기본 권한 체크 (AND 조건)
 * @RequireAccess({
 *   permissions: ['user:read', 'user:list']
 * })
 * @Get('users')
 * async getUsers() {
 *   // user:read AND user:list 권한이 모두 있어야 접근 가능
 * }
 * 
 * // OR 조건 권한 체크
 * @RequireAccess({
 *   permissions: ['admin:read', 'user:read'],
 *   permissionOperator: 'OR'
 * })
 * @Get('user-data')
 * async getUserData() {
 *   // admin:read OR user:read 권한이 있으면 접근 가능
 * }
 * 
 * // 권한과 역할 조합 (OR 조건)
 * @RequireAccess({
 *   permissions: ['user:read'],
 *   roles: ['admin', 'manager'],
 *   combinationOperator: 'OR'
 * })
 * @Get('protected-data')
 * async getProtectedData() {
 *   // user:read 권한이 있거나 admin/manager 역할이 있으면 접근 가능
 * }
 * 
 * // 복합 조건 + 캐시
 * @RequireAccess({
 *   permissions: ['admin:manage'],
 *   roles: ['super-admin'],
 *   permissionOperator: 'OR',
 *   roleOperator: 'OR',
 *   combinationOperator: 'OR',
 *   serviceId: 'admin-service',
 *   cache: { ttl: 600 }
 * })
 * @Post('admin/critical-operation')
 * async criticalOperation() {
 *   // 복잡한 권한 조건 + 10분 캐시
 * }
 * ```
 */
export const RequireAccess = (config: {
  permissions?: string[];
  roles?: string[];
  permissionOperator?: 'AND' | 'OR';
  roleOperator?: 'AND' | 'OR';
  combinationOperator?: 'AND' | 'OR';
  serviceId?: string;
  cache?: { ttl?: number; key?: string };
}) => {
  const {
    permissions = [],
    roles = [],
    permissionOperator = 'AND',
    roleOperator = 'AND',
    combinationOperator = 'AND',
    serviceId,
    cache
  } = config;

  const decorators = [];

  // 권한 설정
  if (permissions.length > 0) {
    if (permissionOperator === 'OR') {
      decorators.push(SetMetadata(REQUIRED_ANY_PERMISSIONS_META_KEY, permissions));
    } else {
      decorators.push(SetMetadata(REQUIRED_ALL_PERMISSIONS_META_KEY, permissions));
    }
  }

  // 역할 설정
  if (roles.length > 0) {
    if (roleOperator === 'OR') {
      decorators.push(SetMetadata(REQUIRED_ANY_ROLES_META_KEY, roles));
    } else {
      decorators.push(SetMetadata(REQUIRED_ALL_ROLES_META_KEY, roles));
    }
  }

  // 조합 연산자 설정
  decorators.push(SetMetadata(COMBINATION_OPERATOR_META_KEY, combinationOperator));

  // 서비스 ID 설정
  if (serviceId) {
    decorators.push(SetMetadata(PERMISSION_SERVICE_ID_META_KEY, serviceId));
    decorators.push(SetMetadata(ROLE_SERVICE_ID_META_KEY, serviceId));
  }

  // 캐시 설정
  if (cache) {
    decorators.push(SetMetadata(PERMISSION_CACHE_TTL_META_KEY, cache.ttl || 300));
    if (cache.key) {
      decorators.push(SetMetadata(PERMISSION_CACHE_META_KEY, cache.key));
    }
  }

  return applyDecorators(...decorators);
};