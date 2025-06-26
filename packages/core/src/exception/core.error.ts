import { CoreCode } from '../codes/core-code.constant.js';
import { CoreMessage } from '../messages/core.message.js';

export class CoreError {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly SERVER_ERROR = {
    code: CoreCode.SERVER_ERROR,
    message: CoreMessage.SERVER_ERROR,
    statusCode: 500,
  };

  static readonly BAD_REQUEST = {
    code: CoreCode.BAD_REQUEST,
    message: CoreMessage.BAD_REQUEST,
    statusCode: 400,
  };

  static readonly UNAUTHORIZED = {
    code: CoreCode.UNAUTHORIZED,
    message: CoreMessage.UNAUTHORIZED,
    statusCode: 401,
  };

  static readonly FORBIDDEN = {
    code: CoreCode.FORBIDDEN,
    message: CoreMessage.FORBIDDEN,
    statusCode: 403,
  };
}
