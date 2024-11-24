var m = Object.defineProperty;
var x = (n, e, i) => e in n ? m(n, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : n[e] = i;
var h = (n, e, i) => x(n, typeof e != "symbol" ? e + "" : e, i);
class f {
  constructor(e, i, t, s, l) {
    h(this, "cx");
    h(this, "bx");
    h(this, "ax");
    h(this, "cy");
    h(this, "by");
    h(this, "ay");
    const r = e || 0, a = i || 0, c = t || 1, o = s || 1, p = (b) => typeof b == "number", v = [e, i, t, s].every(p), y = l || (v ? `cubic-bezier(${[r, a, c, o].join(",")})` : "linear");
    this.cx = 3 * r, this.bx = 3 * (c - r) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * a, this.by = 3 * (o - a) - this.cy, this.ay = 1 - this.cy - this.by;
    const u = (b) => this.sampleCurveY(this.solveCurveX(b));
    return Object.defineProperty(u, "name", { writable: !0 }), u.name = y, u;
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
    let t = e, s = 0, l = 0;
    for (let c = 0; c < 8; c += 1) {
      if (s = this.sampleCurveX(t) - e, Math.abs(s) < 1e-6) return t;
      if (l = this.sampleCurveDerivativeX(t), Math.abs(l) < 1e-6) break;
      t -= s / l;
    }
    let r = 0, a = 1;
    for (t = e; r < a; ) {
      if (s = this.sampleCurveX(t), Math.abs(s - e) < 1e-6) return t;
      e > s ? r = t : a = t, t = (a - r) * 0.5 + r;
    }
    return t;
  }
}
export {
  f as default
};
//# sourceMappingURL=bezier-easing.mjs.map
