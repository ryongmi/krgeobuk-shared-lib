/**
 * 계정 병합 TCP 메시지 패턴 상수
 *
 * 여러 마이크로서비스에 걸친 분산 트랜잭션 처리를 위한 TCP 통신 패턴
 * auth-server의 AccountMergeOrchestrator가 saga 패턴으로 호출
 */

export const AccountMergeTcpPatterns = {
  /**
   * my-pick-server TCP 엔드포인트
   * 사용자 구독, 인터랙션 등 my-pick 데이터 병합
   */
  MERGE_USER_DATA: 'account-merge.merge-user-data',

  /**
   * my-pick-server TCP 롤백 엔드포인트
   * 병합된 my-pick 데이터를 원래 사용자로 복원
   */
  ROLLBACK_MERGE: 'account-merge.rollback-merge',
} as const;

export type AccountMergeTcpPattern =
  (typeof AccountMergeTcpPatterns)[keyof typeof AccountMergeTcpPatterns];
