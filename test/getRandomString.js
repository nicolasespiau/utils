'use strict';

require('should');
const MyLib = require('../lib/strings');

describe("Testing getRandomString", () => {
  describe("Get random string with default length", () => {
    let randomStr;
    before("do random", () => {
      randomStr = MyLib.getRandomString();
    });
    it("should get a string of default length 12", () => {
      randomStr.should.be.instanceOf(String).and.have.lengthOf(12);
    });
    it("should return a string composed by possible chars", () => {
      randomStr.should.match(/[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]+/);
    })
  });
  describe("Get random string with given length of 100", () => {
    let randomStr;
    before("do random", () => {
      randomStr = MyLib.getRandomString(100);
    });
    it("should get a string of default length 100", () => {
      randomStr.should.be.instanceOf(String).and.have.lengthOf(100);
    });
    it("should return a string composed by possible chars", () => {
      randomStr.should.match(/[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]+/);
    })
  });
});