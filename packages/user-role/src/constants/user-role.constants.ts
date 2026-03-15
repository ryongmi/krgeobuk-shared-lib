/**
 * UserRole 도메인 권한 상수
 * 사용자-역할 매핑 관리에서 사용되는 권한 액션들
 */
export const UserRolePermissions = {
  USER_ROLE_ASSIGN: 'user-role:assign',
  USER_ROLE_REVOKE: 'user-role:revoke',
  USER_ROLE_MANAGE: 'user-role:manage',
} as const;

export type UserRolePermission = (typeof UserRolePermissions)[keyof typeof UserRolePermissions];
