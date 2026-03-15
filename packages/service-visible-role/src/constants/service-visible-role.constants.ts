/**
 * ServiceVisibleRole 도메인 권한 상수
 * 서비스 가시성 역할 관리에서 사용되는 권한 액션들
 */
export const ServiceVisibleRolePermissions = {
  SERVICE_VISIBLE_ROLE_ASSIGN: 'service-visible-role:assign',
  SERVICE_VISIBLE_ROLE_REVOKE: 'service-visible-role:revoke',
  SERVICE_VISIBLE_ROLE_MANAGE: 'service-visible-role:manage',
} as const;

export type ServiceVisibleRolePermission = (typeof ServiceVisibleRolePermissions)[keyof typeof ServiceVisibleRolePermissions];
