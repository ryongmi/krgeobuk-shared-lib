# Authorization 데코레이터 및 가드

krgeobuk 생태계에서 역할 기반 접근 제어(RBAC)를 구현하기 위한 권한 체크 데코레이터와 가드입니다.

## 개요

`@krgeobuk/core` 패키지는 다음 권한 관련 기능을 제공합니다:

- **`@RequirePermission`**: 특정 권한(action)이 필요한 엔드포인트 표시
- **`@RequireRole`**: 특정 역할이 필요한 엔드포인트 표시  
- **`AuthorizationGuard`**: 실제 권한 체크를 수행하는 가드
- **`AuthorizationService`**: 권한 체크 로직을 구현해야 하는 인터페이스

## 설치 및 설정

### 1. AuthorizationService 구현

먼저 `AuthorizationService` 인터페이스를 구현하는 서비스를 만들어야 합니다:

```typescript
// authorization.service.ts
import { Injectable } from '@nestjs/common';
import { AuthorizationService } from '@krgeobuk/core/guards';

@Injectable()
export class MyAuthorizationService implements AuthorizationService {
  constructor(
    // authz-server와 통신하는 HTTP 클라이언트 등을 주입
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async checkUserPermission(
    userId: string, 
    action: string, 
    serviceId?: string
  ): Promise<boolean> {
    try {
      // authz-server API 호출
      const response = await this.httpService.post('/authorization/check-permission', {
        userId,
        action,
        serviceId: serviceId || this.configService.get('SERVICE_ID')
      }).toPromise();
      
      return response.data.hasPermission;
    } catch (error) {
      // 에러 시 false 반환 (보안상 안전한 기본값)
      return false;
    }
  }

  async checkUserRole(
    userId: string, 
    roleName: string, 
    serviceId?: string
  ): Promise<boolean> {
    try {
      // authz-server API 호출
      const response = await this.httpService.post('/authorization/check-role', {
        userId,
        roleName,
        serviceId: serviceId || this.configService.get('SERVICE_ID')
      }).toPromise();
      
      return response.data.hasRole;
    } catch (error) {
      // 에러 시 false 반환 (보안상 안전한 기본값)
      return false;
    }
  }
}
```

### 2. 모듈 설정

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { AuthorizationGuard } from '@krgeobuk/core/guards';
import { MyAuthorizationService } from './authorization.service';

@Module({
  providers: [
    MyAuthorizationService,
    {
      provide: AuthorizationGuard,
      useFactory: (reflector: Reflector, authService: MyAuthorizationService) => {
        return new AuthorizationGuard(reflector, authService);
      },
      inject: [Reflector, MyAuthorizationService],
    },
  ],
  exports: [AuthorizationGuard],
})
export class AuthorizationModule {}

@Module({
  imports: [AuthorizationModule],
  // ...
})
export class AppModule {}
```

## 사용 방법

### 기본 사용

```typescript
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@krgeobuk/jwt/guards';
import { AuthorizationGuard, RequirePermission, RequireRole } from '@krgeobuk/core';

@Controller('users')
@UseGuards(AccessTokenGuard, AuthorizationGuard) // JWT 가드를 먼저 적용
export class UserController {
  
  // 'read' 권한이 필요한 엔드포인트
  @Get()
  @RequirePermission('read')
  async getUsers() {
    return this.userService.findAll();
  }

  // 'create' 권한이 필요한 엔드포인트
  @Post()
  @RequirePermission('create')
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  // 'admin' 역할이 필요한 엔드포인트
  @Get('admin-only')
  @RequireRole('admin')
  async getAdminData() {
    return this.userService.getAdminData();
  }
}
```

### 다른 서비스의 권한 체크

```typescript
@Controller('external')
@UseGuards(AccessTokenGuard, AuthorizationGuard)
export class ExternalController {
  
  // 다른 서비스의 권한 체크
  @Post('create-in-external')
  @RequirePermission('create', 'external-service-id')
  async createInExternalService() {
    return this.externalService.create();
  }

  // 다른 서비스의 역할 체크
  @Get('external-admin-data')
  @RequireRole('admin', 'external-service-id')
  async getExternalAdminData() {
    return this.externalService.getAdminData();
  }
}
```

### 복합 권한 체크

```typescript
@Controller('sensitive')
@UseGuards(AccessTokenGuard, AuthorizationGuard)
export class SensitiveController {
  
  // 권한과 역할 둘 다 체크 (AND 조건)
  @Delete(':id')
  @RequirePermission('delete')
  @RequireRole('admin')
  async deleteSensitiveData(@Param('id') id: string) {
    return this.sensitiveService.delete(id);
  }
}
```

### 전역 가드 설정

```typescript
// main.ts
import { NestFactory, Reflector } from '@nestjs/core';
import { AuthorizationGuard } from '@krgeobuk/core/guards';
import { MyAuthorizationService } from './authorization.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 전역 가드 설정 (선택사항)
  const reflector = app.get(Reflector);
  const authService = app.get(MyAuthorizationService);
  app.useGlobalGuards(new AuthorizationGuard(reflector, authService));
  
  await app.listen(3000);
}
```

## API 엔드포인트 구현 예시

authz-server에서 다음과 같은 엔드포인트를 구현해야 합니다:

```typescript
// authz-server/authorization.controller.ts
@Controller('authorization')
export class AuthorizationController {
  
  @Post('check-permission')
  async checkPermission(@Body() dto: CheckPermissionDto) {
    const hasPermission = await this.authorizationService.checkUserPermission(
      dto.userId,
      dto.action,
      dto.serviceId
    );
    
    return { hasPermission };
  }

  @Post('check-role')
  async checkRole(@Body() dto: CheckRoleDto) {
    const hasRole = await this.authorizationService.checkUserRole(
      dto.userId,
      dto.roleName,
      dto.serviceId
    );
    
    return { hasRole };
  }
}
```

## 에러 처리

권한이 없는 경우 `ForbiddenException`이 발생합니다:

```typescript
// 권한이 없는 경우 응답 예시
{
  "statusCode": 403,
  "message": "'create' 권한이 필요합니다.",
  "error": "Forbidden"
}

// 역할이 없는 경우 응답 예시
{
  "statusCode": 403,
  "message": "'admin' 역할이 필요합니다.",
  "error": "Forbidden"
}
```

## 주의사항

1. **JWT 가드 순서**: `AuthorizationGuard`를 사용하기 전에 반드시 `AccessTokenGuard`를 먼저 적용해야 합니다.

2. **서비스 ID**: `serviceId`를 제공하지 않으면 현재 서비스의 권한을 체크합니다. 환경변수 등에서 서비스 ID를 가져오도록 구현하세요.

3. **에러 처리**: `AuthorizationService` 구현 시 에러가 발생하면 `false`를 반환하여 보안을 유지하세요.

4. **성능**: 권한 체크는 매 요청마다 수행되므로 캐싱 등을 고려하여 성능을 최적화하세요.

5. **로깅**: 권한 거부 시 로그가 남으므로 보안 모니터링에 활용할 수 있습니다.

## 예제 프로젝트

완전한 예제는 krgeobuk 프로젝트의 각 서비스에서 확인할 수 있습니다:
- auth-server: 사용자 관리 권한
- authz-server: 권한 및 역할 관리  
- portal-server: 서비스 관리 권한