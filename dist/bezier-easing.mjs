//#region package.json
var e = "1.0.14", t = class {
	static version = e;
	cx;
	bx;
	ax;
	cy;
	by;
	ay;
	constructor(e, t, n, r, i) {
		let a = e || 0, o = t || 0, s = n || 1, c = r || 1, l = [
			e,
			t,
			n,
			r
		].every((e) => typeof e == "number"), u = i || (l ? `cubic-bezier(${[
			a,
			o,
			s,
			c
		].join(",")})` : "linear");
		this.cx = 3 * a, this.bx = 3 * (s - a) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * o, this.by = 3 * (c - o) - this.cy, this.ay = 1 - this.cy - this.by;
		let d = (e) => this.sampleCurveY(this.solveCurveX(e));
		return Object.defineProperty(d, "name", { writable: !0 }), d.name = u, d;
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
		let t = 1e-6;
		if (e <= 0) return 0;
		if (e >= 1) return 1;
		let n = e, r = 0, i = 0;
		for (let a = 0; a < 8; a += 1) {
			if (r = this.sampleCurveX(n) - e, Math.abs(r) < t) return n;
			if (i = this.sampleCurveDerivativeX(n), Math.abs(i) < t) break;
			n -= r / i;
		}
		let a = 0, o = 1;
		for (n = e; a < o;) {
			if (r = this.sampleCurveX(n), Math.abs(r - e) < t) return n;
			e > r ? a = n : o = n, n = (o - a) * .5 + a;
		}
		return n;
	}
};
//#endregion
export { t as default };

//# sourceMappingURL=bezier-easing.mjs.map