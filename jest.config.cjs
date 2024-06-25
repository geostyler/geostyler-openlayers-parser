module.exports = {
  testEnvironment: './jest/Environment.cjs',
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
    'node_modules/(?!(ol|color-name|geostyler-style|color-space|color-rgba|color-parse|@terrestris/*)/)'
  ],
  testRegex: '/src/.*\\.spec.ts$',
  collectCoverageFrom: [
    'src/*.ts'
  ]
};
