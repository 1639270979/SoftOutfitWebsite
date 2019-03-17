<template>
	<div id="designOrder">
		<div class="nav">
			<ul>
				<li @click="typeFun(1)" :class="type == 1?'action':''">全部订单</li>
				<li @click="typeFun(2)" :class="type == 2?'action':''">待支付</li>
				<li @click="typeFun(3)" :class="type == 3?'action':''">待设计</li>
				<li @click="typeFun(4)" :class="type == 4?'action':''">待确认</li>
			</ul>
		</div>
		<div class="list">
			<ul>
				<li v-for="item in items">
					<div class="top">
						<p>订单号：{{ item.order_id }}<span class="fr">{{ item.status_v }}</span></p>
					</div>
					<div class="body">
						<div class="adres">{{ item.address }}</div>
						<p class="type">设计师名称：{{ item.designer_name }}</p>
						<p class="type">期望软装价格：{{ item.expect_price }}</p>
						<p class="type">期望软装空间：{{ item.expect_space }}</p>
						<p class="type">期望软装风格：{{ item.expect_style }}</p>
						<p class="type">客户留言：{{ item.message }}</p>
					</div>
					<div class="money">
						<p class="name">{{ item.combo_but }}</p>
						<p class="num"><span class="time" v-if="item.status == 2 || item.status == 4 || item.status == 5 || item.status == 6 || item.status == 7">交易时间：{{ item.paytime }}</span>¥{{ item.price }}</p>
					</div>
					<div class="btn">
						<span v-if="item.status == 1" @click="cancelFun(item)">取消订单</span>
						<span v-if="item.status == 1" @click="paymentFun(item)">立即支付</span>
						<span v-if="item.status == 2" @click="refundFun(item)">申请退款</span>
						<span v-if="item.status == 3" @click="cancelRefundFun(item)">取消退款</span>
						<router-link
							:to="'/member/designOrder/residualCost/'+item.order_id"
							tag='span'
							v-if="(item.status == 5 || item.status == 7)&& item.pay_status == 1">查看预览</router-link>
						<router-link
							:to="'/index/designer/programmeDet/'+item.case_id"
							tag='span'
							v-if="(item.status == 5 || item.status == 7)&& item.pay_status == 2">查看方案</router-link>
						<a :href="item.pano_url" v-if="(item.status == 5 || item.status == 7)&&item.combo == 2 && item.pay_status == 2">查看全景图</a>
            <span v-if="item.status == 5 && item.pay_status == 2" @click="confirmFun(item)">确认订单</span>
						<span v-if="item.status == 5 && item.pay_status == 2" @click="modifyFun(item)">申请修改</span>
						<span v-if="item.pay_status == 2 && item.status!=9" @click="telFun(item.desinger_mobile)">联系设计师</span>
            <router-link  v-if="item.status == 10" :to="'/member/delay/'+item.order_id+'/'+item.delay_reason+'/'+item.delay_memo" tag="span">延迟通知</router-link>
          </div>
				</li>
			</ul>
		</div>
		<myLoading :isLoading='isLoading' :isList = 'isList'></myLoading>
		<confirmPrompt
			@rightBtn="goFun"></confirmPrompt>
	</div>
