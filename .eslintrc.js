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
    "import/prefer-default-export": "off",
  },
};