import { ExposeAutoIncrementIdDto } from '@krgeobuk/core/dtos';

import { ExposeProvider } from '@krgeobuk/shared/oauth';
import {
  ExposeStatus,
  ExposeSourceEmail,
  ExposeTargetEmail,
  ExposeExpiresAt,
} from '@krgeobuk/shared/account-merge';
import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';
import type { AccountMergeStatus } from '@krgeobuk/shared/account-merge';

import type { GetAccountMergeResponse } from '../interfaces/get-account-merge-response.interface.js';

/**
 * 계정 병합 요청 조회 응답 DTO
 */
export class GetAccountMergeResponseDto
  extends ExposeAutoIncrementIdDto
  implements GetAccountMergeResponse
{
  @ExposeExpiresAt()
  expiresAt!: Date;

  @ExposeProvider()
  provider!: OAuthAccountProviderType;

  @ExposeStatus()
  status!: AccountMergeStatus;

  @ExposeSourceEmail()
  sourceEmail!: string;

  @ExposeTargetEmail()
  targetEmail!: string;
}
