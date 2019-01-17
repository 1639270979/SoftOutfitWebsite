//138 行星星评分
$(function(){

	//1. 查找并绑定事件  采用冒泡
	$("[data-toggle=stars]").on("mouseenter","i",function(){
		$i=$(this);
		//获取当前星星的下标
		var i=$i.index();
		//之前的星星变色
		$(`[data-toggle=stars]>i:lt(${i+1})`).css("color","#fed44a");
		//之后的星星不变
		$(`[data-toggle=stars]>i:gt(${i})`).css("color","#ddd");
	})
	
	//2. 218 238 推荐票图标动态
	$("[data-slide=ticket]").mouseenter(function(){
		$dd=$(this)
		$dd.find(".icon-box>span").animate({
			top:5
		})
	}).mouseleave(function(){
		$dd.find(".icon-box>span").animate({
			top:14
		})
	})
})





