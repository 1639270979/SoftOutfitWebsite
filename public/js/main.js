

//首页轮播
(function(){
    var $banner=$("#banner");
		var $slide=$("[data-toggle=slide]");
		//var imgW=banner.getElementsByTagName("span");
		//console.log(imgW);
		//图片轮播
		//封装图片动画函数
		//需求，能够让任意对象移动到指定的位置
		//下一页
		//传入任意对象obj,指定位置为target
		function prev_pic(){
			var newLeft;
			if($slide.css("left")=="-3750px"){
        //$slide.style.left="0px";
        $slide.css("left","0px");
				newLeft=-p;
			}else{
				newLeft=parseInt($slide.css("left"))-p;
			}
			//slide.style.left=newLeft +"px";
			direction=-1;
			animate($slide,newLeft);
			p=750;
			
		}
		//上一页
		function next_pic(p){
			var newLeft;
			if($slide.css("left")=="0px"){
        //$slide.style.left="-4000px"
        $slide.css("left","-3750px");
				newLeft=parseInt($slide.css("left")) +p;
			}else{
				newLeft=parseInt($slide.css("left")) +p;
			}
			//slide.style.left=newLeft +"px";
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
      //console.log(p);
			$obj.timer=setInterval(function(){
				//获取当前对象的位置
        var $leader=parseInt($obj.css("left"));
        //console.log($leader);
				//设置步长
				var step=5;
				step=$leader<target?step:-step;
				//距离大于步长
				if(Math.abs($leader-target)>=Math.abs(step)){
					//动画函数
					$leader=$leader+step;
          //$obj.style.left=leader+"px";
          $obj.css("left",`${$leader}px`);
				}else{
          //$obj.style.left=target+"px";
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
          rol(index);
         //console.log(index);
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
			},2500);
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
    //var imgWs=banner.getElementsByTagName("span");
    var $imgWs=$("#banner .btn>span");
		//for(var i=0;i<=imgWs.length-1;i++){
      for(var i=0;i<=$imgWs.length-1;i++){
        (function(i){
          $imgWs[i].click(function(){
            var $btn=$(this);
            //slide.style.left=(i+1)*(-1000)+"px";
            $slide.css("left",(i+1)*(-750)+"px");
            //console.log(this);
            var $p = $btn.parent().children();
            for(var j =0,pl= $p.length;j<pl;j++) {
              if($p[j] !== btn){
                //p[j].className="";
                $p[j].removeClass("active");
              };
            }
            //$btn.className="active";
            $btn.addClass("active");
          })
        })(i);	
      }	

		//小圆点跟随轮播图片动
		var index=0;
		//封装小圆点函数
		function rol(w){
      //var dots=banner.getElementsByTagName("span");
      var $dots=$("#banner .btn>span");
      //console.log($dots.length);
      console.log($dots[w]);
			for(var i=0;i<$dots.length;i++){
				if($dots[i]!==$dots[w]){
					$dots[i].removeClass("active");
				}
			}
      //dots[w].className="active";
      $dots[w].addClass("active")
		}
})();

//顶部悬浮导航栏
(function(){
    // 悬浮导航栏
    window.onscroll=function(){
        var scrollTop=document.body.scrollTop
                  ||document.documentElement.scrollTop
        //console.log(scrollTop);
        //pin.style.top=="-45px"
        if($("div.pin-nav-wrap").css("top")=="-45px"){
          if(scrollTop>=300){
          //pin.style.animation="pin-nav-wrap 0.5s linear";
          $("div.pin-nav-wrap").css("animation","pin-nav-wrap 0.5s linear");
          $("div.pin-nav-wrap").css("top","0");
            //pin.style.top="-45px"; 
            // pin.style.display="none";
          }
        }
        // if(pin.style.top=="0px"){
        //   pin.style.animation="pin-nav-wrap 0.5s linear reverse";
        //   pin.style.top=="-45px";
        // }
    }
})();