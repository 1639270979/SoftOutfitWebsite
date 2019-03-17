<template>
	<div id="vipCaseDet" v-if="Object.keys(caseInfo).length != 0">
		<p class="title">vip会员软装设计方案</p>
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
			<a :href="caseInfo.pano_url" tag="span" class="pano-url">全景效果图</a>
		</div>
		<div class="caseInfo">
			<div class="right">
				<p class="sum">总价：</p>
				<p class="money">¥{{ caseInfo.countPrice.toFixed(2) }}</p>
				<p class="txt">已含运费</p>
			</div>
			<div class="left">
				<p class="name">{{ caseInfo.title }}</p>
				<div :class=" caseInfo.is_collect == 'Y'?'like like-color':'like '" @click="programmeCollectFun(caseInfo)">
					<span :class=" caseInfo.is_collect == 'Y'?'action':''"></span>{{ caseInfo.is_collect == 'Y' ? '已收藏' : '收藏'}}
				</div>
			</div>
		</div>
		<!-- <p class="caseName">客厅</p>
		<div class="grayBox10"></div> -->
		<div class="allShop">
			<p>查看所有商品</p>
			<ul class="list">
				<li v-for="list in caseInfo.goodsList">
					<router-link :to="{name:'商品详情',params:{pid:list.product_id}}" tag="div" class="list-box">
						<div class="img-box">
							<div class="img"><img :src="list.picture"></div>
						</div>
						<div class="shopInfo">
							<div class="shopName">
								<div class="logo"><img :src="list.logo"></div>
								{{ list.goods_name }}
							</div>
							<p class="color" v-if="list.spec_id == 0">颜色：默认</p>
							<p class="color" v-else>{{ list.spec_name }}：{{ list.text }}</p>
							<p class="size">尺寸：{{ list.size }}</p>
							<p class="money">单价：<span>¥{{ list.price }}</span></p>
						</div>
					</router-link>
					<div class="check">
						<input type="checkbox" :value="list.goods_id" v-model="check">
						<span></span>
					</div>
					<div class="number">
						<p class="num"><i class="del" @click="moveFun(list)"></i>{{ list.num }}<i class="add" @click="addFun(list)"></i></p>
					</div>
					<div class="like1" :class="list.is_collect=='Y'?'action':''" @click="shopCollectionFun(list.goods_id,list)"><i></i>
            <span :class="list.is_collect=='Y'?'span':'span1'">{{ list.is_collect=='Y' ? '已收藏' : '收藏'}}</span>
          </div>
				</li>
			</ul>
		</div>
		<div class="bottom-box"></div>
		<div class="bottom-btn">
			<div class="allCheck">
				<input type="checkbox" v-model="allCheck" @change="allCheckFun">
				<span></span>
				全选
			</div>
			<div class="btn">
				<span class="play" @click="shopConfirmFun">立即购买</span>
				<span @click="addCartFun">加入购物车</span>
			</div>
			<div class="right-money">
				<p class="money">¥{{ money }}</p>
				<p class="txt">已含运费</p>
			</div>
		</div>
		<div class="casePopout" v-if="isCartIdentical">
			<div class="mask">
				<ul class="list">
					<p class="cart-title">以下商品已存在于您的购物车，是否继续添加？</p>
					<li v-for="list in carted">
						<div class="list-box">
							<div class="img-box">
								<div class="img"><img :src="list.picture"></div>
							</div>
							<div class="shopInfo">
								<p class="shopName">{{ list.goods_name }}</p>
								<p class="money">¥{{ list.price }}</p>
							</div>
						</div>
						<div class="check-box">
							<input type="checkbox" :value="list" v-model="cofirmCart">
							<span></span>
						</div>
						<div class="number">
							<p class="num"><i class="del" @click="cartMoveFun(list)"></i>{{ list.num }}<i class="add" @click="cartAddFun(list)"></i></p>
						</div>
					</li>
				</ul>
				<div class="layer-bottom">
					<span @click="isCartIdentical = false">取消</span>
					<span class="addCart" @click="confirmAddCart">确认并加入购物车</span>
				</div>
			</div>
		</div>
		<confirmPrompt
			@rightBtn="goLoginFun"></confirmPrompt>
	</div>
