import { UuidId } from '@krgeobuk/core/interfaces';
import { OAuthAccount } from '@krgeobuk/shared/oauth';

export interface UserDetail extends UuidId {
  email: string;
  name: string;
  nickname: string | null;
  profileImageUrl: string | null;
  isIntegrated: boolean;
  isEmailVerified: boolean;
  oauthAccount: OAuthAccount;
}
