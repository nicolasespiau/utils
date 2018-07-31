'use strict';

const test = require('unit.js');
const MyLib = require('../lib/objects');

describe("Building schema from strings", () => {
  describe("When schema contains only types", () => {
    const schema = {"foo": "String", "bar": "Boolean", "baz": "Number"};
    let builtSchema;
    it("should throw no error", () => {
      (function () {builtSchema = MyLib.buildSchema(schema)}).should.not.throwError();
    });
    it("should generate a inspectable schema", () => {
      (function () {MyLib.inspectSchema(builtSchema)}).should.not.throwError();
    });
  });
  describe("When schema is already filled by constructors", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number};
    let builtSchema;
    it("should throw no error", () => {
      (function () {builtSchema = MyLib.buildSchema(schema)}).should.not.throwError();
    });
    it("should generate a inspectable schema", () => {
      (function () {MyLib.inspectSchema(builtSchema)}).should.not.throwError();
    });
  });
  describe("When schema contains only types or array of type", () => {
    const schema = {"foo": "String", "bar": "Boolean", "baz": "Number", "boo": ["String"]};
    let builtSchema;
    it("should throw no error", () => {
      (function () {builtSchema = MyLib.buildSchema(schema)}).should.not.throwError();
    });
    it("should generate a inspectable schema", () => {
      (function () {MyLib.inspectSchema(builtSchema)}).should.not.throwError();
    });
  });
  describe("When schema not contains types only", () => {
    const schema = {"foo": "String", "bar": "Boolean", "baz": "Number", "boo": "imanerror"};
    let builtSchema;
    it("should throw an error", () => {
      (function () {builtSchema = MyLib.buildSchema(schema)}).should.throw(/is not a type$/);
    });
  });
  describe("When schema contains an array with other things than types", () => {
    const schema = {"foo": "String", "bar": "Boolean", "baz": "Number", "boo": ["imanerror"]};
    let builtSchema;
    it("should throw an error", () => {
      (function () {builtSchema = MyLib.buildSchema(schema)}).should.throw(/is not a type$/);
    });
  });
  describe("When schema contains an array with more than one type", () => {
    const schema = {"foo": "String", "bar": "Boolean", "baz": "Number", "boo": ["String", "Boolean"]};
    let builtSchema;
    it("should throw an error", () => {
      (function () {builtSchema = MyLib.buildSchema(schema)}).should.throw(/^schema can have arrays of one type only/);
    });
  });
  describe("When schema has a valid sub schema", () => {
    const schema = {"foo": "String", "bar": "Boolean", "baz": "Number", "boo": {"far": "String", "faz": "Number"}};
    let builtSchema;
    it("should throw no error", () => {
      (function () {builtSchema = MyLib.buildSchema(schema)}).should.not.throwError();
    });
    it("should generate a inspectable schema", () => {
      (function () {MyLib.inspectSchema(builtSchema)}).should.not.throwError();
    });
  });
  describe("When schema has a invalid sub schema", () => {
    const schema = {"foo": "String", "bar": "Boolean", "baz": "Number", "boo": {"far": "far", "faz": "Number"}};
    let builtSchema;
    it("should throw an error", () => {
      (function () {builtSchema = MyLib.buildSchema(schema)}).should.throw(/is not a type$/);
    });
  });
  describe("When schema has a sub schema in an array", () => {
    const schema = {"foo": "String", "bar": "Boolean", "baz": "Number", "boo": [{"far": "String", "faz": "Number"}]};
    let builtSchema;
    it("should throw no error", () => {
      (function () {builtSchema = MyLib.buildSchema(schema)}).should.not.throwError();
    });
    it("should generate a inspectable schema", () => {
      (function () {MyLib.inspectSchema(builtSchema)}).should.not.throwError();
    });
  });
  describe("When schema has an invalid sub schema in an array", () => {
    const schema = {"foo": "String", "bar": "Boolean", "baz": "Number", "boo": [{"far": "far", "faz": "Number"}]};
    let builtSchema;
    it("should throw an error", () => {
      (function () {builtSchema = MyLib.buildSchema(schema)}).should.throw(/is not a type$/);
    });
  });
});