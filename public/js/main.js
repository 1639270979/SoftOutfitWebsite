

///*
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
	function prev_pic(p){
		var newLeft;//声明一个步长
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
			var step=10;
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
		},3)
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
		},2500);
	}
	autoPlay();
	$banner.mouseenter(function () {
	//清除自动轮播定时器
		clearInterval(timer);
		$prev.show();
		$next.show();
	});
	//鼠标移开，自动轮播    
	$banner.mouseleave(function () {
		autoPlay();
		$prev.hide();
		$next.hide();
	});
	//定时器的控制
	// $banner.hover(function(){
	// 	clearInterval(timer);
	// 	$prev.show();
	// 	$next.show();
	// },function(){
	// 	autoPlay();
	// 	$prev.hide();
	// 	$next.hide();
	// })

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
//*/

//1. 首轮轮播
/*
$(function(){
	//每个固定的时间移动图片
	var $banner=$("#banner");
	var $slide=$("[data-toggle=slide]");
	var $prev=$("[data-toggle=prev]");
	var $next=$("[data-toggle=next]");
	var timer = setInterval(picLoop,3000);
	var index = 1;
	function picLoop(){
		index++;
		if (index>=6) {
			index=1;
			$slide.css("left","0px");
		}
		$slide.animate({"left":-750*index},1000);
		$("#banner>div>span").eq(index-1).addClass("active")
			   .siblings().removeClass("active");
	}

	//定时器的控制
	$banner.hover(function(){
		clearInterval(timer);
		$prev.show();
		$next.show();
	},function(){
		timer = setInterval(picLoop,3000);
		$prev.hide();
		$next.hide();
	})

	$("#banner>div>span").click(function(){
		$(this).addClass("active")
			   .siblings().removeClass("active");
		index = $(this).index();
		index++;
		$slide.css("left",-750*index);//0  1
	})

	$prev.click(function(){
		index++;
		if (index>=6) {
			index=1;
			$slide.css("left","0px");
		}
		$slide.animate({"left":-750*index},1000);
		$("#banner>div>span").eq(index-1).addClass("active")
			   .siblings().removeClass("active");
	})
	$next.click(function(){
		index--;
		if (index<=-1) {
			index=4;
			$slide.css("left","-3750px");
		}
		$slide.animate({"left":-750*index},1000);
		$("#banner>div>span").eq(index-1).addClass("active")
			   .siblings().removeClass("active"); 
	})
})
*/

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

});

//3. 底部5楼定时器
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

//




//4 楼轮播图
//想要平缓的动画只能用定位来写动画
$(function(){
	// 定义动画
	var autoSlide=setInterval(picLoop,2000);
	var index=0;//0 一个ul的初始值
	var index2=-5;//1 第二个ul的初始值
	// slide-img1
	var $slide1=$("[data-toggle=two-slide]>.slide-img1");
	// slide-img2
	var $slide2=$("[data-toggle=two-slide]>.slide-img2");
	//动画执行前延迟自动调用动画一次
	picLoop();
	// 封装动画函数
	// 自动播放
	function picLoop(){
		index++;
		index2++;
		// parseInt($slide1.css("left"))==-1000
		if(index>=6){
			$slide1.css("left","1000px")
			index=-4;
		}
		if(index2>=6){
			$slide2.css("left","1000px")
			index2=-4;
		}
		// slide-img1
		$slide1.animate({
			"left":(-200*index),
		},1000)
		// slide-img2
		$slide2.animate({
			"left":(-200*index2),
		},1000)
	}
	// 定时器的控制
	$("[data-toggle=two-slide]").parent().hover(function(){
		clearInterval(autoSlide);
		$("[data-toggle=two-slide]").parent().children().eq(0).fadeIn();
	},function(){
		autoSlide=setInterval(picLoop,2000);
		$("[data-toggle=two-slide]").parent().children().eq(0).fadeOut();
	})
	// 向前动
	$("[data-toggle=two-slide]").parent().children().eq(0).click(function(){
		index++;
		index2++;
		// parseInt($slide1.css("left"))==-1000
		if(index>=6){
			$slide1.css("left","1000px")
			index=-4;
		}
		if(index2>=6){
			$slide2.css("left","1000px")
			index2=-4;
		}
		// ul 1
		$slide1.animate({
			"left":(-200*index),
		},1000)
		// ul2
		$slide2.animate({
			"left":(-200*index2),
		},1000)
		
	})
	// 向后动
	
	$("[data-toggle=two-slide]").parent().children().eq(1).click(function(){
		index--;
		index2--;
		console.log(index);
		if(index<=-6){
			$slide1.css("left","-1000px")
			index=4;
		}
		if(index2<=-6){
			$slide2.css("left","-1000px")
			index2=4;
		}
		// ul 1
		$slide1.animate({
			"left":(-200*index),
		},1000)
		// ul2
		$slide2.animate({
			"left":(-200*index2),
		},1000)
		
	})
})

//5.一楼 右侧
$(function(){
	$("[data-toggle=notice]").mouseenter(function(){
		$(this).find(".hide>em").css({
			top:"18px",
			right:"18px"
		})
	}).mouseleave(function(){
		$(this).find(".hide>em").css({
		top:"-18px",
		right:"-18px"
		})
	})
})

/*
//6. 一楼右侧公告轮播
$(function(){
	//查找触发事件元素并绑定事件
	var $nSlide=$("[data-toggle=notice-slide]");
	var autoNo=setInterval(notLoop,2000);
	var i=0
	notLoop();
	function notLoop(){
		i++;
		// 判断
		if(i==9){
			$nSlide.css("top","0px");
			i=1;
		}
		$nSlide.animate({
			top:25*-i
		},500)
	}
	// 定时器控制
	$nSlide.hover(
		function(){
			clearInterval(autoNo);
		},function(){
			autoNo=setInterval(notLoop,2000);
	})
})
*/












