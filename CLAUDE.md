# CLAUDE.md - Shared Libraries

이 파일은 shared-lib 작업 시 Claude Code의 가이드라인을 제공합니다.

## 저장소 개요

shared-lib는 krgeobuk 생태계의 모든 서비스에서 사용하는 공유 라이브러리를 관리하는 TypeScript 모노레포입니다. pnpm 워크스페이스와 Verdaccio 로컬 레지스트리를 통해 효율적인 패키지 관리를 제공합니다.

### 기술 스택
- **PNPM** - 워크스페이스를 사용한 패키지 관리
- **TypeScript** - 컴포지트 프로젝트 설정
- **ESM (ES Modules)** - 모든 패키지가 ESM 형태로 구성
- **ESLint** - 커스텀 설정을 통한 린팅
- **Verdaccio** - 로컬 패키지 레지스트리 (포트 4873)
- **NestJS** - 대부분 패키지의 주요 프레임워크

## 핵심 명령어

### 빌드
```bash
# 모든 패키지 빌드 (TypeScript 프로젝트 참조 사용)
pnpm build

# 모든 빌드 아티팩트 정리
pnpm clean

# 특정 패키지 빌드
pnpm --filter @krgeobuk/core build
```

### 린팅 및 포맷팅
```bash
# 모든 파일 린팅
pnpm lint

# 자동 수정과 함께 린팅
pnpm lint:fix

# Prettier로 모든 파일 포맷팅
pnpm format
```

### Docker (Verdaccio 레지스트리)
```bash
# 로컬 패키지 레지스트리 시작
pnpm docker:up

# 로컬 패키지 레지스트리 중지
pnpm docker:down
```

### 패키지 관리
```bash
# 특정 패키지의 의존성 설치
pnpm --filter @krgeobuk/core install

# 로컬 레지스트리에 게시 (패키지 디렉토리에서)
pnpm verdaccio:publish
```

## 패키지 아키텍처

### 핵심 인프라 패키지
- **`@krgeobuk/core`** - 기본 클래스, 데코레이터, DTO, 엔터티, 필터, 인터셉터, 유틸리티
- **`@krgeobuk/database-config`** - TypeORM 및 Redis 설정 모듈
- **`@krgeobuk/shared`** - 패키지 간 공유되는 공통 DTO와 인터페이스

### 도메인별 패키지
- **`@krgeobuk/auth`** - 인증 로직, DTO, 예외 처리
- **`@krgeobuk/jwt`** - JWT 토큰 처리, 가드, 데코레이터
- **`@krgeobuk/oauth`** - OAuth 제공자(Google, Naver) 및 토큰 관리
- **`@krgeobuk/user`** - 사용자 관리 기능
- **`@krgeobuk/role`** - 역할 기반 접근 제어
- **`@krgeobuk/service`** - 서비스 등록 및 관리

### 도구 및 설정 패키지
- **`@krgeobuk/swagger`** - OpenAPI/Swagger 설정 및 데코레이터
- **`@krgeobuk/eslint-config`** - ESLint 설정 (base, nest, next)
- **`@krgeobuk/tsconfig`** - TypeScript 설정 (base, nest, next)
- **`@krgeobuk/jest-config`** - Jest 테스트 설정

---

# 🔥 공통 패키지 개발 표준

> **중요**: 이 섹션은 krgeobuk 생태계의 **모든 공통 패키지 개발**에서 적용되는 표준입니다.

## 패키지 구조 및 설정 표준

### 1. package.json 필수 설정
```json
{
  "name": "@krgeobuk/package-name",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "sideEffects": false,
  "publishConfig": {
    "registry": "http://localhost:4873/"
  }
}
```

**핵심 설정 요소:**
- **`"sideEffects": false`**: 트리 쉐이킹 활성화로 번들 크기 최적화
- **`"files": ["dist"]`**: 배포 시 빌드 결과물만 포함
- **`"type": "module"`**: ESM 모듈 시스템 사용

