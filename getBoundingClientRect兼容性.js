var box = document.getElementById('box'); // 获取元素

//alert(box.getBoundingClientRect().top); 元素上边距离页面上边的距离
//alert(box.getBoundingClientRect().right); 元素右边距离页面左边的距离
//alert(box.getBoundingClientRect().bottom); 元素下边距离页面上边的距离
//alert(box.getBoundingClientRect().left); 元素左边距离页面左边的距离
//注意： IE、 Firefox3 + 、Opera9 .5、 Chrome、 Safari支持， 在IE中， 默认坐标从(2, 2) 开始计算， 导致最终距离比其他浏览器多出两个像素， 我们需要做个兼容。
document.documentElement.clientTop; // 非IE为0，IE为2
document.documentElement.clientLeft; // 非IE为0，IE为2
functiongGetRect(element) {
    var rect = element.getBoundingClientRect();
    var top = document.documentElement.clientTop;
    var left = document.documentElement.clientLeft;
    return {
        top: rect.top - top,
        bottom: rect.bottom - top,
        left: rect.left - left,
        right: rect.right - left
    }
}
