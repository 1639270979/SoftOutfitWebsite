<template>
  <div id="dsgPopup" v-show="isShow">
    <div class="dsgPopup animated" :class="name">
      <div class="popout" @click.self="statusFun" @touchmove.prevent></div>
      <div class="mask" v-if="type == 1">
        <div class="mask-box">
          <div class="title">
            <span class="back" @click="backFun">返回</span>
            <p>城市</p>
          </div>
          <div class="content">
            <ul id="switchoverCityScroll">
              <div class="all"  @click="cityFun(myCity)">全部</div>
              <li :id="key" v-for="(lists,key) in areaList">
                <div class="letter">{{ key }}</div>
                <div :class="item.has_designer==0?'selected':'selected1'" v-for="(item,index) in lists" @click="cityFun(lists[index])">{{item.area_name}}</div>
              </li>
            </ul>`
          </div>
          <div class="right-letter">
            <ul class="letter-ul">
              <li><span>#</span></li>
              <li @click="jump(k)" v-for="(lists,k) in areaList" :class="key == k?'action':''">{{ k }}<span class="drum" :ref="k">{{ k }}</span></li>
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
          <div class="content2">
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
          <div class="content2">
            <ul>
              <li :class="order=='1'?'action':''" @click="orderFun(1)">资深设计<div class="icon-selected"><span></span></div></li>
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
        name: 'fadeInRight',
        key: 'A',
        myCity:{'area_id':'all'},
        scroll:null
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
        this.scroll.beforeClose();//恢复滚动
      },
      jump: function(num) {
        this.key = num;
        document.getElementById(num).scrollIntoView(true);
        this.$refs[num][0].style.display = 'block';
        setTimeout(() => {
          this.$refs[num][0].style.display = 'none';
        },200);
      },
    },
    mounted() {
      var this_ = this;
      document.getElementById('switchoverCityScroll').onscroll = function(e) {//点击字母跳到对应位置
        let key = '';
        let li = e.target.children;
        let scrollTop = document.getElementById('switchoverCityScroll').scrollTop;
        for (var i = 0; i < li.length; i++) {
          if (i < li.length - 1) {
            if (li[i].offsetTop - 108 <= scrollTop && scrollTop <= li[i+1].offsetTop) {
              this_.key = li[i].id;
            }
          }else {
            if (li[i].offsetTop - 108 <= scrollTop) {
              this_.key = li[i].id;
            }
          }
        }
      }
      //禁止页面滚动函数
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
  #dsgPopup {
    .dsgPopup {
      position: fixed;
      top: 0;
      z-index: 500;
      width: 100%;
      max-width: 640px;
      margin: auto;
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
      top:1rem;
      right: 0;
      z-index: 1000;
      .rem(width,500);
      height: 100%;
    }
    .mask-box {
      width: 100%;
      height: 100%;
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
      height: 100%;
      overflow: auto;
      color: #000;
      background: #fff;
      ul {
        height: 100%;
        padding-bottom: 1.7rem;
        overflow-y: auto;
        .all{
          font-size: 0.35rem;
          color: #000;
          padding-left: 15px;
          padding-top: 0.5rem;
        }
      }
      li {
        > div {
          width: 100%;
          height: 45px;
          line-height: 45px;
          padding-left: 15px;
        }
      }
      .letter {
        height: 48px;
        line-height: 48px;
        font-size: 0.48rem;
      }
      .selected{
        font-size: 0.35rem;
        color: #6D6D6D;
      }
      .selected1{
        font-size: 0.35rem;
        color: #000;
      }
    }
    .right-letter {
      position: absolute;
      top: 2.31rem;
      right: 0;
      z-index: 5;
      width: 29px;
      li {
        position: relative;
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.3rem;
        color: #000;
        text-align: center;
        .drum {
          position: absolute;
          .rem(top,-35);
          .rem(left,-100);
          display: none;
          .rem(width,80);
          .rem(height,80);
          .rem(line-height,80);
          .rem(font-size,30);
          font-weight: 900;
          color: #333;
          background: url(./image/drum.png) no-repeat;
          background-size: 100% 100%;
          opacity: .5;
        }
      }
      .action {
        color: #e94d3a;
      }
      .icon-star {
        display: inline-block;
        width: 10px;
        height: 8.5px;
        background: url(./image/star.png) no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
      }
    }
    .content2 {
      width: 100%;
      height: 100%;
      color: #666;
      background: #fff;
      ul {
        .rem(width,600);
        height: 100%;
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
