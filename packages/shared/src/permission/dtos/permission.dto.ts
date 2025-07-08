import { ExposeUuidIdDto } from '@krgeobuk/core/dtos';
import { ExposeUuidId } from '@krgeobuk/core/decorators';

import { ExposePermissionAction, ExposePermissionDescription } from '../validation/index.js';
import type { Permission } from '../interfaces/index.js';

export class PermissionDto extends ExposeUuidIdDto implements Permission {
  @ExposePermissionAction()
  action?: string;

  @ExposePermissionDescription()
  description?: string;

  @ExposeUuidId()
  serviceId?: string;
}

