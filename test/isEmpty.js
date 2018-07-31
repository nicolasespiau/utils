'use strict';

require('should');
const MyLib = require('../lib/objects');

describe("Testing isEmpty", () => {
  describe("isEmpty", () => {
    describe("Testing on standard types", () => {
      describe("Testing on strings", () => {
        it("should return true on empty string \"\"", () => {
          MyLib.isEmpty("").should.equal(true);
        });
        it("should return false on string \"string\"", () => {
          MyLib.isEmpty("string").should.equal(false);
        });
      });
      describe("Testing on booleans", () => {
        it("should return false on boolean false", () => {
          MyLib.isEmpty(false).should.equal(false);
        });
        it("should return false on boolean true", () => {
          MyLib.isEmpty(true).should.equal(false);
        });
      });
      describe("Testing on integers", () => {
        it("should return false on 0 integer", () => {
          MyLib.isEmpty(0).should.equal(false);
        });
        it("should return false on other integer", () => {
          MyLib.isEmpty(4).should.equal(false);
        });
      });
      describe("Testing on dates", () => {
        it("should return false on new Date", () => {
          MyLib.isEmpty(new Date()).should.equal(false);
        });
        it("should return false on new Date(date)", () => {
          MyLib.isEmpty(new Date('1986-07-22T08:00:00Z')).should.equal(false);
        });
      });
      describe("Testing on arrays", () => {
        it("should return true on empty array []", () => {
          MyLib.isEmpty([]).should.equal(true);
        });
        it("should return false on array containing non empty standard typed values[\"foo\", 1]", () => {
          MyLib.isEmpty(["foo", 1]).should.equal(false);
        });
        it("should return false on array containing non empty object [{\"a\": \"not empty\"}]", () => {
          MyLib.isEmpty([{"a": "not empty"}]).should.equal(false);
        });
        it("should return true on array containing empty objects [{\"a\": \"\"}, {}]", () => {
          MyLib.isEmpty([{"a": ""}, {}]).should.equal(true);
        });
        it("should return true on array containing empty arrays [[], [{}], [{\"a\": \"\"}]]", () => {
          MyLib.isEmpty([[], [{}], [{"a": ""}]]).should.equal(true);
        });
      });
    });
    describe("Testing on objects", () => {
      describe("Testing on empty object {}", () => {
        it("should return true", () => {
          MyLib.isEmpty({}).should.equal(true);
        });
      });
      describe("Testing on object with one only empty string inside {\"foo\": \"\"}", () => {
        it("should return true", () => {
          MyLib.isEmpty({"foo": ""}).should.equal(true);
        });
      });
      describe("Testing on object with empty nested objects {\"a\": \"\", \"b\": {}, \"c\": {\"a\": \"\"}, \"d\": {\"a\": {}}, \"e\": {\"a\": {\"a\": \"\", \"b\": {}}}}", () => {
        it("should return true", () => {
          MyLib.isEmpty({
            "a": "",
            "b": {},
            "c": {"a": ""},
            "d": {"a": {}},
            "e": {"a": {"a": "", "b": {}}}
          }).should.equal(true);
        })
      });
      describe("Testing on object with nested obejcts with one single isolated value somewhere {\"a\": \"\", \"b\": {}, \"c\": {\"a\": \"\"}, \"d\": {\"a\": {}}, \"e\": {\"a\": {\"a\": \"\", \"b\": {\"a\": \"\", \"b\": \"not empty\"}}}}", () => {
        it("should return false", () => {
          MyLib.isEmpty({
            "a": "",
            "b": {},
            "c": {"a": ""},
            "d": {"a": {}},
            "e": {"a": {"a": "", "b": {"a": "", "b": "not empty"}}}
          }).should.equal(false);
        })
      });
    });
  });
});
