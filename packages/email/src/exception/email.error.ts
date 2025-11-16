import { EmailCode } from '../codes/index.js';
import { EmailMessage } from '../messages/index.js';

export class EmailError {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly SEND_FAILED = {
    code: EmailCode.SEND_FAILED,
    message: EmailMessage.SEND_FAILED,
    statusCode: 500,
  };

  static readonly TEMPLATE_NOT_FOUND = {
    code: EmailCode.TEMPLATE_NOT_FOUND,
    message: EmailMessage.TEMPLATE_NOT_FOUND,
    statusCode: 404,
  };

  static readonly TEMPLATE_COMPILE_ERROR = {
    code: EmailCode.TEMPLATE_COMPILE_ERROR,
    message: EmailMessage.TEMPLATE_COMPILE_ERROR,
    statusCode: 500,
  };

  static readonly TEMPLATE_RENDER_ERROR = {
    code: EmailCode.TEMPLATE_RENDER_ERROR,
    message: EmailMessage.TEMPLATE_RENDER_ERROR,
    statusCode: 500,
  };

  static readonly CONNECTION_FAILED = {
    code: EmailCode.CONNECTION_FAILED,
    message: EmailMessage.CONNECTION_FAILED,
    statusCode: 503,
  };

  static readonly INVALID_RECIPIENT = {
    code: EmailCode.INVALID_RECIPIENT,
    message: EmailMessage.INVALID_RECIPIENT,
    statusCode: 400,
  };

  static readonly INVALID_SENDER = {
    code: EmailCode.INVALID_SENDER,
    message: EmailMessage.INVALID_SENDER,
    statusCode: 400,
  };

  static readonly SMTP_CONFIG_MISSING = {
    code: EmailCode.SMTP_CONFIG_MISSING,
    message: EmailMessage.SMTP_CONFIG_MISSING,
    statusCode: 500,
  };

  static readonly VERIFICATION_TOKEN_INVALID = {
    code: EmailCode.VERIFICATION_TOKEN_INVALID,
    message: EmailMessage.VERIFICATION_TOKEN_INVALID,
    statusCode: 400,
  };

  static readonly ALREADY_VERIFIED = {
    code: EmailCode.ALREADY_VERIFIED,
    message: EmailMessage.ALREADY_VERIFIED,
    statusCode: 409,
  };
}
