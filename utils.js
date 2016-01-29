'use strict';

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('assemble-fs', 'fs');
require('assemble-render-file', 'render');
require('assemble-streams', 'streams');
require('base-tasks', 'tasks');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
