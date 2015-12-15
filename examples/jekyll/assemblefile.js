'use strict';

var path = require('path');
var loader = require('assemble-loader');
var matter = require('parser-front-matter');
var assemble = require('../..');
var app = assemble();

/**
 * Add the `assemble-loader` plugin
 */

app.use(loader());

/**
 * Register a template engine for rendering templates
 */

app.engine(['hbs', 'md'], require('engine-handlebars'));

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
 * Build.
 */

app.task('site', function() {
  app.layouts('_layouts/*.html');
  app.src('_posts/*')
    .pipe(app.renderFile())
    .pipe(app.dest('_site'));
});

app.build('site', function(err) {
  if (err) console.log(err);
});
