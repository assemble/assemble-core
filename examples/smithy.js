'use strict';

var fs = require('fs');
var path = require('path');
var toFile = require('to-file');
var assemble = require('..');

module.exports = function smithy(dir) {
  var app = assemble();

  app.create('files');
  toViews(dir, function (fp, opts) {
    app.files.addView(toFile(fp, opts));
  });

  app.use(function(app) {
    app.build = function(cb) {
      app.toStream('files')
        .pipe(app.dest('build'))
        .on('error', cb)
        .on('end', cb);
    };
    return app;
  });

  return app;
};

function toViews(dir, fn) {
  var base = path.resolve(dir, 'src');
  var files = fs.readdirSync(base);

  var len = files.length, i = -1;
  while (++i < len) {
    var name = files[i];
    var fp = path.resolve(base, name);
    var stat = fs.lstatSync(fp);
    if (stat.isFile()) {
      fn(fp, {
        base: base,
        stat: stat
      });
    }
  }
}
