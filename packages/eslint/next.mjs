import baseConfig from './base.mjs';
import prettier from 'eslint-config-prettier';
import next from 'eslint-plugin-next';
import globals from 'globals';

export default [
  ...baseConfig,
  next.configs.recommended, // Next.js 공식 권장 규칙 추가

  {
    ignores: ["dist", "node_modules", ".next"], // Next.js 빌드 폴더도 무시
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        React: "writable", // React 17+ 자동 JSX 런타임 지원
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error"], // 사용하지 않는 변수는 에러
      "no-console": "warn",                            // console.log는 경고
      "react/react-in-jsx-scope": "off",               // Next.js에서는 React import 불필요
      "react/jsx-key": "warn",                         // key props 경고로 알림
      "react/prop-types": "off",                       // TypeScript 사용 시 off 권장
      "react/display-name": "off"
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ...prettier, // 포맷 관련 규칙 제거하여 Prettier에 위임
  },
];

