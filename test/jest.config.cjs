module.exports = {
  rootDir: __dirname,
  displayName: "end2end-tests",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testMatch: ["<rootDir>/**/*.test.ts"],
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          types: ["node", "jest"],
        },
      },
    ],
  },
};
