import { ExposeAutoIncrementIdDto } from '@krgeobuk/core/dtos';

import { ExposeProvider } from '@krgeobuk/shared/oauth';
import {
  ExposeStatus,
  ExposeSourceEmail,
  ExposeTargetEmail,
  ExposeExpiresAt,
} from '@krgeobuk/shared/account-merge';
import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';

/**
 * 계정 병합 요청 조회 응답 DTO
 */
export class AccountMergeResponseDto extends ExposeAutoIncrementIdDto {
  @ExposeExpiresAt()
  expiresAt!: Date;

  @ExposeProvider()
  provider!: OAuthAccountProviderType;

  @ExposeStatus()
  status!: string;

  @ExposeSourceEmail()
  sourceEmail!: string;

  @ExposeTargetEmail()
  targetEmail!: string;
}
