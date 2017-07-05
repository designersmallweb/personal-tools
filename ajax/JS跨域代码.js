function CreateScript(src) {
    $("<script><//script>").attr("src", src).appendTo("body");
}

function jsonpcallback(json) {
    console.log(json);
}
$("#id").click(function() {
    CreateScript("url?callback=jsonpcallback");
});