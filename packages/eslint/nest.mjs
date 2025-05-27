import baseConfig from './base.mjs';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  ...baseConfig, // base 설정 포함

  {
    files: ['**/*.ts'],
    rules: {
      ...baseConfig[0].rules,
      // NestJS 프로젝트 특화 규칙 추가 또는 override
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
    },
  },

  // 필요한 경우 추가 권장 설정
  ...tseslint.configs.recommended,

  // prettier는 항상 마지막에
  prettier,
];

