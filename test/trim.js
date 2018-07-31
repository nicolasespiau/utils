'use strict';

const test = require('unit.js');
const MyLib = require('../lib/strings');

describe("Testing trim", () => {
  let string = "   abcdefghij klmnopq   rstuvwxyz   ";
  let updatedStr;
  before("do trim", () => {
    updatedStr = MyLib.trim(string);
  });
  it("should return a string with the proper length", () => {
    test.string(updatedStr).hasLength(28);
  });
  it("should have removed spaces at the beginning and the end", () => {
    test.string(updatedStr[0]).isNot(" ");
    test.string(updatedStr[updatedStr.length - 1]).isNot(" ");
  });
  it("should have reduced the multi spaces to one space", () => {
    test.string(updatedStr[updatedStr.length - 1]).notMatch(/ {2,}/);
  });
});