/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/src/__mocks__/svg.ts",
    "\\.css$": "<rootDir>/src/__mocks__/css.ts",
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};
