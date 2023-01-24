module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.ts', '!**/*.module.ts', '!main.ts'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  testEnvironment: 'node',
};
