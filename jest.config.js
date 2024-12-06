module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/infrastructure/persistence/database/seeds/seeds.ts',
    '!src/main/framework/setup.framework.ts',
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  roots: ['<rootDir>/src'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/bootstrap',
    'index\\.ts$',
  ],
  collectCoverage: true,
  moduleNameMapper: {
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@main/(.*)$': '<rootDir>/src/main/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    "^@assertions/(.*)$": '<rootDir>/tests/assertions/$1',
    "^@dummies/(.*)$": '<rootDir>/tests/dummies/$1',
    "^@mocks/(.*)$": '<rootDir>/tests/mocks/$1',
    "^@stubs/(.*)$": '<rootDir>/tests/stubs/$1',
    "^@docs/(.*)$": '<rootDir>/docs/$1',
  }
}
