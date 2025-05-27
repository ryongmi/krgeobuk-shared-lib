import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import tsRecommended from "@typescript-eslint/eslint-plugin/dist/configs/recommended.js";

export default [
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
      "@typescript-eslint/no-unused-vars": ["warn"],
      "no-console": "off",
    },
    // 직접 배열로 확장 config 포함
    ...tsRecommended,
    // extends: ["plugin:@typescript-eslint/recommended", "eslint:recommended"],
  },
];
