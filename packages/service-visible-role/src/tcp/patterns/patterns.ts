/**
 * ServiceVisibleRole 도메인 TCP 메시지 패턴 상수
 * 다른 서비스에서 authz-server의 service-visible-role 기능에 접근할 때 사용
 */

export const ServiceVisibleRoleTcpPatterns = {
  // 조회 패턴
  FIND_ROLES_BY_SERVICE: 'service-visible-role.findRolesByService',
  FIND_SERVICES_BY_ROLE: 'service-visible-role.findServicesByRole',
  FIND_ROLES_BY_SERVICES: 'service-visible-role.findRolesByServices',
  FIND_SERVICES_BY_ROLES: 'service-visible-role.findServicesByRoles',
  EXISTS: 'service-visible-role.exists',

  // 변경 패턴
  ASSIGN: 'service-visible-role.assign',
  REMOVE: 'service-visible-role.remove',
  ASSIGN_MULTIPLE_ROLES: 'service-visible-role.assignMultipleRoles',
  ASSIGN_MULTIPLE_SERVICES: 'service-visible-role.assignMultipleServices',
  REPLACE_SERVICE_ROLES: 'service-visible-role.replaceServiceRoles',
  REPLACE_ROLE_SERVICES: 'service-visible-role.replaceRoleServices',
} as const;

export type ServiceVisibleRoleTcpPattern = typeof ServiceVisibleRoleTcpPatterns[keyof typeof ServiceVisibleRoleTcpPatterns];