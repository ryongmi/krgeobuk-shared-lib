import { JunctionTableBatchAssignmentResult } from '@krgeobuk/core/interfaces';

export interface ServiceVisibleRoleBatchAssignmentResult
  extends JunctionTableBatchAssignmentResult {
  details: JunctionTableBatchAssignmentResult['details'] & {
    serviceId: string;
    assignedRoles: string[];
  };
}
