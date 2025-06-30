import type { OptionalUuidId } from '@krgeobuk/core/interfaces';

import type { ProviderType } from '../../enum/index.js';

export interface OauthAccountSearchResult extends OptionalUuidId {
  provider: ProviderType;
}
