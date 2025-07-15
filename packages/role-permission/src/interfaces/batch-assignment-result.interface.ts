import { JunctionTableBatchAssignmentResult } from '@krgeobuk/core/interfaces';

export interface RolePermissionBatchAssignmentResult extends JunctionTableBatchAssignmentResult {
  details: JunctionTableBatchAssignmentResult['details'] & {
    roleId: string;
    assignedPermissions: string[];
  };
}
