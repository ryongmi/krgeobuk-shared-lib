import { UserCode } from '../codes/index.js';
import { UserMessage } from '../messages/index.js';

export class UserError {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly PROFILE_FETCH_ERROR = {
    code: UserCode.PROFILE_FETCH_ERROR,
    message: UserMessage.PROFILE_FETCH_ERROR,
    statusCode: 500,
  };

  static readonly PROFILE_UPDATE_ERROR = {
    code: UserCode.PROFILE_UPDATE_ERROR,
    message: UserMessage.PROFILE_UPDATE_ERROR,
    statusCode: 500,
  };

  static readonly PASSWORD_CHANGE_ERROR = {
    code: UserCode.PASSWORD_CHANGE_ERROR,
    message: UserMessage.PASSWORD_CHANGE_ERROR,
    statusCode: 500,
  };

  static readonly ACCOUNT_DELETE_ERROR = {
    code: UserCode.ACCOUNT_DELETE_ERROR,
    message: UserMessage.ACCOUNT_DELETE_ERROR,
    statusCode: 500,
  };

  static readonly USER_SEARCH_ERROR = {
    code: UserCode.USER_SEARCH_ERROR,
    message: UserMessage.USER_SEARCH_ERROR,
    statusCode: 500,
  };

  static readonly USER_FETCH_ERROR = {
    code: UserCode.USER_FETCH_ERROR,
    message: UserMessage.USER_FETCH_ERROR,
    statusCode: 500,
  };

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly USER_NOT_FOUND = {
    code: UserCode.USER_NOT_FOUND,
    message: UserMessage.USER_NOT_FOUND,
    statusCode: 404,
  };

  static readonly PASSWORD_INCORRECT = {
    code: UserCode.PASSWORD_INCORRECT,
    message: UserMessage.PASSWORD_INCORRECT,
    statusCode: 400,
  };

  static readonly INVALID_UPDATE_PAYLOAD = {
    code: UserCode.INVALID_UPDATE_PAYLOAD,
    message: UserMessage.INVALID_UPDATE_PAYLOAD,
    statusCode: 400,
  };

  static readonly UNAUTHORIZED_UPDATE = {
    code: UserCode.UNAUTHORIZED_UPDATE,
    message: UserMessage.UNAUTHORIZED_UPDATE,
    statusCode: 403,
  };

  static readonly EMAIL_ALREADY_EXISTS = {
    code: UserCode.EMAIL_ALREADY_EXISTS,
    message: UserMessage.EMAIL_ALREADY_EXISTS,
    statusCode: 409,
  };
}
