module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  testRegex: '.spec.ts$',
  modulePaths: ['<rootDir>/../'],
  transform: {
    '^.+\\.(t)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.module.ts',
    '!**/**/config.keys.ts',
    '!**/**/ormconfig.ts',
    '!main.ts',
  ],
  modulePathIgnorePatterns: ['src/db/migrations', 'dist'],
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