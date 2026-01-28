import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';

export interface OAuthAccountSearchResult {
  id: string;
  provider: OAuthAccountProviderType;
  createdAt: Date;
}
