/**
 * Role 도메인 TCP 파라미터 인터페이스
 * 간단한 ID 기반 조회/수정/삭제 작업용
 */

import type { RoleIdParams } from '@krgeobuk/shared/role';

import type { UpdateRole } from '../../interfaces/index.js';

// shared의 RoleIdParams를 재사용
export type TcpRoleId = RoleIdParams;

export interface TcpMultiServiceIds {
  serviceIds: string[];
}

export interface TcpRoleUpdate extends RoleIdParams {
  updateData: UpdateRole;
}
