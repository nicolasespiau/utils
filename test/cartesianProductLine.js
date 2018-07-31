'use strict';

require('should');
const MyLib = require('../lib/maths');

describe("Testing cartesianProductLine", () => {
  describe("Testing on 1*1", () => {
    let productLine;
    const line1 = ["a"];
    const line2 = ["c"];
    before("do cartesianProductLine", () => {
      productLine = MyLib.cartesianProductLine(line1, line2);
    });
    it("should have generated an array of same length as input lines have", () => {
      console.log(productLine);
      productLine.should.be.instanceOf(Array).and.have.lengthOf(Math.max(line1.length, line2.length));
    });

    it("should have generated a product between values from each line at the same index", () => {
      line1.forEach((val, i) => {
        productLine[i].should.equal(val+line2[i]);
      })
    });
  });
  describe("Testing on 2*2", () => {
    let productLine;
    const line1 = ["a", "b"];
    const line2 = ["c", "d"];
    before("do cartesianProductLine", async () => {
      productLine = await MyLib.cartesianProductLine(line1, line2);
    });
    it("should have generated an array of same length as input lines have", () => {
      console.log(productLine);
      productLine.should.be.instanceOf(Array).and.have.lengthOf(Math.max(line1.length, line2.length));
    });
    it("should have generated a product between values from each line at the same index", () => {
      line1.forEach((val, i) => {
        productLine[i].should.equal(val+line2[i]);
      })
    });
  });
  describe("Testing on 4*4", () => {
    let productLine;
    const line1 = ["a", "b", "1", "2"];
    const line2 = ["c", "d", "3", "4"];
    before("do cartesianProductLine", async () => {
      productLine = await MyLib.cartesianProductLine(line1, line2);
    });
    it("should have generated an array of same length as input lines have", () => {
      console.log(productLine);
      productLine.should.be.instanceOf(Array).and.have.lengthOf(Math.max(line1.length, line2.length));
    });
    it("should have generated a product between values from each line at the same index", () => {
      line1.forEach((val, i) => {
        productLine[i].should.equal(val+line2[i]);
      })
    });
  });
});