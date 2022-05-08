/// <reference types="cypress" />
/** @typedef {import("../../types/index")} */

import CubicBezier from '../../src/index';

describe('CubicBezier Class Test', () => {
  it('Can do basic function', () => {
    const args = [];
    try {
      new CubicBezier(...args);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error).to.have.property('message', `CubicBezier target "${args[0]}" cannot be found.`);
    }
  })
});
