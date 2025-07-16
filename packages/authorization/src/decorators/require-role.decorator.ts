import { SetMetadata } from '@nestjs/common';

import { REQUIRE_ROLE_META_KEY } from'../constants/index.js';
import { RequireRoleMetadata } from '../interfaces/index.js';

/**
 * 특정 역할이 필요한 엔드포인트에 사용하는 데코레이터
 * 
 * @param roleName - 필요한 역할 이름 (예: 'admin', 'manager', 'user')
 * @param serviceId - 역할을 체크할 서비스 ID (미제공 시 현재 서비스 기준)
 * 
 * @example
 * ```typescript
 * @Get('admin-only')
 * @RequireRole('admin')
 * async getAdminData() {
 *   return this.service.getAdminData();
 * }
 * 
 * @Post('external-admin')
 * @RequireRole('admin', 'external-service-id')
 * async createInExternalService() {
 *   return this.service.createInExternalService();
 * }
 * ```
 */
export const RequireRole = (roleName: string, serviceId?: string) =>
  SetMetadata(REQUIRE_ROLE_META_KEY, { roleName, serviceId } as RequireRoleMetadata);