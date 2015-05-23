# tmp-file [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url]

> Create actual and temporary file on disk - support stream, sync, gulp, vinyl and async. Returns partially Record/Vinyl File Object

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i tmp-file --save
npm test
```


## Usage
> For more use-cases see the [tests](./test.js)

### [tmpFile](./index.js#L36)
> Creating temporary file and write to disk

- `[callback]` **{Function}** optionally pass callback, otherwise it is sync
- `returns` **{Object}** with `.path` and `.contents` properties

**Example**
```js
var tmpFile = require('tmp-file')

var file = tmpFile()
console.log(file)
//=> { path: '/tmp/cia11kqlt0009tfpvp07inq9f.js',
//  contents: <Buffer ...> }
```

### [.generate](./index.js#L67)
> Generate virtual file object without writing to disk

- `[ext]` **{String}** extension to append to filepath
- `returns` **{Object}** with `.path` and `.contents` properties

**Example**
```js
var tmpFile = require('tmp-file')

var file = tmpFile.generate()
console.log(file)
//=> { path: '/tmp/cia11kqlt0009tfpvp07inq9f.js',
//  contents: <Buffer ...> }
```

### [.vinyl](./index.js#89)
> Create Vinyl File object

- `returns` **{Object|Vinyl}** object that is compitable with Vinyl File Format

**Example**
```js
var tmpFile = require('tmp-file')

var file = tmpFile.vinyl()
console.log(file)
//=> <File "../../../../tmp/cia11zwn00000mjpvom4ioitr.js" <Buffer ... >>
```

### [.stream](./index.js#L114)
> Create temp file as stream and write it to disk

- `returns` **{Stream}** through2 stream in object mode, can be used in gulp

**Example**
```js
var tmpFile = require('tmp-file')
var stream = tmpFile.stream()

stream
.pipe(through2.obj(function (file, enc, next) {
  console.log(file)
  //=> { path: '/tmp/cia123v5d0004u7pvfa01sjq9.js',
  //  contents: <Buffer ...> }
  next()
})
```

### [.gulp](./index.js#L140)
> Create temp file as gulp and write it to disk

- `returns` **{Stream}** through2 gulp in object mode, can be used in gulp

**Example**
```js
var tmpFile = require('tmp-file')
var gulp = tmpFile.gulp()

gulp
.pipe(through2.obj(function (file, enc, next) {
  console.log(file)
  //=> <File "../../../../tmp/cia1arvm000066rpv0dqfzy7u.js" <Buffer ... >>
  next()
})
```

### [.promise](./index.js#L172)
> Create hybrid temp file with hybridify

- `returns` **{Promise}** promise/hybrid

**Example**
```js
var tmpFile = require('tmp-file')
var hybrid = tmpFile.promise()

hybrid(function (err, file) {
  console.log(file)
  //=> { path: '/tmp/cia128gmg000721pvndiq2d53.js',
  //  contents: <Buffer ...> }
})
.then(function (file) {
  console.log(file)
  //=> { path: '/tmp/cia128gmg000721pvndiq2d53.js',
  //  contents: <Buffer ...> }
})
.catch(console.error)
```


## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/tmp-file/issues/new).
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/tmp-file
[npmjs-img]: https://img.shields.io/npm/v/tmp-file.svg?label=tmp-file

[license-url]: https://github.com/tunnckoCore/tmp-file/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/tmp-file
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/tmp-file.svg

[travis-url]: https://travis-ci.org/tunnckoCore/tmp-file
[travis-img]: https://img.shields.io/travis/tunnckoCore/tmp-file.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/tmp-file
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/tmp-file.svg

[david-url]: https://david-dm.org/tunnckoCore/tmp-file
[david-img]: https://img.shields.io/david/tunnckoCore/tmp-file.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg
