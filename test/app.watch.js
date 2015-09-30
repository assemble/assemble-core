'use strict';

var fs = require('fs');
var assemble = require('../');
var app;

describe('app', function () {
  beforeEach(function () {
    app = assemble({runtimes: false});
  });

  it('should run a task when a file changes', function (cb) {
    var watch;
    app.task('watch', function () {
      watch = app.watch('test/fixtures/watch/*.txt', ['watch-test']);
      setImmediate(function () {
        fs.writeFileSync('test/fixtures/watch/test.txt', 'test');
      });
    });

    app.task('watch-test', function () {
      watch.close();
      cb();
    });

    app.run('watch', function (err) {
      if (err) return cb(err);
    });
  });
});
