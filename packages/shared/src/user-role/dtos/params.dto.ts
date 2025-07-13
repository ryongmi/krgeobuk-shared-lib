import { IsValidUserIdParams } from '../../user/validation/params.decorator.js';
import { IsValidRoleIdParams } from '../../role/validation/params.decorator.js';
import { UserRoleParams } from '../interfaces/index.js';

/**
 * 유저-역할 URL 파라미터 DTO
 */
export class UserRoleParamsDto implements UserRoleParams {
  @IsValidUserIdParams()
  userId!: string;
  
  @IsValidRoleIdParams()
  roleId!: string;

}
