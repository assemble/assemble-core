var gulp = require('gulp');
var through = require('through2');
var mocha = require('gulp-mocha');
var stylish = require('jshint-stylish');
var istanbul = require('gulp-istanbul');
var jshint = require('gulp-jshint');


gulp.task('coverage', function () {
  return gulp.src(['index.js', 'lib/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['coverage'], function () {
  return gulp.src('test/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports({
      reporters: [ 'text' ],
      reportOpts: {dir: 'coverage', file: 'summary.txt'}
    }))
});

gulp.task('lint', function () {
  return gulp.src(['index.js', 'lib/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('unlazy', function () {
  return gulp.src('lib/utils.js')
    .pipe(through.obj(function (file, enc, cb) {
      file.contents = new Buffer(unlazy(file.contents.toString()));
      cb(null, file);
    }))
    .pipe(gulp.dest(function (file) {
      file.path = 'lib/utils-browser.js'
      return file;
    }))
});

gulp.task('default', ['lint', 'test']);


function unlazy(str) {
  str = str.replace(/\r\n|\r/g, '\n');

  var lines = str.split('\n');
  var len = lines.length, i = -1;
  var result = [];

  while (++i < len) {
    var line = lines[i];
    var m;
    if (/var lazy =/.test(line)) {
      result.push('var utils = module.exports;');

    } else if (m = /lazy\((.*)\);?/.exec(line)) {
      var segs = m[1].split(' ');
      var nickname = camelcase(segs[1] || segs[0]);
      result.push(rename(chop(segs[0]), nickname));

    } else {
      result.push(line);
    }
  }
  return result.join('\n');
}

function rename(name, nickname) {
  return 'utils.' + nickname + ' = require(\'' + name + '\');';
}

function chop(str) {
  var re = /^[-_.\W\s]+|[-_.\W\s]+$/g;
  return str.trim().replace(re, '');
}

function camelcase(str) {
  var re = /[-_.\W\s]+(\w|$)/g;
  return chop(str).replace(re, function (_, ch) {
    return ch.toUpperCase();
  });
}
