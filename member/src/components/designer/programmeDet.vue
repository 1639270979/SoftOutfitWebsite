<template>
	<div id="programmeDet">
		<div class="banner" v-if="picList != ''">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="banner in picList" @click="picZoomFun(banner.picture)">
						<a><img :src="banner.picture"></a>
						<div class="description">{{ banner.description }}</div>
					</div>
				</div>
				<!-- 如果需要分页器 -->
				<div class="swiper-pagination"></div>
			</div>
			<a :href="caseInfo.pano_url" class="pano" v-if="caseInfo.pano_status == 3">全景图</a>
		</div>
		<div class="caseInfo">
			<div class="left">
				<p>{{ caseInfo.title }}</p>
				<div class="like"
					:class="caseInfo.is_collect == 'Y'?'action':''"
					@click="collectionFun(caseInfo.case_id)">
					<span class="icon-like"></span>
					<span class="txt">{{ caseInfo.is_collect == 'Y'?'取消收藏':'收藏' }}</span>
				</div>
			</div>
			<div class="right">
				<p class="sum">总价：</p>
				<p class="money">¥{{ caseInfo.countPrice}}</p>
				<p>(已含运费)</p>
			</div>
		</div>
		<div class="themes">查看所有家具</div>
    <div class="themes2">All the goods</div>
		<div class="list">
			<ul>
				<li v-for="list in goodsList">
					<router-link :to="'/index/shop/shopDet/'+list.product_id">
						<div class="img"><img :src="list.picture"></div>
          </router-link>
          <div class="check">
            <label :for="'s'+list.goods_id">
              <input type="checkbox" :id="'s'+list.goods_id" :value="list.goods_id" v-model="check">
              <span></span>
            </label>
          </div>
          <div class="right">
              <div class="right-top">
                <p class="title">{{ list.goods_name }}</p>
              </div>
              <div class="right-bottom">
                <div class="left">
                  <span class="del" @click="moveFun(list)"></span>
                  <span class="num">{{ list.num }}</span>
                  <span class="add" @click="addFun(list)"></span>
                </div>
                <!--<p class="money">原价：<i class="iconfont icon-jine"></i>{{ list.price }}</p>-->
              </div>
            </div>
				</li>
			</ul>
		</div>
		<div class="bottom">
			<div class="check">
				<label for="all">
					<div>
						<input type="checkbox"
							v-model="allCheck"
							@change="allCheckFun">
						<span></span>
					</div>
				</label>
			</div>
			<div class="txt">全选</div>
			<div class="right">
				<div class="num">
					<p class="sum">¥{{ money }}</p>
					<p>(已含运费)</p>
				</div>
				<div class="btn addCart" @click="cartAjaxFun">加入购物车</div>
				<div class="btn" @click="shopConfirmFun">立即下单</div>
			</div>
		</div>
		<confirmPrompt
			@rightBtn="goLoginFun"></confirmPrompt>
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
	import { programmeDet,programmeCollect,shopDetCollect,shopAddCart } from '../../common/axios/api.js';
	import PhotoSwipe from 'photoswipe';
	import { WeChatConfig } from '../../common/public/WeChatConfig.js';
	export default {
		data() {
			return {
				picList  : [],
				caseInfo : {},
				goodsList: [],
				cid      : this.$route.params.cid,
				check        : [],
				isPic        : false,
				isLogin: '',
				wxSystem: this.$store.state.publicJS.wxSystem,
				signPackage: {}
			}
		},
		methods: {
			ajaxFun: function(cid) {
				programmeDet(cid).then(data => {
          for (var i = 0; i < data.picList.length; i++) {
						this.picList.push(data.picList[i]);
					}
					for (var i = 0; i < data.goodsList.length; i++) {
						this.goodsList.push(data.goodsList[i]);
						this.check.push(data.goodsList[i].goods_id);
					}
					this.isLogin = data.islogin;
					this.caseInfo = data.caseInfo;
					if (this.wxSystem) {
						this.signPackage = data.signPackage;
						this.wxConfig();
					}
					this.bannerFun();
				})
			},
			bannerFun: function() {
				let this_ = this;
				this.$nextTick(function () {
					var banner = new Swiper ('.swiper-container', {
						autoplay: 4000,
						autoplayDisableOnInteraction: false,
						pagination: '.swiper-pagination'
					});
				});
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
						title: this_.caseInfo.title, // 分享标题
						link: 'http://member.idmei.com/topage?i=index&c=designer&a=programmeDet&id='+this_.cid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this_.caseInfo.cover, // 分享图标
						success: function () {
							// 用户确认分享后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
					//分享给朋友
					wx.onMenuShareAppMessage({
						title: this_.caseInfo.title, // 分享标题
						desc: '大美软装-新零售创意家饰网络平台！', // 分享描述
						link: 'http://member.idmei.com/topage?i=index&c=designer&a=programmeDet&id='+this_.cid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this_.caseInfo.cover, // 分享图标
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
				for (var i = 0; i < this.picList.length; i++) {
					if (items[0].src.indexOf(this.picList[i].picture) == -1) {
						items.push({
							src: this.picList[i].picture,
							w  : width,
							h  : height
						});
					}
					if (i == this.picList.length -1) {
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
			collectionFun: function(cid) {//案例收藏
				let type;
				if (this.caseInfo.is_collect == 'Y') {
					type = 'del';
				}else {
					type = 'add';
				}
				let obj = {'cid':cid,'type':type}
				programmeCollect(obj).then(data => {
					if (data.islogin == false) {
						if (this.wxSystem) {
							this.confirmPromptFun('请先完善资料','去完善');
							return;
						}
						this.confirmPromptFun('请先登陆','去登陆');
					}else {
						if (this.caseInfo.is_collect == 'Y') {
							this.caseInfo.is_collect = 'N'
						}else {
							this.caseInfo.is_collect = 'Y'
						}
					}
				})
			},
			allCheckFun: function() {//全选
				let listLen  = this.goodsList.length;
				let checkLen = this.check.length;
				if (checkLen == listLen) {
					this.check = [];
				}else {
					this.check = this.showCheck;
				}
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
			shopCollectionFun: function(pid,item) {//商品收藏
				let type = item.goodsCollect == "Y"?'del':'add';
				let obj = {'pid':pid,'type':type}
				shopDetCollect(obj).then(data => {
					if (data.islogin) {
						if (type == 'add') {
							item.goodsCollect = 'Y';
						}else {
							item.goodsCollect = 'N';
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
			cartAjaxFun: function() {//加入购物车
				let num = new Object;
				this.check.map((key) => {
					for (var i = 0; i < this.goodsList.length; i++) {
						if (key == this.goodsList[i].goods_id) {
							num[key] = this.goodsList[i].num;
						}
					}
				})
				let obj = {'gid':this.check,'num':num};
				shopAddCart(obj).then(data => {
					if (data.code > 0) {
//            if(data.has_cart.length==0) {
              this.$store.commit('iconPrompt');
              setTimeout(() => {
                this.$store.commit('iconPrompt');
              }, 1500);
//            }else if(data.has_cart.length>0){
//              this.$store.commit('isExistShopCartShow',this.goodsList);
//            }
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
					for (var i = 0; i < this.goodsList.length; i++) {
						if (key == this.goodsList[i].goods_id) {
							arr.push(key+'|'+this.goodsList[i].num);
						}
					}
				})
				var arrStr = arr.join(",");
				this.$router.push({ name: '立即结算', params: { carts: arrStr,sid: ' ',cid: this.cid }})
			},
			confirmPromptFun: function(str,btn) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.state.publicJS.confirmPromptBtnRight = btn;
				this.$store.commit('confirmPrompt');
			},
			goLoginFun: function() {
				this.$store.state.header.backName = this.$route.name;
				if (this.wxSystem) {
					this.$router.push({path:'/login/perfect'});
					return;
				}
				this.$router.push({path:'/login'});
			}
		},
		computed: {
			showCheck: function() {
				let arr = [];
				let list = this.goodsList;
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
					for (var i = 0; i < this.goodsList.length; i++) {
						if (key == this.goodsList[i].goods_id) {
							num += this.goodsList[i].price * this.goodsList[i].num;
						}
					}
				});
				return num;
			}
		},
		created() {
			this.ajaxFun(this.cid);
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	@import './css/swiper-3.4.2.min.css';
	@import './css/photoswipe.css';
	@import './css/default-skin.css';
	#programmeDet {
		.rem(padding-bottom,98);
	}
	.banner {
		position: relative;
		width: 100%;
		.rem(height,360);
		font-size: 0;
		.border(border-bottom,2,#eee);
		overflow: hidden;
		.swiper-slide {
			position: relative;
			width: 100%;
		}
		.swiper-container {
			.rem(height,360);
		}
		img {
			width: 100%;
			.rem(min-height,360);
		}
		.description {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			.rem(padding-top,6);
			.rem(padding-bottom,6);
			.rem(padding-left,25);
			.rem(padding-right,25);
			.rem(line-height,36);
			.rem(font-size,20);
			color: #fff;
			background: rgba(0,0,0,.5);
		}
		.pano {
			position: absolute;
			.rem(bottom,20);
			.rem(right,20);
			z-index: 5;
			.rem(width,80);
			.rem(height,80);
			.rem(line-height,80);
			.rem(font-size,22);
			color: #fff;
			border-radius: 50%;
			text-align: center;
			background: rgba(0,0,0,.5);
		}
	}
	.caseInfo {
		display: flex;
		width: 100%;
		.rem(padding,30);
		.rem(padding-top,25);
		.rem(padding-bottom,0);
		background: #fff;
		align-items: center;
		justify-content: space-between;
		.left {
			.rem(width,400);
			p {
				width: 100%;
				.rem(font-size,26);
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.like {
				.rem(width,140);
				.rem(height,58);
				.rem(padding-top,35);
				> span {
					display: inline-block;
					.rem(font-size,22);
				}
				.icon-like {
					.rem(width,25);
					.rem(height,20);
					.rem(margin-right,6);
					background: url(./image/bottom_ico_4_collection.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			.like.action {
				.txt {
					color: #d65317;
				}
				.icon-like {
					background-image: url(./image/bottom_ico_4_collection_state.png);
				}
			}
		}
		.right {
			.rem(line-height,22);
			.rem(font-size,22);
			color: #999;
			text-align: right;
			p {
				.rem(margin-bottom,8);
				&:last-of-type {
					margin-bottom: 0;
				}
			}
			.sum {
				color: #666;
			}
			.money {
				.rem(line-height,26);
				.rem(font-size,26);
				color: #d65317;
			}
		}
	}
  .themes {
    margin-top: 0.45rem;
    width: 100%;
    .rem(line-height,90);
    font-size:0.45rem;
    color:rgba(33,33,33,1);
    text-align: center;
    font-weight: bold;
    background: #fff;
    border-top:0.2rem solid #F6F6F6;
  }
  .themes2{
    width: 100%;
    text-align: center;
    background: #fff;
    font-size:0.4rem;
    color:rgba(194,194,192,1);
    margin-bottom: 0.5rem;
    margin-top: -0.3rem;
  }
	.list {
    margin-bottom: 0.7rem;
    ul {
      display: flex;
      flex-wrap: wrap;
    }
    li{
      position: relative;
      width: 50%;
      .rem(padding-top,17);
      .rem(padding-bottom,30);
      .rem(padding-left,30);
      .rem(padding-right,28);
      background: #fff;
      .check{
        position: absolute;
        top: 4.85rem;
        left: 0.5rem;
        text-align: center;
        label{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        span {
          display: inline-block;
          border-radius: 50%;
          width:0.57rem;
          height:0.57rem;
          background: #fff;
          border: 1px solid #A8A8A8;
        }
        input:checked+span {
          background: url("image/choose_ico.png") no-repeat  center ;
          background-size:80%,80%;
          border: 1px solid #D55317;
        }
      }
      .img {
        width:4.29rem;
        height:4.29rem;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        background:rgba(246,246,246,1);
        img {
          width:120px;
          height: 120px;
        }
      }
      .right {
        width: 100%;
        padding-left:0.8rem ;
        padding-top: 0.18rem;
      }
      .right-top {
        position: relative;
        width: 100%;
        .title {
          display: inline-block;
          width: 3.5rem;
          margin-top: 0.1rem;
          font-size:0.43rem;
          color:#000000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .right-bottom{
        .left{
          position: relative;
          padding-top: 0.1rem;
          span{
            display: inline-block;
            width: 0.5rem;
            height: 0.5rem;
            color: #616161;
            font-size: 0.35rem;
          }
          .del{
            background: url("./image/move.png") no-repeat center;
            background-size: 100%,100%;
          }
          .add{
            margin-left: 0.7rem;
            background: url("./image/add.png") no-repeat center;
            background-size: 100%,100%;
          }
          .num{
            position: absolute;
            top: 0.1rem;
            width: 0.81rem;
            left: 0.5rem;
            text-align: center;
            line-height:0.5rem;
            background: #eee;
          }
        }
        .money{
          color: #616161;
          font-size: 0.35rem;
          margin-top: .1rem;
        }
      }
    }
	}
	.bottom {
    border-top:1px solid #eee;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 150;
		width: 100%;
		.rem(height,98);
		background: #fff;
		> div {
			float: left;
		}
		.check {
			position: relative;
      width: 0.57rem;
      height: 0.57rem;
			font-size: 0;
			label {
				width: 100%;
				height: 100%;
			}
			div {
				display: flex;
				width: 100%;
				height: 100%;
				align-items: center;
				justify-content: center;
			}
			input {
				position: absolute;
        top: 0.28rem;
        left: 0.44rem;
        width:0.5rem;
        height:0.5rem;
				opacity: 0;
        z-index: 2;
			}
			span {
        position: absolute;
        top: 0.23rem;
        left: 0.39rem;
        display: inline-block;
        border-radius: 50%;
        width:0.57rem;
        height:0.57rem;
        background: #fff;
        border: 1px solid #A8A8A8;
			}
			input:checked + span {
				background: url(./image/choose_ico.png) no-repeat center;
        background-size: 80%,80%;
			}
		}
		.txt {
			position: absolute;
      top: 0.9rem;
      left: 0.35rem;
      font-size: 0.32rem;
			color: #333;
		}
		.right {
			float: right;
			> div {
				float: left
			}
			.num {
        border-right: 1px solid #AFAFAF;
        border-left:1px solid #AFAFAF;
				.rem(margin-right,45);
        .rem(margin-top,18);
        text-align: right;
        padding: 0 0.5rem;
				.sum {
					.rem(margin-bottom,11);
					.rem(line-height,32);
					.rem(font-size,32);
					color: #d65317;
				}
				p {
					.rem(line-height,22);
					.rem(font-size,22);
					color:#666;
				}
			}
			.btn {
				.rem(width,160);
				.rem(height,98);
				.rem(line-height,98);
				.rem(font-size,26);
				color: #fff;
				text-align: center;
				background: #d65317;
			}
			.addCart {
				background: #e37820
			}
		}
	}
	.pswp__ui--hidden .pswp__top-bar, .pswp__ui--hidden .pswp__caption, .pswp__ui--hidden .pswp__button--arrow--left, .pswp__ui--hidden .pswp__button--arrow--right {
		opacity: 1;
	}
</style>
