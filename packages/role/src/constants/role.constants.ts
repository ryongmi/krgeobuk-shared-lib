/**
 * Role 도메인 역할 상수
 * 역할 관리 시스템에서 사용되는 도메인별 역할들
 */
export const ROLE_NAMES = {
  /**
   * 역할 관리자 - 역할 생성/수정/삭제 권한
   * 시스템 역할을 관리할 수 있는 전문 관리자
   */
  ROLE_MANAGER: 'roleManager',
} as const;

export type RoleName = (typeof ROLE_NAMES)[keyof typeof ROLE_NAMES];

/**
 * Role 도메인 권한 상수
 * 역할 관리 시스템에서 사용되는 권한 액션들
 */
export const ROLE_PERMISSIONS = {
  ROLE_READ: 'role:read',
  ROLE_CREATE: 'role:create',
  ROLE_UPDATE: 'role:update',
  ROLE_DELETE: 'role:delete',
  ROLE_MANAGE: 'role:manage',
} as const;

export type RolePermission = (typeof ROLE_PERMISSIONS)[keyof typeof ROLE_PERMISSIONS];
