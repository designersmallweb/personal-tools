/**
 * 类型判断方法
 * param item
 * return type(string,function,boolean,number,undefined,null,window,Date,Array,object)
 */
function typeOf(item) {
    var type = typeof item;
    if (type != "object") {
        // 判断基本类型string,function,boolean,number,undefine
    } else if (item === null) {
        // check null
        type = "null";
    } else if (item === window) {
        // check window
        type = "window";
    } else {
        // 判断object类型object,date,array
        if (item instanceof Date) {
            type = "date";
        } else if (item instanceof Array) {
            type = 'array';
        } else {
            type = 'object';
        }
    }
    return type;
}