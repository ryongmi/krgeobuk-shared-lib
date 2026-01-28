import { AccountMergeCode } from '../codes/index.js';
import { AccountMergeMessage } from '../messages/index.js';

/**
 * 계정 병합 도메인 성공 응답 정의 클래스
 * 각 응답은 code, message, statusCode를 포함
 */

export class AccountMergeResponse {
  /**  =============================================================================
   *
   *        200 ~ 299 성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  /** 계정 병합 요청 생성 성공 */
  static readonly REQUEST_CREATED = {
    code: AccountMergeCode.REQUEST_CREATED,
    message: AccountMergeMessage.REQUEST_CREATED,
    statusCode: 201,
  };

  /** 조회 성공 */
  static readonly FETCH_SUCCESS = {
    code: AccountMergeCode.FETCH_SUCCESS,
    message: AccountMergeMessage.FETCH_SUCCESS,
    statusCode: 200,
  };

  /** 계정 병합 완료 */
  static readonly MERGE_COMPLETED = {
    code: AccountMergeCode.MERGE_COMPLETED,
    message: AccountMergeMessage.MERGE_COMPLETED,
    statusCode: 200,
  };

  /** 계정 병합 요청 거부됨 */
  static readonly MERGE_REJECTED = {
    code: AccountMergeCode.MERGE_REJECTED,
    message: AccountMergeMessage.MERGE_REJECTED,
    statusCode: 200,
  };

  /** 토큰 검증 성공 */
  static readonly TOKEN_VERIFIED = {
    code: AccountMergeCode.TOKEN_VERIFIED,
    message: AccountMergeMessage.TOKEN_VERIFIED,
    statusCode: 200,
  };
}
