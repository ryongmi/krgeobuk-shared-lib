# @krgeobuk/eslint-config

공통 ESLint 설정 패키지입니다.  
Next.js, NestJS 등 다양한 프로젝트에서 일관된 코드 스타일을 적용할 수 있습니다.

---

## 설치 방법

아래 패키지들은 **모두 개발 의존성(devDependencies)** 으로 설치하세요.

### 공통(필수)

```sh
pnpm add -D eslint @eslint/js typescript typescript-eslint eslint-config-prettier globals
```

### Next.js 프로젝트 전용

```sh
pnpm add -D eslint-plugin-react @next/eslint-plugin-next
# pnpm add -D eslint-plugin-next eslint-plugin-react
```

### NestJS 프로젝트 전용

```sh
# (NestJS 전용 추가 패키지는 없습니다. 공통 패키지만 설치하면 됩니다.)
```

> **참고**
>
> - Next.js 프로젝트는 반드시 `eslint-plugin-next`, `eslint-plugin-react`를 추가로 설치해야 합니다.
> - NestJS 프로젝트는 공통 패키지만 설치하면 충분합니다.
> - 실제 서비스 코드에서 import하지 않으므로 반드시 `devDependencies`로 설치하세요.

---

## 설정별 주요 내용

### base.mjs

- **ESLint 기본 추천 규칙**과 **TypeScript ESLint 추천 규칙**을 모두 포함합니다.
- `globals.node`를 적용하여 Node.js 환경 전역 변수 지원.
- `ecmaVersion: "latest"`, `sourceType: "module"`로 최신 JS 문법 지원.
- ignores: `dist`, `node_modules` (빌드 산출물 및 의존성 폴더 무시)
- 주요 규칙:
  - `@typescript-eslint/no-unused-vars`: `"warn"` (NestJS 등에서 일부 인자 미사용 허용)
  - `@typescript-eslint/explicit-function-return-type`: `"error"` (함수 리턴 타입 명시 강제)
  - `@typescript-eslint/no-explicit-any`: `"error"` (any 타입 사용 금지)

### nest.mjs

- base 설정을 모두 포함합니다.
- NestJS 프로젝트 특화 규칙:
  - `no-console`: `"off"` (console 사용 허용)
  - `@typescript-eslint/no-unused-vars`: `"warn"` (경고 수준)
- 마지막에 `eslint-config-prettier`를 적용하여 포맷 관련 규칙을 Prettier에 위임.

### next.mjs

- base 설정을 모두 포함합니다.
- Next.js 공식 권장 규칙(`eslint-plugin-next`)을 추가합니다.
- 주요 규칙:
  - `@typescript-eslint/no-unused-vars`: `"error"` (사용하지 않는 변수는 에러)
  - `no-console`: `"warn"` (console.log는 경고)
  - `react/react-in-jsx-scope`: `"off"` (Next.js에서는 React import 불필요)
  - `react/jsx-key`: `"warn"` (key props 누락 경고)
  - `react/prop-types`: `"off"` (TypeScript 사용 시 off 권장)
  - `react/display-name`: `"off"`
- 마지막에 `eslint-config-prettier`를 적용하여 포맷 관련 규칙을 Prettier에 위임.

---

## 사용 방법

프로젝트의 설정 파일에서 아래와 같이 확장해서 사용하세요.

### `.eslintrc.js` 또는 `.eslintrc.json` 사용 시

#### 기본(공통) 설정

```js
module.exports = {
  extends: ['@krgeobuk/eslint-config'],
};
```

#### Next.js 프로젝트

```js
module.exports = {
  extends: ['@krgeobuk/eslint-config/next'],
};
```

#### NestJS 프로젝트

```js
module.exports = {
  extends: ['@krgeobuk/eslint-config/nest'],
};
```

---

### `eslint.config.mjs`(Flat Config) 사용 시

#### 기본(공통) 설정

```js
import krgeobuk from '@krgeobuk/eslint-config';
export default [...krgeobuk];
```

#### Next.js 프로젝트

```js
import krgeobukNext from '@krgeobuk/eslint-config/next';
export default [...krgeobukNext];
```

#### NestJS 프로젝트

```js
import krgeobukNest from '@krgeobuk/eslint-config/nest';
export default [...krgeobukNest];
```

---

## 추가 안내

- 필요에 따라 프로젝트별로 `rules`를 추가로 오버라이드할 수 있습니다.
- prettier와 함께 사용할 경우, `.prettierrc` 파일도 함께 관리하세요.

---

## Prettier 설정 예시

프로젝트 루트에 `.prettierrc` 파일을 생성하고 아래와 같이 작성하세요.

