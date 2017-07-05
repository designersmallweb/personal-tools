var eventUtil = {
    // 添加句柄/事件
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    /*addHandler: function() {
            if (window.addEventListener) {
                return function(target, type, handler) {
                    target.addEventListener(type, handler);
                };
            } else if (window.attachEvent) {
                return function(target, type, handler) {
                    target.attachEvent("on" + type, function() {
                        handler.call(target, window.event);
                    });
                };
            } else {
                return function(target, type, handler) {
                    target["on" + type] = handler;
                };
            }
        }*/
        // 删除句柄/事件
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    getEvent: function(event) {
        return event ? event : window.event;
    },
    //得到事件
    getType: function(event) {
        return event.type;
    },
    //得到事件类型
    getElement: function(event) {
        return event.target || event.srcElement;
    },
    //得到事件目标，为谁添加事件
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    //阻止事件默认行为
    stopPropagation: function(event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }
        //阻止冒泡
};
/*为对象添加事件例如eventUtil.addHandler(box, 'click', function() {alert('BOX');});*/

/*function addHandler(){
    if (window.addEventListener) {
        return function(target,type,handler) {
            target.addEventListener(type,handler);
        };
    }else if(window.attachEvent){
        return function(target,type,handler) {
            target.attachEvent("on"+type,function() {
                handler.call(target,window.event);
            });
        };
    }else{
        return function(target,type,handler) {
            target["on"+type]=handler;
        };
    }
}
var createEvent=createEventRegister();
creareEvent();*/
