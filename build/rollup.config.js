'use strict'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import cleanup from 'rollup-plugin-cleanup'
import json from '@rollup/plugin-json'

const banner = require('./header.js')

export default [
  // UDM Standard Version
  {
    input: 'index.js',
    output: {
      banner: banner('Easing'),
      name: 'CubicBezier',
      file: './dist/cubic-bezier.js',
      format: 'umd', // or iife
      globals: {}
    },
    plugins: [
      json(),
      cleanup(),
      babel({
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
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      minify({
        comments: false
      })      
    ]
  }
]
