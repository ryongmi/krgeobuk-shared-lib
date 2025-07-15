/**
 * ServiceVisibleRole 도메인 TCP 파라미터 인터페이스
 * 간단한 ID 기반 조회/수정/삭제 작업용
 */

import type { ServiceVisibleRoleParams } from '@krgeobuk/shared/service-visible-role';

// TCP 전용 복합 파라미터
export type TcpServiceVisibleRole = ServiceVisibleRoleParams;

export interface TcpServiceRoleBatch {
  serviceId: string;
  roleIds: string[];
}

