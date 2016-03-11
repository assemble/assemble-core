**v0.14.0**

- bumps [templates][] to v0.15.1
- adds logging methods from [base-logger][] (`.log`, `.verbose`, etc)
- `.handleView` method is now deprecated, use `.handleOnce` instead
- Private method `.mergePartialsSync` rename was reverted to `.mergePartials` to be consistent with other updates in `.render` and `.compile`. No other breaking changes, but some new features were added to [templates][] for handling context in views and helpers.

**v0.13.0**

- Breaking change: bumps [templates][] to v0.13.0 to fix obscure rendering bug when multiple duplicate partials were rendered in the same view. But the fix required changing the `.mergePartials` method to be async. If you're currently using `.mergePartials`, you can continue to do so synchronously using the `.mergePartialsSync` method.

**v0.9.0**

- Updates [composer][] to v0.11.0, which removes the `.watch` method in favor of using the [base-watch][] plugin.

**v0.8.0**

- Bumps several deps. [templates][] was bumped to 0.9.0 to take advantage of event handling improvements.

**v0.7.0**

- Bumps [templates][] to 0.8.0 to take advantage of `isType` method for checking a collection type, and a number of improvements to how collections and views are instantiated and named.

**v0.6.0**

- Bumps [assemble-fs][] plugin to 0.5.0, which introduces `onStream` and `preWrite` middleware handlers.
- Bumps [templates][] to 0.7.0, which fixes how non-cached collections are initialized. This was done as a minor instead of a patch since - although it's a fix - it could theoretically break someone's setup.

**v0.5.0**

- Bumps [templates][] to latest, 0.6.0, since it uses the latest [base-methods][], which introduces prototype mixins. No API changes.

**v0.4.0**

- Removed [emitter-only][] since it was only includes to be used in the default listeners that were removed in an earlier release. In rare cases this might be a breaking change, but not likely.
- Adds lazy-cache
- Updates [assemble-streams][] plugin to latest
