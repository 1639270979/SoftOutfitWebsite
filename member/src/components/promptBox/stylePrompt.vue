<template>
  <div id="stylePrompt" v-if="styleShow" @touchmove="isFun" class="d1">
    <div class="mask animated" :class="name" @click.self="backFun">
      <div class="popout" >
        <div class="top">
          <span class="back" @click="backFun">返回</span>
          <p class="title">{{ styleTitle }}</p>
        </div>
        <div class="content">
          <p class="first-p" v-if="styleFirstStr != ''">{{ styleFirstStr }}</p>
          <ul v-if="Object.keys(styleObject).length != 0" class="ul">
            <li :class="index == styleIndex ? 'action':''"
                v-for="(val,index) in styleObject"
                class="li"
                @click="clickFun(index)">{{ val }}<div class="icon-selected"><span></span></div></li>
          </ul>
          <p class="last-p" v-if="styleLastStr != ''">{{ styleLastStr }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //  import './jquery.min';
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        name: 'fadeInRight', //控制进场退场的动画class名
        is:false,
      }
    },
    methods: {
      clickFun: function(i) {
        this.$store.state.publicJS.styleIndex = i;
        this.backFun();
        this.$emit('increment');
      },
      backFun: function() {
        this.name = "fadeInLeft";
        setTimeout(() => {
          this.$store.commit('isStyleShow');
          this.$store.state.publicJS.styleFirstStr = '';
          this.$store.state.publicJS.styleLastStr = '';
          this.name = "fadeInRight";
        },400);
      },
      isFun(e){
        if(e.target.className=='d1'||e.target.className=="content"){
          e.preventDefault();
        }else if(e.target.className=='li'){
          var ul =document.getElementsByClassName('ul')[0];
          if(ul.children.length<=14){
            e.preventDefault();
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'styleShow',
        'styleTitle',
        'styleFirstStr',
        'styleLastStr',
        'styleIndex',
        'styleObject'
      ])
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin.less';
  #stylePrompt {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 640px;
    height: 100%;
    z-index: 999999;
    background: rgba(159,160,160,.8);
    .mask {
      position: absolute;
      right: 0;
      bottom: 1rem;
      width: 70%;
      height: 70%;
      background: #fff;
      .popout {
        width: 100%;
        height: 100%;
        .top {
          background: #eee;
          .rem(height,70);
          position: relative;
          width: 100%;
          .rem(font-size, 28);
          text-align: center;
          .back {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
            .rem(width, 108);

            .rem(line-height, 70);
            color: #e37820;
          }
          .title {
            width: 100%;
            .rem(line-height, 70);
            color: #666;
          }
        }
        .content {
          width: 100%;
          height: 100%;
          color: #666;
          background: #fff;
          overflow: scroll;
          li, p {
            width: 100%;
            .rem(height, 60);
            .rem(line-height, 60);
            .rem(padding-left, 28);
            .rem(font-size, 28);
            .border(border-top, 2, #efefef);
          }
          .first-p {
            .rem(font-size, 26);
          }
          .last-p {
            .rem(font-size, 22);
            color: #989898;
            .border(border-top, 2, #efefef);
          }
          .action {
            color: #e37820;
            .icon-selected {
              float: right;
              .rem(width, 44);
              .rem(height, 60);
              .rem(line-height, 60);
              text-align: center;
              span {
                display: inline-block;
                .rem(width, 18);
                .rem(height, 12);
                background: url(./image/selected.png) no-repeat;
                background-size: 100% 100%;
                vertical-align: middle;
              }
            }
          }
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
  }
</style>
