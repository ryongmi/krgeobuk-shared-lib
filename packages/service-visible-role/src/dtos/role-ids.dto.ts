import { IsValidRoleIds } from '@krgeobuk/shared/role';

import { RoleIds } from '../interfaces/role-ids.interface.js';

export class RoleIdsDto implements RoleIds {
  @IsValidRoleIds()
  roleIds!: string[];
}