import { SetMetadata } from '@nestjs/common';

import { REQUIRE_PERMISSION_META_KEY } from'../constants/index.js';
import { RequirePermissionMetadata } from '../interfaces/index.js';

/**
 * 권한이 필요한 엔드포인트에 사용하는 데코레이터
 *
 * @param action 권한 액션 (예: 'user.read', 'user.create')
 * @param serviceId 서비스 ID (선택사항)
 *
 * @example
 * ```typescript
 * @Controller('users')
 * @UseGuards(AccessTokenGuard, AuthorizationGuard)
 * export class UserController {
 *   @Get()
 *   @RequirePermission('user.read')
 *   getUsers() {}
 *
 *   @Post()
 *   @RequirePermission('user.create', 'service-id')
 *   createUser() {}
 * }
 * ```
 */

export const RequirePermission = (action: string, serviceId?: string): MethodDecorator => {
  return SetMetadata(REQUIRE_PERMISSION_META_KEY, { action, serviceId } as RequirePermissionMetadata);
};

