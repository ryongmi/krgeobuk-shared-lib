import { ExposeRoleId, ExposePermissionId } from '@krgeobuk/shared/role-permission';

import { RolePermissionDetail } from '../interfaces/index.js';

export class RolePermissionDetailDto implements RolePermissionDetail {
  @ExposeRoleId()
  roleId!: string;

  @ExposePermissionId()
  permissionId!: string;
}
