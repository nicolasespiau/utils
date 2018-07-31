'use strict';

const test = require('unit.js');
const MyLib = require('../lib/objects');

describe("Testing object functions", () => {
  describe("hasProperty", () => {
    const witnessObject = {
      "a": "b",
      "b": {"c": "d"},
      "c": {"d": {"e": "f"}}
    };
    describe("Testing on simple property", () => {
      it('should return true', () => {
        MyLib.hasProperty(witnessObject, "a").should.equal(true);
      });
    });
    describe("Testing on nested property with depth 1", () => {
      it('should return true', () => {
        MyLib.hasProperty(witnessObject, "b.c").should.equal(true);
      });
    });
    describe("Testing on nested property with depth 2", () => {
      it('should return true', () => {
        MyLib.hasProperty(witnessObject, "c.d.e").should.equal(true);
      });
    });
    describe("Testing on simple root of nested property", () => {
      it('should return true', () => {
        MyLib.hasProperty(witnessObject, "b").should.equal(true);
      });
    });
    describe("Testing on nested root of nested property", () => {
      it('should return true', () => {
        MyLib.hasProperty(witnessObject, "c.d").should.equal(true);
      });
    });
    describe("Testing on non existing simple property", () => {
      it('should return false', () => {
        MyLib.hasProperty(witnessObject, "d").should.equal(false);
      });
    });
    describe("Testing on non existing nested property", () => {
      it('should return false', () => {
        MyLib.hasProperty(witnessObject, "d.e").should.equal(false);
      });
    });
    describe("Testing on nested non existing property with root existing", () => {
      it('should return false', () => {
        MyLib.hasProperty(witnessObject, "c.e").should.equal(false);
      });
    });
  });
  describe("hasProperties", () => {
    const witnessObject = {
      "a": "b",
      "b": {"c": "d"},
      "c": {"d": {"e": "f"}}
    };
    describe("Testing on simple properties", () => {
      it('should return true', () => {
        MyLib.hasProperties(witnessObject, ["a", "b", "c"]).should.equal(true);
      });
    });
    describe("Testing on simple and nested properties", () => {
      it('should return true', () => {
        MyLib.hasProperties(witnessObject, ["a", "b.c", "c.d.e"]).should.equal(true);
      });
    });
    describe("Testing on non existing simple properties", () => {
      it('should return false', () => {
        MyLib.hasProperties(witnessObject, ["e", "f", "g"]).should.equal(false);
      });
    });
    describe("Testing on non existing nested properties", () => {
      it('should return false', () => {
        MyLib.hasProperties(witnessObject, ["e.f", "f.g", "g.h"]).should.equal(false);
      });
    });
    describe("Testing on non existing nested properties with exsting root", () => {
      it('should return false', () => {
        MyLib.hasProperties(witnessObject, ["a.f", "b.g", "c.h"]).should.equal(false);
      });
    });
  });
  describe("getValueAt", () => {
    const witnessObject = {
      "a": "b",
      "b": {"c": "d"},
      "c": {"d": {"e": "f"}}
    };
    describe("Testing on simple property", () => {
      it("should return the value", () => {
        MyLib.getValueAt(witnessObject, "a").should.equal(witnessObject.a);
      });
    });
    describe("Testing on nested property with depth 1", () => {
      it("should return the value", () => {
        MyLib.getValueAt(witnessObject, "b.c").should.equal(witnessObject.b.c);
      });
    });
    describe("Testing on nested property with depth 2", () => {
      it("should return the value", () => {
        MyLib.getValueAt(witnessObject, "c.d.e").should.equal(witnessObject.c.d.e);
      });
    });
    describe("Testing on simple property having object in value", () => {
      let value;
      before('get value', () => {
        value = MyLib.getValueAt(witnessObject, "b");
      });
      it("should return an object", () => {
        (typeof value).should.equal("object");
      });
      it("should return the value", () => {
        value.should.equal(witnessObject.b);
      });
    });
    describe("Testing on nested property having object in value", () => {
      let value;
      before('get value', () => {
        value = MyLib.getValueAt(witnessObject, "c.d");
      });
      it("should return an object", () => {
        (typeof value).should.equal("object");
      });
      it("should return the value", () => {
        value.should.equal(witnessObject.c.d);
      });
    });
    describe("Testing on non existing simple property", () => {
      it("should return null", () => {
        test.value(MyLib.getValueAt(witnessObject, "d")).isNull();
      });
    });
    describe("Testing on non existing nested property", () => {
      it("should return null", () => {
        test.value(MyLib.getValueAt(witnessObject, "d.e")).isNull();
      });
    });
    describe("Testing on non existing nested property with existing root", () => {
      it("should return null", () => {
        test.value(MyLib.getValueAt(witnessObject, "a.c")).isNull();
      });
    });
  });
  describe("setValueAt", () => {
    const witnessObject = {
      "a": "b",
      "b": {"c": "d"},
      "c": {"d": {"e": "f"}}
    };
    describe("Setting a simple value on non preexisting simple path", () => {
      before("do setValueAt", () => {
        MyLib.setValueAt(witnessObject, "bar", "foo");
      });
      it("should have added a key", () => {
        MyLib.hasProperty(witnessObject, "foo").should.equal(true);
      });
      it("should have set the expected value", () => {
        MyLib.getValueAt(witnessObject, "foo").should.equal("bar");
      });
    });
    describe("Setting a simple value on non preexisting nested path", () => {
      before("do setValueAt", () => {
        MyLib.setValueAt(witnessObject, "baz", "bar.foo");
      });
      it("should have added a key", () => {
        MyLib.hasProperty(witnessObject, "bar.foo").should.equal(true);
      });
      it("should have set the expected value", () => {
        MyLib.getValueAt(witnessObject, "bar.foo").should.equal("baz");
      });
    });
    describe("Setting a nested value on non preexisting simple path", () => {
      before("do setValueAt", () => {
        MyLib.setValueAt(witnessObject, {"speed": "fast"}, "horse");
      });
      it("should have added a key", () => {
        MyLib.hasProperty(witnessObject, "horse").should.equal(true);
      });
      it("should have added an object", () => {
        (typeof MyLib.getValueAt(witnessObject, "horse")).should.equal("object");
      });
      it("should have set the expected value", () => {
        MyLib.getValueAt(witnessObject, "horse").should.have.property("speed", "fast");
      });
    });
    describe("Setting a nested value on non preexisting nested path", () => {
      before("do setValueAt", () => {
        MyLib.setValueAt(witnessObject, {"speed": "slow"}, "snail.brown");
      });
      it("should have added a key", () => {
        MyLib.hasProperty(witnessObject, "snail.brown").should.equal(true);
      });
      it("should have added an object", () => {
        (typeof MyLib.getValueAt(witnessObject, "snail.brown")).should.equal("object");
      });
      it("should have set the expected value", () => {
        MyLib.getValueAt(witnessObject, "snail.brown").should.have.property("speed", "slow");
      });
    });
    describe("Overriding a value at preexisting simple path", () => {
      before("do setValueAt", () => {
        MyLib.setValueAt(witnessObject, "updated", "a");
      });
      it("should have overriden the expected value", () => {
        MyLib.getValueAt(witnessObject, "a").should.equal("updated");
      });
    });
    describe("Overriding a value at preexisting nested path", () => {
      before("do setValueAt", () => {
        MyLib.setValueAt(witnessObject, "updated", "b.c");
      });
      it("should have overriden the expected value", () => {
        MyLib.getValueAt(witnessObject, "b.c").should.equal("updated");
      });
    });
  });
  describe("keepProperties", () => {
    let witnessObject = {
      "a": "b",
      "b": {"c": "d", "d": "e"},
      "c": {"d": {"e": "f"}}
    };
    describe("Keep a simple property", () => {
      let resultObject = {};
      before("do keepProperties", () => {
        MyLib.keepProperties(witnessObject, ["a"], resultObject);
      });
      it("should have reduced object to an object with a single property", () => {
        Object.keys(resultObject).should.be.instanceOf(Array).and.have.lengthOf(1);
      });
      it("should have kept the expected property", () => {
        resultObject.should.have.property("a", "b");
      });
    });
    describe("Keep a nested property by its simple root", () => {
      let resultObject = {};
      before("do keepProperties", () => {
        MyLib.keepProperties(witnessObject, ["b"], resultObject);
      });
      it("should have reduced object to an object with a single property", () => {
        Object.keys(resultObject).should.be.instanceOf(Array).and.have.lengthOf(1);
      });
      it("should have kept the expected property", () => {
        resultObject.should.have.property("b");
      });
      it("kept property should be an object", () => {
        (typeof resultObject.b).should.equal("object");
      });
      it("kept property should not have been corrupted", () => {
        resultObject.b.should.equal(witnessObject.b);
      });
    });
    describe("Keep a simple property by its nested root", () => {
      let resultObject = {};
      before("do keepProperties", () => {
        MyLib.keepProperties(witnessObject, ["b.c"], resultObject);
      });
      it("should have reduced object to an object with a single property", () => {
        Object.keys(resultObject).should.be.instanceOf(Array).and.have.lengthOf(1);
      });
      it("should have kept the expected property", () => {
        resultObject.should.have.property("b", {"c": "d"});
      });
    });
    describe("Keep a nested property by its nested root", () => {
      let resultObject = {};
      before("do keepProperties", () => {
        MyLib.keepProperties(witnessObject, ["c.d"], resultObject);
      });
      it("should have reduced object to an object with a single property", () => {
        Object.keys(resultObject).should.be.instanceOf(Array).and.have.lengthOf(1);
      });
      it("should have kept the expected property", () => {
        resultObject.should.have.property("c", {"d": {"e": "f"}});
      });
    });
    describe("Keep multiple properties", () => {
      let resultObject = {};
      before("do keepProperties", () => {
        MyLib.keepProperties(witnessObject, ["a", "b", "c.d"], resultObject);
      });
      it("should have reduced object to an object with a the right number of properties", () => {
        Object.keys(resultObject).should.be.instanceOf(Array).and.have.lengthOf(3);
      });
      it("should have kept the expected properties", () => {
        resultObject.should.have.properties({
          "a": witnessObject.a,
          "b": witnessObject.b,
          "c": {"d": {"e": "f"}}
        });
      });
    });
  });
  describe("removeEmptyProperties", () => {
    let witnessObject = {
      "a": "",
      "b": 0,
      "c": false,
      "d": {},
      "e": {"f": ""},
      "f": {"g": {}},
      "g": {"h": "not empty", "i": ""},
      "h": null,
      "i": "not empty",
      "j": {"k": {"l": {}, "m": ""}, "l": "", "m": null},
      "k": {"l": {"m": {}, "n": ""}, "o": "", "p": "not empty"}
    };
    before("do remove", () => {
      MyLib.removeEmptyProperties(witnessObject);
    });
    it("should have removed empty strings", () => {
      witnessObject.should.not.have.property("a");
    });
    it("should have not removed 0", () => {
      witnessObject.should.have.property("b", 0);
    });
    it("should have not removed false", () => {
      witnessObject.should.have.property("c", false);
    });
    it("should have removed {}", () => {
      witnessObject.should.not.have.property("d");
    });
    it("should have removed sub object with only empty string nested", () => {
      witnessObject.should.not.have.property("e");
    });
    it("should have removed sub object with only empty objectnested", () => {
      witnessObject.should.not.have.property("f");
    });
    it("should have not removed sub object with not empty objectnested", () => {
      witnessObject.should.have.property("g");
    });
    it("should have removed empty nested properties in subobject having a non empty property", () => {
      witnessObject.g.should.not.have.property("i");
    });
    it("should have kept non empty nested properties in subobject having a non empty property", () => {
      witnessObject.g.should.have.property("h", "not empty");
    });
    it("should have removed property with null value", () => {
      witnessObject.should.not.have.property("h");
    });
    it("should have not removed property with string value", () => {
      witnessObject.should.have.property("i", "not empty");
    });
    it("should have removed property with empty nested object", () => {
      witnessObject.should.not.have.property("j");
    });
    it("should have not removed property with empty nested object except one single property", () => {
      witnessObject.should.have.property("k");
    });
    it("should have kept the only non empty property in nested object", () => {
      witnessObject.should.have.property("k", {"p": "not empty"});
    });
  })
});