$(function(){
	var search=location.search;
	if(search!==""){
		var did=search//?did=9
        	.split("=")//[?did, 9]
			[1];//9
		$.ajax({
			url:"http://localhost:3000/details",
			type:"get",
			data:{did},
			dataType:"json",
			success:function(result){
				var result=result[0];
				var label=result.label;
				var arr=label.split(" ");
				var grade=result.grade.toString();
				var arr1=grade.split(".");
				$("#book-info").html(`
					<!-- 图 -->
					<div class="book-img-wrap">
						<a href="javascript:;">
							<img src="${result.img}" alt="">
						</a>
					</div>
					<!-- 信息 -->
					<div class="book-detail">
						<!-- 标题 -->
						<h1>
						${result.dname}
							<span><a href="javascript:;">${result.author}</a>著</span>
						</h1>
						<!-- 标签 -->
						<p class="tag">
							<span>${result.stats}</span>    
							<span>${arr[0]}</span>
							<span>${arr[1]}</span>
							<a href="javascript:;">${arr[2]}</a>
							<a href="javascript:;">${arr[3]}</a>
						</p>
						<!-- 推荐语 -->
						<p class="discrible">${result.subtitle}</p>
						<!-- 详情汇总 -->
						<p class="collect">
							<!-- 字数 -->
							<span>${result.word_count}</span>
							<cite>万字</cite>|
							<!-- 总点击 -->
							<span>${result.read_passage}</span>
							<cite>万阅文总点击</cite>|
							<!-- 周点击 -->
							<span>${result.vip_click}</span>
							<cite>万会员周点击</cite>|
							<!-- 总推荐 -->
							<span>${result.total_click}</span>
							<cite>万总推荐</cite>|
							<!-- 周推荐 -->
							<span>${result.week_click}</span>
							<cite>万周推荐</cite>
						</p>
						<!-- 按钮 -->
						<p>
							<!-- 免费试读 -->
							<a href="javascript:;">免费试读</a>  
							<a href="javascript:;">加入书架</a>
							<a href="javascript:;">投票互动</a>
							<a href="javascript:;">下载App新人免费读</a>
						</p>
					</div>
					<!-- 评分 -->
					<div class="score">
						<!-- 评分 -->
						<h3>
							<span>${arr1[0]}.</span><i>${arr1[1]}</i> 
						</h3>
						<!-- 评价 195--> 
						<p class="number"><span>316</span>人评价</p>
						<p class="assess">我要评价</p>
						<div data-toggle="stars">
							<i class="iconfont icon-xingxing"></i>
							<i class="iconfont icon-xingxing"></i>
							<i class="iconfont icon-xingxing"></i>
							<i class="iconfont icon-xingxing"></i>
							<i class="iconfont icon-xingxing"></i>
						</div>
					</div>
					<!-- 订阅和下载 -->
					<div class="subscribe">
						<a>
							<i class="iconfont icon-shu2"></i>
							订阅
						</a>|
						<a>
							<i class="iconfont icon-xiazai4"></i>
							下载
						</a>
					</div>
				`);
				//主体包裹详情
				$("#book-intro").html(result.detail);
				//作者
				$("#author").html(result.author);
				$("#right-word-number").html(result.word_count);

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
			}
		})
	}
})








