/*! https://github.com/hydroper/esverd */
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
    factory(root.esverd = {});

})(this, function(exports) {
  'use strict';

  var features = {
      'ArrayComprehensions': '[ for(a of []) a ]'
    , 'ArrowFunction': '(_ => _)'
    , 'Class': '(class Name {})'
    , 'Const': 'const constant = true'
    , 'DefaultParameter': '(function (A = true) {})'
    , 'Destructuring': 'let {dest} = { dest: true }'
    , 'ForOf': 'for (var b of [])'
    , 'Generator': '(function*() {})'
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
    var methodSupport = ( 'function' == typeof Object.assign ) &&
      ( 'function' == typeof Object.freeze );

    var syntaxSupport = supports(
        'ArrowFunction'
      , 'Class'
      , 'Const'
      , 'ForOf'
      , 'DefaultParameter'
      , 'Destructuring'
      , 'Generator'
      , 'SuperExpression'
    );
    return methodSupport && syntaxSupport;
  }

  function checkES5() {
    var methodSupport =
      /* Array #filter */
      ( 'function' == typeof [].filter ) &&
      /* Function #bind */
      ( Function.prototype.bind instanceof Function ) &&
      /* static Object.defineProperty */
      ( Object.defineProperty instanceof Function ) &&
      /* String #trim */
      ( 'function' == typeof ''.trim ) &&
      /* JSON library */
      ( JSON instanceof Object );

    var syntaxSupport = supports('ReservedWordIdentifier') &&
      supports('LineBreakString');

    return methodSupport && syntaxSupport;
  }

  function checkES3() {
    return [].hasOwnProperty instanceof Function;
  }

  /**
   * Check for ECMAScript version.
   */
  function detectVersion() {
    return checkES7() ? 7 :
      checkES6() ? 6 :
      checkES5() ? 5 :
      checkES3() ? 3 :
      undefined;
  };

  exports.version = detectVersion;
});
