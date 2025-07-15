import { CheckPermission } from '../../interfaces/check-permission.interface.js';
import { CheckRole } from '../../interfaces/check-role.interface.js';

/**
 * 권한 체크 요청 메시지
 */
export type TcpCheckPermission = CheckPermission;

/**
 * 역할 체크 요청 메시지
 */
export type TcpCheckRole = CheckRole;

/**
 * 사용자 권한 조회 요청 메시지
 */
export interface TcpGetUserPermissions {
  userId: string;
  serviceId?: string;
}

/**
 * 사용자 역할 조회 요청 메시지
 */
export interface TcpGetUserRoles {
  userId: string;
  serviceId?: string;
}

