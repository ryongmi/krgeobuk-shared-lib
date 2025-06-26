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
 * - 300 ~ 399: 기타 상태 (처리중, 보류 등)
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

  // 성공 코드 200~299
  LOGIN_SUCCESS: 'OAUTH_200',
  SIGNUP_SUCCESS: 'OAUTH_201',
  LOGOUT_SUCCESS: 'OAUTH_202',
} as const;

export type OAuthCodeType = (typeof OAuthCode)[keyof typeof OAuthCode];
