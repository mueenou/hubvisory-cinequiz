module.exports = {
  globalSetup: "<rootDir>/jest.setup.js",
  testEnvironment: "jsdom",
  //   setupFiles: ["./mockEventTarget.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/components/**/*.vue",
    "<rootDir>/pages/**/*.vue",
  ],
  forceExit: !!process.env.CI, // almost every CI platform sets this by default
};
