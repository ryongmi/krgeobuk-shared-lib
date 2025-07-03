import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';

export interface OAuthAccountFilter {
  providerId?: string;
  provider?: OAuthAccountProviderType;
  userId?: string;
}
