import { expect, it, describe } from 'vitest';
import { getByText, waitFor } from '@testing-library/dom';

import CubicBezier from '../src';
import round4 from './fixtures/round4';
import Tween from './fixtures/basic-animation-engine';
import easingParams from './fixtures/easing-params';
import type { BezierEasingFunction } from '../src/easing-function';

const getExampleDOM = () => {
  // This is just a raw example of setting up some DOM
  // that we can interact with. Swap this with your UI
  // framework of choice 😉
  const div = document.createElement('div');
  div.innerHTML = `<button>Test</button>`;

  // const button = div.querySelector('button')
  return div;
};

describe('CubicBezier Class Test', () => {
  it('Can do basic function, no parameters => linear', () => {
    const linear = new CubicBezier() as BezierEasingFunction;
    expect(linear.name).to.equal('linear');

    [0, 0.25, 0.5, 0.75, 1].forEach(step => {
      expect(round4(linear(step))).to.equal(step);
    });
  });

  it('Can do basic function, cubicOut', () => {
    const cubicOut = new CubicBezier(...easingParams[3], 'cubicOut') as BezierEasingFunction;
    expect(cubicOut.name).to.equal('cubicOut');

    [0, 0.25, 0.5, 0.75, 1].forEach(step => {
      const roundedValue = round4(cubicOut(step));
      if ([0, 1].includes(step)) {
        expect(roundedValue).to.equal(step);
      } else {
        expect(roundedValue).to.not.equal(step);
      }
    });
  });

  easingParams.forEach((params, i) => {
    it(`Can do basic animation #${i}`, async () => {
      const container = getExampleDOM();
      const ease = new CubicBezier(...params) as BezierEasingFunction;
      function updateTween(this: Tween, t: number) {
        const { propsEnd, propsStart, element } = this;

        Object.keys(propsEnd).forEach(prop => {
          const a = propsStart[prop];
          const b = propsEnd[prop];
          Object.assign(element.style, { [prop]: `${a + (b - a) * t}px` });
          // element.style[prop as any] = (a + (b - a) * t) + 'px';
        });
      }
      const btn = getByText(container, 'Test');
      new Tween(btn, { left: 0 }, { left: 250 }, 100, ease).onUpdate(updateTween).start();

      await waitFor(() => {
        expect(btn.style.left).to.equal('250px');
      });
    });
  });
});
