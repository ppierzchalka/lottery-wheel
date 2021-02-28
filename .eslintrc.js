module.exports = {
  env: {
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: ["airbnb-typescript/base"],
  ignorePatterns: ["dist/*"],
  rules: {
    "arrow-body-style": ["error", "always"],
    "import/prefer-default-export": "off",
    "no-console": "off",
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": "off",
  },
};
