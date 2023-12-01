module.exports = {
  testEnvironment: './jest/Environment.js',
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  setupFilesAfterEnv: [
    'jest-canvas-mock'
  ],
  transform: {
    '^.+\\.(ts|js)$': '<rootDir>/node_modules/babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(ol|color-name|color-space|color-rgba|color-parse|@terrestris/*)/)'
  ],
  testRegex: '/src/.*\\.spec.ts$',
  collectCoverageFrom: [
    'src/*.ts'
  ]
};
