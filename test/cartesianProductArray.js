'use strict';

require('should');
const MyLib = require('../lib/maths');

describe("Testing cartesianProductArray", () => {
  describe("Testing on 2*2", () => {
    let distributions;
    const array1 = [["a"], ["b"]];
    const array2 = [["c"], ["d"]];
    before("do cartesianProductArray", async () => {
      distributions = await MyLib.cartesianProductArray(array1, array2);
    });
    it("should have generated an array of max length", () => {
      distributions.should.be.instanceOf(Array).and.have.lengthOf(array1.length*array2.length);
    });
    it("should have generated different distribs", () => {
      //loop over distributions
      distributions.forEach((distrib, i) => {
        //get following distributions
        const restOfDistrib = distributions.slice(i+1);
        //current distribution has to be different of any other following distribution
        restOfDistrib.forEach((restingDistrib) => {
          distrib.should.not.eql(restingDistrib);
        });
      });
    });
  });
  describe("Testing on 4*2", () => {
    let distributions;
    const array1 = [["a"], ["b"], ["1"], ["2"]];
    const array2 = [["c"], ["d"]];
    before("do cartesianProductArray", async () => {
      distributions = await MyLib.cartesianProductArray(array1, array2);
    });
    it("should have generated an array of max length", () => {
      distributions.should.be.instanceOf(Array).and.have.lengthOf(array1.length*array2.length);
    });
    it("should have generated different distribs", () => {
      //loop over distributions
      distributions.forEach((distrib, i) => {
        //get following distributions
        const restOfDistrib = distributions.slice(i+1);
        //current distribution has to be different of any other following distribution
        restOfDistrib.forEach((restingDistrib) => {
          distrib.should.not.eql(restingDistrib);
        });
      });
    });
  });
  describe("Testing on 4*4", () => {
    let distributions;
    const array1 = [["a"], ["b"], ["1"], ["2"]];
    const array2 = [["c"], ["d"], ["3"], ["4"]];
    before("do cartesianProductArray", async () => {
      distributions = await MyLib.cartesianProductArray(array1, array2);
    });
    it("should have generated an array of max length", () => {
      distributions.should.be.instanceOf(Array).and.have.lengthOf(array1.length*array2.length);
    });
    it("should have generated different distribs", () => {
      //loop over distributions
      distributions.forEach((distrib, i) => {
        //get following distributions
        const restOfDistrib = distributions.slice(i+1);
        //current distribution has to be different of any other following distribution
        restOfDistrib.forEach((restingDistrib) => {
          distrib.should.not.eql(restingDistrib);
        });
      });
    });
  });
});