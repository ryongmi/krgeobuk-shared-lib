import { FlatCompat } from '@eslint/eslintrc';
import { fixupPluginRules } from '@eslint/compat';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import react from 'eslint-plugin-react';

import baseConfig from './base.mjs';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  ...baseConfig,
  
  // Next.js ESLint 권장 규칙 (FlatCompat으로 변환 + ESLint 9 호환성 수정)
  ...compat.config({
    extends: ['plugin:@next/next/recommended'],
  }).map(config => ({
    ...config,
    plugins: config.plugins ? 
      Object.fromEntries(
        Object.entries(config.plugins).map(([name, plugin]) => [
          name, 
          name.includes('next') ? fixupPluginRules(plugin) : plugin
        ])
      ) : config.plugins
  })),

  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      react: react,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        React: 'writable', // React 17+ 자동 JSX 런타임 지원
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // underscore로 시작하는 매개변수 무시
          varsIgnorePattern: '^_', // underscore로 시작하는 변수 무시
          caughtErrorsIgnorePattern: '^_', // underscore로 시작하는 catch 오류 무시
        },
      ], // 사용하지 않는 변수는 에러
      'no-console': 'warn', // console.log는 경고
      'react/react-in-jsx-scope': 'off', // Next.js에서는 React import 불필요
      'react/jsx-key': 'warn', // key props 경고로 알림
      'react/prop-types': 'off', // TypeScript 사용 시 off 권장
      'react/display-name': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ...prettier, // 포맷 관련 규칙 제거하여 Prettier에 위임
  },
];
