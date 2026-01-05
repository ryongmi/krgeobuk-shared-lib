/**
 * User-Role 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 authz-server의 user-role 기능에 접근할 때 사용
 */

export const UserRoleTcpPatterns = {
  // 조회 패턴
  FIND_ROLES_BY_USER: 'user-role.find-roles-by-user',
  FIND_USERS_BY_ROLE: 'user-role.find-users-by-role',
  EXISTS: 'user-role.exists',

  // 배치 처리 패턴 (마이크로서비스 간 효율적 통신용)
  ASSIGN_MULTIPLE: 'user-role.assign-multiple',
  REVOKE_MULTIPLE: 'user-role.revoke-multiple',
  REPLACE_ROLES: 'user-role.replace-roles',

  // 계정 병합 패턴
  MERGE_USER_ROLES: 'user-role.merge-user-roles',
  ROLLBACK_MERGE: 'user-role.rollback-merge',
} as const;

export type UserRoleTcpPattern = (typeof UserRoleTcpPatterns)[keyof typeof UserRoleTcpPatterns];
