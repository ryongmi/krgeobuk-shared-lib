import { IsValidPermissionId } from '../validation/index.js';
import { PermissionIdParams } from '../interfaces/index.js';

/**
 * 유저 URL 파라미터 DTO
 */
export class PermissionIdParamsDto implements PermissionIdParams {
  @IsValidPermissionId()
  permissionId!: string;
}
