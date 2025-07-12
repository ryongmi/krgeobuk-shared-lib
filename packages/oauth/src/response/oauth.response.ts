import { OAuthCode } from '../codes/index.js';
import { OAuthMessage } from '../messages/index.js';

export class OAuthResponse {
  /**  =============================================================================
   *
   *        200 ~ 299	성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly LOGIN_SUCCESS = {
    code: OAuthCode.LOGIN_SUCCESS,
    message: OAuthMessage.LOGIN_SUCCESS,
    statusCode: 200,
  };

  static readonly SIGNUP_SUCCESS = {
    code: OAuthCode.SIGNUP_SUCCESS,
    message: OAuthMessage.SIGNUP_SUCCESS,
    statusCode: 201,
  };

  static readonly LOGOUT_SUCCESS = {
    code: OAuthCode.LOGOUT_SUCCESS,
    message: OAuthMessage.LOGOUT_SUCCESS,
    statusCode: 204,
  };
}
