<template>
	<div id="SPA">
		<div class="swiper-container swiper1">
			<div class="swiper-wrapper">
				<!-- list1 -->
				<div class="swiper-slide list1">
					<div class="banner">
						<a :href="info.advertising_url">
							<img :src="info.house_pic">
						</a>
					</div>
					<div class="plan">
						<div class="plan-info">
							<p class="p1">{{ info.city_name }}</p>
							<p class="p2">{{ info.house_name }}</p>
							<p class="p1">{{ info.name }}</p>
							<p class="p1">{{ info.area }}㎡</p>
						</div>
						<div class="plan-img"><img :src="info.picture"></div>
					</div>
				</div>
				<!-- list2 -->
				<div class="swiper-slide list2">
					<div class="banner">
						<div class="swiper-container swiper2">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for="list in effectList">
									<img :src="list.picture">
									<div class="suit-price">
										<p class="p1">{{ info.case_name }}</p>
										<p class="p2">{{ space_name }}</p>
									</div>
								</div>
							</div>
							<!-- 如果需要导航按钮 -->
							<div class="swiper-button-prev"></div>
							<div class="swiper-button-next"></div>
						</div>
					</div>
					<div class="design-say">
						<div class="box">
							<div class="say-info">
								<div class="d1">
									<div class="line"></div>
									<p class="p1">设计师说</p>
								</div>
								<p class="p2">{{ info.designer_said }}</p>
							</div>
						</div>
					</div>
					<div class="list">
						<ul>
							<router-link class="goods" :to="{name:'商品详情',params:{pid:list.product_id}}" v-for="list in goods" tag="li">
								<div class="img"><img :src="list.picture"></div>
								<p class="p1">{{ list.goods_name }}&nbsp;￥{{ list.price }}</p>
							</router-link>
						</ul>
					</div>
				</div>
				<!-- list3 -->
				<div class="swiper-slide list3"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import { SPA } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				id     : this.$route.params.id,
				ios    : true,
				info   : {},
				effectList: [],
				goodsList: [],	//所有商品列表
				goodsIndex: 0,	//数组下标
				space_name: '',
				goods: []
			}
		},
		methods: {
			ajaxFun() {
				SPA(this.id).then(data => {
					this.info = data.info;
					this.effectList = data.info.effectList;
					this.effectList.map((val,index) => {
						this.goodsList.push(val.productList);
					});
					this.space_name = this.effectList[this.goodsIndex].space_name;
					this.goods = this.effectList[this.goodsIndex].productList;
					this.swiperFun();
				});
			},
			swiperFun() {
				let this_ = this;
				let mySwiper = new Swiper ('.swiper1', {
					direction : 'vertical',
					pagination: '.swiper-pagination',
					mousewheelControl : true,
					watchSlidesProgress: true,
					onSlideChangeEnd: function(swiper){
						if (swiper.activeIndex == 1) {
							this_.bannerFun();
						}
					}
				})
			},
			bannerFun() {
				let this_ = this;
				let banner = new Swiper ('.swiper2', {
					autoplayDisableOnInteraction: false,
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					onSlideChangeStart: function(swiper){
						let goodsIndex = this_.goodsIndex = swiper.activeIndex;
						this_.space_name = this_.effectList[goodsIndex].space_name;
						this_.goods = this_.goodsList[goodsIndex];
					}
				});
			}
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
<style lang="less">
	@import '../../assets/mixin_750.less';
	@import './css/animate.min.css';
	@import './css/swiper.min.css';
	#SPA {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		img {
			float: left;
			width: 100%;
		}
		.swiper-container {
			width: 100%;
			height: 100%;
		}
		.swiper-slide{
			width:100%;
			height:100%;
		}
		.list1 {
			.banner {
				width: 100%;
				overflow: hidden;
				a {
					overflow: hidden;
				}
			}
			.plan {
				position: relative;
				.rem(width,640);
				.rem(height,670);
				margin: 0 auto;
				.rem(margin-top,70);
				.border(border,1,#ff8040);
				.plan-info {
					position: absolute;
					.rem(top,-4);
					.rem(left,-4);
					z-index: 10;
					color: #ff8040;
					background: #fff;
					.p1 {
						.rem(line-height,60);
						.rem(font-size,36);
					}
					.p2 {
						.rem(line-height,100);
						.rem(font-size,54);
					}
				}
				.plan-img {
					position: absolute;
					.rem(top,136);
					.rem(left,136);
					z-index: 20;
					display: flex;
					.rem(width,450);
					.rem(height,450);
					align-items: center;
					justify-content: center;
					background: #eee;
					img {
						.rem(max-width,450);
						.rem(max-height,450);
					}
				}
			}
		}
		.list2 {
			.banner {
				position: relative;
				width: 100%;
				.rem(height,421);
				.swiper-slide {
					position: relative;
					width: 100%;
					.rem(height,421);
					img {
						width: 100%;
						.rem(min-height,421);
					}
					.suit-price {
						position: absolute;
						top: 50%;
						left: 50%;
						.rem(width,310);
						.rem(height,120);
						.rem(margin-top,-60);
						.rem(margin-left,-155);
						text-align: center;
						color: #fff;
						background: rgba(237,118,49,.8);
					}
					.p1 {
						.rem(margin-top,10);
						.rem(line-height,64);
						.rem(font-size,34);
					}
					.p2 {
						.rem(font-size,22);
					}
				}
				.swiper-button-next, .swiper-button-prev {
					.rem(width,40);
					.rem(height,67);
					background-size: 100% 100%;
				}
			}
			.design-say {
				position: relative;
				width: 100%;
				.rem(height,270);
				.box {
					position: absolute;
					.rem(top,-53);
					left: 50%;
					z-index: 500;
					.rem(width,652);
					.rem(height,325);
					.rem(margin-left,-326);
					.rem(padding-top,24);
					background: #fff;
					.say-info {
						.rem(width,598);
						.rem(height,277);
						margin: 0 auto;
						.rem(padding-top,20);
						.rem(padding-left,20);
						.rem(padding-right,20);
						.border(border,2,#ff9f6f);
					}
				}
				.d1 {
					position: relative;
					.rem(width,230);
					.rem(height,40);
					margin: 0 auto;
					.rem(margin-bottom,20);
					.rem(line-height,40);
					.rem(font-size,24);
					.line {
						position: absolute;
						.rem(top,20);
						width: 100%;
						height: 1px;
						background: #ff8040;
					}
					.p1 {
						position: relative;
						z-index: 5;
						.rem(width,140);
						margin: 0 auto;
						.rem(line-height,40);
						text-align: center;
						color: #ff884d;
						background: #fff;
					}
				}
				.p2 {
					.rem(line-height,40);
					.rem(font-size,22);
					text-align: center;
					color: #f8a13c;
				}
			}
			.list {
				.rem(width,652);
				margin: 0 auto;
				.goods {
					float: left;
					width: 33.33%;
					.rem(margin-bottom,20);
					text-align: center;
					overflow: hidden;
				}
				.img {
					.rem(width,170);
					.rem(height,170);
					margin: 0 auto;
					overflow: hidden;
					img {
						width: 100%;
					}
				}
				.p1 {
					width: 100%;
					.rem(height,26);
					.rem(margin-top,10);
					.rem(line-height,26);
					.rem(font-size,20);
					overflow: hidden;
				}
			}
		}
		.list3 {
			background: url(./image/last_bg.jpg) no-repeat;
			background-size: 100% auto;
		}
	}
</style>