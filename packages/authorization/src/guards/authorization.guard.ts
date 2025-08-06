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
  AuthorizationService,
  AuthorizationConfig,
  CacheEntry,
  AuthorizationMetadata,
  RequirePermissionMetadata,
  RequireRoleMetadata,
} from '../interfaces/index.js';
import { AuthorizationTcpPatterns } from '../tcp/patterns/index.js';
import { AuthorizationException } from '../exception/index.js';
import {
  REQUIRED_ANY_PERMISSIONS_META_KEY,
  REQUIRED_ALL_PERMISSIONS_META_KEY,
  REQUIRED_ANY_ROLES_META_KEY,
  REQUIRED_ALL_ROLES_META_KEY,
  COMBINATION_OPERATOR_META_KEY,
  PERMISSION_SERVICE_ID_META_KEY,
  ROLE_SERVICE_ID_META_KEY,
  PERMISSION_CACHE_TTL_META_KEY,
  PERMISSION_CACHE_META_KEY,
  REQUIRE_PERMISSION_META_KEY,
  REQUIRE_ROLE_META_KEY,
} from '../constants/authorization.constants.js';

/**
 * 권한 및 역할 기반 접근 제어 가드 (서버 전용)
 *
 * 주요 특징:
 * - authz-server 내부: 로컬 서비스 직접 호출
 * - 다른 서버: TCP 통신으로 authz-server 호출
 * - 자동 통신 방식 선택 (주입된 의존성에 따라)
 * - 타임아웃 및 네트워크 에러 처리
 * - 개발 환경 권한 체크 스킵 옵션
 * - 권한 체크 결과 캐싱 지원
 * - 복합 권한 및 역할 조건 지원
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
 *
 *   @Get('any-permission')
 *   @RequireAnyPermission(['user.read', 'user.list'])
 *   getUsersWithAnyPermission() {}
 *
 *   @Get('access-control')
 *   @RequireAccess({
 *     permissions: ['user.read'],
 *     roles: ['admin'],
 *     combinationOperator: 'OR',
 *     cache: { ttl: 300 }
 *   })
 *   getProtectedData() {}
 * }
 * ```
 */
