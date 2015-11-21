'use strict';

/**
 * module dependencies
 */

var Templates = require('templates');
var only = require('emitter-only');
var tasks = require('base-tasks');

/**
 * Create an `assemble` application. This is the main function exported
 * by the assemble module.
 *
 * ```js
 * var assemble = require('assemble');
 * var app = assemble();
 * ```
 * @param {Object} `options` Optionally pass default options to use.
 * @api public
 */

function Assemble(options) {
  if (!(this instanceof Assemble)) {
    return new Assemble(options);
  }

  Templates.call(this, options);
  this.use(tasks(this.options.name || 'assemble'));

  /**
   * Allow events to be registered only once, so
   * that we can reinitialize the application but
   * avoid re-registering the same emitters.
   */

  this.mixin('only', only.bind(this));

  /**
   * Load core plugins
   */

  this.use(require('assemble-fs'));
  this.use(require('assemble-streams'));
  this.use(require('assemble-render-file')());
}

/**
 * `Assemble` prototype methods
 */

Templates.extend(Assemble);

/**
 * Expose the `Assemble` constructor
 */

module.exports = Assemble;

/**
 * Expose static properties for unit tests
 */

Assemble.utils = Templates.utils;
Assemble._ = Templates._;
