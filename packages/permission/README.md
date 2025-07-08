# @krgeobuk/permission

권한 관련 공통 DTO, 인터페이스, 예외 처리를 제공하는 패키지입니다.

## 설치

```bash
npm install @krgeobuk/permission
```

## 사용법

### DTOs

```typescript
import { PermissionDetailDto, PermissionSearchQueryDto } from '@krgeobuk/permission/dtos';

// 권한 상세 정보 DTO
const permissionDetail: PermissionDetailDto = {
  id: 'uuid',
  action: 'user:create',
  description: '사용자 생성 권한',
  serviceId: 'service-uuid',
  createdAt: new Date(),
  updatedAt: new Date()
};

// 권한 검색 쿼리 DTO
const searchQuery: PermissionSearchQueryDto = {
  page: 1,
  limit: 30,
  action: 'user',
  serviceId: 'service-uuid'
};
```

### 인터페이스

```typescript
import type { PermissionDetail, PermissionSearchQuery } from '@krgeobuk/permission/interfaces';

// 타입으로 사용
function getPermission(query: PermissionSearchQuery): Promise<PermissionDetail> {
  // ...
}
```

### 예외 처리

```typescript
import { PermissionException } from '@krgeobuk/permission/exception';

// 권한을 찾을 수 없을 때
throw PermissionException.permissionNotFound();

// 권한 조회 실패
throw PermissionException.permissionFetchError();
```

### 응답 포맷

```typescript
import { Serialize } from '@krgeobuk/core';
import { PermissionResponse } from '@krgeobuk/permission/response';

// 성공 응답
@Serialize({
    dto: UserDetailDto,
    ...UserResponse.PROFILE_FETCH_SUCCESS,
  })
```

## 패키지 구조

```
src/
├── index.ts           # 메인 export
├── decorators/        # 데코레이터
├── dtos/              # DTO 클래스
├── exception/         # 예외 처리
├── interfaces/        # TypeScript 인터페이스
├── messages/          # 메시지 상수
└── response/          # 응답 포맷
```

## 라이센스

MIT