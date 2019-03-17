<template>
	<div id="cart">
		<p class="title">我的购物车</p>
		<div class="cart-goods" v-if="Object.keys(cartGoodsList).length != 0">
			<ul>
				<li class="shop-goods" v-for="(cartList,cartKey) in cartGoodsList" v-if="cartList.length != 0">
					<div class="shop-name">
						<div class="shop-check">
							<input type="checkbox" v-model="shopCheck[cartKey]"  @change="shopCheckFun(cartKey)">
							<span></span>
						</div>
						<router-link :to="'/index/shop/det/brand/'+cartKey" tag="div" class="name">{{ cartList[0].brand_name }}</router-link>
					</div>
					<ul class="goods-list">
						<li v-for="goodsList in cartList">
							<div class="seckill" v-if="goodsList.seckill_id > 0"><span>大美秒杀</span>限时特惠，立即抢购</div>
							<router-link :to="{name:'商品详情',params:{pid:goodsList.product_id}}" tag="div" class="goods-box">
								<div class="img-box">
									<div class="img"><img :src="goodsList.picture" ><span v-if="goodsList.seckill_id > 0">仅剩{{ goodsList.store }}件</span></div>
								</div>
                <!--是vip-->
                <div class="goods-info" v-if="is_vip">
                  <p class="name">{{ goodsList.goods_name }}</p>
                  <p class="money" v-if="goodsList.seckill_id > 0">秒杀价<i class="iconfont icon-jine">{{ goodsList.seckill_price }}</i></p>
                  <p :class="goodsList.seckill_id > 0?'bfprice1':'bfprice'"> <i class="iconfont icon-jine">{{ goodsList.vip_price }}</i></p>
                </div>
                <!--不是vip-->
								<div class="goods-info" v-else>
									<p class="name">{{ goodsList.goods_name }}</p>
                  <p class="money" v-if="goodsList.seckill_id > 0">秒杀价<i class="iconfont icon-jine">{{ goodsList.seckill_price }}</i></p>
                  <p :class="goodsList.seckill_id > 0?'bfprice1':'bfprice'"><i class="iconfont icon-jine">{{ goodsList.price }}</i></p>
								</div>

							</router-link>
							<div class="goods-check" v-if="goodsList.is_show == 'Y'">
								<input type="checkbox" :value="goodsList.goods_id" v-model="goodsCheck[cartKey]">
								<span></span>
							</div>
							<div class="delete" @click="deleteFun(goodsList.goods_id)"><i></i></div>
							<div class="number">
								<span class="del" @click="delFun(goodsList)"></span>
								<span class="add" @click="addFun(goodsList)"></span>
								<span class="num">{{ goodsList.num }}</span>
							</div>
							<div class="soldOut" v-if="goodsList.is_show == 'N'"><img src="./image/soldOut1.png"></div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="bottom-box"></div>
		<div class="bottom iphonex-pb">
			<div class="check">
				<input type="checkbox" v-model="allCheck" @change="allCheckFun()"/>
				<span></span>
				<div class="txt">全选</div>
			</div>
			<div class="fr">
				<div class="box">
					<p class="sum">总计(含运费)：</p>
					<p class="money">¥<span>{{ money.toFixed(2) }}</span></p>
				</div>
				<div class="btn" @click="cartConfirmFun()">立即结算</div>
			</div>
		</div>
		<div class="cart-layer" v-if="isLayer">
			<div class="popout">
				<div class="top-title">请分开结算以下商品</div>
				<ul class="layer-main">
					<li>
						<div class="check">
							<input type="radio" value="1" v-model="type">
							<span></span>
						</div>
						<div class="content">
							<p class="content-title">大美秒杀商品</p>
							<div>( 标有 <span>大美秒杀</span> 的商品 	)</div>
							<span class="num">{{ seckillGoodsArr.length }}件</span>
						</div>
					</li>
					<li>
						<div class="check">
							<input type="radio" value="2" v-model="type">
							<span></span>
						</div>
						<div class="content">
							<p class="content-title">其它商品</p>
							<span class="num">{{ GoodsArr.length }}件</span>
						</div>
					</li>
				</ul>
				<div class="layer-btn">
					<span class="back-cart" @click="isLayer = false">返回购物车</span>
					<span @click="submitFun">去结算</span>
				</div>
			</div>
		</div>
		<confirmPrompt @rightBtn="delAjaxFun"></confirmPrompt>
	</div>
