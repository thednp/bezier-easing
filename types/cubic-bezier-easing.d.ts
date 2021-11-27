export default class CubicBezier {
    constructor(p1x: number, p1y: number, p2x: number, p2y: number, functionName: string);
    cx: number;
    bx: number;
    ax: number;
    cy: number;
    by: number;
    ay: number;
    sampleCurveX(t: number): number;
    sampleCurveY(t: number): number;
    sampleCurveDerivativeX(t: number): number;
    solveCurveX(x: number): number;
}
