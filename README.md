# assemble-core [![NPM version](https://img.shields.io/npm/v/assemble-core.svg?style=flat)](https://www.npmjs.com/package/assemble-core) [![Build Status](https://img.shields.io/travis/assemble/assemble-core.svg?style=flat)](https://travis-ci.org/assemble/assemble-core)

> The core assemble application with no presets or defaults. All configuration is left to the implementor.

assemble-core was designed to give implementors and hackers the baseline features and API for creating rich and powerful node.js applications. You can create web applications, project generators, or even your own static site generator using assemble-core. Learn more about [what you can do with assemble-core](#faq).

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install assemble-core --save
```

## Usage

```js
var assemble = require('assemble-core');
var app = assemble();
```

## Examples

**view collections**

Create a custom view collection:

```js
var app = assemble();
app.create('pages');
```

Now you can add pages with `app.page()` or `app.pages()`:

```js
app.page('home.hbs', {content: 'this is the home page!'});
```

**render**

Render a view:

```js
var app = assemble();

var view = app.view('foo', {content: 'Hi, my name is <%= name %>'});

app.render(view, { name: 'Brian' }, function(err, res) {
  console.log(res.content);
  //=> 'Hi, my name is Brian'
});
```

Render a view from a collection:

```js
var app = assemble();
app.create('pages');

app.page('foo', {content: 'Hi, my name is <%= name %>'})
  .set('data.name', 'Brian')
  .render(function (err, res) {
    console.log(res.content);
    //=> 'Hi, my name is Brian'
  });
```

## API

### [Assemble](index.js#L23)

Create an `assemble` application. This is the main function exported by the assemble module.

**Params**

* `options` **{Object}**: Optionally pass default options to use.

**Example**

```js
var assemble = require('assemble');
var app = assemble();
```

### Templates API

Assemble has an extensive API for working with templates and template collections. In fact, the entire API from the [templates](https://github.com/jonschlinkert/templates) library is available on Assemble.

While we work on getting the assemble docs updated with these methods you can visit [the templates library](https://github.com/jonschlinkert/templates) to learn more about the full range of features and options.

***

### File System API

Assemble has the following methods for working with the file system:

* [src](#src)
* [dest](#dest)
* [copy](#copy)
* [symlink](#symlink)

Assemble v0.6.0 has full [vinyl-fs](http://github.com/wearefractal/vinyl-fs) support, so any [gulp](http://gulpjs.com) plugin should work with assemble.

#### .src

Use one or more glob patterns or filepaths to specify source files.

**Params**

* `glob` **{String|Array}**: Glob patterns or file paths to source files.
* `options` **{Object}**: Options or locals to merge into the context and/or pass to `src` plugins

**Example**

```js
app.src('src/*.hbs', {layout: 'default'});
```

#### .dest

Specify the destination to use for processed files.

**Params**

* `dest` **{String|Function}**: File path or custom renaming function.
* `options` **{Object}**: Options and locals to pass to `dest` plugins

**Example**

```js
app.dest('dist/');
```

#### .copy

Copy files from A to B, where `A` is any pattern that would be valid in [app.src](#src) and `B` is the destination directory.

**Params**

* `patterns` **{String|Array}**: One or more file paths or glob patterns for the source files to copy.
* `dest` **{String|Function}**: Desination directory.
* `returns` **{Stream}**: The stream is returned, so you can continue processing files if necessary.

**Example**

```js
app.copy('assets/**', 'dist/');
```

#### .symlink

Glob patterns or paths for symlinks.

**Params**

* `glob` **{String|Array}**

**Example**

```js
app.symlink('src/**');
```

***

### Task API

Assemble has the following methods for running tasks and controlling workflows:

* [task](#task)
* [build](#build)
* [watch](#watch)

#### .task

Define a task. Tasks are functions that are stored on a `tasks` object, allowing them to be called later by the [build](#build) method. (the [CLI](https://github.com/assemble/assemble-cli) calls [build](#build) to run tasks)

**Params**

* `name` **{String}**: Task name
* `fn` **{Function}**: function that is called when the task is run.

**Example**

```js
app.task('default', function() {
  return app.src('templates/*.hbs')
    .pipe(app.dest('dist/'));
});
```

#### .build

Run one or more tasks.

**Params**

* `tasks` **{Array|String}**: Task name or array of task names.
* `cb` **{Function}**: callback function that exposes `err`

**Example**

```js
app.build(['foo', 'bar'], function(err) {
  if (err) console.error('ERROR:', err);
});
```

#### .watch

Watch files, run one or more tasks when a watched file changes.

**Params**

* `glob` **{String|Array}**: Filepaths or glob patterns.
* `tasks` **{Array}**: Task(s) to watch.

**Example**

```js
app.task('watch', function() {
  app.watch('docs/*.md', ['docs']);
});
```

## FAQ

**What can I do with assemble-core?**

You can use assemble-core to create your own custom:

* blog engine
* project generator / scaffolder
* e-book development framework
* build system
* landing page generator
* documentation generator
* front-end UI framework
* rapid prototyping application
* static site generator
* web application

**How does assemble-core differ from [assemble](https://github.com/assemble/assemble)?**

| **feature** | **assemble-core** | **assemble** | **notes** | 
| --- | :---: | :---: | --- |
| front-matter parsing | No | Yes | Use [parser-front-matter](https://github.com/jonschlinkert/parser-front-matter) as an `.onLoad` middleware. |
| CLI | No | Yes | Create your own CLI experience |
| Built-in template collections | No | Yes | Use `.create()` to add collections |
| Built-in template engine | No | Yes | [assemble](https://github.com/assemble/assemble) ships with [engine-handlebars](https://github.com/jonschlinkert/engine-handlebars). Use `.engine()` to register any [consolidate](https://github.com/visionmedia/consolidate.js)-compatible template engine. |

## Related projects

Assemble is built on top of these great projects:

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [boilerplate](https://www.npmjs.com/package/boilerplate): Tools and conventions for authoring and publishing boilerplates that can be generated by any build… [more](https://www.npmjs.com/package/boilerplate) | [homepage](http://boilerplates.io)
* [composer](https://www.npmjs.com/package/composer): API-first task runner with three methods: task, run and watch. | [homepage](https://github.com/doowb/composer)
* [generate](https://www.npmjs.com/package/generate): Fast, composable, highly extendable project generator with a user-friendly and expressive API. | [homepage](https://github.com/generate/generate)
* [scaffold](https://www.npmjs.com/package/scaffold): Conventions and API for creating declarative configuration objects for project scaffolds - similar in format… [more](https://www.npmjs.com/package/scaffold) | [homepage](https://github.com/jonschlinkert/scaffold)
* [templates](https://www.npmjs.com/package/templates): System for creating and managing template collections, and rendering templates with any node.js template engine.… [more](https://www.npmjs.com/package/templates) | [homepage](https://github.com/jonschlinkert/templates)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Tests

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/assemble-core/issues/new).

If Assemble doesn't do what you need, [please let us know][issue].

## History

**v0.14.0**

* bumps [templates](https://github.com/jonschlinkert/templates) to v0.15.1
* adds logging methods from [base-logger](https://github.com/node-base/base-logger) (`.log`, `.verbose`, etc)
* `.handleView` method is now deprecated, use `.handleOnce` instead
* Private method `.mergePartialsSync` rename was reverted to `.mergePartials` to be consistent with other updates in `.render` and `.compile`. No other breaking changes, but some new features were added to [templates](https://github.com/jonschlinkert/templates) for handling context in views and helpers.

**v0.13.0**

* Breaking change: bumps [templates](https://github.com/jonschlinkert/templates) to v0.13.0 to fix obscure rendering bug when multiple duplicate partials were rendered in the same view. But the fix required changing the `.mergePartials` method to be async. If you're currently using `.mergePartials`, you can continue to do so synchronously using the `.mergePartialsSync` method.

**v0.9.0**

* Updates [composer](https://github.com/doowb/composer) to v0.11.0, which removes the `.watch` method in favor of using the [base-watch](https://github.com/node-base/base-watch) plugin.

**v0.8.0**

* Bumps several deps. [templates](https://github.com/jonschlinkert/templates) was bumped to 0.9.0 to take advantage of event handling improvements.

**v0.7.0**

* Bumps [templates](https://github.com/jonschlinkert/templates) to 0.8.0 to take advantage of `isType` method for checking a collection type, and a number of improvements to how collections and views are instantiated and named.

**v0.6.0**

* Bumps [assemble-fs](https://github.com/assemble/assemble-fs) plugin to 0.5.0, which introduces `onStream` and `preWrite` middleware handlers.
* Bumps [templates](https://github.com/jonschlinkert/templates) to 0.7.0, which fixes how non-cached collections are initialized. This was done as a minor instead of a patch since - although it's a fix - it could theoretically break someone's setup.

**v0.5.0**

* Bumps [templates](https://github.com/jonschlinkert/templates) to latest, 0.6.0, since it uses the latest [base-methods](https://github.com/jonschlinkert/base-methods), which introduces prototype mixins. No API changes.

**v0.4.0**

* Removed [emitter-only](https://github.com/doowb/emitter-only) since it was only includes to be used in the default listeners that were removed in an earlier release. In rare cases this might be a breaking change, but not likely.
* Adds lazy-cache
* Updates [assemble-streams](https://github.com/assemble/assemble-streams) plugin to latest

## Authors

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](http://twitter.com/doowb)

## License

verb © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/assemble/assemble-core/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v, on April 05, 2016._