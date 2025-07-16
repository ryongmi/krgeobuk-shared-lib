import { SetMetadata, applyDecorators } from '@nestjs/common';

import {
  REQUIRED_ALL_PERMISSIONS_META_KEY,
  PERMISSION_SERVICE_ID_META_KEY,
} from '../constants/authorization.constants.js';

/**
 * 모든 권한을 가지고 있어야 접근을 허용하는 데코레이터 (AND 조건)
 * 
 * @param permissions - 확인할 권한 목록 (모든 권한 필요)
 * @param serviceId - 권한을 체크할 서비스 ID (선택사항)
 * 
 * @example
 * ```typescript
 * @RequireAllPermissions(['user:read', 'user:update'])
 * @Patch('users/:id')
 * async updateUser() {
 *   // user:read AND user:update 권한이 모두 있어야 접근 가능
 * }
 * 
 * @RequireAllPermissions(['admin:manage', 'system:config'], 'admin-service')
 * @Post('admin/config')
 * async updateConfig() {
 *   // 특정 서비스에서 admin:manage AND system:config 권한이 모두 있어야 접근 가능
 * }
 * ```
 */
export const RequireAllPermissions = (permissions: string[], serviceId?: string) => {
  return applyDecorators(
    SetMetadata(REQUIRED_ALL_PERMISSIONS_META_KEY, permissions),
    SetMetadata(PERMISSION_SERVICE_ID_META_KEY, serviceId)
  );
};