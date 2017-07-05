//得到类名
function getByClass(clsName, parent) {
    var oParent = parent ? document.getElementById(parent) : document;
    if (oParent.getElementsByClassName) {
        return oParent.getElementsByClassName(clsName);
    } else {
        var eles = [],
            elements = oParent.getElementsByTagName('*');
        for (var i = 0, l = elements.length; i < l; i++) {
            if (elements[i].className == clsName ||
                elements[i].className.indexOf(clsName + '') > 0 ||
                elements[i].className.indexOf('' + clsName + '') > 0 ||
                elements[i].className.indexOf('' + clsName >= 0)) {
                eles.push(elements[i]);
            }
        }
        return eles;
    }
}
//得到id
function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}