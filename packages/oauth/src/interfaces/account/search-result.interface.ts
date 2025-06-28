import type { OptionalUuidId } from '@krgeobuk/core/interfaces';

import type { ProviderType } from '../../enum/index.js';

export interface SearchResult extends OptionalUuidId {
  provider: ProviderType;
}
