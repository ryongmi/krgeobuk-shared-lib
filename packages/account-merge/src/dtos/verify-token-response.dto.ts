import { ExposeRequestId } from '@krgeobuk/shared/account-merge';

import type { VerifyTokenResponse } from '../interfaces/verify-token-response.interface.js';

/**
 * 병합 확인 토큰 검증 응답 DTO
 */
export class VerifyTokenResponseDto implements VerifyTokenResponse {
  @ExposeRequestId()
  requestId!: number;
}
