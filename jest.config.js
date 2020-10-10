module.exports = {
  testMatch: ['**/*.test.ts'],
  testEnvironment: 'node',
  rootDir: 'src',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};
