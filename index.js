/*!
 * tmp-file <https://github.com/tunnckoCore/tmp-file>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const fs = require('fs')
const tmpFilepath = require('tmp-filepath')

/**
 * > Generates a "file" object with `path`
 * and `contents` properties without writing to disk.
 * Where `file.path` will be random string to OS tmp folder,
 * using [tmp-filepath][]. And `file.contents` will
 * be the passed `contents` or empty string.
 *
 * **Example**
 *
 * ```js
 * const tmp = require('tmp-file')
 *
 * const file = tmp.generateFile('foo bar contents')
 *
 * console.log(file.path) // => '/tmp/cia0ervrm0000vppvw0t61v9m'
 * console.log(file.contents) // => 'foo bar contents'
 * ```
 *
 * @name   .generateFile
 * @param  {String|Buffer} `[contents]` completely optional, string or buffer
 *                                      passed to `fs.writeFile`
 * @return {Object} plain file object
 * @api public
 */

const generateFile = (contents) => {
  const fp = tmpFilepath('.tmp')
  /* istanbul ignore next */
  const data = contents || ''

  return {
    path: fp,
    contents: data
  }
}

/**
 * > Write a temporary file to disk on OS tmp folder.
 * It generates a file object using `.generateFile` method
 * which in turn uses [tmp-filepath][] to generate random
 * filepath to tmp folder.
 *
 * **Note:** This function is exported as `module.exports`,
 * `exports.default` and `exports.writeFile`. If you don't
 * understand what we are talking about, just see the example below.
 *
 * **Example**
 *
 * ```js
 * const tmpFile = require('tmp-file')
 * // or
 * // const tmpFile = require('tmp-file').default
 * // or
 * // const tmpFile = require('tmp-file').writeFile
 *
 * tmpFile('quxie pixie').then((file) => {
 *   console.log(file.path) // => '/tmp/da4sd0e534d0vppvw0t61v9m'
 *   console.log(file.contents) // => 'quxie pixie'
 * })
 * ```
 *
 * @name   .writeFile
 * @param  {String|Buffer} `[contents]` completely optional, string or buffer,
 *                                      passed to `fs.writeFile`
 * @return {Promise} resolved promise with file object
 * @api public
 */

const writeFile = (contents) => {
  return new Promise((resolve, reject) => {
    const file = generateFile(contents)

    fs.writeFile(file.path, file.contents, (err) => {
      /* istanbul ignore next */
      if (err) return reject(err)
      resolve(file)
    })
  })
}

exports.writeFile = writeFile
exports.generateFile = generateFile

writeFile.writeFile = writeFile
writeFile.generateFile = generateFile

module.exports = exports['default'] = writeFile
