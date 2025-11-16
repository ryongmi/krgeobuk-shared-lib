import { EmailCode } from '../codes/index.js';
import { EmailMessage } from '../messages/index.js';

export class EmailResponse {
  /**  =============================================================================
   *
   *        200 ~ 299	성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly SEND_SUCCESS = {
    code: EmailCode.SEND_SUCCESS,
    message: EmailMessage.SEND_SUCCESS,
    statusCode: 200,
  };

  static readonly TEMPLATE_LOADED = {
    code: EmailCode.TEMPLATE_LOADED,
    message: EmailMessage.TEMPLATE_LOADED,
    statusCode: 200,
  };

  static readonly TEMPLATE_COMPILED = {
    code: EmailCode.TEMPLATE_COMPILED,
    message: EmailMessage.TEMPLATE_COMPILED,
    statusCode: 200,
  };

  static readonly CONNECTION_SUCCESS = {
    code: EmailCode.CONNECTION_SUCCESS,
    message: EmailMessage.CONNECTION_SUCCESS,
    statusCode: 200,
  };

  static readonly VERIFICATION_REQUEST_SUCCESS = {
    code: EmailCode.VERIFICATION_REQUEST_SUCCESS,
    message: EmailMessage.VERIFICATION_REQUEST_SUCCESS,
    statusCode: 200,
  };

  static readonly VERIFICATION_SUCCESS = {
    code: EmailCode.VERIFICATION_SUCCESS,
    message: EmailMessage.VERIFICATION_SUCCESS,
    statusCode: 200,
  };
}
