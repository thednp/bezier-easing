/*!
* CubicBezier Easing v1.0.1 (https://github.com/thednp/bezier-easing)
* Copyright 2015-2022 © thednp
* A simple cubic-bezier easing functions factory for KUTE.js, developed with ES6+ and based on UnitBezier
* Licensed under MIT (https://github.com/thednp/bezier-easing/blob/master/LICENSE)
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.dll = factory());
}(this, (function () { 'use strict';

  /**
   * Creates cubic-bezier easing functions for animation engines.
   * @see http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/UnitBezier.h
   * 
   *
   * @class
   */
  var CubicBezier = function CubicBezier(x1, y1, x2, y2, functionName) {
    var this$1 = this;

    // pre-calculate the polynomial coefficients
    // First and last control points are implied to be (0.0, 0.0) and (1.0, 1.0)
    var p1x = x1 || 0;
    var p1y = y1 || 0;
    var p2x = x2 || 1;
    var p2y = y2 || 1;
    
    /** @type {number} */
    this.cx = 3 * p1x;
    
    /** @type {number} */
    this.bx = 3 * (p2x - p1x) - this.cx;

    /** @type {number} */
    this.ax = 1 - this.cx - this.bx;
      
    /** @type {number} */
    this.cy = 3 * p1y;
    
    /** @type {number} */
    this.by = 3 * (p2y - p1y) - this.cy;
    
    /** @type {number} */
    this.ay = 1 - this.cy - this.by;
      
    /** @type {(t: number) => number} */
    var BezierEasing = function (t) { return this$1.sampleCurveY(this$1.solveCurveX(t)); };

    // this function needs a name
    Object.defineProperty(BezierEasing, 'name', { writable: true });
    BezierEasing.name = functionName || ("cubic-bezier(" + ([p1x, p1y, p2x, p2y]) + ")");

    return BezierEasing;
  };

  /**
   * @param {number} t - progress [0-1]
   * @return {number} - sampled X value
   */
  CubicBezier.prototype.sampleCurveX = function sampleCurveX (t) {
    return ((this.ax * t + this.bx) * t + this.cx) * t;
  };

  /**
   * @param {number} t - progress [0-1]
   * @return {number} - sampled Y value
   */
  CubicBezier.prototype.sampleCurveY = function sampleCurveY (t) {
    return ((this.ay * t + this.by) * t + this.cy) * t;
  };

  /**
   * @param {number} t - progress [0-1]
   * @return {number} - sampled curve derivative X value
   */
  CubicBezier.prototype.sampleCurveDerivativeX = function sampleCurveDerivativeX (t) {
    return (3 * this.ax * t + 2 * this.bx) * t + this.cx;
  };

  /**
   * @param {number} x - progress [0-1]
   * @return {number} - solved curve X value
   */
  CubicBezier.prototype.solveCurveX = function solveCurveX (x) {
    // Set Precision
    var epsilon = 1e-6;

    // Skip values out of range
    if (x <= 0) { return 0; }
    if (x >= 1) { return 1; }

    var t2 = x;
    var x2 = 0;
    var d2 = 0;

    // First try a few iterations of Newton's method
    // -- usually very fast.
    for (var i = 0; i < 8; i += 1) {
      x2 = this.sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) { return t2; }
      d2 = this.sampleCurveDerivativeX(t2);
      /* istanbul ignore next */
      if (Math.abs(d2) < epsilon) { break; }
      t2 -= x2 / d2;
    }

    // No solution found - use bi-section
    var t0 = 0;
    var t1 = 1;
    t2 = x;

    while (t0 < t1) {
      x2 = this.sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) { return t2; }
      if (x > x2) { t0 = t2; }
      else { t1 = t2; }

      t2 = (t1 - t0) * 0.5 + t0;
    }

    // Give up
    /* istanbul ignore next */
    return t2;
  };

  var version = "1.0.1";

  /**
   * A global namespace for library version.
   * @type {string}
   */
  var Version = version;

  /** @typedef {import('../types/index')} */

  Object.assign(CubicBezier, { Version: Version });

  return CubicBezier;

})));
