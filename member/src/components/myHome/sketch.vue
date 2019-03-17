<template>
	<div id="sketch" v-if="effectList.length != 0">
		<div class="swiper">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="list in effectList">
						<img :src="list.picture">
          </div>
				</div>
				<!-- 如果需要分页器 -->
				<div class="swiper-pagination"></div>
				<!-- 如果需要导航按钮 -->
				<div class="swiper-button-prev swiper-button-white"></div>
				<div class="swiper-button-next swiper-button-white"></div>
			</div>
      <p class="caseName">{{ space_name }}</p>
    </div>
    <p class="title">{{ title }}</p>
    <div class="grayBox10"></div>
		<div class="allShop">
			<p>本方案中所有商品</p>
			<ul class="list">
				<li v-for="list in goods">
					<router-link :to="{name:'商品详情',params:{pid:list.product_id}}" tag="div" class="list-box">
						<div class="img-box">
							<div class="img"><img :src="list.picture"></div>
						</div>
						<div class="shopInfo">
							<div class="shopName">
								<div class="logo"><img :src="list.logo"></div>
								{{ list.goods_name }}
							</div>
							<p class="color" v-if="list.spec_id == 0">规格：默认</p>
							<p class="color" v-else>{{ list.spec_name }}：{{ list.text }}</p>
							<p class="size">尺寸：{{ list.size }}</p>
							<!--<p class="money">单价：<span>¥{{ list.price }}</span></p>-->
						</div>
					</router-link>
					<div class="check">
						<input type="checkbox" :value="list.goods_id" v-model="check[goodsIndex]">
						<span></span>
					</div>
					<div class="number">
						<p class="num"><i class="del" @click="moveFun(list)"></i>{{ list.num }}<i class="add" @click="addFun(list)"></i></p>
					</div>
					<div class="like" :class="list.is_collect=='Y'?'action':''" @click="shopCollectionFun(list.product_id,list)"><i></i>&nbsp;{{list.is_collect=='Y'?'已收藏':'收藏'}}</div>
				</li>
			</ul>
		</div>
		<div class="bottom-box"></div>
		<div class="bottom-btn">
			<div class="allCheck">
				<input type="checkbox" v-model="allCheck[goodsIndex]" @change="allCheckFun">
				<span></span>
				全选
			</div>
			<div class="btn">
				<span class="play" @click="buyFun">立即购买</span>
				<span @click="addCartFun">加入购物车</span>
			</div>
			<div class="right-money">
				<p class="money">¥{{ money }}</p>
				<p class="txt">已含运费</p>
			</div>
		</div>
		<!-- <div class="list">
			<ul>
				<li v-for="list in lists">
					<p>{{ list.space_name }}</p>
					<img :src="list.picture" @click="picZoomFun(list.picture)">
				</li>
			</ul>
		</div> -->
		<!-- 图片放大 -->
		<div class="pswp" id="iosMask" style="display: none;">
			<div class="pswp__bg"></div>
			<div class="pswp__scroll-wrap">
				<div class="pswp__container">
					<div class="pswp__item"></div>
					<div class="pswp__item"></div>
					<div class="pswp__item"></div>
				</div>
				<div class="pswp__ui pswp__ui--hidden">
					<div class="pswp__top-bar">
					<div class="pswp__counter"></div>
					<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
						<div class="pswp__preloader">
							<div class="pswp__preloader__icn">
								<div class="pswp__preloader__cut">
									<div class="pswp__preloader__donut"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
						<div class="pswp__share-tooltip"></div>
					</div>

					<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

					<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
					<div class="pswp__caption">
						<div class="pswp__caption__center"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
 	import { effectPic,shopDetCollect,shopAddCart } from '../../common/axios/api.js';
	import PhotoSwipe from 'photoswipe';
	export default {
		data() {
			return {
				aid: this.$route.params.aid,
				effectList: [],
				goodsList: [],	//所有商品列表
				goodsIndex: 0,	//数组下标
				title: '',
				space_name: '',
				goods: [],
				check: {},
			}
		},
		methods: {
			ajaxFun: function(aid) {
				effectPic(aid).then(data => {
					if (data.code == 1) {
						this.title = data.title;
						this.effectList = data.effectList;
						data.effectList.map((val,index) => {
							this.$set(this.check,index,[]);
							this.goodsList.push(val.productList);
							val.productList.map((value) => {
								this.check[index].push(value.goods_id);
							});
						});
						this.space_name = data.effectList[this.goodsIndex].space_name;
						this.goods = data.effectList[this.goodsIndex].productList;
						this.swiperFun();
					}
				})
			},
			swiperFun: function() {
				let this_ = this;
				this.$nextTick(function () {
					var banner = new Swiper ('.swiper-container', {
						//loop: true,
						//autoplay: 4000,
						autoplayDisableOnInteraction: false,
						pagination: '.swiper-pagination',
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev',
						onTransitionStart: function(swiper) {
							let goodsIndex = this_.goodsIndex = swiper.activeIndex;
							this_.space_name = this_.effectList[goodsIndex].space_name;
							this_.goods = this_.goodsList[goodsIndex];
							this_.money = 0;
							this_.goodsList[goodsIndex].map((key) => {
								this_.money += key.price / 1;
							});
						}
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
			shopCollectionFun: function(pid,item) { //商品收藏
				let type = item.is_collect == "Y"?'del':'add';
				let obj = {'pid':pid,'type':type}
				shopDetCollect(obj).then(data => {
					this.goodsList.map((val) => {
						val.map((value) => {
							if (value.product_id == pid) {
								value.is_collect = value.is_collect == 'Y' ? 'N' : 'Y';
							}
						});
					});
				})
			},
			allCheckFun: function() {
				let index = this.goodsIndex;
        if (this.goods.length == this.check[index].length) {
          this.check[index] = [];
				}else {
          this.check[index] = [];
          this.goods.map((val) => {
						this.check[index].push(val.goods_id);
					});
          console.log(this.check);
        }
        return this.check;
			},
			buyFun: function() {
				let arr = [];
				let check = this.check[this.goodsIndex];
				let goods = this.goods;
				for (var i = 0; i < check.length; i++) {
					for (var k = 0; k < goods.length; k++) {
						if (check[i] == goods[k].goods_id) {
							if (goods[k].num > goods[k].store) {
								this.$store.state.publicJS.promptBoxMsg = goods[k].goods_name+'该商品库存只剩'+goods[k].store+'件';
								this.$store.dispatch('alertPrompt');
								return;
							}
							arr.push(check[i] + '|' + goods[k].num);
						}
					}
				}
				var arrStr = arr.join(",");
				//this.$router.push({ name: '立即结算', params: { carts: arrStr,sid: ' ',cid: '' }})
				this.$router.push({ path: "/index/shop/shopConfirm/"+arrStr+"/''/''"})
			},
			addCartFun: function() {
				let num = new Object;
				let gid = [];
				let goodsList = this.goods;
				this.check[this.goodsIndex].map((key) => {
					goodsList.map((val) => {
						if (key == val.goods_id) {
							num [val.goods_id] = val.num;
							gid.push(val.goods_id);
						}
					});
				});
				let obj = {'gid':gid,'num':num};
				shopAddCart(obj).then(data => {
					if (data.code == 1) {
						if (data.has_cart.length != 0) {
							var arr = [];
							data.has_cart.map((key) => {
								goodsList.map((val) => {
									if (key == val.goods_id) {
										arr.push(val);
									}
								});
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
			picZoomFun: function(img) {
				var items = new Array();
				let width = document.body.offsetWidth * 2;
				let height = width / 16 * 9;
				items.push({
					src: img,
					w  : width,
					h  : height
				});
				for (var i = 0; i < this.lists.length; i++) {
					if (items[0].src.indexOf(this.lists[i].picture) == -1) {
						items.push({
							src: this.lists[i].picture,
							w  : width,
							h  : height
						});
					}
					if (i == this.lists.length -1) {
						document.getElementById('iosMask').style.display = 'block';
						var pswpElement = document.querySelectorAll('.pswp')[0];
						var options = {
							history: false,
							focus: false,
							showAnimationDuration: 0,
							hideAnimationDuration: 0
						};
						var gallery = new PhotoSwipe(pswpElement,PhotoSwipeUI_Default,items,options);
						gallery.init();
					}
				};
			},
      accAdd(num1,num2){
        var r1,r2,m;
        try{
          r1 = num1.toString().split('.')[1].length;
        }catch(e){
          r1 = 0;
        }
        try{
          r2=num2.toString().split(".")[1].length;
        }catch(e){
          r2=0;
        }
        m=Math.pow(10,Math.max(r1,r2));
        return Math.round(num1*m+num2*m)/m;
      }// 加法运算丢失精准度的解决函数
  },
		computed: {
			allCheck: function() {
				let index = this.goodsIndex;
				let sumLength = this.goodsList[index].length;
				let goodsLength = this.check[index].length;
				let check = {};
				if (sumLength == goodsLength) {
					check[index] = true;
				}else {
					check[index] = false;
				}
        return check;
			},
			money: function() {
				let index = this.goodsIndex;
				let goodsList = this.goods;
				let sum = 0;
				this.check[index].map((key) => {
					goodsList.map((val) => {
						if (key == val.goods_id) {
//							sum =  sum + (val.num * (val.price*10000)/10000) ;
                sum = this.accAdd(sum,(val.num * (val.price*10000)/10000))
						}
					});
				});
				return sum;
			},
		},
		created() {
			this.ajaxFun(this.aid);
    }
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	@import './css/swiper-3.4.2.min.css';
	@import './css/photoswipe.css';
	@import './css/default-skin.css';
	#sketch {
		.title {
			width: 100%;
			.rem(height,80);
			.rem(line-height,80);
			.rem(font-size,32);
      .rem(padding-left,30);
			color: #333;
			text-align: left;
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
			.swiper-button-next, .swiper-button-prev {
				.rem(width,40);
				.rem(height,67);
				background-size: 100% 100%;
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
				.rem(width,100);
				.rem(height,100);
				.rem(line-height,100);
				.rem(font-size,24);
				color: #ed7631;
				span {
					position: relative;
					.rem(top,3);
					display: inline-block;
					.rem(width,30);
					.rem(height,27);
					.rem(margin-right,10);
					background: url(./image/menu_collect_unselect@2x.png) no-repeat;
					background-size: 100% 100%;
				}
				.action {
					background-image: url(./image/menu_collect_selected@2x.png);
				}
			}
		}
		.caseName {
			width: 100%;
      position: relative;
      top:-0.9rem;
      z-index: 999;
			.rem(height,71);
			.rem(padding-left,30);
			.rem(line-height,71);
			.rem(font-size,32);
      color: #fff;
      background: rgba(1,1,1,0.5);
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
					background: url(./image/round_check1.png) no-repeat;
					background-size: 100% 100%;
				}
				input:checked+span {
					background-image: url(./image/round_check.png);
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
			.like {
				position: absolute;
				.rem(top,10);
				right: 0.5rem;
				z-index: 10;
				.rem(width,150);
				.rem(height,100);
				.rem(line-height,100);
				text-align: center;
				i {
					display: inline-block;
					.rem(width,30);
					.rem(height,27);
					background: url(./image/menu_collect_unselect@2x.png) no-repeat 0 0.06rem;
					background-size: 100% 100%;
				}
				&.action {
					i {
						background-image: url(./image/menu_collect_selected@2x.png);
					}
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
					background: url(./image/round_check1.png) no-repeat;
					background-size: 100% 100%;
				}
				input:checked + span {
					background-image: url(./image/round_check.png);
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
	}
	/* .list {
		li {
			.rem(margin-bottom,20);
			p {
				.rem(padding-left,20);
				.rem(font-size,26);
				color: #666;
			}
			img {
				width: 100%;
			}
		}
	} */
</style>
