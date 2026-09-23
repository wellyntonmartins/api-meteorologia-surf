module.exports = {
  rootDir: __dirname,
  displayName: "end2end-tests",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testMatch: ["<rootDir>/**/*.test.ts"],
};