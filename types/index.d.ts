export as namespace CubicBezier;
export default CubicBezier;

import {default as CubicBezier} from "bezier-easing/src/bezier-easing";

declare module "@thednp/bezier-easing" {
  export default CubicBezier;
}