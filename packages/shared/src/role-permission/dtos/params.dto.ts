import { IsValidRoleIdParams } from '../../role/validation/params.decorator.js';
import { IsValidPermissionIdParams } from '../../permission/validation/params.decorator.js';

import { RolePermissionParams } from '../interfaces/index.js';

/**
 * 역할-권한 URL 파라미터 DTO
 */
export class RolePermissionParamsDto implements RolePermissionParams {
  @IsValidRoleIdParams()
  roleId!: string;

  @IsValidPermissionIdParams()
  permissionId!: string;
}
