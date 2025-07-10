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
export const ServiceCode = {
  // 000 ~ 099 에러 코드
  SERVICE_CREATE_ERROR: 'SERVICE_000',
  SERVICE_UPDATE_ERROR: 'SERVICE_001',
  SERVICE_DELETE_ERROR: 'SERVICE_002',
  SERVICE_SEARCH_ERROR: 'SERVICE_003',
  SERVICE_FETCH_ERROR: 'SERVICE_004',
  SERVICE_HEALTH_CHECK_ERROR: 'SERVICE_005',

  // 100 ~ 199 에러 코드
  SERVICE_NOT_FOUND: 'SERVICE_100',
  SERVICE_ALREADY_EXISTS: 'SERVICE_101',
  INVALID_SERVICE_NAME: 'SERVICE_102',
  INVALID_SERVICE_URL: 'SERVICE_103',
  SERVICE_UNAVAILABLE: 'SERVICE_104',
  UNAUTHORIZED_SERVICE_ACCESS: 'SERVICE_105',

  // 200 ~ 299 성공 응답 코드
  SERVICE_CREATE_SUCCESS: 'SERVICE_200',
  SERVICE_UPDATE_SUCCESS: 'SERVICE_201',
  SERVICE_DELETE_SUCCESS: 'SERVICE_202',
  SERVICE_FETCH_SUCCESS: 'SERVICE_203',
  SERVICE_SEARCH_SUCCESS: 'SERVICE_204',
  SERVICE_HEALTH_CHECK_SUCCESS: 'SERVICE_205',
} as const;

export type ServiceCodeType = (typeof ServiceCode)[keyof typeof ServiceCode];
