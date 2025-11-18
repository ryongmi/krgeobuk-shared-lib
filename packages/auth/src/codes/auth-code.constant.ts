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
export const AuthCode = {
  // 000 ~ 099	에러 코드
  LOGIN_ERROR: 'AUTH_000',
  SIGNUP_ERROR: 'AUTH_001',
  LOGOUT_ERROR: 'AUTH_002',
  REFRESH_ERROR: 'AUTH_003',
  INVALID_REDIRECT_URI: 'AUTH_004',
  PASSWORD_RESET_TOKEN_INVALID: 'AUTH_010',

  // 200 ~ 299	성공 응답 코드
  LOGOUT_SUCCESS: 'AUTH_200',
  REFRESH_SUCCESS: 'AUTH_201',
  INITIALIZE_SUCCESS: 'AUTH_202',
  PASSWORD_RESET_EMAIL_SENT: 'AUTH_206',
  PASSWORD_RESET_SUCCESS: 'AUTH_207',

  // 300 ~ 399	리다이렉트 응답 코드 (SSO)
  SSO_LOGIN_REDIRECT: 'AUTH_300',
  SSO_SIGNUP_REDIRECT: 'AUTH_301',
  SSO_LOGIN_START_REDIRECT: 'AUTH_302',
} as const;

export type AuthCodeType = (typeof AuthCode)[keyof typeof AuthCode];

