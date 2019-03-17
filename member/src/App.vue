<template>
  <div id="app">
    <!-- 微信头部 -->
    <wxHeader :isWx="iswx"></wxHeader>
    <!-- 标题 -->
    <myBack :title="title"></myBack>
    <!-- 页头 -->
    <myHeader
      :isBack="isBack"
      :isSet="isSet"
      :isMessage="isMessage"
      :isSerch="isSerch"
      :isTitle="isTitle"
      :isHeader="isHeader"></myHeader>
    <div class="header-box" v-if="isHeader"></div>

    <!-- 内容缓存 -->
    <keep-alive>
      <router-view class="child-view" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 内容没有缓存 -->
    <router-view class="child-view" v-if="!$route.meta.keepAlive"></router-view>
    <!-- 页脚 -->
    <div class="footer-box" v-if="isFooter"></div>
    <myFooter :isFooter="isFooter"></myFooter>

    <!-- 提示框 -->
    <alertPrompt></alertPrompt>
    <txtPrompt></txtPrompt>
    <iconPrompt></iconPrompt>
    <pageLoad></pageLoad>
    <!-- 加入购物车重复 -->
    <existShopCart></existShopCart>
    <!-- 返回顶部 -->
    <return-top></return-top>
  </div>
</template>

<script>
  import './assets/flexible.js';
  import myHeader from './components/header/Header.vue';
  import myFooter from './components/footer/Footer.vue';
  import { needLogin } from './common/axios/api.js';
  import { mapGetters } from 'vuex';
  import returnTop from './components/public/top.vue';
  import wxHeader from  './components/header/wxheader.vue';
  import myBack from  './components/header/back.vue'
  export default {
    data() {
      return {
        isBack: false,		//返回按钮
        isSet : false,		//设置按钮
        isSerch: true,		//搜索按钮
        isMessage: false,	//信息按钮
        isFooter: true,
        isHeader: true,
        isTitle : true,
        iswx:false,
        title:'',
      }
    },
    watch: {
      '$route' (to, from) {
        this.isBrowser();//监听路由变化 改变顶部高度
        window.scrollTo(0, 0);
       if (to.name == '收藏' || to.name == '我的' || to.name == '设置' || to.name == '更改密码' || to.name == "订单列表" || to.name == "设计订单" || to.name == "立即结算") {
					needLogin().then(data => {
						if (!data.status && !this.wxSystem) {
							window.localStorage.setItem('url',to.name);
							this.$router.push({path:'/login'});
						}else if (!data.status && this.wxSystem) {
							window.localStorage.setItem('url',to.name);
							this.$router.push({path:'/login/perfect'});
						}
					});
       }
        if (to.path == '/myHome/list/myHomeDet' || to.name == '商品列表' || to.path == '/collection' || to.name == '订单列表' || to.path == '/member/designOrder' || to.path == '/member/set/about' || to.path == '/member/set/changePsw'  || to.path == '/member/adres' || to.name == '品牌页' || to.name == '申请退货' || to.name == '申请换货' || to.name == '退换货详情' || to.name == '我家列表' || to.name == '我家套装详情' || to.name == '订单支付' || to.name == '设计剩余费用'  || to.path == '/login/register' || to.path == '/login/change' || to.path == '/login/perfect' || to.name == '名师订单列表' || to.name == 'vip现金劵' || to.name == 'vip软装设计方案' || to.name == 'vip使用现金劵' || to.name == '消息列表' || to.name == "分多次支付" || to.name == '设计师详情' || to.name == '套装列表' || to.name=='发现') {
          document.body.style.backgroundColor = '#eee';
        }else {
          document.body.style.backgroundColor = '#fff';
        }
        if(to.path == '/index'){
          this.isBack = false;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = true;
          this.isTitle = true;
          this.title='';
        }else if (to.path == '/find' ) {
          this.isBack = true;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = false;
          this.title='发现';
        }else if (to.path == '/suit/2' ) {
          this.isBack = false;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = true;
          this.isTitle = false;
          this.title='套装';
        }else if (to.path == '/designer/2' ) {
          this.isBack = false;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = true;
          this.isTitle = false;
          this.title='设计师';
        }else if(to.path == '/collection'){
          this.isBack = true;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = false;
          this.title='收藏';
        }else if ( to.path == '/myHome'){
          this.isBack = false;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = true;
          this.isTitle = false;
          this.title='我家';
        }else if(to.name == '商品详情' ){
          this.isBack = false;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = false;
          this.title='商品介绍';
        }else if(to.name == '发现详情' ){
          this.isBack = false;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = true;
          this.title='';
        }else if(to.name == '套装详情'){
          this.isBack = false;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = false;
          this.title='套装介绍';
        }else if(to.path == '/member/messageList'){
          this.isBack = true;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = true;
          this.isTitle = false;
          this.title='系统消息';
        }else if(to.name == '请他做设计'){
          this.isBack = true;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = false;
          this.title='设计需求';
        } else if (to.name == 'H5单页' || to.name == '领取优惠券') {
          this.isFooter = false;
          this.isHeader = false;
          this.title='';
        }else if (to.path == '/member') {
          this.isBack = false;
          this.isSet = true;
          this.isSerch = false;
          this.isFooter = true;
          this.isHeader = true;
          this.isTitle= false;
          this.title='我的';
        }else if (to.path == '/member/set') {
          this.isBack = true;
          this.isSet = false;
          this.isSerch = false;
          this.isFooter =  false;
          this.isTitle = true;
          this.title='';
        }else if(to.path=='/login' || to.name=='微信注册' || to.name=='微信设计师' || to.name=='微信合伙人' || to.name=='微信供应商'){
          this.isBack = false;
          this.isSet = false;
          this.isSerch = false;
          this.isFooter =  false;
          this.isTitle = false;
          this.isHeader = false;
          this.title='';
          this.isWx=false;
          var app = document.getElementById('app');
          var header = document.getElementById('header');
          app.setAttribute('style', 'padding-top: 0');
          header.setAttribute('style','display: none');
        }else if(to.name =='搜索'){
          this.isBack = false;
          this.isSet = false;
          this.isSerch = false;
          this.isHeader = false;
          this.isFooter =  false;
          this.isTitle = false;
          this.title='';
        }else if(to.name =='订单详情'){
          this.isBack = false;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter =  false;
          this.isTitle = true;
          this.title='';
        }else if(to.name =='订单列表'){
          this.isBack = false;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter =  false;
          this.isTitle = true;
          this.title='';
        }else if(to.name == '新华英会'){
          this.isBack = true;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = false;
          this.title='华英会';
        }else if(to.name == '联合发起人'){
          this.isBack = true;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = false;
          this.title='联合发起人介绍';
        }else if(to.path == '/index/myMaster/apply/1'){
          this.isBack = true;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = false;
          this.title='设计师会员申请';
        }else if(to.path == '/index/myMaster/apply/2'){
          this.isBack = true;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = false;
          this.title='品牌会员申请';
        }else if(to.name == '设计驱动'){
          this.isBack = false;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = false;
          this.title='设计驱动';
        }else if(to.name == '我要报名'){
          this.isBack = true;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = false;
          this.title='我要报名';
        }else if(to.name == '作品详情'){
          this.isBack = false;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = false;
          this.title='';
        }else if(to.name == '延迟通知'){
          this.isBack = true;
          this.isSet = false;
          this.isSerch = false;
          this.isHeader = true;
          this.isFooter = false;
          this.isTitle = false;
          this.title='延迟通知';
        }else if(to.name == '套装全景图') {
          this.isBack = false;
          this.isSet = false;
          this.isSerch = false;
          this.isHeader = false;
          this.isFooter = false;
          this.isTitle = false;
          this.title = '';
        }else if(to.name == '双十一'){
          var u = navigator.userAgent;
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          if(isiOS){
            this.isBack = false;
            this.isSet = false;
            this.isSerch = false;
            this.isHeader = false;
            this.isFooter = false;
            this.isTitle = false;
            this.title='';
          }else{
            this.isBack = false;
            this.isSet = false;
            this.isSerch = true;
            this.isHeader = true;
            this.isFooter =  false;
            this.isTitle = true;
            this.title='';
          }
        }else if(to.name == '微信双十一' || to.name== '完善资料') {
          this.isBack = false;
          this.isSet = false;
          this.isSerch = false;
          this.isHeader = false;
          this.isFooter = false;
          this.isTitle = false;
          this.title='';
          this.iswx=false;
          var app = document.getElementById('app');
          var header = document.getElementById('header');
          app.setAttribute('style', 'padding-top: 0');
          header.setAttribute('style','display: none');
        }else{
          this.isBack = true;
          this.isSet = false;
          this.isSerch = true;
          this.isHeader = true;
          this.isFooter =  false;
          this.isTitle = true;
          this.title='';
        }
      },
    },
    methods:{
      isBrowser(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") { //判断是否为微信浏览器
          this.iswx=true;
        }else{
          this.iswx=false;
        }
        if(this.iswx){
          var app = document.getElementById('app');
          var back = document.getElementById('back');
          var header = document.getElementById('header');
          app.setAttribute('style', 'padding-top: 1.5rem');
          back.setAttribute('style','top:1.5rem');
          header.setAttribute('style','top:1.5rem');
        }
      },
    },
    components: {
      myHeader,
      myFooter,
      returnTop,
      wxHeader,
      myBack
    },
    computed: {
      ...mapGetters([
        'wxSystem'
      ])
    },
    created() {
			var this_ = this;
			(function init() {
				//********判断是否微信浏览器
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					this_.$store.commit('isWeChat');
					window.localStorage.setItem('source',3);
				}
				//*********判断是否安装微信
				var message = {'funName':'isWXInstalled'};
				let isAndroid = window.navigator.appVersion.match(/android/gi);
				let isIPhone = window.navigator.appVersion.match(/iphone/gi);
				if (isAndroid) {
					window.appModel.postMessage(JSON.stringify(message));//发给安卓
				}else if (isIPhone) {
					// AppModel就是已经注入的名称，注入以后，就可以在JS端调用了
					window.webkit.messageHandlers.AppModel.postMessage(message);//发给IOS
				}
			})();

			window.getInfoFromNative = function(returnStr) {//原生调用
				let obj = JSON.parse(returnStr);
				if (obj.funName == 'isWXInstalled') {
					if (obj.code == 0) {
						//安装
						window.localStorage.setItem('install_WeCath',true);
					}else {
						//未安装
						window.localStorage.setItem('install_WeCath',false);
					}
				}else if (obj.funName == 'location') {
					setTimeout(() => {
						window.idmeiLocation(obj);
					},500)
				}else if (obj.funName == 'messageList') {
					window.idmeiMessageList(obj);
				}
			}

    },
  }
</script>
<style lang="less" scoped>
  @import './assets/mixin.less';
  .header-box {
    width: 100%;
    height: 1.2rem;
  }
  .footer-box {
    width: 100%;
    height: 1.2rem;
  }
</style>
