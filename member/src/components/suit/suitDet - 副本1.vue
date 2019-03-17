<template>
	<div id="suitDet">
		<div class="banner" v-if="banner != ''">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="item in banner" @click="picZoomFun(item)">
						<img :src="item">
					</div>
				</div>
				<!-- 如果需要分页器 -->
				<div class="swiper-pagination"></div>
			</div>
		</div>
		<div class="info">
			<p class="title">{{ info.suit_name }}</p>
			<div>
				<!-- <div class="like"
					:class="info.is_collect == 'Y'? 'action':''"
					@click="suitCollectFun(info)">
					<span class="icon-like"></span>
					<span class="txt">{{ info.is_collect == 'Y'? '取消收藏':'收藏' }}</span>
				</div> -->
				<div class="right">
					<p>商品总价：<span>¥{{info.price}}</span></p>
				</div>
			</div>
		</div>
		<div class="themes">本套装中的所有商品</div>
		<div class="list">
			<ul>
				<li v-for="item in goodsList">
					<router-link :to="'/index/shop/shopDet/'+item.product_id">
						<div class="img"><img :src="item.picture"></div>
						<div class="right">
							<div class="right-top">
								<img class="fl" v-lazy="item.logo">
								<p>{{ item.goods_name }}</p>
							</div>
							<div class="right-bottom">
								<span class="adres">发货地：{{ item.delivery_place }}</span>
								<span class="num">数量：{{ item.num }}件</span>
								<span class="money">原价：¥{{ item.price }}</span>
							</div>
						</div>
					</router-link>
					<div class="like"
						:class="item.goodsCollect == 'Y'? 'action':''"
						@click="shopCollectFun(item)">
						<span class="icon-like"></span>
						<span class="txt">{{ item.goodsCollect == 'Y'? '取消收藏':'收藏' }}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="bottom-btn">
			<div class="fl">{{ info.goodsCount }}件商品</div>
			<div class="fr">
				<div class="discount">
					<p class="p1">套装优惠价</p>
					<p class="p2">¥{{info.price}}</p>
					<p class="p3">原价：{{info.countPrice}}</p>
				</div>
				<div class="btn" @click="confirmFun">立即下单</div>
			</div>
		</div>
		<confirmPrompt
			:msg="msg"
			:isConfirmShow="isConfirmShow"
			@update:isConfirmShow="val => isConfirmShow = val"
			:btn="btn"
			@increment="goLoginFun"></confirmPrompt>
		<!-- 图片放大 -->
		<div class="pswp" id="iosMask" style="display: none;">
			<div class="pswp__bg"></div>
			<div class="pswp__scroll-wrap">
				<div class="pswp__container">
					<div class="pswp__item"></div>
					<div class="pswp__item"></div>
					<div class="pswp__item"></div>
				</div>
				<div class="pswp__ui pswp__ui--hidden">
					<div class="pswp__top-bar">
					<div class="pswp__counter"></div>
					<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
						<div class="pswp__preloader">
							<div class="pswp__preloader__icn">
								<div class="pswp__preloader__cut">
									<div class="pswp__preloader__donut"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
						<div class="pswp__share-tooltip"></div> 
					</div>

					<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

					<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
					<div class="pswp__caption">
						<div class="pswp__caption__center"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { suitDet,shopDetCollect,suitCollect } from '../../common/axios/api.js';
	import confirmPrompt from '../popup/confirmPrompt.vue';
	import PhotoSwipe from 'photoswipe';
	export default {
		data() {
			return {
				cid: this.$route.params.cid,
				swiperOption: {
					autoplay: 3000,
					setWrapperSize :true,
					pagination : '.swiper-pagination',
					paginationClickable :true,
					mousewheelControl : true,
					observeParents:true
				},
				banner: [],
				info  : {},
				goodsList: [],
				msg          : '',
				isConfirmShow: false,
				btn          : ''
			}
		},
		components: {
			confirmPrompt
		},
		methods: {
			ajaxFun: function(cid) {
				suitDet(cid).then(data => {
					for (var i = 0; i < data.suitInfo.picture.length; i++) {
						this.banner.push(data.suitInfo.picture[i]);
					}
					for (var i = 0; i < data.goodsList.length; i++) {
						this.goodsList.push(data.goodsList[i]);
					}
					this.info = data.suitInfo;
					this.bannerFun();
				})	
			},
			bannerFun: function() {
				let this_ = this;
				this.$nextTick(function () {
					var banner = new Swiper ('.swiper-container', {
						autoplay: 4000,
						autoplayDisableOnInteraction: false,
						pagination: '.swiper-pagination'
					});
				});
			},
			picZoomFun: function(img) {
				var items = new Array();
				let width = document.body.offsetWidth * 2;
				let height = width / 16 * 9;
				items.push({
					src: img,
					w  : width,
					h  : height
				});
				for (var i = 0; i < this.banner.length; i++) {
					if (items[0].src.indexOf(this.banner[i]) == -1) {
						items.push({
							src: this.banner[i],
							w  : width,
							h  : height
						});
					}
					if (i == this.banner.length -1) {
						document.getElementById('iosMask').style.display = 'block';
						var pswpElement = document.querySelectorAll('.pswp')[0];
						var options = {      
							history: false,
							focus: false,
							showAnimationDuration: 0,
							hideAnimationDuration: 0
						};
						var gallery = new PhotoSwipe(pswpElement,PhotoSwipeUI_Default,items,options);
						gallery.init();
					}
				};
			},
			shopCollectFun: function(item) {
				let status = item.goodsCollect == 'Y'?'del':'add';
				let obj = {'pid':item.product_id,'type':status}
				shopDetCollect(obj).then(data => {
					if (data.islogin) {
						item.goodsCollect = item.goodsCollect == 'Y'?'N':'Y';
					}else {
						this.isConfirmShow = true;
						this.msg = '请先登陆';
						this.btn = '去登陆';
					}
				})
			},
			suitCollectFun: function(info) {
				let status = info.is_collect == 'Y'?'del':'add';
				let obj = {'cid':info.case_id,'type':status}
				suitCollect(obj).then(data => {
					if (data.islogin) {
						info.is_collect = info.is_collect == 'Y'?'N':'Y';
					}else {
						this.isConfirmShow = true;
						this.msg = '请先登陆';
						this.btn = '去登陆';
					}
				})
			},
			goLoginFun: function() {
				let url = this.$route.path;
				window.localStorage.setItem('url',url);
				this.$router.replace({path:'/login'});
			},
			confirmFun: function() {
				let sid = this.info.suit_id;
				this.$router.push({ name: '立即结算', params: { carts:' ',sid: sid,cid: this.cid }});
			}
		},
		created() {
			this.ajaxFun(this.cid);
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	@import './css/swiper-3.4.2.min.css';
	@import './css/photoswipe.css';
	@import './css/default-skin.css';
	#suitDet {
		.rem(padding-bottom,98);
	}
	.banner {
		width: 100%;
		.rem(height,360);
		.rem(margin-top,4);
		font-size: 0;
		overflow: hidden;
		.swiper-slide {
			width: 100%;
		}
		.swiper-container {
			.rem(height,360);
		}
		img {
			width: 100%;
			.rem(min-height,360);
		}
		.title {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			.rem(padding-top,6);
			.rem(padding-bottom,6);
			.rem(padding-left,25);
			.rem(padding-right,25);
			.rem(font-size,20);
			.rem(line-height,36);
			color: #fff;
			background: rgba(0,0,0,.5);
		}
	}
	.info {
		width: 100%;
		.rem(margin-top,4);
		.rem(padding,30);
		.rem(padding-top,25);
		.rem(padding-top,30);
		background: #fff;
		.title {
			width: 100%;
			.rem(line-height,26);
			.rem(font-size,26);
			color: #333;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		> div {
			position: relative;
			.rem(margin-top,20);
			.right {
				width: 100%;
				.rem(font-size,22);
				color: #666;
				text-align: right;
				span {
					.rem(font-size,32);
					color: #e37820;
				}
			}
			.like {
				position: absolute;
				.rem(top,-15);
				left: 0;
				.rem(width,140);
				.rem(height,80);
				.rem(line-height,80);
				font-size: 0;
				text-align: left;
				> span {
					display: inline-block;
					.rem(font-size,22);
					color: #999;
					vertical-align: middle;
				}
				.icon-like {
					.rem(width,20);
					.rem(height,18);
					.rem(margin-right,12);
					background: url(./image/like.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			.like.action {
				.txt {
					color: #d65317;
				}
				.icon-like {
					background-image: url(./image/like_1.png);
				}
			}
		}
	}
	.themes {
		width: 100%;
		.rem(height,54);
		.rem(margin-top,10);
		.rem(line-height,54);
		.rem(font-size,24);
		color: #333;
		text-align: center;
		background: #fff;
	}
	.list {
		li {
			position: relative;
			width: 100%;
			.rem(margin-top,2);
			.rem(padding-top,20);
			.rem(padding-bottom,20);
			.rem(padding-left,30);
			.rem(padding-right,30);
			overflow: hidden;
			background: #fff;
			> a > div {
				float: left;
			}
		}
		.img {
			.rem(width,88);
			.rem(height,88);
			overflow: hidden;
			img {
				width: 100%;
				.rem(min-height,88);
			}
		}
		.right {
			width: 100%;
			.rem(margin-left,-88);
			.rem(padding-left,112);
		}
		.right-top {
			position: relative;
			width: 100%;
			.rem(height,43);
			.rem(padding-top,2);
			.border(border-bottom,1,#eee);
			img {
				.rem(width,30);
				.rem(height,30);
			}
			p {
				display: inline-block;
				width: 100%;
				.rem(margin-left,-30);
				.rem(padding-left,40);
				.rem(padding-right,100);
				.rem(font-size,22);
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.right-bottom {
			.rem(padding-top,20);
			font-size: 0;
			overflow: hidden;
			span {
				display: inline-block;
				.rem(font-size,20);
				color: #999;
			}
			.adres {
				.rem(margin-right,20);
			}
			.money {
				float: right;
			}
		}
		.like {
			position: absolute;
			.rem(top,15);
			.rem(right,30);
			.rem(width,130);
			.rem(height,43);
			.rem(line-height,43);
			font-size: 0;
			text-align: center;
			> span {
				display: inline-block;
				.rem(font-size,22);
				color: #999;
				vertical-align: middle;
			}
			.icon-like {
				.rem(width,20);
				.rem(height,18);
				.rem(margin-right,12);
				background: url(./image/like.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.like.action {
			.txt {
				color: #d65317;
			}
			.icon-like {
				background-image: url(./image/like_1.png);
			}
		}
	}
	.bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		.rem(height,98);
		background: #fff;
		.fl {
			.rem(padding-left,30);
			.rem(font-size,22);
			.rem(line-height,98);
			color: #4c4948;
		}
		.fr {
			div {
				float: left;
			}
			.discount {
				.rem(margin-right,18);
				text-align: right;
				.p1 {
					.rem(margin-top,7);
					.rem(line-height,22);
					.rem(font-size,22);
					color: #4c4948;
				}
				.p2 {
					.rem(margin-top,12);
					.rem(line-height,28);
					.rem(font-size,28);
					color: #d65317;
				}
				.p3 {
					.rem(margin-top,5);
					.rem(line-height,20);
					.rem(font-size,20);
					color: #999;
					text-decoration: line-through;
				}
			}
			.btn {
				.rem(width,160);
				.rem(height,98);
				.rem(line-height,98);
				color: #fff;
				text-align: center;
				background: #d65317;
			}
		}
	}
</style>