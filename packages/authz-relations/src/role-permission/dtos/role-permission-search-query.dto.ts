import { PaginateBaseDto } from '@krgeobuk/core/dtos';
import { IsValidRoleId, IsValidPermissionId } from '@krgeobuk/shared/role-permission';

import { RolePermissionSearchQuery } from '../interfaces/index.js';

export class RolePermissionSearchQueryDto extends PaginateBaseDto implements RolePermissionSearchQuery {
  @IsValidRoleId({ isOptional: true })
  roleId?: string;

  @IsValidPermissionId({ isOptional: true })
  permissionId?: string;
}