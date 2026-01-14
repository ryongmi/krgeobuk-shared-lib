import { HttpException } from '@nestjs/common';

import { AccountMergeError } from './account-merge.error.js';

/**
 * 계정 병합 도메인 예외 클래스
 * static factory method 패턴으로 HttpException 생성
 */

export class AccountMergeException {
  /**  =============================================================================
   *
   *        000 ~ 099 일반 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 동일한 계정을 병합할 수 없음 */
  static sameAccountMerge(): HttpException {
    const e = AccountMergeError.SAME_ACCOUNT_MERGE;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 계정 병합을 처리할 권한이 없음 */
  static unauthorized(): HttpException {
    const e = AccountMergeError.UNAUTHORIZED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 잘못된 상태 */
  static invalidStatus(): HttpException {
    const e = AccountMergeError.INVALID_STATUS;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 병합 요청이 만료됨 */
  static requestExpired(): HttpException {
    const e = AccountMergeError.REQUEST_EXPIRED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 상태 전환이 불가능함 */
  static invalidTransition(from: string, to: string): HttpException {
    const e = AccountMergeError.INVALID_TRANSITION;
    return new HttpException(
      {
        code: e.code,
        message: `상태를 ${from}에서 ${to}로 전환할 수 없습니다.`,
      },
      e.statusCode
    );
  }

  /**  =============================================================================
   *
   *        100 ~ 199 병합 프로세스 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 계정 병합 요청 생성 실패 */
  static requestCreationFailed(): HttpException {
    const e = AccountMergeError.REQUEST_CREATION_FAILED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 확인 이메일 발송 실패 */
  static emailSendFailed(): HttpException {
    const e = AccountMergeError.EMAIL_SEND_FAILED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 유효하지 않거나 만료된 토큰 */
  static tokenInvalidOrExpired(): HttpException {
    const e = AccountMergeError.TOKEN_INVALID_OR_EXPIRED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 계정 병합 실행 실패 */
  static executionFailed(): HttpException {
    const e = AccountMergeError.EXECUTION_FAILED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 진행 중인 병합은 취소할 수 없음 */
  static cannotCancel(): HttpException {
    const e = AccountMergeError.CANNOT_CANCEL;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 계정 병합 요청을 찾을 수 없음 */
  static requestNotFound(): HttpException {
    const e = AccountMergeError.REQUEST_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}
