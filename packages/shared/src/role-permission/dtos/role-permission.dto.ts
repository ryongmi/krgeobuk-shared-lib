import { ExposeRoleId, ExposePermissionId } from '../validation/index.js';
import type { RolePermission } from '../interfaces/index.js';

export class RolePermissionDto implements RolePermission {
  @ExposeRoleId()
  roleId?: string;

  @ExposePermissionId()
  permissionId?: string;
}