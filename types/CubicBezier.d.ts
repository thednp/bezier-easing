export default class CubicBezier {
    constructor(p1x: any, p1y: any, p2x: any, p2y: any, functionName: any);
    cx: number;
    bx: number;
    ax: number;
    cy: number;
    by: number;
    ay: number;
    sampleCurveX(t: any): number;
    sampleCurveY(t: any): number;
    sampleCurveDerivativeX(t: any): number;
    solveCurveX(x: any): any;
}
