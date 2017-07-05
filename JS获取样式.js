(function(){
    if(!window.pan){
        window.pan={};
    }
    //pan库中其它函数的定义，略
    //
    function getStyle(elem,styleName){
        if(elem.style[styleName]){//内联样式
            return elem.style[styleName];
        }
        else if(elem.currentStyle){//IE
            return elem.currentStyle[styleName];
        }
        else if(document.defaultView && document.defaultView.getComputedStyle){//DOM
            styleName = styleName.replace(/([A-Z])/g,'-$1').toLowerCase();
            var s = document.defaultView.getComputedStyle(elem,'');
            return s&&s.getPropertyValue(styleName);
        }
        else{//other,for example, Safari
            return null;
        }
    }
    window.pan.getStyle = getStyle;
})();


//获取样式完整版
function getStyle1(obj, attr)
{
 if(obj.currentStyle)
 {
  return obj.currentStyle[attr];
 }
 else
 {
  return getComputedStyle(obj, false)[attr];
 }
}

window.onload=function ()
{
 var oDiv=document.getElementById('div1');
 alert(getStyle1(oDiv, 'backgroundColor'));
};

//获取样式简洁版
function getStyle2(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}
//opacity 设置透明度
function setOpacity(elem, value) {
    elem.filters ? elem.style.filter = 'alpha(opacity=' + value + ')' : elem.style.opacity = value / 100;
}


//完美版
function css(obj, attr, value){
    switch (arguments.length){
        case 2:
            if(typeof arguments[1] == "object"){
                for (var i in attr) i == "opacity" ? (obj.style.filter = "alpha(opacity=" + attr[i] + ")", obj.style[i] = attr[i] / 100) : obj.style[i] = attr[i];
            }else{
                return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
            }
            break;
        case 3:
            attr == "opacity" ? (obj.style.filter = "alpha(opacity=" + value + ")", obj.style[attr] = value / 100) : obj.style[attr] = value;
            break;
    }
}