/**
 * Role-Permission 도메인 TCP 파라미터 인터페이스
 * 중간테이블 관계 전용 파라미터만 정의
 */

import type { RolePermissionParams } from '@krgeobuk/shared/role-permission';

// role-permission 관계 전용 파라미터
export type TcpRolePermission = RolePermissionParams;

// 배치 처리용 파라미터
export interface TcpRolePermissionBatch {
  roleId: string;
  permissionIds: string[];
}
