import { IsValidRoleId, IsValidNewPermissionIds } from '@krgeobuk/shared/role-permission';

import { ReplaceRolePermissions } from '../interfaces/index.js';

export class ReplaceRolePermissionsDto implements ReplaceRolePermissions {
  @IsValidRoleId()
  roleId!: string;

  @IsValidNewPermissionIds()
  permissionIds!: string[];
}
