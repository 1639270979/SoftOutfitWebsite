<template>
	<div id="seckillShopConfirm">
		<div class="shopConfirm-box" v-show="!isCoupon">
			<p class="title">确认订单</p>
			<div class="list">
				<ul>
					<li class="list1"><span class="txt">收货信息</span></li>
					<li class="list2">
						<div class="icon" v-if="address == ''" @click="addressFun"><span class="icon-add"></span></div>
						<div class="info" v-else @click="addressFun">
							<div>
								<span class="fl">收货人：{{defaultAdr.recevier}}</span>
								<span class="fr">联系电话：{{defaultAdr.mobile}}</span>
							</div>
							<div>
								<p>收货地址：{{defaultAdr.address}}</p>
							</div>
							<span class="icon-right"></span>
						</div>
					</li>
					<li class="list3" v-for="(item,index) in items">
						<router-link :to="{name:'商品详情',params:{pid:item.product_id}}">
							<div class="img">
								<img v-lazy="item.picture">
							</div>
							<div class="info">
								<p class="info-title">{{item.goods_name}}</p>
								<p class="size">尺寸：{{item.size}}</p>
								<p class="color"><span class="color-val" v-if="item.spec_name !== null">{{item.spec_name}}：{{item.text}}</span><span>数量：{{item.num}} 件</span></p>
								<p class="money"><span>¥</span>{{item.price}}</p>
							</div>
						</router-link>
					</li>
					<div class="gray-box-16"></div>
					<li class="list5" @click="distributionFun(1)">
						<div class="border-b">
							<span class="txt">配送时间</span>
							<div class="fr">
								<p class="invoice-info">{{ dlyTimeStr }}</p>
								<i class="icon-right"></i>
							</div>
						</div>
					</li>
					<li class="list5" @click="distributionFun(2)">
						<div class="border-b">
							<span class="txt">配送方式</span>
							<div class="fr">
								<p class="invoice-info">{{ dlyWalStr }}</p>
								<i class="icon-right"></i>
							</div>
						</div>
					</li>
					<li class="list5" @click="isInvoice=true">
						<div class="border-b">
							<span class="txt">发票信息</span>
							<div class="fr">
								<p class="invoice-info"><span class="span">{{ invoiceTypeName }}</span>　{{ isinvoice != 2 ? invoiceInfoName : ''}}</p>
								<i class="icon-right"></i>
							</div>
						</div>
					</li>
					<li class="list9">
						<span class="txt">备注</span>
						<input type="text" class="inp" v-model="message" placeholder="给商家留言（45字以内）" @input="limitFun(message)">
					</li>
				</ul>
			</div>
			<div class="bottom-box"></div>
			<div class="bottom">
				<div class="fr">
					<div class="box">
						<p class="sum">总计(含运费)：</p>
						<p class="money">¥<span>{{ money }}</span></p>
					</div>
					<div class="btn" @click="createFun">立即结算</div>
				</div>
			</div>
		</div>
		<!-- 收货信息 -->
		<addressPopup
			:isShowAdre="isShowAdre"
			@update:isShowAdre="val => isShowAdre = val"
			:address="address"
			@update:address="val => address = val"></addressPopup>
		<!-- 发票信息 -->
		<invoice
			:isInvoice="isInvoice"
			@update:isInvoice="val => isInvoice = val"
			:isinvoice="isinvoice"
			@update:isinvoice="val => isinvoice = val"
			:invoiceType="invoiceType"
			@update:invoiceType="val => invoiceType = val"
			:invoice_title="invoice_title"
			@update:invoice_title="val => invoice_title = val"
			:duty_num="duty_num"
			@update:duty_num="val => duty_num = val"
			:invoice_mobile="invoice_mobile"
			@update:invoice_mobile="val => invoice_mobile = val"
			:invoice_email="invoice_email"
			@update:invoice_email="val => invoice_email = val"
			:invoice_content="invoice_content"
			@update:invoice_content="val => invoice_content = val"></invoice>
		<!-- 配送弹层 -->
		<distribution-prompt
			:isDistribution="isDistribution"
			@update:isDistribution="val => isDistribution = val"
			:distributionType="distributionType"
			:dlyTime="dlyTime"
			@update:dlyTime="val => dlyTime = val"
			:dlyWay="dlyWay"
			@update:dlyWay="val => dlyWay = val"></distribution-prompt>
	</div>
