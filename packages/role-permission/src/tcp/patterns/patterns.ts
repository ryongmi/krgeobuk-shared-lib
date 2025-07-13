/**
 * Role-Permission 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 authz-server의 role-permission 관계 관리에 접근할 때 사용
 */

export const RolePermissionTcpPatterns = {
  // 조회 패턴
  FIND_PERMISSIONS_BY_ROLE: 'role-permission.find-permissions-by-role',
  FIND_ROLES_BY_PERMISSION: 'role-permission.find-roles-by-permission',
  EXISTS: 'role-permission.exists',

  // 배치 관리 패턴
  ASSIGN_MULTIPLE: 'role-permission.assign-multiple',
  REVOKE_MULTIPLE: 'role-permission.revoke-multiple',
  REPLACE_PERMISSIONS: 'role-permission.replace-permissions',
} as const;

export type RolePermissionTcpPattern = typeof RolePermissionTcpPatterns[keyof typeof RolePermissionTcpPatterns];