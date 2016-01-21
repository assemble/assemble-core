'use strict';

require('mocha');
require('should');
var support = require('./support');
var App = support.resolve();
var View = App.View;
var view;

describe('helpers', function() {
  describe('rendering', function() {
    it('should expose `.render` for rendering a view:', function(cb) {
      view = new View({path: 'a.tmpl', content: '<%= a %>'})
        .render({a: 'bbb'}, function(err, res) {
          if (err) return cb(err);
          res.content.should.equal('bbb');
          cb();
        });
    });
  });
});

