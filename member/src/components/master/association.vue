<template>
	<div id="association">
		<div class="top">
			<p class="title"><span class="y"></span>华英会介绍</p>
			<div class="img"><img src="./image/hyh-logo.jpg"></div>
			<p class="txt">华英会，以“倡导优质生活价值、传道品质设计文化”为品牌理念,关注“设计、艺术、品牌、商业、趋势研究、城市文脉”等方向，以高品质为立身原则，凝聚搭建顶尖设计师及跨专业多维度的高端资源整合，是设计精英思想交流，互动互助及价值转换、传播的平台与精神家园也是中国领先的设计公司及个体展开国际合作的重要渠道。华英会通过策划组织一系列学术交流、项目合作及多种形式的专题策展形成成果，实现核心价值，并以专题策展、出版物、纪录片等方式进行记录传播，促力当代华人设计影响力，弘扬行业正气，推动设计可持续发展的一个新语境平台。</p>
		</div>
		<div class="master-list">
			<p class="title"><span class="y"></span>华英会-设计师</p>
			<div class="designer-banner">
				<div class="swiper-container swiper-container3">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="lists in masterList">
							<div v-for="list in lists" v-if="lists.length > 1">
								<router-link :to="{ path: '/index/master/det',query:{mid:list.id}}" :key="list.id">
									<img :src='list.headimg'>
								</router-link>
							</div>
							<div v-if="lists.length == 1">
								<router-link :to="{ path: '/index/master/det',query:{mid:lists[0].id}}">
									<img :src='lists[0].headimg'>
								</router-link>
							</div>
							<div v-if="lists.length == 1">
								<a>
									<img src="./image/white.jpg">
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="founder">
			<p class="title"><span class="y"></span>创始人</p>
			<div class="left fl"><img src="./image/founder.jpg"></div>
			<div class="right">
				<p class="name">唐海云</p>
				<div class="txt">
					<p>华英会国际联盟 — 创办人</p>
					<p>深圳市翠堤春晓设计顾问有限公司— 创办人及艺术总监</p>
 					<p>深圳市室内建筑设计师行业协会 理事</p>
				</div>
			</div>
		</div>
		<div class="mileage">
			<p class="title"><span class="y"></span>华英会—里程碑</p>
			<ul>
				<li v-for="list in milestone">
					<p class="time">{{ list.time }}</p>
					<p class="txt">{{ list.details }}</p>
					<div class="img">
						<img v-if="list.image != ''" :src="list.image">
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { eliteclub } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				masterList: [],
				milestone: []
			}
		},
		methods: {
			ajaxFun() {
				eliteclub().then(data => {
					this.masterList = data.masterList;
					this.milestone = data.milestone;
					this.bannerFun();
				})
			},
			bannerFun: function(data) {
				let this_ = this;
				this.$nextTick(function () {
					this.dsgBanner = new Swiper ('.swiper-container3', {
						loop: true,
						autoplay: 3000000,
						//speed: 500,
						loopAdditionalSlides: 1,	//前后各复制多少个
						autoplayDisableOnInteraction: false,
						effect : 'cube',
						grabCursor: true,
						cube: {
							slideShadows: false,
							shadow: true,
							shadowOffset: 0,
							shadowScale: 0
						}
					});
				});
			},
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#association {
		width: 100%;
		.rem(padding-left,30);
		.rem(padding-right,30);
		.border(border-top,2,#d2d2d2);
		.title {
			width: 100%;
			.rem(line-height,100);
			.rem(font-size,30);
			.y {
				position: relative;
				.rem(top,-2);
				display: inline-block;
				.rem(width,21);
				.rem(height,21);
				.rem(margin-right,20);
				border-radius: 50%;
				background: #e68709;
			}
		}
		.top {
			.rem(padding-bottom,40);
			.border(border-bottom,2,#d2d2d2);
			.img {
				.rem(width,287);
				.rem(height,213);
				margin: 0 auto;
				img {
					width: 100%;
				}
			}
			.txt {
				.rem(margin-top,50);
				.rem(line-height,40);
				.rem(font-sze,22);
				color: #282828;
			}
		}
		.master-list {
			width: 100%;
			.rem(padding-bottom,40);
			.border(border-bottom,2,#d2d2d2);
			.designer-banner {
				width: 100%;
				.rem(min-height,297);
				overflow: hidden;
				.swiper-container,.swiper-wrapper {
					width: 100%;
					.rem(height,297);
				}
				.swiper-slide {
					width: 100%;
					margin: 0 auto;
					text-align: center;
					overflow: hidden;
					> div {
						display: inline-block;
						width: 48%;
						.rem(min-height,330);
						margin-right: 2%;
						&:last-of-type {
							margin-right: 0;
						}
					}
					img {
						width: 100%;
						.rem(min-height,330);
					}
				}
			}
		}
		.founder {
			width: 100%;
			.rem(padding-right,60);
			.rem(padding-bottom,40);
			.border(border-bottom,2,#d2d2d2);
			overflow: hidden;
			.left {
				.rem(width,243);
				img {
					width: 100%;
				}
			}
			.right {
				width: 100%;
				.rem(padding-left,284);
				.name {
					width: 100%;
					.rem(line-height,81);
					color: #e68709;
					.border(border-bottom,2,#171717);
				}
				.txt {
					.rem(margin-top,40);
					.rem(line-height,30);
					.rem(font-size,22);
					color: #282828;
				}
			}
		}
		.mileage {
			li {
				width :100%;
				.rem(margin-bottom,20);
				.rem(padding-bottom,20);
				.border(border-bottom,2,#d2d2d2);
				&:last-of-type {
					border: 0;
				}
			}
			.time {
				.rem(margin-bottom,10);
				.rem(line-height,32);
				.rem(font-size,24);
				color: #e68709;
			}
			.txt {
				.rem(margin-bottom,10);
				.rem(line-height,32);
				.rem(font-size,22);
				color: #282828;
			}
			.img {
				width: 100%;
				overflow: hidden;
				img {
					float: left;
					width: 100%;
				}
			}
		}
	}
</style>