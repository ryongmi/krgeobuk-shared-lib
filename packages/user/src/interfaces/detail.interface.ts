import { OAuthAccount } from '@krgeobuk/oauth/interfaces';

export interface Detail {
  id?: string;
  email: string;
  name: string;
  nickname: string | null;
  profileImageUrl: string | null;
  isIntegrated: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  oauthAccount: OAuthAccount;
}
