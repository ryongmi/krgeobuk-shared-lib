import base from './base.mjs';

export default {
  ...base,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};

// const base = require("./base.cjs");

// module.exports = {
//   ...base,
//   preset: "ts-jest",
//   testEnvironment: "node",
//   moduleFileExtensions: ["ts", "js", "json", "node"],
// };
