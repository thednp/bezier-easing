var m = Object.defineProperty;
var x = (n, e, s) => e in n ? m(n, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[e] = s;
var h = (n, e, s) => (x(n, typeof e != "symbol" ? e + "" : e, s), s);
class f {
  /**
   * @constructor
   * @param x1 - first point horizontal position
   * @param y1 - first point vertical position
   * @param x2 - second point horizontal position
   * @param y2 - second point vertical position
   * @param functionName - an optional function name
   * @returns a new CubicBezier easing function
   */
  constructor(e, s, t, i, l) {
    h(this, "cx");
    h(this, "bx");
    h(this, "ax");
    h(this, "cy");
    h(this, "by");
    h(this, "ay");
    const r = e || 0, a = s || 0, c = t || 1, o = i || 1, p = (b) => typeof b == "number", v = [e, s, t, i].every(p), y = l || (v ? `cubic-bezier(${[r, a, c, o].join(",")})` : "linear");
    this.cx = 3 * r, this.bx = 3 * (c - r) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * a, this.by = 3 * (o - a) - this.cy, this.ay = 1 - this.cy - this.by;
    const u = (b) => this.sampleCurveY(this.solveCurveX(b));
    return Object.defineProperty(u, "name", { writable: !0 }), u.name = y, u;
  }
  /**
   * @param t - progress [0-1]
   * @return - sampled X value
   */
  sampleCurveX(e) {
    return ((this.ax * e + this.bx) * e + this.cx) * e;
  }
  /**
   * @param t - progress [0-1]
   * @return - sampled Y value
   */
  sampleCurveY(e) {
    return ((this.ay * e + this.by) * e + this.cy) * e;
  }
  /**
   * @param t - progress [0-1]
   * @return - sampled curve derivative X value
   */
  sampleCurveDerivativeX(e) {
    return (3 * this.ax * e + 2 * this.bx) * e + this.cx;
  }
  /**
   * @param x - progress [0-1]
   * @return - solved curve X value
   */
  solveCurveX(e) {
    if (e <= 0)
      return 0;
    if (e >= 1)
      return 1;
    let t = e, i = 0, l = 0;
    for (let c = 0; c < 8; c += 1) {
      if (i = this.sampleCurveX(t) - e, Math.abs(i) < 1e-6)
        return t;
      if (l = this.sampleCurveDerivativeX(t), Math.abs(l) < 1e-6)
        break;
      t -= i / l;
    }
    let r = 0, a = 1;
    for (t = e; r < a; ) {
      if (i = this.sampleCurveX(t), Math.abs(i - e) < 1e-6)
        return t;
      e > i ? r = t : a = t, t = (a - r) * 0.5 + r;
    }
    return t;
  }
}
export {
  f as default
};
//# sourceMappingURL=bezier-easing.mjs.map
