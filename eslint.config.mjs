// import js from '@eslint/js';
// import globals from "globals";
// import tseslint from "@typescript-eslint/eslint-plugin";
// import tsParser from "@typescript-eslint/parser";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   {
//     files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
//     languageOptions: {
//       parser: tsParser,
//       globals: { ...globals.browser, ...globals.node },
//       parserOptions: {
//         ecmaVersion: 2020,
//         sourceType: "module",
//       },
//     },
//     plugins: {
//       "@typescript-eslint": tseslint,
//     },
//     rules: {
//       // 원하는 룰을 여기 추가하세요.
//       // 예시:
//       "@typescript-eslint/no-unused-vars": ["warn"],
//       "no-console": "off",
//     },
//     extends: ["plugin:@typescript-eslint/recommended", "eslint:recommended"],
//   },
// ]);
// import config from "@krgeobuk/eslint-config/nest";
import config from './packages/eslint/nest.mjs';

export default config;
