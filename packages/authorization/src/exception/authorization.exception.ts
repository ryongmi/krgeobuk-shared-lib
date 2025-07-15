import { HttpException } from '@nestjs/common';

import { AuthorizationError } from './authorization.error.js';

/**
 * Authorization 예외 클래스
 */
export class AuthorizationException {
  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 권한 거부 */
  static permissionDenied(permission?: string): HttpException {
    const e = AuthorizationError.PERMISSION_DENIED;
    const message = permission ? `'${permission}' 권한이 필요합니다.` : e.message;
    return new HttpException({ code: e.code, message }, e.statusCode);
  }

  /** 역할 접근 거부 */
  static roleAccessDenied(role?: string): HttpException {
    const e = AuthorizationError.ROLE_ACCESS_DENIED;
    const message = role ? `'${role}' 역할이 필요합니다.` : e.message;
    return new HttpException({ code: e.code, message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        200 ~ 299 Authorization Guard 전용 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 사용자 인증되지 않음 */
  static userNotAuthenticated(): HttpException {
    const e = AuthorizationError.USER_NOT_AUTHENTICATED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 서비스 이용 불가 */
  static serviceUnavailable(): HttpException {
    const e = AuthorizationError.SERVICE_UNAVAILABLE;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 네트워크 에러 */
  static networkError(): HttpException {
    const e = AuthorizationError.AUTHORIZATION_NETWORK_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 타임아웃 에러 */
  static timeoutError(): HttpException {
    const e = AuthorizationError.AUTHORIZATION_TIMEOUT_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}