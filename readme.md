# Utils library

## Description

This library contains useful functions you may need in your developments.

## Installation

`npm i -S @bonjourjohn/utils`

## Usage

```javascript
const Utils = require("@bonjourjohn/utils");
```

## Maths functions

### getRandomInt(min, max)

Returns a random number between `min` and `max`.

```javascript
const randomInt = Utils.Maths.getRandomInt(0, 100);
```

### factorial(n)

Returns the result of n factorial: n!

```javascript
Utils.Maths.factorial(3); //6
Utils.Maths.factorial(4); //24
```

### getAllCombinations(segments)

Build and return all possible combinations using elements of the given array.

```javascript
const combinations = Utils.Maths.getAllCombinations(["a", "b"]);
console.log(combinations);
/**
["ab", "ba"]
**/
```

```javascript
const combinations = Utils.Maths.getAllCombinations(["a", "b", "c"]);
console.log(combinations);
/**
[
  "abc",
  "acb",
  "bac",
  "bca",
  "cab",
  "cba"
]
**/
```

```javascript
const combinations = Utils.Maths.getAllCombinations(["a", "b", "c", "d"]);
console.log(combinations);
/**
[
  "abcd",
  "abdc",
  "acbd",
  "acdb",
  "adbc",
  "adcb",
  "bacd",
  "badc",
  "bcad",
  "bcda",
  "bdac",
  "bdca",
  "cabd",
  "cadb",
  "cbad",
  "cbda",
  "cdab",
  "cdba",
  "dabc",
  "dacb",
  "dbac",
  "dbca",
  "dcab",
  "dcba"
]
**/
```

### getAllDistributions(segments, nDimensions)

Returns all distributions of given segments in nDimensions.

```javascript
Utils.Maths.getAllDistributions(["a", "b"], 2);
/** Returns
[ [ [ 'a', 'b' ], [] ],
  [ [ 'a' ], [ 'b' ] ],
  [ [ 'b' ], [ 'a' ] ],
  [ [], [ 'a', 'b' ] ] ]
**/
```

```javascript
Utils.Maths.getAllDistributions(["a", "b"], 3);
/** Returns
[ [ [ 'a', 'b' ], [], [] ],
  [ [ 'a' ], [ 'b' ], [] ],
  [ [ 'a' ], [], [ 'b' ] ],
  [ [ 'b' ], [ 'a' ], [] ],
  [ [], [ 'a', 'b' ], [] ],
  [ [], [ 'a' ], [ 'b' ] ],
  [ [ 'b' ], [], [ 'a' ] ],
  [ [], [ 'b' ], [ 'a' ] ],
  [ [], [], [ 'a', 'b' ] ] ]
**/
```

```javascript
Utils.Maths.getAllDistributions(["a", "b", "c", "d"], 2);
/** Returns
[ [ [ 'a', 'b', 'c', 'd' ], [] ],
  [ [ 'a', 'b', 'c' ], [ 'd' ] ],
  [ [ 'a', 'b', 'd' ], [ 'c' ] ],
  [ [ 'a', 'b' ], [ 'c', 'd' ] ],
  [ [ 'a', 'c', 'd' ], [ 'b' ] ],
  [ [ 'a', 'c' ], [ 'b', 'd' ] ],
  [ [ 'a', 'd' ], [ 'b', 'c' ] ],
  [ [ 'a' ], [ 'b', 'c', 'd' ] ],
  [ [ 'b', 'c', 'd' ], [ 'a' ] ],
  [ [ 'b', 'c' ], [ 'a', 'd' ] ],
  [ [ 'b', 'd' ], [ 'a', 'c' ] ],
  [ [ 'b' ], [ 'a', 'c', 'd' ] ],
  [ [ 'c', 'd' ], [ 'a', 'b' ] ],
  [ [ 'c' ], [ 'a', 'b', 'd' ] ],
  [ [ 'd' ], [ 'a', 'b', 'c' ] ],
  [ [], [ 'a', 'b', 'c', 'd' ] ] ]
**/
```

### cartesianProductArray(array1, array2)

Returns an array containing all combinations from the cartesian product of values in array1 and array2.
Values have to be in sub arrays.

```javascript
const array1 = [["a"], ["b"], ["1"], ["2"]];
const array2 = [["c"], ["d"], ["3"], ["4"]];

Utils.Maths.cartesianProductArray(array1, array2);
/** returns
[ [ 'ac' ],
  [ 'ad' ],
  [ 'a3' ],
  [ 'a4' ],
  [ 'bc' ],
  [ 'bd' ],
  [ 'b3' ],
  [ 'b4' ],
  [ '1c' ],
  [ '1d' ],
  [ '13' ],
  [ '14' ],
  [ '2c' ],
  [ '2d' ],
  [ '23' ],
  [ '24' ] ]
**/
```

### cartesianProductLine(line1, line2)

Returns the cartesian product between two arrays of values having the same length.

```javascript
const line1 = ["a"];
const line2 = ["c"];
Utils.Maths.cartesianProductLine(line1, line2);
/** Returns
[ 'ac' ]
**/
```

