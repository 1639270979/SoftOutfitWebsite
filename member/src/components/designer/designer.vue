<template>
  <div id="designer">
    <div class="nav">
      <ul>
        <li @click="typeFun(1)">
          <span class="small" v-if="city.area_id=='all'">城市<i class="icon-down"></i></span>
          <span class="small action" v-else-if="city.area_id==''">{{areaName}}<i class="icon-down"></i></span>
          <span class="small action" v-else>{{cityName}}<i class="icon-down"></i></span>
        </li>
        <li @click="typeFun(2)">
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
          <router-link :to="'/index/designer/designerDet/'+item.designer_id" class="top" tag="div">
            <div class="top-img" v-if="item.homepage_headimg!=''">
              <img :src="item.homepage_headimg">
            </div>
            <div class="top-img" v-else>
              <img src="./image/dsgImg.png">
            </div>
            <p class="name">{{ item.name }}</p>
            <p class="address" v-if="item.province != null || item.province != null">{{ item.province+item.city }}</p>
          </router-link>
          <div class="like" @click="likeFun( item)">
            <span :class="item.is_collect=='Y'?'icon icon-like':'icon'"></span>
            <span class="text">{{item.is_collect == 'Y' ? '已收藏' : '收藏'}}</span>
          </div>
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
          </div>
          <div class="bottom"  v-if="item.caseList.length == 0">
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
    <div class="footer" v-if="!isFooter">
      <span>虚位以待</span>
    </div>
    <confirmPrompt @rightBtn="goLoginFun"></confirmPrompt>
  </div>
