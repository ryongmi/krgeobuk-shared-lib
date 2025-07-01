import type { OptionalUuidId } from '@krgeobuk/core/interfaces';

import type { OAuthAccountProviderType } from '../../enum/index.js';

export interface OAuthAccount extends OptionalUuidId {
  providerId?: string;
  provider?: OAuthAccountProviderType;
}
