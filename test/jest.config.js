import { resolve } from "path";
const root = resolve(__dirname);
module.exports = {
  rootDir: root,
  displayName: "end2end-tests",
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"],
  testMatch: ["<rootDir>/src/**/*.test.ts"],
};
