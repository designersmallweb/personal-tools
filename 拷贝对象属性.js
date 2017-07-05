//拷贝对象所有可遍历（enumerable）的属性
var extend = function(to, from) {
    for (var property in from) {
        var descriptor = Object.getOwnPropertyDescriptor(from, property);

        if (descriptor && (!descriptor.writable || !descriptor.configurable || !descriptor.enumerable || descriptor.get || descriptor.set)) {
            Object.defineProperty(to, property, descriptor);
        } else {
            to[property] = from[property];
        }
    }
};
extend({}, {
        get a() {
            return 1;
        }
    });
// { get a(){ return 1 } })
extend(document.body.style, {
    backgroundColor: "red"
});
