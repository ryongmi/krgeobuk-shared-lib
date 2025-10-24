/**
 * Authorization 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 authz-server의 authorization 기능에 접근할 때 사용
 */

export const AuthorizationTcpPatterns = {
  // 권한 체크 패턴
  CHECK_PERMISSION: 'authorization.check-permission',

  // 역할 체크 패턴
  CHECK_ROLE: 'authorization.check-role',

  // 사용자 권한 조회 패턴 (ID 기반)
  GET_USER_PERMISSIONS: 'authorization.get-user-permissions',
  GET_USER_ROLES: 'authorization.get-user-roles',
  GET_AVAILABLE_SERVICES: 'authorization.get-available-services',

  // 사용자 권한 조회 패턴 (Name/Action 기반)
  GET_USER_ROLE_NAMES: 'authorization.get-user-role-names',
  GET_USER_PERMISSION_ACTIONS: 'authorization.get-user-permission-actions',
} as const;

export type AuthorizationTcpPattern =
  (typeof AuthorizationTcpPatterns)[keyof typeof AuthorizationTcpPatterns];

