import js from '@eslint/js';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default [
  // ESLint 기본 추천 설정
  js.configs.recommended,

  // TypeScript ESLint 추천 설정들 (parser, plugin 자동 포함)
  ...typescriptEslint.configs.recommended,

  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.next/**'], // 기존 .eslintignore 대체
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        ecmaVersion: 'latest', // 최신 JS 문법을 지원
        sourceType: 'module',
      },
    },
    rules: {
      // @typescript-eslint 추천 룰 중 자주 쓰이는 예시
      '@typescript-eslint/no-unused-vars': ['warn'], // 경고만 표시 (NestJS에서는 함수에서 일부 인자를 안 쓰는 경우가 많음).
      '@typescript-eslint/explicit-function-return-type': 'error', // 함수 리턴 타입 명시 강제여부
      '@typescript-eslint/no-explicit-any': 'error', // any 타입 사용 가능여부
    },
  },
];
