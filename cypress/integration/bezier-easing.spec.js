/// <reference types="cypress" />
/** @typedef {import("../../types/index")} */

import CubicBezier from '../../src/index';
import round4 from '../fixtures/round4';
import Tween from '../fixtures/basic-animation-engine';
import easingParams from '../fixtures/easing-params';

describe('CubicBezier Class Test', () => {
  beforeEach(() => {
    cy.visit('cypress/test.html')
      .get('button').then((btn) => {
        cy.wrap(btn[0]).as('btn');
      })
      .wait(200)
  });

  it('Can do basic function, no parameters => linear', () => {
    const linear = new CubicBezier();
    [0,0.25,0.5,0.75,1].forEach((step) => {
      expect(round4(linear(step))).to.equal(step)
    });
  });

  it('Can do basic function, cubicOut', () => {
    const cubicOut = new CubicBezier(...easingParams[3]);
    [0,0.25,0.5,0.75,1].forEach((step) => {
      const roundedValue = round4(cubicOut(step));
      if ([0, 1].includes(step)) {
        expect(roundedValue).to.equal(step)
      } else {
        expect(roundedValue).to.not.equal(step)
      }
    })
  });

  easingParams.forEach((params, i) => {
    it(`Can do basic animation #${i}`, () => {
      const ease = new CubicBezier(...params);
      function updateTween(t) {
        const { propsEnd, propsStart, element } = this;
  
        Object.keys(propsEnd).forEach((prop) => {
          const a = propsStart[prop];
          const b = propsEnd[prop];
          element.style[prop] = (a + (b - a) * t) + 'px';
        });
      }
      cy.get('@btn').should('exist').and((btn) => {
        new Tween(btn[0], {left: 0}, {left: 250}, 100, ease)
        .onUpdate(updateTween)
        .start();
        return btn;
      })
      .wait(1000)
      .then((btn) => {
        expect(btn[0].style.left).to.equal('250px');
      })
    });
  })
});
