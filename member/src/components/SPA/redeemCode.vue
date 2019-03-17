<template>
	<div id="redeemCode">
		<div class="top"><img src="./image/coupon_1.jpg"></div>
		<ul class="coupon-list">
			<!-- <li v-for="list in lists"><button v-if="list.status == 2" class="btn" :data-clipboard-text="list.redeem_code">复制</button>{{ list.redeem_code }}</li> -->
			<li class="code" :class="list.status != 2 ? 'action' : ''" v-for="list in lists">
				<div class="left">{{ list.redeem_code }}</div>
				<div class="right">
					<button class="btn" :data-clipboard-text="list.redeem_code" v-if="list.status == 2">点击复制</button>
					<button class="btn" v-else>已被领取</button>
				</div>
			</li>
		</ul>
		<div class="popout" v-if="isPopout"><div class="mask" :class="isPopout?'bounce-in':''">复制成功</div></div>
	</div>
</template>
<script>
	import clipboard from 'clipboard';
	import { getRedeemCode } from '../../common/axios/api.js';
	import { WeChatConfig } from '../../common/public/WeChatConfig.js';
	export default {
		data() {
			return {
				lists: [],
				msg: '',
				isPopout: false,
				wxSystem: this.$store.state.publicJS.wxSystem,	//微信
				signPackage: {},		//微信配置
				imgUrl: ''
			}
		},
		methods: {
			ajaxFun: function() {
				getRedeemCode().then(data => {
					this.lists = data.list;
					this.imgUrl = data.imgUrl;
					if (this.wxSystem) {
						this.signPackage = data.signPackage;
						this.wxConfig();
					}
				})
			},
			wxConfig: function() {
				let this_ = this;
				let obj = {
					appId     : this.signPackage.appId,
					timestamp : this.signPackage.timestamp,
					nonceStr  : this.signPackage.nonceStr,
					signature : this.signPackage.signature
				}
				WeChatConfig(obj);
				wx.ready(function(){
					//分享朋友圈
					wx.onMenuShareTimeline({
						title: '大美软装全面上线,活动多多', // 分享标题
						link: 'http://member.idmei.com/topage?i=H5&c=spa&a=redeemCode', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: 'http://public.idmei.cn/152064460751655.png', // 分享图标
						success: function () {
							// 用户确认分享后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
					//分享给朋友
					wx.onMenuShareAppMessage({
						title: '大美软装全面上线,活动多多', // 分享标题
						desc: '大美软装-新零售创意家饰网络平台！', // 分享描述
						link: 'http://member.idmei.com/topage?i=H5&c=spa&a=redeemCode', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: 'http://public.idmei.cn/152064460751655.png', // 分享图标
						type: '', // 分享类型,music、video或link，不填默认为link
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function () {
							// 用户确认分享后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
				});
			}
		},
		created() {
			this.ajaxFun();
		},
		mounted() {
			let this_ = this;
			let Clipboard = new clipboard('.btn');
			Clipboard.on('success', function(e) {
				this_.isPopout = true;
				this_.msg = '复制成功';
				setTimeout(() => {
					this_.isPopout = false;
				},1500);
				e.clearSelection();
			});
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#redeemCode {
		.top {
			width: 100%;
			overflow: hidden;
			img {
				float: left;
				width: 100%;
			}
		}
		.coupon-list {
			width: 100%;
			.rem(padding-left,68);
			.rem(padding-right,66);
			.rem(padding-bottom,40);
			background: url(./image/coupon_2.jpg) no-repeat;
			background-size: 100% 100%;
			overflow: hidden;
		}
		.code {
			float: left;
			width: 30%;
			.rem(height,89);
			.rem(margin-bottom,30);
			margin-right: 5%;
			color: #fcd658;
			background: url(./image/coupon_3.png) no-repeat;
			background-size: 100% 100%;
			overflow: hidden;
			&:nth-child(3n) {
				margin-right: 0;
			}
			.left {
				float: left;
				width: 60%;
				.rem(padding-top,10);
				.rem(padding-left,20);
				.rem(padding-right,10);
				.rem(line-height,34);
				.rem(font-size,18);
				word-wrap: break-word;
			}
			.right {
				float: right;
				width: 40%;
				.rem(height,89);
				.rem(padding-top,9);
				.rem(padding-bottom,9);
				.btn {
					width :100%;
					height: 100%;
					padding: 0;
					margin: 0;
					.rem(padding-top,0);
					.rem(padding-left,8);
					.rem(padding-right,5);
					.rem(line-height,27);
					.rem(font-size,20);
					color: #fcd658;
					border: 0;
					border-left: 1px dashed #fcd658;
					word-wrap: break-word;
					letter-spacing: 2px;
					outline: none;
					background: rgba(0,0,0,0);
				}
			}
			&.action {
				color: #c42121;
				background-image: url(./image/coupon_4.png);
				.right {
					.btn {
						color: #c42121;
						border-left-color: #c42121;
					}
				}
			}
		}
		.popout {
			position: fixed;
			width: 100%;
			height: 100%;
			.mask {
				position: fixed;
				top: 50%;
				left: 50%;
				.rem(width,160);
				.rem(height,50);
				.rem(margin-left,-80);
				.rem(margin-top,25);
				.rem(line-height,50);
				text-align: center;
				.rem(font-size,24);
				color: #fff;
				letter-spacing: 1px;
				.border-radius(20);
				background: rgba(0,0,0,.7);
			}
		}
	}
	.bounce-in {
		animation: bounce-in .5s;
	}
	@keyframes bounce-in {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		100% {
			transform: scale(1);
		}
	}
</style>