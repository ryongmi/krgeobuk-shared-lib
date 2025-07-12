/**
 * TCP 통신 공통 응답 인터페이스
 * 모든 TCP 도메인 패키지에서 공통으로 사용되는 응답 구조
 */

import type { PaginatedResult } from '../typeorm/pagination.interface.js';

export interface TcpOperationResponse {
  success: boolean;
}

// TCP 검색 응답용 타입 (PaginatedResult 재사용)
export type TcpSearchResponse<T> = PaginatedResult<T>;