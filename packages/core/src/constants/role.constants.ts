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