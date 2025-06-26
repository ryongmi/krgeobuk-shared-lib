import { AuthCode } from '../codes/index.js';
import { AuthMessage } from '../messages/index.js';

export class AuthError {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly LOGIN_ERROR = {
    code: AuthCode.LOGIN_ERROR,
    message: AuthMessage.LOGIN_ERROR,
    statusCode: 500,
  };

  static readonly SIGNUP_ERROR = {
    code: AuthCode.SIGNUP_ERROR,
    message: AuthMessage.SIGNUP_ERROR,
    statusCode: 500,
  };

  static readonly LOGOUT_ERROR = {
    code: AuthCode.LOGOUT_ERROR,
    message: AuthMessage.LOGOUT_ERROR,
    statusCode: 500,
  };

  static readonly REFRESH_ERROR = {
    code: AuthCode.REFRESH_ERROR,
    message: AuthMessage.REFRESH_ERROR,
    statusCode: 500,
  };
}
