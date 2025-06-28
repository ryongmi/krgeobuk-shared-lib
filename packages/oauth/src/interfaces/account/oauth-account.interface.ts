import type { OptionalUuidId } from '@krgeobuk/core/interfaces';

import type { ProviderType } from '../../enum/index.js';

export interface OAuthAccount extends OptionalUuidId {
  providerId?: string;
  provider?: ProviderType;
}
