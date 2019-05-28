// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  settings: {
    react: {
      version: "detect"
    },
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    }
  },
  rules: {
    "generator-star-spacing": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "semi": ["error", "always"],
    "indent": ["error", 2],
    "keyword-spacing": "error",
    "space-before-blocks": "error",
    "no-trailing-spaces": "error",
    "comma-spacing": "error",
    "key-spacing": "error",
    "spaced-comment": "error",
    "no-multi-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "quotes": ["error", 'single'],
    "comma-dangle": ["error"],
    "react/no-string-refs": 0
  }
}