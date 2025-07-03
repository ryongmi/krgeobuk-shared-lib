import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';
import type { PaginateBaseOptions } from '@krgeobuk/core/interfaces';

export interface UserSearchQuery extends PaginateBaseOptions {
  email?: string;
  name?: string;
  nickname?: string;
  provider?: OAuthAccountProviderType;
}