</template>
<script>
	import { cart,cartConfirm,cartDel } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				cartGoodsList : {},
				goodsCheck    : {},
				gid           : '',
				isDelShop     : false,
				isLayer       : false,
				is_vip        : '',
				seckillGoodsArr: [],	//秒杀商品结算数组
				GoodsArr      : [],		//其它商品结算数组
				type          : 1,
			}
		},
		methods: {
			ajaxFun: function() {
				cart().then(data => {
					this.cartGoodsList = data.cartGoodsList;
					this.is_vip = data.is_vip;
					for (var key in data.cartGoodsList) {
						this.$set(this.goodsCheck,key,[]);
						data.cartGoodsList[key].map((val) => {
							if (val.is_show == 'Y') {
								this.goodsCheck[key].push(val.goods_id);	//商品选中
							}
						});
					};
					this.$store.state.publicJS.pageLoadShow = false;
				})
			},
			shopCheckFun: function(id) {	//点击店铺选框全选
				if (this.goodsCheck[id].length == this.showGoogsCheck[id].length) {	//已选的商品是否等于总数量
					this.goodsCheck[id] = [];
				}else {
					this.goodsCheck[id] = [];
					this.showGoogsCheck[id].map((val) => {
						this.goodsCheck[id].push(val.goods_id);
					});
				}
			},
			deleteFun: function(gid) {		//删除商品
				this.gid = gid;
				this.$store.state.publicJS.confirmPromptBtnRight = '删除';
				this.$store.state.publicJS.promptBoxMsg = '是否删除该商品';
				this.$store.commit('confirmPrompt');
			},
			delAjaxFun: function() {		//确认删除执行的请求
				let obj = {'gid':this.gid};
				cartDel(obj).then(data => {
					if (data.code == 1) {
						let newCartGoodsList = {};
						let oldCartGoodsList = this.cartGoodsList;
						let newGoodsCheck = {};
						let oldGoodsCheck = this.goodsCheck;
						for (var key in oldCartGoodsList) {
							newCartGoodsList[key] = [];
							oldCartGoodsList[key].map((val) => {	//删除列表的
								if (val.goods_id != this.gid) {
									newCartGoodsList[key].push(val);
								};
							});
							newGoodsCheck[key] = [];
							oldGoodsCheck[key].map((val) => {	//删除选中的
								if (val != this.gid) {
									newGoodsCheck[key].push(val);
								}
							});
						}
						this.cartGoodsList = newCartGoodsList;
						this.goodsCheck = newGoodsCheck;
					}
				})
			},
			delFun: function(item) {
				if (item.num > 1) {
					item.num --;
					return
				}
				this.txtFun('商品数量不能小于1');
			},
			addFun: function(item) {
				if (item.num / 1 < item.store / 1) {
					item.num ++;
					return
				}
				this.txtFun(`该商品库存只剩${item.store}件`);
			},
			txtFun: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1500);
			},
			allCheckFun: function() {
				let isSelect = true;
				for (var key in this.cartGoodsList) {
					if (!this.shopCheck[key]) {
						isSelect = false;
						break;
					}
				};
				if (isSelect) {
					for (var key in this.cartGoodsList) {
						this.goodsCheck[key] = [];
					};
				}else {
					for (var key in this.cartGoodsList) {
						this.goodsCheck[key] = [];
						this.showGoogsCheck[key].map((val) => {
							this.goodsCheck[key].push(val.goods_id)
						});
					};
				}
			},
			cartConfirmFun: function() {	//立即结算
				let isConfirm = true;
				this.seckillGoodsArr = [];
				this.GoodsArr = [];
				for (var key in this.cartGoodsList) {
					for (var i = 0; i < this.cartGoodsList[key].length; i++) {
						let cartGoods = this.cartGoodsList[key][i];
						if (this.goodsCheck[key].indexOf(cartGoods.goods_id) > -1) {
							if (cartGoods.num > cartGoods.store) {
								this.$store.state.publicJS.promptBoxMsg = `${cartGoods.goods_name}库存不够`;
								this.$store.dispatch('alertPrompt');
								isConfirm = false;
								return false;
							}
							if (cartGoods.seckill_id > 0) {	//秒杀商品
								this.seckillGoodsArr.push(cartGoods.goods_id+'|'+cartGoods.num);
							}else {		//其它商品
								this.GoodsArr.push(cartGoods.goods_id+'|'+cartGoods.num);
							}
						}
					}
				};
				let arrStr;
				if (isConfirm) {
					if (this.seckillGoodsArr.length > 0 && this.GoodsArr.length > 0) {
						if (this.seckillGoodsArr.length > 0) {
							arrStr = this.seckillGoodsArr;
						}else {
							arrStr = this.GoodsArr;
						}
						this.isLayer = true;
					}else {
						if (this.seckillGoodsArr.length > 0) {
							this.$router.push({path:"/index/shop/seckillShopConfirm/"+this.seckillGoodsArr})
							return;
						}else {
							this.$router.push({path:"/index/shop/shopConfirm/"+this.GoodsArr+"/''/''"})
							return;
						}
					}
				}
			},
			submitFun: function() {
				if (this.type == 1) {
					this.$router.push({path:"/index/shop/seckillShopConfirm/"+this.seckillGoodsArr})
				}else {
					this.$router.push({path:"/index/shop/shopConfirm/"+this.GoodsArr+"/''/''"})
				}
			}
		},
		computed: {
			shopCheck: function() {	//店铺名称是否选中
				let goodsCheck = this.goodsCheck;
				let shopCheckObj = {};
				for (var key in goodsCheck) {
					if (this.showGoogsCheck[key].length == goodsCheck[key].length) {
						shopCheckObj[key] = true;
					}else {
						shopCheckObj[key] = false;
					}
				}
				return shopCheckObj;
			},
			showGoogsCheck: function() {	//还有库存的商品总数
				let goodsArr = {};
				for (var key in this.cartGoodsList) {
					goodsArr[key] = [];
					this.cartGoodsList[key].map((val) => {
						val.is_show == 'Y' ? goodsArr[key].push(val) : '';
					});
				};
				return goodsArr;
			},
			allCheck: function() {
				let isSelect = true;
				for (let key in this.cartGoodsList) {
					if (!this.shopCheck[key]) {
						isSelect = false;
						break;
					}
				};
				return isSelect;
			},
			money: function() {
				let res = 0;
				for (var key in this.cartGoodsList) {
          this.cartGoodsList[key].map((val) => {
            if (this.goodsCheck[key].indexOf(val.goods_id) > -1) {
							if (val.seckill_id > 0 ) {
                res += val.seckill_price * val.num;
							}else if(this.is_vip){
                res += val.vip_price * val.num;
              }else{
								res += val.price * val.num;
							}
						}
					})
				};
				return res;
			}
		},
		created() {
			this.$store.commit('isPageLoad');
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#cart {
		width: 100%;
		.rem(min-height,1108);
		background: #eee;
		.title {
			width: 100%;
			.rem(height,72);
			.rem(line-height,70);
			.rem(font-size,28);
			color: #666;
			text-align: center;
			.border(border-bottom,2,#eee);
			background: #fff;
		}
		.cart-goods {
			.shop-goods {
				width: 100%;
				.rem(margin-bottom,24);
				overflow: hidden;
			}
			.shop-name {
				position: relative;
				width: 100%;
				.rem(height,70);
				.rem(padding-left,90);
				.rem(margin-bottom,2);
				background: #fff;
				.shop-check {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 10;
					.rem(width,90);
					.rem(height,70);
					input {
						position: absolute;
						z-index: 10;
						width: 100%;
						height: 100%;
						opacity: 0;
					}
					span {
						position: absolute;
						.rem(top,20);
						.rem(left,37);
						.rem(width,30);
						.rem(height,30);
						background: url(./image/check_1.png) no-repeat;
						background-size: 100% 100%;
					}
					input:checked + span {
						background-image: url(./image/check.png);
					}
				}
				.name {
					width: 100%;
					.rem(font-size,28);
					.rem(line-height,70);
				}
			}
			.goods-list {
				li {
					position: relative;
					width: 100%;
					/*<!--.rem(margin-bottom,1);-->*/
					.rem(padding-bottom,18);
					background: #fff;
				}
				.seckill {
					position: relative;
					width: 100%;
					.rem(height,60);
					.rem(padding-left,160);
					.rem(line-height,60);
					.rem(font-size,24);
					color: #333;
					background: #fef8f4;
					span {
						position: absolute;
						.rem(top,12);
						.rem(left,39);
						.rem(width,98);
						.rem(height,36);
						.rem(line-height,34);
						.rem(font-size,22);
						color: #ed7422;
						text-align: center;
						.border(border,2,#ed7422);
						.border-radius(5);
					}
				}
				.goods-box {
					.rem(padding-top,18);
					.rem(padding-right,36);
					overflow: hidden;
				}
				.img-box {
					float: left;
					.rem(width,240);
					.rem(padding-left,90);
					.img {
						position: relative;
						.rem(width,144);
						.rem(height,144);
						overflow: hidden;
						img {
							width: 100%;
						}
						span {
							position: absolute;
							bottom: 0;
							left: 0;
							width: 100%;
							.rem(height,36);
							.rem(line-height,36);
							.rem(font-size,22);
							color: #fff;
							text-align: center;
							background: rgba(0,0,0,.6);
						}
					}
				}
				.goods-info {
					width: 100%;
					.rem(padding-left,260);
					.name {
						width: 100%;
						.rem(margin-top,20);
						.rem(padding-right,40);
						.rem(font-size,28);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.money {
						width: 100%;
						.rem(margin-top,30);
						.rem(font-size,30);
						color: #ed7422;
					}
          .bfprice{
            width: 100%;
            .rem(font-size,30);
            color: #ed7422;
            margin-top: 0.1rem;
            /*text-decoration: line-through;*/
          }
          .bfprice1{
            color: #000;
            text-decoration: line-through;
            i{
              font-size: 0.32rem;
            }
          }
				}
				.goods-check {
					position: absolute;
					top: 0;
					z-index: 1;
					.rem(width,90);
					height: 100%;
					input {
						position: absolute;
						top: 0;
						z-index: 10;
						left: 0;
						width: 100%;
						height: 100%;
						opacity: 0;
					}
					span {
						position: absolute;
						.rem(bottom,75);
						.rem(left,37);
						.rem(width,30);
						.rem(height,30);
						background: url(./image/check_1.png) no-repeat;
						background-size: 100% 100%;
					}
					input:checked + span {
						background-image: url(./image/check.png);
					}
				}
				.delete {
					position: absolute;
					.rem(bottom,95);
					.rem(right,35);
					z-index: 10;
					.rem(width,50);
					.rem(height,50);
					.rem(line-height,50);
					text-align: center;
					i {
						display: inline-block;
						.rem(width,28);
						.rem(height,28);
						background: url(./image/delete_1.png) no-repeat;
						background-size: 100% 100%;
					}
				}
				.number {
					position: absolute;
					z-index: 10;
					.rem(bottom,33);
					.rem(right,36);
					.rem(width,159);
					.rem(height,44);
					.rem(line-height,44);
					.border-radius(10);
					background: #eeeeee;
					.del {
						float: left;
						background-image: url(./image/del.png);
					}
					.add {
						float: right;
						background-image: url(./image/add.png);
					}
					.del,.add {
						.rem(width,44);
						.rem(height,44);
						background-size: 100% 100%;
						background-repeat: no-repeat;
					}
					.num {
						display: block;
						width: 100%;
						.rem(font-size,22);
						color: #666;
						text-align: center;
					}
				}
				.soldOut {
					position: absolute;
					z-index: 50;
					top: 0;
					left: 0;
					display: flex;
					width: 100%;
					height: 100%;
					align-items: center;
					justify-content: center;
					background: rgba(255,255,255,.5);
					img {
						.rem(width,150);
						.rem(height,150);
					}
				}
			}
		}
		.bottom-box {
			width: 100%;
			.rem(height,98);
		}
		.bottom {
			position: relative;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 50;
			width: 100%;
			.rem(height,98);
			background: #fff;
			.check {
				position: absolute;
				.rem(width,150);
				.rem(height,98);
				.rem(padding-left,90);
				font-size: 0;
				input {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 10;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
				span {
					position: absolute;
					z-index: 0;
					.rem(top,34);
					.rem(left,37);
					.rem(width,30);
					.rem(height,30);
					background: url(./image/check_1.png) no-repeat;
					background-size: 100% 100%;
				}
				input:checked + span {
					background-image: url(./image/check.png);
				}
				.txt {
					.rem(line-height,98);
					.rem(font-size,24);
					color: #333;
				}
			}
			.btn {
				float: right;
				.rem(width,196);
				.rem(height,98);
				.rem(line-height,98);
				.rem(font-size,28);
				color: #fff;
				text-align: center;
				background: #ed7422;
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
					.rem(line-height,32);
					.rem(font-size,32);
					color: #ed7422 ;
				}
			}
		}
		.cart-layer {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1000;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.6);
			letter-spacing: 1px;
			.popout {
				position: fixed;
				top: 50%;
				left: 50%;
				.rem(width,488);
				.rem(height,536);
				.border-radius(20);
				background: #fff;
				transform: translate(-50%,-50%);
			}
			.top-title {
				width: 100%;
				.rem(height,90);
				.rem(padding-left,38);
				.rem(line-height,90);
				.rem(font-size,28);
			}
			.layer-main {
				li {
					position: relative;
					width: 100%;
					.rem(padding-bottom,30);
				}
				.check {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					input {
						position: relative;
						z-index: 10;
						width: 100%;
						height: 100%;
						opacity: 0;
					}
					span {
						position: absolute;
						.rem(top,63);
						.rem(left,36);
						.rem(width,32);
						.rem(height,32);
						background: url(./image/check_1.png) no-repeat;
						background-size: 100% 100%;
					}
					input:checked + span {
						background-image: url(./image/check.png);
					}
				}
				.content {
					width: 100%;
					.rem(padding-left,96);
					.content-title {
						.rem(padding-top,25);
						.rem(margin-bottom,10);
						.rem(font-size,28);
					}
					div {
						.rem(margin-bottom,10);
						.rem(font-size,24);
						span {
							display: inline-block;
							.rem(width,110);
							.rem(height,36);
							.rem(line-height,32);
							.rem(font-size,22);
							color: #ed7422;
							.border(border,2,#ed7422);
							.border-radius(5);
							text-align: center;
						}
					}
					.num {
						.rem(font-size,24);
						color: #999;
					}
				}
			}
			.layer-btn {
				width: 100%;
				.rem(padding-top,34);
				text-align: center;
				.border(border-top,2,#eee);
				span {
					display: inline-block;
					.rem(width,218);
					.rem(height,60);
					.rem(line-height,60);
					.rem(font-size,24);
					color: #fff;
					.border-radius(10);
					background: #ed7631;
				}
				.back-cart {
					.rem(margin-right,8);
					background: #b5b5b6;
				}
			}
		}
	}
</style>
