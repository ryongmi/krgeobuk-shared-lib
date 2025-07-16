import { CheckPermission, CheckRole } from './index.js';

/**
 * 권한 검증을 위한 서비스 인터페이스
 * authz-server의 AuthorizationService와 동일한 시그니처 사용
 */
export interface AuthorizationService {
  /**
   * 사용자가 특정 권한을 가지고 있는지 확인
   * 
   * @param attrs - 권한 체크 요청 데이터
   * @returns 권한 보유 여부
   */
  checkUserPermission(attrs: CheckPermission): Promise<boolean>;
  
  /**
   * 사용자가 특정 역할을 가지고 있는지 확인
   * 
   * @param attrs - 역할 체크 요청 데이터
   * @returns 역할 보유 여부
   */
  checkUserRole(attrs: CheckRole): Promise<boolean>;
}

/**
 * Authorization Guard 설정 인터페이스
 */
export interface AuthorizationConfig {
  /**
   * 개발 환경에서 권한 체크를 스킵할지 여부
   */
  skipInDevelopment?: boolean;
  
  /**
   * 권한 체크 결과 캐시 TTL (초)
   */
  cacheTtl?: number;
  
  /**
   * 권한 서비스 연결 타임아웃 (밀리초)
   */
  serviceTimeout?: number;
  
  /**
   * 권한 체크 실패 시 기본 동작 (허용/거부)
   */
  failureMode?: 'allow' | 'deny';
}


export interface RequireRoleMetadata {
  roleName: string;
  serviceId?: string;
}

export interface RequirePermissionMetadata {
  action: string;
  serviceId?: string;
}

/**
 * 권한 체크 결과를 위한 캐시 인터페이스
 */
export interface CacheEntry {
  result: boolean;
  timestamp: number;
  ttl: number;
}

/**
 * 권한 검증 메타데이터
 */
export interface AuthorizationMetadata {
  // 기존 데코레이터
  permission?: RequirePermissionMetadata;
  role?: RequireRoleMetadata;
  
  // 새로운 데코레이터
  requiredAnyPermissions?: string[];
  requiredAllPermissions?: string[];
  requiredAnyRoles?: string[];
  requiredAllRoles?: string[];
  
  // 설정
  combinationOperator?: 'AND' | 'OR';
  permissionServiceId?: string;
  roleServiceId?: string;
  
  // 캐시
  cacheTtl?: number;
  cacheKey?: string;
}