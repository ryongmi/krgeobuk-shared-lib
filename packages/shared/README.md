# @krgeobuk/shared

krgeobuk 서비스 간 공유되는 공통 DTO와 인터페이스를 제공하는 패키지입니다.

## 개요

이 패키지는 여러 도메인 패키지에서 공통으로 사용되는 DTO, 인터페이스, 유효성 검증 데코레이터를 제공하여 코드 중복을 방지하고 일관성을 유지합니다.

## 주요 기능

### OAuth 공유 컴포넌트
- **DTOs**: `OAuthAccountDto` - OAuth 계정 정보
- **Interfaces**: `IOAuthAccount` - OAuth 계정 인터페이스
- **Enums**: `Provider` - OAuth 제공자 (Google, Naver 등)
- **Validation**: `ProviderId`, `Provider` - OAuth 관련 유효성 검증

### Role 공유 컴포넌트
- **DTOs**: `RoleDto` - 역할 정보
- **Interfaces**: `IRole` - 역할 인터페이스
- **Validation**: `Name`, `Description`, `Priority`, `UserCount` - 역할 관련 유효성 검증

### Service 공유 컴포넌트
- **DTOs**: `ServiceDto` - 서비스 정보
- **Interfaces**: `IService` - 서비스 인터페이스
- **Validation**: `Name`, `DisplayName`, `Description`, `BaseUrl`, `IconUrl`, `IsVisible`, `IsVisibleByRole`, `VisibleRoleCount` - 서비스 관련 유효성 검증

### User 공유 컴포넌트
- **DTOs**: `UserDto`, `LoggedInUserDto` - 사용자 정보
- **Interfaces**: `IUser`, `ILoggedInUser` - 사용자 인터페이스
- **Validation**: `Email`, `Name`, `Nickname`, `Password`, `ProfileImageUrl`, `IsEmailVerified`, `IsIntegrated` - 사용자 관련 유효성 검증

## 사용 방법

### OAuth 관련 공유 컴포넌트

```typescript
import { 
  OAuthAccountDto, 
  Provider,
  ProviderId,
  Provider as ProviderValidator 
} from '@krgeobuk/shared/oauth';

class CreateOAuthAccountDto extends OAuthAccountDto {
  @ProviderId()
  providerId: string;

  @ProviderValidator()
  provider: Provider;
}

// OAuth 제공자 enum 사용
const googleProvider = Provider.GOOGLE;
const naverProvider = Provider.NAVER;
```

### Role 관련 공유 컴포넌트

```typescript
import { 
  RoleDto,
  Name,
  Description,
  Priority,
  UserCount 
} from '@krgeobuk/shared/role';

class CreateRoleDto extends RoleDto {
  @Name()
  name: string;

  @Description()
  description: string;

  @Priority()
  priority: number;

  @UserCount()
  userCount: number;
}
```

### Service 관련 공유 컴포넌트

```typescript
import { 
  ServiceDto,
  Name,
  DisplayName,
  BaseUrl,
  IsVisible 
} from '@krgeobuk/shared/service';

class CreateServiceDto extends ServiceDto {
  @Name()
  name: string;

  @DisplayName()
  displayName: string;

  @BaseUrl()
  baseUrl: string;

  @IsVisible()
  isVisible: boolean;
}
```

### User 관련 공유 컴포넌트

```typescript
import { 
  UserDto,
  LoggedInUserDto,
  Email,
  Name,
  Password 
} from '@krgeobuk/shared/user';

class CreateUserDto extends UserDto {
  @Email()
  email: string;

  @Name()
  name: string;

  @Password()
  password: string;
}

// 로그인된 사용자 정보 사용
function handleLoggedInUser(user: LoggedInUserDto) {
  console.log(`User: ${user.name}, Email: ${user.email}`);
  console.log(`Verified: ${user.isEmailVerified}`);
}
```

### 모듈별 임포트

```typescript
// 특정 도메인의 공유 컴포넌트만 임포트
import { OAuthAccountDto } from '@krgeobuk/shared/oauth';
import { RoleDto } from '@krgeobuk/shared/role';
import { ServiceDto } from '@krgeobuk/shared/service';
import { UserDto } from '@krgeobuk/shared/user';
```

## 패키지 구조

```
@krgeobuk/shared/
├── oauth/          # OAuth 관련 공유 컴포넌트
├── role/           # Role 관련 공유 컴포넌트  
├── service/        # Service 관련 공유 컴포넌트
└── user/           # User 관련 공유 컴포넌트
```

## 의존성

### Peer Dependencies (호스트 프로젝트에서 설치 필요)
```bash
pnpm add @nestjs/common @nestjs/core class-validator class-transformer typescript
```

### Workspace Dependencies
- `@krgeobuk/core` - 기본 기능
- `@krgeobuk/swagger` - API 문서화

## 빌드

```bash
pnpm build
```

## 로컬 게시

```bash
pnpm verdaccio:publish
```