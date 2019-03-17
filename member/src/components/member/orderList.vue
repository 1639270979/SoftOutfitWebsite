<template>
  <div id="order">
    <div class="back" @click="backFun"><span class="icon-back"></span></div>
    <div class="nav">
      <li
        :class="str == navStr[status]?'action':''"
        v-for="(str,index) in navStr"
        @click="statusFun(index)">{{ str }}</li>
    </div>
    <div class="list">
      <ul>
        <li v-for="item in items">
          <div class="top">
            <span class="fl">交易时间：{{ item.addtime }}</span>
            <span class="fr">{{ item.status_name}}</span>
          </div>
          <div class="body">
            <ul>
              <router-link
                :to="{name:'商品详情',params:{pid:info.product_id}}"
                v-for="info in item.itemList"
                :key="info.item_id"
                tag="li">
                <div class="img"><img :src="info.picture"></div>
                <div class="info">{{ info.goods_name }} <span class="quantity">x{{info.quantity}}</span><span class="icon-right"></span></div>
              </router-link>
            </ul>
          </div>
          <div class="bottom" v-if="item.status == 2">实付款{{ item.cost_order }}元</div>
          <div class="bottom" v-if="item.status == 1 && parseFloat(item.total_pay) > 0">共{{ item.itemList.length }}件商品需要支付：<span>¥{{ item.cost_order }}元(已支付{{ item.total_pay }})</span></div>
          <div class="bottom" v-else>共{{ item.count_num }}件商品需要支付：<span>¥{{ item.cost_order }}元</span></div>
          <div class="bottom-btn">
            <span v-if="item.status == 1" @click="paymentFun(item.total_pay,item.status,item.order_id,item.cost_order)">去支付</span>
            <span v-if="item.status == 5" @click="isOrder(item.order_id)">确认收货</span>
            <router-link class="det" :to="'/member/order/orderDet/'+item.order_id+'/'+status" tag="span">查看订单</router-link>
          </div>
        </li>
      </ul>
    </div>
    <myLoading :isLoading='isLoading' :isList="isList"></myLoading>
    <confirmPrompt @rightBtn="goFun"></confirmPrompt>
  </div>
