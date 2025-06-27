import { HttpException } from '@nestjs/common';

import { StringUtils } from '@krgeobuk/core/utils';

import { JwtError } from './jwt.error.js';
import type { TokenType } from '../types/index.js';

export class JwtException {
  private static label(type: TokenType): string {
    return StringUtils.capitalizeFirstLetter(type);
    // return type === 'access' ? 'Access' : 'Refresh';
  }

  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */

  /** 토큰 설정값(JWT config) 누락 */
  static configMissing(type: TokenType): HttpException {
    const e = JwtError.CONFIG_MISSING;
    return new HttpException(
      { code: e.code, message: `${this.label(type)} ${e.message}` },
      e.statusCode
    );
  }

  /** 토큰 개인키(private key) 미설정 */
  static privateKeyMissing(type: TokenType): HttpException {
    const e = JwtError.PRIVATE_KEY_MISSING;
    return new HttpException(
      { code: e.code, message: `${this.label(type)} ${e.message}` },
      e.statusCode
    );
  }

  /** 토큰 공개키(public key) 미설정 */
  static publicKeyMissing(type: TokenType): HttpException {
    const e = JwtError.PUBLIC_KEY_MISSING;
    return new HttpException(
      { code: e.code, message: `${this.label(type)} ${e.message}` },
      e.statusCode
    );
  }

  /** 토큰 만료시간(expireIn) 미설정 */
  static expireMissing(type: TokenType): HttpException {
    const e = JwtError.EXPIRE_MISSING;
    return new HttpException(
      { code: e.code, message: `${this.label(type)} ${e.message}` },
      e.statusCode
    );
  }

  /** 토큰 생성(서명) 실패 */
  static signFailure(type: TokenType): HttpException {
    const e = JwtError.SIGN_FAILURE;
    return new HttpException(
      { code: e.code, message: `${this.label(type)} ${e.message}` },
      e.statusCode
    );
  }

  /** 토큰 복호화 실패 */
  static decryptionFailed(type: TokenType): HttpException {
    const e = JwtError.DECRYPTION_FAILED;
    return new HttpException(
      { code: e.code, message: `${this.label(type)} ${e.message}` },
      e.statusCode
    );
  }

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */

  /** 토큰이 존재하지 않음 */
  static notFound(type: TokenType): HttpException {
    const e = JwtError.NOT_FOUND;
    return new HttpException(
      { code: e.code, message: `${this.label(type)} ${e.message}` },
      e.statusCode
    );
  }

  /** 토큰이 유효하지 않거나 만료됨 */
  static invalid(type: TokenType): HttpException {
    const e = JwtError.INVALID;
    return new HttpException(
      { code: e.code, message: `${this.label(type)} ${e.message}` },
      e.statusCode
    );
  }

  /** 토큰은 유효하지만 exp 필드로 만료된 상태 */
  static expired(type: TokenType): HttpException {
    const e = JwtError.EXPIRED;
    return new HttpException(
      { code: e.code, message: `${this.label(type)} ${e.message}` },
      e.statusCode
    );
  }

  /** 구조가 JWT 형식(xxx.yyy.zzz)이 아닌 경우 */
  static malformed(type: TokenType): HttpException {
    const e = JwtError.MALFORMED;
    return new HttpException(
      { code: e.code, message: `${this.label(type)} ${e.message}` },
      e.statusCode
    );
  }

  /** 예상하지 못한 알고리즘으로 서명된 토큰 (예: HS256 외 다른 방식) */
  static unsupported(type: TokenType): HttpException {
    const e = JwtError.UNSUPPORTED;
    return new HttpException(
      { code: e.code, message: `${this.label(type)} ${e.message}` },
      e.statusCode
    );
  }

  /** Authorization 헤더는 존재하나, Bearer <token> 형식이 아닌 경우 */
  static missingBearer(): HttpException {
    const e = JwtError.MISSING_BEARER;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}
