'use strict';

var runner = require('base-test-runner')();
var suite = require('base-test-suite');

/**
 * Run the tests in `base-test-suite`
 */

runner.on('assemble', function(file) {
  require(file.path)(require('..'));
});

runner.addFiles('assemble', suite.test.templates);
runner.addFiles('assemble', suite.test['assemble-core']);
