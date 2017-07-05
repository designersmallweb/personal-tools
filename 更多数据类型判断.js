['Null',
    'Undefined',
    'Object',
    'Array',
    'String',
    'Number',
    'Boolean',
    'Function',
    'RegExp',
    'NaN',
    'Infinite'
].forEach(function(t) {
    type['is' + t] = function(o) {
        return type(o) === t.toLowerCase();
    };
});

type.isObject({}); // true
type.isNumber(NaN); // true
type.isRegExp(/abc/); // true