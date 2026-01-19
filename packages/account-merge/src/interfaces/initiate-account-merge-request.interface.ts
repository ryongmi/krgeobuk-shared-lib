import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';

export interface InitiateAccountMergeRequest {
  provider: OAuthAccountProviderType;
  providerId: string;
  email: string;
}
