/**
 * User 도메인 권한 상수
 * auth-server의 사용자 관리에서 사용되는 권한 액션들
 */
export const UserPermissions = {
  USER_READ: 'user:read',
  USER_CREATE: 'user:create',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_MANAGE: 'user:manage',
} as const;

export type UserPermission = (typeof UserPermissions)[keyof typeof UserPermissions];
