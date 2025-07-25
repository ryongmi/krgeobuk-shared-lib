import { OAuthAccount } from '@krgeobuk/shared/oauth';

export interface UserSearchResult {
  id: string;
  email: string;
  name: string;
  nickname: string | null;
  profileImageUrl: string | null;
  isIntegrated: boolean;
  isEmailVerified: boolean;
  oauthAccount: OAuthAccount;
}
