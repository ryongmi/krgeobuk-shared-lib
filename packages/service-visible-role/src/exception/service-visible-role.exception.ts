import { HttpException } from '@nestjs/common';
import { ServiceVisibleRoleError } from './service-visible-role.error.js';

export class ServiceVisibleRoleException {
  /**  =============================================================================
   *
   *        000 ~ 099 에러 코드
   *
   *   =============================================================================
   */

  /** 서비스에 역할 할당 중 서버 오류 */
  static assignError(): HttpException {
    const e = ServiceVisibleRoleError.ASSIGN_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 서비스로부터 역할 해제 중 서버 오류 */
  static revokeError(): HttpException {
    const e = ServiceVisibleRoleError.REVOKE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 서비스에 여러 역할 할당 중 서버 오류 */
  static assignMultipleError(): HttpException {
    const e = ServiceVisibleRoleError.ASSIGN_MULTIPLE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 서비스로부터 여러 역할 해제 중 서버 오류 */
  static revokeMultipleError(): HttpException {
    const e = ServiceVisibleRoleError.REVOKE_MULTIPLE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 서비스의 역할 교체 중 서버 오류 */
  static replaceError(): HttpException {
    const e = ServiceVisibleRoleError.REPLACE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 서비스-역할 관계 조회 중 서버 오류 */
  static fetchError(): HttpException {
    const e = ServiceVisibleRoleError.FETCH_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */

  /** 서비스-역할 관계를 찾을 수 없음 */
  static serviceVisibleRoleNotFound(): HttpException {
    const e = ServiceVisibleRoleError.SERVICE_VISIBLE_ROLE_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 서비스를 찾을 수 없음 */
  static serviceNotFound(): HttpException {
    const e = ServiceVisibleRoleError.SERVICE_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 역할을 찾을 수 없음 */
  static roleNotFound(): HttpException {
    const e = ServiceVisibleRoleError.ROLE_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        200 ~ 299 에러 코드
   *
   *   =============================================================================
   */

  /** 서비스에 이미 할당된 역할 */
  static serviceVisibleRoleAlreadyExists(): HttpException {
    const e = ServiceVisibleRoleError.SERVICE_VISIBLE_ROLE_ALREADY_EXISTS;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 유효하지 않은 서비스-역할 관계 */
  static invalidServiceVisibleRoleRelation(): HttpException {
    const e = ServiceVisibleRoleError.INVALID_SERVICE_VISIBLE_ROLE_RELATION;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        300 ~ 399 에러 코드
   *
   *   =============================================================================
   */

  /** 배치 작업 부분 실패 */
  static bulkOperationPartialFailure(): HttpException {
    const e = ServiceVisibleRoleError.BULK_OPERATION_PARTIAL_FAILURE;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 배치 작업 유효성 검사 실패 */
  static bulkOperationValidationFailed(): HttpException {
    const e = ServiceVisibleRoleError.BULK_OPERATION_VALIDATION_FAILED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}

