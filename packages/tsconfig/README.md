# @krgeobuk/tsconfig

공통 TypeScript 설정 패키지입니다.  
Next.js, NestJS 등 다양한 프로젝트에서 일관된 TypeScript 환경을 쉽게 구성할 수 있습니다.

---

## 설치 방법

### krgeobuk 패키지 설치

```sh
pnpm add -D @krgeobuk/tsconfig
```

### Peer Dependencies

이 패키지는 TypeScript 설정 파일만 제공하므로 별도의 peer dependencies가 없습니다. 

> **참고**
> - TypeScript 설정 파일만 제공하므로 런타임 의존성이 없습니다.
> - 프로젝트에서 TypeScript를 사용한다면 `typescript`는 별도로 설치해야 합니다.

---

## 사용 방법

각 프로젝트의 `tsconfig.json`에서 아래와 같이 확장해서 사용하세요.

### Next.js 프로젝트

```json
{
  "extends": "@krgeobuk/tsconfig/next.json",
  "compilerOptions": {
    // 프로젝트별 추가 옵션
  },
  "include": ["src"]
}
```

### NestJS 프로젝트

```json
{
  "extends": "@krgeobuk/tsconfig/nest.json",
  "compilerOptions": {
    // 프로젝트별 추가 옵션
  },
  "include": ["src"]
}
```

### 공통(기본) 설정

```json
{
  "extends": "@krgeobuk/tsconfig/base.json",
  "compilerOptions": {
    // 프로젝트별 추가 옵션
  },
  "include": ["src"]
}
```

---

## 추가 안내

- 필요에 따라 각 프로젝트의 `compilerOptions`에서 옵션을 오버라이드할 수 있습니다.
- `include`, `exclude`, `paths` 등은 프로젝트 구조에 맞게 자유롭게 설정하세요.
- 모노레포 환경에서는 각 패키지별로 위와 같이 `extends`를 활용하면, 전체 레포지토리의 TypeScript 설정을 일관되게 유지할 수 있습니다.

---

## 예시: Next.js에서 경로 별칭 사용

```json
{
  "extends": "@krgeobuk/tsconfig/next.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@krgeobuk/core": ["../core/src"]
    }
  },
  "include": ["src"]
}
```

---

> 궁금한 점이나 추가 설정이 필요하다면 언제든 README를 참고하거나 문의해 주세요!