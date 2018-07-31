'use strict';

const test = require('unit.js');
const MyLib = require('../lib/objects');

describe("Testing inspectSchema", () => {
  describe("When schema contains only types", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number};
    it("should throw no error", () => {
      (function () {MyLib.inspectSchema(schema)}).should.not.throw();
    });
  });
  describe("When schema contains only types or array of type", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number, "boo": [String]};
    it("should throw no error", () => {
      (function () {MyLib.inspectSchema(schema)}).should.not.throw();
    });
  });
  describe("When schema not contains types only", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number, "boo": "imanerror"};
    it("should throw an error", () => {
      (function () {MyLib.inspectSchema(schema)}).should.throw(/is not a type$/);
    });
  });
  describe("When schema contains an array with other things than types", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number, "boo": ["imanerror"]};
    it("should throw an error", () => {
      (function () {MyLib.inspectSchema(schema)}).should.throw(/is not a type$/);
    });
  });
  describe("When schema contains an array with more than one type", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number, "boo": [String, Boolean]};
    it("should throw an error", () => {
      (function () {MyLib.inspectSchema(schema)}).should.throw(/^schema can have arrays of one type only/);
    });
  });
  describe("When schema contains an array with more than one type", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number, "boo": [String, Boolean]};
    it("should throw an error", () => {
      (function () {MyLib.inspectSchema(schema)}).should.throw(/^schema can have arrays of one type only/);
    });
  });
  describe("When schema has a valid sub schema", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number, "boo": {"far": String, "faz": Number}};
    it("should throw no error", () => {
      (function () {MyLib.inspectSchema(schema)}).should.not.throw();
    });
  });
  describe("When schema has a invalid sub schema", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number, "boo": {"far": "far", "faz": Number}};
    it("should throw an error", () => {
      (function () {MyLib.inspectSchema(schema)}).should.throw(/is not a type$/);
    });
  });
  describe("When schema has a sub schema in an array", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number, "boo": [{"far": String, "faz": Number}]};
    it("should throw no error", () => {
      (function () {MyLib.inspectSchema(schema)}).should.not.throw();
    });
  });
  describe("When schema has a invalid sub schema in an array", () => {
    const schema = {"foo": String, "bar": Boolean, "baz": Number, "boo": [{"far": "far", "faz": Number}]};
    it("should throw an error", () => {
      (function () {MyLib.inspectSchema(schema)}).should.throw(/is not a type$/);
    });
  });
});