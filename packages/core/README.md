# @krgeobuk/core

krgeobuk 서비스의 핵심 기능을 제공하는 기본 패키지입니다.

## 개요

이 패키지는 모든 krgeobuk 서비스에서 공통으로 사용되는 기본 클래스, 데코레이터, DTO, 엔터티, 필터, 인터셉터, 유틸리티 등을 제공합니다.

## 주요 기능

### Constants
- 직렬화 상수
- 코어 코드 상수

### Decorators
- **Serialize**: 응답 데이터 직렬화
- **Transaction**: 트랜잭션 관리
- **Validation**: 유효성 검증 (이메일, 형식, 중첩 객체, TypeORM)

### DTOs (Data Transfer Objects)
- **Format**: 오류 및 응답 형식 DTO
- **TypeORM**: ID, 페이지네이션, 타임스탬프 DTO

### Entities
- `BaseEntity` - 기본 엔터티 클래스
- `TimestampEntity` - 타임스탬프 엔터티

### Enums
- **TypeORM**: 제한값, 정렬 기준, 정렬 순서 enum

### Exception Handling
- `CoreError` - 핵심 오류 처리

### Filters
- `HttpExceptionFilter` - HTTP 예외 필터

### Interceptors
- `LoggerInterceptor` - 로깅 인터셉터
- `SerializeInterceptor` - 직렬화 인터셉터
- `TransactionInterceptor` - 트랜잭션 인터셉터

### Interfaces
- **Express**: 페이로드 인터페이스
- **Format**: 오류 및 응답 인터페이스
- **Serialize**: 직렬화 옵션 인터페이스
- **TypeORM**: ID, 페이지네이션, 타임스탬프 인터페이스
- **Validation**: 유효성 검증 인터페이스

### Logger
- `CustomLoggerService` - 커스텀 로거 서비스
- `winston.config` - Winston 설정

### Repositories
- `BaseRepository` - 기본 레포지토리 클래스

### Response
- `CoreResponse` - 핵심 응답 포맷

### Utils
- `case-transform.util` - 케이스 변환 유틸리티
- `class-validator` - 클래스 유효성 검증
- `string-utils` - 문자열 유틸리티

## 사용 방법

```typescript
import { 
  BaseEntity,
  TimestampEntity,
  BaseRepository,
  SerializeInterceptor,
  LoggerInterceptor,
  HttpExceptionFilter,
  CoreResponse 
} from '@krgeobuk/core';

// 기본 엔터티 확장
@Entity()
export class User extends TimestampEntity {
  @Column()
  name: string;
}

// 기본 레포지토리 확장
@Repository()
export class UserRepository extends BaseRepository<User> {
  // 커스텀 메서드 추가
}

// 응답 포맷 사용
return CoreResponse.success(data, '성공적으로 처리되었습니다.');
```

## 의존성

- `@nestjs/common` - NestJS 코어
- `@nestjs/core` - NestJS 코어
- `@nestjs/swagger` - API 문서화
- `class-validator` - 유효성 검증
- `class-transformer` - 데이터 변환
- `typeorm` - ORM
- `winston` - 로깅

## 빌드

```bash
pnpm build
```

## 로컬 게시

```bash
pnpm verdaccio:publish
```