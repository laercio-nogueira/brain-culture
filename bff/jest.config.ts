const {} = require('ts-jest')
const { createDefaultPreset } = require('ts-jest')
const tsJestTransformCfg = createDefaultPreset().transform

/** @type {import("jest").Config} **/
module.exports = {
  transform: {
    ...tsJestTransformCfg,
  },
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.(t|s)s'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  moduleNameMapper: {
    '@infrastructure/(.*)': '<rootDir>/src/infrastructure/$1',
    '@application/(.*)': '<rootDir>/src/application/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1',
  },
  testEnvironment: 'node',
}
