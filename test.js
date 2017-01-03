/*!
 * tmp-file <https://github.com/tunnckoCore/tmp-file>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const test = require('mukla')
const rimraf = require('rimraf')
const tmpFile = require('./index')

test('should just generate file object', (done) => {
  const actual = tmpFile.generateFile('foobar')
  test.strictEqual(actual.contents, 'foobar')
  done()
})

test('should return promise with created file on disk', (done) => {
  tmpFile.writeFile('quix').then((file) => {
    test.strictEqual(file.contents, 'quix')
    test.strictEqual(/tmp/.test(file.path), true)
    rimraf.sync(file.path)
    done()
  }).catch(done)
})
