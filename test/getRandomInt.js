'use strict';

require('should');
const MyLib = require('../lib/maths');

describe("Testing getRandomInt", () => {
  let randomInt;
  before("do random", () => {
    randomInt = MyLib.getRandomInt(0, 100);
  });
  it("should get an int between given boudaries", () => {
    randomInt.should.be.instanceOf(Number).and.be.greaterThan(0).and.be.lessThan(100);
  });
});