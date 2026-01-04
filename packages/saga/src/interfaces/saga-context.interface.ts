/**
 * Saga 실행 컨텍스트 인터페이스
 *
 * Saga 실행 중 필요한 메타데이터와 상태 정보를 담습니다.
 */
export interface SagaContext {
  /**
   * Saga 실행 ID (추적용)
   */
  sagaId?: string;

  /**
   * 실행 시작 시간
   */
  startedAt: Date;

  /**
   * 현재 실행 중인 단계 이름
   */
  currentStep?: string;

  /**
   * 완료된 단계 목록
   */
  completedSteps: string[];

  /**
   * 총 재시도 횟수
   */
  totalRetries: number;

  /**
   * 추가 메타데이터
   */
  metadata?: Record<string, any>;
}
