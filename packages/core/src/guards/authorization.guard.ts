import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { 
  REQUIRE_PERMISSION_KEY, 
  REQUIRE_ROLE_KEY,
  RequirePermissionMetadata,
  RequireRoleMetadata
} from '../decorators/authorization/index.js';

export interface AuthorizationService {
  /**
   * 사용자가 특정 권한을 가지고 있는지 확인
   */
  checkUserPermission(userId: string, action: string, serviceId?: string): Promise<boolean>;
  
  /**
   * 사용자가 특정 역할을 가지고 있는지 확인
   */
  checkUserRole(userId: string, roleName: string, serviceId?: string): Promise<boolean>;
}

/**
 * 권한 및 역할 기반 접근 제어를 수행하는 가드
 * 
 * 사용하려면:
 * 1. AuthorizationService 인터페이스를 구현하는 서비스를 제공해야 함
 * 2. JWT 토큰에서 사용자 ID를 추출할 수 있어야 함 (req.user.id)
 * 
 * @example
 * ```typescript
 * // app.module.ts
 * @Module({
 *   providers: [
 *     {
 *       provide: 'AUTHORIZATION_SERVICE',
 *       useClass: MyAuthorizationService,
 *     },
 *   ],
 * })
 * export class AppModule {}
 * 
 * // controller
 * @Controller('users')
 * @UseGuards(AccessTokenGuard, AuthorizationGuard)
 * export class UserController {
 *   @Get()
 *   @RequirePermission('read')
 *   getUsers() {}
 *   
 *   @Post()
 *   @RequireRole('admin')
 *   createUser() {}
 * }
 * ```
 */
@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizationGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly authorizationService?: AuthorizationService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 권한 메타데이터 확인
    const permissionMetadata = this.reflector.get<RequirePermissionMetadata>(
      REQUIRE_PERMISSION_KEY,
      context.getHandler()
    );
    
    const roleMetadata = this.reflector.get<RequireRoleMetadata>(
      REQUIRE_ROLE_KEY,
      context.getHandler()
    );

    // 권한이나 역할 요구사항이 없으면 통과
    if (!permissionMetadata && !roleMetadata) {
      return true;
    }

    // AuthorizationService가 제공되지 않은 경우 경고
    if (!this.authorizationService) {
      this.logger.warn(
        'AuthorizationService not provided. Please implement and provide AuthorizationService.'
      );
      throw new ForbiddenException('권한 확인 서비스가 설정되지 않았습니다.');
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { id: string } | undefined;

    // 사용자 정보가 없으면 거부
    if (!user?.id) {
      this.logger.warn('User ID not found in request. Make sure JWT guard is applied first.');
      throw new ForbiddenException('사용자 인증이 필요합니다.');
    }

    try {
      // 권한 체크
      if (permissionMetadata) {
        const hasPermission = await this.authorizationService.checkUserPermission(
          user.id,
          permissionMetadata.action,
          permissionMetadata.serviceId
        );

        if (!hasPermission) {
          this.logger.warn(
            `User ${user.id} denied access: missing permission '${permissionMetadata.action}' ${
              permissionMetadata.serviceId ? `for service '${permissionMetadata.serviceId}'` : ''
            }`
          );
          throw new ForbiddenException(
            `'${permissionMetadata.action}' 권한이 필요합니다.`
          );
        }
      }

      // 역할 체크
      if (roleMetadata) {
        const hasRole = await this.authorizationService.checkUserRole(
          user.id,
          roleMetadata.roleName,
          roleMetadata.serviceId
        );

        if (!hasRole) {
          this.logger.warn(
            `User ${user.id} denied access: missing role '${roleMetadata.roleName}' ${
              roleMetadata.serviceId ? `for service '${roleMetadata.serviceId}'` : ''
            }`
          );
          throw new ForbiddenException(
            `'${roleMetadata.roleName}' 역할이 필요합니다.`
          );
        }
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      
      this.logger.error('Authorization check failed', error);
      throw new ForbiddenException('권한 확인 중 오류가 발생했습니다.');
    }
  }
}