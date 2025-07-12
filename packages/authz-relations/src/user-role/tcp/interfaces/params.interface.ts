/**
 * User-Role 도메인 TCP 파라미터 인터페이스
 * 중간테이블 관계 전용 파라미터만 정의
 */

import type { UserRoleParams } from '@krgeobuk/shared/user-role/interfaces';

// 중간테이블 관계 전용 파라미터
export type TcpUserRoleParams = UserRoleParams;

// TCP 전용 복합 파라미터 (배치 처리용)
export interface TcpUserRoleBatch {
  userId: string;
  roleIds: string[];
}

export interface TcpRoleUserBatch {
  roleId: string;
  userIds: string[];
}