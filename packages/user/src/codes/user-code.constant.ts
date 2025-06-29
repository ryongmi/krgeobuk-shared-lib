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
export const UserCode = {
  // 000 ~ 099 에러 코드
  PROFILE_FETCH_ERROR: 'USER_000',
  PROFILE_UPDATE_ERROR: 'USER_001',
  PASSWORD_CHANGE_ERROR: 'USER_002',
  ACCOUNT_DELETE_ERROR: 'USER_003',
  USER_SEARCH_ERROR: 'USER_004',
  USER_FETCH_ERROR: 'USER_005',

  // 100 ~ 199 에러 코드
  USER_NOT_FOUND: 'USER_100',
  PASSWORD_INCORRECT: 'USER_101',
  INVALID_UPDATE_PAYLOAD: 'USER_102',
  UNAUTHORIZED_UPDATE: 'USER_103',
  EMAIL_ALREADY_EXISTS: 'USER_104',
  INVALID_CREDENTIALS: 'USER_105',

  // 200 ~ 299 성공 응답 코드
  PROFILE_FETCH_SUCCESS: 'USER_200',
  PROFILE_UPDATE_SUCCESS: 'USER_201',
  PASSWORD_CHANGE_SUCCESS: 'USER_202',
  ACCOUNT_DELETE_SUCCESS: 'USER_203',
  USER_FETCH_SUCCESS: 'USER_204',
  USER_SEARCH_SUCCESS: 'USER_205',
} as const;

export type UserCodeType = (typeof UserCode)[keyof typeof UserCode];
