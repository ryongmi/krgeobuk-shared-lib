// import baseConfig from './base.mjs';
// // import tseslint from 'typescript-eslint';
// import prettier from 'eslint-config-prettier';

// const base = baseConfig[0];

// export default [
//   base, // base 설정 포함 (ignores, parser, plugins, etc.)

//   {
//     files: ['**/*.ts'],
//     rules: {
//       ...base.rules,
//       // NestJS 프로젝트 특화 규칙 추가 또는 override
//       // '@typescript-eslint/no-explicit-any': 'warn',
//       // 'no-console': 'warn',
//       // NestJS 프로젝트에 맞춘 추가 룰을 여기에 적음
//       "@typescript-eslint/no-unused-vars": ["error"],
//       // 예: NestJS에서 console 사용 금지하려면 "no-console": "error" 추가 가능
//       "no-console": "off",
//     },
//   },

//   {
//     files: ['**/*.{ts,js}'],
//     // prettier는 마지막에 넣기
//     ...prettier,
//   },

//   // 필요한 경우 추가 권장 설정
//   // ...tseslint.configs.recommended,

//   // // prettier는 항상 마지막에
//   // prettier,
// ];


import baseConfig from './base.mjs';
import prettier from 'eslint-config-prettier';

export default [
  ...baseConfig, // base 설정들을 전개 연산자로 포함

  {
    files: ['**/*.ts'],
    rules: {
      // NestJS 프로젝트 특화 규칙 추가 또는 override
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/explicit-function-return-type": "error",  // 함수 리턴 타입 명시를 강제여부
      "@typescript-eslint/no-explicit-any": "error",                // any 타입 사용 가능여부
    },
  },

  {
    files: ['**/*.{ts,js}'],
    // prettier는 마지막에 넣기
    ...prettier,
  },
];