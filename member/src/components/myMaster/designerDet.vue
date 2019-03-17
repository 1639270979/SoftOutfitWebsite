<template>
  <div id="designerDet">
    <div id="desigicon" @click="share"><span></span></div>
    <div class="img"><img :src="info.cover" alt=""></div>
    <div class="info">
      <p class="name">{{info.name}}<span>{{info.area_name}}</span></p>
      <p class="txt">{{info.company}}</p>
      <div :class="this.collect?'collect action':'collect'" @click="likeFun(collect)">
        <span>{{collect?'已收藏':'收藏'}}</span>
      </div>
      <div @click="entrustFun" class="btn">委托设计</div>
      <div class="lei">
        <span v-for="item in info.label">{{item}}</span>
      </div>
      <p :class="isOver?'content over':'content'" >{{info.introduce}}</p>
      <span :class="isOver?'after af2':'after'" @click="overFun(isOver)">
        <i :class="isOver?'jian1':'jian'"></i></span>
    </div>
    <p class="title" v-if="info.prize">设计界获奖殊荣</p>
    <div class="award">
      <div v-for="item in info.prize">
        <div class="boximg">
          <div class="img2"><img :src="item.picture" alt=""></div>
        </div>
        <div class="txt">
          <p>{{item.time}}</p>
          <p>{{item.info}}</p>
        </div>
      </div>
    </div>
    <div class="text-award" v-for="item in info.txt_prize">
      <p><span>{{item.time}}</span>&nbsp;&nbsp;&nbsp;{{item.info}}</p>
    </div>
    <p class="title">设计案例</p>
    <div class="list">
      <router-link tag="div" v-for="item in list" :to="'/index/myMaster/worksDet/'+item.case_id">
        <div class="img3"><img :src="item.picture" alt=""></div>
        <div class="top">
          <p class="title2">{{item.title}}</p>
          <p class="text">{{item.intro}}</p>
        </div>
      </router-link>
      <myLoading :isLoading='isLoading' :isList="isList"></myLoading>
    </div>
    <confirmPrompt @rightBtn="goLoginFun"></confirmPrompt>
    <!-- 分享弹窗 -->
    <div class="share" v-if="isShare">
      <div class="make">
        <p class="title123">分享到</p>
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
  import { designerDetail,eliteCaseList ,eliteCollect} from '../../common/axios/api.js';
  import { iscrollAjax } from '../../common/public/iscroll.js';
  import { WeChatConfig } from '../../common/public/WeChatConfig.js';
  import myLoading from '../loading/Loading.vue';
  import Clipboard from 'clipboard';
  export default{
      data(){
          return{
            did:this.$route.params.did,
            collect:'',
            mid:'',
            info:'',
            page: 1,
            pageSize:4,
            isLoading: true,
            isList:true,
            isData: true,
            list:[],
            islogin:'',
            wxSystem     : this.$store.state.publicJS.wxSystem,
            isOver:true,
            isShare:false,
            scroll:null,
            link:'',
            clipboard:null
          }
      },
    components: {
      myLoading,
    },
    methods:{
      iscroll(){
        iscrollAjax(() => {
          if (this.isData) {
            this.isData = false;
            let obj = {'pageSize':this.pageSize,'page':this.page,'did':this.did};
            this.listFun(obj);
          }
        });
      },
      ajaxFun(){
        designerDetail({did:this.did}).then(data=>{
          if(data.code==1){
            this.islogin = data.isLogin;
            this.info = data.info;
            this.collect = data.info.collect;
          }
        })
      },
      listFun(obj){
        eliteCaseList(obj).then(data=>{
          if(data.code==1){
              for( let val in data.list){
                this.list.push(data.list[val]);
              }
            if(this.list.length==0){
              this.isList=false;
            }else{
              this.isList=true;
            }
            if (data.list.length < this.pageSize) {
              this.isData = false;
              this.isLoading = false;
              return;
            }else {
              this.isData = true;
              this.isLoading = true;
              this.page ++;
            }
          }
        })
      },
      confirmPromptFun: function(str,btn) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.state.publicJS.confirmPromptBtnRight = btn;
        this.$store.commit('confirmPrompt');
      },
      entrustFun:function(){
        if(this.islogin){
          this.$router.push('/index/myMaster/please/'+this.did);
        }else{
          if (this.wxSystem) {
            this.confirmPromptFun('请先完善资料','去完善');
            return;
          }
          this.confirmPromptFun('请先登陆','去登陆');
        }
      },
      likeFun:function(n){
        if(this.islogin){
          let type = n?2:1;
          let obj = {did:this.did,type:type};
          eliteCollect(obj).then(data=>{
            if(data.code==1){
              this.collect = !this.collect;
            }
          });
        }else{
          if (this.wxSystem) {
            this.confirmPromptFun('请先完善资料','去完善');
            return;
          }
          this.confirmPromptFun('请先登陆','去登陆');
        }
      },
      goLoginFun: function() {
        this.$store.state.header.backName = this.$route.name;
        if (this.wxSystem) {
          this.$router.push({path:'/login/perfect'});
          return;
        }
        this.$router.push({path:'/login'});
      },
      overFun:function(e){
       if(!e){
         document.documentElement.scrollTop = document.body.scrollTop = 0;
       }
        this.isOver=!this.isOver;
      },
      share:function(){
        this.isShare=true;
        this.scroll.afterOpen();
      },
      shareFun:function(type){
        var id = this.did;
        var imgUrl= this.info.cover;
        var title = this.info.name;
        if(type=='wx') {
          this.isShare=false;
          this.scroll.beforeClose();
          window.appModel.postMessage(JSON.stringify({
            "funName":'share',
            "platform":'wechat',
            "title":title,
            "url" :'member.idmei.com/topage?i=index&c=myMaster&a=designerDet&id='+id,
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
            "url" :'member.idmei.com/topage?i=index&c=myMaster&a=designerDet&id='+id,
            "imageUrl":imgUrl,
            "text":"大美软装-新零售创意家饰网络平台！"
          }))
        }
      },
      txtFun: function(str,time) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },time);
      },
    },
    created(){
      this.ajaxFun();
      let obj = {'pageSize':this.pageSize,'page':this.page,'did':this.did};
      this.listFun(obj);
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
    mounted(){
      this.clipboard = new Clipboard('.getCopy');
      this.link='member.idmei.com/topage?i=index&c=myMaster&a=designerDet&id='+this.did;
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
          var icon = document.getElementById('desigicon');
          if(this.isWx) {
            var close = document.getElementsByClassName('wxheader')[0].children[0];
            close.onclick=function(){
              icon.setAttribute('style','top:0rem');
            };
            icon.setAttribute('style','top:1.5rem');
          }else{
            icon.setAttribute('style','top:0rem');
          }
        },500)
      })
    },
    destroyed(){
      this.clipboard.destroy();
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin_750.less';
  #designerDet{
    width: 100%;
    #desigicon {
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
      height: 5.08rem;
      margin-bottom: 0.31rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .info{
      position: relative;
      width: 100%;
      padding-left: 0.44rem;
      padding-right: 0.56rem;
      .name{
        font-size:0.4rem;
        font-weight:bold;
        color:rgba(40,40,40,1);
        >span{
          font-size:0.32rem;
          font-weight:400;
          color:rgba(40,40,40,1);
          margin-left: 0.21rem;
        }
      }
      .txt{
        font-size:0.29rem;
        font-weight:400;
        color:rgba(40,40,40,1);
        margin-top: 0.1rem;
        margin-bottom: 0.37rem;
      }
      .lei{
        >span{
          color: #ACACAC;
          padding: 0.05rem 0.19rem;
          font-size:0.27rem;
          border: 1px solid #D5D5D5;
          border-radius: 0.1rem;
          margin-right: 0.1rem;
        }
      }
      .collect{
        position: absolute;
        top: 0;
        left: 5.5rem;
        width:1.5rem;
        height: 0.87rem;
        background: url("./image/bottom_ico_4_collection.png") no-repeat top;
        background-size: 0.6rem,0.6rem;
        >span{
          display: inline-block;
          width: 100%;
          height: 100%;
          line-height:1.35rem;
          text-align: center;
        }
      }
      .action{
        background: url("./image/bottom_ico_4_collection_state.png") no-repeat top;
        background-size: 0.6rem,0.6rem;
      }
      .btn{
        position: absolute;
        top: 0;
        right:0.41rem;
        width: 2.09rem;
        height: 0.87rem;
        line-height:0.87rem;
        background: #FFC000;
        color: #fff;
        text-align: center;
        border-radius: 0.15rem;
      }
      .content{
        display: block;
        margin-top: 0.4rem;
        font-size:0.32rem;
        line-height:0.5rem;
        font-weight:400;
        color:rgba(40,40,40,1);
        text-align: justify;
        white-space: pre-wrap;
        word-break: break-all;
      }
      .over{
        position: relative;
        text-overflow:ellipsis;
        overflow:hidden;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:8; /*后面的3是设置显示几行*/

      }
      .after{
        font-size:0.32rem;
        position: absolute;
        display: inline-block;
        width: 100%;
        text-align: center;
        right: 0;
        bottom: -0.5rem;
        padding-left: 0rem;
        color: #0575f2;
        z-index: 2;
        padding-top: 1.5rem;
        .jian1{
          position: relative;
          top:0.3rem;
          display: inline-block;
          width: 0.9rem;
          height: 0.7rem;
          background: url("./image/xia.png") no-repeat center;
          background-size:100%,100%;
        }
        .jian{
          position: relative;
          top:0.3rem;
          display: inline-block;
          width: 0.9rem;
          height: 0.7rem;
          background: url("./image/shang.png") no-repeat center;
          background-size:100%,100%;
        }
      }
      .af2{
        background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(255, 255, 255, 0)), to(#fff));
        background: -moz-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
        background: -o-linear-gradient(top, rgba(255, 255, 255, 0), #fff);
        background: linear-gradient(top, rgba(255, 255, 255, 0), #fff);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#00ffffff, endColorstr=#ffffff, GradientType=0);
      }
    }
    .title{
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size:0.4rem;
      color: #282828;
      padding:1.03rem 0 0.76rem;
    }
    .award{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 0.54rem;
      >div{
        width: 4.33rem;
        height: 6.5rem;
        padding-bottom: 0.4rem;
        margin-bottom: 0.32rem;
        .boximg{
          width: 4.33rem;
          height: 4.33rem;
          background: #fff;
          border: 1px solid #eee;
          position: relative;
        }
        .img2{
          position: absolute;
          top:50%;
          left: 50%;
          right: 50%;
          width: 1.72rem;
          transform: translate(-50%, -50%);
          img{
            width: 100%;
            height: 100%;
          }
        }
        .txt{
          margin-top: 0.32rem;
          >p{
            text-align: center;
            color: #888;
            font-size: 0.29rem;
          }
        }
      }
    }
    .text-award{
      padding: 0 0.54rem;
      color: #282828;
      font-size: 0.29rem;
    }
    .list{
      width: 100%;
      >div{
        margin-bottom: 0.93rem;
        .img3{
          width: 100%;
          height: 5.33rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .top{
          width: 100%;
          padding: 0 0.33rem;
          .title2{
            font-size:0.35rem;
            font-weight:bold;
            color:rgba(40,40,40,1);
            margin-top: 0.39rem;
          }
          .text{
            margin-top: 0.28rem;
            font-size:0.32rem;
            font-weight:400;
            color:rgba(160,160,160,1);
            overflow: hidden;  /** 隐藏超出的内容 **/
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
            -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
            -webkit-line-clamp: 2; /** 显示的行数 **/
          }
        }
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
        >.title123{
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
