/// <reference types="cypress" />
/** @typedef {import("../../types/index")} */

import CubicBezier from '../../src/index';
import round4 from '../fixtures/round4';
import Tween from '../fixtures/basic-animation-engine';

describe('CubicBezier Class Test', () => {
  beforeEach(() => {
    cy.visit('cypress/test.html')
      .get('button').then((btn) => {
        cy.wrap(btn[0]).as('btn');
      })
      .wait(200)
  });

  it('Can do basic function, no parameters = linear', () => {
    const linear = new CubicBezier();
    [0,0.25,0.5,0.75,1].forEach((step) => {
      expect(round4(linear(step))).to.equal(step)
    });
  });

  it('Can do basic function, cubicOut', () => {
    const cubicOut = new CubicBezier(0.22, 0.61, 0.36, 1);
    [0,0.25,0.5,0.75,1].forEach((step) => {
      const roundedValue = round4(cubicOut(step));
      if ([0, 1].includes(step)) {
        expect(roundedValue).to.equal(step)
      } else {
        expect(roundedValue).to.not.equal(step)
      }
    })
  });

  it('Can do basic animation', () => {
    const backIn = new CubicBezier(0.6, -0.28, 0.74, 0.05);
    const backOut = new CubicBezier(0.18, 0.89, 0.32, 1.28);
    cy.get('@btn').should('exist').then((btn) => {
      new Tween(btn[0], {left: 0}, {left: 250}, 1500, backIn).start();
      return btn;
    })
    .wait(2000)
    .then((btn) => {
      expect(btn[0].style.left).to.equal('250px');
      return btn;
    })
    .then((btn) => {
      new Tween(btn[0], {left: 250}, {left: 0}, 1500, backOut).start();
      return btn;
    })
    .wait(2000)
    .then((btn) => {
      cy.log(btn)
      expect(btn[0].style.left).to.equal('0px');
    });
  });
});
