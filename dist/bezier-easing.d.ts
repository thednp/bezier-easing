/**
 * Creates cubic-bezier easing functions for animation engines.
 *
 * @see http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/UnitBezier.h
 *
 * @class
 */
export default class CubicBezier {
	cx: number;
	bx: number;
	ax: number;
	cy: number;
	by: number;
	ay: number;
	/**
	 * @constructor
	 * @param x1 - first point horizontal position
	 * @param y1 - first point vertical position
	 * @param x2 - second point horizontal position
	 * @param y2 - second point vertical position
	 * @param functionName - an optional function name
	 * @returns a new CubicBezier easing function
	 */
	constructor(x1?: number, y1?: number, x2?: number, y2?: number, functionName?: string);
	/**
	 * @param t - progress [0-1]
	 * @return - sampled X value
	 */
	sampleCurveX(t: number): number;
	/**
	 * @param t - progress [0-1]
	 * @return - sampled Y value
	 */
	sampleCurveY(t: number): number;
	/**
	 * @param t - progress [0-1]
	 * @return - sampled curve derivative X value
	 */
	sampleCurveDerivativeX(t: number): number;
	/**
	 * @param x - progress [0-1]
	 * @return - solved curve X value
	 */
	solveCurveX(x: number): number;
}

export as namespace CubicBezier;

export {};
