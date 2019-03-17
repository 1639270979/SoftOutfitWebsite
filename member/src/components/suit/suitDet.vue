<template>
	<div id="suitDet">
    <div class="back" @click="backFun"><span class="icon-back"></span></div>
    <div id="suiticon" ref="myIcon" @click="share"><span></span></div>
    <div class="banner" v-if="banner != ''">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item,index) in banner" @click="picZoomFun(item.picture,banner,index)">
						<img :src="item.picture">
					</div>
				</div>
				<!-- 如果需要分页器 -->
				 <!--<div class="swiper-pagination"></div>-->
			</div>
      <a v-if="info.pic_pano!==''" :href="'/pano/suitPano?sid='+cid"  class="panorama">全景效果图</a>
			 <!--<div v-if='info.planer_graph != ""' class="plan" @click="picZoomFun(info.planer_graph)"><div>查看<br>平面图</div></div>-->
		</div>
		<div class="info">
			<p class="title">{{ info.suit_name }}</p>
      <div v-if="is_vip">
        <p class="vip-price"><i class="iconfont icon-jine"></i>{{info.countPrice}}</p>
        <!--<i class="vip-icon"></i>-->
        <!--<p class="money" style="text-decoration: line-through; color: #999; font-size: 0.32rem"><i class="iconfont icon-jine"></i>{{original}}</p>-->
      </div>
      <div v-else>
        <p class="vip-price"><i class="iconfont icon-jine"></i>{{info.original_price}}</p>
        <!--<p class="money"  style="text-decoration: line-through; color: #999; font-size: 0.32rem"><i class="iconfont icon-jine"></i>{{original}}</p>-->
      </div>
			<div class="like" @click="suitCollectFun(info)">
				<span :class="info.is_collect == 'Y'?'icon-like1':'icon-like'"></span>
				<span :class="info.is_collect == 'Y'?'txt123 likeY':'txt123'">{{ info.is_collect == 'Y'? '已收藏':'收藏' }}</span>
			</div>
		</div>
    <div class="gray-box-7"></div>
    <div class="suit-introduce">{{ info.description }}</div>
		<div class="gray-box-17"></div>
		<div class="themes">套装中的所有商品</div>
    <div class="themes2">All the goods</div>
		<div class="list">
			<ul>
				<li v-for="item in goodsList">
					<router-link :to="'/index/shop/shopDet/'+item.product_id">
						<div class="img"><img :src="item.picture"></div>
						<div class="right">
							<div class="right-top">
								<p class="title">{{ item.goods_name }}</p>
							</div>
							<div class="right-bottom">
								<p class="num">数量：{{ item.num }}件</p>
								<!--<p class="money">原价：<i class="iconfont icon-jine"></i>{{ item.original_price }}</p>-->
							</div>
						</div>
					</router-link>
					<div class="check">
						<label>
							<input type="checkbox" :value="item.goods_id" v-model="check">
							<span></span>
						</label>
					</div>
					<!--<div class="like"-->
						<!--:class="item.goodsCollect == 'Y'? 'action':''"-->
						<!--@click="shopCollectFun(item)">-->
						<!--<span class="icon-like"></span>-->
						<!--<span class="txt">{{ item.goodsCollect == 'Y'? '已收藏':'收藏' }}</span>-->
					<!--</div>-->
				</li>
			</ul>
		</div>
		<div class="bottom-box"></div>
		<div class="bottom-btn iphonex-pb">
			<div>
        <div class="top">
          <label @change="allCheckFun">
            <input type="checkbox" v-model='allChecked'>
            <span></span><p>全选</p></label>
        </div>
        <div class="fl">
          <p class="txt">共有{{ info.goodsCount }}件商品</p>
          <p class="bottom">至少选{{ choiceNum }}种商品</p>
				</div>
				<div class="fr">
					<div class="discount">
						<p class="p2" style="padding-top: 0.15rem"><i class="iconfont icon-jine"></i><span>{{ money }}</span></p>
						<!--<p class="p3"><i class="iconfont icon-jine">{{ original }}</i></p>-->
					</div>
					<div class="btn" @click="confirmFun">下单</div>
				</div>
			</div>
		</div>
    <div class="share" v-if="isShare">
      <div class="make">
        <p class="title">分享到</p>
        <div class="icon-close1" @click="isShare=false;scroll.beforeClose();"></div>
        <div class="content">
          <div>
            <div class="wx" @click="shareFun('wx')"></div>
            <p>微信好友</p>
          </div>
          <div>
            <div class="circle"  @click="shareFun('circle')"></div>
            <p>朋友圈</p>
          </div>
          <!--<div>-->
          <!--<div class="qq"></div>-->
          <!--<p>QQ好友</p>-->
          <!--</div>-->
          <!--<div>-->
          <!--<div class="space"></div>-->
          <!--<p>QQ空间</p>-->
          <!--</div>-->
          <!--<div>-->
          <!--<div class="sina"></div>-->
          <!--<p>新浪微博</p>-->
          <!--</div>-->
          <div class="getCopy" :data-clipboard-text="link">
            <div class="copy"></div>
            <p>复制链接</p>
          </div>
        </div>
      </div>
    </div>
		<confirmPrompt @rightBtn="goLoginFun"></confirmPrompt>
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
	import { suitDet,shopDetCollect,suitCollect,suitAddHits } from '../../common/axios/api.js';
	import PhotoSwipe from 'photoswipe';
	import { WeChatConfig } from '../../common/public/WeChatConfig.js';
  import bus from '../../assets/eventBus';
  import Clipboard from 'clipboard';
	export default {
		data() {
			return {
				cid: this.$route.params.cid,
				isKeep:this.$route.params.isKeep,
				banner: [],
				info  : {},
				goodsList: [],
				check : [],
				original: 0,
				isLogin: '',
				wxSystem: this.$store.state.publicJS.wxSystem,
				signPackage: {},
        isBack:false,
        is_vip: false,
        bfUrl:'',
        isWx:'',
        isShare:false,
        link:'',
        scroll:null,
        clipboard:null,
			}
		},
		methods: {
			ajaxFun: function(cid) {
				suitDet(cid).then(data => {
					if (data.code == -1) {
						this.$store.state.publicJS.promptBoxMsg = data.msg;
						this.$store.commit('txtPrompt');
						setTimeout(() => {
							this.$store.commit('txtPrompt');
							this.$router.go(-1);
						},1000);
						return;
					}
					for (var i = 0; i < data.suitInfo.picture.length; i++) {
						this.banner.push(data.suitInfo.picture[i]);
					}
					for (var i = 0; i < data.goodsList.length; i++) {
						this.goodsList.push(data.goodsList[i]);
						//this.check.push(data.goodsList[i].goods_id);
					}
					this.isLogin = data.islogin;
					this.checkPush();
					this.info = data.suitInfo;
          this.original = data.suitInfo.original_price;
					this.is_vip = data.suitInfo.is_vip;
					if (this.wxSystem) {
						this.signPackage = data.signPackage;
						this.wxConfig();
					}
					this.bannerFun();
				});
				suitAddHits(this.cid).then(data => {
				});
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
						title: this_.info.suit_name, // 分享标题
						link: 'http://member.idmei.com/topage?i=index&c=suit&a=suitDet&id='+this_.cid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this_.info.cover, // 分享图标
						success: function () {
							// 用户确认分享后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
					//分享给朋友
					wx.onMenuShareAppMessage({
						title: this_.info.suit_name, // 分享标题
						desc: '大美软装-新零售创意家饰网络平台！', // 分享描述
						link: 'http://member.idmei.com/topage?i=index&c=suit&a=suitDet&id='+this_.cid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this_.info.cover, // 分享图标
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
			picZoomFun: function(img,arrImg,index) {
        var items = new Array();
				let width = document.body.offsetWidth * 2;
				let height = width / 16 * 9;
				if (arrImg) {
					for (var i = 0; i < this.banner.length; i++) {
						items.push({
							src: this.banner[i].picture,
							w  : width,
							h  : height
						});

						if (i == this.banner.length -1) {
							document.getElementById('iosMask').style.display = 'block';
							var pswpElement = document.querySelectorAll('.pswp')[0];
							var options = {
								history: false,
								focus: false,
								showAnimationDuration: 0,
								hideAnimationDuration: 0,
								index: index
							};
							var gallery = new PhotoSwipe(pswpElement,PhotoSwipeUI_Default,items,options);
							gallery.init();
						}
					};
				}else {
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
			},
      txtFun: function(str,time) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },time);
      },
//			shopCollectFun: function(item) {
//				let status = item.goodsCollect == 'Y'?'del':'add';
//				let obj = {'pid':item.product_id,'type':status}
//				shopDetCollect(obj).then(data => {
//					if (data.islogin) {
//						item.goodsCollect = item.goodsCollect == 'Y'?'N':'Y';
//					}else {
//						if (!this.wxSystem) {
//							this.confirmPrompt('请先登陆');
//						}else if (this.wxSystem) {
//							this.confirmPrompt('请先完善资料');
//						}
//					}
//				})
//			},
			suitCollectFun: function(info) {
				let status = info.is_collect == 'Y'?'del':'add';
				let obj = {'sid':info.suit_id,'type':status}
				suitCollect(obj).then(data => {
					if (data.islogin) {
						info.is_collect = info.is_collect == 'Y'?'N':'Y';
					}else {
						if (!this.wxSystem) {
							this.confirmPrompt('请先登陆');
						}else if (this.wxSystem) {
							this.confirmPrompt('请先完善资料');
						}
					}
				})
			},
			confirmPrompt: function(str) {
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
			confirmFun: function() {
				if (!this.isLogin && !this.wxSystem) {
					this.confirmPrompt('请先登陆');
					return;
				}else if (!this.isLogin && this.wxSystem) {
					this.confirmPrompt('请先完善资料');
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
				let sid = this.info.suit_id;
				if (this.check.length >= this.choiceNum) {
					this.$router.push({ name: '立即结算', params: { carts:arrStr,sid: sid }});
				}else {
					this.$store.state.publicJS.promptBoxMsg = '至少选择'+this.choiceNum+'种商品';
					this.$store.dispatch('alertPrompt');
				}
			},
			checkPush: function() {//push数据进check
				this.check = [];
				let goodsList = this.goodsList;
				for (var i = 0; i < goodsList.length; i++) {
					this.check.push(goodsList[i].goods_id);
				}
			},
			allCheckFun: function() {//全选按钮
				if (this.allChecked) {
					this.check = [];
				}else {
					this.checkPush();
				}
			},
      backFun:function(){
        if(this.bfUrl==null){
          this.$router.push('/index');
        }else{
          this.isBack=true;
          bus.$emit("isBack",this.isBack);
          this.$router.go(-1);
        }
      },
      shareFun:function(type){
        var id = this.cid;
        var imgUrl= this.info.cover;
        var title = this.info.suit_name;
        if(type=='wx') {
          this.isShare=false;
          this.scroll. beforeClose();
          window.appModel.postMessage(JSON.stringify({
            "funName":'share',
            "platform":'wechat',
            "title":title,
            "url" :'member.idmei.com/topage?i=index&c=suit&a=suitDet&id='+id,
            "imageUrl":imgUrl,
            "text":"大美软装-新零售创意家饰网络平台！"
          }))
        }else if(type=='circle'){
          this.isShare=false;
          this.scroll. beforeClose();
          window.appModel.postMessage(JSON.stringify({
            "funName":'share',
            "platform":'wechatMoments',
            "title":title,
            "url" :'member.idmei.com/topage?i=index&c=suit&a=suitDet&id='+id,
            "imageUrl":imgUrl,
            "text":"大美软装-新零售创意家饰网络平台！"
          }))
        }
      },
      share:function(){
        this.isShare=true;
        this.scroll.afterOpen();
      },
		},
		computed: {
			allChecked: function() {
				let suitShopLen = this.goodsList.length;//套装商品长度
				let choiceLen   = this.check.length;//选择的长度
				return suitShopLen == choiceLen;
			},
			choiceNum: function() {//至少选择件数
				let number = this.goodsList.length;
				let num = 0;
				if (number > 8) {
					num = 5;
				}else {
					num = 3;
				}
				return num;
			},
			money: function() {
				let original = 0;//原价
				let discount = 0;//优惠
				let goodsList = this.goodsList;
				this.check.map((key) => {
					for (var i = 0; i < goodsList.length; i++) {
						if (key == this.goodsList[i].goods_id) {
							original += parseFloat(this.goodsList[i].original_price * this.goodsList[i].num);
							if (this.is_vip) {	//vip价格
								discount += parseFloat(this.goodsList[i].price * this.goodsList[i].num);
							}else {	//非vip
								discount += parseFloat(this.goodsList[i].original_price * this.goodsList[i].num);
							}
						}
					}
				});
				this.original = original
//          .toFixed(2);
				return discount
//          .toFixed(2);
				// if (this.check.length >= this.choiceNum) {
				// }else {
				// 	return original;
				// }
			},
		},
		created() {
			this.ajaxFun(this.cid);
      this.scroll = (function (className) {
        var scrollTop;
        return {
          afterOpen: function () {
            scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop;
            document.body.classList.add(className);
            document.body.style.top = -scrollTop + 'px';
          },
          beforeClose: function () {
            document.body.classList.remove(className);
            document.scrollingElement.scrollTop = scrollTop;
            document.body.scrollTop = scrollTop;
          }
        };
      })('scroll');
    },
    mounted(){
      this.clipboard = new Clipboard('.getCopy');
      this.link='member.idmei.com/topage?i=index&c=suit&a=suitDet&id='+this.cid;
      this.clipboard.on('success', e => {
        this.txtFun('复制链接成功',1000);
      });

      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") { //判断是否为微信浏览器
        this.isWx=true;
      }else{
        this.isWx=false;
      }
      this.$nextTick(function() {
        setTimeout(()=>{
          var back = document.getElementsByClassName('back')[0];
          var icon = document.getElementById('suiticon');
          if(this.isWx){
            var close = document.getElementsByClassName('wxheader')[0].children[0];
            close.onclick = function () {
              back.setAttribute('style', 'top:0rem');
              icon.setAttribute('style', 'top:0rem');
            };
            back.setAttribute('style','top:1.5rem');
            icon.setAttribute('style','top:1.5rem');
          }else{
            back.setAttribute('style','top:0rem');
            icon.setAttribute('style', 'top:0rem');
          }
        },500)
      });
    },
    beforeRouteEnter(to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
      next(vm => {
        vm.bfUrl=from.name;
        if( from.name=='商品详情'){
          vm.$route.meta.keepAlive = true;
        }else{
          vm.$route.meta.keepAlive = false;
        }
      });
    },
    beforeRouteLeave(to, from, next) {
      if(to.name!='商品详情' ){
        this.$route.meta.keepAlive=false;
      }
      next();
    },
    destroyed(){
      this.clipboard.destroy();
    }
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	@import './css/swiper-3.4.2.min.css';
	@import './css/photoswipe.css';
	@import './css/default-skin.css';
	#suitDet {
    .back {
      position: fixed;
      top: 0;
      z-index: 999;
      display: flex;
      width: 1.2rem;
      height: 1.2rem;
      align-items: center;
      justify-content: center;
      .icon-back {
        display: inline-block;
        width: 11px;
        height: 19px;
        background: url(../login/image/back.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    #suiticon {
      position: fixed;
      top: 0;
      right: 0.8rem;
      z-index: 999;
      display: flex;
      width: 1.2rem;
      height: 1.2rem;
      align-items: center;
      justify-content: center;
      >span {
        display: inline-block;
        width: 18px;
        height: 19px;
        background: url(./image/share-ico.png) no-repeat center;
        background-size: 100% 100%;
      }
    }
		.banner {
			position: relative;
			width: 100%;
			.rem(height,421);
			font-size: 0;
			overflow: hidden;
      .panorama{
        color: #fff;
        font-size: 0.35rem;
        background: #D55317;
        position: absolute;
        bottom: 0.5rem;
        right: 0.5rem;
        padding: 0.1rem 0.3rem;
        z-index: 99;
        border-radius: 0.2rem;
      }
			.swiper-slide {
				position: relative;
				width: 100%;
			}
			.swiper-container {
				.rem(height,421);
			}
			img {
				width: 100%;
				.rem(min-height,421);
			}
			.title {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				.rem(padding-top,6);
				.rem(padding-bottom,6);
				.rem(padding-left,25);
				.rem(padding-right,25);
				.rem(font-size,20);
				.rem(line-height,36);
				color: #fff;
				background: rgba(0,0,0,.5);
			}
			.plan {
				position: absolute;
				top: 0;
				right: 0;
				z-index: 50;
				.rem(width,130);
				.rem(height,130);
				.rem(padding-top,30);
				.rem(font-size,24);
				color: #fff;
				text-align: center;
				border-radius: 50%;
				background: rgba(0,0,0,.5);
			}
		}
		.suit-introduce {
			width: 100%;
      padding: 0.5rem 0.4rem;
      line-height:0.7rem;
      font-size:0.40rem;
			color: #616161;
			background: #fff;
		}
		.gray-box-7 {
			width: 100%;
			.rem(height,1);
			background: #eee;
		}
		.info {
			position: relative;
			width: 100%;
			.rem(padding-top,10);
			.rem(padding-bottom,10);
			.rem(padding-left,30);
			.rem(padding-right,30);
			background: #fff;
      border-bottom: 1px solid #E5E5E5;
			.title {
        margin-top: 0.64rem;
        .rem(line-height,20);
        font-size: 0.45rem;
        margin-bottom: 0.1rem;
        margin-left: 0.1rem;
			}
			.like {
				position: absolute;
				top: 0.65rem;
				right: 0.59rem;
				.rem(width,100);
				.rem(height,80);
				.rem(line-height,80);
				> span {
					display: inline-block;
          font-size:0.32rem;
					color: #212121;
					vertical-align: middle;
				}
				.icon-like {
					position: absolute;
					top: 0;
          left: 0.4rem;
          width:0.52rem;
          height:0.44rem;
					background: url(./image/bottom_ico_4_collection.png) no-repeat;
					background-size: 100% 100%;
				}
        .icon-like1 {
          position: absolute;
          top: 0;
          left: 0.4rem;
          width:0.52rem;
          height:0.44rem;
          background: url(./image/bottom_ico_4_collection_state.png) no-repeat;
          background-size: 100% 100%;
        }
			}
      .txt123{
        position: absolute;
        top: 0.14rem;
        left: 0.3rem;
      }
      .likeY{
        left:0.15rem;
      }
			.money {
        display: inline-block;
				.rem(line-height,52);
        font-size: 0.4rem;
        margin-right: 0.33rem;
        .icon-jine{
          .rem(font-size,27);
        }
			}
			.vip-price {
        display: inline-block;
				.rem(line-height,52);
        font-size: 0.4rem;
        color: #ed7631;
        margin-right: 0.1rem;
        padding-top: 0.1rem;
        .vip-icon {
          position: relative;
          top: 0;
          .rem(left,6);
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          background: url(./image/vip_ico_small.png) no-repeat center;
          background-size: 100%,100%;
          vertical-align: middle;
        }
        .icon-jine{
          font-size: 0.4rem;
        }
			}
		}
		.gray-box-17 {
			width: 100%;
			.rem(height,17);
			background-color: #eee;
		}
		.themes {
      margin-top: 0.45rem;
			width: 100%;
			.rem(height,70);
			.rem(line-height,70);
      font-size:0.45rem;
      color:rgba(33,33,33,1);
			text-align: center;
      font-weight: bold;
			background: #fff;
		}
    .themes2{
      width: 100%;
      text-align: center;
      background: #fff;
      font-size:0.4rem;
      color:rgba(194,194,192,1);
      margin-bottom: 0.5rem;
      font-family:ArialMT;
    }
		.list {
      margin-bottom: 1.7rem;
      ul{
        display: flex;
        flex-wrap: wrap;
      }
			li {
				position: relative;
				width: 50%;
				.rem(padding-top,17);
				/*<!--.rem(padding-bottom,30);-->*/
				.rem(padding-left,30);
				.rem(padding-right,28);
				background: #fff;
			}
			.check {
				position: absolute;
				top: 4rem;
				left: 0.2rem;
				.rem(width,70);
				.rem(height,178);
				.rem(line-height,178);
				text-align: center;
				label {
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
          background-size:0.35rem,0.24rem;
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
				.rem(margin-left,-144);
				.rem(padding-left,166);
			}
			.right-top {
				position: relative;
        width: 100%;
				.rem(height,73);
				.rem(padding-top,10);
				.title {
					display: inline-block;
          width: 3.5rem;
          margin-top: 0.1rem;
					.rem(margin-left,26);
          font-size:0.43rem;
					color:#000000;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.right-bottom {
        width: 3.5rem;
        height:0.81rem;
        margin-left: 0.37rem;
				p {
          font-size:0.35rem;
          color:rgba(97,97,97,1);
				}
				.num {
          margin-bottom: 0.1rem;
				}
				.money {

				}
        .icon-jine{
          font-size: .3rem;
        }
			}
			.like {
				position: absolute;
				.rem(top,20);
				.rem(right,5);
				.rem(width,140);
				.rem(height,43);
				.rem(line-height,43);
				text-align: center;
				> span {
					display: inline-block;
					.rem(font-size,24);
					color: #999;
					vertical-align: middle;
				}
				.icon-like {
					.rem(width,30);
					.rem(height,26);
					.rem(margin-right,12);
					background: url(./image/like.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			.like.action {
				.txt {
					color: #d65317;
				}
				.icon-like {
					background-image: url(./image/like_1.png);
				}
			}
		}
		.bottom-box {
			width: 100%;
			.rem(height,98);
		}
		.bottom-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
      height: 1.35rem;
			background: #fff;
      box-shadow: 0 -1px 22px rgba(0,0,0,.2);
			.top {
        border-top: 1px solid #B6B6B6;
				label {
					input {
						position: absolute;
						top: 0;
						left:0;
						.rem(width,97);
						.rem(height,22);
						opacity: 0;
					}
          span {
            position: absolute;
            top: 0.1rem;
            left: 0.35rem;
            display: inline-block;
            border-radius: 50%;
            width:0.57rem;
            height:0.57rem;
            background: #fff;
            border: 1px solid #A8A8A8;
          }
          p{
            position: absolute;
            top: 0.8rem;
            left: 0.3rem;
            color: #616161;
          }
          input:checked+span {
            background: url("image/choose_ico.png") no-repeat center ;
            background-size:0.35rem,0.24rem;
            border: 1px solid #D55317;
          }
				}
			}
      .fl{
        margin-left: 1.5rem;
        margin-top: 0.25rem;
        width: 30%;
        padding-left: 12px;
        border-left: 1px solid #AFAFAF;
        border-right: 1px solid #AFAFAF;
        color: #A8A8A8;
      }
			.fr {
        height: 1.35rem;
				div {
					float: left;
				}
				.discount {
          margin-top: 0.1rem;
					.rem(margin-right,18);
					text-align: right;
					.p2 {
						.rem(margin-top,10);
            font-size:0.43rem;
						color: #EE7421;
						span {
              font-size:0.43rem;
						}
					}
					.p3 {
            font-size:0.29rem;
						color:#AFAFAF;
						text-decoration: line-through;
            .icon-jine{
              font-size:0.29rem;
            }
					}
				}
				.btn {
					width: 94px;
          height: 1.35rem;
          line-height:1.35rem;
					font-size: 14px;
					color: #fff;
					text-align: center;
					background: #D55317;
				}
			}
		}
    .share{
      position: fixed;
      top: 0;
      width: 100%;
      max-width: 640px;
      height: 100%;
      z-index: 9999;
      background: rgba(1,1,1,0.8);
      >.make{
        position: absolute;
        width: 100%;
        height: 7.63rem;
        margin: auto;
        bottom: 0;
        background: #fff;
        >.title{
          position: absolute;
          top: 0.57rem;
          left: 0.48rem;
          font-size:0.45rem;
          color: #000;
        }
        >.icon-close1 {
          position: absolute;
          top: 0.59rem;
          right: 0.44rem;
          width: 0.47rem;
          height: 0.47rem;
          background: url(./image/cancel.png) no-repeat center;
          background-size: 100% 100%;
        }
        >.content {
          position: absolute;
          display: flex;
          flex-wrap: wrap;
          top: 2rem;
          width: 100%;
          padding: 0 0 0 0.87rem;
          > div {
            width: 1.4rem;
            margin-right: 0.85rem;
            margin-bottom: 0.77rem;
            > p {
              font-size: 0.32rem;
              color: #000;
              text-align: center;
            }
            >div{
              width: 1.4rem;
              height: 1.4rem;
              margin-bottom: 0.28rem;
              border-radius: 50%;
            }
            .wx{
              background:url("./image/WeChat-ico.png") no-repeat center #07BE14;
              background-size:0.92rem,0.72rem;
            }
            .circle{
              background:url("./image/moments-ico.png") no-repeat center #EF7665;
              background-size:0.96rem,0.96rem;
            }
            .qq{
              background:url("./image/qq-ico.png") no-repeat center #17ACFC;
              background-size:0.69rem,0.83rem;
            }
            .space{
              background:url("./image/qq-zone-ico.png") no-repeat center #FFC000;
              background-size:0.88rem,0.83rem;
            }
            .sina{
              background:url("./image/weibo-ico.png") no-repeat center #DD4844;
              background-size:0.91rem,0.75rem;
            }
            .copy{
              background:url("./image/link-ico.png") no-repeat center #02C7B6;
              background-size:0.79rem,0.79rem;
            }
          }
        }
      }
    }
	}
</style>
