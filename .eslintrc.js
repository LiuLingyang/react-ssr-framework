module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-no-undef': [
      2,
      {
        allowGlobals: true
      }
    ],
    'no-unused-vars': ['off'],
    'no-undef': ['off'],
    'no-case-declarations': ['off'],
    'no-empty': ['off'],
    'react/display-name': ['off'],
    'react/prop-types': ['off'],
    'no-useless-escape': ['off'],
    'no-console': ['off']
  },
  settings: {
    react: {
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect' // React version. "detect" automatically picks the version you have installed.
    }
  },
  overrides: [
    {
      files: ['src/**/*.js'],
      parser: 'babel-eslint',
      rules: {}
    }
  ]
};
