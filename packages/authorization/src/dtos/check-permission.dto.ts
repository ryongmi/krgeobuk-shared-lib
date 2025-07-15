import { IsValidServiceId } from '@krgeobuk/shared/service';
import { IsValidUserId } from '@krgeobuk/shared/user';
import { IsValidPermissionAction } from '@krgeobuk/shared/permission';

import type { CheckPermission } from '../interfaces/index.js';

export class CheckPermissionDto implements CheckPermission {
  @IsValidUserId()
  userId!: string;

  @IsValidPermissionAction()
  action!: string;

  @IsValidServiceId({ isOptional: true })
  serviceId?: string;
}

