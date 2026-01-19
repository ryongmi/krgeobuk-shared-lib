import { ExposeRequestId } from '@krgeobuk/shared/account-merge';

import type { InitiateAccountMergeResponse } from '../interfaces/initiate-account-merge-response.interface.js';

/**
 * 계정 병합 요청 생성 응답 DTO
 */
export class InitiateAccountMergeResponseDto implements InitiateAccountMergeResponse {
  @ExposeRequestId()
  requestId!: number;
}
