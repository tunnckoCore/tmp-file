/*!
 * tmp-file <https://github.com/tunnckoCore/tmp-file>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const fs = require('fs')
const tmpFilepath = require('tmp-filepath')

const generateFile = (contents) => {
  const fp = tmpFilepath('.tmp')
  /* istanbul ignore next */
  const data = contents || ''

  return {
    path: fp,
    contents: data
  }
}

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
