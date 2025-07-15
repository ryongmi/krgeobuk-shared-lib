import { ExposeHasPermission } from '../validation/index.js';
import type { PermissionCheckResponse } from '../interfaces/index.js';

export class PermissionCheckResponseDto implements PermissionCheckResponse {
  @ExposeHasPermission()
  hasPermission!: boolean;
}