### 2. exports 및 typesVersions 설정
```json
{
  "exports": {
    ".": "./dist/index.js",
    "./decorators": "./dist/decorators/index.js",
    "./dtos": "./dist/dtos/index.js",
    "./exception": "./dist/exception/index.js",
    "./interfaces": "./dist/interfaces/index.js",
    "./response": "./dist/response/index.js"
  },
  "typesVersions": {
    "*": {
      "decorators": ["dist/decorators/index.d.ts"],
      "decorators/*": ["dist/decorators/*"],
      "dtos": ["dist/dtos/index.d.ts"],
      "dtos/*": ["dist/dtos/*"],
      "exception": ["dist/exception/index.d.ts"],
      "exception/*": ["dist/exception/*"],
      "interfaces": ["dist/interfaces/index.d.ts"],
      "interfaces/*": ["dist/interfaces/*"],
      "response": ["dist/response/index.d.ts"],
      "response/*": ["dist/response/*"]
    }
  }
}
```

### 3. 의존성 관리 표준
```json
{
  "dependencies": {},
  "peerDependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/swagger": "^8.0.7",
    "@types/express": "^5.0.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.2",
    "typescript": "^5.8.3"
  },
  "devDependencies": {
    "@krgeobuk/core": "workspace:*",
    "@krgeobuk/shared": "workspace:*",
    "@krgeobuk/tsconfig": "workspace:*",
    // ... peer dependencies를 dev에도 포함
  }
}
```

**원칙:**
- **dependencies**: 빈 객체로 유지
- **peerDependencies**: 외부 라이브러리 의존성 명시
- **devDependencies**: 개발 시 필요한 모든 의존성 포함

## 메시지 및 응답 패턴 표준

### 1. 메시지 상수 구조 (Messages)
```typescript
export const DomainMessage = {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  OPERATION_ERROR: '작업 수행 중 오류가 발생했습니다.',
  VALIDATION_ERROR: '유효성 검사 중 오류가 발생했습니다.',
  NETWORK_ERROR: '네트워크 통신 중 오류가 발생했습니다.',

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  ENTITY_NOT_FOUND: '해당 엔터티를 찾을 수 없습니다.',
  ENTITY_ALREADY_EXISTS: '이미 존재하는 엔터티입니다.',
  INVALID_INPUT: '잘못된 입력값입니다.',

  /**  =============================================================================
   *
   *        200 ~ 299 성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  OPERATION_SUCCESS: '작업이 성공적으로 완료되었습니다.',
  FETCH_SUCCESS: '조회가 성공적으로 완료되었습니다.',
  CREATE_SUCCESS: '생성이 성공적으로 완료되었습니다.',
  UPDATE_SUCCESS: '수정이 성공적으로 완료되었습니다.',
  DELETE_SUCCESS: '삭제가 성공적으로 완료되었습니다.',
} as const;

export type DomainMessageType = typeof DomainMessage[keyof typeof DomainMessage];
```

### 2. 응답 클래스 구조 (Response)
```typescript
import { DomainCode } from '../codes/index.js';
import { DomainMessage } from '../messages/index.js';

export class DomainResponse {
  /**  =============================================================================
   *
   *        200 ~ 299	성공 응답 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly FETCH_SUCCESS = {
    code: DomainCode.FETCH_SUCCESS,
    message: DomainMessage.FETCH_SUCCESS,
    statusCode: 200,
  };

  static readonly CREATE_SUCCESS = {
    code: DomainCode.CREATE_SUCCESS,
    message: DomainMessage.CREATE_SUCCESS,
    statusCode: 201,
  };

  static readonly UPDATE_SUCCESS = {
    code: DomainCode.UPDATE_SUCCESS,
    message: DomainMessage.UPDATE_SUCCESS,
    statusCode: 200,
  };

  static readonly DELETE_SUCCESS = {
    code: DomainCode.DELETE_SUCCESS,
    message: DomainMessage.DELETE_SUCCESS,
    statusCode: 204,
  };
}
```

### 3. 에러 클래스 구조 (Error)
```typescript
import { DomainCode } from '../codes/index.js';
import { DomainMessage } from '../messages/index.js';

export class DomainError {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly OPERATION_ERROR = {
    code: DomainCode.OPERATION_ERROR,
    message: DomainMessage.OPERATION_ERROR,
    statusCode: 500,
  };

  static readonly VALIDATION_ERROR = {
    code: DomainCode.VALIDATION_ERROR,
    message: DomainMessage.VALIDATION_ERROR,
    statusCode: 400,
  };

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  static readonly ENTITY_NOT_FOUND = {
    code: DomainCode.ENTITY_NOT_FOUND,
    message: DomainMessage.ENTITY_NOT_FOUND,
    statusCode: 404,
  };

  static readonly ENTITY_ALREADY_EXISTS = {
    code: DomainCode.ENTITY_ALREADY_EXISTS,
    message: DomainMessage.ENTITY_ALREADY_EXISTS,
    statusCode: 409,
  };
}
```

