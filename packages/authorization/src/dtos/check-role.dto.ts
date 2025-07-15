import { IsValidServiceId } from '@krgeobuk/shared/service';
import { IsValidUserId } from '@krgeobuk/shared/user';
import { IsValidRoleName } from '@krgeobuk/shared/role';

import type { CheckRole } from '../interfaces/index.js';

export class CheckRoleDto implements CheckRole {
  @IsValidUserId()
  userId!: string;

  @IsValidRoleName()
  roleName!: string;

  @IsValidServiceId({ isOptional: true })
  serviceId?: string;
}

