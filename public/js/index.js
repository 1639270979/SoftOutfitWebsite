$(function(){
    $.ajax({
        url:"http://localhost:3000/index",
        get:"get",
        dataType:"json",
        success:function(data){
            //参数解构
            var {banners,recs,clas,news,wus} = data;
            // 轮播图
            var html="";
            var span="";
            // 添加图片  
            for(var p of banners){
                html+=`
                <li>
                    <a href="${p.href}" target="blank">
                        <img src="${p.src}" alt="">
                    </a>
                </li>`;
                // 添加书名
                span+=`<span>${p.bname}</span>`;
            }
            var $first=banners[banners.length-1];
            // 将轮播图代码片段挂载到ul下
            $("#banner>ul").html(`
            <li>
                <a href="${$first.href}" target="blank">
                    <img src="${$first.src}" alt="">
                </a>
            </li>`+html);
            // 将span挂载到div.btn下
            $("#banner>div.btn").html(span).eq(1).addClass("active");

            //经典完本数据
            
            $html=$(`
                <ul class="banner-img" data-sl="slide">
                    <li class="slide-left">
                        <a href="${clas[0].href}" target="blank"><img src="${clas[0].img}" alt=""></a>
                    </li>
                    <li class="slide-center">
                        <a href="${clas[1].href}" target="blank"><img src="${clas[1].img}" alt=""></a>
                    </li>
                    <li class="slide-right">
                        <a href="${clas[2].href}" target="blank"><img src="${clas[2].img}" alt=""></a>
                    </li>
                </ul>
            `);
            $("#banner-l").prepend($html);
            var html="";
            for(var i=0;i<=2;i++){
                html+=`<li>
                    <h3><a href="${clas[i].href}" target="blank">${clas[i].cname} </a></h3> 
                    <a class="auther" href="${clas[i].href}">${clas[i].author}</a>
                    <p>
                        <a href="javascript:;"> 修真文明</a>|
                        <span>${clas[i].word_count}万字</span>
                    </p>
                    <span>
                    ${clas[i].detail}
                    </span>
                    <!-- main-one  1楼 左 立即略读按钮 -->
                    <a class="d-box" href="${clas[i].href}" target="blank">立即阅读</a>
                </li>`
            }
            $("#banner-l>div>ul").html(html);
            $("#banner-l>div>ul>li").eq(2).addClass("show");

            //新书推荐
            var html="";
            for(var i=0;i<3;i++){
                html+=`
                <li>
                    <span class="main-r-no${i+1}">${i+1}</span>
                    <a class="main-rb-a" href="${news[i].href}" target="blank">${news[i].nname}</a>
                    <a href="javascript:;">${news[i].author}</a>
                </li>
                `;
            }
            var elem="";
            for(var i=3;i<15;i++){
                elem+=`
                <li>
                    <span>${i+1}</span>
                    <a class="main-rb-a" href="${news[i].href}" target="blank">${news[i].nname}</a>
                    <a href="javascript:;">${news[i].author}</a>
                </li>
                `;
            }
            $("#main-r-body>ul").html(html + elem);
            
            //三楼排行榜 武数据
            var html="";
            for(var i=0;i<5;i++){
                html+=`
                <li>
                    <div class="book-box">
                        <a href="${wus[i].href}" target="blank">
                            <img src="${wus[i].img}" alt="">
                        </a>
                    </div>
                    <p><a href="${wus[i].href}" target="blank">${wus[i].wname}</a></p>	
                    <p><a href="javascript:;">${wus[i].author}</a></p>	
                </li>
                `;
            }
            $("[data-toggle=two-slide]>.slide-img1").html(html);
            var elem="";
            for(var i=5;i<10;i++){
                elem+=`
                <li>
                    <div class="book-box">
                        <a href="${wus[i].href}" target="blank">
                            <img src="${wus[i].img}" alt="">
                        </a>
                    </div>
                    <p><a href="${wus[i].href}" target="blank">${wus[i].wname}</a></p>	
                    <p><a href="javascript:;">${wus[i].author}</a></p>	
                </li>
                `;
            }
            $("[data-toggle=two-slide]>.slide-img2").html(elem);
            
            //强力推荐数据
            $("#recommend").html(`
                <div class="main-index">
                    <div class="top-box-left">
                        <div class="r-left">
                            <a href="${recs[0].href}" target="blank">
                                <img src="${recs[0].img}" alt="">
                            </a> 
                        </div>
                        <div class="r-right">
                            <a href="${recs[0].href}" target="blank">${recs[0].rname}</a>
                            <p>${recs[0].detail}</p>
                            <div>
                                <a href="javascript:;">${recs[0].author}</a>
                                <a class="mr-right" href="javascript:;">${recs[0].label}</a>
                            </div>
                        </div>
                    </div>
                    <div class="top-box-right">
                        <div class="r-left">
                            <a href="${recs[1].href}" target="blank">
                                <img src="${recs[1].img}" alt="">
                            </a> 
                        </div>
                        <div class="r-right">
                            <a href="${recs[1].href}" target="blank">${recs[1].rname}</a>
                            <p>${recs[1].detail}</p>
                            <div>
                                <a href="javascript:;">${recs[1].author}</a>
                                <a class="mr-right" href="javascript:;">${recs[1].label}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-index">
                    <div class="top-box-left">
                        <div class="r-left">
                            <a href="${recs[2].href}" target="blank">
                                <img src="${recs[2].img}" alt="">
                            </a> 
                        </div>
                        <div class="r-right">
                            <a href="${recs[2].href}" target="blank">${recs[2].rname}</a>
                            <p>${recs[2].detail}</p>
                            <div>
                                <a href="javascript:;">${recs[2].author}</a>
                                <a class="mr-right" href="javascript:;">${recs[2].label}</a>
                            </div>
                        </div>
                    </div>
                    <div class="top-box-right">
                        <div class="r-left">
                            <a href="${recs[3].href}" target="blank">
                                <img src="${recs[3].img}" alt="">
                            </a> 
                        </div>
                        <div class="r-right">
                            <a href="${recs[3].href}" target="blank">${recs[3].rname}</a>
                            <p>${recs[3].detail}</p>
                            <div>
                                <a href="javascript:;">${recs[3].author}</a>
                                <a class="mr-right" href="javascript:;">${recs[3].label}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-index">
                    <div class="top-box-left">
                        <div class="r-left">
                            <a href="${recs[4].href}" target="blank">
                                <img src="${recs[4].img}" alt="">
                            </a> 
                        </div>
                        <div class="r-right">
                            <a href="${recs[4].href}" target="blank">${recs[4].rname}</a>
                            <p>${recs[4].detail}</p>
                            <div>
                                <a href="javascript:;">${recs[4].author}</a>
                                <a class="mr-right" href="javascript:;">${recs[4].label}</a>
                            </div>
                        </div>
                    </div>
                    <div class="top-box-right">
                        <div class="r-left">
                            <a href="${recs[5].href}" target="blank">
                                <img src="${recs[5].img}" alt="">
                            </a> 
                        </div>
                        <div class="r-right">
                            <a href="${recs[5].href}" target="blank">${recs[5].rname}</a>
                            <p>${recs[5].detail}</p>
                            <div>
                                <a href="javascript:;">${recs[5].author}</a>
                                <a class="mr-right" href="javascript:;">${recs[5].label}</a>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            //经典完本数据

            
            

            //1. 首轮轮播
            ///*
            $(function(){
                //每个固定的时间移动图片
                var $banner=$("#banner");
                var $slide=$("[data-toggle=slide]");
                var $prev=$("[data-toggle=prev]");
                var $next=$("[data-toggle=next]");
                var timer = setInterval(picLoop,3000);
                //声明步数变量 用于控制步数
                var step=0;
                var index = 1;
                //页面加载先调用一次
                picLoop();
                function picLoop(){
                    index++;
                    if (index>=6) {
                        index=1;
                        $slide.css("left","0px");
                    }
                    $slide.animate({"left":-750*index},800,function(){
                        $("#banner>div>span").eq(index-1).addClass("active")
                        .siblings().removeClass("active");
                    });
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
                $("#banner>div.btn>span").click(function(){
                    $(this).addClass("active")
                        .siblings().removeClass("active");
                    index = $(this).index();
                    index++;
                    $slide.css("left",-750*index);//0  1
                    step=0;
                })
                //点击上一页
                $prev.click(function(){
                    step++;
                    if(step==1){
                        index++;
                        if (index>=6) {
                            index=1;
                            $slide.css("left","0px");
                        }
                        $slide.animate({"left":-750*index},800,function(){
                            step=0;
                            $("#banner>div>span").eq(index-1).addClass("active")
                            .siblings().removeClass("active");
                        });
                    }
                })
                //点击下一页
                $next.click(function(){
                    step++;
                    if(step==1){
                        index--;
                        if (index<=-1) {
                            index=4;
                            $slide.css("left","-3750px");
                        }
                        $slide.animate({"left":-750*index},800,function(){
                            step=0;
                            $("#banner>div>span").eq(index-1).addClass("active")
                            .siblings().removeClass("active"); 
                        });
                    }
                })
            })
            //*/

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
                var autoSlide=setInterval(picLoop,3000);
                var index=0;//0 一个ul的初始值
                var index2=-5;//1 第二个ul的初始值
                var step=0;//声明步数变量，用于控制步长
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
                    $("[data-toggle=two-slide]").parent().children(".left-prev,.right-next").fadeIn();
                },function(){
                    autoSlide=setInterval(picLoop,3000);
                    $("[data-toggle=two-slide]").parent().children(".left-prev,.right-next").fadeOut();
                })
                // 向前动
                $("[data-toggle=two-slide]").parent().children().eq(0).click(function(){
                    step++;
                    if(step==1){
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
                        },1000,function(){
                            step=0;
                        })
                    }
                })
                // 向后动
                
                $("[data-toggle=two-slide]").parent().children().eq(1).click(function(){
                    step++;
                    if(step==1){
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
                        },1000,function(){
                            step=0;
                        })
                    }
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
            //7. 侧边小3D轮播图
            $(function(){
                //查找触发元素
                var $slide1 = $("[data-sl=slide]");
                var $slide2=$("[data-sl=slides]"); 
                slide($slide1);
                slide($slide2)
                //封装3D轮播图
                function slide($slide){
                    //创建一个json数组，每一次轮播都将数组的最后一项移动到第一项
                    var $li=$slide.children();
                    var index=1;
                    var json=[
                        {
                            left:"0",
                            top:"0",
                            zIndex:10,
                            opacity:0.85,
                            width:"67",
                            height:"89"
                        },
                        {
                            left:"40",
                            top:"-11",
                            zIndex:20,
                            opacity:1,
                            width:"84",
                            height:"112"
                        },
                        {
                            left:"100",
                            top:"0",
                            zIndex:5,
                            opacity:0.85,
                            width:"67",
                            height:"89"
                        }
                    ]
                    //动画函数
                    function picLoop(){
                        for(var i=0;i<=json.length-1;i++){
                            //左定位left等于40时执行
                            if(parseInt($slide.children().eq(i).css("left"))==40){
                                $slide.children().eq(i).animate(
                                {
                                    left:parseInt(json[i].left)-10,
                                    zIndex:json[i].zIndex
                                },500).animate({
                                    top:json[i].top,
                                    width:json[i].width,
                                    height:json[i].height,
                                    opacity:json[i].opacity,
                                    left:json[i].left,
                                    zIndex:json[i].zIndex
                                },500);
                            }
                            //左定位left等于100时执行
                            if(parseInt($slide.children().eq(i).css("left"))==100){
                                $slide.children().eq(i).css("z-index",parseInt(json[i].zIndex)-10);
                                $slide.children().eq(i).animate(
                                    {
                                        top:json[i].top,
                                        opacity:json[i].opacity,
                                        width:json[i].width,
                                        height:json[i].height,
                                        zIndex:json[i].zIndex
                                    },500).animate({
                                        left:json[i].left,
                                        zIndex:json[i].zIndex
                                },500);
                            }
                            //左定位left等于0时执行
                            if(parseInt($slide.children().eq(i).css("left"))==0){
                                $slide.children().eq(i).css("z-index",json[i].zIndex);
                                $slide.children().eq(i).animate({
                                    left:json[i].left,
                                    zIndex:json[i].zIndex
                                },1000,function(){
                                    step=0;
                                    $slide.next().find("li").eq(index).css("display","block")
                                    .siblings().css("display","none"); 
                                });
                            }
                        }
                        
                    }
                    //页面打开时先调用一次
                    addClass();
                    //定义函数，用于将json的最后一项移到第一项
                    function addClass(){
                        //index用于同步下方详情
                        index++;
                        if(index>2){
                            index=0
                        }
                         //json.shift(),删除数组的第一个值，并返回第一个值
                        //json.push(json.shift())将返回的第一个值追加到数组末尾
                         json.unshift(json.pop());
                         //重新遍历
                        picLoop(); 
                                
                    } 
                    //定义定时器
                    var autoSlide=setInterval(addClass,3000);
                    
                    //定时器控制
                    $slide.mouseenter(function(){
                        clearInterval(autoSlide);
                    }).mouseleave(function(){
                        autoSlide=setInterval(addClass,3000);
                    })
                //点击事件
                var step=0;
                $slide.on("click","li",function(){
                    $li=$(this);
                    step++;
                    if(step==1){
                        if(parseInt($li.css("left"))==0){
                            index--;
                            if(index<0){
                                index=2
                            }
                            json.push(json.shift());
                            for(var i=0;i<=json.length-1;i++){
                                //重第一张到最后一张
                                if(parseInt($slide.children().eq(i).css("left"))==40){
                                    $slide.children().eq(i).animate(
                                    {
                                        left:json[i].left,
                                        zIndex:json[i].zIndex
                                    },500).animate({
                                        top:json[i].top,
                                        width:json[i].width,
                                        height:json[i].height,
                                        opacity:json[i].opacity,
                                        
                                    },500);
                                }
                                if(parseInt($slide.children().eq(i).css("left"))==0){
                                    $slide.children().eq(i).css("z-index",parseInt(json[i].zIndex)-10);
                                    $slide.children().eq(i).animate(
                                        {
                                            top:json[i].top,
                                            left:parseInt(json[i].left)-50,
                                            opacity:json[i].opacity,
                                            width:json[i].width,
                                            height:json[i].height,
                                            zIndex:json[i].zIndex
                                        },500).animate({
                                            left:json[i].left,
                                            zIndex:json[i].zIndex
                                    },500);
                                }
                                if(parseInt($slide.children().eq(i).css("left"))==100){
                                    $slide.children().eq(i).css("z-index",json[i].zIndex-6);
                                    $slide.children().eq(i).animate({
                                        left:json[i].left,
                                        zIndex:json[i].zIndex
                                    },1000,function(){
                                        step=0;
                                        $slide.next().find("li").eq(index).css("display","block")
                                        .siblings().css("display","none"); 
                                    });
                                }
                            }
                        }
                        // left=40
                        if(parseInt($li.css("left"))==40){
                            step=0;
                        }
                        // left=100
                        if(parseInt($li.css("left"))==100){
                            index++;
                            if(index>2){
                                index=0
                            }
                            json.unshift(json.pop());
                            picLoop();	
                        }
                    }
                })
                }
            })

            // 头部页游动态 页游
            $(function(){
                var $webGame=$("[data-toggle=webGame]");
                //下拉列表
                //查找触发元素
                $webGame.parent().parent().parent().mouseenter(function(){
                    $webGame.parent().parent().css({
                        display:"block"
                    }).animate({
                        marginTop:0
                    },0);
                }).mouseleave(function(){
                    $webGame.parent().parent().css({
                        display:"none",
                        marginTop:"-10px"
                    });
                })

                //下拉列表中的手风琴效果
                $webGame.on("mouseenter","li",function(){
                    $li=$(this);
                    $li.children("p").css("display","block");
                    $li.siblings().children("p").css("display","none");
                })
            })
        }
    })
})