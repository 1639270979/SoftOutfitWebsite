


//1.首页轮播
$(function(){
	var $banner=$("#banner");
	var $slide=$("[data-toggle=slide]");
	var index=0;
	//图片轮播
	//封装图片动画函数
	//需求，能够让任意对象移动到指定的位置
	//下一页
	//传入任意对象obj,指定位置为target
	function prev_pic(){
		var newLeft;
		if($slide.css("left")=="-3750px"){
			$slide.css("left","0px");
			newLeft=-p;
		}else{
			newLeft=parseInt($slide.css("left"))-p;
		}
		direction=-1;
		animate($slide,newLeft);
		p=750;
		
	}
	//上一页
	function next_pic(p){
		var newLeft;
		if($slide.css("left")=="0px"){
			$slide.css("left","-3750px");
			newLeft=parseInt($slide.css("left")) +p;
		}else{
			newLeft=parseInt($slide.css("left")) +p;
		}
		direction=1;
		animate($slide,newLeft);
		p=750;
	}
	//封装图片动画函数
	//传入任意对象obj,指定位置为target
	function animate($obj,target){
		//每次执行前先清除定时器，防止重复设置定时器
		clearInterval($obj.timer);
		//加上定时器
		$obj.timer=setInterval(function(){
			//获取当前对象的位置
			var $leader=parseInt($obj.css("left"));
			//设置步长
			var step=5;
			step=$leader<target?step:-step;
			//距离大于步长
			if(Math.abs($leader-target)>=Math.abs(step)){
				//动画函数
				$leader=$leader+step;
				$obj.css("left",`${$leader}px`);
			}else{
				$obj.css("left",`${target}px`);
				clearInterval($obj.timer);
				if(direction==-1){
					index++;
					if(index>4){
						index=0;
					}
				}else{
					index--;
					if(index<0){
						index=4;
					}
				}
			 //小圆点跟随轮播图片动
			 $("#banner .btn>span").eq(index).siblings().removeClass("active");
			 $("#banner .btn>span").eq(index).addClass("active");
			}
		},5)
	}
	//获取左右箭头//获得按钮元素
	var $prev=$("[data-toggle=prev]");
	var $next=$("[data-toggle=next]");
	//console.log(prev);
	//添加单机事件
	//下一页
	var p=750;
	var direction=0;
	$prev.click(function(){
		p=750;
		if(parseInt($slide.css("left"))%750==0){
			prev_pic(p);
		}else{
			if(parseInt($slide.css("left"))<-3750){
				p=p+(p-Math.abs(parseInt($slide.css("left"))%750));
				prev_pic(p);
			}else{
				p=p-Math.abs(parseInt($slide.css("left"))%750);
				prev_pic(p);
			}
		}
	})
	//上一页next_pic(p);
	$next.click(function(){
		p=750;
		if(parseInt($slide.css("left"))%750==0){
			next_pic(p);
		}else{
			if(parseInt($slide.css("left"))>0){
				p=p+Math.abs(parseInt($slide.css("left"))%750);
				next_pic(p);
			}else{
				p=Math.abs(parseInt($slide.css("left"))%750);
				next_pic(p);
			}
		}
	})
	//添加定时
	var timer =null;
	function autoPlay(){
		timer =setInterval(function (){
			p=750;
			if(parseInt($slide.css("left"))%750==0){
				prev_pic(p);
			}else{
				if(parseInt($slide.css("left"))<-3750){
					p=p+(p-Math.abs(parseInt($slide.css("left"))%750));
					prev_pic(p);
				}else{
					p=p-Math.abs(parseInt($slide.css("left"))%750);
					prev_pic(p);
				}
			}
		},3500);
	}
	autoPlay();
	$banner.mouseenter(function () {
	//清除自动轮播定时器
		clearInterval(timer);
	});
	//鼠标移开，自动轮播    
	$banner.mouseleave(function () {
		autoPlay();
	});

	//小圆点点击事件
	var $imgWs=$("#banner .btn>span");
		for(var i=0;i<=$imgWs.length-1;i++){
			(function(i){
				$imgWs.eq(i).click(function(){
					var $btn=$(this);
					$slide.css("left",(i+1)*(-750)+"px");
					$btn.siblings().removeClass("active");
					$btn.addClass("active");
					//重置index的数值
					index=i;
				})
			})(i);	
		}	
});

//2.顶部悬浮导航栏
$(function(){
	//1.悬浮导航栏  方案1
	var scrollTop=document.body.scrollTop
				||document.documentElement.scrollTop;
	//刷新时判断导航栏是否出现
	if(scrollTop>=300){
		$("div.pin-nav-wrap").css("top","0");
	}
	$(window).scroll(function(){
			// 获取滚动时距页面顶端的距离
		var scrollTop=document.body.scrollTop
							||document.documentElement.scrollTop;
		if(scrollTop>=300){
			$("div.pin-nav-wrap").css("top","0");
		}else{
			$("div.pin-nav-wrap").css("top","-40px");
		}
			//}
	})
	// 方案2
	// var winHeight = $(document).scrollTop();
	// $(window).scroll(function() {
	// 	var scrollY = $(document).scrollTop();// 获取垂直滚动的距离，即滚动了多少
	// 	console.log(scrollY);
	// 	if (scrollY > 300){ //如果滚动距离大于550px则隐藏，否则删除隐藏类
	// 		$("div.pin-nav-wrap").addClass('showed');
	// 	}else {
	// 		$("div.pin-nav-wrap").removeClass('showed');
	// 	} 
	// 	if (scrollY > winHeight){ //如果没滚动到顶部，删除显示类，否则添加显示类
	// 		$("div.pin-nav-wrap").removeClass('hiddened');
	// 	}
	// 	else {
	// 		$("div.pin-nav-wrap").addClass('hiddened');
	// 	}       
	// });

// 3.下拉选项
	//1. 查找触发事件的元素
	//2. 绑定事件
	$("[data-toggle=dropdown]").parent().mouseenter(function(){
		//3. 查找要修改的元素:当前按钮的下一个兄弟ul
		$(this).children(":last-child").css("display","block");
		//4. 修改元素，
		$(this).children("span").css({
			"border-bottom":"4px solid #ccc",
			"border-top":"0 none"
		});
		
	}).mouseleave(function(){
		$(this).children(":last-child").css("display","none");
		$(this).children("span").css({
			"border-top":"4px solid #ccc",
			"border-bottom":"0 none"
		});
		//console.log($(this));
	}).children(":last-child").css("display","none");

});

//4. 底部5楼定时器
//封装函数
$(function(){
	//封装定时器函数
	function task(){
		var $start=new Date();
		var $end=new Date("2019/2/4 00:00:00");
		var $s=parseInt(($end-$start)/1000);
		if($s>0){
			//获取天数
			var $d=parseInt($s/3600/24);
			if($d<10) $d="0"+$d;
			//获取小时
			var $h=parseInt($s%(3600*24)/3600);
			if($h<10) $h="0"+$h;
			//获取分钟
			var $m=parseInt($s%3600/60);
			if($m<10) $m="0"+$m;
			//获取秒
			var $s=parseInt($s%60);
			if($s<10) $s="0"+$s;
			$("[data-toggle=timer]").html(`${$d}天${$h}:${$m}:${$s}`);
			
		}
		else{
			$("[data-toggle=timer]").html("欢度元旦");
			clearInterval($timer);
		}
	}
	task();
	var $timer=setInterval(task,1000);
})

//二楼轮播图
$(function(){
	
})



















