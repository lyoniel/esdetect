/*! https://github.com/hydroper/esx */
;(function(root, factory) {
  'use strict';

  /* Require.JS export */
  if (('function' === typeof define) && define.amd)
    define([exports], factory);
  /* Node.JS export */
  else if (typeof exports === 'object')
    factory(exports);
  /* Browser export */
  else
    factory(root.esx = {});

})(this, function(exports) {

  'use strict';

  var features = {
      'ArrayComprehensions': '[ for(a of []) a ]'
    , 'ArrowFunction': '(_ => _)'
    , 'Class': '(class Name {})'
    , 'Const': 'const constant = true'
    , 'DefaultParameter': '(function (A=true) {})'
    , 'Destructuring': 'let {dest} = { dest: true }'
    , 'ForOf': 'for (var b of [])'
    , 'Generator': '(function*(){})'
    , 'PropertyGetter': '({ get a() {} })'
    , 'PropertySetter': '({ set a(v) {} })'
    , 'IdentifierUnicodeEscapeSequence': '\\u0041'
    , 'IdentifierUnicodeEscapeSequence2': '\\u{41}'
    , 'Label': 'labelName: ;'
    , 'Let': 'let stuck'
    , 'LineBreakString': '\'\\\n\''
    , 'ReservedWordIdentifier': '({ catch: true })'
    , 'SpreadOperation': '[...[]]'
    , 'TemplateLiteral': '`template`'
    , 'SuperExpression': '({ method() { super.prop }} )'
  };

  function evaluate(code) {
    try {
      eval(code);
      return true;
    } catch(e) {
      return false;
    }
  }

  /**
   * Checks if a set of features are supported.
   */
  function supports() {
    var code = '(function(){';

    var i = 0;
    var len = arguments.length;

    while(i <= len) {
      var feature = arguments[i].toString();

      if (features.hasOwnProperty(feature))
        code += features[feature] + ';';
    }

    code += '})()';
    return evaluate(code);
  }

  exports.supports = supports;

  function checkES7() {
    return supports('ArrayComprehensions');
  }

  function checkES6() {
    var methods = 'function' === typeof Object.assign &&
                  'function' === typeof Object.freeze;

    var syntax = supports(
        'ArrowFunction'
      , 'Class'
      , 'Const'
      , 'ForOf'
      , 'DefaultParameter'
      , 'Destructuring'
      , 'Generator'
      , 'SuperExpression'
    );

    return methods && syntax;
  }

  function checkES5() {
    var methodSupport = ( 'function' === typeof [].filter ) &&
      ( 'function' === typeof Function.prototype.bind ) &&
      ( 'function' === typeof Object.defineProperty ) &&
      ( 'function' === typeof ''.trim ) &&
      ( 'object'   === typeof JSON );

    var syntaxSupport = supports('ReservedWordIdentifier') &&
      supports('LineBreakString');

    return methodSupport && syntaxSupport;
  }

  function checkES3() {
    return 'function' === typeof [].hasOwnProperty;
  }

  /**
   * Check for ECMAScript version.
   */
  exports.detectVersion = function() {
    return checkES7() ? 7 :
      checkES6() ? 6 :
      checkES5() ? 5 :
      checkES3() ? 3 :
      undefined;
  };

});
