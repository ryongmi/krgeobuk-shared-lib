import {
  IsValidRoleName,
  IsValidDescription,
  IsValidPriority,
  IsValidServiceId,
} from '@krgeobuk/shared/role';

import type { CreateRole } from '../interfaces/index.js';

export class CreateRoleDto implements CreateRole {
  @IsValidRoleName()
  name!: string;

  @IsValidDescription({ isOptional: true })
  description?: string | null;

  @IsValidPriority()
  priority!: number;

  @IsValidServiceId()
  serviceId!: string;
}
