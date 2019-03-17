<template>
  <div id="existShopCart" v-if = "ExistShopCartShow">
    <div class="casePopout">
      <div class="mask">
        <ul class="list">
          <p class="cart-title">以下商品已存在于您的购物车，是否继续添加？</p>
          <li v-for="(list,index) in existShopCartArr">
            <div class="list-box">
              <div class="img-box">
                <div class="img"><img :src="list.picture"></div>
              </div>
              <div class="shopInfo">
                <p class="shopName">{{ list.goods_name }}</p>
                <p class="money">¥{{ list.price }}</p>
                <div class="right">
                  <span class="del" @click="delFun(list.num)">-</span>
                  <span class="num" v-if="num1==0">{{list.num}}</span>
                  <span class="num" v-else :for="list.num=num1">{{list.num}}</span>
                  <span class="add" @click="addFun(list.num,list.store)">+</span>
                </div>
              </div>
            </div>
            <div class="check-box">
              <input type="checkbox" :value="list.goods_id" v-model="cofirmCart">
              <span></span>
            </div>
          </li>
        </ul>
        <div class="layer-bottom">
          <span @click="closeFun">取消</span>
          <span class="addCart" @click="confirmAddCart">确认并加入购物车</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { addHasCart } from '../../common/axios/api.js';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        cofirmCart: [],
        num1:0,
        scroll:null
      }
    },
    methods: {
      closeFun: function() {
        this.$store.commit('isExistShopCartShow',[]);
        this.num1=0;
        this.scroll.beforeClose();
      },
      confirmAddCart: function() {
        let num = new Object;
        let gid = [];
        this.cofirmCart.map((key) => {
          this.existShopCartArr.map((val) => {
            if (key == val.goods_id) {
              if(this.num1==0){
                num [val.goods_id] = val.num;
              }else{
                num [val.goods_id] = this.num1;
              }
              gid.push(val.goods_id);
            }
          });
        });
        let obj = {'gid':gid,'num':num};
        addHasCart(obj).then(data => {
          if (data.code != 1) {
            this.txtFun(data.message);
//            this.scroll.beforeClose();
          }else {
            this.$store.commit('isExistShopCartShow',[]);
            this.txtFun('成功加入购物车');
            this.num1=0;
            this.cofirmCart=[];
            this.scroll.beforeClose();
          }
        });
      },
      txtFun: function(str) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },1500);
      },
      delFun(n){
        this.num1=n;
        if(this.num1>1){
          this.num1--;
        }
      },
      addFun(n,m){
        this.num1=n;
        if(this.num1<m){
          this.num1++;
        }else{
          this.txtFun('该商品库存不够');
        }
      }
    },
    computed: {
      ...mapGetters([
        'existShopCartArr',
        'ExistShopCartShow'
      ])
    },
    mounted() {
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
  #existShopCart {
    .casePopout {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 500;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.6);
      .mask {
        position: fixed;
        top: 50%;
        left: 50%;
        .rem(width,600);
        .rem(height,780);
        .border-radius(20);
        background: #fff;
        transform: translate(-50%,-50%);
      }
      .list {
        width: 100%;
        .rem(height,652);
        overflow-y: auto;
      }
      .cart-title {
        width: 100%;
        .rem(margin-top,25);
        .rem(margin-bottom,25);
        .rem(padding-left,50);
        .rem(padding-right,50);
        .rem(line-height,38);
        .rem(font-size,28);
        letter-spacing: 1px;
      }
      li {
        position: relative;
      }
      .list-box {
        width: 100%;
        .rem(height,146);
        .border(border-bottom,2,#eee);
      }
      .img-box {
        float: left;
        .rem(width,213);
        .rem(padding-top,10);
        .rem(padding-left,84);
        .img {
          .rem(width,128);
          .rem(height,128);
          overflow: hidden;
          img {
            width: 100%;
            .rem(min-height,128);
          }
        }
      }
      .shopInfo {
        width: 100%;
        .rem(padding-left,240);
        .shopName {
          width: 100%;
          .rem(line-height,44);
          .rem(font-size,24);
        }
        .money {
          .rem(margin-top,5);
          .rem(line-height,34);
          .rem(font-size,22);
          color: #ed7631;
        }
        .right{
          margin-top: 0.1rem;
          /*width: 1.6rem;*/
          height: 0.4rem;
          display: flex;
          align-items: center;
          background: #fff;
          color: #929292;
          span{
            text-align: center;
            line-height: 0.4rem;
            font-size: 0.3rem;
          }
          .del{
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            background: #DCDDDD;
            border-bottom-left-radius:0.1rem;
            border-top-left-radius:0.1rem;
            font-size: 0.4rem;
          }
          .num{
            display: inline-block;
            padding: 0 .2rem;
            background: #eee;
          }
          .add{
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            background: #DCDDDD;
            border-top-right-radius: 0.1rem;
            border-bottom-right-radius:0.1rem;
            font-size: 0.4rem;
          }
        }
      }
      .check-box {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        .rem(width,84);
        .rem(height,146);
        .rem(line-height,146);
        input {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          margin: 0;
          opacity: 0;
        }
        span {
          display: inline-block;
          .rem(width,26);
          .rem(height,26);
          .rem(margin-left,43);
          background: url(./image/case_check.png) no-repeat;
          background-size: 100% 100%;
        }
        input:checked+span{
          background-image: url(./image/case_check_1.png);
        }
      }
      .layer-bottom {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 10;
        width: 100%;
        .rem(height,128);
        .rem(padding-top,34);
        text-align: center;
        background: #fff;
        box-shadow: 0 0 3px #eee;
        span {
          display: inline-block;
          .rem(width,258);
          .rem(height,60);
          .rem(line-height,60);
          .rem(font-size,24);
          color: #fff;
          text-align: center;
          .border-radius(10);
          background: #b5b5b6;
        }
        .addCart {
          .rem(margin-left,16);
          background: #ed7631;
        }
      }
    }
  }
</style>
