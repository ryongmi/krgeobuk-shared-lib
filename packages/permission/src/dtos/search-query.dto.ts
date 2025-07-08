import { PaginateBaseDto } from '@krgeobuk/core/dtos';
import { IsValidUuidId } from '@krgeobuk/core/decorators';
import { IsValidPermissionAction } from '@krgeobuk/shared/permission';

import type { PermissionSearchQuery } from '../interfaces/index.js';

export class PermissionSearchQueryDto extends PaginateBaseDto implements PermissionSearchQuery {
  @IsValidPermissionAction({ isOptional: true })
  action?: string;

  @IsValidUuidId({ isOptional: true })
  serviceId?: string;
}

