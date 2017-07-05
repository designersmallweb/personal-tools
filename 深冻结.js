function deepFreeze(o) {
    var prop, propKey;
    Object.freeze(o); //首先冻结第一层对象
    for (propKey in o) {
        prop = o[propKey];
        if (!o.hasOwnProperty(propKey) || !(typeof prop === "object") || Object.isFrozen(prop)) {
            continue;
        }
        deepFreeze(prop); //递归
    }
}
