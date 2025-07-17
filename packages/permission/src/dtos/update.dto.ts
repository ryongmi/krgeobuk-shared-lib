import { IsValidServiceId } from '@krgeobuk/shared/service';
import { IsValidPermissionAction, IsValidPermissionDescription } from '@krgeobuk/shared/permission';

import type { UpdatePermission } from '../interfaces/index.js';

export class UpdatePermissionDto implements UpdatePermission {
  @IsValidPermissionAction({ isOptional: true })
  action?: string;

  @IsValidPermissionDescription({ isOptional: true })
  description?: string | null;

  @IsValidServiceId({ isOptional: true })
  serviceId?: string;
}

