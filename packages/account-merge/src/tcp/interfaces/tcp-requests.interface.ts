/**
 * 계정 병합 TCP 요청 인터페이스
 *
 * 분산 트랜잭션 처리를 위한 TCP 통신 파라미터 정의
 */

import type { MyPickSnapshotData } from './tcp-response.interface.js';

/**
 * my-pick-server 사용자 데이터 병합 요청
 * 구독, 인터랙션 등 모든 my-pick 데이터를 병합
 */
export interface TcpMergeUserData {
  sourceUserId: string; // 병합될 사용자 (삭제될 계정)
  targetUserId: string; // 병합 대상 사용자 (유지될 계정)
}

/**
 * my-pick-server 사용자 데이터 병합 롤백 요청
 * 보상 트랜잭션 실행 시 스냅샷 데이터를 포함하여 전달
 */
export interface TcpRollbackMergeData {
  sourceUserId: string; // 병합될 사용자 (삭제될 계정)
  targetUserId: string; // 병합 대상 사용자 (유지될 계정)
  snapshot: MyPickSnapshotData; // 롤백용 스냅샷 데이터
}
