'use strict';

var fs = require('fs');
var path = require('path');
var assemble = require('../');
var fixture = path.join(__dirname, 'fixtures/watch');
var app;

describe('app', function () {
  beforeEach(function () {
    app = assemble({runtimes: false});
  });

  it('should run a task when a file changes', function (done) {
    app.task('watch-test', function () {
      done();
    });

    app.watch('test/fixtures/watch/*.txt', ['watch-test']);
    setImmediate(function () {
      fs.writeFileSync('test/fixtures/watch/test.txt', new Date());
    });
  });
});
