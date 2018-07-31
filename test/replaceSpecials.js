'use strict';

const test = require('unit.js');
const MyLib = require('../lib/strings');

describe("Testing replaceSpecials", () => {
  const specials = "<>\\\/\'\",_-\n ";

  let updatedString = [];
  before("do replaceSpecials", () => {
    updatedString = MyLib.replaceSpecials(specials);
  });
  it("should have replaced all specials", () => {
    test.string(updatedString).is(" ");
  });
});