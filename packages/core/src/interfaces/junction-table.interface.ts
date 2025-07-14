/**
 * 중간테이블(Junction Table) 배치 작업 결과 인터페이스
 * 모든 중간테이블 도메인에서 공통으로 사용 가능
 */

export interface JunctionTableOperationResult {
  success: boolean;
  affected: number;
  details?: {
    assigned?: number;
    revoked?: number;
    skipped?: number;
    duplicates?: string[];
    errors?: string[];
  };
}

export interface JunctionTableBatchAssignmentResult extends JunctionTableOperationResult {
  details: {
    assigned: number;
    skipped: number;
    duplicates: string[];
    newAssignments: string[];
  };
}

export interface JunctionTableBatchRevocationResult extends JunctionTableOperationResult {
  details: {
    revoked: number;
    skipped: number;
    notFound: string[];
    revokedRelations: Array<{ [key: string]: string }>; // 유연한 관계 구조
  };
}

export interface JunctionTableReplaceResult extends JunctionTableOperationResult {
  details: {
    removed: number;
    added: number;
    unchanged: number;
    previousItems: string[];
    currentItems: string[];
  };
}

// 중간테이블별 특화된 결과 타입 예시
export interface RolePermissionBatchAssignmentResult extends JunctionTableBatchAssignmentResult {
  details: JunctionTableBatchAssignmentResult['details'] & {
    roleId: string;
    assignedPermissions: string[];
  };
}

export interface UserRoleBatchAssignmentResult extends JunctionTableBatchAssignmentResult {
  details: JunctionTableBatchAssignmentResult['details'] & {
    userId: string;
    assignedRoles: string[];
  };
}
