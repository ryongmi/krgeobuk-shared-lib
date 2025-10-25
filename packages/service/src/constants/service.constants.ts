/**
 * portal-server 전용 역할 상수
 * 서비스 관리 시스템에서 사용되는 도메인별 역할들
 */
export const SERVICE_ROLES = {
  /**
   * 서비스 관리자 - 서비스 생성/수정/삭제 권한
   * 시스템 서비스를 관리할 수 있는 전문 관리자
   */
  SERVICE_MANAGER: 'serviceManager',
} as const;

export type ServiceRole = (typeof SERVICE_ROLES)[keyof typeof SERVICE_ROLES];

/**
 * Service 도메인 권한 상수
 * 서비스 등록 및 관리 시스템에서 사용되는 권한 액션들
 */
export const SERVICE_PERMISSIONS = {
  /**
   * 서비스 조회 권한
   * 서비스 목록 및 상세 정보를 읽을 수 있는 권한
   */
  SERVICE_READ: 'service:read',

  /**
   * 서비스 생성 권한
   * 새로운 서비스를 등록할 수 있는 권한 (Super Admin 전용)
   */
  SERVICE_CREATE: 'service:create',

  /**
   * 서비스 수정 권한
   * 기존 서비스 정보를 수정할 수 있는 권한 (Super Admin 전용)
   */
  SERVICE_UPDATE: 'service:update',

  /**
   * 서비스 삭제 권한
   * 서비스를 삭제할 수 있는 권한 (Super Admin 전용)
   */
  SERVICE_DELETE: 'service:delete',

  /**
   * 서비스 전체 관리 권한
   * 모든 서비스 관련 작업을 수행할 수 있는 권한
   */
  SERVICE_MANAGE: 'service:manage',
} as const;

export type ServicePermission = (typeof SERVICE_PERMISSIONS)[keyof typeof SERVICE_PERMISSIONS];
