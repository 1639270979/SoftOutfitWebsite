<template>
  <div id="shopDet" :class="isShowLayer?'noScroll':''" v-if="Object.keys(info).length != 0">
    <div class="shopback" @click="backFun"><span class="icon-back"></span></div>
    <div id="shopicon" ref="myIcon" @click="share"><span></span></div>
    <div class="swiper">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(list,index) in swiperList" @click="picZoomFun(list.thumb.picture,swiperList,index)">
            <img :src="list.thumb">
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="seckill-price" v-if="info.seckill_id / 1 > 0">
      <div class="new-price">
        <span><a>￥</a>{{ goodsMoney }}</span>
      </div>
      <div class="seckill-box">
        <p class="f2">秒杀价</p>
        <p class="old-price">¥{{ info.original_price }}</p>
      </div>
      <div class="time">
        <p class="txt">距结束仅剩</p>
        <div class="end-time">
          <span class="D">{{ day }}</span><a>&nbsp;:</a>
          <span class="H">{{ hour }}</span><a>&nbsp;:</a>
          <span class="M">{{ minute }}</span><a>&nbsp;:</a>
          <span class="S">{{ second }}</span>
        </div>
      </div>
    </div>
    <div class="shop-info">
      <div class="shop-info-top">
        <p class="title">{{ info.product_name }}</p>
        <router-link tag="p" :to="'/index/shop/det/brand/'+info.brand_id" class="brand">品牌：{{info.brand_name}}<span class="icon-right"></span></router-link>
        <!--<div v-if="isVip!=true">-->
          <!--<p :class="isVip==true &&  isLogin==true?'money money2':'money'" v-if="info.seckill_id / 1 == 0">¥&nbsp;{{ goodsMoney }}</p>-->
          <!--<p class="vip-money" v-if="info.seckill_id / 1 == 0 && isVip==true &&  isLogin==true">¥&nbsp;{{ info.vip_price }}<i class="vip-icon"></i></p>-->
        <!--</div>-->
        <!--<div v-else>-->
          <!--<p class="vip-money" v-if="info.seckill_id / 1 == 0 && isVip==true &&  isLogin==true">¥&nbsp;{{ info.vip_price }}<i class="vip-icon"></i></p>-->
          <!--<p :class="isVip==true &&  isLogin==true?'money money2':'money'" v-if="info.seckill_id / 1 == 0">¥&nbsp;{{ goodsMoney }}</p>-->
        <!--</div>-->
        <!--<div class="fill" v-if="info.seckill_id / 1!= 0"></div>-->
        <div class="like" :class="info.is_collect == 'Y' ? 'action' : ''" @click="likeFun">
          <span :class="info.is_collect == 'Y'?'icon-like icon-like1':'icon-like'"></span>
          <p :class="info.is_collect == 'Y'?'txt likeY':'txt '">{{ info.is_collect == 'Y' ? '已收藏' : '收藏' }}</p>
        </div>
      </div>
      <div class="box-gray-8"></div>
    </div>
    <div class="box-gray16"></div>
    <div class="shop-nav">
      <div>
        <div :class="navType==1?'txt txt1':'txt'" @click="navType = 1">商品详情</div>
      </div>
      <div>
        <div :class="navType==2?'txt txt1':'txt'" @click="commentFun">买家评论</div>
      </div>
      <div>
        <div :class="navType==3?'txt txt1':'txt'" @click="navType = 3">相关套装</div>
      </div>
    </div>
    <!--商品详情-->
    <div class="content2" v-show="navType == 1"><img :src="explain_top_img"></div>
    <div class="det_title" v-show="navType == 1">
      <p class="p1">商品详情</p>
      <p class="p2">description</p>
    </div>
    <ul class="shop-info-main"  v-show="navType == 1">
      <li class="li">
        <span class="fl">商品编号：{{ info.product_no }}</span>
        <span class="fr">发货地：{{ info.delivery_place }}</span>
      </li>
      <li class="li">
        <span class="fl">供货周期：{{ info.delivery_time }}天</span>
        <span class="fr">运费：包邮</span>
      </li>
    </ul>
    <!--商品尺寸-->
    <div class="content" v-html="info.content" v-show="navType == 1"></div>
    <div class="content2" v-show="navType == 1" style="margin-top: 1rem"><img :src="explain_down_img"></div>
    <!--退换货说明-->
    <div class="size" v-show="navType == 1"  @click="isSize=!isSize" style="margin-top: 1.13rem">
      <p class="title">{{explain_content[0].name}} <i :class="isSize?'der':'ward'" ></i></p>
      <div v-html="explain_content[0].content" v-show="navType == 1" :class="isSize?'':'head'"></div>
    </div>
    <div class="size" v-show="navType == 1"  @click="isSize1=!isSize1">
      <p class="title">{{explain_content[1].name}} <i :class="isSize1?'der':'ward'" ></i></p>
      <div v-html="explain_content[1].content" v-show="navType == 1" :class="isSize1?'':'head'"></div>
    </div>
    <div class="size" v-show="navType == 1"  @click="isSize2=!isSize2" style="margin-bottom: 1.13rem">
      <p :class="isSize2?'title botton':'title'">{{explain_content[2].name}} <i :class="isSize2?'der':'ward'" ></i></p>
      <div  v-html="explain_content[2].content" v-show="navType == 1" :class="isSize2?'':'head'"></div>
    </div>
    <!-- 相关套餐 -->
    <div class="find-list" v-show="navType == 3" >
      <ul>
        <li v-for="item in comboList">
          <router-link :to="'/index/suit/suitDet/'+item.suit_id">
            <img v-lazy="item.cover">
          </router-link>
          <div class="suit-info">
            <div class="top">
              <p class="title">{{ item.suit_name }}</p>
              <div class="right">
                <div class="like" :class="item.is_collect == 'Y'?'action':''" @click="suitlikeFun(item)">
                  <i class="icon icon-like"></i><span class="txt">{{ item.collection }}</span>
                </div>
                <div class="eye">
                  <i class="icon icon-eye"></i><span class="txt">{{ item.hits }}</span>
                </div>
              </div>
            </div>
            <div class="bottom123">{{ item.description }}</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 买家评价 -->
    <div class="evaluation" v-show="navType == 2">
      <ul>
        <li v-for="list in appraiseListArr">
          <div class="user">
            <div class="img"><img :src="list.headimg"></div>
            <div class="user-info">
              <p class="name">{{list.name}}</p>
              <p class="tiem">{{list.addtime}}</p>
            </div>
            <div class="stars">
              <span v-for="key in 5" :class="key <= list.experience_level?'action':''"></span>
            </div>
          </div>
          <div class="comment">
            <p class="msg">{{list.content}}</p>
            <div class="pic">
              <p class="headimg" v-for="(img,index) in list.picture" @click="comZoom(img,list.picture,index)">
                <!--<img :src="img" v-preview="img">-->
                <img :src="img">
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <myLoading :isLoading='isLoading' :isList="isList1" v-show="navType == 2"></myLoading>
    <myLoading :isLoading='isLoading' :isList="isList" v-show="navType == 3"></myLoading>
    <div class="bottom-box"></div>
    <div class="bottom iphonex-pb">
      <!--<router-link :to="'/index/shop/det/brand/'+info.brand_id" class="shop" tag="div">-->
        <!--<span class="icon-shop"></span>-->
        <!--<p class="txt">品牌</p>-->
      <!--</router-link>-->
      <!--<div class="btn car" @click="layerType=1;isShowLayer=true;scroll.afterOpen();">加入购物车</div>-->
      <div v-if="info.seckill_id / 1 > 0" style="width: 100%;background: #FFF;color: #F18904;border-top: 1px solid #E5E5E5" class="btn buy" @click="layerType=2;isShowLayer=true;scroll.afterOpen();">立即购买</div>
    </div>
    <!-- 收藏&购买弹出层 -->
    <div class="layer" v-show="isShowLayer">
      <div class="mask" @click.self="isShowLayer=false;scroll.beforeClose();"></div>
      <div class="popout animated" :class="isShowLayer?'fadeInTop':'fadeInBottom'">
        <div class="top">
          <div class="img"><img :src="initialImg"></div>

          <div class="shop-info" v-if="isVip!=true">
            <p class="goods-title">{{ info.product_name }}</p>
            <!--<p :class="isVip==true &&  isLogin==true?'money':'money'" v-if="info.seckill_id / 1 == 0">¥&nbsp;{{ goodsMoney }}</p>-->
            <p class="money" v-if="info.seckill_id > 0">¥&nbsp;{{ goodsMoney }}</p>
            <!--<p class="vip-money" v-if="info.seckill_id / 1 == 0 && isVip==true &&  isLogin==true">¥&nbsp;{{ info.vip_price }}<i class="vip-icon"></i></p>-->
          </div>

          <div class="shop-info" v-else>
            <p class="goods-title">{{ info.product_name }}</p>
            <!--<p class="vip-money" v-if="info.seckill_id / 1 == 0 && isVip==true &&  isLogin==true">¥&nbsp;{{ info.vip_price }}<i class="vip-icon"></i></p>-->
            <!--<p :class="isVip==true &&  isLogin==true?'money':'money'" v-if="info.seckill_id / 1 == 0">¥&nbsp;{{ goodsMoney }}</p>-->
            <p class="money" v-if="info.seckill_id > 0">¥&nbsp;{{ goodsMoney }}</p>
          </div>

          <div class="icon-close1" @click="isShowLayer=false;scroll.beforeClose();"><span></span></div>
        </div>
        <div class="number">
          <span class="txt">购买数量</span>
          <p class="store">库存:{{ goodsList[0].store }}</p>
          <div class="right">
            <span class="del" @click="delFun">-</span>
            <span class="add" @click="addFun">+</span>
            <p class="num">{{ num }}</p>
          </div>
        </div>
        <div class="btn" v-if="layerType == 1" @click="addCartFun">确认加入</div>
        <div class="btn" v-if="layerType == 2" @click="buyFun">立即购买</div>
      </div>
    </div>
    <!-- 分享弹窗 -->
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
    <div class="pswp" id="iosMask2" style="display: none;">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar" style="padding-top:20px">
            <div class="pswp__counter" style="top:20px"></div>
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
  import { shopDet,shopDetCollect,shopAddCart,cartConfirm,appraiseList,productExplain,prosuitList,suitCollect} from '../../common/axios/api.js';
  import { WeChatConfig } from '../../common/public/WeChatConfig.js';
  import { iscrollAjax } from '../../common/public/iscroll.js';
  import myLoading from '../loading/Loading.vue';
  import Clipboard from 'clipboard';
  import PhotoSwipe from 'photoswipe';
  export default {
    data () {
      return {
        time    : 0,
        hour    : 23,
        minute  : 59,
        second  : 59,
        day     : 0,
        page: 1,
        pageSize: 15,
        pid: this.$route.params.pid,
        isShowLayer: false,
        info: {},
        swiperList: [],
        isLogin: true,
        navType: 1,
        appraiseListArr: [],
        num: 1,
        layerType: 1,
        goodsList: [],
        gid: '',
        colorNum: 0,
        goodsMoney: 0,
        isLoading: false,
        isList : false,
        isList1: false,
        wxSystem: this.$store.state.publicJS.wxSystem,	//微信
        signPackage: {},		//微信配置
        fid:'',
        explain_down_img:'',
        explain_top_img:'',
        explain_content:[],
        isSize:true,
        isSize1:true,
        isSize2:true,
        comboList:[],
        scroll:null,
        isVip:true,
        isSuit:false,
        sid:'',
        isBack:'',
        isWx:false,
        isShare:false,
        link:'',
        bfUrl:'',
        clipboard:null
      }
    },
    components: {
      myLoading
    },
    methods: {
      //倒计时
      timer: function(intDiff) {
        var time = setInterval(() => {
          var day=0,
            hour = 0,
            minute = 0,
            second = 0;
          if (intDiff > 0) {
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          }
          if (intDiff == 0) {
            clearInterval(time);
          }
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          if (day <=9) day ='0'+day;
          this.day = day;
          this.hour   = hour;
          this.minute = minute;
          this.second = second;
          intDiff--;
        }, 1000);
      },
      iscroll: function() {
        iscrollAjax(() => {
          if (this.isLoading && this.navType == 2) {
            this.isLoading = false;
            let obj = {'page':this.page,'pageSize':this.pageSize,'pid':this.pid}
            this.appraiseFun(obj);
          }
        });
      },
      ajaxFun: function() {
        shopDet(this.pid).then(data => {
          if (data.code == -1) {
            this.txtFun(data.msg,1000);
            setTimeout(() => {
              this.$router.go(-1);
            },1000);
            return;
          }
          this.time = data.info.remainTime;
          this.hour = Math.floor(this.time / (60 * 60));
          this.minute = Math.floor(this.time / 60)- (this.hour * 60);
          this.second = Math.floor(this.time)- (this.hour * 60 * 60) - (this.minute * 60);
          this.isLogin = data.isLogin;
          this.isVip = data.is_vip;
          if (data.picInfo) {
            this.swiperList = data.picInfo;
          }
          if (data.info) {
            this.info = data.info;
            this.gid = data.info.goods_list[0].goods_id;
            this.goodsMoney = data.info.price;
            this.goodsList = data.info.goods_list;
          }
          if (this.wxSystem) {
            this.signPackage = data.signPackage;
            this.wxConfig();
          }
          this.swiperFun();
          this.timer(data.info.remainTime);
        });
        productExplain().then(data=>{
            if(data.code){
              this.explain_content = data.explain_content;
              this.explain_top_img = data.explain_top_img;
              this.explain_down_img = data.explain_down_img;
            }
        });
        let obj = {'pid':this.pid,'page':this.page,'pageSize':this.pageSize};
        prosuitList(obj).then(data=>{
          if(data.code){
            if(data.suitList.length==0){
              this.isLoading=false;
              this.isList = false;
            }else{
              this.isList=true
            }
              this.comboList=data.suitList;
            }
        });
      },
      commentFun: function() {
        this.navType = 2;
        this.page = 1;
        this.appraiseListArr = [];
        let obj = {'page':this.page,'pageSize':this.pageSize,'pid':this.pid}
        this.appraiseFun(obj);
      },
      appraiseFun: function(obj) {	//用户评价
        appraiseList(obj).then(data => {
          if (data.code == 1) {
            for (var i = 0; i < data.list.length; i++) {
              this.appraiseListArr.push(data.list[i]);
            }
            if(this.appraiseListArr.length==0){
              this.isList1=false
            }else{
              this.isList1=true;
            }
            if (data.list.length < this.pageSize) {
              this.isLoading = false;
            }else {
              this.isLoading = true;
              this.page += 1;
            }
          }
        })
      },
      swiperFun: function() {
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
        };
        WeChatConfig(obj);
        wx.ready(function(){
          //分享朋友圈
          wx.onMenuShareTimeline({
            title: this_.info.product_name, // 分享标题
            link: 'http://member.idmei.com/topage?i=index&c=shop&a=shopDet&id='+this_.pid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: this_.info.picture, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          //分享给朋友
          wx.onMenuShareAppMessage({
            title: this_.info.product_name, // 分享标题
            desc: '大美软装-新零售创意家饰网络平台！', // 分享描述
            link: 'http://member.idmei.com/topage?i=index&c=shop&a=shopDet&id='+this_.pid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: this_.info.picture, // 分享图标
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
      shareFun:function(type){
        var id = this.pid;
        var imgUrl= this.swiperList[0].picture;
        var title = this.info.product_name;
        if(type=='wx') {
          this.isShare=false;
          this.scroll. beforeClose();
         window.appModel.postMessage(JSON.stringify({
           "funName":'share',
           "platform":'wechat',
           "title":title,
           "url" :'member.idmei.com/topage?i=index&c=shop&a=shopDet&id='+id,
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
           "url" :'member.idmei.com/topage?i=index&c=shop&a=shopDet&id='+id,
           "imageUrl":imgUrl,
           "text":"大美软装-新零售创意家饰网络平台！"
         }))
       }
      },
      delFun: function() {
        if (this.num > 1) {
          this.num --;
        }
      },
      addFun: function() {
        if (!(this.num >= this.info.store)) {
          this.num ++;
        }else {
          this.txtFun('该商品库存不够',1000);
        }
      },
      likeFun: function() {
        let type = this.info.is_collect == 'Y' ? 'del' : 'add';
        if (!this.isLogin && !this.wxSystem) {
          this.confirmPrompt('请先登陆');
          return
        }else if (!this.isLogin && this.wxSystem) {
          this.confirmPrompt('请先完善资料');
          return
        }
        let obj = {'pid':this.pid,'type':type}
        shopDetCollect(obj).then(data => {
          if (data.islogin) {
            this.info.is_collect = this.info.is_collect == 'Y' ? 'N' : 'Y';
          }
        })
      },
      suitlikeFun: function(item) {
        let status = item.is_collect == 'Y'?'del':'add';
        let obj = {'sid':item.suit_id,'type':status}
        suitCollect(obj).then(data => {
          if (data.islogin == false) {
            if (this.wxSystem) {
              this.confirmPrompt('请先完善资料','去完善');
              return;
            }
            this.confirmPrompt('请先登陆','去登陆');
          }else {
            item.is_collect = item.is_collect == 'Y'?'N':'Y';
            if (item.is_collect == 'N') {
              item.collection --
            }else {
              item.collection ++
            }
          }
        });
      },
      addCartFun: function() {
        let num = new Object;
        num[this.gid] = this.num;
        let obj = {gid:this.gid,num:num};
        shopAddCart(obj).then(data => {
          this.isShowLayer = false;
          this.scroll.beforeClose();
          if (data.code > 0) {
            if(data.has_cart.length==0){
              this.$store.commit('iconPrompt');
              setTimeout(() => {
                this.$store.commit('iconPrompt');
              },1500);
            }else if(data.has_cart.length>0){
              this.goodsList.map((key)=>{
                  key.goods_name=this.info.product_name;
                  key.num = this.num;
              });
              this.$store.commit('isExistShopCartShow',this.goodsList);
              this.scroll.afterOpen();
            }
          }
        })
      },
      buyFun: function() {	//立即购买
        if (!this.isLogin && !this.wxSystem) {
          this.confirmPrompt('请先登陆');
          return
        }else if (!this.isLogin && this.wxSystem) {
          this.confirmPrompt('请先完善资料');
          return
        }
        if (this.info.store >= this.num) {
          if (this.info.seckill_id > 0) {
            this.scroll.beforeClose();
            let carts = this.gid +'|'+ this.num;
            this.$router.push({ name: '秒杀立即结算', params: { carts: carts}})
            return;
          }
          let carts = this.gid +'|'+ this.num;
          this.$router.push({ name: '立即结算', params: { carts: carts,sid: ' ',cid: ' ' }})
        }else {
          this.isShowLayer = false;
          this.scroll.beforeClose();
          this.txtFun('库存不够',1000);
        }
      },
      txtFun: function(str,time) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },time);
      },
      confirmPrompt: function(str) {
        this.$store.state.publicJS.promptBoxMsg = str;
        if (this.wxSystem) {
          this.$store.state.publicJS.confirmPromptBtnRight = '去完善';
        }else {
          this.$store.state.publicJS.confirmPromptBtnRight = '去登录';
        }
        this.$store.commit('confirmPrompt');
      },
      goLoginFun: function() {
        let url = this.$route.path;
        window.localStorage.setItem('url',url);
        if (this.wxSystem) {
          this.$router.push({path:'/login/perfect'});
          return;
        }
        this.$router.replace({path:'/login'});
      },
      backFun:function(){
          if(this.bfUrl==null){
            this.$router.push('/index');
          }else{
            this.$router.go(-1);
          }
      },
      share:function(){
        this.isShare=true;
        this.scroll.afterOpen();
      },
      picZoomFun: function(img,arrImg,index) {
        var items = new Array();
        let width = document.body.offsetWidth * 2;
        let height = width / 16 * 16;
        if (arrImg) {
          for (var i = 0; i < this.swiperList.length; i++) {
            items.push({
              src: this.swiperList[i].picture,
              w  : width,
              h  : height
            });
            if (i == this.swiperList.length -1) {
              document.getElementById('iosMask2').style.display = 'block';
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
          document.getElementById('iosMask2').style.display = 'block';
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
      comZoom:function(img,arrImg,index){
        var items = new Array();
        let width = document.body.offsetWidth * 2;
        let height = width / 16 * 16;
        if (arrImg) {
          for (var i = 0; i < arrImg.length; i++) {
            items.push({
              src: arrImg[i],
              w  : width,
              h  : height
            });
            if (i == arrImg.length -1) {
              document.getElementById('iosMask2').style.display = 'block';
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
          document.getElementById('iosMask2').style.display = 'block';
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
      }
    },
    computed: {
      initialImg: function() {
        let arr = this.goodsList;
        let url = '';
        arr.forEach((val) => {
          if (val.goods_id == this.gid) {
            url = val.picture;
          }
        });
        return url;
      }
    },
    created() {
      this.iscroll();
      this.ajaxFun();
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
      this.link='member.idmei.com/topage?i=index&c=shop&a=shopDet&id='+this.pid;
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
            var back = document.getElementsByClassName('shopback')[0];
            var icon = document.getElementById('shopicon');
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
              icon.setAttribute('style','top:0rem');
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
      });
    },
    beforeRouteLeave(to, from, next) {

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
  #shopDet {
    width: 100%;
    max-width: 640px;
    overflow-x: hidden;
    padding-bottom: 1rem;
    .shopback {
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
        background: url(../login/image/back.png) no-repeat center;
        background-size: 100% 100%;
      }
    }
    #shopicon {
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
    .swiper {
      position: relative;
      width: 100%;
      .rem(height,750);
      /*overflow: hidden;*/
      img {
        width: 100%;
        .rem(min-height,750);
      }
      .swiper-slide {
        .rem(height,750);
      }
    }
    .seckill-price {
      position: relative;
      width: 100%;
      height:1.17rem;
      color: #fff;
      background:#F18904;
      background: url('./image/ee4.jpg') no-repeat;
      background-size:100% 100%;
      .new-price{
        display: inline-block;
        height:1.17rem;
        padding-left: 0.7rem;
        padding-right: 0.25rem;
        position: relative;
        span{
          font-size:0.7rem;
          color:rgba(255,255,255,1);
          line-height:1.3rem;
          a{
            position: absolute;
            top: 0.1rem;
            left: 0.35rem;
            font-size: 0.4rem;
            color:rgba(255,255,255,1);
          }
        }
      }
      .seckill-box{
        position: relative;
        top:0.05rem;
        display: inline-block;
      }
      .f2{
        text-align: center;
        font-size:0.24rem;
      }
      .old-price {
        text-align: center;
        font-size:0.24rem;
        text-decoration: line-through;
      }
      .time {
        position: absolute;
        top: 0;
        right: 0;
        width: 3.87rem;
        height:1.17rem;
        /*background: url(./image/time.png) no-repeat;*/
        /*background-size: 100% 100%;*/
        .txt {
          position: absolute;
          top: 0.13rem;
          left:1.41rem;
          color: #000;
          font-size:0.32rem;
        }
        .end-time {
          position: absolute;
          top: 0.58rem;
          left: 0.85rem;
          span {
            display: inline-block;
            background:rgba(0,0,0,1);
            border-radius:0.1rem;
            font-size:0.25rem;
            text-align: center;
            padding: 0.04rem  0.05rem;
          }
          a{
            /*margin-left: 0.1rem;*/
          }
        }
      }
    }
    .shop-info {
      .shop-info-top {
        position: relative;
        .rem(padding-top,24);
        .rem(padding-left,28);
        .title {
          margin-top: 0.4rem;
          .rem(line-height,20);
          font-size:0.45rem;
          letter-spacing: 1.4px;
        }
        .brand{
          width: 5rem;
          font-size:0.4rem;
          padding-top: 0.31rem;
          padding-bottom: 0.3rem;
          font-weight:400;
          color:rgba(0,0,0,1);
          .icon-right {
            position: relative;
            display: inline-block;
            top: 0.05rem;
            left: 0.21rem;
            width: 0.21rem;
            height: 0.39rem;
            background: url(./image/right.png) no-repeat center;
            background-size: 100% 100%;
          }
        }
        .fill{
          width: 100%;
          height: 0.1rem;
          margin-bottom: 0.5rem;
        }
        .money {
          display: inline-block;
          margin-right: 0.2rem;
          margin-top: 0.35rem;
          margin-bottom: 0.3rem;
          color: #ed7631;
          font-size:0.4rem;
        }
        .money2{
          text-decoration: line-through;
          color: #7A7A79;
        }
        .vip-money {
          display: inline-block;
          font-size:0.4rem;
          color: #ed7631;
          margin-right: 0.1rem;
          /*border: 1px solid red;*/
          .vip-icon {
            position: relative;
            .rem(top,-1);
            .rem(left,0);
            display: inline-block;
            width: 0.5rem;
            height: 0.4rem;
            background: url(./image/vip_ico_small.png) no-repeat center;
            background-size: 0.42rem,0.3rem;
            vertical-align: middle;
          }
        }
        .like{
          position: relative;
          /*border: 1px solid red;*/
          margin-top: -1.3rem;
          margin-left: 8.4rem;
          width: 16%;
          .rem(height,100);
          align-items: center;
          flex-direction: column;
          justify-content: center;
          background: #fff;
        }
        .icon-like {
          position: absolute;
          top: 0;
          left: 0.02rem;
          display: inline-block;
          .rem(width,44);
          .rem(height,40);
          background: url(./image/bottom_ico_4_collection.png) no-repeat;
          background-size: 100% 100%;
        }
        .icon-like1 {
          background-image: url(./image/bottom_ico_4_collection_state.png);
        }
        .txt {
          position: absolute;
          top: 0.5rem;
          left: 0;
          .rem(margin-top,12);
          .rem(line-height,20);
          .rem(font-size,23);
          color: #666;
          font-weight: bold;
        }
        .likeY{
          left:-0.15rem;
        }
      }
      .box-gray-8 {
        width: 100%;
        .rem(height,1);
        background: #eee;
      }
      .shop-color-main{
        border-top:1px solid #eee ;
        width: 100%;
        .title{
          margin-top: 10px;
          font-size: 0.35rem;
          margin-left: 15px;
        }
        .color{
          margin:10px 0;
          .box{
            margin-left: 13px;
            display: inline-block;
            width: 40px;
            height: 40px;
            border: 1px solid #eee;
            div{
              margin: 0.1rem auto;
            }
          }
          .box1{
            border: 1px solid #000;
          }
        }
        .mode{
          width: 100%;
          .san{
            margin:10px 15px;
            width: 41%;
            height: 40px;
            display: inline-block;
            border: 1px solid #eee;
            line-height:40px;
            div{
              text-align: center;
            }
          }
          .san1{
            border:1px solid #000;
          }
        }
      }
    }
    .box-gray16 {
      width: 100%;
      .rem(height,16);
      background-color: #eee;
    }
    .shop-nav {
      width: 100%;
      display: flex;
      justify-content: space-around;
      > div {
        margin: 0.48rem 0 0.48rem 0;
      }
      .txt {
        display: inline-block;
        padding: 0.1rem 0;
        font-size:0.4rem;
        color: #212121;
      }
      .txt1{
        color: #F18904;
        border-bottom: 1px solid #F18904;
      }
    }
    .det_title{
      width: 100%;
      padding-left: 0.6rem;
      margin-top: 1.08rem;
      .p1{
        font-size:0.45rem;
        color:rgba(33,33,33,1);
        letter-spacing: 0.11rem;
      }
      .p2{
        font-size:0.4rem;
        color:rgba(194,194,192,1);
      }
    }
    .shop-info-main {
      width: 95%;
      margin:auto;
      border-bottom:1px solid #E5E5E5 ;
      padding-bottom: 1rem;
      margin-bottom: 0.5rem;
      li {
        position: relative;
        width: 100%;
        font-size:0.35rem;
        color:rgba(97,97,97,1);
        margin: auto;
        .rem(height,52);
        .rem(padding-left,28);
        .rem(padding-right,80);
        .rem(line-height,70);
        overflow: hidden;
      }
    }
    .content {
      font-size: 0;
      img {
        width: 100%;
        height: 100%;
        max-width: 100%;
      }
    }
    .content2{
      img{
        width: 100%;
        height: 100%;
      }
    }
    .size{
      width: 100%;
      margin: auto;
      padding-left: 0.41rem;
      .botton{
        border-bottom: 1px solid #e5e5e5;
      }
      .title{
        position: relative;
        width: 9.15rem;
        height: 1.79rem;
        display: inline-block;
        margin: auto;
        line-height: 0.4rem;
        font-size:0.43rem;
        padding: 0.69rem 0;
        border-top: 1px solid #E5E5E5;
        color: #212121;
        .ward{
          background: url("image/upward_arrow.png") no-repeat;
          background-size: 100%,100%;
        }
        .der{
          background: url("image/under_arrow.png") no-repeat;
          background-size: 100%,100%;
        }
        i{
          position: absolute;
          top: 0.69rem;
          right: 0.1rem;
          width:0.5rem;
          height:0.26rem;
        }
      }
      div{
        height: 0;
        overflow: hidden;
        p{
          width: 9.15rem;
          display: inline-block;
          margin: auto;
          font-size:0.35rem;
          color:rgba(101,101,101,1);
          line-height:0.7rem;
          padding-top: 0.4rem;
        }
        p:first-child{
          border-top: 1px solid #e5e5e5;
        }
        P:last-child{
          padding-bottom: 0.4rem;
        }
      }
      .head{
        height:auto;
        overflow: auto;
        transition:width 2s;
        -moz-transition:width 2s; /* Firefox 4 */
        -webkit-transition:width 2s; /* Safari and Chrome */
        -o-transition:width 2s; /* Opera */
      }
    }
    .find-list {
      width: 93%;
      .rem(padding-left,4);
      .rem(padding-right,4);
      overflow: hidden;
      margin: auto;
      li {
        position: relative;
        float: left;
        width: 100%;
        .rem(margin-bottom,27);
        box-shadow: 0px 0px 27px rgba(0,0,0,.1);
        overflow: hidden;
        a {
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        img {
          float: left;
          width: 100%;
        }
      }
      .suit-info {
        width: 100%;
        .rem(padding-top,30);
        .rem(padding-left,30);
        .rem(padding-right,30);
        .rem(padding-bottom,20);
        background: #fff;
        .top {
          position: relative;
          width: 100%;
          .border(border-bottom,1,#eee);
          .title {
            width: 100%;
            .rem(margin-bottom,25);
            .rem(font-size,30);
          }
          .right {
            position: absolute;
            bottom: 0;
            right: 0;
            > div {
              float: right;
              .rem(margin-left,25);
              .rem(line-height,46);
              vertical-align: middle;
            }
            .icon {
              position: relative;
              .rem(top,1);
              display: inline-block;
              .rem(width,25);
              .rem(height,22);
              .rem(margin-right,7);
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
            .icon-eye {
              background-image: url(./image/eye.png);
            }
            .icon-like {
              background-image: url(./image/bottom_ico_4_collection.png);
            }
            .txt {
              display: inline-block;
              .rem(font-size,22);
              color: #333;
            }
            .action {
              .icon-like {
                background-image: url(./image/bottom_ico_4_collection_state.png);
              }
            }
          }
        }
        .bottom123 {
          width: 100%;
          .rem(padding-top,20);
          .rem(line-height,35);
          .rem(font-size,28);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .evaluation {
      .rem(margin-top,10);
      li {
        width: 92%;
        margin: auto;
        .rem(padding-top,20);
        .rem(padding-bottom,20);
        .border(border-bottom,2,#eee);
        background: #fff;
        overflow: hidden;
      }
      .img {
        float: left;
        .rem(width,54);
        .rem(height,54);
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          .rem(min-height,54);
          border-radius: 50%;
        }
      }
      .user {
        position: relative;
        .rem(margin-bottom,24);
      }
      .user-info {
        width: 100%;
        .rem(padding-left,65);
        .name {
          line-height: 12px;
          font-size: 12px;
        }
        .tiem {
          .rem(margin-top,16);
          line-height: 11px;
          font-size: 11px;
          color: #999;
        }
      }
      .stars {
        position: absolute;
        top: 0;
        right: 0;
        >span {
          float: left;
          .rem(width,22);
          .rem(height,22);
          .rem(margin-right,4);
          background: url(./image/icon_star.png) no-repeat;
          background-size: 100% 100%;
          &:last-of-type {
            margin-right: 0;
          }
        }
        .action {
          background: url(./image/icon_star_fill.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .comment{
        display: block;
        .msg {
          line-height: 20px;
          font-size: 11px;
        }
        .pic{
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .headimg{
            width: 32.5%;
            img{
              width: 100%;
            }
          }
        }
      }
    }
    .bottom-box {
      width: 100%;
      .rem(height,98);
    }
    .bottom {
      position: fixed;
      bottom: 0;
      z-index: 150;
      width: 100%;
      max-width: 640px;margin: auto;
      background: #eee;
      overflow: hidden;
      > div {
        float: left;
      }
      .shop {
        display: flex;
        width: 16%;
        .rem(height,98);
        align-items: center;
        flex-direction: column;
        justify-content: center;
        background: #fff;
        border-top: 1px solid #B6B6B6;
      }
      .icon-shop {
        display: inline-block;
        .rem(width,43);
        .rem(height,40);
        background: url(./image/bottom_brand_ico.png) no-repeat;
        background-size: 100% 100%;
      }
      .txt {
        .rem(margin-top,12);
        .rem(line-height,20);
        .rem(font-size,23);
        color: #666;
      }
      .btn {
        width: 42%;
        .rem(line-height,98);
        .rem(font-size,28);
        color: #808080;
        text-align: center;
        background:#D55317;

      }
      .buy{
        color: #F6F6F6;
      }
      .car {
        border-top: 1px solid #B6B6B6;
        background:rgba(246,246,246,1);
      }
    }
    .layer {
      .mask {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 500;
        width: 100%;
        height: 100%;
        background: rgba(102,102,102,.5);
      }
      .popout {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 1000;
        width: 100%;
        height:6.91rem;
        /*border-top-left-radius: 10px;*/
        /*border-top-right-radius: 10px;*/
        background: #fff;
      }
      .top {
        position: relative;
        width: 100%;
        .rem(height,170);
      }
      .img {
        position: absolute;
        .rem(top,-53);
        .rem(left,50);
        .rem(width,188);
        .rem(height,188);
        .border(border,2,#eee);
        background: #fff;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .shop-info {
        width: 100%;
        .rem(padding-top,32);
        .rem(padding-left,260);
      }
      .icon-close1 {
        position: absolute;
        top: 0;
        right: 0;
        .rem(width,90);
        .rem(height,90);
        .rem(line-height,90);
        text-align: center;
        span {
          display: inline-block;
          .rem(width,35);
          .rem(height,35);
          background: url(./image/cancel.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .goods-title {
        margin-bottom: 10px;
        .rem(line-height,20);
        .rem(font-size,35);
        letter-spacing: 1.4px;
        font-weight: bold;
      }
      .money {
        display: inline-block;
        color: #ed7631;
        font-size:0.4rem;
        /*border:1px solid red;*/
      }
      .money2{
        text-decoration: line-through;
        color: #7A7A79;
      }
      .vip-money {
        display: inline-block;
        font-size:0.4rem;
        color: #ed7631;
        margin-right: 0.1rem;
        .vip-icon {
          position: relative;
          .rem(top,-1);
          .rem(left,0);
          display: inline-block;
          width: 0.5rem;
          height: 0.4rem;
          background: url(./image/vip_ico_small.png) no-repeat center;
          background-size: 0.42rem,0.3rem;
          vertical-align: middle;
        }
      }
      .title {
        .rem(padding-left,31);
        .rem(font-size,30);
      }
      .list {
        width: 100%;
        .rem(padding-left,31);
        ul {
          .rem(margin-bottom,40);
          overflow: hidden;
        }
        li {
          float: left;
          .rem(width,198);
          .rem(height,54);
          .rem(margin-top,24);
          .rem(margin-right,30);
          .rem(line-height,54);
          .rem(font-size,28);
          text-align: center;
          .border-radius(30);
          background: #eee;
        }
        .action {
          color: #fff;
          background: -webkit-linear-gradient(left,#ffb04a,#ff9812,#ff9000);
        }
      }
      .number {
        width: 100%;
        .rem(height,70);
        /*<!--.rem(margin-top,100);-->*/
        .rem(padding-left,30);
        .rem(padding-right,33);
        .txt {

          .rem(line-height,70);
          .rem(font-size,28);
        }
        .store {
          float: right;
          .rem(line-height,70);
          .rem(font-size,28);
        }
        .right {
          position: relative;
          width:100%;
          height:1.07rem;
          margin: auto;
          .rem(line-height,44);
          border: 1px solid #D7D7D7;
          span {
            font-size: 0.7rem;
            text-align: center;
            line-height:1.02rem;
            width:1.07rem;
            height:1.05rem;
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
          .del {
            float: left;
            border-right:1px solid #D7D7D7;
            /*background-image: url(./image/del.png);*/
          }
          .add {
            float: right;
            border-left:1px solid #D7D7D7;
            /*background-image: url(./image/add.png);*/
          }
          .num {
            width: 100%;
            font-size:0.48rem;
            line-height: 1.07rem;
            color: #231F20;
            text-align: center;
          }
        }
      }
      .btn {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        .rem(height,100);
        .rem(line-height,100);
        .rem(font-size,30);
        color: #fff;
        text-align: center;
        background: #D55317;
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
    .animated {
      animation-duration: .4s;
      animation-fill-mode: both;
    }
    .fadeInTop {
      animation-name: fadeInTop;
    }
    .fadeInBottom {
      animation-name: fadeInBottom;
    }
    @keyframes fadeInTop {
      from {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
      }
      to {
        transform: none;
      }
    }
    @keyframes fadeInBottom {
      from {
        transform: translate3d(0, 0, 0);
      }
      to {
        transform: translate3d(100%, 0, 0);
      }
    }
  }
</style>
