/**
 * Jest configuration for Node.js backend testing
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: ['**/tests/**/*.test.js'],
};
