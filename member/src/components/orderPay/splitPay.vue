<template>
	<div id="splitPay">
		<div class="title">本次支付金额</div>
		<div class="money" @click="numberKeyFun"><span class="icon-money">¥</span><p class="inp-money">{{ number }}</p></div>
		<div class="total">总计付满 ¥{{ order.cost_order }} 即可发货，还需支付 <span class="txt">¥{{ order.need_pay }}</span></div>
		<div class="gray-20"></div>
		<div class="sum">
			<p class="sum-money txt">订单总额<span class="fr">¥{{ order.cost_order }}</span></p>
			<p class="pay txt">已支付<span class="fr">¥{{ order.total_pay }}</span></p>
		</div>
		<div class="gray-20"></div>
		<div class="pay-mode">
			<div class="title">支付方式</div>
			<div class="checkBox" v-if="!wxSystem" @click="picked = 'AliPay'">
				<span class="icon icon-zfb"></span>
				<p class="txt">支付宝</p>
				<div class="inp" :class="picked == 'AliPay' ? 'action' : ''">
					<input type="radio" name="picked" value="AliPay" v-model="picked">
					<i></i>
				</div>
			</div>
			<div class="checkBox" @click="picked = 'wxPay'">
				<span class="icon icon-wx"></span>
				<p class="txt">微信</p>
				<div class="inp" :class="picked == 'wxPay' ? 'action' : ''">
					<input type="radio" name="picked" value="wxPay" v-model="picked">
					<i></i>
				</div>
			</div>
		</div>
		<div class="btn" @click="confirmFun">确认支付</div>
		<!-- 数字键盘 -->
		<number-key :num="num" @update:num="val => num = val"></number-key>
	</div>
