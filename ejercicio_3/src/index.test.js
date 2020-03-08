const Vector = require('./index');

test('Vectors only can be created with an Array or Vector with all elements numeric (number in string too)', function () {
  var vectorBase = new Vector([-1, 2, 3]);
  var vectorEmpty = new Vector([]);
  var vectorFloats = new Vector([-1.0, 2.0, 3.0]);
  var vectorStrings = new Vector(['-1', '2.0', '3']);

  var vectorFromVectorFloats = new Vector(vectorFloats);
  var vectorFromVectorStrings = new Vector(vectorStrings);
  var thrownErrorIncorrectType = "Only arrays or vectors are allowed to create vectors";
  var thrownErrorIncorrectElementType = "Only array with number-like values allowed";

  expect(vectorEmpty).toStrictEqual(new Vector([]));
  expect(vectorFloats).toStrictEqual(vectorBase);
  expect(vectorStrings).toStrictEqual(vectorBase);
  expect(vectorFromVectorFloats).toStrictEqual(vectorBase);
  expect(vectorFromVectorStrings).toStrictEqual(vectorBase);
  expect(vectorFromVectorStrings).toStrictEqual(vectorBase);

  expect(function () {
    new Vector('[1, 2, 3]');
  }).toThrow(thrownErrorIncorrectType);
  expect(function () {
    new Vector('1');
  }).toThrow(thrownErrorIncorrectType);
  expect(function () {
    new Vector(1);
  }).toThrow(thrownErrorIncorrectType);
  expect(function () {
    new Vector({'a':'b'});
  }).toThrow(thrownErrorIncorrectType);

  expect(function () {
    new Vector(['a']);
  }).toThrow(thrownErrorIncorrectElementType);
  expect(function () {
    new Vector([1, 'a']);
  }).toThrow(thrownErrorIncorrectElementType);
  expect(function () {
    new Vector([{'a': 'b'}]);
  }).toThrow(thrownErrorIncorrectElementType);
});

test('Sum vectors', function () {
  var vector1 = new Vector([1, 2, 3]);
  var vector2 = new Vector([3, 4, 5]);

  var expectedVectorAfterAddition = new Vector([4, 6, 8]);

  expect(vector1.add(vector2)).toStrictEqual(expectedVectorAfterAddition);
});

test('Subtract vectors', function () {
  var vector1 = new Vector([1, 2, 3]);
  var vector2 = new Vector([3, 4, 5]);

  var expectedVectorAfterSubtraction = new Vector([-2, -2, -2]);

  expect(vector1.subtract(vector2)).toStrictEqual(expectedVectorAfterSubtraction);
});

test('Dot vectors', function () {
  var vector1 = new Vector([1, 2, 3]);
  var vector2 = new Vector([3, 4, 5]);

  var expectedDotResult = 26;

  expect(vector1.dot(vector2)).toBe(expectedDotResult);
});

test('Normalize vector', function () {
  var vector1 = new Vector([1, 2, 3]);

  var expectedNormalization = Math.sqrt(14);

  expect(vector1.norm()).toBe(expectedNormalization);
});

test('Add, Subtract and Dot operations should only can be done with same length vectors', function () {
  var vector1 = new Vector([1, 2, 3]);
  var vector2 = new Vector([5, 6, 7, 8]);

  var thrownErrorMessageExpected = "Only same length vectors can perform this operation";

  expect(function () {
    vector1.add(vector2);
  }).toThrow(thrownErrorMessageExpected);
  expect(function () {
    vector1.subtract(vector2);
  }).toThrow(thrownErrorMessageExpected);
  expect(function () {
    vector1.dot(vector2);
  }).toThrow(thrownErrorMessageExpected);
});

test('Best implementation should be instanceof Array and Vector', function() {
  var vector1 = new Vector([1, 2, 3]);
  var vector2 = new Vector(vector1);

  expect(vector1 instanceof Array).toBe(true);
  expect(vector1 instanceof Vector).toBe(true);
  expect(vector2 instanceof Array).toBe(true);
  expect(vector2 instanceof Vector).toBe(true);
  expect(vector1).toStrictEqual(vector2);
});