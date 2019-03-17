<template>
	<div id="orderPay">
		<div class="order-number">订单编号：{{ oid }}</div>
		<div class="wx">
			<span class="icon icon-wx"></span><span>微信支付</span>
			<div class="right">
				<input type="radio" value="wxPay" v-model="picked">
				<span></span>
			</div>
		</div>
		<div class="zfb" v-if="!wxSystem">
			<span class="icon icon-zfb"></span><span>支付宝支付</span>
			<div class="right">
				<input type="radio" value="AliPay" v-model="picked">
				<span></span>
			</div>
		</div>
		<!-- <div class="yl" v-if="wxSystem">
			<span class="icon icon-yl"></span><span>银联支付</span>
			<div class="right">
				<input type="radio" value="ylPay" v-model="picked">
				<span></span>
			</div>
		</div> -->
		<div class="split" v-if="type == 'product_pay' && money > 5000">
			<span class="icon icon-split"></span><span>分多次支付</span>
			<div class="right">
				<input type="radio" value="splitPay" v-model="picked">
				<span></span>
			</div>
		</div>
		<div class="split-txt" v-if="type == 'product_pay' && money > 5000">由于各类卡型每笔支付额度的限制，您可以选择分多次支付。</div>
		<div class="confirm">
			<div @click="confirmFun">确认支付&nbsp;&nbsp;<span>¥{{ money }}</span></div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { payment,payType,topay,multipleCreate } from '../../common/axios/api.js';
	import { WeChatConfig } from '../../common/public/WeChatConfig.js';
	export default {
		data() {
			return {
				oid: this.$route.query.oid,
				type: this.$route.query.type,
				picked: 'wxPay',
				money: this.$route.query.money,
				wxSystem: this.$store.state.publicJS.wxSystem,
				payInfo: ''
			}
		},
		methods: {
			confirmFun: function() {
				if (this.picked == 'splitPay') {//跳多次支付
					this.$router.replace({path:'/orderPay/splitPay',query:{oid:this.oid,'type':this.type}});
					return;
				}
				let install_WeCath = window.localStorage.getItem('install_WeCath');
				if (!install_WeCath && this.picked == 'wxPay' && !this.wxSystem) {
					this.alertPrompt('请先安装微信');
					return;
				}
				if (this.type == 'design_pay') {//设计师
					var picked;
					if (this.picked == 'wxPay') {
						picked = 1;
					}else if (this.picked == 'AliPay') {
						picked = 2;
					}else {
						picked = 4;
					}
					let obj = {'pay_type':picked,'oid':this.oid}
					payment(obj).then(data => {
						if (data.code == 1) {
							if (this.wxSystem) {//公众号
								/*if (picked == 4) {
									window.location.href = 'http://member.idmei.com/unionpay/topay?oid='+data.payment_id+'&type='+this.type;
									return;
								}*/
								this.weChatPay(data.payment_id);
								return;
							}
							var message = {'funName':this.picked,'oid':data.payment_id,'type':this.type};
							this.payFun(message);
						}else {
							this.alertPrompt(data.message);
						}
					})
				}else {//商品&我家&vip开通
					var picked;
					if (this.picked == 'wxPay') {
						picked = 1;
					}else if (this.picked == 'AliPay') {
						picked = 2;
					}else {
						picked = 4;
					}
					let obj = {'pay_type':picked,'oid':this.oid,'order_type':this.type}
					payType(obj).then(data => {
						if (data.code == 1) {
							if (this.type == 'product_pay') {
								multipleCreate({'oid':this.oid,'type':1}).then(info => {
									if (this.wxSystem) {//公众号
										/*if (picked == 4) {
											window.location.href = 'http://member.idmei.com/unionpay/topay?oid='+this.oid+'&type='+this.type;
											return;
										}*/
										this.weChatPay(info.order_id);
										return;
									}
									var message = {'funName':this.picked,'oid':info.order_id,'type':this.type};
									this.payFun(message);
								})
								return;
							}
							if (this.wxSystem) {//公众号
								if (picked == 4) {
									window.location.href = 'http://member.idmei.com/unionpay/topay?oid='+this.oid+'&type='+this.type;
									return;
								}
								this.weChatPay(this.oid);
								return;
							}
							var message = {'funName':this.picked,'oid':this.oid,'type':this.type};
							this.payFun(message);
						}else {
							this.alertPrompt(data.msg);
						}
					});
				}
			},
			weChatPay: function(oid) {//公众号的微信支付
				let obj = {'oid':oid,'type':this.type};
				topay(obj).then(data => {
					if (data.code == 1) {
						this.payInfo = data.payInfo;
						if (typeof WeixinJSBridge == "undefined"){
							if( document.addEventListener ){
								document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
							}else if (document.attachEvent){
								document.attachEvent('WeixinJSBridgeReady', jsApiCall);
								document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
							}
						}else{
							this.jsApiCall();
						}
					}
				});
			},
			jsApiCall: function() {//公众号的微信支付
				let this_ = this;
				var payInfo = this.payInfo;
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest',
					payInfo,
					function(res){
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							this_.jumpPage(this_.type);
						}
						// WeixinJSBridge.log(res.err_msg);
						// alert(res.err_code+res.err_desc+res.err_msg);
					}
				);
			},
			payFun(obj) {//原生交互
				let isAndroid = window.navigator.appVersion.match(/android/gi);
				let isIPhone = window.navigator.appVersion.match(/iphone/gi);
				if (isAndroid) {
					window.appModel.postMessage(JSON.stringify(obj));//发给安卓
				}else if (isIPhone) {
					// AppModel就是已经注入的名称，注入以后，就可以在JS端调用了
					window.webkit.messageHandlers.AppModel.postMessage(obj);//发给IOS
				}
			},
			jumpPage(str) {//跳转页面
				if (str == 'design_pay') {//设计订单
					this.$router.replace({path:'/member/designOrder'});
				}else if (str == 'product_pay') {//商品
          this.$router.replace({path:'/member/order/orderDet/'+this.oid});
				}else if (str == 'payment_pay') {//全景图&vip开通
					this.$router.go(-1);
				}else if (str == 'vip_design_pay') {//vip整屋装修设计需求
					this.$router.replace({ path: '/vip/vipOrderDet/'+this.oid});
				}
			},
			alertPrompt: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.dispatch('alertPrompt');
			}
		},
		created() {
			var this_ = this;
			window.getInfoFromNative = function(returnStr) {//原生调用
				let obj = JSON.parse(returnStr);
				if (obj.funName == 'wxPay') {
					if (obj.code == -3) {
						this_.$store.state.publicJS.promptBoxMsg = '您好，系统出错';
						this_.$store.commit('txtPrompt');
						setTimeout(function() {
							this_.$store.commit('txtPrompt');
							this_.jumpPage(this_.type);
						},1500);
						return;
					}
					this_.jumpPage(this_.type);
				}else if (obj.funName == 'AliPay') {
					if (obj.code == 10000) {
						this_.jumpPage(this_.type);
					}else {
						this_.$store.state.publicJS.promptBoxMsg = obj.msg;
						this_.$store.commit('txtPrompt');
						setTimeout(function() {
							this_.$store.commit('txtPrompt');
							this_.jumpPage(this_.type);
						},1500);
					}
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#orderPay {
		> div {
			position: relative;
			.rem(height,70);
			.rem(padding-left,30);
			.rem(line-height,70);
			background: #fff;
			>span {
				display: inline-block;
				vertical-align: middle;
			}
			.icon {
				.rem(width,30);
				.rem(height,24);
				.rem(margin-right,10);
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
		}
		.confirm {
			.rem(margin-top,40);
			padding-left: 0;
			background: #eee;
			div {
				.rem(width,575);
				.rem(height,80);
				margin: 0 auto;
				.rem(line-height,80);
				.rem(font-size,28);
				color: #fff;
				text-align: center;
				background: #f38b00;
				span {
					.rem(font-size,34);
				}
			}
		}
		.order-number {
			width: 100%;
			.rem(height,70);
			.rem(margin-top,2);
			.rem(margin-bottom,35);
			.rem(font-size,28);
			color: #333;
		}
		.right {
			float: right;
			.rem(margin-right,37);
			.rem(width,40);
			.rem(height,70);
			.rem(line-height,70);
			text-align: right;
			input {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				margin: 0;
				opacity: 0;
			}
			span {
				display: inline-block;
				.rem(width,24);
				.rem(height,24);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-image: url(./image/radio_3.png);
			}
			input:checked+span {
				background-image: url(./image/radio_2.png);
			}
		}
		.wx {
			.rem(margin-bottom,35);
			.icon-wx {
				background-image: url(./image/wx.png);
			}
		}
		.zfb {
			.rem(margin-bottom,2);
			.icon-zfb {
				background-image: url(./image/zfb.png);
			}
		}
		.yl {
			.icon-yl {
				background-image: url(./image/yl.png);
			}
		}
		.split {
			.rem(margin-top,35);
			.icon-split {
				background-image: url(./image/split.png);
			}
		}
		.split-txt {
			width: 100%;
			.rem(height,40);
			line-height: normal;
			.rem(padding-left,30);
			font-size: 10px;
			color: #999;
			background: #fff;
		}
	}
</style>
