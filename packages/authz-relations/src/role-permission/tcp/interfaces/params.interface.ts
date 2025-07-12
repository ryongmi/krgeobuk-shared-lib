/**
 * Role-Permission 도메인 TCP 파라미터 인터페이스
 * 중간테이블 관계 관리용 TCP 통신 인터페이스
 */

import type { RoleIdParams } from '@krgeobuk/shared/role/interfaces';
import type { PermissionIdParams } from '@krgeobuk/shared/permission/interfaces';
import type { RolePermission } from '@krgeobuk/shared/role-permision';

// shared의 기본 ID params 재사용
export type TcpRoleParams = RoleIdParams;
export type TcpPermissionParams = PermissionIdParams;

// role-permission 관계 전용 파라미터
export type TcpRolePermissionParams = RolePermission;

// 배치 처리용 파라미터
export interface TcpRolePermissionBatch {
  roleId: string;
  permissionIds: string[];
}