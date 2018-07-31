'use strict';

require('should');
const MyLib = require('../lib/objects');

describe("Testing isConstructor", () => {
  it("should return true for Boolean", () => {
    MyLib.isConstructor(Boolean).should.equal(true);
  });
  it("should return true for String", () => {
    MyLib.isConstructor(String).should.equal(true);
  });
  it("should return true for Number", () => {
    MyLib.isConstructor(Number).should.equal(true);
  });
  it("should return true for Object", () => {
    MyLib.isConstructor(Object).should.equal(true);
  });
  it("should return true for Array", () => {
    MyLib.isConstructor(Object).should.equal(true);
  });
  it("should return true for Date", () => {
    MyLib.isConstructor(Date).should.equal(true);
  });
  it("should return false for a string", () => {
    MyLib.isConstructor("foo").should.equal(false);
  });
  it("should return false for a boolean", () => {
    MyLib.isConstructor(true).should.equal(false);
  });
  it("should return false for a number", () => {
    MyLib.isConstructor(23).should.equal(false);
  });
  it("should return false for an object", () => {
    MyLib.isConstructor({"foo": "bar"}).should.equal(false);
  });
  it("should return false for an array", () => {
    MyLib.isConstructor(["foo", "bar"]).should.equal(false);
  });
  it("should return false for a date", () => {
    MyLib.isConstructor(new Date()).should.equal(false);
  });
});