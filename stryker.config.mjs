// @ts-nocheck
// 
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  _comment:
    "This config was generated using 'stryker init'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information.",
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress", "dashboard"],
  testRunner: "karma",
  testRunner_comment:
    "Take a look at https://stryker-mutator.io/docs/stryker-js/karma-runner for information about the karma plugin.",
  coverageAnalysis: "perTest",
  karma: {
    projectType: "custom",
    configFile: "./node_modules/base32.js/karma.conf.js",
    config: {}
  }
};
export default config;
