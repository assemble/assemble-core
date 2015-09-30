'use strict';

/**
 * Lazily required module dependencies
 */

var utils = module.exports;
utils.runtimes = require('composer-runtimes');
utils.merge = require('mixin-deep');
utils.through = require('through2');
utils.vfs = require('vinyl-fs');
