<template>
  <div id="works">
    <div class="workback" @click="backFun"><span class="icon-back"></span></div>
    <div class="title1"><p class="name">大美软装</p></div>
    <div id="icon" @click="share"><span></span></div>
    <div class="img"><img :src="info.picture" alt=""></div>
    <p class="title">{{info.title}}</p>
    <div class="headerImg"><img :src="info.headimg" alt=""></div>
    <div class="lei">
      <span v-for="item in info.label">{{item}}</span>
    </div>

    <p class="txt">{{info.description }}</p>
    <div class="content" v-html="info.content" id="txt">

    </div>
    <!-- 分享弹窗 -->
    <div class="share" v-if="isShare">
      <div class="make">
        <p class="title">分享到</p>
        <div class="icon-close1" @click="isShare=false;scroll.beforeClose();"></div>
        <div class="content">
          <div>
            <div class="wx" @click="shareFun('wx')"></div>
            <p>微信好友</p>
          </div>
          <div>
            <div class="circle"  @click="shareFun('circle')"></div>
            <p>朋友圈</p>
          </div>
          <!--<div>-->
          <!--<div class="qq"></div>-->
          <!--<p>QQ好友</p>-->
          <!--</div>-->
          <!--<div>-->
          <!--<div class="space"></div>-->
          <!--<p>QQ空间</p>-->
          <!--</div>-->
          <!--<div>-->
          <!--<div class="sina"></div>-->
          <!--<p>新浪微博</p>-->
          <!--</div>-->
          <div class="getCopy" :data-clipboard-text="link">
            <div class="copy"></div>
            <p>复制链接</p>
          </div>
        </div>
      </div>
    </div>
    <my-zoom
      :isZoomShow="isZoomShow"
      @update:isZoomShow="val => isZoomShow = val"
      :zoomImgArr='zoomImgArr'
      :zoomIndex='zoomIndex'></my-zoom>
  </div>
