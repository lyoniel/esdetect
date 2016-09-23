/*! ecmascriptdetect on: https://github.com/nicematt/ecmascript-detect */
(function(root, name, factory) {
  'use strict'

  /* Node.js */
  if (typeof exports === 'object') {
    factory(exports)
  }

  /* Web browser */
  else {
    factory(root[name] = {})
  }

})(this, 'ecmascriptdetect', function(exports) {
  'use strict'

  exports.noConflict = function() {
    return exports
  }

  var features = {
      "arrowFunction": "(a=>{})"
    , "class": "(class{})"
    , "const": "const c=true"
    , "defaultParams": "(function(a=false){})"
    , "destructuring": "var {a}={a:true}"
    , "generator": "(function*(){})"
    , "getter": "({get a(){}})"
    , "forOf": "for(var b of [])"
    , "label": "l:void 0"
    , "let": "let v"
    , "reservedWords": "({catch: true})"
    , "setter": "({set a(v){}})"
    , "spread": "[...[]]"
    , "super": "({b(){super.a}})"
    , "yield": "(function*(){yield true})"
  }

  /**
   * Evaluate code to check its functionality.
   */
  function evaluate(code) {
    try {
      eval(code)
      return true
    } catch(e) {
      return false
    }
  }

  /**
   * Check if a set of features are supported.
   */
  exports.supports = function() {

    var code = "(function(){"

    var i = 0,
    len = arguments.length

    for (; i < len; ++i) {
      var feature = arguments[i].toString();
      if (feature in features)
        code += features[feature] + ';'
    }

    code += "})()"

    return evaluate(code)

  }

  /**
   * Empty and turns ecmascriptdetect dummy.
   */
  exports.emptyTables = function() {
    var i

    for (i in features)
      delete features[i]

    for (i in exports)
      delete exports[i]
  }

  /**
   * Check if current ES appears to be ES6.
   */
  function checkES6() {
    var methods = typeof Object.assign === 'function' &&
                  typeof Object.freeze === 'function'

    var syntax = exports.supports(
                         "arrowFunction"
                       , "class"
                       , "const"
                       , "forOf"
                       , "defaultParams"
                       , "destructuring"
                       , "super"
                       , "yield"
                       )

    return methods && syntax
  }

  /**
   * Check if current ES appears to be ES5.
   */
  function checkES5() {
    var methods = typeof Array.prototype.filter === 'function' &&
                  typeof Function.prototype.bind === 'function' &&
                  typeof Object.defineProperty === 'function' &&
                  typeof JSON === 'object' &&
                  typeof String.prototype.trim === 'function'

    var syntax = exports.supports("reservedWords")

    return methods && syntax
  }

  /**
   * Check if browser's ECMAScript version is like a specific version.
   */
  exports.like = function(ver) {
    if (ver === 6) {
      return checkES6()
    }
    else if (ver === 5) {
      return checkES5()
    }
    else {
      /* checker not implemented for @ver */
      return null
    }
  }

})
