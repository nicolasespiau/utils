'use strict';

require('should');
const MyLib = require('../lib/maths');

describe("Testing getAllCombinations", () => {
  describe("Testing on 2 segments", () => {
    let combinations;
    before("do getAllCombinations", async () => {
      combinations = await MyLib.getAllCombinations(["a", "b"]);
    });
    it("should return an array of 2! combinations", async () => {
      combinations.length.should.equal(MyLib.factorial(2));
    });
    it("all combination must be different", () => {
      combinations.forEach((combination, i) => {
        const restOfCombinations = combinations.slice(i+1);
        restOfCombinations.indexOf(combination).should.equal(-1);
      })
    });
  });
  describe("Testing on 3 segments", () => {
    let combinations;
    before("do getAllCombinations", async () => {
      combinations = await MyLib.getAllCombinations(["a", "b", "c"]);
    });
    it("should return an array of 3! combinations", () => {
      combinations.length.should.equal(MyLib.factorial(3));
    });
    it("all combination must be different", () => {
      combinations.forEach((combination, i) => {
        const restOfCombinations = combinations.slice(i+1);
        restOfCombinations.indexOf(combination).should.equal(-1);
      })
    });
  });
  describe("Testing on 4 segments", () => {
    let combinations;
    before("do getAllCombinations", async () => {
      combinations = await MyLib.getAllCombinations(["a", "b", "c", "d"]);
    });
    it("should return an array of 4! combinations", () => {
      combinations.length.should.equal(MyLib.factorial(4));
    });
    it("all combination must be different", () => {
      combinations.forEach((combination, i) => {
        const restOfCombinations = combinations.slice(i+1);
        restOfCombinations.indexOf(combination).should.equal(-1);
      })
    });
  });
  describe("Testing on 5 segments", () => {
    let combinations;
    before("do getAllCombinations", async () => {
      combinations = await MyLib.getAllCombinations(["a", "b", "c", "d", "e"]);
    });
    it("should return an array of 5! combinations", () => {
      combinations.length.should.equal(MyLib.factorial(5));
    });
    it("all combination must be different", () => {
      combinations.forEach((combination, i) => {
        const restOfCombinations = combinations.slice(i+1);
        restOfCombinations.indexOf(combination).should.equal(-1);
      })
    });
  });
});