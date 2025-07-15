/**
 * Role 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 authz-server의 role 기능에 접근할 때 사용
 */

export const RoleTcpPatterns = {
  // 조회 패턴
  SEARCH: 'role.search',
  FIND_BY_ID: 'role.find-by-id',
  FIND_BY_SERVICE_IDS: 'role.find-by-service-ids',
  EXISTS: 'role.exists',

  // 변경 패턴
  CREATE: 'role.create',
  UPDATE: 'role.update',
  DELETE: 'role.delete',
} as const;

export type RoleTcpPattern = (typeof RoleTcpPatterns)[keyof typeof RoleTcpPatterns];
