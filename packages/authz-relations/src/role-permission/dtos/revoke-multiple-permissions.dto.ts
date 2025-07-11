import { IsValidRoleId, IsValidPermissionIds } from '@krgeobuk/shared/role-permission';

import { RevokeMultiplePermissions } from '../interfaces/index.js';

export class RevokeMultiplePermissionsDto implements RevokeMultiplePermissions {
  @IsValidRoleId()
  roleId!: string;

  @IsValidPermissionIds()
  permissionIds!: string[];
}
