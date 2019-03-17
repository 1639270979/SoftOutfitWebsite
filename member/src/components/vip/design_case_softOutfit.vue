<template>
	<div id="design_case_softOutfit">
		<p class="title">VIP会员软装设计方案</p>
		<div class="swiper">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="list in caseInfo.picList">
						<img :src="list">
					</div>
				</div>
				<!-- 如果需要分页器 -->
				<div class="swiper-pagination"></div>
			</div>
		</div>
		<router-link
			:to="'/vip/vipCaseDet/'+oid"
			class="caseInfo"
			tag="div">{{ caseInfo.title }}<div class="fr">查看详情<i></i></div></router-link>
		<p class="p1">VIP会员服务编号<span class="fr">{{ caseInfo.service_no  }}</span></p>
		<p class="p1">提交时间<span class="fr">{{ caseInfo.addtime }}</span></p>
		<p class="p1">完成时间<span class="fr">{{ caseInfo.finish_time }}</span></p>
		<div class="btn" v-if="caseInfo.status != 6"><span @click="confirmFun">确认</span><router-link :to="'/vip/vipDesignModify/'+caseInfo.order_id" class="apply" tag="span">申请修改</router-link></div>
	</div>
</template>
<script>
	import { vipDesignCase,vipOrderConfirm } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				oid: this.$route.params.oid,
				caseInfo: {},	
				isAuxiliary: false,
				wxSystem: this.$store.state.publicJS.wxSystem
			}
		},
		methods: {
			ajaxFun: function() {
				vipDesignCase(this.oid).then(data => {
					this.caseInfo = data.caseInfo;
					this.bannerFun();
				})
			},
			bannerFun: function() {
				let this_ = this;
				this.$nextTick(function () {
					var banner = new Swiper ('.swiper-container', {
						loop: true,
						autoplay: 4000,
						autoplayDisableOnInteraction: false,
						pagination: '.swiper-pagination'
					});	
				});
			},
			confirmFun: function() {
				let obj = {'oid':this.caseInfo.order_id}
				vipOrderConfirm(obj).then(data => {
					if (data.code == 1) {
						this.caseInfo.status = 6;
						this.txtFun(data.message);
					}else {
						this.txtFun(data.message);
					}
				});
			},
			txtFun: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1000);
			}
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	@import './css/swiper-3.4.2.min.css';
	.title {
		width: 100%;
		.rem(height,70);
		.rem(line-height,70);
		.rem(font-size,32);
		color: #333;
		text-align: center;
		background: #fff;
	}
	.swiper {
		width: 100%;
		.rem(height,420);
		overflow: hidden;
		background: #fff;
		.swiper-slide {
			width: 100%;
			.rem(height,420);
			img {
				width: 100%;
				.rem(min-height,420);
			}
		}
	}
	.caseInfo {
		width: 100%;
		.rem(height,88);
		.rem(margin-bottom,10);
		.rem(padding-left,23);
		.rem(padding-right,32);
		.rem(line-height,88);
		.rem(font-size,28);
		background: #fff;
		.fr {
			.rem(font-size,24);
			color: #999;
			i {
				position: relative;
				.rem(top,3);
				display: inline-block;
				.rem(width,14);
				.rem(height,24);
				.rem(margin-left,17);
				background: url(./image/icon-right_1.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.p1 {
		width: 100%;
		.rem(height,70);
		.rem(margin-bottom,2);
		.rem(padding-left,23);
		.rem(padding-right,32);
		.rem(line-height,70);
		.rem(font-size,24);
		background: #fff;
		.fr {
			color: #666;
		}
	}
	.btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		.rem(height,98);
		.rem(padding-top,24);
		.rem(padding-right,22);
		background: #fff;
		>span {
			float: right;
			.rem(width,134);
			.rem(height,57);
			.rem(margin-left,23);
			.rem(line-height,53);
			.rem(font-size,24);
			color: #ed7631;
			text-align: center;
			.border(border,2,#ed7631);
			.border-radius(5);
		}
		.apply {
			color: #666;
			border-color: #999;
		}
	}
</style>