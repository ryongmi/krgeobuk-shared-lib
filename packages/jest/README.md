# @krgeobuk/jest-config

공통 Jest 테스트 설정 패키지입니다.  
Next.js, NestJS 등 다양한 프로젝트에서 일관된 테스트 환경을 쉽게 구성할 수 있습니다.

---

## 설치 방법

아래 패키지들은 **모두 개발 의존성(devDependencies)** 으로 설치하세요.

```sh
pnpm add -D jest ts-jest @types/jest typescript
```

> **참고**
> - `jest`, `ts-jest`, `@types/jest`, `typescript`는 테스트 및 타입스크립트 개발 환경에 필요한 패키지입니다.
> - 실제 서비스 코드에서 import하지 않으므로 반드시 `devDependencies`로 설치하세요.

---

### 프로젝트별 추가 설치 안내

#### Next.js 프로젝트

- CSS 모듈 mocking을 위해 `identity-obj-proxy`가 필요합니다.

```sh
pnpm add -D identity-obj-proxy
```

#### NestJS 프로젝트

- NestJS 공식 테스트 유틸리티인 `@nestjs/testing`이 필요합니다.

```sh
pnpm add -D @nestjs/testing
```

---

## 사용 방법

프로젝트 루트에 `jest.config.cjs` 파일을 생성하고 아래와 같이 확장해서 사용하세요.

### 기본(공통) 설정

```js
// jest.config.cjs
module.exports = require("@krgeobuk/jest-config");
```

### Next.js 프로젝트

```js
module.exports = require("@krgeobuk/jest-config/next");
```

### NestJS 프로젝트

```js
module.exports = require("@krgeobuk/jest-config/nest");
```

---

## 추가 안내

- 필요에 따라 프로젝트별로 Jest 설정을 추가로 오버라이드할 수 있습니다.
- Next.js 프로젝트에서는 `identity-obj-proxy`를 반드시 devDependencies로 설치하세요.
- NestJS 프로젝트에서는 `@nestjs/testing`을 devDependencies로 설치하세요.
- 테스트 커버리지, 경로 매핑 등은 각 프로젝트의 요구사항에 맞게 추가 설정할 수 있습니다.