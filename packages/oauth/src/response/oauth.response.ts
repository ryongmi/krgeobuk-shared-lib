import { OAuthCode } from '../codes/index.js';
import { OAuthMessage } from '../messages/index.js';

export class OAuthResponse {
  /**  =============================================================================
   *
   *        300 ~ 399	리다이렉트 응답 코드 (SSO & Link)
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

  static readonly GOOGLE_LINK_START_REDIRECT = {
    code: OAuthCode.GOOGLE_LINK_START_REDIRECT,
    message: OAuthMessage.GOOGLE_LINK_START_REDIRECT,
    statusCode: 302,
  };

  static readonly NAVER_LINK_START_REDIRECT = {
    code: OAuthCode.NAVER_LINK_START_REDIRECT,
    message: OAuthMessage.NAVER_LINK_START_REDIRECT,
    statusCode: 302,
  };

  /**  =============================================================================
   *
   *        400 ~ 499 성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  /** 연동된 OAuth 계정 목록 조회 성공 */
  static readonly LINKED_ACCOUNTS_FETCHED = {
    code: OAuthCode.LINKED_ACCOUNTS_FETCHED,
    message: OAuthMessage.LINKED_ACCOUNTS_FETCHED,
    statusCode: 200,
  };

  /** OAuth 계정 연동 해제 성공 */
  static readonly ACCOUNT_UNLINKED = {
    code: OAuthCode.ACCOUNT_UNLINKED,
    message: OAuthMessage.ACCOUNT_UNLINKED,
    statusCode: 200,
  };
}
