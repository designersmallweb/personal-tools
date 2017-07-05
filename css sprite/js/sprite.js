/*js写法*/
$(function(){
	var iconW = $(".sprite").find("i").width(),
		triggerLi = $(".sprite").children("li");
	//console.log(iconW);
	triggerLi.each(function(){
		var $this = $(this),
			$index = $this.index();
		//console.log($index);

		//console.log(iconW*$index);

$this.children("i").css("background-position","-" + iconW*$index +"px" + " 0");
	});
});