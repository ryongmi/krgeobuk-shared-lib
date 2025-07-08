import prettier from 'eslint-config-prettier';

import baseConfig from './base.mjs';

export default [
  ...baseConfig, // base 설정들을 전개 연산자로 포함

  {
    files: ['**/*.ts'],
    rules: {
      // NestJS 프로젝트 특화 규칙 추가 또는 override
      'no-console': 'off', // console 사용 허용
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // underscore로 시작하는 매개변수 무시
          varsIgnorePattern: '^_', // underscore로 시작하는 변수 무시
          caughtErrorsIgnorePattern: '^_', // underscore로 시작하는 catch 오류 무시
        },
      ], // 경고 수준
      '@typescript-eslint/explicit-member-accessibility': 'off', // NestJS에서 접근제어자 명시 강제 해제
      '@typescript-eslint/no-empty-function': 'off', // 빈 함수 허용 (필요시)
      '@typescript-eslint/naming-convention': [
        'error',

        // ✅ 모든 interface는 PascalCase
        // 1. "I" 접두어 금지
        {
          selector: 'interface',
          format: ['PascalCase'],
          // ❌ "I"로 시작하는 인터페이스 금지 (선택 사항)
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },

        // ✅ 서비스 인터페이스는 반드시 "Interface"로 끝나야 함
        // 2. 이름에 "Service" 포함된 인터페이스는 반드시 Interface로 끝나야 함
        // {
        //   selector: 'interface',
        //   format: ['PascalCase'],
        //   custom: {
        //     regex: '^.*ServiceInterface$',
        //     match: true,
        //   },
        //   filter: {
        //     regex: 'Service',
        //     match: true,
        //   },
        // },

        // 3. Service 미포함 인터페이스는 Interface로 끝나면 안 됨 PascalCase만 허용 (명사형)
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: 'Interface$',
            match: false,
          },
          filter: {
            regex: 'Service',
            match: false,
          },
        },
      ],

      // ✅ import 순서 규칙
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: 'node:*',
              group: 'builtin',
            },
            {
              pattern: '@nestjs/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@krgeobuk/**', // 내부 공통 패키지로 처리
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@**', // 기타 모든 alias
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            // order: 'asc',
            order: 'ignore',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  },

  {
    files: ['**/*.{ts,js}'],
    // prettier는 마지막에 넣기
    ...prettier,
  },
];
