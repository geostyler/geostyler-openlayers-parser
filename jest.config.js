module.exports = {
  "moduleFileExtensions": [
    "ts",
    "js"
  ],
  "setupFilesAfterEnv": [
    "jest-canvas-mock"
  ],
  "transform": {
    "^.+\\.(ts|js)$": "<rootDir>/node_modules/babel-jest"
  },
  "transformIgnorePatterns": [
    "node_modules/(?!(ol|geostyler-style|@terrestris/*)/)"
  ],
  "testRegex": "/src/.*\\.spec.ts$",
  "collectCoverageFrom": [
    "src/*.ts"
  ]
};
