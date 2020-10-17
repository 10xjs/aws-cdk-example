module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },

  plugins: ['@typescript-eslint', 'import', 'promise', 'jest', 'tsdoc'],

  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:node/recommended',
    'plugin:promise/recommended',
  ],

  rules: {
    'node/no-unpublished-require': 'off',
  },

  overrides: [
    {
      files: ['*.ts'],

      parser: '@typescript-eslint/parser',

      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },

      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
      ],

      rules: {
        'tsdoc/syntax': 'error',
        'node/no-unsupported-features/es-syntax': 'off',
        // 'import/no-unresolved': 'off',
      },

      settings: {
        node: {
          tryExtensions: ['.js', '.ts'],
        },
      },
    },

    {
      files: [
        '*.test.ts',
        '*.test.js',
        '**/__mocks__/*.ts',
        '**/__mocks__/*.js',
      ],

      extends: ['plugin:jest/all'],
    },

    {
      files: ['src/**/*'],
      rules: {
        'node/no-unpublished-require': 'error',
      },
    },
  ],
};
