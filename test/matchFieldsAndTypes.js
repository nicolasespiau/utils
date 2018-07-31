'use strict';

const test = require('unit.js');
const MyLib = require('../lib/objects');

describe("Testing matchFieldsAndTypes", () => {
  describe("When simple object matches schema", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number};
    const object = {"foo": "foo", "bar": true, "baz": 23};
    it("should throw no error", () => {
      (function () {
        MyLib.matchFieldsAndTypes(object, schema)
      }).should.not.throw();
    });
  });
  describe("When object with array matches schema", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number, "boo": [String]};
    const object = {"foo": "foo", "bar": true, "baz": 23, "boo": ["str1", "str2"]};
    it("should throw no error", () => {
      (function () {
        MyLib.matchFieldsAndTypes(object, schema)
      }).should.not.throw();
    });
  });
  describe("When simple object misses fields not in strict mode", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number};
    const object = {"foo": "foo", "bar": true};
    it("should throw no error", () => {
      (function () {
        MyLib.matchFieldsAndTypes(object, schema)
      }).should.not.throw();
    });
  });
  describe("When simple object misses fields in strict mode", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number};
    const object = {"foo": "foo", "bar": true};
    it("should throw error", () => {
      (function () {
        MyLib.matchFieldsAndTypes(object, schema, true)
      }).should.throw(/^Missing keys/);
    });
  });
  describe("When simple object does not match schema", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number};
    const object = {"foo": "foo", "bar": true, "baz": "string instead of number"};
    it("should throw error", () => {
      (function () {
        MyLib.matchFieldsAndTypes(object, schema)
      }).should.throw(/^Types mismatches/);
    });
  });
  describe("When object with array does not matches schema", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number, "boo": [String]};
    const object = {"foo": "foo", "bar": true, "baz": 23, "boo": [true, "str2"]};
    it("should throw error", () => {
      (function () {
        MyLib.matchFieldsAndTypes(object, schema, true)
      }).should.throw(/^Types mismatches/);
    });
  });
  describe("When object with sub object matches schema", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": Number}};
    const object = {"foo": "foo", "bar": true, "baz": {"fooz": "bla", "faz": 23}};
    it("should throw no error", () => {
      (function () {
        MyLib.matchFieldsAndTypes(object, schema, true)
      }).should.not.throw();
    });
  });
  describe("When object with sub object does not match schema", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": Number}};
    const object = {"foo": "foo", "bar": true, "baz": {"fooz": "bla", "faz": "23"}};
    it("should throw error", () => {
      (function () {
        MyLib.matchFieldsAndTypes(object, schema, true)
      }).should.throw();
    });
  });
  describe("When object with sub object in sub object matches schema", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": {"gaz": String, "goz": Boolean}}};
    const object = {"foo": "foo", "bar": true, "baz": {"fooz": "bla", "faz": {"gaz": "gaz", "goz": false}}};
    it("should throw no error", () => {
      (function () {
        MyLib.matchFieldsAndTypes(object, schema, true)
      }).should.not.throw();
    });
  });
  describe("When object with sub object in sub object does not match schema", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": {"gaz": String, "goz": Boolean}}};
    const object = {"foo": "foo", "bar": true, "baz": {"fooz": "bla", "faz": {"gaz": "gaz", "goz": "false"}}};
    it("should throw error", () => {
      (function () {
        MyLib.matchFieldsAndTypes(object, schema, true)
      }).should.throw();
    });
  });
  describe("When object with sub object in array matches schema", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": [{"gaz": String, "goz": Boolean}]}};
    const object = {
      "foo": "foo",
      "bar": true,
      "baz": {"fooz": "bla", "faz": [{"gaz": "gaz", "goz": false}, {"gaz": "taz", "goz": true}]}
    };
    it("should throw no error", () => {
      (function () {
        MyLib.matchFieldsAndTypes(object, schema, true)
      }).should.not.throw();
    });
  });
  describe("When object with sub object in array does not match schema", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": [{"gaz": String, "goz": Boolean}]}};
    const object = {
      "foo": "foo",
      "bar": true,
      "baz": {"fooz": "bla", "faz": [{"gaz": "gaz", "goz": false}, {"gaz": "taz", "goz": "true"}]}
    };
    it("should throw error", () => {
      (function () {
        MyLib.matchFieldsAndTypes(object, schema, true)
      }).should.throw();
    });
  });
  describe("When object with sub object in array miss a field in strict mode", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": [{"gaz": String, "goz": Boolean}]}};
    const object = {
      "foo": "foo",
      "bar": true,
      "baz": {"fooz": "bla", "faz": [{"gaz": "gaz"}, {"gaz": "taz", "goz": "true"}]}
    };
    it("should throw error", () => {
      (function () {
        MyLib.matchFieldsAndTypes(object, schema, true)
      }).should.throw();
    });
  });
});