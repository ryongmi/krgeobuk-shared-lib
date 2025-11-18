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


  static readonly LOGOUT_SUCCESS = {
    code: AuthCode.LOGOUT_SUCCESS,
    message: AuthMessage.LOGOUT_SUCCESS,
    statusCode: 204,
  };

  static readonly SSO_LOGIN_REDIRECT = {
    code: AuthCode.SSO_LOGIN_REDIRECT,
    message: AuthMessage.SSO_LOGIN_REDIRECT,
    statusCode: 200,
  };

  static readonly SSO_SIGNUP_REDIRECT = {
    code: AuthCode.SSO_SIGNUP_REDIRECT,
    message: AuthMessage.SSO_SIGNUP_REDIRECT,
    statusCode: 200,
  };

  static readonly REFRESH_SUCCESS = {
    code: AuthCode.REFRESH_SUCCESS,
    message: AuthMessage.REFRESH_SUCCESS,
    statusCode: 200,
  };

  static readonly INITIALIZE_SUCCESS = {
    code: AuthCode.INITIALIZE_SUCCESS,
    message: AuthMessage.INITIALIZE_SUCCESS,
    statusCode: 200,
  };

  static readonly PASSWORD_RESET_EMAIL_SENT = {
    code: AuthCode.PASSWORD_RESET_EMAIL_SENT,
    message: AuthMessage.PASSWORD_RESET_EMAIL_SENT,
    statusCode: 200,
  };

  static readonly PASSWORD_RESET_SUCCESS = {
    code: AuthCode.PASSWORD_RESET_SUCCESS,
    message: AuthMessage.PASSWORD_RESET_SUCCESS,
    statusCode: 200,
  };

  /**  =============================================================================
   *
   *        300 ~ 399	리다이렉트 응답 코드 (SSO)
   *
   *   =============================================================================
   */
  /** */

  static readonly SSO_LOGIN_START_REDIRECT = {
    code: AuthCode.SSO_LOGIN_START_REDIRECT,
    message: AuthMessage.SSO_LOGIN_START_REDIRECT,
    statusCode: 302,
  };
}
