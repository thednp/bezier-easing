class y {
  cx;
  bx;
  ax;
  cy;
  by;
  ay;
  constructor(e, n, t, s, a) {
    const i = e || 0, r = n || 0, h = t || 1, u = s || 1, b = (c) => typeof c == "number", o = [e, n, t, s].every(b), p = a || (o ? `cubic-bezier(${[i, r, h, u].join(",")})` : "linear");
    this.cx = 3 * i, this.bx = 3 * (h - i) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * r, this.by = 3 * (u - r) - this.cy, this.ay = 1 - this.cy - this.by;
    const l = (c) => this.sampleCurveY(this.solveCurveX(c));
    return Object.defineProperty(l, "name", { writable: !0 }), l.name = p, l;
  }
  sampleCurveX(e) {
    return ((this.ax * e + this.bx) * e + this.cx) * e;
  }
  sampleCurveY(e) {
    return ((this.ay * e + this.by) * e + this.cy) * e;
  }
  sampleCurveDerivativeX(e) {
    return (3 * this.ax * e + 2 * this.bx) * e + this.cx;
  }
  solveCurveX(e) {
    if (e <= 0) return 0;
    if (e >= 1) return 1;
    let t = e, s = 0, a = 0;
    for (let h = 0; h < 8; h += 1) {
      if (s = this.sampleCurveX(t) - e, Math.abs(s) < 1e-6) return t;
      if (a = this.sampleCurveDerivativeX(t), Math.abs(a) < 1e-6) break;
      t -= s / a;
    }
    let i = 0, r = 1;
    for (t = e; i < r; ) {
      if (s = this.sampleCurveX(t), Math.abs(s - e) < 1e-6) return t;
      e > s ? i = t : r = t, t = (r - i) * 0.5 + i;
    }
    return t;
  }
}
export {
  y as default
};
//# sourceMappingURL=bezier-easing.mjs.map
