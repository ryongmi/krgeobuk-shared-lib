import type { UuidId } from '@krgeobuk/core/interfaces';

import type { OAuthAccountProviderType } from '../enum/index.js';

export interface OAuthAccount extends UuidId {
  providerId?: string;
  provider?: OAuthAccountProviderType;
  userId?: string;
}

