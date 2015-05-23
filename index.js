/*!
 * tmp-file <https://github.com/tunnckoCore/tmp-file>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict'

var gfs = require('graceful-fs')
var Vinyl = require('vinyl')
var through2 = require('through2')
var hybridify = require('hybridify')
var filepath = require('tmp-filepath')

module.exports = tmpFile

function tmpFile (callback) {
  var vinyl = generate('.js')

  if (typeof callback !== 'function') {
    gfs.writeFileSync(vinyl.path, vinyl.contents)
    return vinyl
  }

  gfs.writeFile(vinyl.path, vinyl.contents, function (err) {
    err ? callback(err) : callback(null, vinyl)
  })
  return vinyl
}

function generate (ext) {
  var fp = filepath(ext)
  var data = 'module.exports = "' + fp + '"'

  return {path: fp, contents: new Buffer(data)}
}

tmpFile.generate = generate

tmpFile.vinyl = function tmpVinyl () {
  var vinyl = generate('.js')
  return new Vinyl(vinyl)
}

tmpFile.stream = function tmpStream (ext) {
  var vinyl = tmpFile()
  return gfs.createReadStream(vinyl.path)
  .pipe(through2.obj(function (buf, enc, next) {
    this.push(vinyl)
    next()
  }))
}

tmpFile.promise = function tmpPromise () {
  return hybridify(tmpFile)
}
