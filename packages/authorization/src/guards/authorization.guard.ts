import '@krgeobuk/core/interfaces/express';

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  Logger,
  Optional,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

import { PermissionCheckResponse, RoleCheckResponse } from '@krgeobuk/shared/authorization';

import {
  REQUIRE_PERMISSION_KEY,
  REQUIRE_ROLE_KEY,
  RequirePermissionMetadata,
  RequireRoleMetadata,
} from '../decorators/index.js';
import { AuthorizationService, AuthorizationConfig } from '../interfaces/index.js';
import { AuthorizationTcpPatterns } from '../tcp/patterns/index.js';
import { AuthorizationException } from '../exception/index.js';

/**
 * 권한 및 역할 기반 접근 제어 가드 (서버 전용)
 *
 * 주요 특징:
 * - authz-server 내부: 로컬 서비스 직접 호출
 * - 다른 서버: TCP 통신으로 authz-server 호출
 * - 자동 통신 방식 선택 (주입된 의존성에 따라)
 * - 타임아웃 및 네트워크 에러 처리
 * - 개발 환경 권한 체크 스킵 옵션
 *
 * @example
 * ```typescript
 * // authz-server (로컬 서비스 사용)
 * @Module({
 *   providers: [
 *     { provide: 'AUTHORIZATION_SERVICE', useExisting: AuthorizationService },
 *   ],
 * })
 *
 * // auth-server (TCP 통신 사용)
 * @Module({
 *   imports: [ClientsModule.register([{ name: 'AUTHZ_SERVICE', ... }])],
 * })
 *
 * // controller (모든 서버에서 동일)
 * @Controller('users')
 * @UseGuards(AccessTokenGuard, AuthorizationGuard)
 * export class UserController {
 *   @Get()
 *   @RequirePermission('user.read')
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
    @Optional() @Inject('AUTHZ_SERVICE') private readonly authzClient?: ClientProxy,
    @Optional()
    @Inject('AUTHORIZATION_SERVICE')
    private readonly localService?: AuthorizationService,
    @Optional() @Inject('AUTHORIZATION_CONFIG') private readonly config?: AuthorizationConfig
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const startTime = Date.now();

    try {
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
        this.logger.debug('No authorization requirements found, allowing access');
        return true;
      }

      // 개발 환경에서 권한 체크 스킵 설정 확인
      if (this.config?.skipInDevelopment && process.env.NODE_ENV === 'development') {
        this.logger.warn('Authorization check skipped in development mode');
        return true;
      }

      // 사용자 정보 추출 (JWT 가드에서 주입된 정보)
      const request = context.switchToHttp().getRequest<Request>();
      const user = request.jwt;

      // 사용자 정보가 없으면 거부
      if (!user?.id) {
        this.logger.warn('User ID not found in request. Make sure JWT guard is applied first.');
        throw AuthorizationException.userNotAuthenticated();
      }

      // 권한 체크 수행
      const hasPermission = await this.checkPermissions(user.id, permissionMetadata, roleMetadata);

      const duration = Date.now() - startTime;

      if (hasPermission) {
        this.logger.debug(`Authorization check passed in ${duration}ms`, {
          userId: user.id,
          permission: permissionMetadata?.action,
          role: roleMetadata?.roleName,
        });
      } else {
        this.logger.warn(`Authorization check failed in ${duration}ms`, {
          userId: user.id,
          permission: permissionMetadata?.action,
          role: roleMetadata?.roleName,
        });
      }

      return hasPermission;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`Authorization check error in ${duration}ms`, {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      // 이미 적절한 HttpException인 경우 그대로 전파
      if (error instanceof Error && 'getStatus' in error) {
        throw error;
      }

      // 예상치 못한 에러의 경우 설정에 따라 처리
      if (this.config?.failureMode === 'allow') {
        this.logger.warn('Authorization check failed but allowing access due to failureMode=allow');
        return true;
      }

      throw AuthorizationException.serviceUnavailable();
    }
  }

  /**
   * 권한 및 역할 체크 수행
   */
  private async checkPermissions(
    userId: string,
    permissionMetadata?: RequirePermissionMetadata,
    roleMetadata?: RequireRoleMetadata
  ): Promise<boolean> {
    const promises: Promise<boolean>[] = [];

    // 권한 체크
    if (permissionMetadata) {
      promises.push(
        this.checkUserPermission(userId, permissionMetadata.action, permissionMetadata.serviceId)
      );
    }

    // 역할 체크
    if (roleMetadata) {
      promises.push(this.checkUserRole(userId, roleMetadata.roleName, roleMetadata.serviceId));
    }

    // 모든 체크가 통과해야 함 (AND 조건)
    const results = await Promise.all(promises);
    const allPassed = results.every((result) => result === true);

    if (!allPassed) {
      // 구체적인 에러 메시지 생성
      if (permissionMetadata && !results[0]) {
        throw AuthorizationException.permissionDenied(permissionMetadata.action);
      }
      if (roleMetadata && !results[promises.length === 2 ? 1 : 0]) {
        throw AuthorizationException.roleAccessDenied(roleMetadata.roleName);
      }
    }

    return allPassed;
  }

  /**
   * 권한 체크 - authz-server 내부면 로컬 서비스, 외부면 TCP 통신
   */
  private async checkUserPermission(
    userId: string,
    action: string,
    serviceId?: string
  ): Promise<boolean> {
    const timeout = this.config?.serviceTimeout || 5000;

    try {
      // authz-server 내부: 로컬 서비스 직접 호출
      if (this.localService) {
        return await this.withTimeout(
          this.localService.checkUserPermission({ userId, action, serviceId }),
          timeout
        );
      }

      // 다른 서버: TCP 통신
      if (this.authzClient) {
        const result = await this.withTimeout(
          firstValueFrom(
            this.authzClient.send<PermissionCheckResponse>(
              AuthorizationTcpPatterns.CHECK_PERMISSION,
              {
                userId,
                action,
                serviceId,
              }
            )
          ),
          timeout
        );
        return result.hasPermission;
      }

      // 설정 오류
      throw new Error('Neither local service nor TCP client is configured');
    } catch (error: unknown) {
      this.handleAuthorizationError(error);
      return false;
    }
  }

  /**
   * 역할 체크 - authz-server 내부면 로컬 서비스, 외부면 TCP 통신
   */
  private async checkUserRole(
    userId: string,
    roleName: string,
    serviceId?: string
  ): Promise<boolean> {
    const timeout = this.config?.serviceTimeout || 5000;

    try {
      // authz-server 내부: 로컬 서비스 직접 호출
      if (this.localService) {
        return await this.withTimeout(
          this.localService.checkUserRole({ userId, roleName, serviceId }),
          timeout
        );
      }

      // 다른 서버: TCP 통신
      if (this.authzClient) {
        const result = await this.withTimeout(
          firstValueFrom(
            this.authzClient.send<RoleCheckResponse>(AuthorizationTcpPatterns.CHECK_ROLE, {
              userId,
              roleName,
              serviceId,
            })
          ),
          timeout
        );
        return result.hasRole;
      }

      // 설정 오류
      throw new Error('Neither local service nor TCP client is configured');
    } catch (error: unknown) {
      this.handleAuthorizationError(error);
      return false;
    }
  }

  /**
   * 권한 체크 에러 처리
   */
  private handleAuthorizationError(error: unknown): void {
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        throw AuthorizationException.timeoutError();
      }
      if (error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
        throw AuthorizationException.networkError();
      }
    }
    throw AuthorizationException.serviceUnavailable();
  }

  /**
   * Promise에 타임아웃 적용
   */
  private async withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs);
    });

    return Promise.race([promise, timeoutPromise]);
  }
}

