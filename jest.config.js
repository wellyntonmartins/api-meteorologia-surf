import { resolve } from "path";
const root = resolve(__dirname);
module.exports = {
  rootDir: root,
  displayName: "root-tests",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  testEnvoironment: "node",
  clearMocks: true,
  preset: "ts-jest",
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "@test/(.*)": "<rootDir>/test/$1",
  },
};
