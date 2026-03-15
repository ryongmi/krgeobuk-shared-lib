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
 * Authorization 도메인 권한 상수
 * 권한 검증 시스템에서 사용되는 권한 액션들
 */
export const AuthorizationPermissions = {
  AUTHORIZATION_CHECK: 'authorization:check',
  AUTHORIZATION_MANAGE: 'authorization:manage',
} as const;

export type AuthorizationPermission = (typeof AuthorizationPermissions)[keyof typeof AuthorizationPermissions];
