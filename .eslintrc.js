import * as path from 'path';

module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: path.join(__dirname, 'tsconfig-base.json'),
    sourceType: 'module',
  },

  rules: {
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/semi': 'off',
    semi: 'off',
    'no-new': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
  },
};
