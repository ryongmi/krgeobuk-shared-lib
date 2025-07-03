import { OAuthAccount } from '@krgeobuk/shared/oauth';
import type { OptionalUuidId } from '@krgeobuk/core/interfaces';

export interface UserSearchResult extends OptionalUuidId {
  email: string;
  name: string;
  nickname: string | null;
  profileImageUrl: string | null;
  isIntegrated: boolean;
  isEmailVerified: boolean;
  oauthAccount: OAuthAccount;
}
