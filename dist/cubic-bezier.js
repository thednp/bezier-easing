/*!
  * CubicBezier Easing v1.0.1 (https://github.com/thednp/CubicBezier)
  * Copyright 2015-2020 © thednp
  * A simple cubic-bezier easing functions factory for KUTE.js, developed with ES6/ES7 and based on UnitBezier
  * Licensed under MIT (https://github.com/thednp/CubicBezier/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.CubicBezier = factory());
}(this, (function () { 'use strict';

  class CubicBezier {
    constructor(p1x, p1y, p2x, p2y, functionName) {
      this.cx = 3.0 * p1x;
      this.bx = 3.0 * (p2x - p1x) - this.cx;
      this.ax = 1.0 - this.cx - this.bx;
      this.cy = 3.0 * p1y;
      this.by = 3.0 * (p2y - p1y) - this.cy;
      this.ay = 1.0 - this.cy - this.by;

      let BesierEasing = t => {
        return this.sampleCurveY(this.solveCurveX(t));
      };

      Object.defineProperty(BesierEasing, 'name', {
        writable: true
      });
      BesierEasing.name = functionName ? functionName : `cubic-bezier(${[p1x, p1y, p2x, p2y]})`;
      return BesierEasing;
    }

    sampleCurveX(t) {
      return ((this.ax * t + this.bx) * t + this.cx) * t;
    }

    sampleCurveY(t) {
      return ((this.ay * t + this.by) * t + this.cy) * t;
    }

    sampleCurveDerivativeX(t) {
      return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
    }

    solveCurveX(x) {
      let t0,
          t1,
          t2,
          x2,
          d2,
          i,
          epsilon = 1e-5;

      for (t2 = x, i = 0; i < 32; i++) {
        x2 = this.sampleCurveX(t2) - x;
        if (Math.abs(x2) < epsilon) return t2;
        d2 = this.sampleCurveDerivativeX(t2);
        if (Math.abs(d2) < epsilon) break;
        t2 = t2 - x2 / d2;
      }

      t0 = 0.0;
      t1 = 1.0;
      t2 = x;
      if (t2 < t0) return t0;
      if (t2 > t1) return t1;

      while (t0 < t1) {
        x2 = this.sampleCurveX(t2);
        if (Math.abs(x2 - x) < epsilon) return t2;
        if (x > x2) t0 = t2;else t1 = t2;
        t2 = (t1 - t0) * .5 + t0;
      }

      return t2;
    }

  }
  module.exports = CubicBezier;

  return CubicBezier;

})));
