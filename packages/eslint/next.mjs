import baseConfig from './base.mjs';
import prettier from 'eslint-config-prettier';

export default [
  ...baseConfig,

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error"], // 사용하지 않는 변수는 에러
      "no-console": "warn",                            // console.log는 경고
      "react/react-in-jsx-scope": "off",               // Next.js에서는 React import 불필요
      "react/jsx-key": "warn",                         // key props 경고로 알림
    },
  },

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ...prettier, // 포맷 관련 규칙 제거하여 Prettier에 위임
  },
];

