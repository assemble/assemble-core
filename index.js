'use strict';

/**
 * module dependencies
 */

var Templates = require('templates');
var Composer = require('composer');
var proto = Composer.prototype;
var only = require('emitter-only');
var utils = require('./lib/utils');

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
  Templates.apply(this, arguments);
  Composer.apply(this, arguments);
  this.options = options || {};
}

Templates.inherit(Assemble, Composer);

/**
 * `Assemble` prototype methods
 */

Templates.extend(Assemble, {
  constructor: Assemble,

  /**
   * Push a view collection into a vinyl stream.
   *
   * ```js
   * app.toStream('posts', function(file) {
   *   return file.path !== 'index.hbs';
   * })
   * ```
   * @name .toStream
   * @param {String} `collection` Name of the collection to push into the stream.
   * @param {Function} Optionally pass a filter function to use for filtering views.
   * @return {Stream}
   * @api public
   */

  toStream: function (collection) {
    var stream = utils.through.obj();
    var src = utils.srcStream;
    stream.setMaxListeners(0);

    if (typeof collection === 'undefined') {
      process.nextTick(stream.end.bind(stream));
      return src(stream);
    }

    var views = this.getViews(collection);
    setImmediate(function () {
      for (var key in views) {
        stream.write(views[key]);
      }
      stream.end();
    });
    return src(stream);
  },

  /**
   * Render a vinyl file.
   *
   * ```js
   * app.src('*.hbs')
   *   .pipe(app.renderFile());
   * ```
   *
   * @name .renderFile
   * @param  {Object} `locals` Optionally locals to pass to the template engine for rendering.
   * @return {Object}
   * @api public
   */

  renderFile: function (locals) {
    var opts = utils.merge({}, this.options, locals);
    var collection = this.collection(opts);
    var File = opts.File || utils.File;
    var app = this;

    return utils.through.obj(function (file, enc, next) {
      if (!file.isView) {
        file = collection.view(file);
      }
      app.handleView('onLoad', file);

      var ctx = utils.merge({}, app.cache.data, locals, file.data);
      app.render(file, ctx, function (err, res) {
        if (err) return next(err);
        next(null, new File(res));
      });
    });
  },

  /**
   * Copy files with the given glob `patterns` to the specified `dest`.
   *
   * ```js
   * app.task('assets', function() {
   *   app.copy('assets/**', 'dist/');
   * });
   * ```
   * @name .copy
   * @param {String|Array} `patterns` Glob patterns of files to copy.
   * @param  {String|Function} `dest` Desination directory.
   * @return {Stream} Stream, to continue processing if necessary.
   * @api public
   */

  copy: function(patterns, dest, options) {
    return utils.vfs.src(patterns, options)
      .pipe(utils.vfs.dest(dest, options))
      .on('data', function() {});
  },

  /**
   * Allow events to be registered only once, so
   * that we can reinitialize the application and
   * avoid re-registering the same emitters.
   */

  only: function () {
    return only.apply(this, arguments);
  },

  /**
   * Glob patterns or filepaths to source files.
   *
   * ```js
   * app.src('src/*.hbs', {layout: 'default'});
   * ```
   * @name .src
   * @param {String|Array} `glob` Glob patterns or file paths to source files.
   * @param {Object} `options` Options or locals to merge into the context and/or pass to `src` plugins
   * @api public
   */

  src: function () {
    return utils.vfs.src.apply(utils.vfs, arguments);
  },

  /**
   * Glob patterns or paths for symlinks.
   *
   * ```js
   * app.symlink('src/**');
   * ```
   * @name .symlink
   * @param {String|Array} `glob`
   * @api public
   */

  symlink: function () {
    return utils.vfs.symlink.apply(utils.vfs, arguments);
  },

  /**
   * Specify a destination for processed files.
   *
   * ```js
   * app.dest('dist/');
   * ```
   * @name .dest
   * @param {String|Function} `dest` File path or rename function.
   * @param {Object} `options` Options and locals to pass to `dest` plugins
   * @api public
   */

  dest: function (dir) {
    if (!dir) {
      throw new TypeError('expected dest to be a string or function.');
    }
    return utils.vfs.dest.apply(utils.vfs, arguments);
  },

  /**
   * Define a task to be run when the task is called.
   *
   * ```js
   * app.task('default', function() {
   *   app.src('templates/*.hbs')
   *     .pipe(app.dest('dist/'));
   * });
   * ```
   * @name .task
   * @param {String} `name` Task name
   * @param {Function} `fn` function that is called when the task is run.
   * @api public
   */

  task: function (/*name*/) {
    if (this.options.runtimes === true) {
      utils.runtimes(this);
    }
    return proto.task.apply(this, arguments);
  },

  /**
   * Run one or more tasks.
   *
   * ```js
   * app.run(['foo', 'bar'], function(err) {
   *   if (err) console.error('ERROR:', err);
   * });
   * ```
   * @name .run
   * @param {Array|String} `tasks` Task name or array of task names.
   * @param {Function} `cb` callback function that exposes `err`
   * @api public
   */

  run: function (/*tasks, cb*/) {
    return proto.run.apply(this, arguments);
  },

  /**
   * Re-run the specified task(s) when a file changes.
   *
   * ```js
   * app.task('watch', function() {
   *   app.watch('docs/*.md', ['docs']);
   * });
   * ```
   *
   * @param  {String|Array} `glob` Filepaths or glob patterns.
   * @param  {Array} `tasks` Task(s) to watch.
   * @api public
   */

  watch: function (/*glob, tasks*/) {
    return proto.watch.apply(this, arguments);
  }
});

/**
 * Expose the `Assemble` constructor
 */

module.exports = Assemble;
