/**
 * krgeobuk 생태계 글로벌 역할 상수
 * 모든 서비스에서 공통으로 사용되는 시스템 역할들
 */

export const GLOBAL_ROLES = {
  /**
   * 최고 관리자 - 모든 시스템 권한 보유
   * 전체 시스템의 모든 기능에 접근 가능
   */
  SUPER_ADMIN: 'superAdmin',

  /**
   * 일반 관리자 - 서비스별 관리 권한
   * 개별 서비스 내에서 관리자 역할 수행
   */
  ADMIN: 'admin',
} as const;

export type GlobalRole = typeof GLOBAL_ROLES[keyof typeof GLOBAL_ROLES];

/**
 * 모든 글로벌 역할 배열
 * 역할 검증 시 유효한 글로벌 역할 확인용
 */
export const ALL_GLOBAL_ROLES = Object.values(GLOBAL_ROLES);

/**
 * 역할명으로 글로벌 역할 여부 확인
 * @param roleName - 확인할 역할명
 * @returns 글로벌 역할 여부
 */
export const isGlobalRole = (roleName: string): roleName is GlobalRole => {
  return ALL_GLOBAL_ROLES.includes(roleName as GlobalRole);
};

/**
 * 관리자급 역할 배열
 * 시스템 관리 권한이 있는 역할들
 */
export const ADMIN_LEVEL_ROLES = [
  GLOBAL_ROLES.SUPER_ADMIN,
  GLOBAL_ROLES.ADMIN,
] as const;

/**
 * 역할명이 관리자급 역할인지 확인
 * @param roleName - 확인할 역할명
 * @returns 관리자급 역할 여부
 */
export const isAdminLevelRole = (roleName: string): boolean => {
  return ADMIN_LEVEL_ROLES.includes(roleName as GlobalRole);
};

/**
 * 고정 UUID 역할 상수
 * Migration에서 cross-DB 참조를 위해 사전 정의된 UUID
 * superAdmin: 글로벌 역할 (단일), admin: 각 서비스별 역할이나 UUID는 공통 기준값
 */
export const ROLE_CONSTANTS = {
  SUPER_ADMIN: {
    id: '550e8400-e29b-41d4-a716-446655440020',
    name: GLOBAL_ROLES.SUPER_ADMIN,
  },
  ADMIN: {
    id: '550e8400-e29b-41d4-a716-446655440021',
    name: GLOBAL_ROLES.ADMIN,
  },
} as const;

export type RoleConstant = (typeof ROLE_CONSTANTS)[keyof typeof ROLE_CONSTANTS];
export type RoleId = RoleConstant['id'];
export type RoleName = RoleConstant['name'];

/**
 * 역할명으로 역할 ID 조회
 * @param roleName - 역할 이름 (예: 'superAdmin')
 * @returns 역할 ID 또는 undefined
 */
export const getRoleIdByName = (roleName: string): string | undefined => {
  const role = Object.values(ROLE_CONSTANTS).find(r => r.name === roleName);
  return role?.id;
};

/**
 * 역할 ID로 역할 정보 조회
 * @param roleId - 역할 ID (UUID)
 * @returns 역할 상수 객체 또는 undefined
 */
export const getRoleById = (roleId: string): RoleConstant | undefined => {
  return Object.values(ROLE_CONSTANTS).find(r => r.id === roleId);
};