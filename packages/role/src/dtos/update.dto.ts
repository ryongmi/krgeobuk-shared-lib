import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';
import { IsValidServiceId } from '@krgeobuk/shared/role';
import { IsValidRoleName, IsValidDescription, IsValidPriority } from '@krgeobuk/shared/role';

import type { UpdateRole } from '../interfaces/index.js';

export class UpdateRoleDto extends ExposeUuidIdDto implements UpdateRole {
  @IsValidRoleName({ isOptional: true })
  name?: string;

  @IsValidDescription({ isOptional: true })
  description?: string | null;

  @IsValidPriority({ isOptional: true })
  priority?: number;

  @IsValidServiceId({ isOptional: true })
  serviceId?: string;
}
