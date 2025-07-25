/**
 * Permission 도메인 TCP 파라미터 인터페이스
 * 간단한 ID 기반 조회/수정/삭제 작업용
 */

import type { PermissionIdParams } from '@krgeobuk/shared/permission';

import type { UpdatePermission } from '../../interfaces/index.js';

// shared의 PermissionIdParams를 재사용
export type TcpPermissionId = PermissionIdParams;

export interface TcpMultiService {
  serviceIds: string[];
}

export interface TcpPermissionUpdate extends PermissionIdParams {
  updateData: UpdatePermission;
}
