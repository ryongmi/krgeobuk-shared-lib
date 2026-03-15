/**
 * Permission 도메인 역할 상수
 * 권한 관리 시스템에서 사용되는 도메인별 역할들
 */
export const PermissionNames = {
  /**
   * 권한 관리자 - 권한 생성/수정/삭제 권한
   * 시스템 권한을 관리할 수 있는 전문 관리자
   */
  PERMISSION_MANAGER: 'permissionManager',
} as const;

export type PermissionName = (typeof PermissionNames)[keyof typeof PermissionNames];

/**
 * Permission 도메인 권한 상수
 * 권한 관리 시스템에서 사용되는 권한 액션들
 */
export const PermissionPermissions = {
  PERMISSION_READ: 'permission:read',
  PERMISSION_CREATE: 'permission:create',
  PERMISSION_UPDATE: 'permission:update',
  PERMISSION_DELETE: 'permission:delete',
  PERMISSION_MANAGE: 'permission:manage',
} as const;

export type PermissionPermission = (typeof PermissionPermissions)[keyof typeof PermissionPermissions];
