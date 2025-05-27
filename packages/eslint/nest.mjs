import baseConfig from "./base.mjs";

export default {
  ...baseConfig,
  rules: {
    ...baseConfig[0].rules,
    // NestJS 전용 룰 추가 가능
  },
};
