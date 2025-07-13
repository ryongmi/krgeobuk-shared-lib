import { HttpException } from '@nestjs/common';
import { ServiceVisibleRoleError } from './service-visible-role.error.js';

export class ServiceVisibleRoleException {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */

  /** 서비스 가시 역할 작업 수행 중 서버 오류 */
  static operationError(): HttpException {
    const e = ServiceVisibleRoleError.OPERATION_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 서비스 가시 역할 유효성 검사 중 오류 */
  static validationError(): HttpException {
    const e = ServiceVisibleRoleError.VALIDATION_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 서비스 가시 역할 네트워크 통신 중 오류 */
  static networkError(): HttpException {
    const e = ServiceVisibleRoleError.NETWORK_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */

  /** 서비스 가시 역할 관계를 찾을 수 없음 */
  static serviceVisibleRoleNotFound(): HttpException {
    const e = ServiceVisibleRoleError.SERVICE_VISIBLE_ROLE_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 이미 존재하는 서비스 가시 역할 관계 */
  static serviceVisibleRoleAlreadyExists(): HttpException {
    const e = ServiceVisibleRoleError.SERVICE_VISIBLE_ROLE_ALREADY_EXISTS;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 잘못된 서비스 ID */
  static invalidServiceId(): HttpException {
    const e = ServiceVisibleRoleError.INVALID_SERVICE_ID;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 잘못된 역할 ID */
  static invalidRoleId(): HttpException {
    const e = ServiceVisibleRoleError.INVALID_ROLE_ID;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}