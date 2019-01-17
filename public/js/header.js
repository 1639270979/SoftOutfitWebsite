// 1.下拉选项
$(function(){
	//1. 查找触发事件的元素
	//2. 绑定事件
	$("[data-toggle=dropdown]").parent().mouseenter(function(){
		//3. 查找要修改的元素:当前按钮的下一个兄弟ul
		$(this).children(":last-child").css("display","block");
    //4. 修改元素，
    // 小三角朝上
		$(this).children("span").css({
			"border-bottom":"4px solid #ccc",
			"border-top":"0 none"
		});
		
	}).mouseleave(function(){
    $(this).children(":last-child").css("display","none");
    // 松开鼠标后小三角朝下
		$(this).children("span").css({
			"border-top":"4px solid #ccc",
			"border-bottom":"0 none"
		});
		//console.log($(this));
	}).children(":last-child").css("display","none");
})