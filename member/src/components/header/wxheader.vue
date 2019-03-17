<template>
  <div class="wxheader" v-if="isWx">
    <div class="wxclose" @click="close"><div class="icon"></div></div>
    <div>
      <i class="wxlogin"></i>
      <p class="txt">大美软装</p>
    </div>
    <div class="wxapp">
    <span @click="app">在APP中打开</span>
  </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    props: ["isWx"],
    data(){
      return{
      }
    },
    methods:{
      close(){
        this.isWx=false;
        var app = document.getElementById('app');
        var back = document.getElementById('back');
        var header = document.getElementById('header');
        app.setAttribute('style', 'padding-top: 0');
        back.setAttribute('style','top:0');
        header.setAttribute('style','top:0')
      },
      app(){
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
          window.location.href='http://sj.qq.com/myapp/detail.htm?apkName=com.idmeiapp.android';
        } else if (u.indexOf('iPhone') > -1) {//苹果手机
          window.location.href='https://itunes.apple.com/cn/app/%E5%A4%A7%E7%BE%8E%E8%BD%AF%E8%A3%85/id1297909610?mt=8';
        }
      }
    },
  }
</script>
<style lang="less" scoped>
  .wxheader{
    position: fixed;
    max-width: 640px;
    margin: auto;
    top: 0;
    width: 100%;
    height: 1.5rem;
    background: #D55317;
    padding: 0 0.5rem;
    z-index: 99999;
    color: #fff;
    margin-bottom: 1rem;
    div{
      display: inline-block;
    }
    .wxclose{
      position: absolute;
      top: 0.6rem;
      .icon{
        width: 0.4rem;
        height: 0.4rem;
        background:url("./image/guan.png") no-repeat;
        background-size:100%,100%;
        font-size: 0.6rem;
      }
    }
    .wxlogin{
      position: absolute;
      top: 0.35rem;
      left: 1.5rem;
      width: 0.9rem;
      height: 1rem;
      z-index: 99;
      background:url("image/wxlogin.png") no-repeat #D55317;
      background-size:100%,100%;
    }
    .txt{
      position: absolute;
      width: 2rem;
      height: 0.8rem;
      top: 0.5rem;
      left: 2.7rem;
      color: #fff;
      font-size: 0.43rem;
    }
    .wxapp{
      position: absolute;
      top: 0.55rem;
      right: 0.5rem;
      span{
        font-size: 0.35rem;
        text-align: center;
        padding: 0.15rem 0.3rem;
        border-radius: 0.4rem;
        border: 1px solid #fff;
      }
    }
  }
</style>
