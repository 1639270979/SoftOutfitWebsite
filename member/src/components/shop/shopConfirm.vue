  <template>
	<div id="shopConfirm">
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
								<!--<p class="money" :class="is_vip ? 'delete' : ''"><span>¥</span>{{ item.original_price }}</p>-->
								<!--<div class="vip-price" v-if="is_vip">¥<span>{{ item.price }}</span><i></i></div>-->
							</div>
						</router-link>
					</li>
					<div class="gray-box-16"></div>
          <!--<li class="list5" >-->
            <!--<div class="border-b" style="border: 0">-->
              <!--<span class="txt" style="color: #888;font-size: 0.32rem">订单总价</span>-->
              <!--<div class="fr" style="margin-right: -0.5rem">-->
                <!--<p class="invoice-info">￥{{ cost }}</p>-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
          <!--<li class="list5">-->
            <!--<div class="border-b" style="border: 0">-->
              <!--<span class="txt" style="color: #888;font-size: 0.32rem">安装费</span>-->
              <!--<div class="fr" style="margin-right: -0.5rem">-->
                <!--<p class="invoice-info">￥{{ cost_fitting }}</p>-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
          <!--<li class="list5">-->
            <!--<div class="border-b" style="border: 0">-->
              <!--<span class="txt" style="color: #888;font-size: 0.32rem">运费</span>-->
              <!--<div class="fr" style="margin-right: -0.5rem">-->
                <!--<p class="invoice-info">￥{{ cost_freight }}</p>-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
					<!--<div class="gray-box-16"></div>-->
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
          <li class="list10" @click="isCoupon=true">
            <i class="icon-coupon"></i>
            <span class="txt">现金券</span>
            <i class="icon-right"></i>
            <span class="not-coupon discountNum" v-if="discountMoney != 0">{{ '-'+discountMoney }}</span>
            <span class="not-coupon" v-else-if="card_num == 0">没有可用的现金券</span>
            <span class="use-coupon" v-else>{{ card_num }}张可用</span>
          </li>
					<li class="list9">
						<span class="txt">备注</span>
						<input type="text" class="inp" v-model="message" placeholder="给商家留言（45字以内）" @input="limitFun(message)">
					</li>
				</ul>
			</div>
			<div class="bottom-box"></div>
			<div class="bottom iphonex-pb">
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
		<!-- 现金劵 -->
		<div class="coupon" v-show="isCoupon">
			<div class="coupon-header">
				<div class="navbar">
					<div class="back" @click="isCoupon=false"><span class="icon-back"></span></div>
					<div class="img"><img src="./image/LOGO.png"></div>
					<div class="right">
						<router-link to="/search" tag="div" class="serch-box"><span class="icon-search"></span></router-link>
					</div>
				</div>
			</div>
			<div class="notUse">不使用现金劵<div class="check" @change="notUseFun"><input type="checkbox" v-model="notCard"><i></i></div></div>
			<div class="explain"><i></i>现金券不能同时使用多张</div>
			<ul class="list">
				<li :class="list.can_use?'':'not'" v-for="list in cardList">
					<span class="icon-txt">{{ list.card_tag }}</span>
					<div class="left">
						<p class="money">¥<span>{{ list.money }}</span></p>
						<p class="condition">满{{ list.fulfil_money }}元可用</p>
					</div>
					<i class="up circular"></i>
					<i class="down circular"></i>
					<i class="line"></i>
					<div class="right">
						<p class="p1">{{ list.range_name }}</p>
						<p class="p2">不可与其他优惠叠加使用</p>
						<p class="p2">此券将于{{ list.endtime }}号失效</p>
					</div>
					<div class="check" v-if="list.can_use"><input type="radio" :value="list.id" v-model="cardId" @change="discountFun(list.money)"><i></i></div>
				</li>
			</ul>
		</div>
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
    <!-- 提示 -->
    <div class="hint" @touchmove.prevent v-if="isHint">
      <div class="make">
        <p class="tit">提示</p>
        <p class="txt">您收货地址所在城市暂无城市合伙人，如确定购买该商品，您需要另付线下物流、海关、搬运、安装的费用，费用待定，下单后由大美运营中心客服部门与您联系！</p>
        <button @click="hintFun">我知道啦</button>
      </div>
    </div>
	</div>
