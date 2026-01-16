/**
 * 계정 병합 TCP 응답 인터페이스
 *
 * 분산 트랜잭션 처리를 위한 TCP 통신 응답 정의
 */

/**
 * my-pick 스냅샷 데이터 인터페이스
 * 병합 시 이전된 데이터 ID 목록 (롤백용)
 */
export interface MyPickSnapshotData {
  /** 이전된 크리에이터 구독 ID 목록 */
  sourceCreatorIds: string[];
  /** 이전된 콘텐츠 ID 목록 */
  sourceContentIds: string[];
}
