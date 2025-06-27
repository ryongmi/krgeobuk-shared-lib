import type { ProviderType } from '@krgeobuk/oauth/enum';
import type { PaginateBaseOptions } from '@krgeobuk/core/interfaces';

export interface SearchQuery extends PaginateBaseOptions {
  email?: string;
  name?: string;
  nickname?: string;
  provider?: ProviderType;
}
