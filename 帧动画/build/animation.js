(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["animation"] = factory();
	else
		root["animation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function() {
	    'use strict';
	    var loadImage = __webpack_require__(1);
	    var Timeline = __webpack_require__(2);
	    //开始状态
	    var STATE_INITIAL = 0;
	    //开始状态
	    var STATE_START = 1;
	    //停止状态
	    var STATE_STOP = 2;
	    //同步任务
	    var TASK_SYNC = 0;
	    //异步任务
	    var TASK_ASYNC = 1;
	    //简单函数封装，实现callback
	    //callback执行函数
	    function next(callback) {
	        callback && callback();
	    }
	    //帧动画库类
	    function Animation() {
	        this.taskQueue = [];
	        this.index = 0;
	        this.state = STATE_INITIAL;
	        this.timeline = new Timeline();
	    }
	    //同步任务，去预加载图片
	    //imglist图片数组
	    Animation.prototype.loadImage = function(imglist) {
	        var taskFn = function(next) {
	            loadImage(imglist.slice(), next);
	        };
	        var type = TASK_SYNC;
	        return this._add(taskFn, type);
	    };
	    //改变单张图片位置position
	    //ele dom对象
	    //positions背景位置数组
	    //imageUrl图片地址
	    Animation.prototype.changePosition = function(ele, positions, imageUrl) {
	        var len = positions.length;
	        var taskFn;
	        var type;
	        if (len) {
	            var me = this;
	            taskFn = function(next, time) {
	                if (imageUrl) {
	                    ele.style.backgroundImage = 'url(' + imageUrl + ')';
	                }
	                var index = Math.min(time / me.interval | 0, len - 1);
	                var position = positions[index].split(' ');
	                //改变dom对象的背景图片位置
	                ele.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';
	                if (index === len - 1) {
	                    next();
	                }
	            };
	            type = TASK_ASYNC;
	        } else {
	            taskFn = next;
	            type = TASK_SYNC;
	        }
	        return this._add(taskFn, type);
	    };
	    //异步定时，改变image的src属性
	    //ele image标签
	    //imglist 图片数组
	    Animation.prototype.changeSrc = function(ele, imglist) {
	        var len = imglist.length;
	        var taskFn;
	        var type;
	        if (len) {
	            var me = this;
	            taskFn = function(next, time) {
	                //获得当前图片索引
	                var index = Math.min(time / me.interval | 0, len - 1);
	                //改变image对象的图片地址
	                ele.src = imglist[index];
	                if (index === len - 1) {
	                    next();
	                }
	            };
	            type = TASK_ASYNC;
	        } else {
	            taskFn = next;
	            type = TASK_SYNC;
	        }
	        return this._add(taskFn, type);
	    };
	    //高级用法，异步定时任务，自定义每帧动画函数
	    //taskFn 自定义每帧动画的执行任务函数
	    Animation.prototype.enterFrame = function(taskFn) {
	        return this._add(taskFn, TASK_ASYNC);
	    };
	    //同步任务，上一任务完成执行回调函数
	    //callback回调函数
	    Animation.prototype.then = function(callback) {
	        var taskFn = function(next) {
	            callback();
	            next();
	        };
	        var type = TASK_SYNC;
	        return this._add(taskFn, type);
	    };
	    //开始执行任务，异步定时任务执行间隔
	    Animation.prototype.start = function(interval) {
	        if (this.state === STATE_START) {
	            return this;
	        }
	        //任务链中没有任务，则返回
	        if (!this.taskQueue.length) {
	            return this;
	        }
	        this.state = STATE_START;
	        this.interval = interval;
	        this._runTask();
	        return this;
	    };
	    //添加一个同步任务，回退到上一任务，实现重复上一任务的效果，可以定义重复次数
	    //times重复次数
	    Animation.prototype.repeat = function(times) {
	        var me = this;
	        var taskFn = function() {
	            if (typeof times === 'undefined') {
	                //无限回退到上一个任务
	                me.index--;
	                me._runTask();
	                return;
	            }
	            if (times) {
	                times--;
	                //回退
	                me.index--;
	                me._runTask();
	            } else {
	                //达到重复次数，跳转到下一个任务
	                var task = me.taskQueue[me.index];
	                me._next(task);
	            }
	        };
	        var type = TASK_SYNC;
	        return this._add(taskFn, type);
	    };
	    //添加一个同步任务，相当于repeat()更友好的接口，无限循环上一任务
	    Animation.prototype.repeatForever = function() {
	        return this.repeat();
	    };
	    //设置当前任务结束后到下一任务开始前的等待时间
	    //time等待时长
	    Animation.prototype.wait = function(time) {
	        if (this.taskQueue && this.taskQueue.length > 0) {
	            this.taskQueue[this.taskQueue.length - 1].wait = time;
	        }
	        return this;
	    };
	    //暂停当前异步定时任务
	    Animation.prototype.pause = function() {
	        if (this.state===STATE_START) {
	            this.state=STATE_STOP;
	            this.timeline.stop();
	            return this;
	        }
	        return this;
	    };
	    //重新执行上一次暂停的异步任务
	    Animation.prototype.restart = function() {
	        if (this.state===STATE_STOP) {
	            this.state=STATE_START;
	            this.timeline.restart();
	            return this;
	        }
	        return this;
	    };
	    //释放资源,定时器等
	    Animation.prototype.dispose = function() {
	        if (this.state!==STATE_INITIAL) {
	            this.state=STATE_INITIAL;
	            this.taskQueue=null;
	            this.timeline.stop();
	            this.timeline=null;
	            return this;
	        }
	        return this;
	    };
	    Animation.prototype._runTask = function() {
	        if (!this.taskQueue || this.state !== STATE_START) {
	            return;
	        }
	        //任务执行完毕
	        if (this.index === this.taskQueue.length) {
	            this.dispose();
	            return;
	        }
	        //获得任务链上的当前任务
	        var task = this.taskQueue[this.index];
	        if (task.type === TASK_SYNC) {
	            this._syncTask(task);
	        } else {
	            this._asyncTask(task);
	        }
	    };
	    //同步任务
	    //task任务对象
	    Animation.prototype._syncTask = function(task) {
	        var me = this;
	        var next = function() {
	            //切换到下一个任务
	            me._next(task);
	        };
	        var taskFn = task.taskFn;
	        taskFn(next);
	    };
	    Animation.prototype._asyncTask = function(task) {
	        var me = this;
	        //定义每一帧执行的回调函数
	        var enterFrame = function(time) {
	            var taskFn = task.taskFn;
	            var next = function() {
	                //停止当前任务
	                me.timeline.stop();
	                //执行下一个任务
	                me._next(task);
	            };
	            taskFn(next, time);
	        };
	        this.timeline.onenterframe = enterFrame;
	        this.timeline.start(this.interval);
	    };
	    //切换到下一个任务,支持如果当前任务需要等待，则延迟执行
	    //task 当前任务
	    Animation.prototype._next = function(task) {
	        this.index++;
	        var me = this;
	        task.wait ? setTimeout(function() {
	            me._runTask();
	        }, task.wait) : this._runTask();
	    };
	    //内部使用函数
	    //taskFn任务方法
	    //type任务类型
	    Animation.prototype._add = function(taskFn, type) {
	        this.taskQueue.push({
	            taskFn: taskFn,
	            type: type
	        });
	        return this;
	    };
	    module.exports=function() {
	        return new Animation();
	    };
	})();

