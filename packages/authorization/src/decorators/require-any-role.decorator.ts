import { SetMetadata, applyDecorators } from '@nestjs/common';

import {
  REQUIRED_ANY_ROLES_META_KEY,
  ROLE_SERVICE_ID_META_KEY,
} from '../constants/authorization.constants.js';

/**
 * 여러 역할 중 하나라도 있으면 접근을 허용하는 데코레이터 (OR 조건)
 * 
 * @param roles - 확인할 역할 목록
 * @param serviceId - 역할을 체크할 서비스 ID (선택사항)
 * 
 * @example
 * ```typescript
 * @RequireAnyRole(['admin', 'manager'])
 * @Get('admin-data')
 * async getAdminData() {
 *   // admin 또는 manager 역할이 있으면 접근 가능
 * }
 * 
 * @RequireAnyRole(['super-admin', 'service-admin'], 'external-service')
 * @Delete('external-data/:id')
 * async deleteExternalData() {
 *   // 특정 서비스에서 super-admin 또는 service-admin 역할이 있으면 접근 가능
 * }
 * ```
 */
export const RequireAnyRole = (roles: string[], serviceId?: string) => {
  return applyDecorators(
    SetMetadata(REQUIRED_ANY_ROLES_META_KEY, roles),
    SetMetadata(ROLE_SERVICE_ID_META_KEY, serviceId)
  );
};