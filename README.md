# assemble-core [![NPM version](https://img.shields.io/npm/v/assemble-core.svg?style=flat)](https://www.npmjs.com/package/assemble-core) [![Build Status](https://img.shields.io/travis/assemble/assemble-core.svg?style=flat)](https://travis-ci.org/assemble/assemble-core)

> The core assemble application with no presets or defaults. All configuration is left to the implementor.

<p align="center">
<a href="https://github.com/assemble/assemble-core">
<img height="250" width="250" src="https://raw.githubusercontent.com/assemble/assemble-core/master/docs/logo.png">
</a>
</p>

Built on top of [base](https://github.com/node-base/base) and [templates](https://github.com/jonschlinkert/templates), assemble-core is used in [assemble](https://github.com/assemble/assemble) to provide the baseline features and API necessary for rendering templates, working with the file system, and running tasks.

Implementors and hackers can use assemble-core to create rich and powerful build tooling, project scaffolding systems, documentation generators, or even your completely custom static site generators. Learn more about [what you can do with assemble-core](#faq).

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save assemble-core
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

### [Assemble](index.js#L22)

Create an `assemble` application. This is the main function exported by the assemble module.

**Params**

* `options` **{Object}**: Optionally pass default options to use.

**Example**

```js
var assemble = require('assemble');
var app = assemble();
```

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
| front-matter parsing | No | Yes | use [assemble](https://github.com/assemble/assemble) or use [parser-front-matter](https://github.com/jonschlinkert/parser-front-matter) as an `.onLoad` middleware. |
| CLI | No | Yes | Create your own CLI experience, or use [assemble](https://github.com/assemble/assemble) |
| Built-in template collections | No | Yes | Use `.create()` to add collections |
| Built-in template engine | No | Yes | [assemble](https://github.com/assemble/assemble) ships with [engine-handlebars](https://github.com/jonschlinkert/engine-handlebars). Use `.engine()` to register any [consolidate](https://github.com/visionmedia/consolidate.js)-compatible template engine. |

## Related projects

Assemble is built on top of these great projects:

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://github.com/assemble/assemble) | [homepage](https://github.com/assemble/assemble "Assemble is a powerful, extendable and easy to use static site generator for node.js. Used by thousands of projects for much more than building websites, Assemble is also used for creating themes, scaffolds, boilerplates, e-books, UI components, API docum")
* [boilerplate](https://www.npmjs.com/package/boilerplate): Tools and conventions for authoring and publishing boilerplates that can be generated by any build… [more](https://github.com/jonschlinkert/boilerplate) | [homepage](https://github.com/jonschlinkert/boilerplate "Tools and conventions for authoring and publishing boilerplates that can be generated by any build system or generator.")
* [composer](https://www.npmjs.com/package/composer): API-first task runner with three methods: task, run and watch. | [homepage](https://github.com/doowb/composer "API-first task runner with three methods: task, run and watch.")
* [generate](https://www.npmjs.com/package/generate): The Santa Claus machine for GitHub projects. Scaffolds out new projects, or creates any kind… [more](https://github.com/generate/generate) | [homepage](https://github.com/generate/generate "The Santa Claus machine for GitHub projects. Scaffolds out new projects, or creates any kind of required file or document from any given templates or source materials.")
* [scaffold](https://www.npmjs.com/package/scaffold): Conventions and API for creating declarative configuration objects for project scaffolds - similar in format… [more](https://github.com/jonschlinkert/scaffold) | [homepage](https://github.com/jonschlinkert/scaffold "Conventions and API for creating declarative configuration objects for project scaffolds - similar in format to a grunt task, but more portable, generic and can be used by any build system or generator - even gulp.")
* [templates](https://www.npmjs.com/package/templates): System for creating and managing template collections, and rendering templates with any node.js template engine… [more](https://github.com/jonschlinkert/templates) | [homepage](https://github.com/jonschlinkert/templates "System for creating and managing template collections, and rendering templates with any node.js template engine. Can be used as the basis for creating a static site generator or blog framework.")
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://github.com/verbose/verb) | [homepage](https://github.com/verbose/verb "Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used on hundreds of projects of all sizes to generate everything from API docs to readmes.")

## Tests

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](contributing.md) for avice on opening issues, pull requests, and coding standards.

If Assemble doesn't do what you need, [please let us know][issue].

## History

### v0.24.0

* Bumps [templates](https://github.com/jonschlinkert/templates) to v0.24.0 to use the latest [base-data](https://github.com/node-base/base-data) which removed the `renameKey` option from the `.data` method. Use the `namespace` option instead.

### v0.23.0

* Bumps [templates](https://github.com/jonschlinkert/templates) to v0.23.0 to fix bug with double rendering in [engine-cache](https://github.com/jonschlinkert/engine-cache).

### v0.22.0

Bumps [templates](https://github.com/jonschlinkert/templates) to v0.22.0 to take advantage of fixes and improvements to lookup methods: `.find` and `getView`. No API changes were made. Please [let us know](../../issues) if regressions occur.

* fixes `List` bug that was caused collection helpers to explode
* Improvements to lookup functions: `app.getView()` and `app.find()`
* Bumps [base](https://github.com/node-base/base) to take advantages of code optimizations.

### v0.21.0

* Bumps [templates](https://github.com/jonschlinkert/templates) to v0.21.0. Support for the `queue` property was removed on collections. See [templates](https://github.com/jonschlinkert/templates) for additional details.

### v0.20.0

* Bumps [templates](https://github.com/jonschlinkert/templates) to v0.20.0. Some changes were made to context handling that effected one unit test out of ~1,000. although it's unlikely you'll be effected by the change, it warrants a minor bump

### v0.19.0

* Bumps [templates](https://github.com/jonschlinkert/templates) to v0.19.0
* Externalizes tests (temporarily) to base-test-runner, until we get all of the tests streamlined to the same format.

### v0.18.0

* Bumps [assemble-loader](https://github.com/assemble/assemble-loader) to v0.5.0, which includes which fixes a bug where `renameKey` was not always being used when defined on collection loader options.
* Bumps [templates](https://github.com/jonschlinkert/templates) to v0.18.0, which includes fixes for resolving layouts

### v0.17.0

* Bumps [templates](https://github.com/jonschlinkert/templates) to v0.17.0

### v0.16.0

* Bumps [assemble-render-file](https://github.com/assemble/assemble-render-file) to v0.5.0 and [templates](https://github.com/jonschlinkert/templates) to v0.16.0

### v0.15.0

* Bumps [assemble-streams](https://github.com/assemble/assemble-streams) to v0.5.0

### v0.14.0

* Bumps [templates](https://github.com/jonschlinkert/templates) to v0.15.1
* adds logging methods from [base-logger](https://github.com/node-base/base-logger) (`.log`, `.verbose`, etc)
* `.handleView` method is now deprecated, use `.handleOnce` instead
* Private method `.mergePartialsSync` rename was reverted to `.mergePartials` to be consistent with other updates in `.render` and `.compile`. No other breaking changes, but some new features were added to [templates](https://github.com/jonschlinkert/templates) for handling context in views and helpers.

### v0.13.0

* Breaking change: bumps [templates](https://github.com/jonschlinkert/templates) to v0.13.0 to fix obscure rendering bug when multiple duplicate partials were rendered in the same view. But the fix required changing the `.mergePartials` method to be async. If you're currently using `.mergePartials`, you can continue to do so synchronously using the `.mergePartialsSync` method.

### v0.9.0

* Updates [composer](https://github.com/doowb/composer) to v0.11.0, which removes the `.watch` method in favor of using the [base-watch](https://github.com/node-base/base-watch) plugin.

### v0.8.0

* Bumps several deps. [templates](https://github.com/jonschlinkert/templates) was bumped to 0.9.0 to take advantage of event handling improvements.

### v0.7.0

* Bumps [templates](https://github.com/jonschlinkert/templates) to 0.8.0 to take advantage of `isType` method for checking a collection type, and a number of improvements to how collections and views are instantiated and named.

### v0.6.0

* Bumps [assemble-fs](https://github.com/assemble/assemble-fs) plugin to 0.5.0, which introduces `onStream` and `preWrite` middleware handlers.
* Bumps [templates](https://github.com/jonschlinkert/templates) to 0.7.0, which fixes how non-cached collections are initialized. This was done as a minor instead of a patch since - although it's a fix - it could theoretically break someone's setup.

### v0.5.0

* Bumps [templates](https://github.com/jonschlinkert/templates) to latest, 0.6.0, since it uses the latest [base-methods](https://github.com/jonschlinkert/base-methods), which introduces prototype mixins. No API changes.

### v0.4.0

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

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/assemble/assemble-core/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on July 02, 2016._