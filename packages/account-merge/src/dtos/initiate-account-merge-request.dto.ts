import { IsValidEmail } from '@krgeobuk/shared/user';
import { IsValidProvider, IsValidProviderId } from '@krgeobuk/shared/oauth';
import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';

import type { InitiateAccountMergeRequest } from '../interfaces/initiate-account-merge-request.interface.js';

/**
 * 계정 병합 요청 DTO
 * User A가 이미 가입된 이메일로 다른 OAuth provider로 로그인 시도 시 사용
 */
export class InitiateAccountMergeRequestDto implements InitiateAccountMergeRequest {
  @IsValidProvider()
  provider!: OAuthAccountProviderType;

  @IsValidProviderId()
  providerId!: string;

  @IsValidEmail()
  email!: string;
}
