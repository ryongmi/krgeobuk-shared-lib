/**
 * User 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 auth-server의 user 기능에 접근할 때 사용
 */

export const UserTcpPatterns = {
  // 조회 패턴
  SEARCH: 'user.search',
  FIND_BY_ID: 'user.find-by-id',
  FIND_BY_IDS: 'user.find-by-ids',
  EXISTS: 'user.exists',

  // 변경 패턴
  CREATE: 'user.create',
  UPDATE: 'user.update',
  DELETE: 'user.delete',
} as const;

export type UserTcpPattern = (typeof UserTcpPatterns)[keyof typeof UserTcpPatterns];
