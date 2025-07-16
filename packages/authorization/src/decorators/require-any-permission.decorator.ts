import { SetMetadata, applyDecorators } from '@nestjs/common';

import {
  REQUIRED_ANY_PERMISSIONS_META_KEY,
  PERMISSION_SERVICE_ID_META_KEY,
} from '../constants/authorization.constants.js';

/**
 * 여러 권한 중 하나라도 있으면 접근을 허용하는 데코레이터 (OR 조건)
 * 
 * @param permissions - 확인할 권한 목록
 * @param serviceId - 권한을 체크할 서비스 ID (선택사항)
 * 
 * @example
 * ```typescript
 * @RequireAnyPermission(['user:read', 'user:list'])
 * @Get('users')
 * async getUsers() {
 *   // user:read 또는 user:list 권한이 있으면 접근 가능
 * }
 * 
 * @RequireAnyPermission(['admin:manage', 'user:delete'], 'user-service')
 * @Delete('users/:id')
 * async deleteUser() {
 *   // 특정 서비스에서 admin:manage 또는 user:delete 권한이 있으면 접근 가능
 * }
 * ```
 */
export const RequireAnyPermission = (permissions: string[], serviceId?: string) => {
  return applyDecorators(
    SetMetadata(REQUIRED_ANY_PERMISSIONS_META_KEY, permissions),
    SetMetadata(PERMISSION_SERVICE_ID_META_KEY, serviceId)
  );
};