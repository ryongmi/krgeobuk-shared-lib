import { CheckPermission } from '../../interfaces/check-permission.interface.js';
import { CheckRole } from '../../interfaces/check-role.interface.js';

/**
 * 권한 체크 요청 메시지
 */
export type TcpCheckPermissionRequest = CheckPermission;

/**
 * 역할 체크 요청 메시지
 */
export type TcpCheckRoleRequest = CheckRole;

/**
 * 사용자 권한 조회 요청 메시지
 */
export interface TcpGetUserPermissionsRequest {
  userId: string;
  serviceId?: string;
}

/**
 * 사용자 역할 조회 요청 메시지
 */
export interface TcpGetUserRolesRequest {
  userId: string;
  serviceId?: string;
}