</template>
<script>
	import { cartConfirm,create,pay,hasPartner} from '../../common/axios/api.js';
	import addressPopup from './addressPopup.vue';
	import invoice from './invoice.vue';
	import distributionPrompt from './distributionPrompt.vue'
	export default {
		data() {
			return {
				sid       : this.$route.params.sid?this.$route.params.sid:' ',
				carts     : this.$route.params.carts,
				cid       : this.$route.params.cid,
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
				dlyWay: '',
        isHint:false,
        isSon:true,
        cost_fitting:'',
        cost_freight:'',
        cost:''
			}
		},
		components: {
			addressPopup,
			invoice,
			distributionPrompt
		},
		methods: {
			ajaxFun: function() {
				let obj = {'carts':this.carts,'sid':this.sid}
				cartConfirm(obj).then(data => {
					if (data.code == -1) {
						this.txtPromptFun(data.msg);
						setTimeout(() => {
							this.$router.go(-1);
						},1000);
						return;
					}
					this.is_vip = data.is_vip;
					this.cost_order = data.cost_order;
					this.items = data.cartGoodsList;
					this.address = data.addressList;
					this.card_num = data.card_num;
					this.cardList = data.cardList;
					this.cost = data.cost;
          this.cost_fitting = data.cost_fitting;
          this.cost_freight = data.cost_freight;
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
			hintFun:function(){
			  this.isHint=false;
        this.sinFun();
      },
			sinFun:function(){
        let aid = this.defaultAdr.address_id;
        let gid = new Object;
        let num = new Object;
        let key = 0;
        for (var i in this.items) {
          gid[key] = i / 1;
          num[key] = this.items[i].num / 1;
          key ++;
        }
        if (this.isinvoice == 2) {
          var obj = {'sid':this.sid,'gid':gid,'num':num,'aid':aid,'cid':this.cid,'dly_time':this.dlyTime,'dly_way':this.dlyWay,'is_invoice':2,'message':this.message,'card_id':this.cardId}
        }else {
          if (this.isinvoice == 1) { //普通发票
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
        create(obj).then(data => {
          if (data.code == 1) {
            let oid = data.order_id
            if (this.money == 0) {
              pay({'oid':oid}).then(data => {
                if (data.code == -1) {
                  this.txtPromptFun(data.msg);
                  return;
                }
                this.$router.replace({path:'/member/order/orderDet/'+oid});
              });
            }else {
              this.$router.push({ path: '/orderPay',query:{oid:oid,'type':'product_pay','money':this.money}})
            }
          }else {
            this.txtPromptFun(data.message);
          }
        })
      },
			createFun: function() {
				let aid = this.defaultAdr.address_id;
        if (this.dlyTime == '') {
          this.distributionFun(1);
          return;
        }else if (this.dlyWay == '') {
          this.distributionFun(2);
          return;
        }
        hasPartner({'aid':aid}).then(data=>{
          if(data.code){
            if(data.has_partner){
              this.sinFun();
            }else{
              this.isHint=true;
            }
          }else{
            this.txtPromptFun(data.message);
          }
        });
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
			},
			notUseFun: function() {
				this.cardId = '';
				this.discountMoney = 0;
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
					return '走楼梯入户'
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
			notCard: function() {
				let id = this.cardId;
				if (id != '') {
					return false;
				}else {
					return true;
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
	#shopConfirm {
		width: 100%;
	}
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
		.rem(min-height,130);
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
		.rem(padding-top,28);
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
      padding-top: 0.6rem;
			.info-title {
				width: 100%;
				.rem(font-size,28);
				color: #333;
			}
			.size {
				width: 100%;
				.rem(margin-top,10);
				.rem(font-size,22);
				color: #999;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.color {
				width: 100%;
				.rem(margin-top,10);
				.rem(font-size,22);
				color: #999;
			}
			.color-val {
				.rem(margin-right,50);
			}
			.money {
				.rem(margin-top,10);
				.rem(font-size,28);
				&.delete {
					text-decoration:line-through;
				}
				span {
					.rem(margin-right,10);
					.rem(font-size,24);
				}
			}
			.vip-price {
				.rem(margin-top,10);
				.rem(font-size,24);
				color: #ed7422;
				span {
					.rem(font-size,36);
				}
				i {
					position: relative;
					.rem(top,2);
					.rem(left,18);
					display: inline-block;
					.rem(width,108);
					.rem(height,30);
					background: url(image/vip_price.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
	}
	.gray-box-16 {
		width: 100%;
		.rem(height,16);
		background-color: #eee;
	}
	.list10 {
		position: relative;
		width: 100%;
		.rem(height,92);
		.rem(line-height,90);
		.border(border-bottom,2,#eee);
		.icon-coupon {
			position: absolute;
			.rem(top,32);
			.rem(left,28);
			.rem(width,37);
			.rem(height,26);
			background: url(./image/coupon.png) no-repeat;
			background-size: 100% 100%;
		}
		.txt {
			.rem(margin-left,50);
			.rem(font-size,28);
			color: #ed7422;
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
		.not-coupon {
			position: absolute;
			top: 0;
			.rem(right,60);
			.rem(line-height,90);
			.rem(font-size,22);
			color: #999;
		}
		.discountNum {
			color: #ed7422;
		}
		.use-coupon {
			position: absolute;
			.rem(top,20);
			.rem(right,60);
			.rem(width,128);
			.rem(height,40);
			.rem(line-height,40);
			.rem(font-size,22);
			color: #fff;
			text-align: center;
			.border-radius(10);
			background: -webkit-linear-gradient(left,#ff9000,#ffae45,#ffb04a);
		}
	}
	.list4 {
		border: 0;
		.border-b {
			.rem(height,92);
			.border(border-bottom,2,#eee);
		}
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
	.coupon {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1500;
		width: 100%;
		min-height: 100%;
		background: #eee;
		.coupon-header {
			.navbar {
				position: relative;
				width: 100%;
				height: 44px;
				background: #fff;
				> div {
					height: 100%;
				}
				.back {
					position: absolute;
					display: flex;
					width: 41px;
					height: 44px;
					align-items: center;
					justify-content: center;
					.icon-back {
						display: inline-block;
						width: 11px;
						height: 19px;
						background: url(./image/back.png) no-repeat;
						background-size: 100% 100%;
					}
				}
				.img {
					float: left;
					margin-left: 12px;
					padding-left: 60px;
					line-height: 44px;
					img {
						display: inline-block;
						width: 102px;
						vertical-align: middle;
					}
				}
				.right {
					position: absolute;
					right: 0;
					top: 0;
					> div {
						float: right;
					}
				}
				.serch-box,.set {
					display: flex;
					width: 39px;
					height: 100%;
					align-items: center;
					justify-content: center;
				}
				.icon-search {
					display: inline-block;
					width: 17px;
					height: 17px;
					background: url(./image/search.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.notUse {
			position: relative;
			width: 100%;
			.rem(height,88);
			.rem(padding-left,38);
			.rem(padding-right,30);
			.rem(line-height,88);
			.rem(font-size,28);
			background: #fff;
			.check {
				position: absolute;
				top: 0;
				right: 0;
				z-index: 5;
				.rem(width,88);
				.rem(height,88);
				.rem(line-height,88);
				text-align: center;
				input {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 5;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
				i {
					display: inline-block;
					.rem(width,30);
					.rem(height,30);
					background: url(./image/check_1.png) no-repeat;
					background-size: 100% 100%;
				}
				input:checked + i {
					background-image: url(./image/check.png);
				}
			}
		}
		.explain {
			position: relative;
			width: 100%;
			.rem(height,72);
			.rem(padding-left,72);
			.rem(line-height,72);
			.rem(font-size,22);
			color: #999;
			i {
				position: absolute;
				.rem(top,21);
				.rem(left,30);
				.rem(width,28);
				.rem(height,29);
				background: url(./image/explain.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.list {
			li {
				position: relative;
				.rem(width,680);
				.rem(height,224);
				margin: 0 auto;
				.rem(margin-bottom,18);
				background: #fff;
			}
			.icon-txt {
				position: absolute;
				.rem(top,15);
				.rem(width,88);
				.rem(height,32);
				.rem(line-height,33);
				.rem(font-size,22);
				text-align: center;
				color: #fff;
				background: url(./image/vip_13.png) no-repeat;
				background-size: 100% 100%;
			}
			.left {
				float: left;
				.rem(width,204);
				.rem(height,224);
				.rem(padding-top,60);
				.rem(padding-left,27);
				color: #ed7631;
				.money {
					.rem(font-size,28);
					span {
						.rem(font-size,72);
						letter-spacing: -3px;
					}
				}
				.condition {
					.rem(font-size,24);
				}
			}
			.circular {
				position: absolute;
				.rem(left,185);
				z-index: 5;
				.rem(width,38);
				.rem(height,38);
				border-radius: 50%;
				background: #eee;
			}
			.up {
				.rem(top,-19);
			}
			.down {
				.rem(bottom,-19);
			}
			.line {
				position: absolute;
				.rem(top,43);
				.rem(left,203);
				width: 1px;
				.rem(height,142);
				background: url(./image/vip_1.jpg) no-repeat;
				background-size: 100% 100%;
			}
			.right {
				width: 100%;
				.rem(padding-top,49);
				.rem(padding-left,240);
				.p1 {
					.rem(height,75);
					.rem(font-size,28);
					.rem(margin-bottom,10);
				}
				.p2 {
					.rem(margin-bottom,10);
					.rem(font-size,22);
					color: #999;
				}
			}
			.check {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				input {
					position: absolute;
					z-index: 5;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
				i {
					position: absolute;
					.rem(top,99);
					.rem(right,24);
					z-index: 1;
					.rem(width,30);
					.rem(height,30);
					background: url(./image/check_1.png) no-repeat;
					background-size: 100% 100%;
				}
				input:checked + i {
					background-image: url(./image/check.png);
				}
			}
			.not {
				background: #f8f8f8;
			}
		}
	}
  .hint{
    position: fixed;
    top: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background:rgba(1,1,1,0.2);
    .make{
      position: relative;
      background: #fff;
      margin: auto;
      margin-top: 4.79rem;
      width:8.08rem;
      height:7.68rem;
      border-radius: 0.5rem;
      .tit{
        width: 100%;
        text-align: center;
        font-size: 0.48rem;
        font-weight: bold;
        padding-top: 0.83rem;
        padding-bottom: 0.38rem;
      }
      .txt{
        width: 100%;
        padding-left: 0.67rem;
        padding-right: 0.5rem;
        text-align: left;
        font-size:0.43rem;
        line-height:0.77rem;
      }
      button{
        width: 100%;
        height:1.36rem;
        position: absolute;
        bottom: 0;
        border: 0;
        outline: none;
        background: #D55317;
        color: #fff;
        font-size: 0.4rem;
        border-bottom-right-radius:0.5rem ;
        border-bottom-left-radius: 0.5rem;
      }
    }
  }
</style>
