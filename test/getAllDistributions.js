'use strict';

require('should');
const MyLib = require('../lib/maths');

describe("Testing getAllDistributions", () => {
  describe("Testing on 2 segments and 2 dimensions", () => {
    let distributions;
    before("do getAllDistributions", async () => {
      distributions = await MyLib.getAllDistributions(["a", "b"], 2);
    });
    it("should have generated 4 distribs", () => {
      distributions.should.be.instanceOf(Array).and.have.lengthOf(4);
    });
    it("should have generated 4 different distribs", () => {
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
  describe("Testing on 2 segments and 3 dimensions", () => {
    let distributions;
    before("do getAllDistributions", async () => {
      distributions = await MyLib.getAllDistributions(["a", "b"], 3);
    });
    it("should have generated 9 distribs", () => {
      distributions.should.be.instanceOf(Array).and.have.lengthOf(9);
    });
    it("should have generated 9 different distribs", () => {
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
  describe("Testing on 4 segments and 2 dimensions", () => {
    let distributions;
    before("do getAllDistributions", async () => {
      distributions = await MyLib.getAllDistributions(["a", "b", "c", "d"], 2);
    });
    it("should have generated 16 distribs", () => {
      distributions.should.be.instanceOf(Array).and.have.lengthOf(16);
    });
    it("should have generated 16 different distribs", () => {
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