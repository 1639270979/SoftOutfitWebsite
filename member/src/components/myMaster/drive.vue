<template>
  <div id="drive">
    <div class="driveback" @click="backFun"><span class="icon-back"></span></div>
    <div id="icon" @click="share"><span></span></div>
    <div class="header"  @touchmove="blur">
      <div class="img"><img :src="info.cover" alt=""></div>
      <p class="title">{{info.activity_name}}</p>
      <div class="content" v-html="info.intro" id="txt"></div>
      <div class="txt">
        <p>地址：{{info.address}}</p>
        <p>时间：{{info.activity_time}}</p>
        <p>费用：{{info.price}}</p>
        <p>电话：{{info.mobile}}</p>
      </div>
      <router-link v-if="!info.is_end" :to="'/index/myMaster/pay/'+info.activity_id" class="btn">我要报名</router-link>
      <a class="btn" v-else>报名已结束</a>
    </div>
    <div class="message" id="message" @touchmove="blur">
      <p class="title2">全部评论：</p>
      <div class="list" v-for="item in info.message">
        <div class="headerImg"><img :src="item.headimg" alt=""></div>
        <p class="name">{{item.name}}</p>
        <p class="text">{{item.content}}</p>
        <p class="time">{{item.addtime}}</p>
      </div>
    </div>
    <div class="footer">
      <input type="text" id="input"  v-model="content" placeholder="留言......">
      <span @click="release">发布</span>
    </div>
    <confirmPrompt @rightBtn="goLoginFun"></confirmPrompt>
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
          <div class="getCopy" :data-clipboard-text="link" @click="copy">
            <div class="copy"></div>
            <p>复制链接</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { activityDetail ,elitaMessage } from '../../common/axios/api.js';
  import { WeChatConfig } from '../../common/public/WeChatConfig.js';

  import Clipboard from 'clipboard';
  export default{
    data(){
        return{
          aid:this.$route.params.aid,
          isWx:false,
          isShare:false,
          link:'',
          bfUrl:'',
          info:'',
          content:'',
          islogin:'',
          wxSystem     : this.$store.state.publicJS.wxSystem,
        }
      },
    methods:{
      blur:function(){
        var input = document.getElementById("input");
        input.blur();
      },
      txtFun: function(str,time) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },time);
      },
      share:function(){
        this.isShare=true;
        this.scroll.afterOpen();
      },
      shareFun:function(type){
        var id = this.aid;
        var imgUrl= this.info.cover;
        var title = this.info.activity_name;
        if(type=='wx') {
          this.isShare=false;
          this.scroll.beforeClose();
          window.appModel.postMessage(JSON.stringify({
            "funName":'share',
            "platform":'wechat',
            "title":title,
            "url" :'member.idmei.com/topage?i=index&c=myMaster&a=drive&id='+id,
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
            "url" :'member.idmei.com/topage?i=index&c=myMaster&a=drive&id='+id,
            "imageUrl":imgUrl,
            "text":"大美软装-新零售创意家饰网络平台！"
          }))
        }
      },
      copy:function(){
        var clipboard = new Clipboard('.getCopy');
        var link = 'member.idmei.com/topage?i=index&c=myMaster&a=drive&id='+this.aid;
        this.link = link;
        clipboard.on('success', e => {
          this.txtFun('复制链接成功',1000);
          // 释放内存
          clipboard.destroy();
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制');
          // 释放内存
          clipboard.destroy()
        })
      },
      backFun:function(){
      if(this.bfUrl==null){
        this.$router.push('/index');
      }else{
        this.$router.go(-1);
      }
    },
      ajaxFun:function(){
        activityDetail({aid:this.aid}).then(data=>{
          this.islogin = data.isLogin;
          if(data.code==1){
            this.info = data.info;
          }
        })
      },
      confirmPromptFun: function(str,btn) {
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
      },
      release:function(){
        if(!(/\S/.test(this.content))){
          this.txtFun('留言内容不能为空',1000);
          return;
        }
        if(this.islogin) {
          elitaMessage({aid: this.aid, content: this.content}).then(data => {
            this.info.message.unshift(data.data);
            this.content='';
          })
        }else{
          if (this.wxSystem) {
            this.confirmPromptFun('请先完善资料','去完善');
            return;
          }
          this.confirmPromptFun('请先登陆','去登陆');
        }
      }
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
    mounted(){
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") { //判断是否为微信浏览器
        this.isWx=true;
      }else{
        this.isWx=false;
      }
      this.$nextTick(function(){
          setTimeout(()=>{
            var icon = document.getElementById('icon');
            var back = document.getElementsByClassName('driveback')[0];
            if(this.isWx) {
              var close = document.getElementsByClassName('wxheader')[0].children[0];
              close.onclick=function(){
                icon.setAttribute('style','top:0rem');
                back.setAttribute('style','top:0');
              };
              icon.setAttribute('style','top:1.5rem');
              back.setAttribute('style','top:1.5rem');
            }else{
              icon.setAttribute('style','top:0rem');
              back.setAttribute('style','top:0');
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
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin_750.less';
  #drive{
    width: 100%;
    .driveback {
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
    .header{
      padding-bottom: 0.81rem;
      .img{
        width: 100%;
        height: 5.61rem;
        margin-bottom: 0.67rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .title{
        font-size:0.35rem;
        font-weight:bold;
        color:rgba(0,0,0,1);
        margin-bottom: 0.48rem;
        padding-left: 0.48rem;
      }
      .content{
        padding-left: 0.48rem;
        padding-right: 0.48rem;
        margin-bottom: 0.79rem;
      }
      .txt{
        padding-left: 0.48rem;
        padding-right: 0.48rem;
        font-size:0.32rem;
        font-weight:400;
        color:rgba(0,0,0,1);
        margin-bottom: 1.19rem;
      }
      .btn{
        display: block;
        width:9.01rem;
        height:1.16rem;
        background:rgba(31,78,121,1);
        margin: auto;
        font-size:0.4rem;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:1.16rem;
        text-align: center;
      }
    }
    .message{
      padding-bottom: 1.27rem;
      padding-left: 0.44rem;
      padding-right: 0.79rem;
      .title2{
        font-size:0.45rem;
        font-weight:400;
        color:rgba(0,0,0,1);
        padding-left: 0.09rem;
        margin-bottom: 0.6rem;
      }
      .list{
        position: relative;
        padding-bottom: 0.5rem;
        .headerImg{
          position: absolute;
          top: 0;
          left: 0;
          width: 1.12rem;
          height: 1.12rem;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .name,.text,.time{
          padding-left: 1.49rem;
        }
        .name{
          margin-top: 0.1rem;
          margin-bottom: 0.2rem;
          font-size:0.35rem;
          font-weight:400;
          color:rgba(143,143,143,1);
        }
        .text{
          margin-bottom: 0.25rem;
          font-size:0.35rem;
          font-weight:400;
          color:rgba(0,0,0,1);
        }
        .time{
          font-size:0.27rem;
          font-weight:400;
          color:rgba(144,143,143,1);
        }
      }
    }
    .footer{
      position: fixed;
      width: 100%;
      bottom: 0;
      height: 1.27rem;
      border-top: 1px solid #DCDCDC;
      background: #FFF;
      >input{
        width: 7.64rem;
        height: 0.88rem;
        background:#DCDCDC;
        margin-top: 0.15rem;
        margin-left: 0.41rem;
        text-indent: 0.59rem;
        border-radius: 0.5rem;
        color: #000;
      }
      >input::placeholder{
        color: #000;
      }
      >span{
        display: inline-block;
        width: 1rem;
        line-height: 1.3rem;
        font-size:0.43rem;
        font-weight:400;
        color:rgba(0,0,0,1);
        margin-left: 0.40rem;
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
