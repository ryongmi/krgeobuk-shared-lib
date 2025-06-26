import { CoreCode } from '../codes/index.js';
import { CoreMessage } from '../messages/index.js';

export class CoreResponse {
  /**  =============================================================================
   *
   *        200 ~ 299	성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly REQUEST_SUCCESS = {
    code: CoreCode.REQUEST_SUCCESS,
    message: CoreMessage.REQUEST_SUCCESS,
    statusCode: 200,
  };
}
