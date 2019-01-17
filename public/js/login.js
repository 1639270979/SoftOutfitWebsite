
$(function(){
//1.弹出登录框  1267  59
	//1.查找事件触发对象并绑定事件触发函数
	$("[data-toggle=login-box]").click(function(){
		var $id=$(this).attr("data-toggle");
		var $login=$("#"+$id);
		console.log($login);
		$login.css("display","block");
	})
	//2.关闭登录框
	$("[data-toggle=close]").click(function(){
		$close=$(this);
		$("#login-box").css("display","none");
	})

// 2.账号登陆 微信登陆 QQ之间的切换
	//1.查找事件触发对象并绑定事件触发函数
	$("[data-toggle=switch]").click(function(e){
		$target=$(e.target);
		//使当前点击对象显示//隐藏其他对象
		$target.addClass("visible").siblings().removeClass("visible");
		//查找登陆主体元素
		var $id=$target.attr("data-target");
		var $box=$($id);
		$box.css("display","block").siblings().css("display","none");
	})

//3. 更多登陆方式  显示 隐藏
	//查找触发事件元素并绑定事件
	$("[data-toggle=many-login]").mouseenter(function(){
		//$target=$(this);
		$(this).prev().css("opacity","1");
	//鼠标移出时
	}).prev().mouseleave(function(){
		//$target=$(this);
		$(this).css("opacity","0");
	}).css("opacity","0");
})