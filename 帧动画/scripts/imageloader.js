
    'use strict';
    var __id = 0;
    //预加载图片函数
//image图片数组或对象
//callback全部图片加载完成后调用回调函数
//timeout加载未完成等待时间
    function loadImage(images, callback, timeout) {
        // 加载完成，图片计数器
        var count = 0;
        //全部图片加载成功的一个标志
        var success = true;
        //超时timer的id
        var timeoutId = 0;
        //是否加载超时
        var isTimeout = false;
        //对图片数组或对象进行遍历
        for (var key in images) {
            //过滤prototype上的属性
            if (!images.hasOwnProperty(key)) {
                continue;
            }
            //获得每个图片元素
            var item = images[key];
            //格式化object:{src:xxx}
            if (typeof item === 'string') {
                item = images[key] = {
                    src: item
                };
            }
            //如果格式不满足期望，则丢弃此条数据进行下一次遍历
            if (!item || !item.src) {
                continue;
            }
            //计数+1
            count++;
            //设置图片元素id
            item.id = '__img__' + key + getId();
            //设置图片元素的img属性,它是image对象
            item.img = window[item.id] = new Image();
            doLoad(item);
        }
        //遍历完成计数为0，直接调用callback
        if (!count) {
            callback(success);
        } else if (timeout) {
            timeoutId = setTimeout(onTimeout, timeout);
        }
//真正进行图片加载函数
//item图片元素对象
        function doLoad(item) {
            item.status = 'loading';
            var img = item.img;
            //定义图片加载成功的回调函数
            img.onload = function() {
                success = success & true;
                item.status = 'loading';
                done();
            };
            //图片加载失败的回调函数
            img.onerror = function() {
                success = false;
                item.status = 'error';
                done();
            };
            img.src = item.src;
//每张图片加载完成的回调函数
            function done() {
                img.onload = img.onerror = null;
                try {
                    delete window[item.id];
                } catch (e) {

                }
                //每张图片加载完成，计数器减1，当所有图片加载完成且没有超时，清除超时计数器，且执行回调函数
                if (!--count && !isTimeout) {
                    clearTimeout(timeoutId);
                    callback(success);
                }
            }
        }
//超时函数
        function onTimeout() {
            isTimeout = true;
            callback(false);
        }
    }

    function getId() {
        return ++__id;
    }
    module.exports = loadImage;

