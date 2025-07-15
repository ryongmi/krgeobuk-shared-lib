import { JunctionTableBatchAssignmentResult } from '@krgeobuk/core/interfaces';

export interface UserRoleBatchAssignmentResult extends JunctionTableBatchAssignmentResult {
  details: JunctionTableBatchAssignmentResult['details'] & {
    userId: string;
    assignedRoles: string[];
  };
}
