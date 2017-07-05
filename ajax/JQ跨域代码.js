//JS
$("#id").click(function() {
    $.ajax({
        type: "get",
        url: "jsonp.php",
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "success_callback",
        success: function(data) {
            $("#word").html(data.name);
        },
        error: function(err) {
            console.log(err);
        }
    });
});
//php
/*<?php $arr = array('name' => '张三');
echo $_GET['callback'] . "(" . json_encode($arr) . ")";*/
//php返回值success_callback({"name","\u5f20\u4e09"})
//jquery-jsonp插件
$.jsonp({
    url: url,
    callback: "success_callback",
    success: function(data) {
        $("#word").html(data.name);
    },

    error: function(d, msg) {
        console.log(err);
    }
});
/*<?php $arr = array('name' => '张三');
echo $_GET['callback'] . "(" . json_encode($arr) . ")";?>*/