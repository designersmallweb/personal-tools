function hasClass(obj, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length === 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + obj.className + ' ');
}

function addClass(obj, cls) {
    if (!hasClass(obj, cls)) {
        obj.className = obj.className === '' ? cls : obj.className + ' ' + cls;
    }
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var newClass = ' ' + obj.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        obj.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}
//使用方法 addClass(_menu, "current");