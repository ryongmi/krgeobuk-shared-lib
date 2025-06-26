import { OAuthCode } from '../codes/index.js';
import { OAuthMessage } from '../messages/index.js';

export class OAuthError {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly CONFIG_MISSING = {
    code: OAuthCode.CONFIG_MISSING,
    message: OAuthMessage.CONFIG_MISSING,
    statusCode: 500,
  };

  static readonly STATE_GENERATION_FAILED = {
    code: OAuthCode.STATE_GENERATION_FAILED,
    message: OAuthMessage.STATE_GENERATION_FAILED,
    statusCode: 500,
  };

  static readonly USER_SAVE_FAILED = {
    code: OAuthCode.USER_SAVE_FAILED,
    message: OAuthMessage.USER_SAVE_FAILED,
    statusCode: 500,
  };

  static readonly LOGIN_ERROR = {
    code: OAuthCode.LOGIN_ERROR,
    message: OAuthMessage.LOGIN_ERROR,
    statusCode: 500,
  };

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly STATE_NOT_FOUND = {
    code: OAuthCode.STATE_NOT_FOUND,
    message: OAuthMessage.STATE_NOT_FOUND,
    statusCode: 401,
  };

  static readonly STATE_EXPIRED = {
    code: OAuthCode.STATE_EXPIRED,
    message: OAuthMessage.STATE_EXPIRED,
    statusCode: 401,
  };

  static readonly STATE_MISMATCH = {
    code: OAuthCode.STATE_MISMATCH,
    message: OAuthMessage.STATE_MISMATCH,
    statusCode: 401,
  };

  static readonly STATE_NOT_EXIST = {
    code: OAuthCode.STATE_NOT_EXIST,
    message: OAuthMessage.STATE_NOT_EXIST,
    statusCode: 401,
  };

  static readonly CODE_NOT_FOUND = {
    code: OAuthCode.CODE_NOT_FOUND,
    message: OAuthMessage.CODE_NOT_FOUND,
    statusCode: 400,
  };

  static readonly TOKEN_EXCHANGE_FAILED = {
    code: OAuthCode.TOKEN_EXCHANGE_FAILED,
    message: OAuthMessage.TOKEN_EXCHANGE_FAILED,
    statusCode: 401,
  };

  static readonly PROFILE_FETCH_FAILED = {
    code: OAuthCode.PROFILE_FETCH_FAILED,
    message: OAuthMessage.PROFILE_FETCH_FAILED,
    statusCode: 401,
  };

  static readonly UNSUPPORTED_PROVIDER = {
    code: OAuthCode.UNSUPPORTED_PROVIDER,
    message: OAuthMessage.UNSUPPORTED_PROVIDER,
    statusCode: 400,
  };
}
