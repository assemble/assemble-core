'use strict';

require('mocha');
require('should');
var assert = require('assert');
var support = require('./support');
var App = support.resolve();
var app;

describe('app.render', function() {
  describe('rendering', function() {
    beforeEach(function() {
      app = new App();
      app.engine('tmpl', require('engine-base'));
      app.create('page');
    });

    it('should throw an error when no callback is given:', function(cb) {
      try {
        app.render({});
        cb(new Error('expected an error'));
      } catch (err) {
        assert.equal(err.message, 'Templates#render is async and expects a callback function');
        cb();
      }
    });

    it('should throw an error when an engine is not defined:', function(cb) {
      app.page('foo.bar', {content: '<%= name %>'});
      var page = app.pages.getView('foo.bar');

      app.render(page, function(err) {
        assert(err.message === 'Templates#render cannot find an engine for: .bar');
        cb();
      });
    });

    it('should use helpers to render a view:', function(cb) {
      var locals = {name: 'Halle'};

      app.helper('upper', function(str) {
        return str.toUpperCase(str);
      });

      app.page('a.tmpl', {content: 'a <%= upper(name) %> b', locals: locals});
      var page = app.pages.getView('a.tmpl');

      app.render(page, function(err, res) {
        if (err) return cb(err);

        assert(res.contents.toString() === 'a HALLE b');
        cb();
      });
    });

    it('should use helpers when rendering a view:', function(cb) {
      var locals = {name: 'Halle'};
      app.helper('upper', function(str) {
        return str.toUpperCase(str);
      });

      app.page('a.tmpl', {content: 'a <%= upper(name) %> b', locals: locals});
      var page = app.pages.getView('a.tmpl');

      app.render(page, function(err, res) {
        if (err) return cb(err);
        assert(res.contents.toString() === 'a HALLE b');
        cb();
      });
    });

    it('should render a template when contents is a buffer:', function(cb) {
      app.pages('a.tmpl', {content: '<%= a %>', locals: {a: 'b'}});
      var view = app.pages.getView('a.tmpl');

      app.render(view, function(err, view) {
        if (err) return cb(err);
        assert(view.contents.toString() === 'b');
        cb();
      });
    });

    it('should render a template when content is a string:', function(cb) {
      app.pages('a.tmpl', {content: '<%= a %>', locals: {a: 'b'}});
      var view = app.pages.getView('a.tmpl');

      app.render(view, function(err, view) {
        if (err) return cb(err);
        assert(view.contents.toString() === 'b');
        cb();
      });
    });
  });
});
