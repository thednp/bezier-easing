import type { BezierEasingFunction } from '../../src/easing-function';

const tweens: Tween[] = [];
let tick = 0;

const ticker = (t?: number) => {
  let i = 0;
  while (i < tweens.length) {
    if (tweens[i].update(t || 0)) {
      i += 1;
    } else {
      tweens.splice(i, 1);
    }
  }
  tick = requestAnimationFrame(ticker);
};

export default class Tween {
  element: HTMLElement;
  propsStart: Record<string, number>;
  propsEnd: Record<string, number>;
  duration: number;
  easing: BezierEasingFunction;
  startTime: number;
  _onUpdate: (this: Tween, t: number) => void;

  constructor(
    element: HTMLElement,
    propsStart: Record<string, number>,
    propsEnd: Record<string, number>,
    duration: number,
    easing: BezierEasingFunction,
  ) {
    this.startTime = 0;
    this.element = element;
    this.propsStart = propsStart;
    this.propsEnd = propsEnd;
    this.duration = duration || 700;
    this.easing = easing || 'linear';
    this._onUpdate = () => null;
    return this;
  }
  start(t?: number) {
    tweens.push(this);
    this.startTime = t || window.performance.now();
    if (!tick) ticker();
    return this;
  }
  update(t: number) {
    const { duration, easing, startTime } = this;
    const time = t || window.performance.now();
    let elapsed = 0;

    if (time < this.startTime) {
      return true;
    }

    elapsed = (time - startTime) / duration;
    elapsed = duration === 0 || elapsed > 1 ? 1 : elapsed;
    const progress = easing(elapsed);

    if (typeof this._onUpdate === 'function') {
      this._onUpdate.call(this, progress);
    }

    if (elapsed === 1) {
      if (tick && !tweens.length) {
        cancelAnimationFrame(tick);
      }
      return false;
    }
    return true;
  }

  onUpdate(onUpdate: (this: Tween, t: number) => void) {
    this._onUpdate = onUpdate;
    return this;
  }
}
