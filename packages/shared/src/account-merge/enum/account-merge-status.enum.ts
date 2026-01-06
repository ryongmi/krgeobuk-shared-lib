/**
 * 계정 병합 요청 상태
 */
export enum AccountMergeStatus {
  /** 이메일 인증 대기 중 */
  PENDING_EMAIL_VERIFICATION = 'PENDING_EMAIL_VERIFICATION',

  /** 이메일 인증 완료 */
  EMAIL_VERIFIED = 'EMAIL_VERIFIED',

  /** 병합 진행 중 */
  IN_PROGRESS = 'IN_PROGRESS',

  /** 1단계: auth-server 백업 완료 */
  STEP1_AUTH_BACKUP = 'STEP1_AUTH_BACKUP',

  /** 2단계: authz-server 역할 병합 완료 */
  STEP2_AUTHZ_MERGE = 'STEP2_AUTHZ_MERGE',

  /** 3단계: my-pick-server 데이터 병합 완료 */
  STEP3_MYPICK_MERGE = 'STEP3_MYPICK_MERGE',

  /** 4단계: 사용자 삭제 완료 */
  STEP4_USER_DELETE = 'STEP4_USER_DELETE',

  /** 5단계: 캐시 무효화 완료 */
  STEP5_CACHE_INVALIDATE = 'STEP5_CACHE_INVALIDATE',

  /** 완료 */
  COMPLETED = 'COMPLETED',

  /** 실패 */
  FAILED = 'FAILED',

  /** 보상 트랜잭션 실행 중 */
  COMPENSATING = 'COMPENSATING',

  /** 보상 트랜잭션 완료 (롤백됨) */
  COMPENSATED = 'COMPENSATED',

  /** 취소됨 */
  CANCELLED = 'CANCELLED',
}

/**
 * AccountMergeStatus enum 값들의 배열
 */
export const ACCOUNT_MERGE_STATUS_VALUES = Object.values(AccountMergeStatus);
