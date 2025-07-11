import { IsValidUserIdParams } from '../validation/index.js';
import { UserIdParams } from '../interfaces/index.js';

/**
 * 유저 URL 파라미터 DTO
 */
export class UserIdParamsDto implements UserIdParams {
  @IsValidUserIdParams()
  userId!: string;
}
