import { IsValidRoleId, IsValidPermissionIds } from '@krgeobuk/shared/role-permission';

import { AssignMultiplePermissions } from '../interfaces/index.js';

export class AssignMultiplePermissionsDto implements AssignMultiplePermissions {
  @IsValidRoleId()
  roleId!: string;

  @IsValidPermissionIds()
  permissionIds!: string[];
}
