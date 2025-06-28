import { OAuthAccount } from '@krgeobuk/oauth/interfaces';
import type { OptionalUuidId } from '@krgeobuk/core/interfaces';

export interface SearchResult extends OptionalUuidId {
  email: string;
  name: string;
  nickname: string | null;
  profileImageUrl: string | null;
  isIntegrated: boolean;
  isEmailVerified: boolean;
  oauthAccount: OAuthAccount;
}
