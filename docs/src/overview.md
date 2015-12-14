
**Features**

- create custom view collections using `app.create('foo')`
- use any template engine to render views
- support for helpers
- support for partials
- support for layouts
- plugins and middleware

**Example**

This is just a small glimpse at the `assemble` API!

```js
var assemble = require('assemble');
var app = assemble();

// create a collection
app.create('pages');

// add views to the collection
app.page('a.html', {content: 'this is <%= foo %>'});
app.page('b.html', {content: 'this is <%= bar %>'});
app.page('c.html', {content: 'this is <%= baz %>'});

app.pages.getView('a.html')
  .render({foo: 'home'}, function (err, view) {
    //=> 'this is home'
  });
```

<!-- toc -->

## Install
{%= include("install-npm", {save: true}) %}

## Usage

```js
var assemble = require('{%= name %}');
var app = assemble();
```

## assemblefile.js

The following example `assemblefile.js` includes tasks for generating `.html` files from templates and `.css` stylesheets from `.less`.

```js
var assemble = require('assemble');
var extname = require('gulp-extname');
var less = require('gulp-less');
var app = assemble();

app.task('html', function() {
  return app.src('templates/*.hbs')
    .pipe(extname('.html'))
    .pipe(app.dest('dist/'));
});

app.task('css', function () {
  return app.src('styles/*.less')
    .pipe(less())
    .pipe(app.dest('dist/assets/css'));
});

app.task('default', ['html', 'css']);
```
