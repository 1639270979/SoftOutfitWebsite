<template>
  <div id="dsgPopup" v-if="isShow">
    <div class="dsgPopup animated" :class="name">
      <div class="popout" @click.self="statusFun"></div>
      <div class="mask" v-if="type == 1">
        <div class="mask-box">
          <div class="title">
            <span class="back" @click="backFun">返回</span>
            <p>城市</p>
          </div>
          <div class="content">
            <p>热门城市</p>
            <ul>
              <li :class="city==''?'action':''" @click="cityFun('')">全部<div class="icon-selected"><span></span></div></li>
              <li
                :class="city==index?'action':''"
                @click="cityFun(index)"
                v-for="(key,index) in areaList">{{ key.city_name }}<div class="icon-selected"><span></span></div></li>
              <p class="more">更多城市,陆续开发中...</p>
            </ul>
          </div>
        </div>
      </div>
      <div class="mask" v-if="type == 2">
        <div class="mask-box">
          <div class="title">
            <span class="back" @click="backFun">返回</span>
            <p>风格</p>
          </div>
          <div class="content">
            <ul>
              <li :class="styles==''?'action':''" @click="styleFun('')">全部<div class="icon-selected"><span></span></div></li>
              <li :class="styles==index?'action':''"
                  v-for="(val,index) in stylesObj"
                  @click="styleFun(index)">{{val}}<div class="icon-selected"><span></span></div></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mask" v-if="type == 3">
        <div class="mask-box">
          <div class="title">
            <span class="back" @click="backFun">返回</span>
            <p>排序</p>
          </div>
          <div class="content">
            <ul>
              <li :class="order=='1'?'action':''" @click="orderFun(1)">行业大腕<div class="icon-selected"><span></span></div></li>
              <li :class="order=='2'?'action':''" @click="orderFun(2)">设计新秀<div class="icon-selected"><span></span></div></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['isShow','type','city','styles','stylesObj','order','areaList'],
    data() {
      return {
        name: 'fadeInRight'
      }
    },
    methods: {
      cityFun: function(city) {
        this.$emit('update:city', city);
        this.publicFun();
      },
      styleFun: function(styles) {
        this.$emit('update:styles', styles);
        this.publicFun();
      },
      orderFun: function(order) {
        this.$emit('update:order', order);
        this.publicFun();
      },
      publicFun: function() {
        this.backFun();
        this.$emit('increment');
      },
      statusFun: function() {
        this.backFun();
      },
      backFun: function() {
        this.name = "fadeInLeft";
        setTimeout(() => {
          this.$emit('update:isShow', false);
          this.name = "fadeInRight";
        },400);
        document.body.setAttribute("class","");
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin.less';
  #dsgPopup {
    .dsgPopup {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 500;
      width: 100%;
      height: 100%;
    }
    .popout {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 500;
      width: 100%;
      height: 100%;
      background: rgba(159,160,160,.8);
    }
    .mask {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 1000;
      .rem(width,500);
      .rem(height,877);
    }
    .mask-box {
      width: 100%;
      .rem(height,877);
      background: #efefef;
    }
    .title {
      position: relative;
      width: 100%;
      .rem(height,70);
      .rem(line-height,70);
      .rem(font-size,28);
      color: #666;
      text-align: center;
      .back {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        .rem(width,108);
        .rem(height,70);
        .rem(line-height,70);
        color: #e37820;
      }
    }
    .content {
      width: 100%;
      .rem(height,807);
      color: #666;
      background: #fff;
      ul {
        .rem(width,600);
        .rem(height,807);
        overflow-y: auto;
      }
      p,li {
        .rem(width,500);
        .rem(height,60);
        .rem(line-height,60);
        .rem(padding-left,28);
        .rem(font-size,28);
      }
      li {
        .border(border-top,2,#efefef);
      }
      .action {
        color: #e37820;
        .icon-selected {
          float: right;
          .rem(width,44);
          .rem(height,60);
          .rem(line-height,60);
          text-align: center;
          span {
            display: inline-block;
            .rem(width,18);
            .rem(height,12);
            background: url(./image/selected.png) no-repeat;
            background-size: 100% 100%;
            vertical-align: middle;
          }
        }
      }
      .more {
        .rem(font-size,22);
        color: #989898;
        .border(border-top,2,#efefef);
      }
    }
  }
  .animated {
    animation-duration: .4s;
    animation-fill-mode: both;
  }
  .fadeInRight {
    animation-name: fadeInRight;
  }
  .fadeInLeft {
    animation-name: fadeInLeft;
  }
  @keyframes fadeInRight {
    from {
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
    to {
      transform: none;
    }
  }
  @keyframes fadeInLeft {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      //transform: none;
      transform: translate3d(100%, 0, 0);
    }
  }
</style>



<template>
  <div id="designer">
    <div class="nav">
      <ul>
        <li @click="typeFun(1)">
          <!-- <span class="txt">城市</span> -->
          <span class="small" v-if="city==''">城市<i class="icon-down"></i></span>
          <span class="small action" v-else>{{cityName}}<i class="icon-down"></i></span>
        </li>
        <li @click="typeFun(2)">
          <!-- <span class="txt">风格</span> -->
          <span class="small" v-if="styles==''">风格<i class="icon-down"></i></span>
          <span class="small action" v-else>{{stylesObj[styles]}}<i class="icon-down"></i></span>
        </li>
        <li @click="typeFun(3)">
          <span class="small" :class="order==1?'action':''" v-if="order==1">大腕<i class="icon-down"></i></span>
          <span class="small" :class="order==2?'action':''" v-if="order==2">新秀<i class="icon-down"></i></span>
          <span class="small" v-if="order==0">排序<i class="icon-down"></i></span>
        </li>
      </ul>
    </div>
    <div class="list">
      <ul>
        <li v-for="item in items">
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
            <p class="name">{{ item.name }}</p>
            <p class="address" v-if="item.province != null || item.province != null">{{ item.province+item.city }}</p>
          </router-link>
          <div class="bottom" v-if="item.caseList != ''">
            <div class="right-img" v-for="caseList in item.caseList">
              <router-link
                :to="caseList.type==1?'/index/designer/programmeDet/'+caseList.case_id:'/index/designer/planDet/'+caseList.case_id"
                tag="img"
                v-lazy="caseList.picture" ></router-link>
            </div>
            <div class="right-img1" v-if="item.caseList.length == 1">
              <img src="./image/idmei.png">
            </div>
            <div class="right-img1" v-if="item.caseList.length == 1">
              <img src="./image/idmei.png">
            </div>
            <div class="right-img1" v-if="item.caseList.length == 2">
              <img src="./image/idmei.png">
            </div>
          </div>
          <div class="bottom"  v-if="item.caseList.length == 0">
            <div class="right-img1">
              <img src="./image/idmei.png">
            </div>
            <div class="right-img1">
              <img src="./image/idmei.png">
            </div>
            <div class="right-img1">
              <img src="./image/idmei.png">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <dsgPopup
      :type="type"
      :isShow="isShow"
      :areaList="areaList"
      @update:isShow="val => isShow = val"
      :city="city"
      @update:city="val => city = val"
      :styles="styles"
      @update:styles="val => styles = val"
      :stylesObj="stylesObj"
      :order="order"
      @update:order="val => order = val"
      @increment="propsFun"></dsgPopup>
    <myLoading :isLoading='isLoading' :isList="isList"></myLoading>
  </div>
</template>
<script>
  import dsgPopup from './dsgPopup.vue';
  import { designer } from '../../common/axios/api.js';
  import { iscrollAjax } from '../../common/public/iscroll.js';
  import myLoading from '../loading/Loading.vue';
  export default {
    data() {
      return {
        items    : [],
        areaList : {},
        page     : 1,
        pageSize : 15,
        city     : '',	//空的就是全部
        styles   : '',	//空的就是全部
        order    : 0,	//1大腕，2新秀
        type     : 1,
        isShow   : false,
        stylesObj: {},
        isLoading: true,
        isList :true,
        isData: true,	//下拉加载判断是否还有数据
      }
    },
    components: {
      dsgPopup,
      myLoading
    },
    methods: {
      initFun: function() {
        this.items = [];
        this.areaList = {};
        this.page = 1;
        this.city = '';
        this.styles = '';
        this.order = 0;
        let obj = {'page':this.page,'pageSize':this.pageSize,'city':this.city,'style':this.styles,'order':this.order}
        this.ajaxFun(obj);
      },
      iscroll: function() {
        iscrollAjax(() => {
          if (this.isData) {
            this.page += 1;
            let obj = {'page':this.page,'pageSize':this.pageSize,'city':this.city,'style':this.styles,'order':this.order}
            this.ajaxFun(obj);
          }
        });
      },
      ajaxFun: function(obj) {
        designer(obj).then(data => {
          this.stylesObj = data.style_list;
          if (!data.empty) {
            this.isList = true;
            data.designerList.map((val) => {
              this.items.push(val);
            });
            this.areaList = data.areaList;
            if (data.designerList.length < this.pageSize) {
              this.isData = false;
              this.isLoading = false;
            }else {
              this.isData = true;
            }
          }else {
            this.isData = false;
            this.isLoading = false;
            this.isList = false;
          }
        });
      },
      typeFun: function(n) {
        this.type = n;
        this.isShow = true;
        document.body.setAttribute("class","noScroll");
      },
      propsFun: function() {
        this.items = [];
        this.page = 1;
        let obj = {'page':this.page,'pageSize':this.pageSize,'city':this.city,'style':this.styles,'order':this.order}
        this.ajaxFun(obj);
      }
    },
    computed: {
      /*补齐案例列表不满三张*/
      completeLen: function() {
        let len = this.item.caseList.length;
        let lenNum = 0;
        for (var i = 0; i < 3; i++) {
          if (i > len) {
            lenNum ++;
          }
        }
        return lenNum;
      },
      cityName: function() {
        let cityName = this.city;
        let obj = this.areaList;
        return obj[cityName].city_name
      }
    },
    beforeRouteEnter(to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
      if (from.name != '设计师详情' && from.name != '设计师案例详情') {
        window.localStorage.setItem('scrollTop',0);
      }
      next(vm => {
        let scrollTop = window.localStorage.getItem('scrollTop');
        window.scrollTo(0,scrollTop);
      });
    },
    created() {
      let obj = {'page':this.page,'pageSize':this.pageSize,'city':this.city,'style':this.styles,'order':this.order}
      this.ajaxFun(obj);
      this.iscroll();
    },
    activated() {
      this.iscroll();
    },
    beforeRouteLeave(to, from, next) {
      if (to.name == '设计师详情' || to.name == '设计师案例详情') {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        window.localStorage.setItem('scrollTop',scrollTop);
      }
      next();
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin.less';
  #designer {
    .nav {
      position: fixed;
      //top: 64px;
      left: 0;
      z-index: 100;
      width: 100%;
      .rem(padding-top,2);
      .rem(padding-left,1);
      background: #eee;
      ul {
        overflow: hidden;
      }
      li {
        float: left;
        display: flex;
        width: 33.3333%;
        .rem(height,60);
        .rem(line-height,60);
        font-size: 0;
        color: #222;
        text-align: center;
        .border(border-right,1,#eee);
        background: #fff;
        justify-content: center;
        flex-direction: column;
      }
      .txt {
        .rem(font-size,26);
        .rem(line-height,26);
      }
      .small {
        .rem(font-size,26);
        color: #333;
      }
      .action {
        color: #e37820;
      }
      .icon-down {
        position: relative;
        .rem(top,-7);
        display: inline-block;
        .rem(width,10);
        .rem(height,8);
        .rem(margin-left,10);
        background: url(./image/down.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .list {
      .rem(padding-top,62);
      li {
        position: relative;
        width: 100%;
        display: block;
        .rem(padding,28);
        .rem(padding-top,20);
        .rem(padding-bottom,16);
        .border(border-top,2,#eee);
        overflow: hidden;
        > div {
          float: left;
          width: 100%;
        }
      }
      .top {
        width: 100%;
        height: 100%;
        font-size: 0;
        .rem(margin-bottom,30);
        p {
          width: 100%;
          .rem(padding-left,94);
          line-height: normal;
        }
      }
      .top-img {
        float: left;
        .rem(width,74);
        .rem(height,74);
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          .rem(min-height,74);
        }
      }
      .name {
        .rem(margin-bottom,10);
        .rem(font-size,24);
        color: #333;
      }
      .address {
        width: 100%;
        .rem(font-size,20);
        color: #666;
      }
      .bottom {
        >div {
          float: left;
          .rem(margin-right,7);
          &:last-of-type {
            margin-right: 0;
          }
        }
      }
      .right-img {
        .rem(width,190);
        .rem(height,120);
        overflow: hidden;
        background: #F6F6F6;
        img {
          width: 100%;
          .rem(min-height,120);
        }
        img[lazy=loading]{
          margin-top: -0.5rem;
        }
      }
      .right-img1 {
        .rem(width,190);
        .rem(height,120);
        overflow: hidden;
        background: #F6F6F6;
        img {
          width: 100%;
          .rem(min-height,120);
          margin-top: -0.5rem;
        }
      }
    }
  }
</style>