</template>
<script>
	import { seckillConfirm,seckillCreate } from '../../common/axios/api.js';
	import addressPopup from './addressPopup.vue';
	import invoice from './invoice.vue';
	import distributionPrompt from './distributionPrompt.vue'
	export default {
		data() {
			return {
				carts     : this.$route.params.carts,
				address   : [],
				items     : {},
				cost_order: '',
				isinvoice : 2,		//2不开发票1开发票3电子发票
				invoiceType: 1,		//1个人2企业
				isShowAdre : false,	//选择地址是否显示
				invoice_title :'',	//发票抬头
				duty_num      : '',	//税号
				message       : '',
				isCoupon      : false,	//显示隐藏
				card_num      : 0,		//优惠券可用数量
				cardList      : [],
				cardId        : 0,		//优惠券id
				discountMoney : 0,		//优惠多少钱
				is_vip: false,
				isInvoice: false,
				invoice_mobile: '',	//收票人手机
				invoice_email: '',	//收票人邮箱
				invoice_content: 1,	//1商品明细，2商品类型
				isDistribution: false, 	//显示配送方式
				distributionType: 1, 	//1 配送时间，2配送方式
				dlyTime: '',
				dlyWay: ''
			}
		},
		components: {
			addressPopup,
			invoice,
			distributionPrompt
		},
		methods: {
			ajaxFun: function() {
				seckillConfirm(this.carts).then(data => {
					this.cost_order = data.cost_order;
					this.items = data.cartGoodsList;
					this.address = data.addressList;
					this.card_num = data.card_num;
					this.cardList = data.cardList;
				})
			},
			addressFun: function() {
				this.isShowAdre = true;
			},
			limitFun: function(str) {
				if (str.length > 44) {
					this.message = str.slice(0,45);
				}
			},
			distributionFun: function(n) {
				this.isDistribution = true;
				this.distributionType = n;
			},
			invoiceFun: function(n) {
				this.isinvoice = n;
			},
			invoiceTypeFun: function(n) {
				this.invoiceType = n;
			},
			createFun: function() {
				let aid = this.defaultAdr.address_id;
				let gid = new Object;
				let num = new Object;
				let key = 0;
				if (this.dlyTime == '') {
					this.distributionFun(1);
					return;
				}else if (this.dlyWay == '') {
					this.distributionFun(2);
					return;
				}
				for (var i in this.items) {
					gid[key] = i / 1;
					num[key] = this.items[i].num / 1;
					key ++;
				}
				if (this.isinvoice == 2) {
					var obj = {'sid':this.sid,'gid':gid,'num':num,'aid':aid,'cid':this.cid,'dly_time':this.dlyTime,'dly_way':this.dlyWay,'is_invoice':2,'message':this.message,'card_id':this.cardId}
				}else {
					if (this.invoiceType == 1) { //普通发票
						if (this.invoiceType == 1) {
							var obj = {'gid':gid,'num':num,'aid':aid,'cid':this.cid,'dly_time':this.dlyTime,'dly_way':this.dlyWay,'is_invoice':this.isinvoice,'title_type':this.invoiceType,'invoice_title':this.invoice_title,'invoice_content':this.invoice_content,'message':this.message,'card_id':this.cardId}
						}else {
							var obj = {'sid':this.sid,'gid':gid,'num':num,'aid':aid,'cid':this.cid,'dly_time':this.dlyTime,'dly_way':this.dlyWay,'is_invoice':this.isinvoice,'title_type':this.invoiceType,'invoice_title':this.invoice_title,'duty_num':this.duty_num,'invoice_content':this.invoice_content,'message':this.message,'card_id':this.cardId}
						}
					}else {	//电子发票
						if (this.invoiceType == 1) {
							var obj = {'gid':gid,'num':num,'aid':aid,'cid':this.cid,'dly_time':this.dlyTime,'dly_way':this.dlyWay,'is_invoice':this.isinvoice,'title_type':this.invoiceType,'invoice_title':this.invoice_title,'invoice_mobile':this.invoice_mobile,'invoice_email':this.invoice_email,'invoice_content':this.invoice_content,'message':this.message,'card_id':this.cardId}
						}else {
							var obj = {'sid':this.sid,'gid':gid,'num':num,'aid':aid,'cid':this.cid,'dly_time':this.dlyTime,'dly_way':this.dlyWay,'is_invoice':this.isinvoice,'title_type':this.invoiceType,'invoice_title':this.invoice_title,'invoice_mobile':this.invoice_mobile,'invoice_email':this.invoice_email,'duty_num':this.duty_num,'invoice_content':this.invoice_content,'message':this.message,'card_id':this.cardId}
						}
					}
				}
				seckillCreate(obj).then(data => {
          if (data.code == 1) {
//						this.$router.push({path:'/orderPay/'+data.order_id+'/'+'product_pay'+'/'+this.cost_order});
						  this.$router.push({ path: '/orderPay',query:{oid:data.order_id,'type':'product_pay','money':this.money}})
          }else {
//						this.txtPromptFun(data.message);
            this.txtPromptFun('商品库存不足');
					}
				})
			},
			txtPromptFun: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1000);
			},
			discountFun: function(m) {
				this.discountMoney = m / 1;
				this.isCoupon = false;
			}
		},
		computed: {
			defaultAdr: function() {
				let obj = {};
				let arr = this.address;
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].isdefault == 1) {
						obj = arr[i];
					}
				}
				return obj;
			},
			dlyTimeStr: function() {
				if (this.dlyTime == 1) {
					return '不限'
				}else if (this.dlyTime == 2) {
					return '周一至周五'
				}else if (this.dlyTime == 3) {
					return '仅限周末'
				}else {
					return ''
				}
			},
			dlyWalStr: function() {
				if (this.dlyWay == 1) {
					return '电梯送货入户'
				}else if (this.dlyWay == 2) {
					return '太楼梯入户'
				}else if (this.dlyWay == 3) {
					return '送到楼下'
				}else if (this.dlyWay == 4) {
					return '自行提取'
				}else {
					return ''
				}
			},
			invoiceTypeName: function() {
				let isinvoice = this.isinvoice;
				if (isinvoice == 1) {
					return '普通'
				}else if(isinvoice == 3) {
					return '电子'
				}else {
					return '不需要'
				}
			},
			invoiceInfoName: function() {
				let invoiceType = this.invoiceType;
				let invoice_content = this.invoice_content;
				if (invoiceType == 1) {
					if (invoice_content == 1) {
						return '(商品明细-个人)'
					}else {
						return '(商品明细-个人)'
					}
				}else {
					if (invoice_content == 1) {
						return '(商品明细-企业)'
					}else {
						return '(商品明细-企业)'
					}
				}
			},
			money: function() {
				let money = this.cost_order - this.discountMoney;
				return money.toFixed(2) < 0 ? 0 : money.toFixed(2) / 1;
			}
		},
		created() {
			this.ajaxFun();
		},
		mounted() {
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#seckillShopConfirm {
		width: 100%;
		.title {
			width: 100%;
			.rem(height,72);
			.rem(line-height,70);
			.rem(font-size,32);
			color: #333;
			text-align: center;
			.border(border-bottom,2,#eee);
			background: #fff;
		}
		.list {
			.rem(padding-bottom,93);
			li[class^='list'] {
				width: 100%;
				.rem(padding-left,32);
				.rem(padding-right,32);
				background: #fff;
				overflow: hidden;
			}
		}
		.list1,.list4,.list5,.list8 {
			.rem(height,92);
			.rem(line-height,90);
			.border(border-bottom,2,#eee);
			.txt {
				.rem(font-size,28);
				color: #ed7422;
			}
		}
		.list1 {
			border-bottom: 0;
		}
		.list2 {
			.rem(height,130);
			font-size: 0;
			.border(border-bottom,2,#eee);
			.icon {
				height: 100%;
				.rem(line-height,100);
				text-align: center;
				.icon-add {
					display: inline-block;
					.rem(width,97);
					.rem(height,90);
					background: url(./image/add_1.png) no-repeat;
					background-size: 100% 100%;
					vertical-align: middle;
				}
			}
			.info {
				position: relative;
				.rem(padding-right,78);
				.rem(padding-top,25);
				.rem(padding-bottom,26);
				font-size: 0;
				> div {
					.rem(margin-bottom,31);
					.rem(line-height,30);
					.rem(font-size,24);
					color: #333;
					overflow: hidden;
					&:last-of-type {
						margin-bottom: 0;
					}
					p {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				.icon-right {
					position: absolute;
					.rem(top,50);
					right: 0;
					.rem(width,16);
					.rem(height,28);
					background: url(./image/right.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.list3 {
			.rem(padding-top,18);
			.rem(padding-bottom,28);
			.border(border-bottom,2,#eee);
			background: #fff;
			.img {
				float: left;
				.rem(width,220);
				.rem(height,220);
				overflow: hidden;
				img {
					width: 100%;
					.rem(min-height,220);
				}
			}
			.info {
				width: 100%;
				.rem(padding-left,250);
				.info-title {
					width: 100%;
					.rem(line-height,44);
					.rem(font-size,28);
					color: #333;
				}
				.size {
					width: 100%;
					.rem(margin-top,20);
					.rem(font-size,22);
					color: #999;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.color {
					width: 100%;
					.rem(margin-top,20);
					.rem(font-size,22);
					color: #999;
				}
				.color-val {
					.rem(margin-right,50);
				}
				.money {
					.rem(margin-top,20);
					.rem(font-size,36);
					color: #ed7422;
					span {
						.rem(margin-right,10);
						.rem(font-size,24);
					}
				}
			}
		}
		.gray-box-16 {
			width: 100%;
			.rem(height,16);
			background-color: #eee;
		}
		.list4 {
			.fr {
				.rem(font-size,24);
			}
		}
		.list5 {
			position: relative;
			border: 0;
			.border-b {
				.rem(height,92);
				.rem(padding-right,30);
				.border(border-bottom,2,#eee);
			}
			.invoice-info {
				float: right;
				.rem(height,92);
				.rem(font-size,22);
				color: #999;
				.span {
					color: #ed7631;
				}
			}
			.icon-right {
				position: absolute;
				.rem(top,33);
				.rem(right,24);
				.rem(width,14);
				.rem(height,24);
				background: url(./image/right.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.list8 {
			.radius {
				display: inline-block;
				.rem(padding-left,45);
				vertical-align: top;
			}
			.icon {
				display: inline-block;
				height: 14px;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				vertical-align: middle;
			}
			.icon-wx {
				width: 49px;
				background-image: url(./image/wx.png);
			}
			.icon-zfb {
				width: 47px;
				background-image: url(./image/zfb.png);
			}
			.icon-yl {
				width: 56.5px;
				background-image: url(./image/yl.png);
			}
			label {
				display: inline-block;
				margin-right: 5px;
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
		}
		.list9 {
			width: 100%;
			.rem(height,90);
			overflow: hidden;
			.txt {
				float: left;
				.rem(width,130);
				.rem(line-height,90);
				.rem(font-size,28);
				color: #ed7422;
			}
			.inp {
				float: left;
				width: 80%;
				.rem(height,90);
				.rem(font-size,24);
				color: #999;
				outline: none;
				border: 0;
			}
		}
		.bottom-box {
			width: 100%;
			.rem(height,98);
		}
		.bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 50;
			width: 100%;
			.rem(height,98);
			box-shadow: 0 1px 6px #eee;
			background: #fff;
			.btn {
				float: right;
				.rem(width,188);
				.rem(height,98);
				.rem(line-height,98);
				.rem(font-size,28);
				color: #fff;
				text-align: center;
				background: #ed7631;
			}
			.box {
				float: left;
				.rem(margin-right,14);
				text-align: right;
				.sum {
					.rem(line-height,50);
					.rem(font-size,24);
				}
				.money {
					.rem(line-height,36);
					.rem(font-size,32);
					color: #ed7631;
				}
			}
		}
	}
</style>
