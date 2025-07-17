import { IsValidRoleName, IsValidDescription, IsValidPriority } from '@krgeobuk/shared/role';
import { IsValidServiceId } from '@krgeobuk/shared/service';

import type { UpdateRole } from '../interfaces/index.js';

export class UpdateRoleDto implements UpdateRole {
  @IsValidRoleName({ isOptional: true })
  name?: string;

  @IsValidDescription({ isOptional: true })
  description?: string | null;

  @IsValidPriority({ isOptional: true })
  priority?: number;

  @IsValidServiceId({ isOptional: true })
  serviceId?: string;
}
