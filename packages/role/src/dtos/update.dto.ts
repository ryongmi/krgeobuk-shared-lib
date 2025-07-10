import { UuidIdDto } from '@krgeobuk/core/dtos';
import {
  IsValidRoleName,
  IsValidDescription,
  IsValidPriority,
  IsValidServiceId,
} from '@krgeobuk/shared/role';

import type { UpdateRole } from '../interfaces/index.js';

export class UpdateRoleDto extends UuidIdDto implements UpdateRole {
  @IsValidRoleName({ isOptional: true })
  name?: string;

  @IsValidDescription({ isOptional: true })
  description?: string | null;

  @IsValidPriority({ isOptional: true })
  priority?: number;

  @IsValidServiceId({ isOptional: true })
  serviceId?: string;
}
