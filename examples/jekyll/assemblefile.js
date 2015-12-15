'use strict';

var path = require('path');
var loader = require('assemble-loader');
var matter = require('parser-front-matter');
var assemble = require('../..');
var app = assemble();

app.use(loader());

app.engine(['hbs', 'md'], require('engine-handlebars') );

app.create('layouts', {
  viewType: 'layout',
  renameKey: function (key) {
    return path.basename(key);
  }
});

app.data({
  site: {
    title: 'My Blog'
  }
});

app.onLoad(/./, function (view, next) {
  matter.parse(view, next);
});

/**
 * Build.
 */

app.task('site', function () {
  app.layouts('_layouts/*.html');
  app.src('_posts/*')
    .pipe(app.renderFile())
    .pipe(app.dest('_site'));
});

app.build('site', function (err) {
  if (err) console.log(err);
});
