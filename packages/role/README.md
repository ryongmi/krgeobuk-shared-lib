# @krgeobuk/role

krgeobuk 서비스의 역할 기반 접근 제어(RBAC) 기능을 제공하는 패키지입니다.

## 개요

이 패키지는 사용자 역할 관리, 권한 제어, 역할 검색 등 RBAC 관련 기능의 DTO, 인터페이스, 예외 처리를 제공합니다.

## 주요 기능

### Codes
- `RoleCode` - 역할 관련 코드 상수

### Decorators
- `CurrentUser` - 현재 로그인한 사용자 정보 추출 (역할 정보 포함)

### DTOs (Data Transfer Objects)
- `DetailDto` - 역할 상세 정보
- `SearchQueryDto` - 역할 검색 쿼리
- `SearchResultDto` - 역할 검색 결과

### Exception Handling
- `RoleError` - 역할 관련 오류 코드
- `RoleException` - 역할 관련 예외 클래스

### Interfaces
- `IDetail` - 역할 상세 정보 인터페이스
- `ISearchQuery` - 검색 쿼리 인터페이스
- `ISearchResult` - 검색 결과 인터페이스
- `IFilter` - 필터링 인터페이스

### Messages
- `RoleMessage` - 역할 관련 메시지

### Response
- `RoleResponse` - 역할 관련 응답 포맷

## 사용 방법

### 역할 검색

```typescript
import { SearchQueryDto, SearchResultDto } from '@krgeobuk/role';

@Controller('roles')
export class RolesController {
  @Get('search')
  async searchRoles(@Query() query: SearchQueryDto): Promise<SearchResultDto> {
    // 역할 검색 로직
    return {
      roles: [
        {
          id: 1,
          name: 'admin',
          description: '관리자 역할',
          priority: 1,
          userCount: 5
        }
      ],
      total: 1,
      page: query.page,
      limit: query.limit
    };
  }
}
```

### 역할 상세 조회

```typescript
import { DetailDto } from '@krgeobuk/role';

@Controller('roles')
export class RolesController {
  @Get(':id')
  async getRoleDetail(@Param('id') id: number): Promise<DetailDto> {
    // 역할 상세 조회 로직
    return {
      id,
      name: 'admin',
      description: '시스템 관리자',
      priority: 1,
      userCount: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
```

### 현재 사용자 역할 확인

```typescript
import { CurrentUser } from '@krgeobuk/role';
import { AccessTokenGuard } from '@krgeobuk/jwt';

@Controller('admin')
export class AdminController {
  @Get('dashboard')
  @UseGuards(AccessTokenGuard)
  getDashboard(@CurrentUser() user: any) {
    // 사용자 역할 확인
    if (user.role !== 'admin') {
      throw new ForbiddenException('관리자 권한이 필요합니다.');
    }
    
    return { message: '관리자 대시보드' };
  }
}
```

### 역할 예외 처리

```typescript
import { RoleException, RoleError } from '@krgeobuk/role';

try {
  // 역할 관련 로직
} catch (error) {
  throw new RoleException(RoleError.ROLE_NOT_FOUND);
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
- `@krgeobuk/swagger` - API 문서화

## 빌드

```bash
pnpm build
```

## 로컬 게시

```bash
pnpm verdaccio:publish
```