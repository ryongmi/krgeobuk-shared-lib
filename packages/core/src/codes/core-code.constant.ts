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
export const CoreCode = {
  // 000 ~ 099	에러 코드
  SERVER_ERROR: 'CORE_000',
  BAD_REQUEST: 'CORE_001',
  UNAUTHORIZED: 'CORE_002',
  FORBIDDEN: 'CORE_003',

  // 200 ~ 299	성공 응답 코드
  REQUEST_SUCCESS: 'CORE_200',
} as const;

export type CoreCodeType = (typeof CoreCode)[keyof typeof CoreCode];
