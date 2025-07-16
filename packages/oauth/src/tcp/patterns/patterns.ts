/**
 * User-Role 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 authz-server의 user-role 기능에 접근할 때 사용
 */

export const OAuthTcpPatterns = {
  // 조회 패턴
  SEARCH: 'oauth.search',
  FIND_BY_ID: 'oauth.find-by-id',
  FIND_BY_IDS: 'oauth.find-by-ids',
  EXISTS: 'oauth.exists',

  // 변경 패턴
  CREATE: 'oauth.create',
  UPDATE: 'oauth.update',
  DELETE: 'oauth.delete',
} as const;

export type OAuthTcpPattern = (typeof OAuthTcpPatterns)[keyof typeof OAuthTcpPatterns];
