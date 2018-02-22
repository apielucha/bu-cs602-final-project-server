/* global describe, it */

const { expect } = require('chai');

describe('Test', () => {
  it('Should be a number', () => {
    expect(1).to.be.a('number');
  });
});
