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


  /**  =============================================================================
   *
   *        300 ~ 399	리다이렉트 응답 코드 (SSO)
   *
   *   =============================================================================
   */
  /** */

  static readonly GOOGLE_SSO_REDIRECT = {
    code: OAuthCode.GOOGLE_SSO_REDIRECT,
    message: OAuthMessage.GOOGLE_SSO_REDIRECT,
    statusCode: 302,
  };

  static readonly NAVER_SSO_REDIRECT = {
    code: OAuthCode.NAVER_SSO_REDIRECT,
    message: OAuthMessage.NAVER_SSO_REDIRECT,
    statusCode: 302,
  };

  static readonly OAUTH_LOGIN_START_REDIRECT = {
    code: OAuthCode.OAUTH_LOGIN_START_REDIRECT,
    message: OAuthMessage.OAUTH_LOGIN_START_REDIRECT,
    statusCode: 302,
  };
}
