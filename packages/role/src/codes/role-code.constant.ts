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
export const RoleCode = {
  // 000 ~ 099 서버 에러 코드
  ROLE_FETCH_ERROR: 'ROLE_000',
  ROLE_CREATE_ERROR: 'ROLE_001',
  ROLE_UPDATE_ERROR: 'ROLE_002',
  ROLE_DELETE_ERROR: 'ROLE_003',

  // 100 ~ 199 클라이언트 에러 코드
  ROLE_NOT_FOUND: 'ROLE_100',
  ROLE_ALREADY_EXISTS: 'ROLE_101',
  ROLE_INVALID_PRIORITY: 'ROLE_102',
  ROLE_INVALID_SERVICE: 'ROLE_103',
  ROLE_PERMISSION_CONFLICT: 'ROLE_104',

  // 200 ~ 299 성공 응답 코드
  ROLE_FETCH_SUCCESS: 'ROLE_200',
  ROLE_CREATE_SUCCESS: 'ROLE_201',
  ROLE_UPDATE_SUCCESS: 'ROLE_202',
  ROLE_DELETE_SUCCESS: 'ROLE_203',
} as const;

export type RoleCodeType = (typeof RoleCode)[keyof typeof RoleCode];
