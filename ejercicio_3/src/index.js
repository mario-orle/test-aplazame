module.exports = (function () {
  function Vector(val) {
    if (!val instanceof Array || !(val instanceof Vector && Array.isArray(val)) || !val) {
      throw "Only arrays or vectors are allowed to create vectors";
    }
    for (var i = 0; i < val.length; i++) {
      if (isNaN(val[i])) {
        throw "Only array with number-like values allowed";
      }
      this.push(Number(val[i]));
    }
    return this.slice();
  }
  Vector.prototype = Array.prototype;
  Vector.prototype.constructor = Vector;
  Vector.prototype.add = function (vector) {
    lengthCheck.bind(this)(vector);
    return this.map(function (element, index) {
      return element + vector[index];
    });
  }
  Vector.prototype.subtract = function (vector) {
    lengthCheck.bind(this)(vector);
    return this.map(function (element, index) {
      return element - vector[index];
    });
  }
  Vector.prototype.dot = function (vector) {
    lengthCheck.bind(this)(vector);
    var initialValue = 0;
    return this.reduce(function (acc, element, index) {
      return acc + (element * vector[index]);
    }, initialValue);
  }
  Vector.prototype.norm = function () {
    var initialValue = 0;
    return Math.sqrt(this.reduce(function(acc, element) {
      return acc + Math.pow(element, 2);
    }, initialValue));
  }
  var lengthCheck = function(vector) {
    if (this.length !== vector.length) {
      throw "Only same length vectors can perform this operation";
    }
  }
  return Vector;
})();