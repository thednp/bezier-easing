'use strict';

import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import * as pkg from './package.json';

const year = (new Date()).getFullYear();

const banner = `/*!
* CubicBezier Easing v${pkg.version} (${pkg.homepage})
* Copyright 2015-${year} © ${pkg.author}
* ${pkg.description}
* Licensed under MIT (${pkg.homepage}/blob/master/LICENSE)
*/`;

const miniBanner = `// CubicBezier Easing v${pkg.version} | ${pkg.author} © ${year} | ${pkg.license}-License`;
// set config
const MIN = process.env.MIN === 'true'; // true/false|unset
const { FORMAT } = process.env; // umd|iife|esm|cjs

const INPUTFILE = process.env.INPUTFILE ? process.env.INPUTFILE : 'src/index.js';
let OUTPUTFILE = FORMAT === 'umd' ? `./dist/bezier-easing${MIN ? '.min' : ''}.js` : `./dist/bezier-easing.esm${MIN ? '.min' : ''}.js`;

if (process.env.OUTPUTFILE) OUTPUTFILE = process.env.OUTPUTFILE;

const OUTPUT = {
  file: OUTPUTFILE,
  format: FORMAT, // or iife
};

const PLUGINS = [
  json(),
];

if (FORMAT !== 'esm') {
  PLUGINS.push(buble());
}

if (MIN) {
  PLUGINS.push(terser({ output: { preamble: miniBanner } }));
} else {
  OUTPUT.banner = banner;
  // PLUGINS.push(cleanup());
}

if (FORMAT !== 'esm') {
  OUTPUT.name = 'dll';
}

export default [
  {
    input: INPUTFILE,
    output: OUTPUT,
    plugins: PLUGINS,
  },
];
