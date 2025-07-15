/**
 * Authorization 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 authz-server의 authorization 기능에 접근할 때 사용
 */

export const AuthorizationTcpPatterns = {
  // 권한 체크 패턴
  CHECK_PERMISSION: 'authorization.check-permission',

  // 역할 체크 패턴
  CHECK_ROLE: 'authorization.check-role',

  // 사용자 권한 조회 패턴
  GET_USER_PERMISSIONS: 'authorization.get-user-permissions',
  GET_USER_ROLES: 'authorization.get-user-roles',
} as const;

export type AuthorizationTcpPattern =
  (typeof AuthorizationTcpPatterns)[keyof typeof AuthorizationTcpPatterns];

