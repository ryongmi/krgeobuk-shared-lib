/**
 * User-Role 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 authz-server의 user-role 기능에 접근할 때 사용
 */

export const UserRoleTcpPatterns = {
  // 조회 패턴
  FIND_ROLES_BY_USER: 'user-role.findRolesByUser',
  FIND_USERS_BY_ROLE: 'user-role.findUsersByRole',
  EXISTS: 'user-role.exists',

  // 변경 패턴
  ASSIGN_ROLE: 'user-role.assignRole',
  ASSIGN_MULTIPLE_ROLES: 'user-role.assignMultipleRoles',
  REVOKE_ROLE: 'user-role.revokeRole',
  REVOKE_MULTIPLE_ROLES: 'user-role.revokeMultipleRoles',
  REVOKE_ALL_ROLES_FROM_USER: 'user-role.revokeAllRolesFromUser',
  REVOKE_ALL_USERS_FROM_ROLE: 'user-role.revokeAllUsersFromRole',
} as const;

export type UserRoleTcpPattern = typeof UserRoleTcpPatterns[keyof typeof UserRoleTcpPatterns];