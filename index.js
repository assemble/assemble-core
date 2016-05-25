'use strict';

/**
 * module dependencies
 */

var Templates = require('templates');
var utils = require('./utils');

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
  this.is('assemble');
  this.initAssembleCore();
}

/**
 * Inherit `Templates`
 */

Templates.extend(Assemble);
Templates.bubble(Assemble);

/**
 * Load core plugins
 */

Assemble.prototype.initAssembleCore = function() {
  Assemble.emit('preInit', this);

  this.use(utils.tasks(this.name));
  this.use(utils.streams());
  this.use(utils.render());
  this.use(utils.fs());

  Assemble.emit('init', this);
};

/**
 * Expose static `is*` methods from Templates
 */

Templates._.plugin.is(Assemble);

/**
 * Expose static properties for unit tests
 */

utils.define(Assemble, 'utils', Templates.utils);
utils.define(Assemble, '_', Templates._);

/**
 * Expose the `Assemble` constructor
 */

module.exports = Assemble;
