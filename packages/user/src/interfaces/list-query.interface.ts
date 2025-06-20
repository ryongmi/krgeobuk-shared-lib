import type { ProviderType } from '@krgeobuk/oauth/enum';
import type { PaginateBaseOptions } from '@krgeobuk/core/interfaces';

export interface ListQuery extends PaginateBaseOptions {
  email?: string;
  name?: string;
  nickname?: string;
  profileImage?: string;
  provider?: ProviderType;
}
