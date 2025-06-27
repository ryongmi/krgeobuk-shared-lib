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
export const JwtCode = {
  // 000 ~ 099 에러 코드
  CONFIG_MISSING: 'JWT_000',
  PRIVATE_KEY_MISSING: 'JWT_001',
  PUBLIC_KEY_MISSING: 'JWT_002',
  EXPIRE_MISSING: 'JWT_003',
  SIGN_FAILURE: 'JWT_004',
  DECRYPTION_FAILED: 'JWT_005',

  // 100 ~ 199 에러 코드
  NOT_FOUND: 'JWT_100',
  INVALID: 'JWT_101',
  EXPIRED: 'JWT_102',
  MALFORMED: 'JWT_103',
  UNSUPPORTED: 'JWT_104',
  MISSING_BEARER: 'JWT_105',

  // 200 ~ 299 성공 응답 코드
  // LOGIN_SUCCESS: 'AUTH_200',
  // SIGNUP_SUCCESS: 'AUTH_201',
  // LOGOUT_SUCCESS: 'AUTH_202',
  // REFRESH_SUCCESS: 'AUTH_203',
} as const;

export type JwtCodeType = (typeof JwtCode)[keyof typeof JwtCode];
