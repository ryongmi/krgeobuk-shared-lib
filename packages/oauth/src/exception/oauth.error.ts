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

  static readonly INVALID_STATE = {
    code: OAuthCode.INVALID_STATE,
    message: OAuthMessage.INVALID_STATE,
    statusCode: 400,
  };

  static readonly OAUTH_CANCELLED = {
    code: OAuthCode.OAUTH_CANCELLED,
    message: OAuthMessage.OAUTH_CANCELLED,
    statusCode: 400,
  };

  /**  =============================================================================
   *
   *        200 ~ 299 계정 연동 관련 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly CANNOT_UNLINK_LAST_ACCOUNT = {
    code: OAuthCode.CANNOT_UNLINK_LAST_ACCOUNT,
    message: OAuthMessage.CANNOT_UNLINK_LAST_ACCOUNT,
    statusCode: 400,
  };

  static readonly PROVIDER_NOT_LINKED = {
    code: OAuthCode.PROVIDER_NOT_LINKED,
    message: OAuthMessage.PROVIDER_NOT_LINKED,
    statusCode: 404,
  };

  static readonly ALREADY_LINKED_TO_ANOTHER_ACCOUNT = {
    code: OAuthCode.ALREADY_LINKED_TO_ANOTHER_ACCOUNT,
    message: OAuthMessage.ALREADY_LINKED_TO_ANOTHER_ACCOUNT,
    statusCode: 409,
  };

  static readonly PROVIDER_ALREADY_LINKED = {
    code: OAuthCode.PROVIDER_ALREADY_LINKED,
    message: OAuthMessage.PROVIDER_ALREADY_LINKED,
    statusCode: 409,
  };

  static readonly OAUTH_ACCOUNT_NOT_FOUND = {
    code: OAuthCode.OAUTH_ACCOUNT_NOT_FOUND,
    message: OAuthMessage.OAUTH_ACCOUNT_NOT_FOUND,
    statusCode: 404,
  };

  static readonly EMAIL_ALREADY_IN_USE = {
    code: OAuthCode.EMAIL_ALREADY_IN_USE,
    message: OAuthMessage.EMAIL_ALREADY_IN_USE,
    statusCode: 409,
  };

  /**  =============================================================================
   *
   *        210 ~ 215 계정 병합 관련 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly MERGE_REQUEST_CREATION_FAILED = {
    code: OAuthCode.MERGE_REQUEST_CREATION_FAILED,
    message: OAuthMessage.MERGE_REQUEST_CREATION_FAILED,
    statusCode: 500,
  };

  static readonly MERGE_EMAIL_SEND_FAILED = {
    code: OAuthCode.MERGE_EMAIL_SEND_FAILED,
    message: OAuthMessage.MERGE_EMAIL_SEND_FAILED,
    statusCode: 500,
  };

  static readonly MERGE_TOKEN_INVALID_OR_EXPIRED = {
    code: OAuthCode.MERGE_TOKEN_INVALID_OR_EXPIRED,
    message: OAuthMessage.MERGE_TOKEN_INVALID_OR_EXPIRED,
    statusCode: 401,
  };

  static readonly MERGE_EXECUTION_FAILED = {
    code: OAuthCode.MERGE_EXECUTION_FAILED,
    message: OAuthMessage.MERGE_EXECUTION_FAILED,
    statusCode: 500,
  };

  static readonly MERGE_CANNOT_CANCEL = {
    code: OAuthCode.MERGE_CANNOT_CANCEL,
    message: OAuthMessage.MERGE_CANNOT_CANCEL,
    statusCode: 400,
  };

  static readonly MERGE_REQUEST_NOT_FOUND = {
    code: OAuthCode.MERGE_REQUEST_NOT_FOUND,
    message: OAuthMessage.MERGE_REQUEST_NOT_FOUND,
    statusCode: 404,
  };
}
