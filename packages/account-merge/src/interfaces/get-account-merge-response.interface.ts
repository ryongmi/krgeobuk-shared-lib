import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';

export interface GetAccountMergeResponse {
  id: number;
  createdAt?: Date;
  expiresAt: Date;
  provider: OAuthAccountProviderType;
  status: string;
  sourceEmail: string;
  targetEmail: string;
}
