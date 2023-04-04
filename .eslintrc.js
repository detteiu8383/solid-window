// @ts-check
const { defineConfig } = require("eslint-define-config"); // eslint-disable-line

module.exports = defineConfig({
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:sort/recommended",
    "plugin:import/recommended", // eslint-plugin-import
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import", "sort", "unused-imports"],
  root: true,
  rules: {
    "@typescript-eslint/consistent-type-imports": ["error"],
    "@typescript-eslint/no-unused-vars": "off",
    "import/order": [
      "error",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        "newlines-between": "always",
      },
    ],
    "sort/imports": ["off"],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        vars: "all",
        varsIgnorePattern: "^_",
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "packages/*/tsconfig.json",
      },
    },
  },
});