### 4. 예외 클래스 구조 (Exception)
```typescript
import { HttpException } from '@nestjs/common';
import { DomainError } from './domain.error.js';

export class DomainException {
  /**  =============================================================================
   *
   *        000 ~ 099	에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 작업 수행 중 서버 오류 */
  static operationError(): HttpException {
    const e = DomainError.OPERATION_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 유효성 검사 중 오류 */
  static validationError(): HttpException {
    const e = DomainError.VALIDATION_ERROR;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /**  =============================================================================
   *
   *        100 ~ 199 에러 코드
   *
   *   =============================================================================
   */
  /** */

  /** 엔터티를 찾을 수 없음 */
  static entityNotFound(): HttpException {
    const e = DomainError.ENTITY_NOT_FOUND;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }

  /** 이미 존재하는 엔터티 */
  static entityAlreadyExists(): HttpException {
    const e = DomainError.ENTITY_ALREADY_EXISTS;
    return new HttpException({ code: e.code, message: e.message }, e.statusCode);
  }
}
```

## 트리 쉐이킹 전략

### 하이브리드 트리 쉐이킹 방식
공통 패키지의 복잡도와 사용 패턴에 따라 적절한 트리 쉐이킹 전략을 선택:

**1. 도메인 레벨 트리 쉐이킹 (간단한 패키지)**
```json
{
  "exports": {
    "./oauth": {
      "import": "./dist/oauth/index.js",
      "types": "./dist/oauth/index.d.ts"
    },
    "./permission": {
      "import": "./dist/permission/index.js", 
      "types": "./dist/permission/index.d.ts"
    }
  }
}
```

**장점**: 설정 간단, 관리 용이, 도메인 응집성
**적용**: 단순한 DTO/인터페이스 중심 패키지

**2. 기능 레벨 트리 쉐이킹 (복잡한 패키지)**
```json
{
  "exports": {
    "./role-permission": {
      "import": "./dist/role-permission/index.js",
      "types": "./dist/role-permission/index.d.ts"
    },
    "./role-permission/dtos": {
      "import": "./dist/role-permission/dtos/index.js",
      "types": "./dist/role-permission/dtos/index.d.ts"
    },
    "./role-permission/response": {
      "import": "./dist/role-permission/response/index.js",
      "types": "./dist/role-permission/response/index.d.ts"
    },
    "./role-permission/exception": {
      "import": "./dist/role-permission/exception/index.js",
      "types": "./dist/role-permission/exception/index.d.ts"
    }
  }
}
```

**장점**: 극도로 세분화된 import, 최적의 번들 크기
**적용**: 다양한 기능 모듈을 포함하는 복합 패키지

### 선택 기준
- **단순 패키지**: 도메인 레벨 (shared 패키지 방식)
- **복합 패키지**: 기능 레벨 (authz-relations 패키지 방식)
- **패키지 크기**: 5개 이하 모듈 → 도메인 레벨, 5개 초과 → 기능 레벨

## 공통 패키지 네이밍 규칙

### 파일 네이밍
- **상수**: `domain-name.constant.ts`
- **메시지**: `domain-name.message.ts`
- **응답**: `domain-name.response.ts`
- **에러**: `domain-name.error.ts`
- **예외**: `domain-name.exception.ts`

### 클래스/상수 네이밍
- **코드 상수**: `DomainCode`
- **메시지 상수**: `DomainMessage`
- **응답 클래스**: `DomainResponse`
- **에러 클래스**: `DomainError`
- **예외 클래스**: `DomainSpecificException`

## 개발 워크플로우

### 1. 패키지 개발 순서
1. **환경 설정**: `pnpm docker:up`으로 Verdaccio 레지스트리 시작
2. **의존성 설치**: `pnpm install` (워크스페이스 의존성 해결)
3. **패키지 구조 생성**: 표준 디렉터리 구조 적용
4. **코드 개발**: 도메인별 DTO, 인터페이스, 예외 구현
5. **빌드**: `pnpm build` (TypeScript 컴파일)
6. **품질 검사**: `pnpm lint:fix` 및 `pnpm format` 실행
7. **로컬 게시**: 패키지 디렉토리에서 `pnpm verdaccio:publish`
8. **서비스 연동**: 대상 서비스에서 패키지 테스트

