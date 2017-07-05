(function() {
    'use strict';
    var loadImage = require('./imageloader');
    var Timeline = require('./timeline');
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