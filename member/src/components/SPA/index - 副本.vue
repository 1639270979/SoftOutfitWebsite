<template>
	<div id="SPA">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<!-- list1 -->
				<div class="swiper-slide list1">
					<div class="top ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.3s">
						<span class="ani" swiper-animate-effect="fadeIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.8s">{{ info.city_name }}</span>
						<span class="ani"  swiper-animate-effect="fadeIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.8s">{{ info.area_name }}</span>
						<span class="ani"  swiper-animate-effect="fadeIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.8s">{{ info.house_name }}</span>
						<span class="ani"  swiper-animate-effect="fadeIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.8s">{{ info.house_area }}㎡</span>
					</div>
					<div class="body">
						<div class="list1_1" :class="b1?'b1':''"></div>
						<div class="list1_2" :class="b2?'b2':''"></div>
						<div class="block b3 ani" swiper-animate-effect="bounceIn" swiper-animate-duration="0.5s" swiper-animate-delay="1.3s">
							<div class="txt">户型图</div>
							<div class="box"><img :src="info.house_picture"></div>
						</div>
					</div>
					<div class="logo ani" swiper-animate-effect="zoomIn" swiper-animate-duration="0.5s" swiper-animate-delay="1.5s">
						<img src="./image/logo.png" class="ani" swiper-animate-effect="rubberBand" swiper-animate-duration="0.5s" swiper-animate-delay="1.8s">
					</div>
					<div class="prompt">
						<span class="icon-top"></span>
						<div class="slideShine">
							<p>继续滚动</p>
							<p>看看我家</p>
						</div>
						<!-- <img src="image/promptTxt.png"> -->
					</div>
				</div>
				<!-- list2 -->
				<div class="swiper-slide list2">
					<div class="top">
						<div class="bg ani" swiper-animate-effect="lightSpeedIn" swiper-animate-duration="0.5s" swiper-animate-delay="0.3s">
							<div class="top-title ani" swiper-animate-effect="bounceInDown" swiper-animate-duration="0.5s" swiper-animate-delay="1.3s">{{ info.design_style }}</div>
							<div class="img ani" swiper-animate-effect="zoomInDown" swiper-animate-duration="0.5s" swiper-animate-delay="0.8s"><img :src="info.design_picture"></div>
						</div>
					</div>
					<div class="title ani" swiper-animate-effect="bounceIn" swiper-animate-duration="0.5s" swiper-animate-delay="1.8s">/&nbsp;&nbsp;图中单品&nbsp;&nbsp;/</div>
					<div class="list ani" swiper-animate-effect="bounceIn" swiper-animate-duration="0.5s" swiper-animate-delay="1.8s">
						<ul>
							<li v-for="item in items">
								<div class="img ani" swiper-animate-effect="rotateIn" swiper-animate-duration="0.5s" swiper-animate-delay="2.3s"><img :src="item.picture"></div>
								<p class="name ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="0.5s" swiper-animate-delay="2.8s">{{ item.product_name }}</p>
								<p class="money ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="0.5s" swiper-animate-delay="2.8s">¥{{ item.price }}</p>
							</li>
						</ul>
					</div>
					<div class="prompt">
						<span class="icon-top"></span>
					</div>
				</div>
				<!-- list3 -->
				<div class="swiper-slide list3">
					<div class="logo"><img src="./image/spa10.png"></div>
					<p class="list3-1">现已全面上线</p>
					<div class="list3-2">
						<p>众多设计大咖</p>
						<p>海量家居商品</p>
						<p>等你挑选</p>
					</div>
					<div class="list3-3">
						<img src="./image/ios.png" v-if="ios">
						<img src="./image/Android.png" v-else>
					</div>
					<div class="list3-4">
						<p>iPhone手机扫描二维码</p>
						<p>或进入APP Store搜索“大美屋”下载安装</p>
					</div>
					<div class="list3-5">
						<p>© 2017 深圳兴汇大美网络科技有限公司</p>
						<p>Shenzhen IDMEI Network Technology Co., Ltd.</p>
						<p>科技改变设计，设计改变生活</p>
						<p>Technology changes design</p>
						<p>Design changes life</p>
					</div>
				</div>
			</div>
		</div>
		<div class="mask" v-show="isShow">
			
		</div>
	</div>
