import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';
import type { AccountMergeStatus } from '@krgeobuk/shared/account-merge';

export interface GetAccountMergeResponse {
  id: number;
  createdAt?: Date;
  expiresAt: Date;
  provider: OAuthAccountProviderType;
  status: AccountMergeStatus;
  sourceEmail: string;
  targetEmail: string;
}
