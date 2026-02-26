# krgeobuk-shared-lib

krgeobuk 생태계의 모든 서비스에서 공유하는 TypeScript 패키지 모노레포입니다.
pnpm 워크스페이스로 23개 패키지를 관리하며, Verdaccio 로컬 레지스트리를 통해 배포합니다.

## 기술 스택

- **pnpm** - 워크스페이스 패키지 관리
- **TypeScript 5.8.3** - 컴포지트 프로젝트 설정 (증분 빌드)
- **ESM** - 모든 패키지 ES Modules 전용 (`"type": "module"`)
- **Verdaccio** - 로컬 프라이빗 NPM 레지스트리 (포트 4873)
- **NestJS 10** - 백엔드 패키지의 주요 프레임워크

---

## 패키지 목록

### 핵심 인프라

| 패키지 | 설명 |
|---|---|
| `@krgeobuk/core` | 기본 클래스, 데코레이터, 필터, 인터셉터, BaseEntity, BaseRepository |
| `@krgeobuk/database-config` | TypeORM 및 Redis(ioredis) 설정 모듈 |
| `@krgeobuk/swagger` | OpenAPI/Swagger 설정 및 데코레이터 |
| `@krgeobuk/shared` | 도메인 간 공유 DTO 및 인터페이스 (단일 진실 공급원) |

### 설정 프리셋

| 패키지 | 설명 |
|---|---|
| `@krgeobuk/tsconfig` | TypeScript 설정 (base / nest / next) |
| `@krgeobuk/eslint-config` | ESLint 설정 (base / nest / next) |
| `@krgeobuk/jest-config` | Jest 테스트 설정 (base / nest / next) |

### 인증

| 패키지 | 설명 |
|---|---|
| `@krgeobuk/jwt` | JWT 토큰 관리, 가드, 데코레이터 |
| `@krgeobuk/auth` | 인증 DTO (로그인, 회원가입, 토큰 갱신), 예외 처리 |
| `@krgeobuk/oauth` | OAuth 제공자 (Google, Naver), TCP 인터페이스 |

### 도메인 (TCP 인터페이스 포함)

| 패키지 | 설명 |
|---|---|
| `@krgeobuk/user` | 사용자 관리 DTO, 예외, TCP 인터페이스 |
| `@krgeobuk/role` | 역할(RBAC) DTO, 예외, TCP 인터페이스 |
| `@krgeobuk/permission` | 권한 DTO, 예외, TCP 인터페이스 |
| `@krgeobuk/service` | 서비스 레지스트리 DTO, 예외, TCP 인터페이스 |
| `@krgeobuk/authorization` | 인가 가드, 코드, 데코레이터, TCP 인터페이스 |
| `@krgeobuk/role-permission` | 역할-권한 매핑 DTO, TCP 인터페이스 |
| `@krgeobuk/user-role` | 사용자-역할 매핑 DTO, TCP 인터페이스 |
| `@krgeobuk/service-visible-role` | 서비스-역할 가시성 DTO, TCP 인터페이스 |
| `@krgeobuk/account-merge` | 계정 병합 사가 워크플로우, TCP 인터페이스 |

### 유틸리티

| 패키지 | 설명 |
|---|---|
| `@krgeobuk/http-client` | JWT 지원 보안 HTTP 클라이언트 (axios 기반) |
| `@krgeobuk/email` | 이메일 서비스 (Nodemailer + Handlebars 템플릿) |
| `@krgeobuk/msa-commons` | MSA 공통 유틸리티 (strategies, aggregators) |
| `@krgeobuk/saga` | Saga 오케스트레이션 패턴 (재시도, 보상 트랜잭션) |

---

## 개발 워크플로우

### 1. Verdaccio 레지스트리 시작

```bash
pnpm docker:up
```

로컬 레지스트리(`http://localhost:4873`)가 실행됩니다.
서비스에서 `@krgeobuk/*` 패키지를 설치하려면 반드시 실행 중이어야 합니다.

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 전체 빌드

```bash
pnpm build
```

TypeScript 컴포지트 프로젝트로 의존성 순서에 맞게 자동 빌드됩니다.

### 4. 로컬 레지스트리에 게시

변경된 패키지 디렉토리에서 실행합니다.

