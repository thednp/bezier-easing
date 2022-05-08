export as namespace CubicBezier;
export default CubicBezier;

import {default as CubicBezier} from "cubic-bezier-easing/src/cubic-bezier-easing";

declare module "@thednp/color-picker" {
  export default CubicBezier;
}