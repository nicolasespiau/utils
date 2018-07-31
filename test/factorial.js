'use strict';

require('should');
const MyLib = require('../lib/maths');

describe("Testing factorial", () => {
  describe("0!", () => {
    it("should return 1", () => {
      MyLib.factorial(0).should.equal(1);
    });
  });
  describe("1!", () => {
    it("should return 1", () => {
      MyLib.factorial(1).should.equal(1);
    });
  });
  describe("2!", () => {
    it("should return 2", () => {
      MyLib.factorial(2).should.equal(2);
    });
  });
  describe("3!", () => {
    it("should return 6", () => {
      MyLib.factorial(3).should.equal(6);
    });
  });
  describe("6!", () => {
    it("should return 720", () => {
      MyLib.factorial(6).should.equal(720);
    });
  });
  describe("-6!", () => {
    it("should return -720", () => {
      MyLib.factorial(-6).should.equal(-720);
    });
  });
  describe("10!", () => {
    it("should return 3628800", () => {
      MyLib.factorial(10).should.equal(3628800);
    });
  });
});