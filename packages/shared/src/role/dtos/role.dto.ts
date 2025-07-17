import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';
import { ExposeUuidId } from '@krgeobuk/core/decorators';

import { ExposeRoleName, ExposeDescription, ExposePriority } from '../validation/index.js';
import type { Role } from '../interfaces/index.js';

export class RoleDto extends ExposeUuidIdDto implements Role {
  @ExposeRoleName()
  name?: string;

  @ExposeDescription()
  description?: string | null;

  @ExposePriority()
  priority?: number;

  @ExposeUuidId()
  serviceId?: string;
}
