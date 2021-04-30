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
    "arrow-body-style": "off",
    "import/prefer-default-export": "off",
    "padded-blocks": "off",
    "no-underscore-dangle": "off",
    "import/no-cycle": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/comma-dangle": "off",
  },
};
