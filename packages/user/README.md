# @krgeobuk/user

krgeobuk 서비스의 사용자 관리 기능을 제공하는 패키지입니다.

## 개요

이 패키지는 사용자 정보 관리, 프로필 업데이트, 비밀번호 변경 등 사용자 관련 기능의 DTO, 인터페이스, 예외 처리를 제공합니다.

## 주요 기능

### Codes
- `UserCode` - 사용자 관련 코드 상수

### Decorators
- `CurrentUser` - 현재 로그인한 사용자 정보 추출

### DTOs (Data Transfer Objects)
- `ChangePasswordDto` - 비밀번호 변경 요청
- `DetailDto` - 사용자 상세 정보
- `LoggedInUserDto` - 로그인한 사용자 정보
- `SearchQueryDto` - 사용자 검색 쿼리
- `SearchResultDto` - 사용자 검색 결과
- `UpdateProfileDto` - 프로필 업데이트 요청

### Exception Handling
- `UserError` - 사용자 관련 오류 코드
- `UserException` - 사용자 관련 예외 클래스

### Interfaces
- `IChangePassword` - 비밀번호 변경 인터페이스
- `IDetail` - 사용자 상세 정보 인터페이스
- `ILoggedInUser` - 로그인한 사용자 인터페이스
- `ISearchQuery` - 검색 쿼리 인터페이스
- `ISearchResult` - 검색 결과 인터페이스
- `IUpdateProfile` - 프로필 업데이트 인터페이스
- `IFilter` - 필터링 인터페이스

### Messages
- `UserMessage` - 사용자 관련 메시지

### Response
- `UserResponse` - 사용자 관련 응답 포맷

## 사용 방법

### 현재 사용자 정보 추출

```typescript
import { CurrentUser } from '@krgeobuk/user';
import { AccessTokenGuard } from '@krgeobuk/jwt';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(AccessTokenGuard)
  getProfile(@CurrentUser() user: ILoggedInUser) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      profileImageUrl: user.profileImageUrl
    };
  }
}
```

### 비밀번호 변경

```typescript
import { ChangePasswordDto } from '@krgeobuk/user';

@Controller('user')
export class UserController {
  @Patch('password')
  @UseGuards(AccessTokenGuard)
  async changePassword(
    @CurrentUser() user: ILoggedInUser,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    // 비밀번호 변경 로직
    return { message: '비밀번호가 성공적으로 변경되었습니다.' };
  }
}
```

### 프로필 업데이트

```typescript
import { UpdateProfileDto } from '@krgeobuk/user';

@Controller('user')
export class UserController {
  @Patch('profile')
  @UseGuards(AccessTokenGuard)
  async updateProfile(
    @CurrentUser() user: ILoggedInUser,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    // 프로필 업데이트 로직
    return { message: '프로필이 성공적으로 업데이트되었습니다.' };
  }
}
```

### 사용자 검색

```typescript
import { SearchQueryDto, SearchResultDto } from '@krgeobuk/user';

@Controller('users')
export class UsersController {
  @Get('search')
  async searchUsers(@Query() query: SearchQueryDto): Promise<SearchResultDto> {
    // 사용자 검색 로직
    return {
      users: [],
      total: 0,
      page: query.page,
      limit: query.limit
    };
  }
}
```

### 사용자 예외 처리

```typescript
import { UserException, UserError } from '@krgeobuk/user';

try {
  // 사용자 관련 로직
} catch (error) {
  throw new UserException(UserError.USER_NOT_FOUND);
}
```

## 의존성

### Peer Dependencies (호스트 프로젝트에서 설치 필요)
```bash
pnpm add @nestjs/common @nestjs/core @types/express class-validator class-transformer typescript
```

### Workspace Dependencies
- `@krgeobuk/core` - 기본 기능
- `@krgeobuk/shared` - 공유 DTO 및 인터페이스
- `@krgeobuk/jwt` - JWT 관련 기능
- `@krgeobuk/swagger` - API 문서화

## 빌드

```bash
pnpm build
```

## 로컬 게시

```bash
pnpm verdaccio:publish
```