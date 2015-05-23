/*!
 * tmp-file <https://github.com/tunnckoCore/tmp-file>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var gfs = require('graceful-fs')
var test = require('assertit')
var isPromise = require('is-promise')
var isStream = require('is-stream')
var through2 = require('through2')
var osTmpdir = require('os-tmpdir')
var tmpFile = require('./index')

function tryStatSync (fp) {
  try {
    return gfs.statSync(fp).isFile()
  } catch(err) {
    return false
  }
}

test('tmp-file:', function () {
  test('should return real vinyl file object on .vinyl()', function (done) {
    var tmp = tmpFile.vinyl()
    var actual = tmp.path.indexOf(osTmpdir()) !== -1
    var expected = true

    var exist = tryStatSync(tmp.path)

    test.ok(tmp.path, 'should have .path property')
    test.ok(tmp.contents, 'should have .contents property')
    test.equal(actual, expected, 'should have /tmp at returned .path')
    test.equal(exist, false, 'should file not exist on disk')
    done()
  })

  test('should write file to disk and return .path and .contents (sync)', function (done) {
    var tmp = tmpFile()
    var actual = tryStatSync(tmp.path)
    var expected = true

    test.ok(tmp.path, 'should have .path property')
    test.ok(tmp.contents, 'should have .contents property')
    test.equal(actual, expected, 'should filepath exists')
    done()
  })

  test('should async write file to disk and have .path and .contents', function (done) {
    test.equal(typeof tmpFile(function (err, tmp) {
      if (err) {
        return done(err)
      }
      var isFile = tryStatSync(tmp.path)
      var actual = tmp.path.indexOf(osTmpdir()) !== -1
      var expected = true

      test.ok(tmp.path, 'should have .path property')
      test.ok(tmp.contents, 'should have .contents property')
      test.equal(isFile, true, 'should filepath exists')
      test.equal(actual, expected, 'should have /tmp at returned .path')
      done()
    }), 'object')
  })

  test('should be (readable) stream when .stream()', function (done) {
    var stream = tmpFile.stream()

    test.equal(isStream(stream), true, 'should be stream')
    test.equal(isStream.readable(stream), true, 'should be readable stream')
    done()
  })

  test('should be readable stream in object mode with file object', function (done) {
    var stream = tmpFile.stream()

    stream
    .pipe(through2.obj(function (file, enc, next) {
      var actual = file.path.indexOf(osTmpdir()) !== -1
      var expected = true

      var exist = tryStatSync(file.path)

      test.ok(file.path, 'should have .path property')
      test.ok(file.contents, 'should have .contents property')
      test.equal(actual, expected, 'should have /tmp at returned .path')
      test.equal(exist, true, 'should file exist on disk')
      done()
    }))
    .on('error', done)
  })

  test('should be promise and hybrid when .promise()', function (done) {
    var hybrid = tmpFile.promise()
    var actual = isPromise(hybrid())
    var expected = true

    test.equal(actual, expected, 'should be promise')
    test.equal(typeof hybrid.hybridify, 'function', 'should be hybrid')
    test.equal(typeof hybrid().hybridify, 'function', 'should be hybrid')
    done()
  })

  test('should promise/hybrid have .path and .contents with .promise()', function (done) {
    var hybrid = tmpFile.promise()

    hybrid()
    .then(function (file) {
      var actual = file.path.indexOf(osTmpdir()) !== -1
      var expected = true

      test.ok(file.path, 'should have .path property')
      test.ok(file.contents, 'should have .contents property')
      test.equal(actual, expected, 'should have /tmp at returned .path')
      done()
    })
    .catch(done)
  })

  test('should file exist on disk when .promise() with callback style', function (done) {
    var hybrid = tmpFile.promise()
    var cnt = 0

    hybrid(function (err, file) {
      if (err) {
        return done(err)
      }

      var actual = tryStatSync(file.path)
      var expected = true

      test.equal(actual, expected, 'should file exist on disk')
      cnt++
      done()
    })
    .then(function () {
      cnt++
      test.equal(cnt, 2, 'should be able to work as callback and promise')
      done()
    })
    .catch(done)
  })

  test('should have .generate() method and not write file to disk', function (done) {
    var vinyl = tmpFile.generate()

    var actual = vinyl.path.indexOf(osTmpdir()) !== -1
    var expected = true

    var exist = tryStatSync(vinyl.path)

    test.ok(vinyl.path, 'should have .path property')
    test.ok(vinyl.contents, 'should have .contents property')
    test.equal(actual, expected, 'should have /tmp at returned .path')
    test.equal(exist, false, 'should not write file to disk')
    done()
  })
})
