export const REQUIRED_ANY_PERMISSIONS_META_KEY = 'required-any-permissions:meta';
export const REQUIRED_ALL_PERMISSIONS_META_KEY = 'required-all-permissions:meta';
export const REQUIRED_ANY_ROLES_META_KEY = 'required-any-roles:meta';
export const REQUIRED_ALL_ROLES_META_KEY = 'required-all-roles:meta';
export const COMBINATION_OPERATOR_META_KEY = 'combination-operator:meta';
export const PERMISSION_SERVICE_ID_META_KEY = 'permission-service-id:meta';
export const ROLE_SERVICE_ID_META_KEY = 'role-service-id:meta';
export const PERMISSION_CACHE_TTL_META_KEY = 'permission-cache-ttl:meta';
export const PERMISSION_CACHE_META_KEY = 'permission-cache-key:meta';
export const REQUIRE_PERMISSION_META_KEY = 'require_permission:meta';
export const REQUIRE_ROLE_META_KEY = 'require_role:meta';

/**
 * authz-server 전용 권한 상수
 * 권한 관리 시스템에서 사용되는 세밀한 권한 액션들
 */
/**
 * authz-server 전용 역할 상수
 * 권한 관리 시스템에서 사용되는 도메인별 역할들
 */
export const AUTHZ_ROLES = {
  /**
   * 역할 관리자 - 역할 생성/수정/삭제 권한
   * 시스템 역할을 관리할 수 있는 전문 관리자
   */
  ROLE_MANAGER: 'roleManager',

  /**
   * 권한 관리자 - 권한 생성/수정/삭제 권한
   * 시스템 권한을 관리할 수 있는 전문 관리자
   */
  PERMISSION_MANAGER: 'permissionManager',
} as const;

export type AuthzRole = typeof AUTHZ_ROLES[keyof typeof AUTHZ_ROLES];

/**
 * authz-server 전용 권한 상수
 * 권한 관리 시스템에서 사용되는 세밀한 권한 액션들
 */
export const AUTHZ_PERMISSIONS = {
  // 역할 관리 권한
  ROLE_CREATE: 'role:create',
  ROLE_READ: 'role:read',
  ROLE_UPDATE: 'role:update', 
  ROLE_DELETE: 'role:delete',
  ROLE_MANAGE: 'role:manage',

  // 권한 관리 권한
  PERMISSION_CREATE: 'permission:create',
  PERMISSION_READ: 'permission:read',
  PERMISSION_UPDATE: 'permission:update',
  PERMISSION_DELETE: 'permission:delete',
  PERMISSION_MANAGE: 'permission:manage',

  // 중간테이블 관리 권한
  USER_ROLE_ASSIGN: 'user-role:assign',
  USER_ROLE_REVOKE: 'user-role:revoke', 
  USER_ROLE_MANAGE: 'user-role:manage',

  ROLE_PERMISSION_ASSIGN: 'role-permission:assign',
  ROLE_PERMISSION_REVOKE: 'role-permission:revoke',
  ROLE_PERMISSION_MANAGE: 'role-permission:manage',

  // 서비스 가시성 관리
  SERVICE_VISIBLE_ROLE_MANAGE: 'service-visible-role:manage',

  // 권한 검증
  AUTHORIZATION_CHECK: 'authorization:check',
  AUTHORIZATION_MANAGE: 'authorization:manage'
} as const;

export type AuthzPermission = typeof AUTHZ_PERMISSIONS[keyof typeof AUTHZ_PERMISSIONS];