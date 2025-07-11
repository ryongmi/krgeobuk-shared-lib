import { IsValidUserIdParams } from '../validation/index.js';

/**
 * 유저 URL 파라미터 DTO
 */
export class UserIdParamsDto {
  @IsValidUserIdParams()
  userId!: string;
}
