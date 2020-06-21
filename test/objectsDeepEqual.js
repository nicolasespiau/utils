'use strict';

const test = require('unit.js');
const MyLib = require('../lib/objects');

describe("Testing object functions", () => {
  describe("deepEqual on objects", () => {
    const witnessObject1 = {
      "a": "b",
      "b": {"c": "d"},
      "c": {"d": {"e": "f"}}
    };
    const witnessObject2 = {
      "a": "b",
      "b": {"c": "d"},
      "c": {"d": {"e": "f"}}
    };
    const witnessObject3 = {
      "b": {"c": "d"},
      "c": {"d": {"e": "f"}}
    };
    const witnessObject4 = {
      "a": "c",
      "b": {"c": "d"},
      "c": {"d": {"e": "f"}}
    };
    const witnessObject5 = {
      "d": "c",
      "b": {"c": "d"},
      "c": {"d": {"e": "f"}}
    };
    const string1 = "test";
    describe("With two similar objects", () => {
      it('should return true', () => {
        MyLib.deepEqual(witnessObject1, witnessObject2).should.equal(true);
      });
    });
    describe("With two different objects (missing key)", () => {
      it('should return false', () => {
        MyLib.deepEqual(witnessObject1, witnessObject3).should.equal(false);
      });
    });
    describe("With two different objects (different values)", () => {
      it('should return false', () => {
        MyLib.deepEqual(witnessObject1, witnessObject4).should.equal(false);
      });
    });
    describe("With two different objects (different keys)", () => {
      it('should return false', () => {
        MyLib.deepEqual(witnessObject1, witnessObject5).should.equal(false);
      });
    });
    describe("With two similar objects", () => {
      it('should return true', () => {
        MyLib.deepEqual(witnessObject2, witnessObject1).should.equal(true);
      });
    });
    describe("With two different objects (missing key)", () => {
      it('should return false', () => {
        MyLib.deepEqual(witnessObject3, witnessObject1).should.equal(false);
      });
    });
    describe("With two different objects (different values)", () => {
      it('should return false', () => {
        MyLib.deepEqual(witnessObject4, witnessObject1).should.equal(false);
      });
    });
    describe("With two different objects (different keys)", () => {
      it('should return false', () => {
        MyLib.deepEqual(witnessObject5, witnessObject1).should.equal(false);
      });
    });
    describe("With an object and a string", () => {
      it('should return false', () => {
        MyLib.deepEqual(witnessObject1, string1).should.equal(false);
      });
    });
    describe("With a string and an object", () => {
      it('should return false', () => {
        MyLib.deepEqual(string1, witnessObject1).should.equal(false);
      });
    });
  });
  describe("deepEqual on strings", () => {
    const string1 = "test";
    const string2 = "test";
    const string3 = "test2";
    describe("With two similar strings", () => {
      it('should return true', () => {
        MyLib.deepEqual(string1, string2).should.equal(true);
      });
    });
    describe("With two similar strings", () => {
      it('should return true', () => {
        MyLib.deepEqual(string2, string1).should.equal(true);
      });
    });
    describe("With two different strings", () => {
      it('should return false', () => {
        MyLib.deepEqual(string1, string3).should.equal(false);
      });
    });
    describe("With two different strings", () => {
      it('should return false', () => {
        MyLib.deepEqual(string3, string1).should.equal(false);
      });
    });
  });
  describe("deepEqual on integers", () => {
    const int1 = 1;
    const int2 = 1;
    const int3 = 2;
    describe("With two similar integers", () => {
      it('should return true', () => {
        MyLib.deepEqual(int1, int2).should.equal(true);
      });
    });
    describe("With two similar integers", () => {
      it('should return true', () => {
        MyLib.deepEqual(int2, int1).should.equal(true);
      });
    });
    describe("With two different integers", () => {
      it('should return false', () => {
        MyLib.deepEqual(int1, int3).should.equal(false);
      });
    });
    describe("With two different integers", () => {
      it('should return false', () => {
        MyLib.deepEqual(int3, int1).should.equal(false);
      });
    });
  });
  describe("deepEqual on arrays", () => {
    const arr1 = ["a", "b"];
    const arr2 = ["a", "b"];
    const arr3 = ["b", "a"];
    const arr4 = ["a", "b", "c"];
    describe("With two similar arrays", () => {
      it('should return true', () => {
        MyLib.deepEqual(arr1, arr2).should.equal(true);
      });
    });
    describe("With two similar arrays", () => {
      it('should return true', () => {
        MyLib.deepEqual(arr2, arr1).should.equal(true);
      });
    });
    describe("With two different arrays (different values)", () => {
      it('should return false', () => {
        MyLib.deepEqual(arr1, arr3).should.equal(false);
      });
    });
    describe("With two different arrays (inverted objects)", () => {
      it('should return false', () => {
        MyLib.deepEqual(arr3, arr1).should.equal(false);
      });
    });
    describe("With two different arrays (not the same length)", () => {
      it('should return false', () => {
        MyLib.deepEqual(arr1, arr4).should.equal(false);
      });
    });
    describe("With two different arrays (not the same length)", () => {
      it('should return false', () => {
        MyLib.deepEqual(arr4, arr1).should.equal(false);
      });
    });
  });
});