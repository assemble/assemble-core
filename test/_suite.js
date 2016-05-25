'use strict';

var suite = require('base-test-suite');
var runner = require('base-test-runner')();

/**
 * Run the tests in `base-test-suite`
 */

runner.on('file', function(file) {
  require(file.path)(require('..'));
});

runner.addFiles(suite.test.templates);
if (suite.test['assemble-core']) {
  runner.addFiles(suite.test['assemble-core']);
}
