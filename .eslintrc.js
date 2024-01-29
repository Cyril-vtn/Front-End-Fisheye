module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-undef": "off", // disable  '... is not defined' because the function is used in another files
    "no-useless-escape": "off", // disable uselless escape to avoid error when using regex in modal.js
    "no-unused-vars": [
      "error",
      { vars: "local", args: "after-used", ignoreRestSiblings: false }, // disable the error  '... is defined but never used.' because of fatory pattern, it's used in other files.
    ],
  },
};
