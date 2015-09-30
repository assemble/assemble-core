require('mocha');
require('should');
var assert = require('assert');
var App = require('../');
var Base = App.Base;
var app;

describe('app', function () {
  describe('constructor', function () {
    it('should create an instance of App:', function () {
      app = new App();
      assert(app instanceof App);
    });
  });

  describe('static methods', function () {
    it('should expose `extend`:', function () {
      assert(typeof App.extend ==='function');
    });
  });

  describe('prototype methods', function () {
    beforeEach(function() {
      app = new App();
    });

    it('should expose `set`', function () {
      assert(typeof app.set ==='function');
    });
    it('should expose `get`', function () {
      assert(typeof app.get ==='function');
    });
    it('should expose `visit`', function () {
      assert(typeof app.visit ==='function');
    });
    it('should expose `define`', function () {
      assert(typeof app.define ==='function');
    });
    it('should expose `views`', function () {
      assert(typeof app.views === 'object');
    });
  });

  describe('instance', function () {
    beforeEach(function() {
      app = new App();
    });

    it('should set a value on the instance:', function () {
      app.set('a', 'b');
      assert(app.a ==='b');
    });

    it('should get a value from the instance:', function () {
      app.set('a', 'b');
      assert(app.get('a') ==='b');
    });
  });

  describe('initialization', function () {
    it('should listen for errors:', function (done) {
      app = new App();
      app.on('error', function (err) {
        assert(err.message === 'foo');
        done();
      });
      app.emit('error', new Error('foo'));
    });

    it('should mixin methods after init:', function () {
      app = new App();
      app.option({
        mixins: {
          foo: function () {}
        }
      });
      assert(typeof app.foo ==='function');
    });

    it('should update constructors after init:', function () {
      var Group = App.Group;
      function MyGroup() {
        Base.call(this);
      }
      Base.extend(MyGroup);

      app = new App();
      assert.equal(app.Group, Group)
      assert.equal(app.get('Group'), Group)
      app.option('Group', MyGroup);
      assert.equal(app.Group, MyGroup);
      assert.equal(app.get('Group'), MyGroup);
    });

    it('should mixin prototype methods defined on options:', function () {
      app = new App({
        mixins: {
          foo: function () {}
        }
      });
      assert(typeof app.foo ==='function');
      delete App.prototype.foo;
    });
  });
});
