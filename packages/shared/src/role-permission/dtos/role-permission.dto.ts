import { ExposeRoleId } from '../../role/validation/index.js';
import { ExposePermissionId } from '../../permission/validation/index.js';
import type { RolePermission } from '../interfaces/index.js';

export class RolePermissionDto implements RolePermission {
  @ExposeRoleId()
  roleId?: string;

  @ExposePermissionId()
  permissionId?: string;
}