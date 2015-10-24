'use strict';

/**
 * module dependencies
 */

var only = require('emitter-only');
var Templates = require('templates');
var Composer = require('composer');

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
  Composer.call(this, this.options.name || 'assemble');
  this.init();
}

/**
 * `Assemble` prototype methods
 */

Templates.extend(Assemble, {
  constructor: Assemble,

  /**
   * Initialize Assemble defaults
   */

  init: function() {

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
});

/**
 * Inherit Composer
 */

Templates.inherit(Assemble, Composer);
Assemble.utils = Templates.utils;
Assemble._ = Templates._;

/**
 * Expose the `Assemble` constructor
 */

module.exports = Assemble;
