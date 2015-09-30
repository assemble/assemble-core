'use strict';

var assemble = require('..');
var assert = require('assert');
var should = require('should');
var join = require('path').join;
var app;

describe('toStream()', function() {
  beforeEach(function () {
    app = assemble();
    app.create('pages');
    app.page('a', {content: 'this is A'});
    app.page('b', {content: 'this is B'});
    app.page('c', {content: 'this is C'});
  });

  it('should return a stream', function (cb) {
    var stream = app.toStream();
    should.exist(stream);
    should.exist(stream.on);
    cb();
  });

  it('should return a stream for a collection', function (cb) {
    var stream = app.toStream('pages');
    should.exist(stream);
    should.exist(stream.on);
    cb();
  });

  it('should push each item in the collection into the stream', function (cb) {
    var files = [];
    app.toStream('pages')
      .on('error', cb)
      .on('data', function (file) {
        should.exist(file);
        should.exist(file.path);
        should.exist(file.contents);
        files.push(file.path);
      })
      .on('end', function () {
        assert.equal(files.length, 3);
        cb();
      });
  });
});