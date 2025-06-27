import { JwtCode } from '../codes/index.js';
import { JwtMessage } from '../messages/index.js';

export class JwtError {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly CONFIG_MISSING = {
    code: JwtCode.CONFIG_MISSING,
    message: JwtMessage.CONFIG_MISSING,
    statusCode: 500,
  };

  static readonly PRIVATE_KEY_MISSING = {
    code: JwtCode.PRIVATE_KEY_MISSING,
    message: JwtMessage.PRIVATE_KEY_MISSING,
    statusCode: 500,
  };

  static readonly PUBLIC_KEY_MISSING = {
    code: JwtCode.PUBLIC_KEY_MISSING,
    message: JwtMessage.PUBLIC_KEY_MISSING,
    statusCode: 500,
  };

  static readonly EXPIRE_MISSING = {
    code: JwtCode.EXPIRE_MISSING,
    message: JwtMessage.EXPIRE_MISSING,
    statusCode: 500,
  };

  static readonly SIGN_FAILURE = {
    code: JwtCode.SIGN_FAILURE,
    message: JwtMessage.SIGN_FAILURE,
    statusCode: 500,
  };

  static readonly DECRYPTION_FAILED = {
    code: JwtCode.DECRYPTION_FAILED,
    message: JwtMessage.DECRYPTION_FAILED,
    statusCode: 401,
  };

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly NOT_FOUND = {
    code: JwtCode.NOT_FOUND,
    message: JwtMessage.NOT_FOUND,
    statusCode: 401,
  };

  static readonly INVALID = {
    code: JwtCode.INVALID,
    message: JwtMessage.INVALID,
    statusCode: 401,
  };

  static readonly EXPIRED = {
    code: JwtCode.EXPIRED,
    message: JwtMessage.EXPIRED,
    statusCode: 401,
  };

  static readonly MALFORMED = {
    code: JwtCode.MALFORMED,
    message: JwtMessage.MALFORMED,
    statusCode: 401,
  };

  static readonly UNSUPPORTED = {
    code: JwtCode.UNSUPPORTED,
    message: JwtMessage.UNSUPPORTED,
    statusCode: 401,
  };

  static readonly MISSING_BEARER = {
    code: JwtCode.MISSING_BEARER,
    message: JwtMessage.MISSING_BEARER,
    statusCode: 401,
  };
}
