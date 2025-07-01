import type { OptionalUuidId } from '@krgeobuk/core/interfaces';

import type { OAuthAccountProviderType } from '../../enum/index.js';

export interface OAuthAccountSearchResult extends OptionalUuidId {
  provider: OAuthAccountProviderType;
}
