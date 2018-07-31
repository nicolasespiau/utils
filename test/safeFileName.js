'use strict';

require('should');
const MyLib = require('../lib/strings');

describe("Testing safeFileName", () => {
  const filename = "i'm a bad filename with__forbidden--chars!..jpg";
  let safeFilename;
  before("Get random string with default length", () => {
    safeFilename = MyLib.safeFileName(filename);
  });
  it("should have santized filename", () => {
    safeFilename.should.equal("im-a-bad-filename-with_forbidden-chars.jpg");
  });
});