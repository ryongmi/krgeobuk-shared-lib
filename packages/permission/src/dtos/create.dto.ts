import { IsValidServiceId } from '@krgeobuk/shared/service';
import { IsValidPermissionAction, IsValidPermissionDescription } from '@krgeobuk/shared/permission';

import type { CreatePermission } from '../interfaces/index.js';

export class CreatePermissionDto implements CreatePermission {
  @IsValidPermissionAction()
  action!: string;

  @IsValidPermissionDescription({ isOptional: true })
  description?: string | null;

  @IsValidServiceId()
  serviceId!: string;
}
