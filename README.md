# CubicBezier
[![Coverage Status](https://coveralls.io/repos/github/thednp/bezier-easing/badge.svg)](https://coveralls.io/github/thednp/bezier-easing)
![cypress version](https://img.shields.io/badge/cypress-9.6.0-brightgreen)
![typescript version](https://img.shields.io/badge/typescript-4.5.2-brightgreen)
[![ci](https://github.com/thednp/CubicBezier/actions/workflows/ci.yml/badge.svg)](https://github.com/thednp/CubicBezier/actions/workflows/ci.yml)

A JavaScript ES6/ES7 cubic-bezier class to create easing functions as used in [KUTE.js](https://github.com/thednp/kute.js). The module is based on UnitBezier by Apple, a piece of code found on [Codepen](https://codepen.io/jwdunn/pen/VJGzNm).

# Install
```js
npm install @thednp/bezier-easing
```

# Usage
```js
import CubicBezier from '@thednp/bezier-easing'

let easeCubicInOut = new CubicBezier(0.645, 0.045, 0.355, 1)

let moveItRight = KUTE.to(someTarget,{translateX:150}, {easing: easingCubicInOut})
```
_Note: if you're using KUTE.js, you don't have to install this module, the above is just an example on what it does and how to use it._

By default, new easing functions get a name with the parameters. EG: `cubic-bezier(0.645,0.045,0.335,1)`

However, you can set your own unique name like so:

```js
let easeCubicInOut = new CubicBezier(0.645, 0.045, 0.355, 1, 'myCubicOut')
```

You can use CubicBezier in combination with other libraries like [D3](https://github.com/d3), [Three.js](https://github.com/mrdoob/three.js), [Tween.js](https://github.com/tweenjs/tween.js) and [GSAP](https://greensock.com/gsap/) of course.

# License
MIT License