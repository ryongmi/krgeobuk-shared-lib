/**
 * Permission 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 authz-server의 permission 기능에 접근할 때 사용
 */

export const PermissionTcpPatterns = {
  // 조회 패턴
  SEARCH: 'permission.search',
  FIND_BY_ID: 'permission.find-by-id',
  FIND_BY_SERVICE_IDS: 'permission.find-by-service-ids',
  EXISTS: 'permission.exists',

  // 변경 패턴
  CREATE: 'permission.create',
  UPDATE: 'permission.update',
  DELETE: 'permission.delete',
} as const;

export type PermissionTcpPattern =
  (typeof PermissionTcpPatterns)[keyof typeof PermissionTcpPatterns];
