<template>
  <div id="newDet">
    <div class="box"></div>
    <div class="banner">
      <img :src="item.pic">
    </div>
    <div class="box"></div>
    <div class="body">
      <div class="title">
        <p>{{item.title}}</p>
      </div>
      <div class="content" id="content" v-html="item.content">

      </div>
    </div>
    <div class="box"></div>
    <div class="page">
      <a class="pre" @click="jump(pre)" v-if="pre!=''">{{ne}}</a>
      <a class="next" @click="jump(next)" v-if="next!=''">下一篇>></a>
    </div>
    <div class="box"></div>
    <my-zoom
      :isZoomShow="isZoomShow"
      @update:isZoomShow="val => isZoomShow = val"
      :zoomImgArr='zoomImgArr'
      :zoomIndex='zoomIndex'></my-zoom>
  </div>
</template>
<script type="text/javascript">
  import { newsDetail } from '../../common/axios/api.js';
  import myZoom from '../public/zoom.vue'
  export default{
    data(){
      return{
        id   : this.$route.params.id,
        item         : {},
        next         : '',
        pre          : '',
        isZoomShow: false,
        zoomImgArr: [],
        zoomIndex: 0,
        ne:'<<上一篇'
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.name == from.name) {
          this.$router.go(0);
        }
      }
    },
    methods: {
      ajaxFun: function() {
        newsDetail({id:this.id}).then(data => {
          this.item = data.newsInfo;
          if (data.nextNews.length!=0) {
            console.log(this.page);
            this.next = data.nextNews.news_id;
          }else {
            this.next = '';
          }
          if (data.preNews.length!=0) {
            this.pre = data.preNews.news_id;
          }else{
            this.pre= '';
          }
          this.setBR();
          this.imgLoadFun();
        });
      },
      jump: function(str) {
        this.id = str;
        this.ajaxFun();
        document.getElementsByTagName('body')[0].scrollTop = 0;
      },
      imgLoadFun: function() {	//先放张占位图的图片
        this.$nextTick(function() {
          let img = document.getElementsByClassName('content')[0].querySelectorAll('img');
          for (var i = 0; i < img.length; i++) {
            let oldImg = img[i].src;
            img[i].src = 'http://www.idmei.com/static/www/image/suit_bg.jpg';
            img[i].onload = function() {
              this.src = oldImg;
              this.onload = null;
            };
          }
        });
      },
      setBR: function() {//设置有br标签的p高度和图片放大
        this.$nextTick(function() {
          //图片放大
          let content = document.getElementsByClassName('content')[0];
          content.addEventListener('click',(e) => {
            if (e.target.nodeName == 'IMG') {
              this.zoomImgArr = [];
              this.isZoomShow = true;
              this.zoomImgArr.push(e.target);
              this.zoomIndex = 0;
            }
          });
          let p = document.getElementsByTagName('p');
          for (let i = 0;i < p.length;i++) {
            if (p[i].firstChild.nodeName == 'BR') {
              p[i].style.height = 10 + 'px';
            }
          }
          p = null;
        });
      }
    },
    components: {
      myZoom
    },
    created() {
      this.ajaxFun();
    },
  }
</script>
<style lang="less">
  @import '../../assets/mixin.less';
  #newDet{
    .box {
      width: 100%;
      .rem(height,10);
      background: #eee;
    }
    .banner {
      width: 100%;
      overflow: hidden;
      img {
        float: left;
        width: 100%;
      }
      img[lazy=loading] {
        display: block;
        .rem(width,300);
        .rem(height,300);
        margin: auto;
      }
    }
    .title {
      position: relative;
      width: 100%;
      .rem(height,76);
      .rem(padding-left,36);
      .rem(padding-right,97);
      .rem(line-height,76);
      p {
        font-size: 16px;
        color: #333;
      }
      .like {
        position: absolute;
        top: 0;
        right: 0;
        .rem(width,97);
        .rem(height,76);
        .rem(padding-right,30);
        font-size: 0;
        text-align: right;
        > span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .icon-like {
        .rem(width,40);
        .rem(height,35);
        background: url(./image/bottom_ico_4_collection.png) no-repeat;
        background-size: 100% 100%;
      }
      // .txt {
      // 	.rem(margin-left,8);
      // 	.rem(font-size,22);
      // 	color: #5a5a5a;
      // }
      .action {
        .icon-like {
          background-image: url(./image/bottom_ico_4_collection_state.png);
        }
      }
    }
    .content {
      width: 100%;
      padding: 0 10px;
      p {
        line-height: 22px;
        overflow: hidden;
      }
      img {
        float: left;
        max-width: 100%;
        height: auto;
      }
    }
    .page {
      width: 100%;
      .rem(height,54);
      .rem(padding-left,30);
      .rem(padding-right,30);
      .rem(line-height,54);
      background: #fff;
      a {
        .rem(font-size,26);
        color: #e37820;
      }
      .next {
        float: right;
      }
      .pre {
        float: left;
      }
    }
  }
</style>
