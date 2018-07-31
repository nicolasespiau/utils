'use strict';

const test = require('unit.js');
const MyLib = require('../lib/strings');

describe("Testing slugify", () => {
  const string = "   abcdefghi#//$j é à ç klmnopq   rstuvwxyz   ";
  const slug = "abcdefghi-j-e-a-c-klmnopq-rstuvwxyz";
  let updatedStr;
  before("do slugify", () => {
    updatedStr = MyLib.slugify(string);
  });
  it("should return slug", () => {
    test.string(updatedStr).is(slug);
  });
});