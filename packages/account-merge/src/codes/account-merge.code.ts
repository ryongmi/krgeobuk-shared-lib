/**
 * 계정 병합 도메인 에러 코드 상수
 * 각 코드는 ACCOUNT_MERGE_XXX 형식으로 정의됨
 */

export const AccountMergeCode = {
  /**  =============================================================================
   *
   *        000 ~ 099 일반 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 동일한 계정을 병합할 수 없음 */
  SAME_ACCOUNT_MERGE: 'ACCOUNT_MERGE_001',

  /** 계정 병합을 처리할 권한이 없음 */
  UNAUTHORIZED: 'ACCOUNT_MERGE_002',

  /** 잘못된 상태 - 이미 처리되었거나 처리할 수 없는 병합 요청 */
  INVALID_STATUS: 'ACCOUNT_MERGE_003',

  /** 병합 요청이 만료됨 */
  REQUEST_EXPIRED: 'ACCOUNT_MERGE_004',

  /** 상태 전환이 불가능함 */
  INVALID_TRANSITION: 'ACCOUNT_MERGE_005',

  /**  =============================================================================
   *
   *        100 ~ 199 병합 프로세스 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 계정 병합 요청 생성 실패 */
  REQUEST_CREATION_FAILED: 'ACCOUNT_MERGE_100',

  /** 확인 이메일 발송 실패 */
  EMAIL_SEND_FAILED: 'ACCOUNT_MERGE_101',

  /** 유효하지 않거나 만료된 토큰 */
  TOKEN_INVALID_OR_EXPIRED: 'ACCOUNT_MERGE_102',

  /** 계정 병합 실행 실패 */
  EXECUTION_FAILED: 'ACCOUNT_MERGE_103',

  /** 진행 중인 병합은 취소할 수 없음 */
  CANNOT_CANCEL: 'ACCOUNT_MERGE_104',

  /** 계정 병합 요청을 찾을 수 없음 */
  REQUEST_NOT_FOUND: 'ACCOUNT_MERGE_105',

  /**  =============================================================================
   *
   *        200 ~ 299 성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  /** 계정 병합 요청 생성 성공 */
  REQUEST_CREATED: 'ACCOUNT_MERGE_200',

  /** 조회 성공 */
  FETCH_SUCCESS: 'ACCOUNT_MERGE_201',

  /** 계정 병합 완료 */
  MERGE_COMPLETED: 'ACCOUNT_MERGE_202',

  /** 계정 병합 요청 거부됨 */
  MERGE_REJECTED: 'ACCOUNT_MERGE_203',

  /** 토큰 검증 성공 */
  TOKEN_VERIFIED: 'ACCOUNT_MERGE_204',
} as const;

export type AccountMergeCodeType = (typeof AccountMergeCode)[keyof typeof AccountMergeCode];
