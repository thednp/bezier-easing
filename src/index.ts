import type { BezierEasingFunction } from './easing-function';

/**
 * Creates cubic-bezier easing functions for animation engines.
 *
 * @see http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/UnitBezier.h
 *
 * @class
 */
export default class CubicBezier {
  public cx: number;
  public bx: number;
  public ax: number;
  public cy: number;
  public by: number;
  public ay: number;
  /**
   * @constructor
   * @param x1 - first point horizontal position
   * @param y1 - first point vertical position
   * @param x2 - second point horizontal position
   * @param y2 - second point vertical position
   * @param functionName - an optional function name
   * @returns a new CubicBezier easing function
   */
  constructor(x1?: number, y1?: number, x2?: number, y2?: number, functionName?: string) {
    // pre-calculate the polynomial coefficients
    // First and last control points are implied to be (0.0, 0.0) and (1.0, 1.0)
    const p1x = x1 || 0;
    const p1y = y1 || 0;
    const p2x = x2 || 1;
    const p2y = y2 || 1;
    const isNumber = (n: unknown): n is number => typeof n === 'number';
    const allNumbers = [x1, y1, x2, y2].every(isNumber);
    const name = functionName
      ? functionName
      : allNumbers
      ? `cubic-bezier(${[p1x, p1y, p2x, p2y].join(',')})`
      : 'linear';

    this.cx = 3 * p1x;
    this.bx = 3 * (p2x - p1x) - this.cx;
    this.ax = 1 - this.cx - this.bx;
    this.cy = 3 * p1y;
    this.by = 3 * (p2y - p1y) - this.cy;
    this.ay = 1 - this.cy - this.by;

    const BezierEasing = (t: number) => this.sampleCurveY(this.solveCurveX(t));

    // this function needs a name
    Object.defineProperty(BezierEasing, 'name', { writable: true });
    BezierEasing.name = name;

    return BezierEasing as BezierEasingFunction;
  }

  /**
   * @param t - progress [0-1]
   * @return - sampled X value
   */
  sampleCurveX(t: number) {
    return ((this.ax * t + this.bx) * t + this.cx) * t;
  }

  /**
   * @param t - progress [0-1]
   * @return - sampled Y value
   */
  sampleCurveY(t: number) {
    return ((this.ay * t + this.by) * t + this.cy) * t;
  }

  /**
   * @param t - progress [0-1]
   * @return - sampled curve derivative X value
   */
  sampleCurveDerivativeX(t: number) {
    return (3 * this.ax * t + 2 * this.bx) * t + this.cx;
  }

  /**
   * @param x - progress [0-1]
   * @return - solved curve X value
   */
  solveCurveX(x: number) {
    // Set Precision
    const epsilon = 1e-6;

    // Skip values out of range
    if (x <= 0) return 0;
    if (x >= 1) return 1;

    let t2 = x;
    let x2 = 0;
    let d2 = 0;

    // First try a few iterations of Newton's method
    // -- usually very fast.
    for (let i = 0; i < 8; i += 1) {
      x2 = this.sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) return t2;
      d2 = this.sampleCurveDerivativeX(t2);
      /* istanbul ignore next */
      if (Math.abs(d2) < epsilon) break;
      t2 -= x2 / d2;
    }

    // No solution found - use bi-section
    let t0 = 0;
    let t1 = 1;
    t2 = x;

    while (t0 < t1) {
      x2 = this.sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) return t2;
      if (x > x2) t0 = t2;
      else t1 = t2;

      t2 = (t1 - t0) * 0.5 + t0;
    }

    // Give up
    /* istanbul ignore next */
    return t2;
  }
}
