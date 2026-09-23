/* eslint-disable @typescript-eslint/no-require-imports */
const js = require("@eslint/js");
const globals = require("globals");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.js", "**/*.mjs", "**/*.ts", "**/*.cjs"],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      semi: ["error", "always"],
      "prefer-const": "error",
    },
  },
);