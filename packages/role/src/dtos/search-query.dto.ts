import { PaginateBaseDto } from '@krgeobuk/core/dtos';
import { IsValidUuidId } from '@krgeobuk/core/decorators';
import { IsValidRoleName } from '@krgeobuk/shared/role';

import type { RoleSearchQuery } from '../interfaces/index.js';

export class RoleSearchQueryDto extends PaginateBaseDto implements RoleSearchQuery {
  @IsValidRoleName({ isOptional: true })
  name?: string;

  @IsValidUuidId({ isOptional: true })
  serviceId?: string;
}