```javascript
const line1 = ["a", "b"];
const line2 = ["c", "d"];
Utils.Maths.cartesianProductLine(line1, line2);
/** Returns
[ 'ac' , 'bd' ]
**/
```

## String functions

### getRandomString([length])

Returns a string of length `length` or 12 by default, composed by characters randomly picked into this chars collection:
`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`

```javascript
Utils.Strings.getRandomString(5); //produce a random string of length 5
Utils.Strings.getRandomString(); //produce a random string of length 12
```

### safeFilename(unsafeFilename)

Removes special chars and spaces to return a sanitized filename.

```javascript
Utils.Strings.safeFilename("I'm not safe nor gentle.ext"); //im-not-safe-nor-gentle.ext
```

## Objects functions

### isEmpty(element)

Returns true if `element` is considered empty, false otherwise.

Is considered empty:

- emtpy strings `"""`
- empty arrays `[]`
- empty objects `{}`
- `null`
- `undefined`
- arrays containing only empty values as listed above
- objects containing only empty values as listed above

```javascript
Utils.Objects.isEmpty(""); //true
Utils.Objects.isEmpty([]); //true
Utils.Objects.isEmpty({}); //true
Utils.Objects.isEmpty(null); //true
let undefinedVar;
Utils.Objects.isEmpty(undefinedVar); //true
Utils.Objects.isEmpty([""]); //true
Utils.Objects.isEmpty([{}]); //true
Utils.Objects.isEmpty([[]]); //true
Utils.Objects.isEmpty([null]); //true
Utils.Objects.isEmpty(["", {}, [], null]); //true
Utils.Objects.isEmpty({"a": ""}); //true
Utils.Objects.isEmpty({"a": {}}); //true
Utils.Objects.isEmpty({"a": []}); //true
Utils.Objects.isEmpty({"a": {}}); //true
```

### hasProperty(object, path)

Returns true if `object` has a value existing at `path`, false otherwise.

```javascript
Utils.Objects.hasProperty({"first": {"second": "value"}}, "first.second"); //returns true
Utils.Objects.hasProperty({"first": {"second": "value"}}, "first.third"); //returns false
```

### hasProperties(object, paths)

Return true if `object` has values existing at all `paths`, false otherwise.

```javascript
const witness = {
  "first": {
    "second": "value",
    "third": "value"
  },
  "fourth": "be with you"
};

Utils.Objects.hasProperties(witness, ["first.second", "first.third", "fourth"]); //returns true
```

### getValueAt(object, path)

Returns the value found in `object` at `path` if it exists, null otherwise.

```javascript
const witness = {
  "first": {
    "second": "value",
    "third": "value"
  },
  "fourth": "be with you"
};

Utils.Objects.getValueAt(witness, "first.second"); //returns "value"
Utils.Objects.getValueAt(witness, "first.fourth"); //returns null
```

### setValueAt(object, value, path)

Set the value `value` at path `path` in `object`. Creates the path if necessary.

```javascript
const witness = {
  "first": {
    "second": "value"
  }
};

Utils.Objects.setValueAt(witness, "bar", "first.foo");
console.log(witness);
/**
{
  "first": {
    "second": "value",
    "foo": "bar"
  }
}
**/
```

### keepProperties(object, paths, [output])

Remove all properties from `object` except the given ones in `paths`. Returns new object or set result in `output` if given.

```javascript
const witness = {
  "have": {
    "a": {
      "lot": "of",
      "extra": "values"
    },
    "and": {
      "I": "want"
    }
  },
  "to": {
    "get": "rid",
    "of": "them"
  }
};

let afterClean = {};

Utils.Objects.keepProperties(witness, ["have.a"], afterClean);

console.log(afterClean);
/**
{
  "have": {
    "a": {
      "lot": "of",
      "extra": "values"
    }
  }
}
**/

const otherClean = Utils.keepProperties(witness, ["have.a.lot", "have.and", "to.of"]);
console.log(otherClean);
/**
{
  "have": {
    "a": {
      "lot": "of"
    },
    "and": {
      "I": "want"
    }
  },
  "to": {
    "of": "them"
  }
}
**/
```

### removeEmptyProperties(object)

Removes all empty properties from `object`. Empty follows the same definition as in `isEmpty` function.

```javascript
const witness = {
  "foo": "bar",
  "bar": "",
  "baz": {
    "foo": "",
    "bar": {},
    "john": "bonjour"
  }
};

Utils.Objects.removeEmptyProperties(witness);
console.log(witness);
/**
{
  "foo": "bar",
  "baz": {
    "john": "bonjour"
  }
}
**/
```

### isConstructor(obj)

Returns true if `obj` is a conscructor, false otherwise.

```javascript
Utils.Objects.isConstructor(String); //true
Utils.Objects.isConstructor(Boolean); //true
Utils.Objects.isConstructor(Number); //true
Utils.Objects.isConstructor(Array); //true
Utils.Objects.isConstructor(Object); //true
Utils.Objects.isConstructor("Number"); //false
Utils.Objects.isConstructor(14); //false
```

### inspectSchema(schema)

