//共用函数，封装内部调用，缓存计算结果
function memorize(f) {
    var cache = {};
    return function() {
        var key = arguments.length + Array.prototype.join.call(arguments, ","); //参数长度和参数作为属性值
        if (key in cache) //存在则直接读取缓存数据
        {
            return cache[key];
        } else {
            cache[key] = f.apply(this, arguments);
            return cache[key];
            //不存在，则计算，并缓存计算结果
        }
    };
}
//模拟需要很长时间的计算的函数
function TestFunction(x) {
    return x * x;
}
//测试，调用
function test1() {
    var t = memorize(TestFunction);
    var k = t(6); //  第一次调用需要计算
    var k2 = t(6); //第二次直接读取换缓存，不在计算
    alert(k2);
}
function test2() {
    var t = memorize(
        function(x) { //递归函数计算X的阶乘
            if (x <= 0) {
                return 1;
            } else {
                return x * t(x - 1);
            }
        }
    );
    var k = t(6); //缓存了6至1的阶乘
    var k2 = t(7); //只需要调用一次，计算6阶乘时使用了缓存
    alert(k2);
}