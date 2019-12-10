// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./e2e/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  // For angular tests
  useAllAngular2AppRoots: true,

  // Base URL for application server
  baseUrl: 'http://localhost:8080',
  SELENIUM_PROMISE_MANAGER: false,
  framework: 'jasmine',
  jasmineNodeOpts: {
    // defaultTimeoutInterval: 60000,
    defaultTimeoutInterval: 15000,
    showTiming: true,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine
      .getEnv()
      .addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
