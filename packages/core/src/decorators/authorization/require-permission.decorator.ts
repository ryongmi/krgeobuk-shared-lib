import { SetMetadata } from '@nestjs/common';

export const REQUIRE_PERMISSION_KEY = 'require_permission';

export interface RequirePermissionMetadata {
  action: string;
  serviceId?: string;
}

/**
 * 특정 권한이 필요한 엔드포인트에 사용하는 데코레이터
 * 
 * @param action - 필요한 권한의 액션 (예: 'create', 'read', 'update', 'delete')
 * @param serviceId - 권한을 체크할 서비스 ID (미제공 시 현재 서비스 기준)
 * 
 * @example
 * ```typescript
 * @Get('sensitive-data')
 * @RequirePermission('read')
 * async getSensitiveData() {
 *   return this.service.getSensitiveData();
 * }
 * 
 * @Post('external-service')
 * @RequirePermission('create', 'external-service-id')
 * async createInExternalService() {
 *   return this.service.createInExternalService();
 * }
 * ```
 */
export const RequirePermission = (action: string, serviceId?: string) =>
  SetMetadata(REQUIRE_PERMISSION_KEY, { action, serviceId } as RequirePermissionMetadata);