<template>
	<div id="changeGoodsDet">
		<div class="top">退换详情</div>
		<div class="order">
			<div class="orderDet">
				<p class="fl">订单编号：<span>{{ oid }}</span></p>
				<p class="fr">申请时间：<span>{{ items.addtime }}</span></p>
			</div>
			<div class="orderStatus">
				<p class="status">{{ items.status == 1?'未审核':(items.status == 2?'审核通过':(items.status == 3?'已发件':(items.status == 4?'不通过':'')))}}</p>
				<p class="txt" v-if="items.service_mode == 1 && items.status == 2">大美屋将在3日内上门取件</p>
			</div>
		</div>
		<div class="refunds-mode" v-if="items.status == 2">
			<p class="mode">商品退回方式</p>
			<span>{{items.service_mode == 1?'上门取件':'客户邮寄'}}</span>
			<p class="txt" v-if="items.service_mode == 1">大美屋将在1-3个工作日内上门取回商品</p>
		</div>
		<div class="mail" v-if="items.service_mode == 2 && items.status == 2">
			<div><span>物流单号：</span><input type="text" placeholder="物流单号" v-model.trim="express_no"></div>
			<div><span>物流公司：</span><input type="text" placeholder="物流公司" v-model.trim="express_name"></div>
		</div>
		<div class="content">
			<p class="title">问题描述</p>
			<p class="txt">{{ items.content }}</p>
		</div>
		<div class="btn">
			<span v-if="items.status == 1" @click="cancelFun">取消申请</span>
			<span class="confirm" @click="confirmFun" v-if="items.service_mode == 2 && items.status == 2">提交</span>
		</div>
	</div>
</template>
<script>
	import { serviceDetail,deliver,cancelService } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				oid         : this.$route.params.Oid,
				iid         : this.$route.params.Iid,
				items       : {},
				express_no  : '',
				express_name: ''
			}
		},
		methods: {
			ajaxFun: function() {
				serviceDetail({'item_id':this.iid}).then(data => {
					if (data.code == 1) {
						this.items = data.info;
					}
				})
			},
			confirmFun: function() {
				if (!(/\S/.test(this.express_no))) {
					this.txtShowFun('物流单号不能为空');
					return;
				}else if (!(/\S/.test(this.express_name))) {
					this.txtShowFun('物流公司不能为空')
					return;
				}
				let obj = {'sid':this.items.service_id,'express_no':this.express_no,'express_name':this.express_name}
				deliver(obj).then(data => {
					if (data.code == 1) {
						this.$store.state.publicJS.promptBoxMsg = data.msg;
						this.$store.commit('txtPrompt');
						setTimeout(() => {
							this.$store.commit('txtPrompt');
							this.$router.go(-1);
						},1000);
					}else {
						this.txtShowFun(data.msg);
					}
				})
			},
			cancelFun: function() {
				cancelService({'sid':this.items.service_id}).then(data => {
					if (data.code == 1) {
						this.$store.state.publicJS.promptBoxMsg = data.msg;
						this.$store.commit('txtPrompt');
						setTimeout(() => {
							this.$store.commit('txtPrompt');
							this.$router.go(-1);
						},1000);
					}else {
						this.txtShowFun(data.msg);
					}
				})
			},
			txtShowFun: function(str) {
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
	@import '../../assets/mixin.less';
	.top {
		.rem(margin-top,2);
		.rem(height,68);
		.rem(line-height,68);
		.rem(font-size,26);
		color: #333;
		text-align: center;
		background: #fff;
	}
	.order {
		.rem(margin-top,6);
		background: #fff;
	}
	.orderDet {
		.rem(padding-left,25);
		.rem(padding-right,25);
		.rem(line-height,70);
		.border(border-bottom,2,#eee);
		overflow: hidden;
		p {
			.rem(font-size,22);
			color: #333;
			span {
				color: #999;
			}
		}
	}
	.orderStatus {
		.rem(padding-top,38);
		.rem(padding-bottom,20);
		.rem(margin-bottom,17);
		.status {
			width: 100%;
			.rem(line-height,36);
			.rem(font-size,36);
			text-align: center;
			color: #ef6f03;
		}
		.txt {
			.rem(margin-top,44);
			.rem(padding-left,24);
			.rem(font-size,22);
			color: #333;
		}
	}
	.refunds-mode {
		width: 100%;
		margin-bottom: 7px;
		.rem(padding-left,30);
		.rem(padding-right,30);
		.rem(padding-bottom,20);
		font-size: 0;
		background: #fff;
		.mode {
			width: 100%;
			height: 37px;
			line-height: 37px;
			font-size: 13px;
		}
		span {
			display: inline-block;
			width: 69px;
			height: 27px;
			line-height: 27px;
			font-size: 13px;
			color: #fff;
			text-align: center;
			.border-radius(10);
			background: #d65317;
		}
		.txt {
			margin-top: 11.5px;
			padding-bottom: 12.5px;
			line-height: 11px;
			font-size: 11px;
			color: #999;
		}
	}
	.mail {
		.rem(margin-bottom,17);
		.rem(padding-left,25);
		.rem(padding-right,25);
		.rem(padding-bottom,20);
		background: #fff;
		> div {
			.rem(font-size,24);
			.rem(padding-top,20);
			input {
				.rem(height,32);
				border: 0;
				padding: 0;
				.rem(font-size,22);
				outline: none;
			}
		}
	}
	.content {
		width: 100%;
		.rem(padding-top,28);
		.rem(padding-bottom,28);
		.rem(padding-left,26);
		.rem(padding-right,44);
		background: #fff;
		.title {
			.rem(margin-bottom,27);
			.rem(line-height,26);
			.rem(font-size,26);
		}
		.txt {
			.rem(line-height,39);
			.rem(font-size,22);
			color: #666;
		}
	}
	.btn {
		width: 100%;
		.rem(margin-top,30);
		text-align: center;
		font-size: 0;
		span {
			display: inline-block;
			.rem(width,238);
			.rem(height,60);
			.rem(line-height,60);
			.rem(font-size,26);
			color: #fff;
			.border-radius(10);
			background: #ef6f03;
		}
		.confirm {
			.rem(margin-left,20);
		}
	}
</style>