### 2. 패키지 업데이트 순서
1. **코드 변경**: 필요한 수정사항 구현
2. **버전 업데이트**: package.json의 version 필드 증가
3. **빌드 및 검증**: `pnpm build` → `pnpm lint:fix`
4. **재게시**: `pnpm verdaccio:publish`
5. **서비스 반영**: 대상 서비스에서 `pnpm update @krgeobuk/package-name`

### 3. 개발 체크리스트

#### 패키지 초기 설정
- [ ] `package.json`에 `"sideEffects": false` 추가
- [ ] `exports` 필드로 세부 경로 매핑 설정
- [ ] `typesVersions` 필드로 TypeScript 경로 지원
- [ ] `files` 필드로 배포 파일 제한
- [ ] `peerDependencies` 사용으로 의존성 최적화

#### 코드 구조 표준
- [ ] 메시지 상수에 에러 코드 범위별 주석 추가
- [ ] Response/Error 클래스에 `static readonly` 패턴 적용
- [ ] Exception 클래스에 `static factory method` 패턴 적용
- [ ] 코드 범위별 섹션 구분 주석 추가
- [ ] 타입 안전성을 위한 타입 내보내기 추가

#### 트리 쉐이킹 최적화
- [ ] 모든 export는 명시적으로 선언
- [ ] 사이드 이펙트 없는 순수 함수/상수만 포함
- [ ] 동적 import 사용 지양
- [ ] 패키지 레벨 re-export 최소화

## 주요 디자인 패턴

### 모듈형 아키텍처
- 각 패키지는 자체 exports, DTO, 인터페이스, 예외 처리를 가진 독립적인 구조
- 패키지들은 일관된 구조를 따름: `src/{codes,decorators,dtos,interfaces,messages,response,exception}`
- `@krgeobuk/*` 임포트를 위한 TypeScript 경로 매핑 설정

### NestJS 통합
- 검증, 변환, API 문서화를 위한 데코레이터 적극 활용
- 코어 패키지의 커스텀 가드, 인터셉터, 필터
- 일관된 오류 처리 및 응답 포맷팅

### 패키지 게시
- 개발 중 로컬 패키지 레지스트리로 Verdaccio 사용
- 각 패키지는 로컬 게시를 위한 `verdaccio:publish` 스크립트 보유
- `@krgeobuk` 네임스페이스로 스코프 설정

## 중요 참고사항

### ESM 및 TypeScript 설정
- **ESM 전용**: 모든 krgeobuk 프로젝트가 `"type": "module"`로 설정되어 CommonJS 대신 ES Modules 사용
- TypeScript 컴포지트 프로젝트 설정으로 효율적인 증분 빌드 가능
- ESLint 설정에는 임포트 순서와 NestJS 패턴을 위한 커스텀 규칙 포함

### 의존성 관리
- 대부분의 패키지는 NestJS, class-validator, class-transformer, TypeORM을 피어 의존성으로 사용
- 모든 패키지는 `http://localhost:4873/`의 로컬 Verdaccio 레지스트리에 게시됨
- 워크스페이스 내 패키지는 `workspace:*` 프로토콜로 상호 참조

### 1인 개발 환경 최적화
- 모든 krgeobuk 관련 프로젝트가 동일한 개발자에 의해 관리되므로 일관된 아키텍처와 코딩 스타일 유지
- 패키지 간 breaking change 시 동시 업데이트로 호환성 문제 최소화
- 로컬 레지스트리를 통한 빠른 반복 개발 및 테스트

## API 응답 포맷 통합

shared-lib는 krgeobuk 생태계 전반의 API 응답 포맷을 표준화합니다:

### 핵심 구현체
- **`@krgeobuk/core`** 패키지의 `SerializerInterceptor`: 성공 응답 포맷 처리
- **`@krgeobuk/core`** 패키지의 `HttpExceptionFilter`: 에러 응답 포맷 처리

상세한 API 응답 포맷 표준은 [authz-server/CLAUDE.md](../authz-server/CLAUDE.md)의 **"API 응답 포맷 표준"** 섹션을 참조하세요.