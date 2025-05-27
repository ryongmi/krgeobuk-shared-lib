// import globals from "globals";
// import tseslint from "@typescript-eslint/eslint-plugin";
// import tsParser from "@typescript-eslint/parser";
// import { something } from 'eslint';

// export default something([
//   {
//     ignores: ["dist", "node_modules"], // 기존 .eslintignore 대체
//   },
//   {
//     files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
//     languageOptions: {
//       parser: tsParser,
//       globals: {  ...globals.node },
//       parserOptions: {
//         ecmaVersion: 2020,
//         sourceType: "module",
//       },
//     },
//     plugins: {
//       "@typescript-eslint": tseslint,
//     },
//     rules: {      
//       // @typescript-eslint 추천 룰 중 자주 쓰이는 예시
//       "@typescript-eslint/no-unused-vars": ["warn"],
//       "@typescript-eslint/explicit-function-return-type": "off",
//       "@typescript-eslint/no-explicit-any": "off",
//     },
//     // extends: ["plugin:@typescript-eslint/recommended", "eslint:recommended"],
//   },
// ]);
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import typescriptEslint from "typescript-eslint";

export default [
  // ESLint 기본 추천 설정
  js.configs.recommended,
  
  // TypeScript ESLint 추천 설정들
  ...typescriptEslint.configs.recommended,
  
  {
    ignores: ["dist", "node_modules"], // 기존 .eslintignore 대체
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      parser: tsParser,
      globals: {  ...globals.node },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {      
      // @typescript-eslint 추천 룰 중 자주 쓰이는 예시
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];