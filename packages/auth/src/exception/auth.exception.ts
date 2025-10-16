import { HttpException } from '@nestjs/common';

import { AuthError } from './auth.error.js';

export class AuthException {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */

  /** 로그인 중 서버 오류 */
  static loginError(): HttpException {
    const e = AuthError.LOGIN_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 회원가입 중 서버 오류 */
  static signupError(): HttpException {
    const e = AuthError.SIGNUP_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 로그아웃 중 서버 오류 */
  static logoutError(): HttpException {
    const e = AuthError.LOGOUT_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 토근 재발급 중 서버 오류 */
  static refreshError(): HttpException {
    const e = AuthError.REFRESH_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 잘못된 리다이렉트 URI */
  static invalidRedirectUri(): HttpException {
    const e = AuthError.INVALID_REDIRECT_URI;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}
