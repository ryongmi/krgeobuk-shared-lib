/**
 * RolePermission 도메인 권한 상수
 * 역할-권한 매핑 관리에서 사용되는 권한 액션들
 */
export const RolePermissionPermissions = {
  ROLE_PERMISSION_ASSIGN: 'role-permission:assign',
  ROLE_PERMISSION_REVOKE: 'role-permission:revoke',
  ROLE_PERMISSION_MANAGE: 'role-permission:manage',
} as const;

export type RolePermissionPermission = (typeof RolePermissionPermissions)[keyof typeof RolePermissionPermissions];