```json
{
  "semi": true, // 모든 구문 끝에 세미콜론(;)을 붙입니다.
  "singleQuote": true, // 문자열에 홑따옴표(')를 사용합니다.
  "printWidth": 100, // 한 줄 최대 길이를 100자로 제한합니다.
  "tabWidth": 2, // 들여쓰기는 스페이스 2칸입니다.
  "trailingComma": "es5", // ES5에서 허용하는 곳(객체, 배열 등)에만 후행 콤마를 추가합니다.
  "arrowParens": "always", // 화살표 함수의 매개변수에 항상 괄호를 사용합니다.
  "endOfLine": "crlf", // 줄바꿈 문자를 CRLF(Windows 스타일)로 강제합니다.
  "bracketSpacing": true, // 객체 리터럴 중괄호 내부에 공백을 추가합니다. { foo: bar }
  "jsxSingleQuote": true, // JSX에서 홑따옴표(')를 사용합니다.
  "proseWrap": "preserve", // 마크다운에서 자동 줄바꿈을 보존합니다.
  "quoteProps": "as-needed" // 객체 속성에 필요한 경우에만 따옴표를 사용합니다.
}
```

> **참고**
>
> - `semi`: 구문 끝에 세미콜론(;)을 붙일지 여부를 지정합니다.
>   - `true`: 항상 세미콜론 사용
>   - `false`: 세미콜론 사용하지 않음
> - `singleQuote`: 문자열에 사용할 따옴표 스타일을 지정합니다.
>   - `true`: 홑따옴표(') 사용
>   - `false`: 쌍따옴표(") 사용
> - `printWidth`: 한 줄 최대 길이를 지정합니다. (숫자, 예: 80, 100 등)
> - `tabWidth`: 들여쓰기 시 사용할 스페이스 개수를 지정합니다. (숫자, 예: 2, 4 등)
> - `trailingComma`: 후행 콤마를 어디에 추가할지 지정합니다.
>   - `"none"`: 후행 콤마를 추가하지 않음
>   - `"es5"`: ES5에서 허용하는 곳(객체, 배열 등)에만 후행 콤마 추가 (권장)
>   - `"all"`: 가능한 모든 곳에 후행 콤마 추가
> - `arrowParens`: 화살표 함수 매개변수 괄호 사용 방식을 지정합니다.
>   - `"always"`: 항상 괄호 사용 (예: `(x) => x`)
>   - `"avoid"`: 매개변수가 하나일 때 괄호 생략 (예: `x => x`)
> - `endOfLine`: 줄바꿈 문자 스타일을 지정합니다.
>   - `"auto"`: 운영체제에 따라 자동 결정 (여러 OS에서 협업 시 권장)
>   - `"lf"`: LF(`\n`, 유닉스/리눅스/macOS 스타일)
>   - `"crlf"`: CRLF(`\r\n`, Windows 스타일)
>   - `"cr"`: CR(`\r`, 매우 오래된 Mac 스타일, 거의 사용하지 않음)
> - `bracketSpacing`: 객체 리터럴 중괄호 내부에 공백을 추가할지 지정합니다.
>   - `true`: `{ foo: bar }`
>   - `false`: `{foo: bar}`
> - `jsxSingleQuote`: JSX에서 홑따옴표 사용 여부를 지정합니다.
>   - `true`: `<div className='foo'>`
>   - `false`: `<div className="foo">`
> - `proseWrap`: 마크다운에서 자동 줄바꿈 처리 방식을 지정합니다.
>   - `"always"`: 항상 줄바꿈
>   - `"never"`: 줄바꿈 하지 않음
>   - `"preserve"`: 원본 유지(기본값)
> - `quoteProps`: 객체 속성에 따옴표 사용 방식을 지정합니다.
>   - `"as-needed"`: 필요한 경우만 따옴표 사용(기본값)
>   - `"consistent"`: 하나라도 따옴표가 있으면 모두 따옴표 사용
>   - `"preserve"`: 입력된 대로 유지

---

## Prettier 사용 방법

아래 명령어로 코드 포맷팅을 실행할 수 있습니다.

```sh
pnpm prettier --write .
```

---

### VS Code 확장 프로그램 자동 포맷팅 안내

- VS Code에서 **Prettier - Code formatter** 확장 프로그램을 설치하세요.
- `settings.json`에 아래 옵션을 추가하면 저장 시 자동으로 포맷팅됩니다.

```jsonc
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
}
```

> 저장 시 자동 포맷팅이 적용되어 코드 스타일을 일관되게 유지할 수 있습니다.
