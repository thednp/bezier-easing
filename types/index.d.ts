export as namespace CubicBezier;
export default CubicBezier;

import {default as CubicBezier} from "cubic-bezier-easing/src/cubic-bezier-easing";

// alias
declare module "cubic-bezier-easing/dist/cubic-bezier-easing.esm" {
  export { default as CubicBezier } from "cubic-bezier-easing/src/cubic-bezier-easing";
}