declare module "bezier-easing/src/bezier-easing" {
    /**
     * Creates cubic-bezier easing functions.
     *
     * @class
     */
    export default class CubicBezier {
        /**
         * @constructor
         * @param {number} p1x - first point horizontal position
         * @param {number} p1y - first point vertical position
         * @param {number} p2x - second point horizontal position
         * @param {number} p2y - second point vertical position
         * @param {string=} functionName - an optional function name
         * @returns {(t: number) => number} a new CubicBezier easing function
         */
        constructor(p1x: number, p1y: number, p2x: number, p2y: number, functionName?: string | undefined);
        /** @type {number} */
        cx: number;
        /** @type {number} */
        bx: number;
        /** @type {number} */
        ax: number;
        /** @type {number} */
        cy: number;
        /** @type {number} */
        by: number;
        /** @type {number} */
        ay: number;
        /**
         * @param {number} t - progress [0-1]
         * @return {number} - sampled X value
         */
        sampleCurveX(t: number): number;
        /**
         * @param {number} t - progress [0-1]
         * @return {number} - sampled Y value
         */
        sampleCurveY(t: number): number;
        /**
         * @param {number} t - progress [0-1]
         * @return {number} - sampled curve derivative X value
         */
        sampleCurveDerivativeX(t: number): number;
        /**
         * @param {number} x - progress [0-1]
         * @return {number} - solved curve X value
         */
        solveCurveX(x: number): number;
    }
}
declare module "bezier-easing/dist/cubic-bezier.esm" {
    export { default as CubicBezier } from "bezier-easing/src/bezier-easing";
}