import { IsValidRoleIds } from '@krgeobuk/shared/user-role/validation';

import { RoleIds } from '../interfaces/role-ids.interface.js';

export class RoleIdsDto implements RoleIds {
  @IsValidRoleIds()
  roleIds!: string[];
}