/***/ },
/* 1 */
/***/ function(module, exports) {

	
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



/***/ },
/* 2 */
/***/ function(module, exports) {

	
	    'use strict';
	    var DEFAULT_INTERVAL = 1000 / 60;
	    var STATE_INITIAL = 0;
	    var STATE_START = 1;
	    var STATE_STOP = 2;
	    var requestAnimationFrame = (function() {
	        return window.requestAnimationFrame ||
	            window.webkitRequestAnimationFrame ||
	            window.mozRequestAnimationFrame ||
	            window.oRequestAnimationFrame ||
	            function(callback) {
	                return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL);
	            };
	    })();
	    var cancelAnimationFrame = (function() {
	        return window.cancelAnimationFrame ||
	            window.webkitCancelAnimationFrame ||
	            window.mozCancelAnimationFrame ||
	            window.oCancelAnimationFrame ||
	            function(id) {
	                return window.clearTimeout(id);
	            };
	    })();
	//Timeline时间轴类
	    function Timeline() {
	        this.animationHandler = 0;
	        this.state = STATE_INITIAL;
	    }
	    //时间轴上每一次回调函数
	    //time从动画开始到当前执行的时间
	    Timeline.prototype.onenterframe = function(time) {};
	    //动画开始
	    //interval每一次回调的间隔时间
	    Timeline.prototype.start = function(interval) {
	        if (this.state === STATE_START) {
	            return;
	        }
	        this.state = STATE_START;
	        this.interval = interval || DEFAULT_INTERVAL;
	        startTimeline(this, +new Date());
	    };
	    //动画停止
	    Timeline.prototype.stop = function() {
	        if (this.state !== STATE_START) {
	            return;
	        }
	        this.state = STATE_STOP;
	        //如果动画开始，则记录动画从开始到现在所经历的时间
	        if (this.startTime) {
	            this.dur = +new Date() - this.startTime;
	        }
	        cancelAnimationFrame(this.animationHandler);
	    };
	    //重新开始动画
	    Timeline.prototype.restart = function() {
	        if (this.state === STATE_START) {
	            return;
	        }
	        if (!this.dur || !this.interval) {
	            return;
	        }
	        this.state = STATE_START;
	        //无缝连接动画
	        startTimeline(this, +new Date() - this.dur);
	    };
	//时间轴动画启动函数
	//Timeline时间轴的实例
	//startTime动画开始时间
	    function startTimeline(timeline, startTime) {
	        timeline.startTime = startTime;
	        nextTick.interval = timeline.interval;
	        //记录上一次回调的时间
	        var lastTick = +new Date();
	        nextTick();
	//每一帧执行的函数
	        function nextTick() {
	            var now = +new Date();
	            timeline.animationHandler = requestAnimationFrame(nextTick);
	            //如果当期时间与上一次回调的时间戳大于设置的时间间隔，表示这一次可以执行回调函数
	            if (now - lastTick >= timeline.interval) {
	                timeline.onenterframe(now - startTime);
	                lastTick = now;
	            }
	        }
	    }
	    module.exports=Timeline;


/***/ }
/******/ ])
});
;