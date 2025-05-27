import baseConfig from "./base.mjs";
import globals from "globals";

export default {
  ...baseConfig,
  languageOptions: {
    ...baseConfig[0].languageOptions,
    globals: { ...baseConfig[0].languageOptions.globals, ...globals.browser },
  },
  extends: [
    ...baseConfig[0].extends,
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "next/core-web-vitals",
  ],
  rules: {
    ...baseConfig[0].rules,
    // NextJS 전용 룰 추가 가능
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
