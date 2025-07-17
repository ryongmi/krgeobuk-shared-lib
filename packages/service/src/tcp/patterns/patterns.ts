/**
 * service 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 portal-server의 service 기능에 접근할 때 사용
 */

export const ServiceTcpPatterns = {
  // 조회 패턴
  SEARCH: 'service.search',
  FIND_BY_ID: 'service.find-by-id',
  FIND_BY_IDS: 'service.find-by-ids',
  EXISTS: 'service.exists',

  // 변경 패턴
  CREATE: 'service.create',
  UPDATE: 'service.update',
  DELETE: 'service.delete',
} as const;

export type ServiceTcpPattern = (typeof ServiceTcpPatterns)[keyof typeof ServiceTcpPatterns];
