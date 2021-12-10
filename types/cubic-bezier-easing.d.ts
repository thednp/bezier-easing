declare module "cubic-bezier-easing/src/cubic-bezier-easing" {
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
declare module "cubic-bezier-easing/dist/cubic-bezier.esm" {
    export default CubicBezier;
    /*!
    * CubicBezier Easing v1.0.14 (https://github.com/thednp/CubicBezier)
    * Copyright 2015-2021 © thednp
    * A simple cubic-bezier easing functions factory for KUTE.js, developed with ES6+ and based on UnitBezier
    * Licensed under MIT (https://github.com/thednp/CubicBezier/blob/master/LICENSE)
    */
    /**
     * Creates cubic-bezier easing functions.
     *
     * @class
     */
    class CubicBezier {
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
declare module "cubic-bezier-easing/types/modules/cubic-bezier-easing" {
    export { default as CubicBezier } from "cubic-bezier-easing/src/cubic-bezier-easing";
    export { default as CubicBezierESM } from "cubic-bezier-easing/dist/cubic-bezier.esm";
}
