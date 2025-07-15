import { IsValidUserId } from '../../user/validation/user-id.decorator.js';
import { IsValidRoleId } from '../../role/validation/role-id.decorator.js';
import { UserRoleParams } from '../interfaces/index.js';

/**
 * 유저-역할 URL 파라미터 DTO
 */
export class UserRoleParamsDto implements UserRoleParams {
  @IsValidUserId()
  userId!: string;

  @IsValidRoleId()
  roleId!: string;
}