Inspect given schema and throw an error if it's not valid.
Not valid = somewhere in the object a value is not a consctructor (and so is not a type)

Arrays must have a length of 1 contain valid sub schema or constructor.
Sub objects must be valid.

```javascript
//does not throw error
Utils.Objects.inspectSchema({"foo": String, "bar": Boolean, "baz": Number});
Utils.Objects.inspectSchema({"foo": String, "bar": Boolean, "baz": [Number]});
Utils.Objects.inspectSchema({"foo": String, "bar": Boolean, "baz": [{"fil": String, "fol": Boolean}]});
Utils.Objects.inspectSchema({"foo": String, "bar": Boolean, "baz": {"fooz": Number, "boz": String}});

///throws an error
Utils.Objects.inspectSchema({"foo": String, "bar": Boolean, "baz": 23});
Utils.Objects.inspectSchema({"foo": String, "bar": Boolean, "baz": [Number, String]});
Utils.Objects.inspectSchema({"foo": String, "bar": Boolean, "baz": [{"fil": Number, "fol": String}, {"fal": Number}]});
Utils.Objects.inspectSchema({"foo": String, "bar": Boolean, "baz": [23]});
Utils.Objects.inspectSchema({"foo": String, "bar": Boolean, "baz": {"fooz": Number, "boz": "biz"}});
```

### buildSchema(schema)

Takes a schema with types defined by Strings instead of constructors and generate a fully typed Schema.
Not valid = somewhere in the object a value is not a type.

Throws an error if one of the types is not known.
Arrays must have a length of 1 contain valid sub schema or type.
Sub objects must be valid.

```javascript
//does not throw error
let schema = Utils.Objects.buildSchema({"foo": "String", "bar": "Boolean", "baz": "Number"});
//gives: {"foo": String, "bar": Boolean, "baz": Number}
```

### matchFieldsAndTypes(object, schema, strict = false)

Check if `object` match `schema` and throw an error if it doesn't.

Check fails not depending on `strict` value if:

- at least one `object`'s field has not the expected type
- at least one `object`'s sub object's field has not the expected type

Check fails if only if `strict` is true if:

- a field in `schema` is missing in `object`

```javascript
//does not throw error
Utils.Objects.matchFieldsAndTypes({"foo": "foo", "bar": true, "baz": 23}, {"foo": String, "bar": Boolean, "baz": Number});
Utils.Objects.matchFieldsAndTypes({"foo": "foo", "bar": true, "baz": 23, "boo": ["str1", "str2"]}, {"foo": String, "bar": Boolean, "baz": Number, "boo": [String]});
Utils.Objects.matchFieldsAndTypes({"foo": "foo", "bar": true}, {"foo": String, "bar": Boolean, "baz": Number}); //strict mode false
Utils.Objects.matchFieldsAndTypes({"foo": "foo", "bar": true, "baz": {"fooz": "bla", "faz": 23}}, {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": Number}});
Utils.Objects.matchFieldsAndTypes({"foo": "foo", "bar": true, "baz": {"fooz": "bla", "faz": {"gaz": "gaz", "goz": false}}}, {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": {"gaz": String, "goz": Boolean}}});
Utils.Objects.matchFieldsAndTypes({"foo": "foo", "bar": true, "baz": {"fooz": "bla", "faz": [{"gaz": "gaz", "goz": false}, {"gaz": "taz", "goz": true}]}}, {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": [{"gaz": String, "goz": Boolean}]}});

//does throw error
Utils.Objects.matchFieldsAndTypes({"foo": "foo", "bar": true}, {"foo": String, "bar": Boolean, "baz": Number}); //strict mode true
Utils.Objects.matchFieldsAndTypes({"foo": "foo", "bar": true, "baz": "string instead of number"}, {"foo": String, "bar": Boolean, "baz": Number});
Utils.Objects.matchFieldsAndTypes({"foo": "foo", "bar": true, "baz": 23, "boo": [true, "str2"]}, {"foo": String, "bar": Boolean, "baz": Number, "boo": [String]});
Utils.Objects.matchFieldsAndTypes({"foo": "foo", "bar": true, "baz": {"fooz": "bla", "faz": "23"}}, {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": Number}});
Utils.Objects.matchFieldsAndTypes({"foo": "foo", "bar": true, "baz": {"fooz": "bla", "faz": {"gaz": "gaz", "goz": "false"}}}, {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": {"gaz": String, "goz": Boolean}}});
Utils.Objects.matchFieldsAndTypes({"foo": "foo", "bar": true, "baz": {"fooz": "bla", "faz": [{"gaz": "gaz", "goz": false}, {"gaz": "taz", "goz": "true"}]}}, {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": [{"gaz": String, "goz": Boolean}]}});
Utils.Objects.matchFieldsAndTypes({"foo": "foo", "bar": true, "baz": {"fooz": "bla", "faz": [{"gaz": "gaz"}, {"gaz": "taz", "goz": "true"}]}}, {"foo": String, "bar": Boolean, "baz": {"fooz": String, "faz": [{"gaz": String, "goz": Boolean}]}});
```
