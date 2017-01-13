# ECMAScript Version Detector

**esverd** can detect support for ECMAScript features. And can also detect the ECMAScript version.

Any issue, suggestion and pull request is welcome!

## Documentation

The module documentation can be found [here](https://hydroper.github.io/esverd/module-esverd.html). Compile it using:

```batch
jsdoc -c jsdoc/conf.json -t ./node_modules/ink-do
cstrap/template -d docs -R README.md -r esverd.js
```

## Most known features

 * *ArrayComprehensions*: ES7+
 * *ArrowFunction*: ES6+
 * *Class*: ES6+
 * *Const*: ES6+
 * *DefaultParameter*: ES5+ (mostly an *AssignmentPattern*).
 * *Destructuring*: ES6+
 * *ForOf*: ES6+
 * *Generator*: ES6+ (generator functions that can use *yield*)
 * *PropertyGetter*: ES6+ (special syntax for get)
 * *PropertySetter*: ES6+ (special syntax for set)
 * *IdentifierUnicodeEscapeSequence*: ES5+
 * *IdentifierUnicodeEscapeSequence2*: ES6+
 * *Label*: ES3+
 * *Let* : ES6+
 * *LineBreakString*: ES5+
 * *ReservedWordIdentifier*: ES5+
 * *Spread*: ES6+
 * *SuperExpression*: ES6+
 * *TemplateLiteral*: ES6+