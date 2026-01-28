// /**
//  * 번호 범위별 의미
//  *
//  * ┌────────────┬────────────────────────────┬────────────┐
//  * │ 번호 범위   │ 설명                        │ 예시       │
//  * ├────────────┼────────────────────────────┼────────────┤
//  * │ 000 ~ 099  │ 도메인 내 에러 코드         │ 예: 001    │
//  * │ 100 ~ 199  │ 도메인 내 경고 / 정보 코드  │ 예: 101    │
//  * │ 200 ~ 299  │ 도메인 내 성공 응답 코드    │ 예: 200    │
//  * │ 300 ~ 399  │ 기타 상태 (처리중, 보류 등) │ 예: 301    │
//  * └────────────┴────────────────────────────┴────────────┘
//  */
/**
 * 번호 범위별 의미:
 * - 000 ~ 099: 도메인 내 에러 코드
 * - 100 ~ 199: 도메인 내 경고 / 정보 코드
 * - 200 ~ 299: 도메인 내 성공 응답 코드
 * - 300 ~ 399: 리다이렉트 응답 코드 (SSO)
 */
export const OAuthCode = {
  // 에러 코드 000~099
  CONFIG_MISSING: 'OAUTH_000',
  STATE_GENERATION_FAILED: 'OAUTH_001',
  USER_SAVE_FAILED: 'OAUTH_002',
  LOGIN_ERROR: 'OAUTH_003',

  // 100 ~ 199 에러 코드
  STATE_NOT_FOUND: 'OAUTH_100',
  STATE_EXPIRED: 'OAUTH_101',
  STATE_MISMATCH: 'OAUTH_102',
  STATE_NOT_EXIST: 'OAUTH_103',
  CODE_NOT_FOUND: 'OAUTH_104',
  TOKEN_EXCHANGE_FAILED: 'OAUTH_105',
  PROFILE_FETCH_FAILED: 'OAUTH_106',
  UNSUPPORTED_PROVIDER: 'OAUTH_107',
  INVALID_STATE: 'OAUTH_108',
  OAUTH_CANCELLED: 'OAUTH_109',

  // 110 ~ 119 토큰 관련 에러 코드
  TOKEN_NOT_FOUND: 'OAUTH_110',
  REFRESH_TOKEN_NOT_FOUND: 'OAUTH_111',
  TOKEN_REFRESH_FAILED: 'OAUTH_112',

  // 200 ~ 299 계정 연동 관련 에러 코드
  CANNOT_UNLINK_LAST_ACCOUNT: 'OAUTH_200',
  PROVIDER_NOT_LINKED: 'OAUTH_201',
  ALREADY_LINKED_TO_ANOTHER_ACCOUNT: 'OAUTH_202',
  PROVIDER_ALREADY_LINKED: 'OAUTH_203',
  OAUTH_ACCOUNT_NOT_FOUND: 'OAUTH_204',
  EMAIL_ALREADY_IN_USE: 'OAUTH_205',

  // 300 ~ 399	리다이렉트 응답 코드 (SSO & Link)
  GOOGLE_SSO_REDIRECT: 'OAUTH_300',
  NAVER_SSO_REDIRECT: 'OAUTH_301',
  OAUTH_LOGIN_START_REDIRECT: 'OAUTH_302',
  GOOGLE_LINK_START_REDIRECT: 'OAUTH_303',
  NAVER_LINK_START_REDIRECT: 'OAUTH_304',
} as const;

export type OAuthCodeType = (typeof OAuthCode)[keyof typeof OAuthCode];
