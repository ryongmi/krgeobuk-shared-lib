import { HttpException } from '@nestjs/common';

import { StringUtils } from '@krgeobuk/core/utils';
import type { OAuthAccountProviderType } from '@krgeobuk/shared/oauth';

import { OAuthError } from './oauth.error.js';

export class OAuthException {
  private static label(provider: OAuthAccountProviderType): string {
    return StringUtils.capitalizeFirstLetter(provider);
  }

  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */

  /** OAuth 설정 값 누락 */
  static configMissing(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.CONFIG_MISSING;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** OAuth state 값 생성 실패 */
  static stateGenerationFailed(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.STATE_GENERATION_FAILED;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** OAuth 사용자 정보 저장 실패 */
  static userSaveFailed(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.USER_SAVE_FAILED;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** OAuth 로그인 처리 중 서버 오류 발생 */
  static loginError(provider: OAuthAccountProviderType): HttpException {
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
  static stateNotFound(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.STATE_NOT_FOUND;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** state가 유효하지 않거나 만료된 상태 */
  static stateExpired(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.STATE_EXPIRED;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** state 값 불일치 */
  static stateMismatch(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.STATE_MISMATCH;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** state 값이 존재하지 않거나 만료된 상태 */
  static stateNotExist(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.STATE_NOT_EXIST;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** OAuth code 값 누락 */
  static codeNotFound(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.CODE_NOT_FOUND;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** OAuth 토큰 교환 실패 */
  static tokenExchangeFailed(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.TOKEN_EXCHANGE_FAILED;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** 사용자 프로필 정보를 가져오는 데 실패 */
  static profileFetchFailed(provider: OAuthAccountProviderType): HttpException {
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

  /** state 데이터가 올바르지 않음 */
  static invalidState(): HttpException {
    const e = OAuthError.INVALID_STATE;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 사용자가 인증을 취소함 */
  static cancelled(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.OAUTH_CANCELLED;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /**  =============================================================================
   *
   *        200 ~ 299 계정 연동 관련 에러 코드
   *
   *   =============================================================================
   */

  /** 마지막 계정 연동 해제 불가 */
  static cannotUnlinkLastAccount(): HttpException {
    const e = OAuthError.CANNOT_UNLINK_LAST_ACCOUNT;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 연동되지 않은 provider */
  static providerNotLinked(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.PROVIDER_NOT_LINKED;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** 이미 다른 계정에 연동된 OAuth 계정 */
  static alreadyLinkedToAnotherAccount(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.ALREADY_LINKED_TO_ANOTHER_ACCOUNT;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** 이미 연동된 provider */
  static providerAlreadyLinked(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.PROVIDER_ALREADY_LINKED;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} ${e.message}` },
      e.statusCode
    );
  }

  /** OAuth 계정이 존재하지 않음 (이메일은 있지만 OAuth 계정 미연동) */
  static oauthAccountNotFound(provider: OAuthAccountProviderType): HttpException {
    const e = OAuthError.OAUTH_ACCOUNT_NOT_FOUND;
    return new HttpException(
      { code: e.code, message: `${this.label(provider)} - ${e.message}` },
      e.statusCode
    );
  }

  /** OAuth 로그인 시 이메일이 이미 사용 중인 경우 */
  static emailAlreadyInUse(data: {
    email: string;
    provider: OAuthAccountProviderType;
    hasPassword: boolean;
    hasOAuthProviders?: OAuthAccountProviderType[];
  }): HttpException {
    const e = OAuthError.EMAIL_ALREADY_IN_USE;

    const loginMethods: string[] = [];

    if (data.hasPassword) {
      loginMethods.push('email');
    }

    if (data.hasOAuthProviders && data.hasOAuthProviders.length > 0) {
      loginMethods.push(...data.hasOAuthProviders);
    }

    const suggestion =
      loginMethods.length > 0
        ? `다음 방법으로 로그인 후 설정에서 ${this.label(data.provider)} 연동이 가능합니다.`
        : '고객센터에 문의해주세요.';

    return new HttpException(
      {
        code: e.code,
        message: `${data.email}${e.message}`,
        details: {
          email: data.email,
          attemptedProvider: data.provider,
          availableLoginMethods: loginMethods,
          suggestion,
        },
      },
      e.statusCode
    );
  }
}
