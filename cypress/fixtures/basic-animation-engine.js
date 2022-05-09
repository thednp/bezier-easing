const tweens = [];
let tick = 0;

function ticker(t) {
  let i = 0;
  while (i < tweens.length) {
    if (tweens[i].update(t)) {
      i += 1;
    } else {
      tweens.splice(i, 1);
    }
  }
  tick = requestAnimationFrame(ticker);
}

export default class Tween {
  constructor(element, propsStart, propsEnd, duration, easing) {
    this.element = element;
    this.propsStart = propsStart;
    this.propsEnd = propsEnd;
    this.duration = duration || 700;
    this.easing = easing || 'linear';
    return this;
  }
  start(t){
    tweens.push(this);
    this.startTime = t || window.performance.now();
    if (!tick) ticker();
    return this;
  }
  update(t) {
    const { duration, easing, startTime } = this;
    const time = t || window.performance.now();
    let elapsed = 0;

    if (time < this.startTime) { return true; }

    elapsed = (time - startTime) / duration;
    elapsed = (duration === 0 || elapsed > 1) ? 1 : elapsed;
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

  onUpdate(onUpdate){
    this._onUpdate = onUpdate;
    return this;
  }
}