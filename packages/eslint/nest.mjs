import baseConfig from './base.mjs';
import prettier from 'eslint-config-prettier';

export default [
  ...baseConfig, // base 설정들을 전개 연산자로 포함

  {
    files: ['**/*.ts'],
    rules: {
      // NestJS 프로젝트 특화 규칙 추가 또는 override
      "no-console": "off", // console 사용 허용
      "@typescript-eslint/no-unused-vars": ["warn"], // 경고 수준
      "@typescript-eslint/explicit-member-accessibility": "off", // NestJS에서 접근제어자 명시 강제 해제
      "@typescript-eslint/no-empty-function": "off", // 빈 함수 허용 (필요시)
    },
  },

  {
    files: ['**/*.{ts,js}'],
    // prettier는 마지막에 넣기
    ...prettier,
  },
];