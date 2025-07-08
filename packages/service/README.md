# @krgeobuk/service

krgeobuk 서비스 등록 및 관리 기능을 제공하는 패키지입니다.

## 개요

이 패키지는 마이크로서비스 환경에서 서비스 등록, 검색, 관리 등 서비스 디스커버리 관련 기능의 DTO, 인터페이스, 예외 처리를 제공합니다.

## 주요 기능

### Codes
- `ServiceCode` - 서비스 관련 코드 상수

### Decorators
- `CurrentUser` - 현재 로그인한 사용자 정보 추출 (서비스 접근 권한 확인용)

### DTOs (Data Transfer Objects)
- `DetailDto` - 서비스 상세 정보
- `SearchQueryDto` - 서비스 검색 쿼리
- `SearchResultDto` - 서비스 검색 결과

### Exception Handling
- `ServiceError` - 서비스 관련 오류 코드
- `ServiceException` - 서비스 관련 예외 클래스

### Interfaces
- `IDetail` - 서비스 상세 정보 인터페이스
- `ISearchQuery` - 검색 쿼리 인터페이스
- `ISearchResult` - 검색 결과 인터페이스
- `IFilter` - 필터링 인터페이스

### Messages
- `ServiceMessage` - 서비스 관련 메시지

### Response
- `ServiceResponse` - 서비스 관련 응답 포맷

## 사용 방법

### 서비스 목록 조회

```typescript
import { SearchQueryDto, SearchResultDto } from '@krgeobuk/service';

@Controller('services')
export class ServicesController {
  @Get()
  async getServices(@Query() query: SearchQueryDto): Promise<SearchResultDto> {
    // 서비스 목록 조회 로직
    return {
      services: [
        {
          id: 1,
          name: 'user-service',
          displayName: '사용자 서비스',
          description: '사용자 관리 마이크로서비스',
          baseUrl: 'https://user-service.krgeobuk.com',
          iconUrl: '/icons/user-service.png',
          isVisible: true,
          isVisibleByRole: true,
          visibleRoleCount: 2
        }
      ],
      total: 1,
      page: query.page,
      limit: query.limit
    };
  }
}
```

### 서비스 상세 조회

```typescript
import { DetailDto } from '@krgeobuk/service';

@Controller('services')
export class ServicesController {
  @Get(':id')
  async getServiceDetail(@Param('id') id: number): Promise<DetailDto> {
    // 서비스 상세 조회 로직
    return {
      id,
      name: 'user-service',
      displayName: '사용자 서비스',
      description: '사용자 관리 및 인증을 담당하는 마이크로서비스',
      baseUrl: 'https://user-service.krgeobuk.com',
      iconUrl: '/icons/user-service.png',
      isVisible: true,
      isVisibleByRole: true,
      visibleRoleCount: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
```

### 사용자별 접근 가능한 서비스 조회

```typescript
import { CurrentUser } from '@krgeobuk/service';
import { AccessTokenGuard } from '@krgeobuk/jwt';

@Controller('my-services')
export class MyServicesController {
  @Get()
  @UseGuards(AccessTokenGuard)
  async getMyServices(@CurrentUser() user: any) {
    // 사용자 역할에 따른 접근 가능한 서비스 필터링
    const accessibleServices = await this.serviceService.getAccessibleServices(user.role);
    
    return accessibleServices;
  }
}
```

### 서비스 등록

```typescript
import { DetailDto } from '@krgeobuk/service';

@Controller('services')
export class ServicesController {
  @Post()
  async registerService(@Body() serviceData: any): Promise<DetailDto> {
    // 서비스 등록 로직
    const newService = await this.serviceService.register(serviceData);
    
    return newService;
  }
}
```

### 서비스 예외 처리

```typescript
import { ServiceException, ServiceError } from '@krgeobuk/service';

try {
  // 서비스 관련 로직
} catch (error) {
  throw new ServiceException(ServiceError.SERVICE_NOT_FOUND);
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