# @krgeobuk/authorization

krgeobuk 생태계의 권한 기반 접근 제어를 위한 공통 패키지입니다.

## 주요 기능

- **권한 기반 가드**: `@RequirePermission` 데코레이터를 통한 세밀한 권한 제어
- **역할 기반 가드**: `@RequireRole` 데코레이터를 통한 역할 기반 접근 제어
- **마이크로서비스 지원**: TCP 기반 권한 검증 서비스 통신
- **성능 최적화**: 캐싱, 타임아웃, 배치 처리 지원
- **개발자 친화적**: 상세한 로깅 및 에러 처리

## 설치

```bash
pnpm add @krgeobuk/authorization
```

## 사용법

### 1. 모듈 설정

```typescript
// app.module.ts
import { AuthorizationGuard } from '@krgeobuk/authorization/guards';
import { TcpAuthorizationService } from './services/tcp-authorization.service';

@Module({
  providers: [
    {
      provide: 'AUTHORIZATION_SERVICE',
      useClass: TcpAuthorizationService,
    },
    {
      provide: 'AUTHORIZATION_CONFIG',
      useValue: {
        skipInDevelopment: false,
        cacheTtl: 300,
        serviceTimeout: 5000,
        failureMode: 'deny',
      },
    },
  ],
})
export class AppModule {}
```

### 2. 컨트롤러에서 사용

```typescript
import { UseGuards } from '@nestjs/common';
import { RequirePermission, RequireRole } from '@krgeobuk/authorization/decorators';
import { AuthorizationGuard } from '@krgeobuk/authorization/guards';
import { AccessTokenGuard } from '@krgeobuk/jwt/guards';

@Controller('users')
@UseGuards(AccessTokenGuard, AuthorizationGuard)
export class UserController {
  @Get()
  @RequirePermission('read')
  async getUsers() {
    return this.userService.findAll();
  }

  @Post()
  @RequireRole('admin')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  @RequirePermission('delete', 'user-service')
  async deleteUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
```

### 3. AuthorizationService 구현

```typescript
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthorizationService } from '@krgeobuk/authorization/interfaces';
import { AuthorizationTcpPatterns } from '@krgeobuk/authorization/tcp/patterns';

@Injectable()
export class TcpAuthorizationService implements AuthorizationService {
  constructor(
    @Inject('AUTHZ_TCP_CLIENT') private readonly client: ClientProxy
  ) {}

  async checkUserPermission(userId: string, action: string, serviceId?: string): Promise<boolean> {
    try {
      const result = await this.client.send(
        AuthorizationTcpPatterns.CHECK_PERMISSION,
        { userId, action, serviceId }
      ).toPromise();
      
      return result.hasPermission;
    } catch (error) {
      throw new Error(`Permission check failed: ${error.message}`);
    }
  }

  async checkUserRole(userId: string, roleName: string, serviceId?: string): Promise<boolean> {
    try {
      const result = await this.client.send(
        AuthorizationTcpPatterns.CHECK_ROLE,
        { userId, roleName, serviceId }
      ).toPromise();
      
      return result.hasRole;
    } catch (error) {
      throw new Error(`Role check failed: ${error.message}`);
    }
  }
}
```

## API 참조

### 데코레이터

#### `@RequirePermission(action, serviceId?)`
특정 권한이 필요한 엔드포인트에 적용합니다.

- `action`: 필요한 권한 액션 (예: 'create', 'read', 'update', 'delete')
- `serviceId`: 권한을 체크할 서비스 ID (옵션)

#### `@RequireRole(roleName, serviceId?)`
특정 역할이 필요한 엔드포인트에 적용합니다.

- `roleName`: 필요한 역할 이름 (예: 'admin', 'manager', 'user')
- `serviceId`: 역할을 체크할 서비스 ID (옵션)

### 인터페이스

#### `AuthorizationService`
권한 검증 서비스가 구현해야 하는 인터페이스입니다.

```typescript
interface AuthorizationService {
  checkUserPermission(userId: string, action: string, serviceId?: string): Promise<boolean>;
  checkUserRole(userId: string, roleName: string, serviceId?: string): Promise<boolean>;
}
```

#### `AuthorizationConfig`
Authorization Guard 설정 인터페이스입니다.

```typescript
interface AuthorizationConfig {
  skipInDevelopment?: boolean;  // 개발 환경에서 권한 체크 스킵
  cacheTtl?: number;           // 캐시 TTL (초)
  serviceTimeout?: number;     // 서비스 타임아웃 (밀리초)
  failureMode?: 'allow' | 'deny'; // 실패 시 기본 동작
}
```

### TCP 패턴

```typescript
export const AuthorizationTcpPatterns = {
  CHECK_PERMISSION: 'authorization.checkPermission',
  CHECK_MULTIPLE_PERMISSIONS: 'authorization.checkMultiplePermissions',
  CHECK_ROLE: 'authorization.checkRole',
  CHECK_MULTIPLE_ROLES: 'authorization.checkMultipleRoles',
  GET_USER_PERMISSIONS: 'authorization.getUserPermissions',
  GET_USER_ROLES: 'authorization.getUserRoles',
  GET_SERVICE_PERMISSIONS: 'authorization.getServicePermissions',
  GET_SERVICE_ROLES: 'authorization.getServiceRoles',
};
```

## 주요 개선사항

### 기존 core 패키지 대비 개선사항

1. **마이크로서비스 아키텍처 지원**
   - TCP 기반 권한 검증 서비스 통신
   - 네트워크 에러 및 타임아웃 처리

2. **향상된 에러 처리**
   - 구체적인 에러 분류 및 메시지
   - HTTP 상태 코드와 에러 코드 매핑

3. **성능 최적화**
   - 권한 체크 결과 캐싱 지원
   - 배치 권한 검사 지원
   - 성능 모니터링 및 로깅

4. **환경별 설정**
   - 개발/프로덕션 환경 구분
   - 유연한 설정 옵션

5. **개발자 경험 개선**
   - 상세한 로깅 및 디버깅 정보
   - 타입 안전성 보장
   - 포괄적인 문서화

## 마이그레이션 가이드

기존 `@krgeobuk/core`에서 마이그레이션:

```typescript
// Before
import { AuthorizationGuard, RequirePermission, RequireRole } from '@krgeobuk/core';

// After  
import { AuthorizationGuard } from '@krgeobuk/authorization/guards';
import { RequirePermission, RequireRole } from '@krgeobuk/authorization/decorators';
```