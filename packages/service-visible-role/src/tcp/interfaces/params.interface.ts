/**
 * ServiceVisibleRole 도메인 TCP 파라미터 인터페이스
 * 간단한 ID 기반 조회/수정/삭제 작업용
 */

import type { ServiceIdParams } from '@krgeobuk/shared/service';
import type { RoleIdParams } from '@krgeobuk/shared/role';

// shared의 기본 ID params 재사용
export type TcpServiceParams = ServiceIdParams;
export type TcpRoleParams = RoleIdParams;

// TCP 전용 복합 파라미터
export interface TcpServiceVisibleRoleParams {
  serviceId: string;
  roleId: string;
}

export interface TcpServicesBatchParams {
  serviceIds: string[];
}

export interface TcpRolesBatchParams {
  roleIds: string[];
}

export interface TcpServiceRoleBatch {
  serviceId: string;
  roleIds: string[];
}

export interface TcpRoleServiceBatch {
  roleId: string;
  serviceIds: string[];
}
