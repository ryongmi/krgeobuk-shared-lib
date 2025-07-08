# CLAUDE.md

이 파일은 이 저장소에서 코드 작업을 할 때 Claude Code (claude.ai/code)에게 지침을 제공합니다.

## 저장소 개요

이 저장소는 krgeobuk 서비스용 공유 라이브러리를 포함하는 TypeScript 모노레포입니다. 1인 개발 환경에서 모든 krgeobuk 프로젝트가 ESM 형식으로 통일되어 구성됩니다. 다음 기술들을 사용합니다:
- **PNPM** - 워크스페이스를 사용한 패키지 관리
- **TypeScript** - 컴포지트 프로젝트 설정
- **ESM (ES Modules)** - 모든 패키지가 ESM 형태로 구성
- **ESLint** - 커스텀 설정을 통한 린팅
- **Verdaccio** - 로컬 패키지 레지스트리
- **NestJS** - 대부분 패키지의 주요 프레임워크

## 주요 명령어

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

## 아키텍처 개요

### 패키지 구조
저장소는 도메인별로 구성된 12개의 주요 패키지를 포함합니다:

**핵심 인프라:**
- `@krgeobuk/core` - 기본 클래스, 데코레이터, DTO, 엔터티, 필터, 인터셉터, 유틸리티
- `@krgeobuk/database` - TypeORM 및 Redis 설정 모듈
- `@krgeobuk/shared` - 패키지 간 공유되는 공통 DTO와 인터페이스

**인증 및 권한:**
- `@krgeobuk/auth` - 인증 로직, DTO, 예외 처리
- `@krgeobuk/jwt` - JWT 토큰 처리, 가드, 데코레이터
- `@krgeobuk/oauth` - OAuth 제공자(Google, Naver) 및 토큰 관리
- `@krgeobuk/user` - 사용자 관리 기능
- `@krgeobuk/role` - 역할 기반 접근 제어
- `@krgeobuk/service` - 서비스 등록 및 관리

**문서화 및 도구:**
- `@krgeobuk/swagger` - OpenAPI/Swagger 설정 및 데코레이터
- `@krgeobuk/eslint-config` - ESLint 설정 (base, nest, next)
- `@krgeobuk/tsconfig` - TypeScript 설정 (base, nest, next)
- `@krgeobuk/jest-config` - Jest 테스트 설정

### 주요 디자인 패턴

**모듈형 아키텍처:**
- 각 패키지는 자체 exports, DTO, 인터페이스, 예외 처리를 가진 독립적인 구조
- 패키지들은 일관된 구조를 따름: `src/{codes,decorators,dtos,interfaces,messages,response,exception}`
- `@krgeobuk/*` 임포트를 위한 TypeScript 경로 매핑 설정

**NestJS 통합:**
- 검증, 변환, API 문서화를 위한 데코레이터 적극 활용
- 코어 패키지의 커스텀 가드, 인터셉터, 필터
- 일관된 오류 처리 및 응답 포맷팅

**패키지 게시:**
- 개발 중 로컬 패키지 레지스트리로 Verdaccio 사용
- 각 패키지는 로컬 게시를 위한 `verdaccio:publish` 스크립트 보유
- `@krgeobuk` 네임스페이스로 스코프 설정

### 개발 워크플로우

1. **로컬 개발**: `pnpm docker:up`으로 Verdaccio 레지스트리 시작
2. **빌드**: `pnpm build`로 TypeScript 프로젝트 참조를 사용하여 모든 패키지 컴파일
3. **린팅**: `pnpm lint:fix`로 코드 품질 유지
4. **테스트**: 루트 레벨 테스트 명령어 없음 - 개별 패키지 README에서 테스트 지침 확인
5. **게시**: 로컬 테스트를 위해 패키지 디렉토리에서 `pnpm verdaccio:publish` 사용

### 중요 참고사항

- **1인 개발 환경**: 모든 krgeobuk 관련 프로젝트가 동일한 개발자에 의해 관리되므로 일관된 아키텍처와 코딩 스타일 유지
- 모든 패키지는 `http://localhost:4873/`의 로컬 Verdaccio 레지스트리에 게시됨
- **ESM 전용**: 모든 krgeobuk 프로젝트가 `"type": "module"`로 설정되어 CommonJS 대신 ES Modules 사용
- TypeScript 컴포지트 프로젝트 설정으로 효율적인 증분 빌드 가능
- ESLint 설정에는 임포트 순서와 NestJS 패턴을 위한 커스텀 규칙 포함
- 대부분의 패키지는 NestJS, class-validator, class-transformer, TypeORM을 피어 의존성으로 사용