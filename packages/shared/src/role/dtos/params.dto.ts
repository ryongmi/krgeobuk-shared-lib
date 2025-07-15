import { IsValidRoleId } from '../validation/index.js';
import { RoleIdParams } from '../interfaces/index.js';

/**
 * 유저 URL 파라미터 DTO
 */
export class RoleIdParamsDto implements RoleIdParams {
  @IsValidRoleId()
  roleId!: string;
}
