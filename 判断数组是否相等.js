function arraysSimilar(arr1, arr2) {
    if (arr1 instanceof Array && arr2 instanceof Array) {
        var key1 = [],
            key2 = [],
            len = arr1.length,
            len2 = arr2.length;
        // 数组的长度相等判断
        if (len != len2) {
            return false; }
        // 类型相同判断
        if (len) {
            // 获取类型列表
            for (var i = 0; i < len; i++) {
                // 数组1的类型列表字串
                var item1 = arr1[i],
                    typeFirst = typeOf(item1);
                if (key1.join().indexOf(typeFirst) < 0) {
                    key1.push(typeFirst);
                }

                // 数组2的类型列表字串
                var item2 = arr2[i],
                    typeSecond = typeOf(item2);
                if (key2.join().indexOf(typeSecond) < 0) {
                    key2.push(typeSecond);
                }
            }
            key1 = key1.sort();
            key2 = key2.sort();
            // 类型字串比较
            if (key1.join() == key2.join()) {
                return true;
            } else {
                return false;
            }
        } else {
            // 空数组相等
            return true;
        }
    } else {
        // 非数组
        return false;
    }
}