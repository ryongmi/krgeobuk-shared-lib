import { AccountMergeCode } from '../codes/index.js';
import { AccountMergeMessage } from '../messages/index.js';

/**
 * 계정 병합 도메인 에러 정의 클래스
 * 각 에러는 code, message, statusCode를 포함
 */

export class AccountMergeError {
  /**  =============================================================================
   *
   *        000 ~ 099 일반 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 동일한 계정을 병합할 수 없음 */
  static readonly SAME_ACCOUNT_MERGE = {
    code: AccountMergeCode.SAME_ACCOUNT_MERGE,
    message: AccountMergeMessage.SAME_ACCOUNT_MERGE,
    statusCode: 400,
  };

  /** 계정 병합을 처리할 권한이 없음 */
  static readonly UNAUTHORIZED = {
    code: AccountMergeCode.UNAUTHORIZED,
    message: AccountMergeMessage.UNAUTHORIZED,
    statusCode: 403,
  };

  /** 잘못된 상태 */
  static readonly INVALID_STATUS = {
    code: AccountMergeCode.INVALID_STATUS,
    message: AccountMergeMessage.INVALID_STATUS,
    statusCode: 400,
  };

  /** 병합 요청이 만료됨 */
  static readonly REQUEST_EXPIRED = {
    code: AccountMergeCode.REQUEST_EXPIRED,
    message: AccountMergeMessage.REQUEST_EXPIRED,
    statusCode: 400,
  };

  /** 상태 전환이 불가능함 */
  static readonly INVALID_TRANSITION = {
    code: AccountMergeCode.INVALID_TRANSITION,
    message: AccountMergeMessage.INVALID_TRANSITION,
    statusCode: 400,
  };

  /**  =============================================================================
   *
   *        100 ~ 199 병합 프로세스 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 계정 병합 요청 생성 실패 */
  static readonly REQUEST_CREATION_FAILED = {
    code: AccountMergeCode.REQUEST_CREATION_FAILED,
    message: AccountMergeMessage.REQUEST_CREATION_FAILED,
    statusCode: 500,
  };

  /** 확인 이메일 발송 실패 */
  static readonly EMAIL_SEND_FAILED = {
    code: AccountMergeCode.EMAIL_SEND_FAILED,
    message: AccountMergeMessage.EMAIL_SEND_FAILED,
    statusCode: 500,
  };

  /** 유효하지 않거나 만료된 토큰 */
  static readonly TOKEN_INVALID_OR_EXPIRED = {
    code: AccountMergeCode.TOKEN_INVALID_OR_EXPIRED,
    message: AccountMergeMessage.TOKEN_INVALID_OR_EXPIRED,
    statusCode: 401,
  };

  /** 계정 병합 실행 실패 */
  static readonly EXECUTION_FAILED = {
    code: AccountMergeCode.EXECUTION_FAILED,
    message: AccountMergeMessage.EXECUTION_FAILED,
    statusCode: 500,
  };

  /** 진행 중인 병합은 취소할 수 없음 */
  static readonly CANNOT_CANCEL = {
    code: AccountMergeCode.CANNOT_CANCEL,
    message: AccountMergeMessage.CANNOT_CANCEL,
    statusCode: 400,
  };

  /** 계정 병합 요청을 찾을 수 없음 */
  static readonly REQUEST_NOT_FOUND = {
    code: AccountMergeCode.REQUEST_NOT_FOUND,
    message: AccountMergeMessage.REQUEST_NOT_FOUND,
    statusCode: 404,
  };
}
