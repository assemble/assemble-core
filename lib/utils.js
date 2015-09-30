'use strict';

/**
 * Mdule dependencies
 */

var lazy = module.exports = require('lazy-cache')(require);
lazy('composer-runtimes', 'runtimes');
lazy('mixin-deep', 'merge');
lazy('through2', 'through');
lazy('vinyl-fs', 'vfs');
lazy('src-stream');
