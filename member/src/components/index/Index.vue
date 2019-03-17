<template>
	<div id="index" v-if="isConfig">
		<div class="banner">
			<div class="swiper-container swiper-container1">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="item in banner">
						<router-link :to="'/find/findDetail/'+item.url+'/1'" v-if="item.type==1"><img :src="item.pic"></router-link>
						<router-link :to="'/index/shop/shopDet/'+item.url+'/1'" v-if="item.type==2"><img :src="item.pic"></router-link>
						<router-link :to="'/index/suit/suitDet/'+item.url+'/1'" v-if="item.type==3"><img :src="item.pic"></router-link>
						<router-link :to="'/index/designer/designerDet/'+item.url+'/1'" v-if="item.type==4"><img :src="item.pic"></router-link>
						<router-link :to="'/myHome/list/myHomeDet/'+item.url+'/1'" v-if="item.type==5"><img :src="item.pic"></router-link>
						<router-link :to="'/index/designer/programmeDet/'+item.url+'/1'" v-if="item.type==6"><img :src="item.pic"></router-link>
						<router-link :to="'/index/shop/det/brandList/brandDet/'+item.url+'/1'" v-if="item.type==7"><img :src="item.pic"></router-link>
						<a :href="item.url" target="_self" v-if="item.type==8"><img :src="item.pic"></a>
						<a v-if="item.type==9"><img :src="item.pic"></a>
					</div>
				</div>
			</div>
      <div class="promise" >
        <router-link to="/index/promise/1" tag="div">
          <i class="icon icon-p1"></i>
          <span>研选产品直供</span>
        </router-link >
        <router-link to="/index/promise/2" tag="div">
          <i class="icon icon-p2"></i>
          <span>5日退换</span>
        </router-link>
        <router-link to="/index/promise/3" tag="div">
          <i class="icon icon-p3"></i>
          <span>一年质保</span>
        </router-link>
        <router-link to="/index/promise/4" tag="div">
          <i class="icon icon-p4"></i>
          <span>线下体验馆</span>
        </router-link>
      </div>
		</div>
    <!--大美分类-->
		<div class="nav product">
      <div class="bg"></div>
			<div class="title" >
				<p class="txt" style="margin-left:0;">大美分类</p>
			</div>
			<ul>
				<router-link to="/index/shopList/1/null" tag="li">
          <div>
            <img src="./image/home_1_sofa.png">
            <p>家具</p>
            <span>让生活多点质感</span>
          </div>
				</router-link>
				<router-link to="/index/shopList/38/null" tag="li">
          <div>
					  <img src="./image/home_2_lamp.png">
					  <p>灯具</p>
            <span>灯是家的温暖</span>
          </div>
				</router-link>
				<router-link to="/index/shopList/44/null" tag="li">
					<img src="./image/home_3_decoration.png">
					<p>装饰品</p>
          <span>装点不一样的家</span>
				</router-link>
				<router-link to="/index/shopList/56/null" tag="li">
          <div>
					  <img src="./image/home_4_carpet.png">
					  <p>地毯</p>
            <span>质感与柔软皆优</span>
          </div>
				</router-link>
				<router-link to="/index/shopList/52/null" tag="li">
          <div>
					  <img src="./image/home_5_wall.png">
            <p>墙面装饰</p>
            <span>点缀家居新面貌</span>
          </div>
				</router-link>
				<router-link to="/index/shopList/63/null" tag="li">
          <div>
					  <img src="./image/home_6_coth.png">
					  <p>布艺</p>
            <span>众多款式一网打尽</span>
          </div>
				</router-link>
			</ul>
		</div>
		<!-- 大美套装 -->
		<div class="suit">
			<div class="title">
				<p class="txt">大美套装</p>
				<div class="right"><router-link  to="/suit/1">查看更多 <i></i></router-link></div>
			</div>
			<div class="swiper-container swiper-container2">
				<div class="swiper-wrapper" id="swiper-container2">
					<div class="swiper-slide"
						v-for="suit in suitList">
						<router-link class="suit-bg" :to="'/index/suit/suitDet/'+suit.suit_id">
							<img :src="suit.cover">
						</router-link>
            <div class="suit-content">
              <span class="name">{{suit.suit_name}}</span>
              <span class="price">￥{{suit.price}}</span>
              <p class="text">{{suit.description}}</p>
            </div>
						<div class="suit-small">
							<ul>
								<li v-for="suitList in suit.goods">
									<router-link :to="'/index/suit/suitDet/'+suit.suit_id">
										<img :src="suitList.picture">
									</router-link>
								</li>
								<li>
									<router-link :to="'/index/suit/suitDet/'+suit.suit_id">
										<div class="box">
											<p class="number">{{ suit.goodsCount }}</p>
											<p class="txt">件商品</p>
										</div>
									</router-link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
    <!-- 大美秒杀 -->
    <div class="seckill" v-if="products.length > 0">
      <div class="bg"></div>
      <div class="title">
        <p class="txt" style="color: #EE7420">双十一特卖秒杀</p>
        <div class="right"><router-link  to="/index/shopList/all/seckill">查看更多 <i></i></router-link></div>
      </div>
      <div class="seckill-bottom" v-if="time > 0">
        <span class="txt">超值精品 限时秒杀</span>
        <div class="trime">
          <span class="txt">剩余时间</span>
          <span class="H">{{hour}}</span>
          <span class="symbol">:</span>
          <span class="M">{{minute}}</span>
          <span class="symbol">:</span>
          <span class="S">{{second}}</span>
        </div>
      </div>
      <div class="seckill-list">
        <ul>
          <li v-for="item in products">
            <router-link :to="{name:'商品详情',params:{pid:item.product_id}}">
              <div class="img" style="position: relative">
                <img v-if="item.sum == 0"src="./image/Sold-Out.png">
                <img v-else src="" v-lazy="item.picture">
                <img src="./image/ee3.jpg" alt="" style="position: absolute;bottom: 0;left: 0.40rem;">
              </div>
              <p class="title1">{{item.price_name}}</p>
              <p class="new">¥{{item.price}} <span class="old">¥{{item.price_market}}</span></p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
		<!-- 签约设计师 -->
		<div class="master">
      <div class="bg"></div>
			<div class="title">
				<p class="txt">华英会-名师定制</p>
				<!--<div class="right"><router-link  to="/index/master/association">查看更多 <i></i></router-link></div>-->
        <div class="right"><router-link  to="/index/myMaster/index">查看更多 <i></i></router-link></div>
			</div>
			<!--<div class="designer-banner">-->
				<!--<div class="swiper-container swiper-container3">-->
					<!--<div class="swiper-wrapper">-->
						<!--<div class="swiper-slide" v-for="lists in masterList">-->
							<!--<div v-for="list in lists" v-if="lists.length > 1">-->
								<!--<router-link :to="{ path: '/index/master/det',query:{mid:list.id}}">-->
									<!--<img :src='list.headimg'>-->
								<!--</router-link>-->
							<!--</div>-->
							<!--<div v-if="lists.length == 1">-->
								<!--<router-link :to="{ path: '/index/master/det',query:{mid:lists[0].id}}">-->
									<!--<img :src='lists[0].headimg'>-->
								<!--</router-link>-->
							<!--</div>-->
							<!--<div v-if="lists.length == 1">-->
								<!--<a>-->
									<!--<img src="./image/white.jpg">-->
								<!--</a>-->
							<!--</div>-->
						<!--</div>-->
					<!--</div>-->
				<!--</div>-->
			<!--</div>-->
      <div  class="designer-banner">
        <router-link tag="div" :class="'img'+index" v-for="(item,index) in eliteList" :to="'/index/myMaster/designerDet/'+item.designer_id">
          <img :src=" item.cover" alt="">
         <div  :class="'box'+index" >
           <p :class="'name'+index" style="font-size: 0.37rem">{{item.name}}</p>
           <p :class="'company'+index">{{item.company}}</p>
         </div >
        </router-link>
      </div>
		</div>
		<!--发现-->
    <div class="find">
      <div class="bg"></div>
      <div class="title">
        <p class="txt">发现</p>
        <div class="right"><router-link  to="/find">查看更多 <i></i></router-link></div>
      </div>
      <ul>
        <li>
          <router-link :to="{ name: '发现详情',params: {id:find.article_id,is_page:2} }">
            <img v-lazy="find.list_pic">
            <span>{{find.title}}</span>
            <p>{{find.brief}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <!--设计师推荐-->
    <div class="design">
      <div class="bg"></div>
      <div class="title">
        <p class="txt">设计师推荐</p>
        <div class="right"><router-link  to="/designer/1">查看更多 <i></i></router-link></div>
      </div>
      <ul>
        <li v-for="item in styList">
          <router-link
            :to="'/index/designer/designerDet/'+item.designer_id"
            class="top"
            tag="div">
            <div class="top-img" v-if="item.homepage_headimg!=''">
              <img :src="item.homepage_headimg">
            </div>
            <div class="top-img" v-else>
              <img src="./image/dsgImg.png">
            </div>
            <div class="nad">
              <span class="name1">{{ item.designer_name}}</span>
              <span class="address1" v-if="item.province != null || item.city != null"> {{ item.province }}&nbsp;{{item.city}}</span>
            </div>
          </router-link>
          <div class="bottom" v-if="item.caseList != ''">
            <div class="right-img" v-for="caseList in item.caseList">
              <router-link
                :to="caseList.type==1?'/index/designer/programmeDet/'+caseList.case_id:'/index/designer/planDet/'+caseList.case_id"
                tag="img"
                v-lazy="caseList.picture"></router-link>
            </div>
            <div class="right-img1" v-if="item.caseList.length == 1">
              <img src="./image/spare.png">
            </div>
          </div>
          <div class="bottom" v-if="item.caseList.length == 0">
            <div class="right-img1">
              <img src="./image/spare.png">
            </div>
            <div class="right-img1">
              <img src="./image/spare.png">
            </div>
          </div>
        </li>
      </ul>
    </div>
		<!-- 切换城市 -->
		<switchover-city
			:areaId="areaId"
			@update:areaId="val => areaId = val"
			@increment="ajaxFun"></switchover-city>
		<confirmPrompt
			@rightBtn="goLoginFun"></confirmPrompt>
	</div>
</template>
<script>
	import { index,getCityNameByLocation,setArea,Homepageconfig } from '../../common/axios/api.js';
	import switchoverCity from './switchoverCity.vue';
	import { WeChatConfig } from '../../common/public/WeChatConfig.js';
	export default {
		data() {
			return {
				products: [],
				banner  : [],
				suitList: [],
				masterList: [],
				styList:[],
        eliteList:[],
				find:[],
				time    : 0,
				hour    : 23,
				minute  : 59,
				second  : 59,
				num     : 0,
				index   : 0,
				areaId  : 440300,
				areaName: '',	//定位名称
				wxSystem: this.$store.state.publicJS.wxSystem,
				signPackage: {},
				isGetWxCity: true,
				swiperBanner: '',
				dsgBanner: '',
        suitBanner:'',
				isConfig: false,
        isLoop:false,
        isKeep:'1'
			}
		},
		methods: {
			//倒计时
			timer: function(intDiff) {
				var time = setInterval(() => {
					var hour = 0,
						minute = 0,
						second = 0;
					this.time = intDiff;
					if (intDiff > 0) {
						hour = Math.floor(intDiff / (60 * 60));
						minute = Math.floor(intDiff / 60)- (hour * 60);
						second = Math.floor(intDiff)- (hour * 60 * 60) - (minute * 60);
					}
					if (intDiff == 0 || this.time == 0) {
						this.time = 0;
						clearInterval(time);
					}
					if (minute <= 9) minute = '0' + minute;
					if (second <= 9) second = '0' + second;
					this.hour   = hour;
					this.minute = minute;
					this.second = second;
					intDiff--;
				}, 1000);
			},
			ajaxFun: function() {
				index().then(data => {
          this.timer(data.remain);
					localStorage.removeItem('coo');
					localStorage.setItem('coo',data.coo);
					this.banner = [];
					this.banner = data.data;
					this.products = data.productList;
					this.suitList = data.suitList;
					this.masterList = data.masterList;
					this.eliteList = data.eliteList;
          this.styList = data.designerList;
          this.find = data.findData;

          this.areaName = this.$store.state.header.cityName = data.k_area_name;
					this.areaId = data.area_id;
					this.$store.state.header.cityId = data.city_id;
					this.$store.state.header.districtId = data.district_id;

					if (this.wxSystem && this.isGetWxCity) {
						this.signPackage = data.signPackage;
						this.wxConfig();
					}
					if (this.swiperBanner != '' || this.dsgBanner != '' || this.suitBanner !='') {
						this.swiperBanner.destroy();
						this.dsgBanner.destroy();
            this.suitBanner.destroy();
					}
					this.bannerFun(data.hp_config);
				})
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
						title: '大美软装', // 分享标题
						link: 'http://member.idmei.com/#/index', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: 'https://member.idmei.com/static/images/logo.png', // 分享图标
						success: function () {
							// 用户确认分享后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
					//分享给朋友
					wx.onMenuShareAppMessage({
						title: '大美软装', // 分享标题
						desc: '大美软装-新零售创意家饰网络平台！', // 分享描述
						link: 'http://member.idmei.com/#/index', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: 'https://member.idmei.com/static/images/logo.png', // 分享图标
						type: '', // 分享类型,music、video或link，不填默认为link
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function () {
							// 用户确认分享后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
					//地理
					wx.getLocation({
						success: function (res) {
							this_.isGetWxCity = false;
							var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
							var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
							getCityNameByLocation({'latitude':latitude,'longitude':longitude}).then(data => {
								if (data.code == 1) {
									if (data.area_id != this_.areaId) {
										this_.areaId = data.area_id;
										this_.areaName = data.city_name;
										this_.$store.state.publicJS.promptBoxMsg = '当前定位为'+data.city_name+',是否切换';
										this_.$store.commit('confirmPrompt');
									}
								}
							})
						},
						cancel: function () {
							//这个地方是用户拒绝获取地理位置
							if (typeof error == "function") {
								error();
							}
						}
					});
				});
			},
			goLoginFun: function() {
				setArea({'area_id':this.areaId}).then((data) => {
					if (data.status) {
						this.$store.state.header.cityName = this.areaName;
						this.ajaxFun();
						window.appModel.postMessage(JSON.stringify({'funName':'cookie','url':'member.idmei.com','cookie':'area_id='+this.areaId}));//调用原生设置cookie
					}
				});
			},
			bannerFun: function(data) {
				this.$nextTick(function () {
          this.layoutFun(data);
					this.swiperBanner = new Swiper ('.swiper-container1', {
            initialSlide :0,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
						loop: true,
						autoplay: 4000,
						speed: 1500,
						autoplayDisableOnInteraction: false,
						effect : 'fade',
						fade: {
							crossFade: true
						}
					});
					this.suitBanner = new Swiper ('.swiper-container2', {
            initialSlide :0,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            loop: true,
						autoplay: 3000,
						//Slides: 'horizontal',
						freeMode : false,	//默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动且不会贴合
						freeModeSticky : true,	//使得freeMode也能自动贴合。
						speed: 300,
						autoplayDisableOnInteraction:false,//用户操作后还能继续滚动
						slidesPerView: 'auto', //容器显示的数量
						centeredSlides: true,  //tue活动块默认状态居中
						spaceBetween: 7 //间距
					});
					this.dsgBanner = new Swiper ('.swiper-container3', {
            initialSlide :0,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
						loop: true,
						autoplay: 3000,
						speed: 300,
						loopAdditionalSlides: 1,	//前后各复制多少个
						autoplayDisableOnInteraction: false,
						effect : 'cube',
						grabCursor: true,
						cube: {
							slideShadows: false,
							shadow: true,
							shadowOffset: 20,
							shadowScale: 0
						}
					});
					if(this.swiperBanner.slides.length <= 3){	//如果只有一张图片就锁住
						this.swiperBanner.lockSwipes();
					}
				});
			},
			layoutFun: function(data) {
          let config = data;
          let arr = [];
          for (let key in config) {
            arr.push({
              sort:config[key].sort,
              is_show:config[key].is_show,
              alias:config[key].alias})
          }
          let dom = document.getElementById('index');
          let elm = '';
          arr.map(val => {
            elm = document.getElementsByClassName(val.alias)[0];
            if (elm) {
              dom.appendChild(elm);
              if (val.is_show == 0) dom.removeChild(elm);
            }
          });
          dom = '';
          elm = '';
          this.isConfig = true;
      }
		},
		components: {
			switchoverCity
		},
    created() {
      this.ajaxFun();
      this.layoutFun();
      window.localStorage.setItem('brandIsInit',true);
      this.$store.state.header.headerCityShow = true;
      window.localStorage.setItem('scrollTop',0);
      var this_ = this;
      window.idmeiLocation = function(obj) {
        if (obj.code == 1) {
          if (obj.area_id != this_.areaId) {
            this_.areaId = obj.area_id;
            this_.areaName = obj.city_name;
            this_.$store.state.publicJS.promptBoxMsg = '当前定位为：'+obj.city_name+',是否切换';
            this_.$store.commit('confirmPrompt');
          }
        }
      }
      window.idmeiMessageList = function(obj) {
        if (obj.push_type == 2) {
          this_.$router.push({path:'/member/messageList'});
        }
      }
    },
		beforeRouteEnter(to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
			// 不！能！获取组件实例 `this`
			// 因为当钩子执行前，组件实例还没被创建
      next(vm => {
				let IndexScroll = window.localStorage.getItem('scrollTop');
				vm.$store.state.header.headerCityShow = true;
        if(from.name=='登录页面'){
          vm.ajaxFun();
          vm.layoutFun();
        }
      });
		},
		beforeRouteLeave(to, from, next) {
      let IndexScroll = document.body.scrollTop || document.documentElement.scrollTop;
      window.localStorage.setItem('scrollTop',IndexScroll);
			this.$store.state.header.headerCityShow = false;
      next();
    },
	}
</script>
<style lang="less" scoped>
  @import '../../assets/mixin.less';
  @import './css/swiper-3.4.2.min.css';
  #index {
    .rem(padding-bottom,38);
    .banner {
      width: 100%;
      overflow: hidden;
      .swiper-container {
        max-height: 5.05rem;
        background: url(./image/banner_bg.jpg) no-repeat;
        background-size: 100%,100%;
      }
      .swiper-slide {
        width: 100%;
      }
      a {
        display: block;
        overflow: hidden;
      }
      img {
        float: left;
        width: 100%;
      }
    }
    .promise {
      width: 100%;
      height: 1.84rem;
      display: flex;
      > div {
        display: inline-block;
        position: relative;
        width: 25%;
        height: 1.84rem;
        span{
          display: inline-block;
          width: 100%;
          height: 1.84rem;
          font-size:0.27rem;
          color: #616161;
          text-align: center;
          padding-top: 1.1rem;
        }
      }
      .icon {
        position: absolute;
        top:-0.2rem;
        width: 100%;
        height: 1.84rem;
      }
      .icon-p1 {
        background: url(./image/home_ico_1_brand@3x.png) no-repeat center;
        background-size: 0.75rem,0.75rem;
      }
      .icon-p2 {
        background: url(./image/home_ico_2_five@3x.png) no-repeat center;
        background-size:0.68rem,0.71rem;
      }
      .icon-p3 {
        background: url(./image/home_ico_3_quality@3x.png) no-repeat center;
        background-size:0.71rem,100%;
      }
      .icon-p4 {
        background: url(./image/home_ico_4_pavilion@3x.png) no-repeat center;
        background-size:0.75rem,0.75rem;
      }

    }
    .nav {
      .title{
        background: #fff;
        .txt {
          text-align: center;
        }
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      li {
        position: relative;
        width: 45%;
        margin-top: 7px;
        margin-bottom: 5px;
        border-bottom:1px solid #E5E5E5;
        &:nth-child(5n),&:nth-child(6n){
          border-bottom: 0;
        }
        img {
          width:1.49rem;
          height:1.6rem;
          margin-left: 0.2rem;
        }
        p {
          position: absolute;
          left: 1.75rem;
          top: 0.4rem;
          font-size: 0.4rem;
          color: #000;
        }
        span{
          position: absolute;
          width: 2.9rem;
          height: 0.5rem;
          left: 1.75rem;
          top:1rem;
          font-size: 0.32rem;
          color: #7A7A79;
        }
      }
    }
  }
  .bg{
    width: 100%;
    height: 5px;
    background: #f6f6f6;
  }
  .title {
    position: relative;
    padding-top: 0.53rem;
    padding-bottom: 0.37rem;
    background: #fff;
    .txt {
      font-size:0.45rem;
      text-align: left;
      margin-left: 0.48rem;
      color: #000;
    }
    .right {
      position: absolute;
      top: 0.6rem;
      right: 0.43rem;
      a {
        font-size:0.36rem;
        color: #616161;
        i{
          display: inline-block;
          width:0.14rem;
          height:0.24rem;
          background: url("image/right_arrow.png") no-repeat;
          background-size: 100%,100%;
        }
      }
    }
  }
  .seckill-list {
    width: 100%;
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    li{
      position: relative;
      width: 50%;
      /*height: 5.3rem;*/
      text-align: center;
      padding-bottom: 1.6rem;
      img{
        width: 84%;
        background: #F6F6F6;
      }
      .title1{
        position: absolute;
        top: 4.40rem;
        left:0.42rem;
        color: #000;
        font-size: 0.43rem;
        margin-top: 0.1rem;
      }
      .new{
        position: absolute;
        top: 5.2rem;
        left: 0.43rem;
        color: #EE7420;
        font-size: 0.35rem;
      }
      .old{
        margin-left: 0.27rem;
        text-decoration: line-through;
        font-size: 0.35rem;
        color: #7A7A79
      }
    }
  }
  .seckill-bottom {
    position: relative;
    margin-bottom: 0.43rem;
    display: flex;
    width: 100%;
    .rem(height,50);
    .rem(padding-left,15);
    font-size: 0.34rem;
    text-align: center;
    color: #7A7A79;
    align-items: center;
    .txt {
      margin-left: 0.25rem;
    }
    .trime{
      position: absolute;
      right: 0.3rem;
      top: 0.14rem;
      .H,.M,.S {
        .rem(min-width,24);
        font-size:0.35rem;
        color: #000;
        .border-radius(5);
        background: #fff;
        padding: 0 0.1rem;
        border: 1px solid #000;
      }
    }
    .symbol {
      .rem(width,15);
      height: 0.4rem;
      line-height: 0.4rem;
    }
  }
  .suit {
    padding-bottom: 0.3rem;
    background: #f9f9f9;
    .title {
      margin: 2px 0;
      background: #f6f6f6;
    }
    .swiper-slide {
      .rem(width,580);
      .rem(min-height,450);
      overflow: hidden;
    }
    .suit-bg {
      display: block;
      .rem(height,326.25);
      overflow: hidden;
      background: url(./image/suit_bg.jpg) no-repeat;
      background-size: 100% 100%;
      img {
        width: 100%;
      }
    }
    .suit-content{
      padding-top: 0.25rem;
      .name{
        padding-left: 0.3rem;
        color: #000000;
        font-size:0.35rem;
        font-weight:bold;
      }
      .price{
        float: right;
        margin-right: 0.3rem;
        color: #D55317;
        font-size:0.24rem;
        font-weight:500;
      }
      .text{
        padding-left: 0.3rem;
        padding-top: 0.2rem;
        color: #797979;
        font-size:0.29rem;
        font-weight:400;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        overflow: hidden;  /** 隐藏超出的内容 **/
      }
    }
    .suit-small {

      ul {
        .rem(margin-top,20);
        overflow: hidden;
      }
      li {
        float: left;
        .rem(width,132);
        .rem(height,132);
        .rem(margin-right,16);
        background: #fff;
        overflow: hidden;
        &:last-of-type {
          margin-right: 0;
          background: #eae9e8;
        }
        a {
          width: 100%;
          display: block;
        }
        img {
          width: 100%;
        }
      }
      .box {
        .rem(padding-top,30);
        color: #4c4948;
        text-align: center;
        .number {
          .rem(font-size,30);
        }
        .txt {
          .rem(font-size,20);
        }
      }
    }
  }
  .master {
    margin-bottom: 0.55rem;
    background: #fff;
    .designer-banner {
      position: relative;
      height: 4.6rem;
      width: 91%;
      margin: auto;
      >div{
        display: inline-block;
        position: absolute;
        >div{
          position: absolute;
          width: 100%;
          bottom: 0.03rem;
          >p{
            color: #fff;
            font-size:0.33rem;
            padding-left: 0.2rem;
            padding-right: 0.2rem;
          }
        }
        >img{
          width: 100%;
          height: 100%;
        }
      }
      .img0{
        left: 0;
        width: 4.6rem;
        height: 4.6rem;
      }
      .img1{
        right: 0;
        width: 4.37rem;
        height: 2.23rem;
        .box1{
          >p{
            text-align: right;
          }
        }
      }
      .img2{
        bottom: 0;
        right: 0;
        width: 4.37rem;
        height: 2.23rem;
        .box2{
          >p{
            text-align: right;
          }
        }
      }
      /*<!--.rem(min-height,297);-->*/
      /*<!--overflow: hidden;-->*/
      /*<!--.swiper-container,.swiper-wrapper {-->*/
        /*<!--width: 100%;-->*/
        /*<!--.rem(height,297);-->*/
      /*<!--}-->*/
      /*<!--.swiper-slide {-->*/
        /*<!--text-align: center;-->*/
        /*<!--overflow: hidden;-->*/
        /*<!--&gt; div {-->*/
          /*<!--display: inline-block;-->*/
          /*<!--width: 44%;-->*/
          /*<!--.rem(min-height,280);-->*/
          /*<!--margin-right: 2%;-->*/
          /*<!--background: url(./image/shop_bg.jpg) no-repeat;-->*/
          /*<!--background-size: 100% 100%;-->*/
          /*<!--&:last-of-type {-->*/
            /*<!--margin-right: 0;-->*/
          /*<!--}-->*/
        /*<!--}-->*/
        /*<!--img {-->*/
          /*<!--width: 100%;-->*/
          /*<!--.rem(min-height,188);-->*/
        /*<!--}-->*/
      /*<!--}-->*/
    }
  }
  .design {
    li {
      position: relative;
      width: 92%;
      margin-left: 0.45rem;
      margin-bottom: 0.43rem;
      .border(border-bottom,2,#eee);
      overflow: hidden;
      > div {
        float: left;
        width: 100%;
      }
    }
    li:last-child{
      border-bottom: 0;
    }
    .top {
      width: 100%;
      height: 100%;
      position: relative;
      margin-bottom: 0.27rem;
    }
    .top-img {
      float: left;
      width: 0.81rem;
      height: 0.81rem;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.21rem;
      img {
        width: 100%;
        min-height: 0.81rem;
      }
    }
    .nad{
      position: absolute;
      top: 0.19rem;
      left: 1rem;
      .name1 {
        font-size: 0.37rem;
        color: #000;
      }
      .address1 {
        width: 100%;
        font-size:0.32rem;
        color: #7D7D7D;
      }
    }
    .right-img {
      display: inline-block;
      width:49%;
      height:2.79rem;
      margin-right: 0.16rem;
      margin-bottom: 0.64rem;
      overflow: hidden;
      background: #F6F6F6;
      img {
        width: 100%;
        min-height: 2.79rem;
      }
      img[lazy=loading]{
        margin-top: -0.8rem;
      }
    }
    .right-img1{
      display: inline-block;
      width:49rem;
      height:2.79rem;
      margin-bottom: 0.64rem;
      overflow: hidden;
      background: #F6F6F6;
      img{
        width: 100%;
        margin-top: -0.8rem;
        min-height: 2.79rem;
      }
    }
    .right-img:last-child{
      margin-right: 0;
    }
  }
  .find {
    li {
      position: relative;
      width: 100%;
      .rem(margin-top,10);
      overflow: hidden;
      &:first-of-type {
        margin-top: 0;
      }
      a {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      img {
        /*float: left;*/
        width: 100%;
        padding: 0 0.48rem;
        margin: auto;
      }
      img[lazy=loading] {
        width: 200px;
        height: 200px;
        display: block;
        margin: 0 2.3rem;
      }
      span {
        width: 100%;
        .rem(height,54);
        .rem(padding-left,30);
        .rem(line-height,54);
        font-size:0.4rem;
        color: #000000;
      }
      p{
        width: 100%;
        padding: 0 0.48rem;
        font-size:0.32rem;
        color:rgba(97,97,97,1);
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        overflow: hidden;  /** 隐藏超出的内容 **/
        margin-bottom: 5px;

      }
    }
  }
  .gary-box {
    width: 100%;
    .rem(height,20);
    background: #f9f9f9;
  }
</style>
