require('@workspace/eslint-config/patch');

module.exports = {
  extends: ['@workspace'],
  parserOptions: {
    project: require.resolve('./tsconfig.json'),
  },
};
