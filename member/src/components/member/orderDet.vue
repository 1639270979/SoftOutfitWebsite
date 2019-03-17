<template>
  <div id="orderDet">
    <div class="back" @click="backFun"><span class="icon-back"></span></div>
    <div class="top">订单详情</div>
    <div class="info">
      <ul>
        <li class="info1">
          <p class="num">订单编号：{{ items.order_id }}</p>
          <div class="box">
            <div class="left">
              <p>{{ status[items.status-1] }}</p>
              <p v-if="items.remain_time">剩余{{ items.remain_time }}小时</p>
            </div>
            <div class="right">
              <span class="sure" @click="isOrder(items.order_id)" v-if=" items.status == 5">确认收货</span>
              <span @click="cancelFun" v-if="items.status == 1 && items.total_pay == 0">取消订单</span>
              <span @click="refundFun" v-if="items.status == 1 && items.total_pay > 0">申请退款</span>
              <span class="immediately"
                    @click="paymentFun(items.order_id)"
                    v-if="items.status == 1 ">立即支付</span>
            </div>
          </div>
        </li>
        <li class="info2">
          <div :class="(items.status >= 1 && items.status != 8) ? 'action' : ''">
            <div class="box">
              <div class="img"><span class="icon1"></span></div>
              <p class="txt">提交订单</p>
              <p class="time" v-if="(items.status >= 1 && items.status != 8)">{{ items.time_data[0][0]}}</p>
              <p class="time" v-if="(items.status >= 1 && items.status != 8)">{{ items.time_data[0][1]}}</p>
            </div>
          </div>
          <div :class="(items.status >= 2 && items.status != 8) ? 'action' : ''">
            <div class="box">
              <div class="img"><span class="icon2"></span></div>
              <p class="txt">付款成功</p>
              <p class="time" v-if="(items.status >= 2 && items.status != 8)">{{ items.time_data[1][0]}}</p>
              <p class="time" v-if="(items.status >= 2 && items.status != 8)">{{ items.time_data[1][1]}}</p>
            </div>
            <div class="info2-right">
              <div class="icon">
                <span class="icon-arrow"></span>
              </div>
            </div>
          </div>
          <div :class="(items.status >= 4 && items.status != 8) ? 'action' : ''">
            <div class="box">
              <div class="img"><span class="icon3"></span></div>
              <p class="txt">商品出货</p>
              <p class="time" v-if="(items.status >= 4 && items.status != 8)">{{ items.time_data[2][0]}}</p>
              <p class="time" v-if="(items.status >= 4 && items.status != 8)">{{ items.time_data[2][1]}}</p>
            </div>
            <div class="info2-right">
              <div class="icon">
                <span class="icon-arrow"></span>
              </div>
            </div>
          </div>
          <div :class="(items.status >= 4 && items.status != 8) ? 'action' : ''">
            <div class="box">
              <div class="img"><span class="icon4"></span></div>
              <p class="txt">等待收货</p>
              <p class="time" v-if="(items.status >= 4 && items.status != 8)">{{ items.time_data[2][0]}}</p>
              <p class="time" v-if="(items.status >= 4 && items.status != 8)">{{ items.time_data[2][1]}}</p>
            </div>
            <div class="info2-right">
              <div class="icon">
                <span class="icon-arrow"></span>
              </div>
            </div>
          </div>
          <div :class="(items.status == 6 || items.status == 7 ||items.status == 9) ? 'action' : ''">
            <div class="box">
              <div class="img"><span class="icon5"></span></div>
              <p class="txt">交易成功</p>
              <p class="time" v-if="(items.status == 6 || items.status == 7 ||items.status == 9 )">{{ items.time_data[3][0]}}</p>
              <p class="time" v-if="(items.status == 6 || items.status == 7 ||items.status == 9 )">{{ items.time_data[3][1]}}</p>
            </div>
            <div class="info2-right">
              <div class="icon">
                <span class="icon-arrow"></span>
              </div>
            </div>
          </div>
        </li>
        <li class="info3">
          <ul>
            <li v-for="item in items.items">
              <div>
                <div class="img"><img :src="item.picture"></div>
                <div class="content">
                  <div class="title"><img :src="item.logo">{{item.goods_name}}</div>
                  <div class="bottom">
                    <p class="size">尺寸：{{item.size}}</p>
                    <span class="fl">数量：{{ item.quantity }}件</span>
                    <!--<span class="fr">¥ {{ item.cost_goods }}</span>-->
                  </div>
                </div>
              </div>
              <div class="btn">
                <router-link :to="'/member/order/det/changeGoodsDet/'+oid+'/'+item.item_id" tag="span"
                             v-if="(items.status == 6 && item.has_service == 'Y')|| (items.status == 9 && item.has_service == 'Y')">售后详情</router-link>
                <router-link :to="'/member/order/det/service/'+oid+'/'+item.item_id" tag="span"
                             v-else-if="items.status == 5 || items.status == 6 || items.status == 9 ">申请售后</router-link>
                <span v-if="item.user_appraise == 1 && items.status == 7" @click="evaluateFun(item.item_id)">商品评价</span>
                <span v-if="item.user_appraise == 2">已评价</span>
              </div>
            </li>
          </ul>
        </li>
        <li class="info4">
          <div class="right">
            <p>¥{{ items.cost_goods }}</p>
            <p>¥{{ items.cost_fitting }}</p>
            <p>¥{{ items.cost_freight }}</p>
            <p>¥{{ items.cost_order }}</p>
          </div>
          <div class="left">
            <p>订单总价：</p>
            <p>安装费：</p>
            <p>运费：</p>
            <p>合计付款：</p>
          </div>
        </li>
        <li class="info5">
          <div class="left">
            <span class="icon-adres"></span>
          </div>
          <div class="right">
            <p class="txt">收货信息</p>
            <p><span class="fl">收货人：{{ adres.recevier }}</span><span class="fr">{{ adres.mobile }}</span></p>
            <p>收货地址：{{ adres.address }}</p>
          </div>
        </li>
        <li class="info6">
          <div class="left">
            <span class="icon-money"></span>
          </div>
          <div class="right">
            <p class="txt">支付信息</p>
            <p>支付方式：{{ items.pt_id }}</p>
            <p>发票信息：{{ items.is_invoice == 1?items.invoice_title:'不开发票' }}</p>
            <div class="split-info" v-if="items.pay_info">
              <ul v-if="items.pay_info.length > 0">
                <li class="list" v-for="info in items.pay_info">支付金额：{{info.money}}<span class="time">{{ info.paytime }}</span></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <confirmPrompt
      @rightBtn="rightBtnFun"></confirmPrompt>
    <!-- 商品评价 -->
    <my-evaluate
      :token="token"
      v-show="isEvaluate"
      :itemId="itemId"
      @update:isEvaluate="val => isEvaluate = val"
      @increment="refreshFun"></my-evaluate>
    <!-- 申请退款 -->
    <refund-popup
      :isRefund="isRefund"
      @update:isRefund="val => isRefund = val"
      :refundStr="refundStr"
      @update:refundStr="val => refundStr = val"
      @increment="refundAjaxFun"></refund-popup>
  </div>
