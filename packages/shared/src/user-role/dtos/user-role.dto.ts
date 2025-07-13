import { ExposeRoleId } from '../../role/validation/index.js';
import { ExposeUserId } from '../../user/validation/index.js';
import type { UserRole } from '../interfaces/index.js';

export class UserRoleDto implements UserRole {
  @ExposeUserId()
  userId?: string;

  @ExposeRoleId()
  roleId?: string;
}