</template>
<script>
  import { order,confirmOrder } from '../../common/axios/api.js';
  import { iscrollAjax } from '../../common/public/iscroll.js';
  import myLoading from '../loading/Loading.vue';
  export default {
    data() {
      return {
        items: [],
        page: 1,
        pageSize: 15,
        status: this.$route.params.status,
        navStr: ['全部订单','待付款','待发货','待收货','退换货'],
        oid  : '',
        isLoading: true,
        isList:true,
        isData: true,
        isInit: true,
      }
    },
    components: {
      myLoading
    },
    methods: {
      initFun: function() {
        this.items    = [];
        this.page     = 1;
        this.pageSize = 15;
        this.status   = this.$route.params.status;
        let obj = {'page':this.page,'pageSize':this.pageSize,'status':this.status};
        this.ajaxFun(obj);
      },
      iscroll: function() {
        iscrollAjax(() => {
          if (this.isData) {
            this.isData = false;
            this.page += 1;
            let obj = {'page':this.page,'pageSize':this.pageSize,'status':this.status};
            this.ajaxFun(obj);
          }
        });
      },
      ajaxFun: function(obj) {
        order(obj).then(data => {
          if (!data.empty) {
              this.isList = true;
            for (var i = 0; i < data.orderList.length; i++) {
              this.items.push(data.orderList[i]);
            }
            if (data.orderList.length < this.pageSize) {
              this.isData = false;
              this.isLoading = false;
            }else {
              this.isData = true;
              this.isLoading = true;
            }
          }else {
            this.isData = false;
            this.isLoading = false;
            this.isList = false;
          }
          this.iscroll();
        })
      },
      statusFun: function(status) {
        this.status = status;
        this.isLoading = true;
        this.page = 1;
        this.items = [];
        let obj = {'page':this.page,'pageSize':this.pageSize,'status':status};
        this.ajaxFun(obj);
      },
      paymentFun: function(totalPay,status,oid,money) {//去支付
        if (parseFloat(totalPay) > 0 && status == 1) {
          this.$router.push({path:'/orderPay/splitPay',query:{oid:oid,'type':'product_pay'}});
          return;
        }
        this.$router.push({ path: '/orderPay',query:{oid:oid,'type':'product_pay','money':money}})
      },
      isOrder:function(oid){
        this.oid = oid
        this.$store.state.publicJS.confirmPromptBtnRight = '确定';
        this.$store.state.publicJS.promptBoxMsg = '是否确认收货';
        this.$store.commit('confirmPrompt');
      },
      goFun:function(){
        let obj = {oid:this.oid};
        confirmOrder(obj).then(data=>{
          if(data.code==1){
            this.initFun();
            this.$router.go(-1);
          }
        })
      },
      backFun:function(){
        this.$router.push('/member');
      }
    },
    beforeRouteEnter(to,from,next) {
      if (from.path == '/member') {
        window.localStorage.setItem('scrollTop',0);
      }
      next(vm => {
        let scrollTop = window.localStorage.getItem('scrollTop');
        window.scrollTo(0,scrollTop);
        if (from.path == '/member') {
          vm.isInit = true;
        }
      });
    },
    activated() {
      if (this.isInit) {
        this.initFun();
      }
    },
    beforeRouteLeave(to,from,next) {
      if (to.name=='商品详情') {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        window.localStorage.setItem('scrollTop',scrollTop);
        this.isInit = false;
      }else{
        this.isInit = true;
      }
      next();
    },
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin.less';
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
  .nav {
    width: 100%;
    .rem(height,68);
    .rem(margin-top,2);
    .rem(margin-bottom,2);
    .rem(line-height,68);
    .rem(font-size,24);
    text-align: center;
    background: #fff;
    .icon-dowm {
      display: inline-block;
      .rem(width,16);
      .rem(height,9);
      .rem(margin-left,12);
      background: url(./image/dowm.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
    }
    li {
      float: left;
      width: 20%;
    }
    .action {
      color: #d65317;
    }
  }
  .list {
    >ul >li {
      .rem(margin-bottom,12);
      > div {
        .rem(padding-left,30);
        .rem(padding-right,30);
        .rem(margin-bottom,2);
        background: #fff;
        overflow: hidden;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
      .top {
        .rem(line-height,44);
        .rem(font-size,22);
        color: #333;
        .fr {
          color: #d65317;
        }
      }
      .body {
        .rem(padding-top,15);
        .rem(padding-bottom,15);
        overflow: hidden;
        li {
          overflow: hidden;
          > div {
            float: left;
          }
        }
        .img {
          .rem(width,98);
          .rem(height,98);
          overflow: hidden;
          img {
            width: 100%;
            .rem(min-height,98);
          }
        }
        .info {
          position: relative;
          width: 100%;
          .rem(margin-left,-98);
          .rem(padding-right,40);
          .rem(padding-left,111);
          .rem(padding-top,20);
          .rem(font-size,22);
        }
        .quantity{
          /*float: right;*/
          /*margin-left: 0.1rem;*/
        }
        .icon-right {
          position: absolute;
          right: 0;
          .rem(top,31);
          .rem(width,22);
          .rem(height,38);
          background: url(./image/right.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .bottom {
        .rem(height,44);
        .rem(line-height,44);
        .rem(font-size,22);
        color: #333;
        text-align: right;
        span {
          color: #d65317;
        }
      }
      .bottom-btn {
        .rem(padding-top,7);
        .rem(padding-bottom,7);
        overflow: hidden;
        > span {
          float: right;
          .rem(width,128);
          .rem(height,40);
          .rem(margin-left,10);
          .rem(line-height,40);
          .rem(font-size,22);
          color: #fff;
          text-align: center;
          .border-radius(10);
          background: #d65317;
          &:last-of-type {
            margin-left: 0;
          }
        }
        .det {
          background: #ccc;
        }
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
        .rem(top,0);
        .rem(left,0);
        .rem(width,64);
        .rem(height,64);
        background: url(./image/cancel.png) no-repeat;
        background-position: center;
        background-size: 18px 18px;
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
        margin: 0;
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
</style>