```bash
# 특정 패키지 게시
cd packages/core
pnpm verdaccio:publish

# 특정 패키지만 빌드 후 게시
pnpm --filter @krgeobuk/core build
cd packages/core && pnpm verdaccio:publish
```

### 5. 서비스에 반영

패키지를 게시한 후 대상 서비스에서 업데이트합니다.

```bash
# 서비스 디렉토리에서
npm update @krgeobuk/core
```

---

## 명령어 정리

```bash
# 전체 빌드
pnpm build

# 빌드 아티팩트 정리
pnpm clean

# 특정 패키지만 빌드
pnpm --filter @krgeobuk/{패키지명} build

# 린팅
pnpm lint
pnpm lint:fix

# 포맷팅
pnpm format

# Verdaccio 레지스트리 시작/중지
pnpm docker:up
pnpm docker:down
```

---

## 서비스에서 패키지 사용

### 레지스트리 설정

서비스 프로젝트 루트의 `.npmrc`에 추가합니다.

```
@krgeobuk:registry=http://localhost:4873
```

또는 K8s Verdaccio를 사용하는 경우:

```
# dev
@krgeobuk:registry=http://verdaccio.192.168.0.28.nip.io

# prod
@krgeobuk:registry=https://verdaccio.krgeobuk.com
```

### 패키지 설치

```bash
npm install @krgeobuk/core @krgeobuk/jwt @krgeobuk/auth
```

### Import 패턴

각 패키지는 직접 임포트와 경로 기반 임포트를 모두 지원합니다.

```typescript
// 전체 임포트
import { BaseEntity, HttpExceptionFilter } from '@krgeobuk/core';

// 경로 기반 임포트 (트리 쉐이킹 최적화)
import { BaseEntity } from '@krgeobuk/core/entities';
import { HttpExceptionFilter } from '@krgeobuk/core/filters';

// TCP 패턴 상수
import { RoleTcpPatterns } from '@krgeobuk/role/tcp/patterns';

// TCP 인터페이스
import type { TcpRoleParams } from '@krgeobuk/role/tcp/interfaces';
```

### 주요 사용 예시

**NestJS 서비스 공통 설정:**
```typescript
import { SerializeInterceptor, HttpExceptionFilter } from '@krgeobuk/core';
import { DatabaseConfigModule } from '@krgeobuk/database-config';
import { SwaggerConfig } from '@krgeobuk/swagger';
```

**TCP 마이크로서비스 통신:**
```typescript
import { RoleTcpPatterns } from '@krgeobuk/role/tcp/patterns';
import type { TcpRoleParams } from '@krgeobuk/role/tcp/interfaces';

@MessagePattern(RoleTcpPatterns.FIND_BY_ID)
async findById(@Payload() data: TcpRoleParams) { ... }
```

**설정 프리셋 (tsconfig.json):**
```json
{
  "extends": "@krgeobuk/tsconfig/nest.json"
}
```

**설정 프리셋 (eslint.config.mjs):**
```js
import nestConfig from '@krgeobuk/eslint-config/nest.mjs';
export default [...nestConfig];
```

---

## 패키지 업데이트 순서

```
코드 변경
    ↓
버전 업데이트 (package.json)
    ↓
pnpm build
    ↓
pnpm lint:fix
    ↓
pnpm verdaccio:publish  ← 패키지 디렉토리에서
    ↓
서비스에서 npm update @krgeobuk/{패키지명}
```

---

## 새 패키지 추가

패키지 구조 표준 및 package.json 설정(`exports`, `typesVersions`, `sideEffects` 등) 상세 내용은 [CLAUDE.md](./CLAUDE.md)를 참조하세요.

```
packages/{new-package}/
├── src/
│   ├── dtos/
│   ├── interfaces/
│   ├── exception/
│   ├── response/
│   └── index.ts
├── package.json
└── tsconfig.json
```

`pnpm-workspace.yaml`은 `packages/*` 글로브로 자동 인식하므로 별도 수정 불필요합니다.

---

## 주의사항

- `dist/` 디렉토리는 Git에 커밋하지 않습니다.
- 패키지를 게시하기 전에 반드시 `pnpm build`로 빌드합니다.
- 워크스페이스 내 패키지 간 참조는 `workspace:*` 프로토콜을 사용합니다.
- 외부 프레임워크(NestJS, class-validator 등)는 `peerDependencies`로 선언합니다.
