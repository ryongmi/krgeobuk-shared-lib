export const JwtMessage = {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  CONFIG_MISSING: '토큰 설정값(JWT config)이 누락되었습니다.',
  PRIVATE_KEY_MISSING: '토큰 개인키(private key)가 설정되어 있지 않습니다.',
  PUBLIC_KEY_MISSING: '토큰 공개키(public key)가 설정되어 있지 않습니다.',
  EXPIRE_MISSING: '토큰 만료시간(expireIn)이 설정되어 있지 않습니다.',
  SIGN_FAILURE: '토큰 생성(서명)에 실패했습니다.',
  DECRYPTION_FAILED: '토큰 복호화에 실패했습니다.',

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  NOT_FOUND: '토큰이 존재하지 않습니다.',
  INVALID: '토큰이 유효하지 않거나 만료되었습니다.',
  EXPIRED: '토큰이 만료되었습니다.',
  MALFORMED: '토큰 형식이 올바르지 않습니다.',
  UNSUPPORTED: '토큰은 지원되지 않는 형식입니다.',
  MISSING_BEARER: 'Authorization 헤더가 Bearer 형식이 아닙니다.',

  // 200 ~ 299	성공 응답 코드
  // LOGIN_SUCCESS: '로그인 성공',
  // SIGNUP_SUCCESS: '회원가입 성공',
  // LOGOUT_SUCCESS: '로그아웃 성공',
  // REFRESH_SUCCESS: '토큰 재발급 성공',
} as const;

export type JwtMessageType = (typeof JwtMessage)[keyof typeof JwtMessage];
