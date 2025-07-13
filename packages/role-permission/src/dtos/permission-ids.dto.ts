import { IsValidPermissionIds } from '@krgeobuk/shared/permission';

import { PermissionIds } from '../interfaces/index.js';
/**
 * 권한 ID 목록 DTO
 */
export class PermissionIdsDto implements PermissionIds {
  @IsValidPermissionIds()
  permissionIds!: string[];
}