</template>
<script>
	import { SPA } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				isShow : true,
				id     : this.$route.params.id,
				b1     : true,
				b2     : true,
				items  : [],
				info   : {},
				ios    : true
			}
		},
		methods: {
			ajaxFun() {
				SPA(this.id).then(data => {
					if (data.code == 1) {
						this.info = data.info;
						for (var i = 0; i < data.info.products.length; i++) {
							this.items.push(data.info.products[i]);
						}
						this.swiperFun();
					}
				});
			},
			swiperFun() {
				this.isShow = false;
				var this_ = this;
				var mySwiper = new Swiper ('.swiper-container', {
					direction : 'vertical',
					pagination: '.swiper-pagination',
					mousewheelControl : true,
					watchSlidesProgress: true,
					onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
						swiperAnimateCache(swiper);
						swiperAnimate(swiper);
						this_.b1 = true;
						this_.b2 = true;
					},
					onSlideChangeEnd: function(swiper){//每个slide切换结束时也运行当前slide动画
						swiperAnimate(swiper);
						this_.b1 = true;
						this_.b2 = true;
					},
					onTransitionEnd: function(swiper){
						swiperAnimate(swiper);
						this_.b1 = true;
						this_.b2 = true;
					},
					onTransitionStart: function(swiper) {
						this_.b1 = false;
						this_.b2 = false;
					}
				})
			}
		},
		beforeCreate() {
			var body = document.getElementsByTagName('body')[0];
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "http://member.idmei.cn/static/js/swiper/swiper.min.js";
			body.appendChild(script);
			var script1 = document.createElement("script");
			script1.type = "text/javascript";
			script1.src = "http://member.idmei.cn/static/js/swiper/swiper.animate.min.js";
			body.appendChild(script1);
			document.title="大美屋经典户型展示";
		},
		created() {
			this.ajaxFun();
			let isAndroid = window.navigator.appVersion.match(/android/gi);
			if (isAndroid) {
				this.ios = false;
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	@import './css/animate.min.css';
	@import './css/swiper.min.css';
	#SPA {
		width: 100%;
		max-width: 768px;
		height: 100%;
		margin-left: auto;
		margin-right: auto;
		.swiper-container {
			width: 100%;
			//height: 100%;
			.rem(height,1136);
		}
		.swiper-slide{
			width:100%;
			height:100%;
			background: url(./image/bg.jpg) no-repeat;
			background-size: 100% 100%;
		}
	}
	.list1 {
		.top {
			width: 100%;
			height: 35px;
			margin-top: 15px;
			line-height: 35px;
			border: 1px solid rgba(255,255,255,.34);
			background: rgba(241,137,3,.34);
			> span {
				float: left;
				width: 25%;
				font-size: 13px;
				text-align: center;
				color: #fff;
			}
		}
		.body {
			position: relative;
			.rem(width,556);
			.rem(height,442);
			margin: 0 auto;
			.rem(margin-top,77);
			.block {
				position: absolute;
				.rem(width,556);
				.rem(height,442);
				.border(border,4,#ffd48f);
				background: #fff;
			}
			.b1 {
				position: absolute;
				.rem(width,556);
				.rem(height,442);
				.border(border,4,#ffd48f);
				background: #fff;
				-webkit-animation: block1 .5s;
						animation: block1 .5s;
				-webkit-animation-delay: 1.3s;
						animation-delay: 1.3s;
				-webkit-animation-fill-mode: both;
						animation-fill-mode: both;
			}
			.b2 {
				position: absolute;
				.rem(width,556);
				.rem(height,442);
				.border(border,4,#ffd48f);
				background: #fff;
				-webkit-animation: block2 .5s;
						animation: block2 .5s;
				-webkit-animation-delay: 1.3s;
						animation-delay: 1.3s;
				-webkit-animation-fill-mode: both;
						animation-fill-mode: both;
			}
			.txt {
				float: left;
				.rem(width,100);
				.rem(height,36);
				.rem(margin-top,16);
				.rem(margin-left,20);
				.rem(font-size,22);
				color: #f18903;
				letter-spacing: 3px;
			}
			.box {
				float: right; 
				display: flex;
				.rem(width,400);
				.rem(height,400);
				.rem(margin-top,20);
				.rem(margin-right,20);
				align-items: center;
				justify-content: center;
				img {
					.rem(max-width,400);
					.rem(max-height,470);
				}
			}
		}
		.logo {
			.rem(width,414);
			.rem(height,75);
			margin: 0 auto;
			.rem(margin-top,87);
			img {
				float: left;
				width: 100%;
			}
		}
		.prompt {
			position: absolute;
			bottom: 24px;
			left: 50%;
			.rem(width,100);
			height: 70px;
			.rem(margin-left,-50);
			text-align: center;
			img {
				width: 100%;
				margin-top: 9px;
			}
			p {
				.rem(font-size,20);
				color: #e75204;
			}
			.icon-top {
				display: inline-block;
				.rem(width,46);
				.rem(height,44);
				background: url(./image/top.png) no-repeat;
				background-size: 100% 100%;
				animation: iconTop 1.5s infinite ease-in-out;
				-webkit-animation: iconTop 1.5s infinite ease-in-out;
			}
		}
		.slideShine {
			background-image: -webkit-linear-gradient(45deg, #e75204, #fff 50%, #e75204);
	        -webkit-text-fill-color: transparent;
	        -webkit-background-clip: text;
	        -webkit-background-size: 200% 100%;
	        -webkit-animation: masked-animation 4s infinite linear;
		}
	}
	@-webkit-keyframes masked-animation {
	    0%  { background-position: 0 0;}
	    100% { background-position: -200% 0;}
	}
	/*层叠模块*/
	@-webkit-keyframes block1 {
		0%{
			opacity: 0;
		}
		100% {
			-webkit-transform: rotate(-8deg);
			opacity: 1;
		}
	}
	@keyframes block1 {
		0%{
			opacity: 0;
		}
		100% {
			transform: rotate(-8deg);
			opacity: 1;
		}
	}
	@-webkit-keyframes block2 {
		0%{
			opacity: 0;
		}
		100% {
			-webkit-transform: rotate(-4deg);
			opacity: 1;
		}
	}
	@keyframes block2 {
		0%{
			opacity: 0;
		}
		100% {
			transform: rotate(-4deg);
			opacity: 1;
		}
	}
	/*底部箭头*/
	@-webkit-keyframes iconTop {
		0%,30% {opacity: 0;-webkit-transform: translate(0,10px);}
		60% {opacity: 1;-webkit-transform: translate(0,0);}
		100% {opacity: 0;-webkit-transform: translate(0,-8px);}
	}
	@-moz-keyframes iconTop {
		0%,30% {opacity: 0;-moz-transform: translate(0,10px);}
		60% {opacity: 1;-moz-transform: translate(0,0);}
		100% {opacity: 0;-moz-transform: translate(0,-8px);}
	}
	@keyframes iconTop {
		0%,30% {opacity: 0;transform: translate(0,10px);}
		60% {opacity: 1;transform: translate(0,0);}
		100% {opacity: 0;transform: translate(0,-8px);}
	}
	.list2 {
		.top {
			width: 100%;
			.rem(padding-left,23);
			.bg {
				position: relative;
				width: 100%;
				.rem(height,416);
				.rem(padding-top,45);
				background: rgba(248,181,81,.52);
			}
			.top-title {
				position: absolute;
				.rem(top,16);
				.rem(left,-12);
				z-index: 5;
				.rem(width,189);
				.rem(height,64);
				.rem(padding-top,15);
				.rem(line-height,24);
				.rem(font-size,24);
				color: #fff;
				text-align: center;
				letter-spacing: 2px;
				background: url(./image/spa3.png) no-repeat;
				background-size: 100% 100%;
			}
			.img {
				.rem(width,563);
				.rem(height,357);
				.rem(margin-left,16);
				overflow: hidden;
				img {
					width: 100%;
					.rem(min-height,357);
				}
			}
		}
		.title {
			width: 100%;
			.rem(line-height,66);
			.rem(font-size,26);
			color: #666;
			text-align: center;
			letter-spacing: 1px;
		}
		.list {
			.rem(margin-left,27);
			li {
				float: left;
				.rem(width,186);
				.rem(margin-right,16);
				.rem(margin-bottom,14);
			}
			.img {
				display: flex;
				.rem(max-width,186);
				.rem(max-height,186);
				align-items: center;
				justify-content: center;
				// width: 100%;
				// .rem(min-height,186);
				.border(border,2,#f8b551);
				overflow: hidden;
				background: #fff;
				img {
					width: 100%;
				}
			}
			p {
				.rem(line-height,20);
				.rem(font-size,20);
				color: #666;
				letter-spacing: 1px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.name {
				width: 100%;
				.rem(margin-top,7);
				.rem(margin-bottom,8);
			}
		}
		.prompt {
			position: absolute;
			bottom: 24px;
			left: 50%;
			width: 27px;
			height: 26px;
			margin-left: -13.5px;
			text-align: center;
			.icon-top {
				display: inline-block;
				width: 27px;
				height: 26px;
				background: url(./image/top.png) no-repeat;
				background-size: 100% 100%;
				animation: iconTop 1.5s infinite ease-in-out;
				-webkit-animation: iconTop 1.5s infinite ease-in-out;
			}
		}
	}
	.list3 {
		img {
			width: 100%;
		}
		> div {
			margin: 0 auto;
		}
		p {
			color: #1e0805;
			text-align: center;
		}
		.logo {
			.rem(width,300);
			.rem(height,49);
			.rem(margin-top,48);
		}
		.list3-1 {
			.rem(margin-top,16);
			.rem(line-height,30);
			.rem(font-size,30);
		}
		.list3-2 {
			.rem(margin-top,32);
			p {
				.rem(margin-bottom,11);
				.rem(line-height,20);
				.rem(font-size,20);
			}
		}
		.list3-3 {
			.rem(width,384);
			.rem(height,384);
			.rem(margin-top,14);
		}
		.list3-4 {
			.rem(margin-top,16);
			p {
				.rem(margin-bottom,16);
				.rem(line-height,22);
				.rem(font-size,22);
			}
		}
		.list3-5 {
			.rem(margin-top,98);
			.rem(margin-right,43);
			p {
				.rem(margin-bottom,16);
				.rem(line-height,20);
				.rem(font-size,20);
				text-align: right;
			}
		}
	}
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		width: 100%;
		height: 100%;
		background: #fff;
	}
</style>