</template>
<script>
  import { orderDet,cancel,service,order,confirmOrder } from '../../common/axios/api.js';
  import myEvaluate from './evaluate.vue';
  import refundPopup from './refundPopup.vue';
  export default {
    data() {
      return {
        oid: this.$route.params.oid,
        sid: this.$route.params.sid,
        items: {},
        adres: {},
        status: ['待支付','已支付','申请退款','已发货','已收货','申请退货','已完成','已取消','申请换货'],
        token : '',
        isEvaluate: false,
        itemId: '',
        isRefund: false,
        refundStr: '',
        myoid:'',
        goType:1  //cancelFun
      }
    },
    components: {
      myEvaluate,
      refundPopup
    },
    methods: {
      ajaxFun: function() {
        orderDet(this.oid).then(data => {
          if (data.code == 1) {
            this.items = data.order;
            this.adres = this.items.ship_detail;
          }
          this.token = data.token;
        });
      },
      cancelFun: function() {
        this.$store.state.publicJS.promptBoxMsg = '是否取消订单';
        this.$store.state.publicJS.confirmPromptBtnRight = '确定';
        this.goType=1;
        this.$store.commit('confirmPrompt');
      },
      paymentFun: function(oid) {
        this.$router.replace({ path: '/orderPay',query:{oid:oid,'type':'product_pay','money':this.items.cost_order}})
      },
      evaluateFun: function(n) {//商品评价
        this.itemId = n;
        this.isEvaluate = true;
      },
      refreshFun: function() {//刷新页面
        this.ajaxFun();
      },
      refundFun: function() {
        this.isRefund=true;
      },
      refundAjaxFun: function() {
        let obj = {'type':3,'oid':this.oid,'content':this.refundStr}
        service(obj).then(data => {
          if (data.code == 1) {
            this.ajaxFun();
            this.txtFun(data.msg);
          }else {
            this.txtFun(data.msg);
          }
        });
      },
      txtFun: function(str) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },1000);
      },
      rightBtnFun: function() {
          if(this.goType==1){
            let obj = {'oid':this.oid};
            cancel(obj).then(data => {
              if (data.code == 1) {
                  this.ajaxFun();
//                  this.$router.go(-1);
                  this.$router.push('/member/orderList/'+this.sid);
              }else {
                this.$store.state.publicJS.promptBoxMsg = data.message;
                this.$store.dispatch('alertPrompt');
              }
            })
          }else if(this.goType==2){
            let obj = {oid:this.oid};
            confirmOrder(obj).then(data=>{
              if(data.code==1){
                this.ajaxFun();
                this.$router.push('/member/orderList/'+this.sid);
              }
            })
          }
      },
      isOrder:function(oid){
        this.oid=oid;
        this.$store.state.publicJS.confirmPromptBtnRight = '确定';
        this.$store.state.publicJS.promptBoxMsg = '是否确认收货';
        this.goType=2;
        this.$store.commit('confirmPrompt');
      },
      backFun:function(){
        this.$router.push('/member/orderList/'+this.sid);
      }
    },
    mounted(){
      console.log(this.sid);
      var this_ = this;
      window.getInfoFromNative = function(returnStr) {//原生调用
        let obj = JSON.parse(returnStr);
        if (obj.funName == 'wxPay') {
          if (obj.code == -3) {
            this_.isTxtShow = true;
            this_.msg = '您好，系统出错';
            setTimeout(function() {
              this_.$router.push({path:'/member/order/orderDet/'+obj.order_id});
            },1500);
            return;
          }
          this_.$router.push({path:'/member/order/orderDet/'+obj.order_id});
        }
      };
      this.ajaxFun();
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin.less';
  #orderDet {
    width: 100%;
    height: 100%;
    background: #eee;
    .back {
      position: fixed;
      top: 0;
      z-index: 999;
      display: flex;
      width: 41px;
      height: 44px;
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
    .top {
      .rem(margin-top,2);
      .rem(height,68);
      .rem(line-height,68);
      .rem(font-size,26);
      color: #333;
      text-align: center;
      background: #fff;
    }
    .info {
      >ul >li {
        .rem(padding-left,30);
        .rem(padding-right,30);
        .border(border-top,2,#eee);
        background: #fff;
        overflow: hidden;
      }
    }
    .info1 {
      .rem(padding-top,20);
      .rem(padding-bottom,20);
      .num {
        .rem(margin-bottom,27);
        .rem(line-height,22);
        .rem(font-size,22);
        color: #333;
      }
      .box {
        position: relative;
        width: 100%;
        &:after {
          content: '';
          display: block;
          clear: both;
        }
      }
      .left {
        float: left;
        font-size: 0;
        p {
          .rem(margin-bottom,20);
          .rem(line-height,26);
          .rem(font-size,26);
          color: #d65317;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .right {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 0;
        > span {
          display: inline-block;
          .rem(width,125);
          .rem(height,44);
          .rem(line-height,44);
          .rem(font-size,22);
          color: #fff;
          text-align: center;
          .border-radius(10);
          background: #999;
        }
        .sure{
          background: #d65317;
        }
        .immediately {
          .rem(margin-left,10);
          background: #d65317;
        }
      }
    }
    .info2 {
      .rem(padding-top,21);
      .rem(padding-bottom,21);
      > div {
        position: relative;
        float: left;
        width: 20%;
        overflow: hidden;
      }
      .box {
        .rem(width,115);
        text-align: center;
      }
      .icon {
        .rem(width,135);
      }
      .img {
        .rem(width,47);
        .rem(height,38);
        margin: 0 auto;
        overflow: hidden;
        > span {
          display: inline-block;
          .rem(width,47);
          .rem(height,38);
          background-size: 100%;
          background-repeat: no-repeat;
        }
      }
      .icon1 {
        background-image: url(./image/status1.png);
      }
      .icon2 {
        background-image: url(./image/status2.png);
      }
      .icon3 {
        background-image: url(./image/status3.png);
      }
      .icon4 {
        background-image: url(./image/status4.png);
      }
      .icon5 {
        background-image: url(./image/status5.png);
      }
      .action {
        .icon1 {
          background-image: url(./image/status1_1.png);
        }
        .icon2 {
          background-image: url(./image/status2_1.png);
        }
        .icon3 {
          background-image: url(./image/status3_1.png);
        }
        .icon4 {
          background-image: url(./image/status4_1.png);
        }
        .icon5 {
          background-image: url(./image/status5_1.png);
        }
        .icon-arrow {
          background-image: url(./image/status_1.png);
        }
      }
      .txt {
        .rem(margin-top,19);
        .rem(margin-bottom,31);
        .rem(line-height,24);
        .rem(font-size,24);
        color: #333;
      }
      .time {
        .rem(margin-top,16);
        .rem(line-height,20);
        font-size: 0.29rem;
        color: #666;
      }
      .info2-right {
        position: absolute;
        top: 0;
        .rem(left,-20);
        .rem(width,40);
      }
      .icon-arrow {
        display: inline-block;
        .rem(width,39);
        .rem(height,12);
        background-image: url(./image/status.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
    .info3 {
      background: #fff;
      li {
        .rem(padding-top,10);
        .rem(padding-bottom,10);
        .border(border-bottom,2,#eee);
        overflow: hidden;
        &:last-of-type {
          border-bottom: 0;
        }
        >div {
          position: relative;
          overflow: hidden;
          > div {
            float: left;
          }
        }
      }
      .img {
        .rem(width,138);
        .rem(height,138);
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .content {
        width: 100%;
        .rem(height,138);
        .rem(margin-left,-138);
        .rem(padding-left,158);
      }
      .title {
        .rem(font-size,24);
        color: #333;
        img {
          .rem(width,35);
          .rem(height,35);
          .rem(margin-right,10);
        }
      }
      .bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        .size{
          color: #666;
          .rem(font-size,22);
          position: relative;
          top:-0.3rem;
        }
        .rem(padding-left,158);
        .fl {
          .rem(font-size,22);
          color: #666;
        }
        .fr {
          .rem(font-size,26);
          color: #d65317;
        }
      }
      .btn {
        width: 100%;
        .rem(margin-top,20);
        font-size: 0;
        text-align: right;
        overflow: hidden;
        > span {
          display: inline-block;
          width: 69px;
          height: 27px;
          margin-left: 10px;
          line-height: 27px;
          font-size: 12px;
          text-align: center;
          color: #666;
          .border(border,1,#666);
          .border-radius(10);
        }
      }
    }
    .info4 {
      width: 100%;
      .rem(padding-top,20);
      .rem(padding-bottom,20);
      overflow: hidden;
      .left {
        float: left;
        text-align: left;
      }
      .left,.right {
        .rem(font-size,22);
        color: #666;
        p {
          .rem(margin-bottom,13);
          .rem(line-height,22);
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .right {
        float: right;
        text-align: right;
        p {
          color:#d65317;
        }
      }
    }
    .info5,.info6 {
      display: flex;
      .rem(padding-top,15);
      .rem(padding-bottom,15);
      > div {
        float: left;
      }
      .left {
        display: flex;
        .rem(width,65);
        align-items: center;
        > span {
          display: inline-block;
          .rem(width,44);
          .rem(height,42);
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .icon-adres {
          background-image: url(./image/adres.png);
        }
        .icon-money {
          background-image: url(./image/money.png);
        }
      }
      .right {
        width: 100%;
        .rem(margin-left,-65);
        .rem(padding-left,65);
        p {
          .rem(margin-bottom,23);
          .rem(font-size,22);
          color: #333;
          overflow: hidden;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
        .txt {
          color: #d65317;
        }
      }
      .split-info {
        .rem(margin-top,20);
        .list {
          .rem(line-height,50);
          .rem(font-size,22);
          .border(border-top,2,#eee);
        }
        .time {
          float: right;
        }
      }
    }
    .payment {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 500;
      width: 100%;
      height: 100%;
      background: rgba(159,160,160,.8);
    }
    .popout {
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 1000;
      .rem(width,554);
      .rem(height,350);
      .border(border,2,#d65317);
      .border-radius(10);
      transform: translate(-50%,-50%);
      background: #fff;
      .top {
        position: relative;
        width: 100%;
        .rem(height,64);
        .rem(line-height,64);
        .rem(font-size,26);
        text-align: center;
        .border(border-bottom,2,#eee);
        .icon-cancel {
          position: absolute;
          .rem(top,14);
          .rem(left,10);
          .rem(width,36);
          .rem(height,36);
          background: url(./image/cancel.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .body {
        > div {
          .rem(margin-top,30);
          text-align: center;
        }
      }
      .title {
        .rem(line-height,28);
        .rem(font-size,28);
        color: #da6a3c;
      }
      .money {
        .rem(line-height,32);
        .rem(font-size,32);
        color: #da6a3c;
      }
      .mode {
        font-size: 0;
        .txt {
          display: inline-block;
          .rem(line-height,24);
          .rem(font-size,24);
          color: #333;
          vertical-align: middle;
        }
      }
      .radius {
        display: inline-block;
        .rem(padding-left,10);
        vertical-align: top;
      }
      .icon {
        display: inline-block;
        .rem(height,24);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        vertical-align: middle;
      }
      .icon-wx {
        .rem(width,84);
        background-image: url(./image/wx.png);
      }
      .icon-zfb {
        .rem(width,80);
        background-image: url(./image/zfb.png);
      }
      .icon-yl {
        .rem(width,97);
        background-image: url(./image/yl.png);
      }
      label {
        display: inline-block;
        .rem(margin-right,10);
        font-size: 0;
        &:last-of-type {
          margin-right: 0;
        }
        > div {
          position: relative;
        }
        .icon-y {
          display: inline-block;
          .rem(width,20);
          .rem(height,20);
          .rem(margin-right,14);
          background: url(./image/radio.png) no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
        }
        input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        input:checked + span {
          background-image: url(./image/radio_1.png);
        }
      }
      .btn {
        width: 100%;
        > span {
          display: inline-block;
          .rem(width,200);
          .rem(height,54);
          margin: 0 auto;
          .rem(line-height,54);
          .rem(font-size,24);
          color: #fff;
          .border-radius(10);
          background: #d65317;
        }
      }
    }
  }
</style>
