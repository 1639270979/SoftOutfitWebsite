<template>
  <div id="eleven">
    <div class="top-pic">
      <img src="./img/top-pic-1.png" alt="">
    </div>
    <div class="img">
      <img src="./img/200.png" alt="" style="margin-top: 0.47rem">
      <img src="./img/500.png" alt="">
      <img src="./img/1000.png" alt="">
      <img src="./img/100.png" alt="">
    </div>
    <div class="info">
      <div class="tel">
        <span>手机号</span>
        <input type="tel" v-model="tel">
      </div>
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
  import { wechatCard } from '../../common/axios/api.js';
  export default{
    data(){
      return{
        isLogin: false,
        wxSystem: this.$store.state.publicJS.wxSystem,//微信
        isShow:false,
        scroll:null,
        isGet:true,
        tel:''
      }
    },
    methods:{
      ajaxFun(obj){
        wechatCard(obj).then(data=>{
          if(data.code=="-1"){
            this.textFun(data.msg)
          }else if(data.code=='1'){
            this.isShow=true;
            this.scroll.afterOpen();
          }else{
            this.confirmPrompt('请先完善资料');
          }
        })
      },
      btnFun(){
        if (!(/^1[3|4|5|6|7|8|9]{1}\d{9}$/.test(this.tel))) {
          this.textFun('请输入正确的手机号码');
          return;
        }
        let obj ={mobile:this.tel};
        this.ajaxFun(obj);
      },
      rogerFun(){
        this.isShow=false;
        this.isGet=false;
        this.scroll.beforeClose();
        this.$router.push({path:'/index'});
      },
      confirmPrompt: function(str) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.state.publicJS.confirmPromptBtnRight = '去完善';
        this.$store.commit('confirmPrompt');
      },
      goLoginFun: function() {
        this.$router.push({path:'/index/activity/wxpre'});
      },
      textFun: function(str) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },1500);
      },
    },
    created() {
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
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin.less';
  #eleven{
    background-color:#7A0BED;
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
