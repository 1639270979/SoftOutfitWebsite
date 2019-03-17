<template>
  <div id="eleven">
    <div class="elevenback" v-if="!isiOS" @click="backFun"><span class="icon-back"></span></div>
    <div class="top-pic">
      <img src="./img/top-pic-1.png" alt="">
    </div>
    <div class="img">
      <img src="./img/200.png" alt="" style="margin-top: 0.47rem">
      <img src="./img/500.png" alt="">
      <img src="./img/1000.png" alt="">
      <img src="./img/100.png" alt="" v-if="is_new">
    </div>
    <div class="info">
      <div v-if="isGet" class="btn" @click="btnFun">立即领取</div>
      <div v-else="!isGet" class="btn btn2">已领取</div>
    </div>
    <div class="text">
      <p class="title">规则说明：</p>
      <p class="txt">•&nbsp;每个会员只可领取一次；</p>
      <p class="txt">•&nbsp;会员可领三种类型的满减券，新注册会员除领用满减券，<br>&nbsp;&nbsp;还能领一张现金券；</p>
      <p class="txt">•&nbsp;同一订单，现金券和满减券不可叠加使用。</p>
    </div>
    <div class="popup" v-if="isShow">
      <div class="mask">
        <p class="title">领取成功</p>
        <span class="tex">请到“我的优惠券”查看</span>
        <div class="roger" @click="rogerFun">知道了</div>
      </div>
    </div>
    <confirmPrompt @rightBtn="goLoginFun"></confirmPrompt>
  </div>
</template>
<script>
  import { WeChatConfig } from '../../common/public/WeChatConfig.js';
  import { cardinfo , getCard } from '../../common/axios/api.js';

  export default{
    data(){
          return{
            isLogin: false,
            wxSystem: this.$store.state.publicJS.wxSystem,//微信
            isShow:false,
            scroll:null,
            isGet:true,
            isWx:false,
            isiOS:false,
            is_new:false
          }
      },
    methods:{
      ajaxFun(){
        cardinfo().then(data=>{
          if(data.code==1){
              this.isLogin = data.isLogin;
              this.isGet = data.can_get;
              this.is_new = data.is_new;
          }
        })
      },
      backFun:function(){
        this.$router.push('/index');
      },
      btnFun(){
        if (!this.isLogin && !this.wxSystem) {
          this.confirmPrompt('请先登陆');
          return
        }else if (!this.isLogin && this.wxSystem) {
          this.confirmPrompt('请先完善资料');
          return
        }
        getCard().then(data=>{
          if(data.code==1){
            this.isShow=true;
            this.scroll.afterOpen();
            this.isGet=false;
          }
        })
      },
      rogerFun(){
          this.isShow=false;
          this.scroll.beforeClose();
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
        // 跳转ios
        if(this.isiOS){
          window.webkit.messageHandlers.AppModel.postMessage({'funName':'jumpIos','url':'login'})
          return;
        }
        this.$router.replace({path:'/login'});
      },
    },
    created() {
      this.ajaxFun();
      var u = navigator.userAgent;
      this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
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
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") { //判断是否为微信浏览器
        this.isWx=true;
      }else{
        this.isWx=false;
      }
      this.$nextTick(function(){
        setTimeout(()=>{
          var back = document.getElementsByClassName('elevenback')[0];
          if(this.isWx) {
            var close = document.getElementsByClassName('wxheader')[0].children[0];
            close.onclick=function(){
              back.setAttribute('style','top:0');
            };
            back.setAttribute('style','top:1.5rem');
          }else{
            back.setAttribute('style','top:0');
          }
        },500)
      })
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin.less';
  #eleven{
    background-color:#7A0BED;
    .elevenback {
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
    .top-pic{
      width: 100%;
      >img{
        width: 100%;
        height: 100%;
      }
    }
    .img{
      width: 8.63rem;
      margin: auto;
      >img{
        width: 101%;
        height: 100%;
        margin-bottom: 0.71rem;
      }
    }
    .info{
      width: 8.55rem;
      margin: auto;
      .tel{
        width: 100%;
        height: 1.37rem;
        border-radius: 0.3rem;
        position: relative;
        margin-bottom: 0.68rem;
        >span{
          position: absolute;
          top:0.2rem;
          left:0;
          height: 1rem;
          line-height:1rem;
          font-size:0.37rem;
          color: #5C5C5C;
          border-right: 1px solid #5C5C5C;
          padding: 0 0.48rem;
        }
        >input{
          width: 100%;
          height: 1.37rem;
          background: #fff;
          border-radius: 0.3rem;
          text-indent: 2.4rem;
        }
      }
      .btn{
        width: 100%;
        height: 1.37rem;
        background: #FB650F;
        text-align: center;
        line-height:1.37rem;
        color: #fff;
        font-size:0.48rem;
        font-weight:bold;
        border-radius: 0.3rem;
      }
      .btn2{
        background: #888;
      }
    }
    .text{
      width: 100%;
      padding: 0 0.29rem 0.88rem 0.73rem;
      color:rgba(255,255,255,1);
      .title{
        font-size:0.35rem;
        font-weight:bold;
        padding-top: 0.7rem;
      }
      .txt{
        font-size:0.29rem;
        padding: 0.05rem 0;
      }
    }
    .popup{
      position: fixed;
      top:0;
      width: 100%;
      height: 100%;
      background: rgba(1,1,1,0.5);
      .mask{
        position: absolute;
        top:50%;
        left: 50%;
        right: 50%;
        width: 8.32rem;
        background: #fff;
        transform: translate(-50%,-50%);
        padding: 0 0.5rem 0.5rem;
        border-radius: 0.3rem;
        .title{
          font-size:0.64rem;
          font-weight:bold;
          color:rgba(251,101,15,1);
          line-height:0.43rem;
          text-align: center;
          padding-top: 1rem;
          padding-bottom: 0.3rem;
          margin-bottom: 0.5rem;
        }
        .tex{
          width: 100%;
          display: inline-block;
          text-align: center;
          padding-bottom: 0.5rem;
          margin-bottom: 0.5rem;
          font-size:0.48rem;
          color:rgba(108,108,108,1);
          border-bottom: 1px solid #BFBFBF;
        }
        .roger{
          width: 3rem;
          height: 1rem;
          line-height:1rem;
          text-align: center;
          margin: auto;
          border: 1px solid #BFBFBF;
          font-size:0.48rem;
          color:rgba(92,92,92,1);
          border-radius: 0.3rem;
        }
      }
    }
  }
</style>
