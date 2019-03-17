<template>
	<div id="residualCost">
		<div class="banner">
			<div class="swiper-container swiper-container1">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="item in banner">
						<img :src="item.picture">
					</div>
				</div>
			</div>
		</div>
		<div class="money residual">剩余费用<span>¥&nbsp;{{ nowPay }}</span></div>
		<div class="money paid">已付费用<span>¥&nbsp;{{ prePay }}</span></div>
		<div class="pay"><span @click="payFun">去支付</span></div>
	</div>
</template>
<script>
	import { prepayCase } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				oid: this.$route.params.oid,
				banner: [],
				nowPay: 0,
				prePay: 0
			}
		},
		methods: {
			ajaxFun: function() {
				prepayCase(this.oid).then(data => {
					if (data.code == 1) {
						this.nowPay = data.nowPay;
						this.prePay = data.prePay;
						for (var i = 0; i < data.picList.length; i++) {
							this.banner.push(data.picList[i])
						}
					}else {
						this.$store.state.publicJS.promptBoxMsg = data.msg;
						this.$store.dispatch('alertPrompt');
					}
				})
			},
			bannerFun: function() {
				let this_ = this;
				this.$nextTick(function () {
					var banner = new Swiper ('.swiper-container1', {
						autoplay: 4000,
						speed: 1500,
						autoplayDisableOnInteraction: false,
						effect : 'fade',
						fade: {
							crossFade: true
						}
					});
				});
			},
			payFun: function() {
				this.$router.replace({ path: '/orderPay',query:{oid:this.oid,'type':'design_pay','money':this.nowPay}})
			}
		},
		created() {
			this.ajaxFun()
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	@import './css/swiper-3.4.2.min.css';
	.banner {
		width: 100%;
		.rem(height,320);
		.swiper-slide {
			width: 100%;
			.rem(height,320);
			overflow: hidden;
		}
		img {
			width: 100%;
			.rem(min-height,320);
		}
	}
	.money {
		width: 100%;
		.rem(height,80);
		.rem(margin-top,10);
		.rem(padding-left,28);
		.rem(padding-right,28);
		.rem(line-height,80);
		.rem(font-size,28);
		color: #333;
		background: #fff;
		span {
			float: right;
		}
	}
	.residual {
		span {
			color: #f38b00;
		}
	}
	.paid {
		span {
			color: #666;
		}
	}
	.pay {
		.rem(margin-top,30);
		text-align: center;
		span {
			display: inline-block;
			.rem(width,400);
			.rem(height,80);
			.rem(line-height,80);
			.rem(font-size,28);
			color: #fff;
			.border-radius(10);
			background: #f38b00;
		}
	}
</style>