</template>
<script>
	import { orderDet,multipleCreate,topay,payType } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				order: {},
				oid: this.$route.query.oid,
				num: '',
				picked: 'wxPay',
				wxSystem: this.$store.state.publicJS.wxSystem,
				payInfo: ''
			}
		},
		methods: {
			ajaxFun: function() {
				orderDet(this.oid).then(data => {
					this.order = data.order;
				});
			},
			numberKeyFun: function() {
				this.$store.commit('isNumberKeyShow');
			},
			confirmFun: function() {
				let num = this.num / 1;
				let surplus = this.order.need_pay / 1;	//剩余支付金额
				if (num == 0) {
					this.$store.state.publicJS.promptBoxMsg = '请输入金额';
					this.$store.dispatch('alertPrompt');
					return;
				}
				if (num < 5000 && surplus > 5000) {//支付金额必须大于5000
					this.$store.state.publicJS.promptBoxMsg = '多次支付金额不能小于5000';
					this.$store.dispatch('alertPrompt');
					return;
				}else if (num > surplus) {
					this.$store.state.publicJS.promptBoxMsg = '本次支付需支付'+surplus+'元';
					this.$store.dispatch('alertPrompt');
					return;
				}
				payType({'pay_type':5,'oid':this.oid,'order_type':'product_pay'}).then(data => {
					multipleCreate({'oid':this.oid,'mo':num,'type':2}).then(info => {
						if (info.code == 1) {
							if (this.wxSystem) {
								this.weChatPay(info.order_id);
								return;
							}
							var message = {'funName':this.picked,'oid':info.order_id,'type':'product_pay'};
							this.payFun(message);
						}
					});
				});
			},
			weChatPay: function(oid) {
				topay({'oid':oid,'type':'product_pay'}).then(data => {
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
			jsApiCall: function() {
				let this_ = this;
				var payInfo = this.payInfo;
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest',
					payInfo,
					function(res){
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							this_.jumpPage();
						}
						// WeixinJSBridge.log(res.err_msg);
						// alert(res.err_code+res.err_desc+res.err_msg);
					}
				);
			},
			jumpPage() {
				orderDet(this.oid).then(data => {
					this.order = data.order;
					if ( this.order.status == 2 ) {//支付金额等于剩余支付金额
						this.$router.replace({path:'/member/order/orderDet/'+this.oid});
					}else {
						this.num = '';
					}
				});

			},
			payFun(obj) {
				let isAndroid = window.navigator.appVersion.match(/android/gi);
				let isIPhone = window.navigator.appVersion.match(/iphone/gi);
				if (isAndroid) {
					window.appModel.postMessage(JSON.stringify(obj));//发给安卓
				}else if (isIPhone) {
					// AppModel就是已经注入的名称，注入以后，就可以在JS端调用了
					window.webkit.messageHandlers.AppModel.postMessage(obj);//发给IOS
				}
			}
		},
		computed: {
			number: function() {
				let num = this.num;
				return num;
			}
		},
		created() {
			this.ajaxFun();
			var this_ = this;
			window.getInfoFromNative = function(returnStr) {//原生调用
				let obj = JSON.parse(returnStr);
				if (obj.funName == 'wxPay') {
					if (obj.code == -3) {
						this_.$store.state.publicJS.promptBoxMsg = '您好，系统出错';
						this_.$store.commit('txtPrompt');
						setTimeout(function() {
							this_.$store.commit('txtPrompt');
							this_.jumpPage();
						},1500);
						return;
					}
					this_.jumpPage();
				}else if (obj.funName == 'AliPay') {
					if (obj.code == 10000) {
						this_.jumpPage();
					}else {
						this_.$store.state.publicJS.promptBoxMsg = obj.msg;
						this_.$store.commit('txtPrompt');
						setTimeout(function() {
							this_.$store.commit('txtPrompt');
							this_.jumpPage();
						},1500);
					}
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#splitPay {
		background: #fff;
		.title {
			width: 100%;
			.rem(height,83);
			.rem(padding-left,35);
			.rem(line-height,83);
			.rem(font-size,28);
		}
		.money {
			position: relative;
			width: 100%;
			.rem(height,87);
			.rem(padding-left,40);
			.icon-money {
				position: relative;
				z-index: 10;
				.rem(line-height,70);
				.rem(font-size,36);
				font-weight: 600;
			}
			.inp-money {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 5;
				width: 100%;
				height: 100%;
				.rem(padding-left,80);
				.rem(line-height,87);
				.rem(font-size,40);
			}
		}
		.total {
			width: 100%;
			.rem(height,73);
			.rem(padding-left,35);
			.rem(line-height,73);
			.rem(font-size,20);
			color: #999;
			letter-spacing: 1px;
			.border(border-top,3,#eee);
			.txt {
				color: #f38b00;
			}
		}
		.gray-20 {
			width: 100%;
			.rem(height,20);
			background: #eee;
		}
		.sum {
			.txt {
				width: 100%;
				.rem(height,83);
				.rem(padding-left,35);
				.rem(padding-right,80);
				.rem(line-height,83);
				.rem(font-size,24);
			}
			.sum-money {
				.rem(height,85);
				.rem(line-height,83);
				.border(border-bottom,2,#eee);
			}
			.fr {
				text-align: right;
			}
		}
		.pay-mode {
			.checkBox {
				position: relative;
				width: 100%;
				.rem(height,112);
				.rem(padding-left,35);
				.rem(line-height,112);
				.border(border-top,2,#eee);
			}
			.icon {
				position: relative;
				.rem(top,43);
				float: left;
				.rem(width,30);
				.rem(height,24);
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
			.icon-zfb {
				background-image: url(./image/zfb.png);
			}
			.icon-wx {
				background-image: url(./image/wx.png);
			}
			.txt {
				width: 100%;
				.rem(padding-left,45);
				.rem(font-size,24);
			}
			.inp {
				position: absolute;
				top: 0;
				.rem(right,35);
				.rem(width,35);
				height: 100%;
				input {
					position: absolute;
					top: 0;
					opacity: 0;
				}
				i {
					position: absolute;
					.rem(top,37);
					.rem(width,35);
					.rem(height,35);
					background: url(./image/radio_3.png) no-repeat;
					background-size: 100% 100%;
				}
				&.action {
					i {
						background-image: url(./image/radio_2.png);
					}
				}
			}
		}
		.btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			.rem(height,75);
			.rem(line-height,75);
			.rem(font-size,24);
			text-align: center;
			color: #fff;
			background: #f38b00;
		}
	}
</style>
