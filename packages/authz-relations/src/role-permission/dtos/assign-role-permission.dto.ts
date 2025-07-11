import { IsValidRoleId, IsValidPermissionId } from '@krgeobuk/shared/role-permission';

import { AssignRolePermission } from '../interfaces/index.js';

export class AssignRolePermissionDto implements AssignRolePermission {
  @IsValidRoleId()
  roleId!: string;

  @IsValidPermissionId()
  permissionId!: string;
}