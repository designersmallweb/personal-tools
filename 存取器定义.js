//定义存储器
//对象内部定义
var o = {
    get p() {
        return 'getter';
    },
    set p(value) {
        console.log('setter: ' + value);
    }
};
o.p; // "getter"
o.p = 123; // "setter: 123"

//Object.defineProperty定义
var d = new Date();

Object.defineProperty(d, 'month', {
    get: function() {
        return d.getMonth();
    },
    set: function(v) {
        d.setMonth(v);
    }
});

//Object.create方法定义
var o = Object.create(Object.prototype, {
    foo: {
        get: function() {
            return 'getter';
        },
        set: function(value) {
            console.log('setter: ' + value);
        }
    }
});

//利用存取器，可以实现数据对象与DOM对象的双向绑定
Object.defineProperty(user, 'name', {
    get: function() {
        return document.getElementById('foo').value;
    },
    set: function(newValue) {
        document.getElementById('foo').value = newValue;
    },
    configurable: true
});