</template>
<script>
  import dsgPopup from './dsgPopup.vue';
  import { designer ,newCity,designerCollect} from '../../common/axios/api.js';
  import { iscrollAjax } from '../../common/public/iscroll.js';
  import myLoading from '../loading/Loading.vue';
  export default {
    data() {
      return {
        items    : [],
        areaList : {},
        page     : 1,
        pageSize : 15,
        city     : {'area_id':''},	//空的就是全部
        styles   : '',	//空的就是全部
        order    : 0,	//1大腕，2新秀
        type     : 1,
        isShow   : false,
        stylesObj: {},
        isLoading: true,
        isList   :true,
        isData   : true,	//下拉加载判断是否还有数据
        isFooter :false,
        scroll   :null,
        wxSystem : this.$store.state.publicJS.wxSystem,
        islogin  : '',
        info      :'',
        areaName:''
      }
    },
    components: {
      dsgPopup,
      myLoading
    },
    methods: {
      initFun: function () {
        this.items = [];
        this.areaList = {};
        this.page = 1;
        this.city.area_id = '';
        this.styles = '';
        this.order = 0;
        let obj = {
          'page': this.page,
          'pageSize': this.pageSize,
          'city': this.city.area_id,
          'style': this.styles,
          'order': this.order
        }
        this.ajaxFun(obj);
      },
      iscroll: function () {
        iscrollAjax(() => {
          if (this.isData) {
            this.page += 1;
            let obj = {
              'page': this.page,
              'pageSize': this.pageSize,
              'city': this.city.area_id,
              'style': this.styles,
              'order': this.order
            }
            this.ajaxFun(obj);
          }
        });
      },
      ajaxFun: function (obj) {
        newCity().then(data => {
          this.areaList = data.cityList;
        });
        designer(obj).then(data => {
          this.stylesObj = data.style_list;
          this.islogin = data.islogin;
          this.areaName = data.area_name;
          if (!data.empty) {
            this.isFooter = true;
            data.designerList.map((val) => {
              this.items.push(val);
            });
//            this.areaList = data.areaList;
            if (data.designerList.length < this.pageSize) {
              this.isData = false;
              this.isLoading = false;
            } else {
              this.isData = true;
            }
          } else {
            this.isData = false;
            this.isLoading = false;
            this.isFooter = false;
          }
        });
      },
      typeFun: function (n) {
        this.type = n;
        this.isShow = true;
        this.scroll.afterOpen();//禁止底层滚动
      },
      propsFun: function () {
        this.items = [];
        this.page = 1;
        let obj = {
          'page': this.page,
          'pageSize': this.pageSize,
          'city': this.city.area_id,
          'style': this.styles,
          'order': this.order
        }
        this.ajaxFun(obj);
      },
      likeFun: function (arr) {
        let type = arr.is_collect == 'Y'? 'del':'add';
        let obj = {'type':type,'did':arr.designer_id};
        designerCollect(obj).then(data => {
          if (data.islogin == false) {
            if (this.wxSystem) {
              this.confirmPromptFun('请先完善资料','去完善');
              return;
            }
            this.confirmPrompt('请先登陆','去登陆');
          }else {
          arr.is_collect = arr.is_collect == 'Y'?'N':'Y';
          }
        })
      },
      confirmPrompt: function (str, btn) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.state.publicJS.confirmPromptBtnRight = btn;
        this.$store.commit('confirmPrompt');
      },
      goLoginFun: function() {
        this.$store.state.header.backName = this.$route.name;
        if (this.wxSystem) {
          this.$router.push({path:'/login/perfect'});
          return;
        }
        this.$router.push({path:'/login'});
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
        let cityArr = this.city;
        console.log(cityArr);
        return cityArr.area_name;
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
      let obj = {'page':this.page,'pageSize':this.pageSize,'city':this.city.area_id,'style':this.styles,'order':this.order}
      this.ajaxFun(obj);
      this.iscroll();

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
      z-index: 100;
      width: 100%;
      max-width: 640px;
      margin: auto;
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
        position: relative;
        width: 6em;
        display: inline-block;
        margin: auto;
        .rem(font-size,26);
        color: #333;
        overflow: hidden;
        padding:  0 0.3rem;
      }
      .action {
        color: #e37820;
      }
      .icon-down {
        position: absolute;
        top:0.4rem;
        left: 2.1rem;
        display: inline-block;
        .rem(width,10);
        .rem(height,8);
        background: url(./image/down.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .list {
      .rem(padding-top,62);
      li {
        position: relative;
        width: 92%;
        margin-left: 0.45rem;
        .border(border-bottom,2,#eee);
        overflow: hidden;
        > div {
          float: left;
          width: 100%;
        }
      }
      .top {
        position: relative;
        width: 100%;
        height: 100%;
        font-size: 0;
        .rem(margin-bottom,30);
        margin-top: 0.45rem;
        p {
          width: 100%;
          padding-left: 1.5rem;
          line-height: normal;
        }
      }
      .top-img {
        float: left;
        width:1.19rem;
        height:1.19rem;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
         min-height: 1.19rem;
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
        color: #AFAFAF;
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
        width:49%;
        height:2.79rem;
        overflow: hidden;
        margin-right: 0.16rem;
        margin-bottom: 0.56rem;
        img {
          width: 100%;
          min-height: 2.79rem;
        }
        img[lazy=loading]{
          margin-top: -0.8rem;
        }
      }
      .right-img1 {
        width:49%;
        height:2.79rem;
        overflow: hidden;
        img {
          width: 100%;
          min-height: 2.79rem;
          margin-top: -0.8rem;
        }
      }
      .like{
        position: absolute;
        width:2rem;
        height: 1.19rem;
        top: 0.48rem;
        right: 0;
        .icon{
          position: absolute;
          width:2rem;
          height:0.60rem;
          top: 0;
          left: 0;
          background: url(./image/bottom_ico_4_collection.png) no-repeat center;
          background-size:0.52rem 0.50rem;
        }
        .icon-like{
          background-image: url(./image/bottom_ico_4_collection_state.png);
        }
        .text{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 2rem;
          height: 0.59rem;
          text-align: center;
        }
      }
    }
    .footer{
      position: absolute;
      top: 2.3rem;
      left: 3rem;
      z-index: 2;
      width: 3.99rem;
      height:5.81rem;
      background: url("./image/sf.png") no-repeat center #fff;
      background-size:3.99rem,3.41rem;
      span{
        position: absolute;
        top: 4.7rem;
        left: 1rem;
        color: #EAB181;
        font-size: 0.48rem;
      }
    }
  }
</style>

