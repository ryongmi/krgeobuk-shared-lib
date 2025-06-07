import base from './base.mjs';

export default {
  ...base,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};

// const base = require("./base.cjs");

// module.exports = {
//   ...base,
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest",
//   },
//   moduleNameMapper: {
//     "\\.(css|less|sass|scss)$": "identity-obj-proxy",
//   },
// };
