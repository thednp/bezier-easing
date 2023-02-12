## CubicBezier
[![Coverage Status](https://coveralls.io/repos/github/thednp/bezier-easing/badge.svg)](https://coveralls.io/github/thednp/bezier-easing)
[![ci](https://github.com/thednp/bezier-easing/actions/workflows/ci.yml/badge.svg)](https://github.com/thednp/bezier-easing/actions/workflows/ci.yml)
[![typescript version](https://img.shields.io/badge/typescript-4.9.4-brightgreen)](https://www.typescriptlang.org/)
[![eslint version](https://img.shields.io/badge/eslint-8.30.0-brightgreen)](https://github.com/eslint)
[![prettier version](https://img.shields.io/badge/prettier-2.8.3-brightgreen)](https://prettier.io/)
[![cypress version](https://img.shields.io/badge/cypress-12.4.1-brightgreen)](https://cypress.io/)
[![vite version](https://img.shields.io/badge/vite-4.0.4-brightgreen)](https://github.com/vitejs)

A Typescript sourced cubic-bezier class to create easing functions as used in [KUTE.js](https://github.com/thednp/kute.js). The module is based on UnitBezier by Apple, a piece of code found on [Codepen](https://codepen.io/jwdunn/pen/VJGzNm).

## Install
```js
npm install @thednp/bezier-easing
```

## Usage
```js
import CubicBezier from '@thednp/bezier-easing';

const easeCubicInOut = new CubicBezier(0.645, 0.045, 0.355, 1);

const moveItRight = KUTE.to(
  someTarget,
  { translateX: 150 },
  { easing: easingCubicInOut }
);
```
_Note: if you're using KUTE.js, you don't have to install this module, the above is just an example on what it does and how to use it._

By default, new easing functions get a name with the parameters. EG: `cubic-bezier(0.645,0.045,0.335,1)`

However, you can set your own unique name like so:

```js
const easeCubicInOut = new CubicBezier(0.645, 0.045, 0.355, 1, 'myCubicOut')
```

You can use CubicBezier in combination with other libraries like [D3](https://github.com/d3), [Three.js](https://github.com/mrdoob/three.js), [Tween.js](https://github.com/tweenjs/tween.js) and [GSAP](https://greensock.com/gsap/) of course.

## Run the tests suite (new)
* [Download](https://github.com/thednp/bezier-easing/archive/refs/heads/master.zip) the package from Github;
* unpack/unzip and open the folder with your editor;
* open your terminal and navigate to the root of the unpacked folder;
* run `npm install` or `npm update`, takes a few minutes to download the Electron browser;
* run `npm run cypress` to open the Cypress console OR `npm run test` to run the tests in headless mode.

## License
MIT License