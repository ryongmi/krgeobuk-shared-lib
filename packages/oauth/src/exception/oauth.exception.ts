import { HttpException } from '@nestjs/common';

import { StringUtils } from '@krgeobuk/core/utils';

import { OAuthError } from './oauth.error.js';
import type { ProviderTypeValue } from '../types/index.js';

export class OAuthException {
  private static label(provider: ProviderTypeValue): string {
    return StringUtils.capitalizeFirstLetter(provider);
  }

  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */

  /** OAuth 설정 값 누락 */
  static configMissing(provider: ProviderTypeValue): HttpException {
    const e = OAuthError.CONFIG_MISSING;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** OAuth state 값 생성 실패 */
  static stateGenerationFailed(provider: ProviderTypeValue): HttpException {
    const e = OAuthError.STATE_GENERATION_FAILED;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** OAuth 사용자 정보 저장 실패 */
  static userSaveFailed(provider: ProviderTypeValue): HttpException {
    const e = OAuthError.USER_SAVE_FAILED;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** OAuth 로그인 처리 중 서버 오류 발생 */
  static loginError(provider: ProviderTypeValue): HttpException {
    const e = OAuthError.LOGIN_ERROR;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */

  /** state 값 누락 */
  static stateNotFound(provider: ProviderTypeValue): HttpException {
    const e = OAuthError.STATE_NOT_FOUND;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** state가 유효하지 않거나 만료된 상태 */
  static stateExpired(provider: ProviderTypeValue): HttpException {
    const e = OAuthError.STATE_EXPIRED;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** state 값 불일치 */
  static stateMismatch(provider: ProviderTypeValue): HttpException {
    const e = OAuthError.STATE_MISMATCH;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** state 값이 존재하지 않거나 만료된 상태 */
  static stateNotExist(provider: ProviderTypeValue): HttpException {
    const e = OAuthError.STATE_NOT_EXIST;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** OAuth code 값 누락 */
  static codeNotFound(provider: ProviderTypeValue): HttpException {
    const e = OAuthError.CODE_NOT_FOUND;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** OAuth 토큰 교환 실패 */
  static tokenExchangeFailed(provider: ProviderTypeValue): HttpException {
    const e = OAuthError.TOKEN_EXCHANGE_FAILED;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** 사용자 프로필 정보를 가져오는 데 실패 */
  static profileFetchFailed(provider: ProviderTypeValue): HttpException {
    const e = OAuthError.PROFILE_FETCH_FAILED;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** 지원하지 않는 OAuth 공급자 */
  static unsupportedProvider(provider: string): HttpException {
    const e = OAuthError.UNSUPPORTED_PROVIDER;
    return new HttpException({ code: e.code, message: `${provider} - ${e.message}` }, e.statusCode);
  }
}
