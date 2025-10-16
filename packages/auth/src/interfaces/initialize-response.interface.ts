import type { UserProfile } from '@krgeobuk/user/interfaces';

/**
 * 클라이언트 초기화 응답 인터페이스
 * RefreshToken으로 AccessToken과 사용자 정보를 한번에 반환
 */
export interface AuthInitializeResponse {
  accessToken: string;
  user: UserProfile;
}
