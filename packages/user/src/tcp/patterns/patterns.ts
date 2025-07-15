/**
 * User-Role 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 authz-server의 user-role 기능에 접근할 때 사용
 */

export const UserTcpPatterns = {
  // 조회 패턴
  FIND_ROLES_BY_USER: 'user.find-roles-by-user',
  FIND_USERS_BY_ROLE: 'user.find-users-by-role',
  EXISTS: 'user.exists',

  // 배치 처리 패턴 (마이크로서비스 간 효율적 통신용)
  ASSIGN_MULTIPLE: 'user.assign-multiple',
  REVOKE_MULTIPLE: 'user.revoke-multiple',
  REPLACE_ROLES: 'user.replace-roles',
} as const;

export type UserTcpPattern = (typeof UserTcpPatterns)[keyof typeof UserTcpPatterns];
