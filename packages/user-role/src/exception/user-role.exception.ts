import { HttpException } from '@nestjs/common';

import { UserRoleError } from './user-role.error.js';

export class UserRoleException {
  /**  =============================================================================
   *
   *        000 ~ 099	서버 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 사용자에게 역할 할당 중 서버 오류 */
  static assignError(): HttpException {
    const e = UserRoleError.ASSIGN_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 사용자로부터 역할 해제 중 서버 오류 */
  static revokeError(): HttpException {
    const e = UserRoleError.REVOKE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 사용자에게 여러 역할 할당 중 서버 오류 */
  static assignMultipleError(): HttpException {
    const e = UserRoleError.ASSIGN_MULTIPLE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 사용자로부터 여러 역할 해제 중 서버 오류 */
  static revokeMultipleError(): HttpException {
    const e = UserRoleError.REVOKE_MULTIPLE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 사용자의 역할 교체 중 서버 오류 */
  static replaceError(): HttpException {
    const e = UserRoleError.REPLACE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 사용자-역할 관계 조회 중 서버 오류 */
  static fetchError(): HttpException {
    const e = UserRoleError.FETCH_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        100 ~ 199 관계 조회 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 사용자-역할 관계를 찾을 수 없음 */
  static userRoleNotFound(): HttpException {
    const e = UserRoleError.USER_ROLE_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 사용자를 찾을 수 없음 */
  static userNotFound(): HttpException {
    const e = UserRoleError.USER_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 역할을 찾을 수 없음 */
  static roleNotFound(): HttpException {
    const e = UserRoleError.ROLE_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        200 ~ 299 관계 할당 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 사용자에게 이미 할당된 역할 */
  static userRoleAlreadyExists(): HttpException {
    const e = UserRoleError.USER_ROLE_ALREADY_EXISTS;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 유효하지 않은 사용자-역할 관계 */
  static invalidUserRoleRelation(): HttpException {
    const e = UserRoleError.INVALID_USER_ROLE_RELATION;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        300 ~ 399 배치 처리 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 배치 작업 부분 실패 */
  static bulkOperationPartialFailure(): HttpException {
    const e = UserRoleError.BULK_OPERATION_PARTIAL_FAILURE;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 배치 작업 유효성 검사 실패 */
  static bulkOperationValidationFailed(): HttpException {
    const e = UserRoleError.BULK_OPERATION_VALIDATION_FAILED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}
