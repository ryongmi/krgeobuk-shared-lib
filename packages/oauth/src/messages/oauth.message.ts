export const OAuthMessage = {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  CONFIG_MISSING: 'OAuth 설정값이 누락되었습니다.',
  STATE_GENERATION_FAILED: 'OAuth state 값을 생성하는 데 실패했습니다.',
  USER_SAVE_FAILED: 'OAuth 사용자 정보를 저장하는 데 실패했습니다.',
  LOGIN_ERROR: 'OAuth 로그인 처리 중 오류가 발생했습니다.',

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  STATE_NOT_FOUND: 'state 값이 누락되었습니다.',
  STATE_EXPIRED: 'State 값이 유효하지 않거나 만료되었습니다.',
  STATE_MISMATCH: 'state 값이 일치하지 않습니다.',
  STATE_NOT_EXIST: 'state 값이 존재하지 않거나 만료되었습니다.',
  CODE_NOT_FOUND: 'OAuth code 값이 존재하지 않습니다.',
  TOKEN_EXCHANGE_FAILED: 'OAuth 토큰 교환에 실패했습니다.',
  PROFILE_FETCH_FAILED: '사용자 프로필 정보를 가져오는 데 실패했습니다.',
  UNSUPPORTED_PROVIDER: '지원하지 않는 OAuth 공급자입니다.',

  /**  =============================================================================
   *
   *        200 ~ 299 성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  LOGIN_SUCCESS: 'OAuth 로그인 성공',
  SIGNUP_SUCCESS: 'OAuth 회원가입 성공',
  LOGOUT_SUCCESS: 'OAuth 로그아웃 성공',
} as const;

export type OAuthMessageType = (typeof OAuthMessage)[keyof typeof OAuthMessage];
