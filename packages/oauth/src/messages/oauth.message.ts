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
  INVALID_STATE: 'state 데이터가 올바르지 않습니다.',
  OAUTH_CANCELLED: '사용자가 인증을 취소했습니다.',

  /**  =============================================================================
   *
   *        200 ~ 299 계정 연동 관련 에러 코드
   *
   *   =============================================================================
   */
  /** */

  CANNOT_UNLINK_LAST_ACCOUNT: '최소 1개의 로그인 방식은 유지되어야 합니다.',
  PROVIDER_NOT_LINKED: '연동되지 않은 계정입니다.',
  ALREADY_LINKED_TO_ANOTHER_ACCOUNT: '이미 다른 계정에 연동된 OAuth 계정입니다.',
  PROVIDER_ALREADY_LINKED: '이미 연동된 계정입니다.',
  OAUTH_ACCOUNT_NOT_FOUND: '해당 이메일로 가입된 계정이 있지만 OAuth 계정이 연동되지 않았습니다.',
  EMAIL_ALREADY_IN_USE: '은(는) 이미 가입된 계정입니다.',

  /**  =============================================================================
   *
   *        210 ~ 215 계정 병합 관련 에러 코드
   *
   *   =============================================================================
   */
  /** */

  MERGE_REQUEST_CREATION_FAILED: '계정 병합 요청 생성에 실패했습니다.',
  MERGE_EMAIL_SEND_FAILED: '확인 이메일 발송에 실패했습니다.',
  MERGE_TOKEN_INVALID_OR_EXPIRED: '유효하지 않거나 만료된 토큰입니다.',
  MERGE_EXECUTION_FAILED: '계정 병합 실행에 실패했습니다.',
  MERGE_CANNOT_CANCEL: '진행 중인 병합은 취소할 수 없습니다.',
  MERGE_REQUEST_NOT_FOUND: '계정 병합 요청을 찾을 수 없습니다.',

  /**  =============================================================================
   *
   *        300 ~ 399	리다이렉트 응답 코드 (SSO & Link)
   *
   *   =============================================================================
   */
  /** */

  GOOGLE_SSO_REDIRECT: 'Google OAuth SSO 로그인 성공 후 원래 서비스로 리다이렉트',
  NAVER_SSO_REDIRECT: 'Naver OAuth SSO 로그인 성공 후 원래 서비스로 리다이렉트',
  OAUTH_LOGIN_START_REDIRECT: 'OAuth SSO 로그인 시작 - Auth Client로 리다이렉트',
  GOOGLE_LINK_START_REDIRECT: 'Google OAuth 계정 연동 시작 - Google 인증 페이지로 리다이렉트',
  NAVER_LINK_START_REDIRECT: 'Naver OAuth 계정 연동 시작 - Naver 인증 페이지로 리다이렉트',
} as const;

export type OAuthMessageType = (typeof OAuthMessage)[keyof typeof OAuthMessage];
