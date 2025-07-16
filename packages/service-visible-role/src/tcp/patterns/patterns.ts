/**
 * ServiceVisibleRole 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 authz-server의 service-visible-role 기능에 접근할 때 사용
 */

export const ServiceVisibleRoleTcpPatterns = {
  // 조회 패턴
  FIND_ROLES_BY_SERVICE: 'service-visible-role.find-roles-by-service',
  FIND_SERVICES_BY_ROLE: 'service-visible-role.find-services-by-role',
  FIND_ROLE_COUNTS_BATCH: 'service-visible-role.find-role-counts-batch',
  EXISTS: 'service-visible-role.exists',

  // 배치 관리 패턴
  ASSIGN_MULTIPLE: 'service-visible-role.assign-multiple',
  REVOKE_MULTIPLE: 'service-visible-role.revoke-multiple',
  REPLACE_SERVICE_ROLES: 'service-visible-role.replace-permissions',
} as const;

export type ServiceVisibleRoleTcpPattern =
  (typeof ServiceVisibleRoleTcpPatterns)[keyof typeof ServiceVisibleRoleTcpPatterns];

