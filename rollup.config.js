'use strict'
import buble from '@rollup/plugin-buble'
import {terser} from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import json from '@rollup/plugin-json'
import * as pkg from "./package.json";

const year = (new Date).getFullYear()

const banner = `/*!
* CubicBezier Easing v${pkg.version} (${pkg.homepage})
* Copyright 2015-${year} © ${pkg.author}
* ${pkg.description}
* Licensed under MIT (https://github.com/thednp/CubicBezier/blob/master/LICENSE)
*/`

const miniBanner = `// CubicBezier Easing v${pkg.version} | ${pkg.author} © ${year} | ${pkg.license}-License`

export default [
  // UDM Standard Version
  {
    input: 'index.js',
    output: {
      banner: banner,
      name: 'CubicBezier',
      file: './dist/cubic-bezier.js',
      format: 'umd', // or iife
      globals: {}
    },
    plugins: [
      json(),
      cleanup(),
      buble({
        exclude: 'node_modules/**' // only transpile our source code
      })
    ]
  },
  // UDM Standard Minified Version
  {
    input: 'index.js',
    output: {
      name: 'CubicBezier',
      file: './dist/cubic-bezier.min.js',
      format: 'umd', // or iife 
      globals: {}
    },
    plugins: [
      json(),
      buble({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      terser({output: {preamble: miniBanner}})
    ]
  }
]
