/**
 * Permission 도메인 TCP 응답 인터페이스
 * TCP 통신에서 사용되는 공통 응답 구조
 */

import type { PaginatedResult } from '@krgeobuk/core/interfaces';

export interface TcpOperationResponse {
  success: boolean;
}

// 기존 PaginatedResult 재사용하여 중복 제거
export type TcpSearchResponse<T> = PaginatedResult<T>;