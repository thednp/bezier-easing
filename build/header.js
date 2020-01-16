'use strict'

const pkg = require('../package.json')
const year = new Date().getFullYear()

// const args = process.argv;

function getBanner(bld) {
  return `/*!
  * CubicBezier ${bld} v${pkg.version} (${pkg.homepage})
  * Copyright 2015-${year} © ${pkg.author}
  * ${pkg.description}
  * Licensed under MIT (https://github.com/thednp/CubicBezier/blob/master/LICENSE)
  */`
}

module.exports = getBanner