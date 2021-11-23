/*!
* CubicBezier Easing v1.0.10 (https://github.com/thednp/CubicBezier)
* Copyright 2015-2021 © thednp
* A simple cubic-bezier easing functions factory for KUTE.js, developed with ES6+ and based on UnitBezier
* Licensed under MIT (https://github.com/thednp/CubicBezier/blob/master/LICENSE)
*/
/**
 * Creates cubic-bezier easing functions.
 *
 * @class
 */
class CubicBezier {
  /**
   * @constructor
   * @param {number} p1x - first point horizontal position
   * @param {number} p1y - first point vertical position
   * @param {number} p2x - second point horizontal position
   * @param {number} p2y - second point vertical position
   * @param {string} functionName - an optional function name
   */
  constructor(p1x, p1y, p2x, p2y, functionName) {
    // pre-calculate the polynomial coefficients
    // First and last control points are implied to be (0,0) and (1.0, 1.0)
  
    /** @type {number} */
    this.cx = 3.0 * p1x;
  
    /** @type {number} */
    this.bx = 3.0 * (p2x - p1x) - this.cx;

    /** @type {number} */
    this.ax = 1.0 - this.cx - this.bx;
    
    /** @type {number} */
    this.cy = 3.0 * p1y;
  
    /** @type {number} */
    this.by = 3.0 * (p2y - p1y) - this.cy;
  
    /** @type {number} */
    this.ay = 1.0 - this.cy - this.by;
    
    /** @type {Function} */
    const BezierEasing = (t) => this.sampleCurveY(this.solveCurveX(t));

    // this function needs a name
    Object.defineProperty(BezierEasing, 'name', { writable: true });
    BezierEasing.name = functionName || `cubic-bezier(${[p1x, p1y, p2x, p2y]})`;

    return BezierEasing;
  }

  /**
   * @param {number} t - progress [0-1]
   * @return {number} - sampled X value
   */
  sampleCurveX(t) {
    return ((this.ax * t + this.bx) * t + this.cx) * t;
  }

  /**
   * @param {number} t - progress [0-1]
   * @return {number} - sampled Y value
   */
  sampleCurveY(t) {
    return ((this.ay * t + this.by) * t + this.cy) * t;
  }

  /**
   * @param {number} t - progress [0-1]
   * @return {number} - sampled curve derivative X value
   */
  sampleCurveDerivativeX(t) {
    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
  }

  /**
   * @param {number} x - progress [0-1]
   * @return {number} - solved curve X value
   */
  solveCurveX(x) {
    let t0;
    let t1;
    let t2;
    let x2;
    let d2;
    let i;
    const epsilon = 1e-5; // Precision

    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 32; i += 1) {
      x2 = this.sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) return t2;
      d2 = this.sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < epsilon) break;
      t2 -= x2 / d2;
    }

    // No solution found - use bi-section
    t0 = 0.0;
    t1 = 1.0;
    t2 = x;

    if (t2 < t0) return t0;
    if (t2 > t1) return t1;

    while (t0 < t1) {
      x2 = this.sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) return t2;
      if (x > x2) t0 = t2;
      else t1 = t2;

      t2 = (t1 - t0) * 0.5 + t0;
    }

    // Give up
    return t2;
  }
}

var version = "1.0.10";

// @ts-ignore

/**
 * A global namespace for library version.
 * @type {string}
 */
const Version = version;

CubicBezier.Version = Version;

export default CubicBezier;
