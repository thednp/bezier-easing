'use strict'

const pkg = require('../package.json')
const year = new Date().getFullYear()

function getMiniBanner(bld) {
  return `// CubicBezier ${bld} v${pkg.version} | ${pkg.author} © ${year} | ${pkg.license}-License\n`
}

module.exports = getMiniBanner