</template>
<script>
	import { vipDesignCase,shopDetCollect,shopAddCart,vipDesignCaseCollect } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				isCartIdentical: false,
				cid: this.$route.params.cid,
				caseInfo: {},
				check: [],
				carted: [],	//购物车已有
				cart: [],	//购物车未有
				cofirmCart: [],	//勾选加入购物车
				wxSystem: this.$store.state.publicJS.wxSystem
			}
		},
		methods: {
			ajaxFun: function() {
				vipDesignCase(this.cid).then(data => {
					this.caseInfo = data.caseInfo;
					data.caseInfo.goodsList.forEach((key) => {
						this.check.push(key.goods_id);
					})
					this.bannerFun();
				})
			},
			bannerFun: function() {
				let this_ = this;
				this.$nextTick(function () {
					var banner = new Swiper ('.swiper-container', {
						//loop: true,
						autoplay: 4000,
						autoplayDisableOnInteraction: false,
						pagination: '.swiper-pagination'
					});
				});
			},
			moveFun: function(obj) {//减少
				if (obj.num <= 1) {
					this.$store.state.publicJS.promptBoxMsg = '商品数量不能小于1';
					this.$store.commit('txtPrompt');
					setTimeout(() => {
						this.$store.commit('txtPrompt');
					},1500);
					return
				}
				obj.num --;
			},
			addFun: function(obj) {//增加
				if (obj.num >= obj.store) {
					this.$store.state.publicJS.promptBoxMsg = '商品库存不足';
					this.$store.commit('txtPrompt');
					setTimeout(() => {
						this.$store.commit('txtPrompt');
					},1500);
					return
				}
				obj.num ++;
			},
			allCheckFun: function() {//全选
				let listLen  = this.caseInfo.goodsList.length;
				let checkLen = this.check.length;
				if (checkLen == listLen) {
					this.check = [];
				}else {
					this.check = this.showCheck;
				}
			},
			programmeCollectFun: function(info) {
				let status = info.is_collect == 'Y'?'del':'add';
				let obj = {'cid':info.case_id,'type':status}
				vipDesignCaseCollect(obj).then(data => {
					if (data.islogin) {
						info.is_collect = info.is_collect == 'Y'?'N':'Y';
					}else {
						if (!this.wxSystem) {
							this.confirmPromptFun('请先登陆');
						}else if (this.wxSystem) {
							this.confirmPromptFun('请先完善资料');
						}
					}
				})
			},
			shopCollectionFun: function(pid,item) {//商品收藏
				let type = item.is_collect == "Y"?'del':'add';
				let obj = {'pid':pid,'type':type}
				shopDetCollect(obj).then(data => {
					if (data.islogin) {
						if (type == 'add') {
							item.is_collect = 'Y';
						}else {
							item.is_collect = 'N';
						}
					}else {
						if (this.wxSystem) {
							this.confirmPromptFun('请先完善资料','去完善');
							return;
						}
						this.confirmPromptFun('请先登陆','去登陆');
					}
				})
			},
			confirmPromptFun: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.state.publicJS.confirmPromptBtnRight = '去登陆';
				this.$store.commit('confirmPrompt');
				if (this.wxSystem) {
					this.$store.state.publicJS.confirmPromptBtnRight = '去完善';
				}else {
					this.$store.state.publicJS.confirmPromptBtnRight = '去登录';
				}
			},
			goLoginFun: function() {
				this.$store.state.header.backName = this.$route.name;
				let url = this.$route.path;
				if (this.wxSystem) {
					this.$router.push({path:'/login/perfect'});
					return;
				}
				this.$router.replace({path:'/login'});
			},
			cartMoveFun: function(obj) {//减少
				if (obj.num <= 1) {
					this.$store.state.publicJS.promptBoxMsg = '商品数量不能小于1';
					this.$store.commit('txtPrompt');
					setTimeout(() => {
						this.$store.commit('txtPrompt');
					},1500);
					return
				}
				obj.num --;
			},
			cartAddFun: function(obj) {//增加
				if (obj.num >= obj.store) {
					this.$store.state.publicJS.promptBoxMsg = '商品库存不足';
					this.$store.commit('txtPrompt');
					setTimeout(() => {
						this.$store.commit('txtPrompt');
					},1500);
					return
				}
				obj.num ++;
			},
			addCartFun: function() {	//加入购物车
				let num = new Object;
				let gid = [];
				let goodsList = this.caseInfo.goodsList;
				this.check.map((key) => {
					for (var i = 0; i < goodsList.length; i++) {
						if (key == goodsList[i].goods_id) {
							this.cart.push(goodsList[i]);
							num [goodsList[i].goods_id] = goodsList[i].num;
							gid.push(goodsList[i].goods_id);
						}
					}
				});
				let obj = {'gid':gid,'num':num};
				shopAddCart(obj).then(data => {
					if (data.code == 1) {
						if (data.has_cart.length != 0) {
							var arr = [];
							data.has_cart.map((key) => {
								for (var i = 0; i < goodsList.length; i++) {
									if (key == goodsList[i].goods_id) {
										arr.push(goodsList[i]);
									}
								}
							});
							this.$store.commit('isExistShopCartShow',arr);
							return;
						}
						this.$store.commit('iconPrompt');
						setTimeout(() => {
							this.$store.commit('iconPrompt');
						},1500);
					}else {
						this.$store.state.publicJS.promptBoxMsg = data.message;
						this.$store.commit('txtPrompt');
						setTimeout(() => {
							this.$store.commit('txtPrompt');
						},1000);
					}
				});
			},
			shopConfirmFun: function() {//立即购买
				if (!this.isLogin && !this.wxSystem) {
					this.confirmPromptFun('请先登陆','去登陆');
					return;
				} else if (!this.isLogin && this.wxSystem) {
					this.confirmPromptFun('请先完善资料','去完善');
					return;
				}
				var arr = [];
				this.check.map((key) => {
					for (var i = 0; i < this.caseInfo.goodsList.length; i++) {
						if (key == this.caseInfo.goodsList[i].goods_id) {
							arr.push(key+'|'+this.caseInfo.goodsList[i].num);
						}
					}
				})
				var arrStr = arr.join(",");
				this.$router.push({ name: '立即结算', params: { carts: arrStr,sid: ' ',cid: this.cid }})
			}
		},
		computed: {
			showCheck: function() {
				let arr = [];
				let list = this.caseInfo.goodsList;
				for (var i = 0; i < list.length; i++) {
					arr.push(list[i].goods_id)
				}
				return arr;
			},
			allCheck: function() {
				let listLen  = this.showCheck.length;
				let checkLen = this.check.length;
				return listLen === checkLen;
			},
			money: function() {
				let num = 0;
				this.check.map((key) => {
					for (var i = 0; i < this.caseInfo.goodsList.length; i++) {
						if (key == this.caseInfo.goodsList[i].goods_id) {
							num += this.caseInfo.goodsList[i].price * this.caseInfo.goodsList[i].num;
						}
					}
				});
				return num.toFixed(2);
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
	#vipCaseDet {
		.title {
			width: 100%;
			.rem(height,70);
			.rem(line-height,70);
			.rem(font-size,32);
			color: #333;
			text-align: center;
			letter-spacing: 1px;
		}
		.swiper {
			position: relative;
			width: 100%;
			.rem(height,420);
			.swiper-slide {
				width: 100%;
				.rem(height,420);
				img {
					width: 100%;
					.rem(min-height,420);
				}
			}
			.pano-url {
				position: absolute;
				z-index: 88;
				.rem(top,23);
				.rem(right,28);
				.rem(width,144);
				.rem(height,44);
				.rem(line-height,44);
				.rem(font-size,22);
				color: #fff;
				text-align: center;
				.border-radius(10);
				background: #ed7631;
			}
		}
		.caseInfo {
			position: relative;
			width: 100%;
			.rem(padding-top,24);
			.rem(padding-left,30);
			.rem(padding-right,37);
			.rem(padding-bottom,20);
			.border(border-bottom,2,#eee);
			overflow: hidden;
			.right {
				float: right;
				.rem(width,200);
				text-align: right;
				.sum {
					.rem(line-height,44);
					.rem(font-size,28);
				}
				.money {
					.rem(line-height,52);
					.rem(font-size,32);
					color: #ed7631;
				}
				.txt {
					.rem(line-height,42);
					.rem(font-size,24);
					color: #999;
				}
			}
			.left {
				width: 100%;
				.rem(padding-right,200);
				.name {
					width: 100%;
					.rem(font-size,28);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.like {
				position: absolute;
				.rem(top,80);
				.rem(left,30);
				z-index: 10;
				.rem(width,130);
				.rem(height,100);
				.rem(line-height,100);
				.rem(font-size,24);
        color: #000;
				span {
					position: relative;
					.rem(top,4);
					display: inline-block;
					.rem(width,32);
					.rem(height,29);
					.rem(margin-right,10);
					background: url(./image/bottom_ico_4_collection.png) no-repeat;
					background-size: 100% 100%;
				}
				.action {
					background-image: url(./image/bottom_ico_4_collection_state.png);
				}
			}
      .like-color{
        color: #ed7631;
      }
		}
		.caseName {
			width: 100%;
			.rem(height,81);
			.rem(padding-left,30);
			.rem(line-height,81);
			.rem(font-size,32);
		}
		.grayBox10 {
			width: 100%;
			.rem(height,10);
			background: #eee;
		}
		.allShop {
			> p {
				width: 100%;
				.rem(height,70);
				.rem(line-height,70);
				.rem(font-size,28);
				text-align: center;
			}
			.list {
				li {
					position: relative;
					width: 100%;
					.rem(height,190);
					.border(border-top,2,#eee);
				}
			}
			.list-box {
				width: 100%;
				.rem(height,190);
				.rem(padding-right,30);
			}
			.img-box {
				float: left;
				.rem(width,214);
				.rem(height,190);
				.rem(padding-top,22);
				.rem(padding-left,70);
				.img {
					.rem(width,144);
					.rem(height,144);
					overflow: hidden;
					img {
						width: 100%;
						.rem(min-height,144);
					}
				}
			}
			.shopInfo {
				width: 100%;
				.rem(padding-top,20);
				.rem(padding-left,230);
			}
			.shopName {
				position: relative;
				width: 100%;
				.rem(height,48);
				.rem(padding-left,60);
				.rem(padding-right,30);
				.rem(line-height,48);
				.rem(font-size,24);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				.logo {
					position: absolute;
					top: 0;
					left: 0;
					.rem(width,48);
					.rem(height,48);
					overflow: hidden;
					img {
						width: 100%;
					}
				}
			}
			.color,.size {
				width: 100%;
				.rem(line-height,40);
				.rem(font-size,22);
				color: #666;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.money {
				.rem(font-size,24);
				text-align: right;
				span {
					color: #ed7631;
				}
			}
			.check {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 5;
				float: left;
				.rem(width,70);
				height: 100%;
				input {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 1;
					width: 100%;
					height: 100%;
					margin: 0;
					opacity: 0;
				}
				span {
					position: absolute;
					.rem(top,81);
					.rem(left,29);
					z-index: 0;
					.rem(width,26);
					.rem(height,26);
					background: url(./image/case_check.png) no-repeat;
					background-size: 100% 100%;
				}
				input:checked+span {
					background-image: url(./image/case_check_1.png);
				}
			}
			.number {
				position: absolute;
				z-index: 10;
				.rem(left,230);
				.rem(bottom,10);
				.rem(width,102);
				.num {
					position: relative;
					.rem(height,30);
					.rem(padding-left,30);
					.rem(padding-right,30);
					.rem(line-height,30);
					.rem(font-size,22);
					color: #666;
					text-align: center;
					background: #eee;
					overflow: hidden;
				}
				i {
					position: absolute;
					top: 0;
					.rem(width,30);
					.rem(height,30);
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}
				.del {
					left: 0;
					background-image: url(./image/del.png);
				}
				.add {
					right: 0;
					background-image: url(./image/add.png);
				}
			}
			.like1 {
				position: absolute;
				.rem(top,10);
				.rem(right,10);
				z-index: 10;
				.rem(width,120);
				.rem(height,80);
				.rem(line-height,80);
				text-align: center;
				i {
					position: absolute;
          top: 0.3rem;
          left: 0;
					.rem(width,30);
					.rem(height,29);
          background: url(./image/bottom_ico_4_collection.png) no-repeat ;
					background-size: 100% 100%;
				}
				&.action {
					i {
						background-image: url(./image/bottom_ico_4_collection_state.png);
					}
				}
        .span{
          position: absolute;
          top: -0.07rem;
          left: 0.5rem;
          color:#ed7631 ;
        }
        .span1{
          position: absolute;
          top: -0.07rem;
          left: 0.5rem;
          color: #000;
        }
			}
		}
		.bottom-box {
			width: 100%;
			.rem(height,100);
		}
		.bottom-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 200;
			width: 100%;
			.rem(height,98);
			background: #fff;
			box-shadow: 0 0px 6px #eee;
			.allCheck {
				position: relative;
				float: left;
				.rem(width,140);
				.rem(height,97);
				.rem(line-height,97);
				.rem(font-size,24);
				.rem(padding-left,29);
				input {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 10;
					width: 100%;
					height: 100%;
					margin: 0;
					opacity: 0;
				}
				span {
					position: relative;
					.rem(top,3);
					z-index: 1;
					display: inline-block;
					.rem(width,26);
					.rem(height,26);
					.rem(margin-right,10);
					background: url(./image/case_check.png) no-repeat;
					background-size: 100% 100%;
				}
				input:checked + span {
					background-image: url(./image/case_check_1.png);
				}
			}
			.right-money {
				float: right;
				.rem(margin-right,20);
				text-align: right;
				.money {
					.rem(line-height,62);
					.rem(font-size,32);
					color: #ed7631;
				}
				.txt {
					.rem(font-size,20);
					color: #999;
				}
			}
			.btn {
				float: right;
				> span {
					float: right;
					.rem(width,188);
					.rem(height,98);
					.rem(line-height,98);
					.rem(font-size,28);
					color: #fff;
					text-align: center;
					background: #f8ac28;
				}
				.play {
					background: #ed7631;
				}
			}
		}
		.casePopout {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 500;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.6);
			.mask {
				position: fixed;
				top: 50%;
				left: 50%;
				.rem(width,600);
				.rem(height,780);
				.border-radius(20);
				background: #fff;
				transform: translate(-50%,-50%);
			}
			.list {
				width: 100%;
				.rem(height,652);
				overflow-y: auto;
			}
			.cart-title {
				width: 100%;
				.rem(margin-top,25);
				.rem(margin-bottom,25);
				.rem(padding-left,50);
				.rem(padding-right,50);
				.rem(line-height,38);
				.rem(font-size,28);
				letter-spacing: 1px;
			}
			li {
				position: relative;
			}
			.list-box {
				width: 100%;
				.rem(height,146);
				.border(border-bottom,2,#eee);
			}
			.img-box {
				float: left;
				.rem(width,213);
				.rem(padding-top,10);
				.rem(padding-left,84);
				.img {
					.rem(width,128);
					.rem(height,128);
					overflow: hidden;
					img {
						width: 100%;
						.rem(min-height,128);
					}
				}
			}
			.shopInfo {
				width: 100%;
				.rem(padding-left,240);
				.shopName {
					width: 100%;
					.rem(line-height,44);
					.rem(font-size,24);
				}
				.money {
					.rem(margin-top,5);
					.rem(line-height,34);
					.rem(font-size,22);
					color: #ed7631;
				}
			}
			.check-box {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 10;
				.rem(width,84);
				.rem(height,146);
				.rem(line-height,146);
				input {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 1;
					width: 100%;
					height: 100%;
					margin: 0;
					opacity: 0;
				}
				span {
					display: inline-block;
					.rem(width,26);
					.rem(height,26);
					.rem(margin-left,43);
					background: url(./image/case_check.png) no-repeat;
					background-size: 100% 100%;
				}
				input:checked+span{
					background-image: url(./image/case_check_1.png);
				}
			}
			.layer-bottom {
				position: absolute;
				left: 0;
				bottom: 0;
				z-index: 10;
				width: 100%;
				.rem(height,128);
				.rem(padding-top,34);
				text-align: center;
				background: #fff;
				box-shadow: 0 0 3px #eee;
				span {
					display: inline-block;
					.rem(width,258);
					.rem(height,60);
					.rem(line-height,60);
					.rem(font-size,24);
					color: #fff;
					text-align: center;
					.border-radius(10);
					background: #b5b5b6;
				}
				.addCart {
					.rem(margin-left,16);
					background: #ed7631;
				}
			}
			.number {
				position: absolute;
				z-index: 10;
				.rem(left,230);
				.rem(bottom,20);
				.rem(width,102);
				.num {
					position: relative;
					.rem(height,30);
					.rem(padding-left,30);
					.rem(padding-right,30);
					.rem(line-height,30);
					.rem(font-size,22);
					color: #666;
					text-align: center;
					background: #eee;
					overflow: hidden;
				}
				i {
					position: absolute;
					top: 0;
					.rem(width,30);
					.rem(height,30);
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}
				.del {
					left: 0;
					background-image: url(./image/del.png);
				}
				.add {
					right: 0;
					background-image: url(./image/add.png);
				}
			}
		}
	}
</style>
