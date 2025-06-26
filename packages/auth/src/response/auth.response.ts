import { AuthCode } from '../codes/index.js';
import { AuthMessage } from '../messages/index.js';

export class AuthResponse {
  /**  =============================================================================
   *
   *        200 ~ 299	성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly LOGIN_SUCCESS = {
    code: AuthCode.LOGIN_SUCCESS,
    message: AuthMessage.LOGIN_SUCCESS,
    statusCode: 200,
  };

  static readonly SIGNUP_SUCCESS = {
    code: AuthCode.SIGNUP_SUCCESS,
    message: AuthMessage.SIGNUP_SUCCESS,
    statusCode: 201,
  };

  static readonly LOGOUT_SUCCESS = {
    code: AuthCode.LOGOUT_SUCCESS,
    message: AuthMessage.LOGOUT_SUCCESS,
    statusCode: 200,
  };

  static readonly REFRESH_SUCCESS = {
    code: AuthCode.REFRESH_SUCCESS,
    message: AuthMessage.REFRESH_SUCCESS,
    statusCode: 200,
  };
}