</template>
<script type="text/javascript">
  import Clipboard from 'clipboard';
  import { elitecaseDetail } from '../../common/axios/api.js';
  import myZoom from '../public/zoom.vue'

  export default{
    data:function(){
        return{
          cid:this.$route.params.cid,
          isWx:false,
          isShare:false,
          link:'',
          bfUrl:'',
          info:'',
          clipboard:null,
          isZoomShow: false,
          zoomImgArr: [],
          zoomIndex: 0,
      }
    },
    components: {
      myZoom
    },
    methods:{
      ajaxFun:function(){
        elitecaseDetail({cid:this.cid}).then(data=>{
          if(data.code==1){
            this.info = data.info;
          }
        })
        this.zoom();
      },
      zoom(){
        this.$nextTick(function(){
          let  txt = document.getElementById('txt');
          txt.addEventListener('click',(e) => {
            if (e.target.nodeName == 'IMG') {
              this.zoomImgArr = [];
              this.isZoomShow = true;
              this.zoomImgArr.push(e.target);
              this.zoomIndex = 0;
            }
          })
        })
      },
      txtFun: function(str,time) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },time);
      },
      backFun:function(){
        if(this.bfUrl==null){
          this.$router.push('/index');
        }else{
          this.$router.go(-1);
        }
      },
      share:function(){
        this.isShare=true;
        this.scroll.afterOpen();
      },
      shareFun:function(type){
        var id = this.cid;
        var imgUrl= this.info.picture;
        var title = this.info.title;
        if(type=='wx') {
          this.isShare=false;
          this.scroll.beforeClose();
          window.appModel.postMessage(JSON.stringify({
            "funName":'share',
            "platform":'wechat',
            "title":title,
            "url" :'member.idmei.com/topage?i=index&c=myMaster&a=worksDet&id='+id,
            "imageUrl":imgUrl,
            "text":"大美软装-新零售创意家饰网络平台！"
          }))
        }else if(type=='circle'){
          this.isShare=false;
          this.scroll.beforeClose();
          window.appModel.postMessage(JSON.stringify({
            "funName":'share',
            "platform":'wechatMoments',
            "title":title,
            "url" :'member.idmei.com/topage?i=index&c=shop&a=shopDet&id='+id,
            "imageUrl":imgUrl,
            "text":"大美软装-新零售创意家饰网络平台！"
          }))
        }
      },
    },
    created() {
      this.ajaxFun();
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
    mounted:function(){
      this.clipboard = new Clipboard('.getCopy');
      var link = 'member.idmei.com/topage?i=index&c=myMaster&a=worksDet&id='+this.cid;
      this.link = link;
      this.clipboard.on('success', e => {
        this.txtFun('复制链接成功',1000);
      });

      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") { //判断是否为微信浏览器
        this.isWx=true;
      }else{
        this.isWx=false;
      }
      this.$nextTick(function(){
          setTimeout(()=>{
            var title = document.getElementsByClassName('name')[0];
            var back = document.getElementsByClassName('workback')[0];
            var icon = document.getElementById('icon');
            if(this.isWx) {
              title.setAttribute('style','top:1.5rem');
              icon.setAttribute('style','top:1.5rem');
              back.setAttribute('style','top:1.5rem');
                var close = document.getElementsByClassName('wxheader')[0].children[0];
                close.onclick=function(){
                  title.setAttribute('style','top:0rem');
                  back.setAttribute('style','top:0rem');
                  icon.setAttribute('style','top:0rem');
                };
            }else{
              title.setAttribute('style','top:0');
              back.setAttribute('style','top:0');
              icon.setAttribute('style','top:0');
            }

            let  txt = document.getElementById('txt');
            let p = txt.getElementsByTagName('p');
            let img ;
            for (let i = 0;i < p.length;i++) {
              img = p[i].getElementsByTagName('img');
              for(let j = 0; j <img.length;j++ ){
                img[j].style.height = '100%';
                img[j].style.width = '100%';
              }
            }

          },500)
      })
    },
    beforeRouteEnter(to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
      next(vm => {
        vm.bfUrl=from.name;
      });
    },
    destroyed(){
      this.clipboard.destroy();
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin_750.less';
  #works{
    position: relative;
    width: 100%;
    .workback {
      position: fixed;
      top: 0;
      z-index: 999;
      display: flex;
      width: 1.2rem;
      height: 1.2rem;
      align-items: center;
      justify-content: center;
      .icon-back {
        display: inline-block;
        width: 11px;
        height: 19px;
        background: url(../login/image/back.png) no-repeat center;
        background-size: 100% 100%;
      }
    }
    .title1{
      width: 4rem;
      margin: auto;
      .name{
        width: 4rem;
        margin: auto;
        position: fixed;
        top: 0;
        line-height:1.2rem;
        text-align: center;
        font-size: 0.42rem;
        z-index: 888;
        color:#d55317;
      }
    }
    #icon {
      position: fixed;
      top: 0;
      right: 0.8rem;
      z-index: 999;
      display: flex;
      width: 1.2rem;
      height: 1.2rem;
      align-items: center;
      justify-content: center;
      >span {
        display: inline-block;
        width: 18px;
        height: 19px;
        background: url(./image/share-ico.png) no-repeat center;
        background-size: 100% 100%;
      }
    }
    .img{
      width: 100%;
      height: 5.61rem;
      margin-bottom: 0.56rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .headerImg{
      position: absolute;
      top:6rem;
      left: 8.35rem;
      width: 1.03rem;
      height: 1.03rem;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .title{
      padding-left: 0.51rem;
      padding-right: 2rem;
      font-size:0.48rem;
      font-weight:bold;
      color:rgba(0,0,0,1);
      margin-bottom: 0.3rem;
    }
    .lei{
      padding-left: 0.47rem;
      margin-bottom: 0.33rem;
      >span{
        border: 1px solid #d5d5d5;
        padding: 0 0.15rem;
        font-size:0.27rem;
        font-weight:400;
        color:rgba(172,172,172,1);
        border-radius: 0.1rem;
        margin-right: 0.1rem;
      }
    }
    .txt{
      padding: 0 0.48rem;
      font-size:0.32rem;
      margin-bottom: 0.51rem;
      font-weight:400;
      color:rgba(0,0,0,1);
    }
    .content{
      padding-left: 0.48rem;
      padding-right: 0.52rem;
      img{
        width: 100%;
      }
    }
    .share{
      position: fixed;
      top: 0;
      width: 100%;
      max-width: 640px;
      height: 100%;
      z-index: 9999;
      background: rgba(1,1,1,0.8);
      >.make{
        position: absolute;
        width: 100%;
        height: 7.63rem;
        margin: auto;
        bottom: 0;
        background: #fff;
        >.title{
          position: absolute;
          top: 0.57rem;
          left: 0.48rem;
          font-size:0.45rem;
          color: #000;
        }
        >.icon-close1 {
          position: absolute;
          top: 0.59rem;
          right: 0.44rem;
          width: 0.47rem;
          height: 0.47rem;
          background: url(./image/cancel.png) no-repeat center;
          background-size: 100% 100%;
        }
        >.content {
          position: absolute;
          display: flex;
          flex-wrap: wrap;
          top: 2rem;
          width: 100%;
          padding: 0 0 0 0.87rem;
          > div {
            width: 1.4rem;
            margin-right: 0.85rem;
            margin-bottom: 0.77rem;
            > p {
              font-size: 0.32rem;
              color: #000;
              text-align: center;
            }
            >div{
              width: 1.4rem;
              height: 1.4rem;
              margin-bottom: 0.28rem;
              border-radius: 50%;
            }
            .wx{
              background:url("./image/WeChat-ico.png") no-repeat center #07BE14;
              background-size:0.92rem,0.72rem;
            }
            .circle{
              background:url("./image/moments-ico.png") no-repeat center #EF7665;
              background-size:0.96rem,0.96rem;
            }
            .qq{
              background:url("./image/qq-ico.png") no-repeat center #17ACFC;
              background-size:0.69rem,0.83rem;
            }
            .space{
              background:url("./image/qq-zone-ico.png") no-repeat center #FFC000;
              background-size:0.88rem,0.83rem;
            }
            .sina{
              background:url("./image/weibo-ico.png") no-repeat center #DD4844;
              background-size:0.91rem,0.75rem;
            }
            .copy{
              background:url("./image/link-ico.png") no-repeat center #02C7B6;
              background-size:0.79rem,0.79rem;
            }
          }
        }
      }
    }
  }
</style>
