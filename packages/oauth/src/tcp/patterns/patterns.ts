/**
 * OAuth 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 auth-server의 OAuth 기능에 접근할 때 사용
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

  // YouTube 토큰 패턴
  YOUTUBE_GET_ACCESS_TOKEN: 'oauth.youtube.get-access-token',
  YOUTUBE_HAS_ACCESS: 'oauth.youtube.has-access',
} as const;

export type OAuthTcpPattern = (typeof OAuthTcpPatterns)[keyof typeof OAuthTcpPatterns];
