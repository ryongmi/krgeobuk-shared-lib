import { IsValidRoleId } from '../../role/validation/role-id.decorator.js';
import { IsValidPermissionId } from '../../permission/validation/permission-id.decorator.js';

import { RolePermissionParams } from '../interfaces/index.js';

/**
 * 역할-권한 URL 파라미터 DTO
 */
export class RolePermissionParamsDto implements RolePermissionParams {
  @IsValidRoleId()
  roleId!: string;

  @IsValidPermissionId()
  permissionId!: string;
}
