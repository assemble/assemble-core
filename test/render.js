'use strict';

require('mocha');
require('should');
var assert = require('assert');
var support = require('./support');
var App = support.resolve();
var app;

describe('render', function() {
  describe('engine', function() {
    var view;

    beforeEach(function() {
      app = new App({silent: true});
      app.engine('tmpl', require('engine-base'));
      app.create('page');
      view = {contents: new Buffer('a <%= name %> b'), locals: {name: 'Halle'}};
    });

    it('should render a view from an object:', function(cb) {
      app.page('a.tmpl', view)
        .render(function(err, res) {
          if (err) return cb(err);
          assert(res.contents.toString() === 'a Halle b');
          cb();
        });
    });

    it('should throw an error when a variable is undefined:', function(cb) {
      delete app.cache.data.name;
      delete view.locals.name;

      app.page('a.tmpl', view)
        .render(function(err) {
          assert(err.message === 'name is not defined');
          cb();
        });
    });

    it('should re-throw an error when rethrow is true:', function(cb) {
      app = new App({rethrow: true, silent: true});

      delete app.cache.data.name;
      delete view.locals.name;

      app.engine('tmpl', require('engine-base'));
      app.create('page');

      app.page('a.tmpl', view)
        .render(function(err) {
          assert(err.message === 'name is not defined');
          cb();
        });
    });

    it('should emit a re-thrown error when rethrow is true:', function(cb) {
      app = new App({rethrow: true, silent: false});

      delete app.cache.data.name;
      delete view.locals.name;

      app.engine('tmpl', require('engine-base'));
      app.create('page');

      app.on('error', function(err) {
        assert(err.message === 'name is not defined');
        cb();
      });

      app.page('a.tmpl', view)
        .render(function(err) {
          assert(err.message === 'name is not defined');
        });
    });
  });
});
