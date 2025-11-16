import { HttpException } from '@nestjs/common';

import { EmailError } from './email.error.js';

export class EmailException {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 이메일 발송 실패 */
  static sendFailed(): HttpException {
    const e = EmailError.SEND_FAILED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 템플릿을 찾을 수 없음 */
  static templateNotFound(): HttpException {
    const e = EmailError.TEMPLATE_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 템플릿 컴파일 오류 */
  static templateCompileError(): HttpException {
    const e = EmailError.TEMPLATE_COMPILE_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 템플릿 렌더링 오류 */
  static templateRenderError(): HttpException {
    const e = EmailError.TEMPLATE_RENDER_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** SMTP 연결 실패 */
  static connectionFailed(): HttpException {
    const e = EmailError.CONNECTION_FAILED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 유효하지 않은 수신자 */
  static invalidRecipient(): HttpException {
    const e = EmailError.INVALID_RECIPIENT;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 유효하지 않은 발신자 */
  static invalidSender(): HttpException {
    const e = EmailError.INVALID_SENDER;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** SMTP 설정 누락 */
  static smtpConfigMissing(): HttpException {
    const e = EmailError.SMTP_CONFIG_MISSING;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 유효하지 않은 인증 토큰 */
  static verificationTokenInvalid(): HttpException {
    const e = EmailError.VERIFICATION_TOKEN_INVALID;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 이미 인증 완료된 이메일 */
  static alreadyVerified(): HttpException {
    const e = EmailError.ALREADY_VERIFIED;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}
