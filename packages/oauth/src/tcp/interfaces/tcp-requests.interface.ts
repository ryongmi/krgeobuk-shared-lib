/**
 * OAuth 도메인 TCP 인터페이스
 * OAuth 관련 TCP 통신에서 사용되는 파라미터 및 응답
 */

// YouTube 토큰 조회 요청 파라미터
export interface TcpYouTubeTokenParams {
  userId: string;
}

// YouTube 토큰 조회 응답
export interface TcpYouTubeTokenResult {
  accessToken: string;
  expiresAt: Date;
}
