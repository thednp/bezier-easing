'use strict'

const fs = require('fs')
const pkg = require('../package.json')
const miniBanner = require('./header-mini.js')
const args = process.argv;

function addHeader(src,bld) {

  console.log(`Adding header to "${src}" file v${pkg.version}..`);

  fs.writeFile(src, 
    (miniBanner(bld) + fs.readFileSync(src)), 
    function (err) {
      if (err) return handleError(err);
      console.log(`File "${src}" looks nice.`);
    }
  );
}

function handleError(err) {
  console.error(err);
  process.exit(1);
}

// Add header to minified build
addHeader(args[2],args[3])

module.exports = addHeader