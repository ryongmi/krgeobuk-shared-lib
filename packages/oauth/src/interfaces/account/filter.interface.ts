import type { OAuthAccountProviderType } from '../../enum/index.js';

export interface OAuthAccountFilter {
  userId?: string;
  provider?: OAuthAccountProviderType;
}
