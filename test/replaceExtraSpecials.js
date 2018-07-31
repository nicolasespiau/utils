'use strict';

const test = require('unit.js');
const MyLib = require('../lib/strings');

describe("Testing replaceExtraSpecials", () => {
  const extraSpecials = "&(§!)%$*#@=+€£";

  let updatedString = [];
  before("do replaceExtraSpecials", () => {
    updatedString = MyLib.replaceExtraSpecials(extraSpecials);
  });
  it("should have replaced all extraSpecials", () => {
    test.string(updatedString).is(" ");
  });
});