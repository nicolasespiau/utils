'use strict';

require('should');
const MyLib = require('../lib/objects');

describe("Testing sortObjects", () => {
  const unsortedObjects = [
    {
      "idfield": "a",
      "a": "b"
    },
    {
      "idfield": "b",
      "b": "c"
    },
    {
      "idfield": "c",
      "c": "d"
    }
  ];
  const ids = ["c", "a", "b"];
  let sortedObjects;
  before("do sort", () => {
    sortedObjects = MyLib.sortObjects(unsortedObjects, "idfield", ids);
  });
  it("unsorted objects should not be in ids order", () => {
    unsortedObjects.forEach((obj, idx) => {
      obj.idfield.should.not.equal(ids[idx]);
    });
  });
  it("should keep the same objects count", () => {
    sortedObjects.length.should.equal(unsortedObjects.length);
  });
  it("sorted objects should be in ids order", () => {
    sortedObjects.forEach((obj, idx) => {
      obj.idfield.should.equal(ids[idx]);
    });
  });
});