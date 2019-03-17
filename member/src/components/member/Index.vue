<template>
  <div id="member" :class="isMinHeight?'minHeight':''">
    <div class="user" >
      <div class="img-box">
        <router-link tag="div" to="/member/set/memberDet" class="img">
          <img :src="items.headimg" v-if="items.headimg != '' " >
          <img src="./image/dsgImg.png"  v-else>
        </router-link>
        <!--<span class="icon-crown"></span>-->
      </div>
      <div class="info">
        <router-link  tag="p" class="name" to="/member/set/memberDet">{{ items.nickname ? items.nickname : items.mobile }}</router-link>
        <router-link
          to="/member/set/memberDet"
          tag="p"><div class="personal">个人资料</div></router-link>
      </div>
      <div class="box" @click="vip">
        <div :class="items.is_vip == 1?'bg bg1':'bg bg0'"></div>
        <div class="vip">
          <p class="p11" v-if="items.is_vip == 1">会员中心</p>
          <p class="p1" v-else>开通VIP</p>
          <p class="p2">尊享九大权益</p>
        </div>
      </div>
    </div>
    <div class="nav">
      <!--<router-link to="/index/cart" tag="div" class="cart">我的购物车 <span class="icon-right"></span></router-link>-->
      <ul>
        <router-link to="/member/orderList/1" tag="li">
          <span class="icon-dfk"><i v-if="items.pay_count">{{ items.pay_count }}</i></span>
          <p>待付款</p>
        </router-link>
        <router-link to="/member/orderList/2" tag="li">
          <span class="icon-dfh"><i v-if="items.delivery_count">{{ items.delivery_count }}</i></span>
          <p>待发货</p>
        </router-link>
        <router-link to="/member/orderList/3" tag="li">
          <span class="icon-dsh"><i v-if="items.receive_count">{{ items.receive_count }}</i></span>
          <p>待收货</p>
        </router-link>
        <router-link to="/member/orderList/4" tag="li">
          <span class="icon-thh"><i v-if="items.service_count">{{ items.service_count }}</i></span>
          <p>退换货</p>
        </router-link>
        <router-link to="/member/orderList/0" tag="li">
          <span class="icon-qbdd"></span>
          <p>全部订单</p>
        </router-link>
      </ul>
    </div>
    <div class="fill"></div>
    <div class="list">
      <ul>
        <router-link to="/vip/VIPcoupon" tag="li">
          <span class="icon-vip xjj"></span>
          <span class="txt"> 我的优惠劵</span>
          <span class="icon-right"></span>
        </router-link>
        <router-link to="/member/messageList" tag="li" :class="items.is_vip == 1?'':'message'">
          <span class="icon-vip msg"></span>
          <span class="txt">我的消息</span>
          <span class="dot" v-if="items.is_unread"></span>
          <span class="icon-right"></span>
          <!-- v-if="items.is_unread" -->
          <span class="unread" v-if="items.is_unread">{{ items.unread_num }}条未读</span>
        </router-link>
        <router-link to="/collection" tag="li">
          <span class="icon-vip collect"></span>
          <span class="txt">我的收藏</span>
          <span class="icon-right"></span>
        </router-link>
        <router-link to="/vip/useService" tag="li" class="service" v-if="items.is_vip == 1">
          <span class="icon-vip sjf"></span>
          <span class="txt">已申请设计服务</span>
          <span class="icon-right"></span>
        </router-link>
        <div class="fill"></div>
        <router-link to="/member/panoList" tag="li"><span class="txt">已购"我家"的户型全景图</span><span class="icon-right"></span></router-link>
        <router-link to="/member/comboList" tag="li"><span class="txt">已购"我家"的户型套餐</span><span class="icon-right"></span></router-link>
        <router-link to="/member/designOrder" tag="li"><span class="txt">设计订单</span><span class="icon-right"></span></router-link>
        <router-link to="/member/masterOrderList" tag="li"><span class="txt">名师订单</span><span class="icon-right"></span></router-link>
        <router-link to="/member/adres" tag="li"><span class="txt">收货地址</span><span class="icon-right"></span></router-link>
        <li @click="saveFeedFun"><span class="txt">客服与反馈</span><span class="icon-right"></span></li>
      </ul>
    </div>
    <div class="feedback" v-show="isShow">
      <div class="prpout">
        <div class="themes">联系客服:</div>
        <div class="tel">
          <div class="number">
            <i class='icon-tel'></i>
            <div class="tel-number"><p class="p1">0755-86337169</p><p class="p2">工作时间（9:00-18:00）</p></div>
            <a class="tel-btn" @click="telFun('0755-86337169')">拨打</a>
          </div>
        </div>
        <div class="themes">意见反馈:</div>
        <div class="body">
          <textarea placeholder="您觉得大美软装有哪些问题呢？请在此处留下您的宝贵意见及建议，我们将认真聆听，积极改进！" v-model="message"></textarea>
        </div>
        <div class="btn"><span class="close" @click="cancelFun">取消</span><span class="fr" @click="confirmFun">提交</span></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { member,saveFeed } from "../../common/axios/api.js";
  export default {
    data() {
      return {
        items: {},
        isShow: false,
        message: '',
        isMinHeight: false,
        scroll:null
      }
    },
    methods: {
      ajaxFun: function() {
        member().then(data => {
          this.items = data.info;
        });
      },
      saveFeedFun: function() {
        this.message = '';
        this.isShow = true;
        this.scroll.afterOpen();
      },
      cancelFun: function() {
        this.isShow = false;
        this.scroll.beforeClose();
      },
      confirmFun: function() {
        if ((/\S/.test(this.message))) {
          let obj = {'message':this.message}
          saveFeed(obj).then(data => {
            if (data.status) {
              this.isShow = false;
              this.txtFun('提交成功');
            }else {
              this.txtFun(data.message);
            }
          })
        }else {
          this.txtFun('内容不能为空');
        }
      },
      txtFun: function(str) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },1000);
      },
      isObj: function(obj) {
        for (var i in obj) {
          return true;
        }
        return false;
      },
      telFun: function(num) {
        window.appModel.postMessage(JSON.stringify({'funName':'tel','num':num}));
      },
      vip:function(){
        if(this.items.is_vip==1){
            this.$router.push('/vip/openedVIP');
        }else{
          this.$router.push('/vip/openVIP');
        }
      },
    },
    created() {
      let isAndroid = window.navigator.appVersion.match(/android/gi);
      let isIPhone = window.navigator.appVersion.match(/iphone/gi);
      if (isAndroid) {
        this.isMinHeight = false;
      }else if (isIPhone) {
        this.isMinHeight = true;
      }
      this.ajaxFun();
    },
    mounted(){
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
  @import '../../assets/mixin_750.less';
  #member {
    .fill{
      width: 100%;
      height: 0.1rem;
      background: #eee;
    }
    padding-bottom:1rem ;
    width: 100%;
    overflow-x: hidden;
    .user {
      position: relative;
      width: 100%;
      height:4.4rem;
      background: url('image/my_top_bg.png') no-repeat;
      background-size:100%,100%;
      .img-box {
        position: absolute;
        top: 1.34rem;
        left: 1.1rem;
      }
      .img {
        width:2rem;
        height:2rem;
        border-radius: 50%;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .info {
        position: absolute;
        top: 1.68rem;
        left: 3.5rem;
        width: 3.5rem;
        color: #fff;
        p{
          margin-top: 0.1rem;
        }
        .name {
          font-size: 0.45rem;
        }
        .personal{
          font-size: 0.3rem;
          margin-bottom: 0.1rem;
        }
      }
      .box {
        position: absolute;
        top: 1.53rem;
        right: -2rem;
        width: 5.24rem;
        height:1.7rem;
        background: url('image/my_vip_bg.png') no-repeat;
        background-size: 70%,70%;
        color: #E1D6BA;
        .bg{
          position: absolute;
          top:0.45rem;
          left: 0.2rem;
          width: .8rem;
          height: 0.8rem;
          border-radius: 50%;
          }
        .bg0{
          background: url('image/my_vip_ico.png') no-repeat center  #454440;
          background-size:60% 60%;
        }
        .bg1{
          background: url('image/my_vip_ico_state.png') center no-repeat  #454440;
          background-size:60% 60%;
        }
        .vip{
          position: absolute;
          top: 0.4rem;
          left: 1.2rem;
          .p1{
            font-size:0.37rem;
            letter-spacing: 0.06rem;
          }
          .p11{
            font-size:0.37rem;
            letter-spacing: 0.02rem;
          }
          .p2{
            font-size:0.24rem;
            letter-spacing: 0.01rem;
          }
        }
      }
    }
    .user-action {
      .img {
        .rem(width,129);
        .rem(height,129);
        img {
          width: 100%;
          .rem(min-height,124);
        }
      }
      .icon-crown {
        position: absolute;
        .rem(top,54);
        .rem(right,-10);
        .rem(width,49);
        .rem(height,49);
        background: url(./image/crown.png) no-repeat;
        background-size: 100% 100%;
      }
      .vip-icon span {
        background-image: url(./image/vip_icon.png);
      }
    }
    .nav {
      width: 100%;
      margin-top: 1px;
      background: #fff;
      .cart{
        color: #000;
        width: 90%;
        margin: auto;
        .rem(height,100);
        .rem(margin-bottom,2);
        .rem(line-height,100);
        font-size: 0.40rem;
        border-bottom: 1px solid #eee;
        background: #fff;
        .icon-right {
          position: relative;
          .rem(top,40);
          float: right;
          .rem(width,13);
          .rem(height,24);
          background: url(./image/right.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      ul {
        display: flex;
      }
      li {
        position: relative;
        .rem(padding-top,30);
        .rem(padding-bottom,25);
        font-size: 0;
        text-align: center;
        flex: 1;
        span {
          position: relative;
          display: inline-block;
          .rem(width,60);
          .rem(height,48);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          > i {
            position: absolute;
            .rem(top,-8);
            .rem(right,-10);
            display: inline-block;
            .rem(width,32);
            .rem(height,32);
            .rem(line-height,30);
            .rem(font-size,20);
            color: #ffa229;
            text-align: center;
            font-style: normal;
            font-family: sans-serif;
            .border(border,2,#ffa229);
            border-radius: 50%;
            background: #fff;
          }
        }
        .icon-dfk {
          background-image: url(./image/nav1.png);
        }
        .icon-dsh {
          background-image: url(./image/nav3.png);
        }
        .icon-dfh {
          background-image: url(./image/nav2.png);
        }
        .icon-thh {
          background-image: url(./image/nav4.png);
        }
        .icon-qbdd {
          background-image: url(./image/nav5.png);
        }
        p {
          .rem(margin-top,15);
          .rem(font-size,24);
          color: #333;
        }
      }
    }
    .list {
      .rem(margin-top,12);
      .message{
        border-bottom: 0;
      }
      li {
        width: 90%;
        margin: auto;
        .rem(height,100);
        .rem(margin-bottom,2);
        .rem(line-height,100);
        font-size: 0.40rem;
        border-bottom:1px solid #eee ;
        color: #616161;
        .txt{
        }
        .icon-right {
          position: relative;
          .rem(top,37);
          float: right;
          .rem(width,13);
          .rem(height,24);
          background: url(./image/right.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      li:nth-child(4){
        border:0;
      }
      .dot {
        position: relative;
        .rem(top,-15);
        .rem(left,8);
        display: inline-block;
        .rem(padding,5);
        border-radius: 50%;
        background: #F17420;
      }
      .unread {
        position: relative;
        .rem(top,-2);
        .rem(right,24);
        float: right;
        .rem(font-size,28);
        color: #999;
      }
      .icon-vip {
        display: inline-block;
        .rem(width,50);
        .rem(height,40);
        .rem(margin-right,17);
        vertical-align: middle;
      }
      .msg{
        background: url(./image/my_ico_2_message.png) no-repeat;
        background-size: 100% 100%;
      }
      .xjj{
        background: url(./image/my_ico_1_cash_coupon.png) no-repeat;
        background-size: 100% 100%;
      }
      .sjf{
        background: url(./image/my_ico_3_design.png) no-repeat;
        background-size: 100% 100%;
      }
      .collect{
        width: 0.52rem;
        height: 0.44rem;
        margin-left: 0.1rem;
        .rem(margin-right,20);
        background: url(./image/my-collection-ico-5.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .feedback {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 500;
      width: 100%;
      height: 100%;
      background: rgba(159,160,160,.8);
      .prpout {
        position: fixed;
        top: 50%;
        left: 50%;
        .rem(width,554);
        .rem(height,570);
        .rem(padding-left,25);
        .rem(padding-right,25);
        .border(border,2,#d65317);
        .border-radius(10);
        transform: translate(-50%,-50%);
        background: #fff;
      }
      .themes {
        width: 100%;
        .rem(height,74);
        .rem(line-height,74);
        .rem(font-size,26);
        color: #333;
      }
      .tel {
        position: relative;
        width: 100%;
        .rem(height,67);
        .rem(padding-left,10);
        .border(border-bottom,1,#a0a0a0);
        .number {
          width: 100%;
          .rem(height,50);
          .rem(line-height,50);
        }
        .icon-tel {
          position: absolute;
          top: 0;
          .rem(left,10);
          .rem(width,36);
          .rem(height,48);
          background: url(./image/tel.png) no-repeat;
          background-size: 100% 100%;
        }
        .tel-number {
          position: relative;
          .rem(top,-5);
          .rem(margin-left,70);
          line-height: normal;
          .p1 {
            .rem(font-size,24);
          }
          .p2 {
            .rem(font-size,18);
          }
        }
        .tel-btn {
          position: absolute;
          .rem(top,10);
          right: 0;
          .rem(width,147);
          .rem(height,33);
          .rem(line-height,33);
          text-align: center;
          .rem(font-size,22);
          color: #fff;
          .border-radius(5);
          background: #d65317;
        }
      }
      .body {
        width: 100%;
        textarea {
          width: 100%;
          .rem(height,260);
          .rem(padding,10);
          .rem(padding-left,20);
          .rem(padding-right,20);
          .rem(line-height,37);
          .rem(font-size,22);
          color: #999;
          border: 0;
          background: #eee;
          outline: none;
          resize: none;
        }
      }
      .btn {
        .rem(width,388);
        margin: 0 auto;
        .rem(margin-top,26);
        span {
          display: inline-block;
          .rem(width,147);
          .rem(height,50);
          .rem(line-height,50);
          .rem(font-size,22);
          color: #fff;
          text-align: center;
          .border-radius(10);
          background: #d65317;
        }
        .close {
          background: #888888;
        }
      }
    }
  }
</style>
