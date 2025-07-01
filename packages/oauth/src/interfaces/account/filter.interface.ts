import type { OAuthAccountProviderType } from '../../enum/index.js';

export interface OAuthAccountFilter {
  providerId?: string;
  provider?: OAuthAccountProviderType;
  userId?: string;
}
