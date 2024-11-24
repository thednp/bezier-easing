export interface BezierEasingFunction {
  (t: number): number;
  name: string;
  cx: number;
  bx: number;
  ax: number;
  cy: number;
  by: number;
  ay: number;
  sampleCurveX: (x: number) => number;
  sampleCurveY: (x: number) => number;
  sampleCurveDerivativeX: (x: number) => number;
  solveCurveX: (x: number) => number;
}
