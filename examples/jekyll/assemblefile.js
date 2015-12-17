'use strict';

var path = require('path');
var loader = require('assemble-loader');
var matter = require('parser-front-matter');
var extname = require('gulp-extname');
var runtimes = require('composer-runtimes');
var assemble = require('../..');
var app = assemble();
app.use(runtimes());

/**
 * Logo out files as they're rendered
 */

app.on('preRender', function(view) {
  console.log('  rendering >', view.relative);
});

/**
 * Add the `assemble-loader` plugin
 */

app.use(loader());

/**
 * Register a template engine for rendering templates
 */

app.engine('*', require('engine-handlebars'));

/**
 * Create a custom template (view) collection
 */

app.create('layouts', {
  viewType: 'layout',
  renameKey: function(key) {
    return path.basename(key);
  }
});


/**
 * Register the helper-markdown for markdown support
 */

app.helper('markdown', require('helper-markdown'));

/**
 * Add some "global" data to be used in templates
 */

app.data({
  site: {
    title: 'My Blog'
  }
});

/**
 * Middleware for parsing front-matter in templates
 */

app.onLoad(/./, function(view, next) {
  matter.parse(view, next);
});

/**
 * Task to build our "site"
 */

app.task('site', function() {
  app.layouts('_layouts/*.html');
  return app.src('_posts/*.md')
    .pipe(app.renderFile('*'))
    .pipe(extname())
    .pipe(app.dest('_site'));
});

/**
 * Build.
 */

app.build('site', function(err) {
  if (err) return console.log(err);
});