@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizationGuard.name);
  private readonly cache = new Map<string, CacheEntry>();

  constructor(
    private readonly reflector: Reflector,
    @Optional() @Inject('AUTHZ_SERVICE') private readonly authzClient?: ClientProxy,
    @Optional()
    @Inject('AUTHORIZATION_SERVICE')
    private readonly localService?: AuthorizationService,
    @Optional() @Inject('AUTHORIZATION_CONFIG') private readonly config?: AuthorizationConfig
  ) {
    // 캐시 정리를 위한 주기적 실행 (5분마다)
    setInterval(() => this.cleanupCache(), 5 * 60 * 1000);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const startTime = Date.now();

    try {
      // 모든 권한 메타데이터 추출
      const metadata = this.extractAuthorizationMetadata(context);

      // 권한 요구사항이 없으면 통과
      if (!this.hasAuthorizationRequirements(metadata)) {
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
      if (!user?.userId) {
        this.logger.warn('User ID not found in request. Make sure JWT guard is applied first.');
        throw AuthorizationException.userNotAuthenticated();
      }

      // 캐시 체크
      const cacheKey = this.generateCacheKey(user.userId, metadata);
      const cachedResult = this.getCachedResult(cacheKey);
      if (cachedResult !== null) {
        this.logger.debug(`Authorization check result from cache: ${cachedResult}`);
        return cachedResult;
      }

      // 권한 체크 수행
      const hasPermission = await this.checkAuthorizationMetadata(user.userId, metadata);

      // 결과 캐싱
      if (metadata.cacheTtl && metadata.cacheTtl > 0) {
        this.setCachedResult(cacheKey, hasPermission, metadata.cacheTtl);
      }

      const duration = Date.now() - startTime;

      if (hasPermission) {
        this.logger.debug(`Authorization check passed in ${duration}ms`, {
          userId: user.userId,
          metadata: this.sanitizeMetadataForLogging(metadata),
        });
      } else {
        this.logger.warn(`Authorization check failed in ${duration}ms`, {
          userId: user.userId,
          metadata: this.sanitizeMetadataForLogging(metadata),
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
   * 권한 메타데이터 추출
   */
  private extractAuthorizationMetadata(context: ExecutionContext): AuthorizationMetadata {
    const handler = context.getHandler();

    return {
      // 기존 데코레이터
      permission: this.reflector.get<RequirePermissionMetadata>(
        REQUIRE_PERMISSION_META_KEY,
        handler
      ),
      role: this.reflector.get<RequireRoleMetadata>(REQUIRE_ROLE_META_KEY, handler),

      // 새로운 데코레이터
      requiredAnyPermissions: this.reflector.get<string[]>(
        REQUIRED_ANY_PERMISSIONS_META_KEY,
        handler
      ),
      requiredAllPermissions: this.reflector.get<string[]>(
        REQUIRED_ALL_PERMISSIONS_META_KEY,
        handler
      ),
      requiredAnyRoles: this.reflector.get<string[]>(REQUIRED_ANY_ROLES_META_KEY, handler),
      requiredAllRoles: this.reflector.get<string[]>(REQUIRED_ALL_ROLES_META_KEY, handler),

      // 설정
      combinationOperator:
        this.reflector.get<'AND' | 'OR'>(COMBINATION_OPERATOR_META_KEY, handler) || 'AND',
      permissionServiceId: this.reflector.get<string>(PERMISSION_SERVICE_ID_META_KEY, handler),
      roleServiceId: this.reflector.get<string>(ROLE_SERVICE_ID_META_KEY, handler),

      // 캐시
      cacheTtl: this.reflector.get<number>(PERMISSION_CACHE_TTL_META_KEY, handler),
      cacheKey: this.reflector.get<string>(PERMISSION_CACHE_META_KEY, handler),
    };
  }

  /**
   * 권한 요구사항 존재 여부 확인
   */
  private hasAuthorizationRequirements(metadata: AuthorizationMetadata): boolean {
    return !!(
      metadata.permission ||
      metadata.role ||
      metadata.requiredAnyPermissions?.length ||
      metadata.requiredAllPermissions?.length ||
      metadata.requiredAnyRoles?.length ||
      metadata.requiredAllRoles?.length
    );
  }

  /**
   * 권한 메타데이터 기반 체크 수행
   */
  private async checkAuthorizationMetadata(
    userId: string,
    metadata: AuthorizationMetadata
  ): Promise<boolean> {
    const permissionResults: boolean[] = [];
    const roleResults: boolean[] = [];

    try {
      // 권한 체크
      if (metadata.permission) {
        permissionResults.push(
          await this.checkUserPermission(
            userId,
            metadata.permission.action,
            metadata.permission.serviceId
          )
        );
      }

      if (metadata.requiredAnyPermissions?.length) {
        permissionResults.push(
          await this.checkAnyPermissions(
            userId,
            metadata.requiredAnyPermissions,
            metadata.permissionServiceId
          )
        );
      }

      if (metadata.requiredAllPermissions?.length) {
        permissionResults.push(
          await this.checkAllPermissions(
            userId,
            metadata.requiredAllPermissions,
            metadata.permissionServiceId
          )
        );
      }

      // 역할 체크
      if (metadata.role) {
        roleResults.push(
          await this.checkUserRole(userId, metadata.role.roleName, metadata.role.serviceId)
        );
      }

      if (metadata.requiredAnyRoles?.length) {
        roleResults.push(
          await this.checkAnyRoles(userId, metadata.requiredAnyRoles, metadata.roleServiceId)
        );
      }

      if (metadata.requiredAllRoles?.length) {
        roleResults.push(
          await this.checkAllRoles(userId, metadata.requiredAllRoles, metadata.roleServiceId)
        );
      }

      // 결과 조합
      const hasValidPermissions =
        permissionResults.length === 0 || permissionResults.every((result) => result);
      const hasValidRoles = roleResults.length === 0 || roleResults.every((result) => result);

      // 조합 연산자에 따른 결과 반환
      if (metadata.combinationOperator === 'OR') {
        const result =
          (permissionResults.length > 0 && hasValidPermissions) ||
          (roleResults.length > 0 && hasValidRoles);
        if (!result) {
          throw this.generateAuthorizationError(metadata, permissionResults, roleResults);
        }
        return result;
      } else {
        const result = hasValidPermissions && hasValidRoles;
        if (!result) {
          throw this.generateAuthorizationError(metadata, permissionResults, roleResults);
        }
        return result;
      }
    } catch (error) {
      // 권한 체크 실패 시 캐시하지 않음
      this.logger.error('Authorization check failed:', error);
      throw error;
    }
  }

  /**
   * 여러 권한 중 하나라도 있는지 확인 (OR 조건)
   */
  private async checkAnyPermissions(
    userId: string,
    permissions: string[],
    serviceId?: string
  ): Promise<boolean> {
    try {
      const results = await Promise.all(
        permissions.map((permission) => this.checkUserPermission(userId, permission, serviceId))
      );
      return results.some((result) => result);
    } catch (error) {
      this.logger.error('Error checking any permissions:', error);
      return false;
    }
  }

  /**
   * 모든 권한을 가지고 있는지 확인 (AND 조건)
   */
  private async checkAllPermissions(
    userId: string,
    permissions: string[],
    serviceId?: string
  ): Promise<boolean> {
    try {
      const results = await Promise.all(
        permissions.map((permission) => this.checkUserPermission(userId, permission, serviceId))
      );
      return results.every((result) => result);
    } catch (error) {
      this.logger.error('Error checking all permissions:', error);
      return false;
    }
  }

  /**
   * 여러 역할 중 하나라도 있는지 확인 (OR 조건)
   */
  private async checkAnyRoles(
    userId: string,
    roles: string[],
    serviceId?: string
  ): Promise<boolean> {
    try {
      const results = await Promise.all(
        roles.map((role) => this.checkUserRole(userId, role, serviceId))
      );
      return results.some((result) => result);
    } catch (error) {
      this.logger.error('Error checking any roles:', error);
      return false;
    }
  }

  /**
   * 모든 역할을 가지고 있는지 확인 (AND 조건)
   */
  private async checkAllRoles(
    userId: string,
    roles: string[],
    serviceId?: string
  ): Promise<boolean> {
    try {
      const results = await Promise.all(
        roles.map((role) => this.checkUserRole(userId, role, serviceId))
      );
      return results.every((result) => result);
    } catch (error) {
      this.logger.error('Error checking all roles:', error);
      return false;
    }
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
        return (result as PermissionCheckResponse).hasPermission;
      }

      // 설정 오류
      throw new Error('Neither local service nor TCP client is configured');
    } catch (error: unknown) {
      this.handleAuthorizationError(error);
      throw error;
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
        return (result as RoleCheckResponse).hasRole;
      }

      // 설정 오류
      throw new Error('Neither local service nor TCP client is configured');
    } catch (error: unknown) {
      this.handleAuthorizationError(error);
      throw error;
    }
  }

  /**
   * 캐시 키 생성
   */
  private generateCacheKey(userId: string, metadata: AuthorizationMetadata): string {
    const baseKey = metadata.cacheKey || 'auth';
    const components = [
      baseKey,
      userId,
      metadata.permission?.action,
      metadata.role?.roleName,
      metadata.requiredAnyPermissions?.join(','),
      metadata.requiredAllPermissions?.join(','),
      metadata.requiredAnyRoles?.join(','),
      metadata.requiredAllRoles?.join(','),
      metadata.combinationOperator,
      metadata.permissionServiceId,
      metadata.roleServiceId,
    ].filter(Boolean);

    return components.join(':');
  }

  /**
   * 캐시된 결과 조회
   */
  private getCachedResult(key: string): boolean | null {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl * 1000) {
      this.cache.delete(key);
      return null;
    }

    return entry.result;
  }

  /**
   * 결과 캐싱
   */
  private setCachedResult(key: string, result: boolean, ttl: number): void {
    this.cache.set(key, {
      result,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * 캐시 정리
   */
  private cleanupCache(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl * 1000) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => this.cache.delete(key));

    if (keysToDelete.length > 0) {
      this.logger.debug(`Cleaned up ${keysToDelete.length} expired cache entries`);
    }
  }

  /**
   * 권한 체크 에러 생성
   */
  private generateAuthorizationError(
    metadata: AuthorizationMetadata,
    permissionResults: boolean[],
    roleResults: boolean[]
  ): Error {
    // 구체적인 에러 메시지 생성
    if (metadata.permission && permissionResults.length > 0 && !permissionResults[0]) {
      return AuthorizationException.permissionDenied(metadata.permission.action);
    }

    if (metadata.role && roleResults.length > 0 && !roleResults[0]) {
      return AuthorizationException.roleAccessDenied(metadata.role.roleName);
    }

    // 복합 조건의 경우 일반적인 에러 반환
    return AuthorizationException.permissionDenied('required authorization');
  }

  /**
   * 로깅용 메타데이터 정리
   */
  private sanitizeMetadataForLogging(metadata: AuthorizationMetadata): object {
    return {
      permission: metadata.permission?.action,
      role: metadata.role?.roleName,
      requiredAnyPermissions: metadata.requiredAnyPermissions,
      requiredAllPermissions: metadata.requiredAllPermissions,
      requiredAnyRoles: metadata.requiredAnyRoles,
      requiredAllRoles: metadata.requiredAllRoles,
      combinationOperator: metadata.combinationOperator,
      hasCaching: !!metadata.cacheTtl,
    };
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