</template>
<script>
	import { designOrder,designConfirm,designModify,designCancel,designRefund,cancelRefund } from '../../common/axios/api.js';
	import { iscrollAjax } from '../../common/public/iscroll.js';
	import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				oid     : '',
				page    : 1,
				pageSize: 15,
				type    : 1,
				items   : [],
				isLoading: true,
				isList:true,
				isData: true,
				btn      : '',
				itemObj  : '',
				goType : 1	//1.confirmAjaxFun
			}
		},
		components: {
			myLoading
		},
		methods: {
			iscroll: function() {
				iscrollAjax(() => {
					if (this.isData) {
						this.isData = false;
						this.page += 1;
						let obj    = {'type':this.type,'page':this.page,'pageSize':this.pageSize}
						this.ajaxFun(obj);
					}
				});
			},
			ajaxFun: function(obj) {
				designOrder(obj).then(data => {
					for (var i = 0; i < data.info.length; i++) {
						this.items.push(data.info[i]);
					}
					if(this.items.length==0){
					    this.isList = false;
          }else{
					    this.isList = true;
          }
					if (data.info.length < this.pageSize) {
						this.isData = false;
						this.isLoading = false;
					}else {
						this.isData = true;
						this.isLoading = true;
					}
				})
			},
			typeFun: function(n) {//导航条切换
				this.type  = n;
				this.page  = 1;
				this.items = [];
				let obj    = {'type':this.type,'page':this.page,'pageSize':this.pageSize};
				this.ajaxFun(obj);
			},
			confirmFun: function(item) {//确认
				this.itemObj = item;
				this.$store.state.publicJS.confirmPromptBtnRight = '确定';
				this.$store.state.publicJS.promptBoxMsg = '确认已完成?';
				this.goType = 1;
				this.$store.commit('confirmPrompt');
			},
			confirmAjaxFun: function() {
				let obj = {'oid':this.itemObj.order_id}
				designConfirm(obj).then(data => {
					if (data.code == 1) {
						this.itemObj.status = 7;
						this.itemObj.status_v = '已完成';
					}else {
						this.txtHide(data.message,1000);
					}
				})
			},
			modifyFun: function(item) {//申请修改
				this.itemObj = item;
				if (item.mod_count == 1) {
					this.$store.state.publicJS.confirmPromptBtnRight = '确定';
					this.$store.state.publicJS.promptBoxMsg = '最后一次修改了';
					this.goType = 2;
					this.$store.commit('confirmPrompt');
				}else if (item.mod_count == 2) {
					this.txtHide('订单已达到最大修改次数',2500);
				}else {
					this.$store.state.publicJS.confirmPromptBtnRight = '确定';
					this.$store.state.publicJS.promptBoxMsg = '最后一次修改了';
					this.goType = 2;
					this.$store.commit('confirmPrompt');
				}
			},
			modifyAjaxFun: function() {
				let obj = {'oid':this.itemObj.order_id}
				designModify(obj).then(data => {
					if (data.code == 1) {
						this.itemObj.status = 6;
						this.itemObj.status_v = '修改中';
						this.itemObj.mod_count = this.itemObj.mod_count + 1;
					}
				})
			},
			cancelFun: function(item) {	//取消订单
				this.itemObj = item;
				this.$store.state.publicJS.confirmPromptBtnRight = '确定';
				this.$store.state.publicJS.promptBoxMsg = '确认取消订单?';
				this.goType = 3;
				this.$store.commit('confirmPrompt');
			},
			cancelAjaxFun: function() {
				let obj = {'oid':this.itemObj.order_id}
				designCancel(obj).then(data => {
					if (data.code == 1) {
						this.itemObj.status = 8;
						this.itemObj.status_v = '已取消';
					}else {
						this.txtHide(data.message,1000);
					}
				})
			},
			refundFun: function(item) {//申请退款
				this.itemObj = item;
				this.$store.state.publicJS.confirmPromptBtnRight = '确定';
				this.$store.state.publicJS.promptBoxMsg = '是否确认申请退款?';
				this.goType = 4;
				this.$store.commit('confirmPrompt');

			},
			refundAjaxFun: function() {
				let obj = {'oid':this.itemObj.order_id}
				designRefund(obj).then(data => {
					if (data.code == 1) {
						this.itemObj.status = 3;
						this.itemObj.status_v = '申请退款';
					}else {
						this.txtHide(data.message,1000);
					}
				})
			},
			cancelRefundFun: function(item) {//取消退款
				this.itemObj = item;
				this.$store.state.publicJS.confirmPromptBtnRight = '确定';
				this.$store.state.publicJS.promptBoxMsg = '是否确认取消退款?';
				this.goType = 5;
				this.$store.commit('confirmPrompt');
			},
			cancelRefundAjaxFun: function() {
				let obj = {'oid':this.itemObj.order_id}
				cancelRefund(obj).then(data => {
					if (data.code == 1) {
						this.itemObj.status = 2;
						this.itemObj.status_v = '未设计';
					}else {
						this.txtHide(data.message,1000);
					}
				})
			},
			txtHide: function(str,time) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},time);
			},
			goFun: function() {
				if (this.goType == 1) {
					this.confirmAjaxFun();
				}else if (this.goType == 2) {
					this.modifyAjaxFun();
				}else if (this.goType == 3) {
					this.cancelAjaxFun();
				}else if (this.goType == 4) {
					this.refundAjaxFun()
				}else if (this.goType == 5) {
					this.cancelRefundAjaxFun();
				}
			},
			paymentFun: function(item) {
				this.$router.replace({ path: '/orderPay',query:{oid:item.order_id,'type':'design_pay','money':item.price*0.3}})
			},
			telFun: function(num) {
				window.appModel.postMessage(JSON.stringify({'funName':'tel','num':num}));
			}
		},
		created() {
			let obj = {'type':this.type,'page':this.page,'pageSize':this.pageSize}
			this.ajaxFun(obj);
			this.iscroll();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	.nav {
		.rem(height,70);
		color: #333;
		.border(border-top,2,#eee);
		background: #fff;
		overflow: hidden;
		li {
			float: left;
			width: 25%;
			.rem(height,70);
			.rem(line-height,70);
			.rem(font-size,26);
			text-align: center;
			color: #333;
			&.action {
				color: #d65317;
				.border(border-bottom,6,#d65317);
			}
		}
	}
	.list {
		li {
			width: 100%;
			.rem(margin-top,12);
			background: #fff;
			> div {
				.rem(padding-left,30);
				.rem(padding-right,30);
				.border(border-bottom,2,#eee);
				&:last-of-type {
					border-bottom: 0;
				}
			}
		}
		.top {
			.rem(height,56);
			.rem(line-height,56);
			.rem(font-size,22);
			color: #666;
			span {
				color: #d65317;
			}
		}
		.body {
			.rem(padding-bottom,8);
			.adres {
				.rem(margin-top,9);
				.rem(margin-bottom,24);
				.rem(line-height,48);
				.rem(font-size,26);
				color: #333;
			}
			.type {
				.rem(line-height;44);
				.rem(font-size,22);
				color: #999;
			}
		}
		.money {
			text-align: right;
			.rem(padding-bottom,20);
			.name {
				.rem(margin-top,15);
				.rem(line-height,26);
				.rem(font-size,26);
				color: #333;
			}
			.time {
				float: left;
				.rem(font-size,20);
				color: #999;
			}
			.num {
				.rem(margin-top,19);
				.rem(line-height,28);
				.rem(font-size,28);
				color: #d65317;
			}
		}
		.btn {
			width: 100%;
			.rem(line-height,70);
			text-align: right;
			>span,>a {
				display: inline-block;
        background: #EA7523;
				.rem(width,128);
				.rem(height,54);
				.rem(margin-left,20);
				.rem(line-height,54);
				.rem(font-size,22);
				color: #fff;
				text-align: center;
				.border-radius(10);
				vertical-align: middle;
				&:nth-child(1) {
					margin-left: 0;
				}
				a {
					display: block;
					width: 100%;
					height: 100%;
					.rem(font-size,22);
					color: #999;
				}
			}
		}
	}
	.payment {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 100%;
		background: rgba(159,160,160,.8);
	}
	.popout {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 1000;
		.rem(width,554);
		.rem(height,350);
		.border(border,2,#d65317);
		.border-radius(10);
		transform: translate(-50%,-50%);
		background: #fff;
		.top {
			position: relative;
			width: 100%;
			.rem(height,64);
			.rem(line-height,64);
			.rem(font-size,26);
			text-align: center;
			.border(border-bottom,2,#eee);
			.icon-cancel {
				position: absolute;
				.rem(top,14);
				.rem(left,10);
				.rem(width,36);
				.rem(height,36);
				background: url(./image/cancel.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.body {
			> div {
				.rem(margin-top,30);
				text-align: center;
			}
		}
		.title {
			.rem(line-height,28);
			.rem(font-size,28);
			color: #da6a3c;
		}
		.money {
			.rem(line-height,32);
			.rem(font-size,32);
			color: #da6a3c;
		}
		.mode {
			font-size: 0;
			.txt {
				display: inline-block;
				.rem(line-height,24);
				.rem(font-size,24);
				color: #333;
				vertical-align: middle;
			}
		}
		.radius {
			display: inline-block;
			.rem(padding-left,10);
			vertical-align: top;
		}
		.icon {
			display: inline-block;
			.rem(height,24);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			vertical-align: middle;
		}
		.icon-wx {
			.rem(width,84);
			background-image: url(./image/wx.png);
		}
		.icon-zfb {
			.rem(width,80);
			background-image: url(./image/zfb.png);
		}
		.icon-yl {
			.rem(width,97);
			background-image: url(./image/yl.png);
		}
		label {
			display: inline-block;
			.rem(margin-right,10);
			font-size: 0;
			&:last-of-type {
				margin-right: 0;
			}
			> div {
				position: relative;
			}
			.icon-y {
				display: inline-block;
				.rem(width,20);
				.rem(height,20);
				.rem(margin-right,14);
				background: url(./image/radio.png) no-repeat;
				background-size: 100% 100%;
				vertical-align: middle;
			}
			input {
				position: absolute;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
			input:checked + span {
				background-image: url(./image/radio_1.png);
			}
		}
		.btn {
			width: 100%;
			> span {
				display: inline-block;
				.rem(width,200);
				.rem(height,54);
				margin: 0 auto;
				.rem(line-height,54);
				.rem(font-size,24);
				color: #fff;
				.border-radius(10);
				background: #d65317;
        a{
          color: #fff;
        }
			}
		}
	}
</style>
