'use strict';

const test = require('unit.js');
const MyLib = require('../lib/strings');

describe("Testing replaceAt", () => {
  let string = "abcdefghijklmnopqrstuvwxyz";
  describe("Replace out of bounds", () => {
    let updatedStr;
    before("do replaceAt", () => {
      updatedStr = MyLib.replaceAt(string, string.length + 10, "1");
    });
    it("should return a string with the proper length", () => {
      test.string(updatedStr).hasLength(string.length);
    });
    it("should return a string unchanged", () => {
      test.string(updatedStr).is(string);
    });
  });
  describe("Replace a char by a single char in bound", () => {
    let updatedStr;
    before("do replaceAt", () => {
      updatedStr = MyLib.replaceAt(string, 1, "1");
    });
    it("should return a string with the proper length", () => {
      test.string(updatedStr).hasLength(string.length);
    });
    it("should return a string with the char replaced", () => {
      test.string(updatedStr[1]).is("1");
    });
  });
  describe("Replace a char by a string in bound", () => {
    let updatedStr;
    const rpl = "1234";
    before("do replaceAt", () => {
      updatedStr = MyLib.replaceAt(string, 1, rpl);
    });
    it("should return a string with the proper length", () => {
      test.string(updatedStr).hasLength(string.length - 1 + rpl.length);
    });
    it("should return a string with the char replaced", () => {
      test.string(updatedStr.substr(1, rpl.length)).is(rpl);
    });
  });
});