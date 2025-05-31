import baseConfig from './base.mjs';
import prettier from 'eslint-config-prettier';

export default [
  ...baseConfig, // base 설정들을 전개 연산자로 포함

  {
    files: ['**/*.ts'],
    rules: {
      // NestJS 프로젝트 특화 규칙 추가 또는 override
      "no-console": "off", // console 사용은 허용하되 경고 표시
      "@typescript-eslint/no-unused-vars": ["warn"], // 경고 수준 → 에러로 상향
    },
  },

  {
    files: ['**/*.{ts,js}'],
    // prettier는 마지막에 넣기
    ...prettier,
  },
];