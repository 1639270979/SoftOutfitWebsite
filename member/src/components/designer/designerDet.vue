<template>
  <div id="designerDet">
    <div class="top" v-if="info != ''" :style="info.homepage_bg==''?styleObj:'background:url('+info.homepage_bg+');background-size:100%,100%'">

      <div class="img" @click="picZoomFun(info.homepage_headimg)">
        <img class="bg-img" :src="info.homepage_headimg" ref="bgImg">
        <img :src="info.homepage_headimg">
      </div>
      <p class="name">{{ info.name }}</p>
      <p class="adres">{{ info.province+info.city }}</p>
      <div class="top-bottom">
        <div class="left">
          <div class="stars">
            <span v-for="key in 5" :class="key <= info.level?'span action':'span'"></span>
          </div>
          <div class="num">接单数量：{{ info.orders }}单</div>
        </div>
        <div class="right">
          <!-- <router-link :to="'/index/designer/det/please/'+item.designer_id"></router-link> -->
          <a class="btn" @click="pleaseFun(info.is_orders,info.doneOrder)">请TA设计</a>
        </div>
      </div>
    </div>
    <div class="introduce">
      <div :class="info.is_collect == 'Y'? 'like action':'like'" @click="cancelFun(info.designer_id)"></div>
      <p class="title">设计师介绍</p>
      <p class='txt-hide'>{{info.introduce?info.introduce:'该设计师暂无自我介绍' }}</p>
    </div>
    <div class="nav">
      <div :class="type==1?'action':''" @click="typeFun(1)"><span>案例</span></div>
      <div :class="type==2?'action':''" @click="typeFun(2)"><span>留言</span></div>
    </div>
    <div class="programmeList" v-show="type == 1">
      <ul>
        <!--<router-link tag="li" v-for="caseList in item" :key="caseList"-->
          <!--:to="caseList.type==1?'/index/designer/programmeDet/'+caseList.case_id:'/index/designer/planDet/'+caseList.case_id">-->
          <!--<p>{{ caseList.title }}</p>-->
          <!--<div v-for="picList in caseList.picList">-->
            <!--<img v-lazy="picList.picture">-->
          <!--</div>-->
        <!--</router-link>-->
        <router-link tag="li" v-for="caseList in item" :key="caseList"
        :to="caseList.type==1?'/index/designer/programmeDet/'+caseList.case_id:'/index/designer/planDet/'+caseList.case_id">
        <p>{{ caseList.title }}</p>
        <div>
          <img v-lazy="caseList.picture">
        </div>
        </router-link>
      </ul>
    </div>
    <div class="messageList" v-show="type == 2">
      <div class="message">
        <textarea placeholder="请在此写下您想对我说的话......" v-model='release'></textarea>
        <span class="fr-btn" @click="releaseFun()">发布</span>
      </div>
      <div class="list">
        <ul v-if="msgItems.length > 0">
          <li v-for="msgItem in msgItems">
            <div class="msg-top">
              <div class="msg-img"><img :src="msgItem.headimg" v-if="msgItem.headimg != ''"><img src="./image/dsgImg.png"v-else></div>
              <div class="msg-info">
                <p class="neme">{{ msgItem.name }}</p>
                <p class="time">{{ msgItem.time }}</p>
                <p class="content">{{ msgItem.content}}</p>
              </div>
              <div class="icon" @click="replyFun(msgItem)"><span class="icon-msg"></span><span class="txt">回复</span></div>
            </div>
            <div class="reply-list">
              <ul v-if="msgItem.reply.length > 0">
                <p v-if="msgItem.reply.length > 3"><span>{{msgItem.reply_str}}</span>{{ '等'+msgItem.reply_count+'人回复'}}</p>
                <p v-if="msgItem.reply.length <= 3 && msgItem.reply.length > 0"><span>{{msgItem.reply_str}}</span>{{'共'+msgItem.reply_count+'人回复'}}</p>

                <li v-for="item in msgItem.reply" @click="replyFun1(item,msgItem.id)">
                  <span>{{ item.name }}</span>
                  <span v-if="item.recorder== ''">：</span>{{ item.recorder!= ''?" 回复 ":""}}<span v-if="item.recorder!= ''">{{ item.recorder}}：</span> {{ item.content }}</li>
              </ul>
              <div class="reply-layer" v-if="msgItem.id == id">
                <input class="input" type="text" @blur="blurFun" :ref="'reply'+msgItem.id" v-model.trim="replyTxt" :placeholder="placeholder">
                <span @click="sendOutFun(msgItem)">发送</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <confirmPrompt @rightBtn="goLoginFun"></confirmPrompt>
    <!-- 图片放大 -->
    <div class="pswp" id="iosMask" style="display: none;">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap" @click="alert(1)">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>
            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>

          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
    <myLoading :isLoading='isLoading' :isList="isList" v-show="type == 1"></myLoading>
    <myLoading :isLoading='isLoading2' :isList="isList2" v-show="type == 2"></myLoading>
  </div>
</template>
<script>
  import { designerDet,designerCollect,designerMsg,designerPostMsg } from '../../common/axios/api.js';
  import PhotoSwipe from 'photoswipe';
  import { WeChatConfig } from '../../common/public/WeChatConfig.js';
  import { iscrollAjax } from '../../common/public/iscroll.js';
  import myLoading from '../../components/loading/Loading.vue';
  export default {
    data() {
      return {
        item         : [],	//方案
        info         :'',
        page         : 1,
        pageSize     : 10,
        msgItems     : [],	//留言
        msgPage      : 1,
        msgPageSize  : 5,
        did          : this.$route.params.did,
        type         : 1,
        islogin      : '',
        release      : '',
        id           : '',
        replyTxt     : '',
        isBool		 : false,
        replyId		 : '',	//回复谁的id
        replyName	 : '',
        placeholder  : '',
        isOpen       : true,
        wxSystem     : this.$store.state.publicJS.wxSystem,
        signPackage: {},
        val12:'',
        msgData:true,
        isLoading:false,
        isLoading2:false,
        isList:false,
        isList2:false,
        isData:true,
        styleObj:{
//          'background':'url("./../../../static/image/designer-bg.png") no-repeat',
          'background':'url("./../memberStatic/image/designer-bg.png") no-repeat',
          'background-size':'100%,100%'
        }
      }
    },
    components: {
      myLoading
    },
    methods: {
      ajaxFun: function(obj) {
        designerDet(obj).then(data => {
            this.info = data.info;
            for(var j = 0; j<data.info.caseList.length;j++){
              this.item.push(data.info.caseList[j])
            }
            if(this.item.length==0){
                this.isList=false
            }else{
                this.isList=true
            }
          this.islogin = data.islogin;
          if (this.wxSystem) {
            this.signPackage = data.signPackage;
            this.wxConfig();
          }
          if(data.info.caseList.length < this.pageSize){
            this.isData=false;
            this.isLoading=false
          }else{
            this.isData=true;
            this.isLoading=true
          }
        })
      },
      iscroll:function(){
        iscrollAjax(()=>{
          if(this.msgData && this.type==2){
            this.msgData=false;
//            this.isLoading2=true;
            this.msgPage+=1;
            let msgObj = {'did':this.did,'page':this.msgPage,'pageSize':this.msgPageSize};
            this.msgAjaxFun(msgObj);
          }
          if(this.isData && this.type==1){
            this.isData=false;
//            this.isLoading=false;
            this.page+=1;
            let obj = {'did':this.did,'page':this.page,'pageSize':this.pageSize};
            this.ajaxFun(obj);
          }
        })
      },
      wxConfig: function() {
        let this_ = this;
        let obj = {
          appId     : this.signPackage.appId,
          timestamp : this.signPackage.timestamp,
          nonceStr  : this.signPackage.nonceStr,
          signature : this.signPackage.signature
        }
        WeChatConfig(obj);
        wx.ready(function(){
          //分享朋友圈
          wx.onMenuShareTimeline({
            title: '设计师：'+this_.item.name, // 分享标题
            link: 'http://member.idmei.com/topage?i=index&c=designer&a=designerDet&id='+this_.did, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: this_.item.homepage_headimg != ''?this_.item.homepage_headimg:'http://member.idmei.com/static/m/image/idmei_05.png', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          //分享给朋友
          wx.onMenuShareAppMessage({
            title: '设计师：'+this_.item.name, // 分享标题
            desc: '大美软装-新零售创意家饰网络平台！', // 分享描述
            link: 'http://member.idmei.com/topage?i=index&c=designer&a=designerDet&id='+this_.did, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: this_.item.homepage_headimg != ''?this_.item.homepage_headimg:'http://member.idmei.com/static/m/image/idmei_05.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        });
      },
      msgAjaxFun: function(msgObj) {
        designerMsg(msgObj).then(data => {
          if (data.code == 1) {
            for (var i = 0; i < data.message.length; i++) {
              this.msgItems.push(data.message[i]);
            }
          }
          if(this.msgItems.length==0){
            this.isList2=false;
          }else{
            this.isList2=true;
          }
          if(data.message.length<this.msgPageSize){
            this.msgData=false;
            this.isLoading2=false;
          }else{
            this.msgData=true;
            this.isLoading2=true;
          }
        })
      },
      pleaseFun: function(status,doneOrder) {	//请他做设计
        if (!this.islogin) {
          if (this.wxSystem) {
            this.confirmPromptFun('请先完善资料','去完善');
            return;
          }
          this.confirmPromptFun('请先登陆','去登陆');
        }else {
          if (status == 1) {
            if (doneOrder == 'Y') {
              this.txtShowFun('您有该设计师未完成订单');
              return;
            }
            this.$router.push({path: '/index/designer/det/please/'+this.did})
          }else if (status == 2) {
            this.txtShowFun('该设计师不接单');
          }
        }
      },
      cancelFun: function(id) {//收藏
        let type = this.item.is_collect == 'Y'? 'del':'add';
        let obj = {'type':type,'did':id};
        designerCollect(obj).then(data => {
          if (data.islogin == false) {
            if (this.wxSystem) {
              this.confirmPromptFun('请先完善资料','去完善');
              return;
            }
            this.confirmPromptFun('请先登陆','去登陆');
          }else {
            this.info.is_collect = this.info.is_collect == 'Y'?'N':'Y';
          }
        })
      },
      typeFun: function(n) {
        this.type = n;
      },
      releaseFun: function() {	//发布
        if (this.islogin) {
          if ((/\S/.test(this.release))) {
            var arr = [];
            var msgItems = this.msgItems;
            let obj = {'did':this.did,'id':0,'content':this.release}
            designerPostMsg(obj).then(data => {
              if (data.code == 1) {
                arr.push(data.data[0]);
                for (var i = 0; i < msgItems.length; i++) {
                  arr.push(msgItems[i])
                }
                this.msgItems = arr;
                this.release = '';
              }
            })
          }else {
            this.txtShowFun('内容不能为空');
          }
        }else {
          if (this.wxSystem) {
            this.confirmPromptFun('请先完善资料','去完善');
            return;
          }
          this.confirmPromptFun('请先登陆','去登陆');
        }
      },
      replyFun: function(item) {	//回复
        if (this.islogin) {
        this.id = item.id;
          this.$nextTick(function () {
            this.$refs['reply'+this.id][0].focus();
          })
        }else {
          if (this.wxSystem) {
            this.confirmPromptFun('请先完善资料','去完善');
            return;
          }
          this.confirmPromptFun('请先登陆','去登陆');
        }
      },
      replyFun1: function(item,id) {//回复谁
        if (this.islogin) {
          this.placeholder = '回复'+item.name;
          this.replyName = item.name;
          this.replyId = item.id;
          this.id = id;
          this.$nextTick(function () {
            this.$refs['reply'+id][0].focus();
          });
          this.isBool = true;
        }else {
          if (this.wxSystem) {
            this.confirmPromptFun('请先完善资料','去完善');
            return;
          }
          this.confirmPromptFun('请先登陆','去登陆');
        }
      },
      blurFun: function() {
        setTimeout(()=>{
          this.placeholder = '';
          this.id = '';
        },200);
      },
      sendOutFun: function(item) {	//发送
        if ((/\S/.test(this.replyTxt))) {
          var name = '';
          if (this.isBool) {
            let obj = {'did':this.did,'id':this.replyId,'content':this.replyTxt}
            designerPostMsg(obj).then(data => {
              if (data.code == 1) {
                name = data.data[0].name;
                this.replyTxt = '';
                this.isBool = false;
                let arr = [];
                data.data[0]['recorder'] = this.replyName;
                arr.push(data.data[0]);
                for (var i = 0; i < item.reply.length; i++) {
                  arr.push(item.reply[i]);
                }
                item.reply = arr;
                if (item.reply_arr.length < 3 && item.reply_arr.indexOf(name) < 0) {
                  item.reply_str += '、'+name;
                  item.reply_arr.push(name);
                }
              }
            })
          }else {
            let obj = {'did':this.did,'id':item.id,'content':this.replyTxt}
            designerPostMsg(obj).then(data => {
              if (data.code == 1) {
                name = data.data[0].name;
                this.replyTxt = '';
                let arr = [];
                arr.push(data.data[0]);
                for (var i = 0; i < item.reply.length; i++) {
                  arr.push(item.reply[i]);
                }
                item.reply = arr;
                item.reply_count=item.reply[0].reply_count;
                if (item.reply_arr.length < 3 && item.reply_arr.indexOf(name) < 0) {
                  if (item.reply_arr.length == 0) {
                    item.reply_str += name;
                  }else {
                    item.reply_str += '、'+name;
                  }
                  item.reply_arr.push(name);
                  item.reply_count += 1;
                }
              }
            })
          }
        }else {
          this.txtShowFun('内容不能为空');
        }
      },
      picZoomFun: function(img) {
        let bgImgWidth = this.$refs.bgImg.width;//大图片宽度
        let bgImgHeight = this.$refs.bgImg.height;//大图片高度
        let multiples = document.body.offsetWidth / bgImgWidth;//倍数
        var items = [{
          src: img,
          w  : bgImgWidth * multiples,
          h  : bgImgHeight * multiples
        }];
        document.getElementById('iosMask').style.display = 'block';
        var pswpElement = document.querySelectorAll('.pswp')[0];
        var options = {
          history: false,
          focus: false,
          allowRotationOnUserZoom: true,//旋转
          preventHide: true,
          preventDefaultTouchEvents: false,
          showAnimationDuration: 0,
          hideAnimationDuration: 0
        };
        var gallery = new PhotoSwipe(pswpElement,PhotoSwipeUI_Default,items,options);
        gallery.init();
        var startTx,startTy,starTime;
        gallery.template.addEventListener('touchstart',(e) => {
          let touches = e.touches[0];
          startTx = touches.clientX;
          startTy = touches.clientY;
        }, false );
        gallery.template.addEventListener("touchend",(e) => {
          let touches = e.changedTouches[0],
            endTx = touches.clientX,
            endTy = touches.clientY;
          if( Math.abs(startTx - endTx) < 6 && Math.abs(startTy - endTy) < 6){
            gallery.close();
          }
        }, false);
      },
      txtShowFun: function(str) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },1000);
      },
      openFun: function() {//展开&收起
        if (this.isOpen) {
          this.isOpen = false;
          return;
        }
        this.isOpen = true;
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
      }
    },
    computed: {
//      stars: function() {
//        let arr = [];
//        let len = 5;
//        let item = this.info;
//        for (var i = 0; i < item.level; i++) {
//          arr.push(true);
//        }
//        arr.length = len;
//        return arr;
//      }
    },
    created() {
      let obj = {'did':this.did,'page':this.page,'pageSize':this.pageSize};
      this.ajaxFun(obj);
      let msgObj = {'did':this.did,'page':this.msgPage,'pageSize':this.msgPageSize};
      this.msgAjaxFun(msgObj);
      this.iscroll();
    },
    mounted() {
      document.querySelector('body').addEventListener('touchend', function(e) {
        if(e.target.className != 'input' && document.querySelector('.input') != null) {
          document.querySelector('.input').blur();
        }
      });
      let height = this.$refs.introduce.clientHeight;
      if (height > 72) {
        this.isOpen = false;
      }else {
        this.isOpen = true;
      }
    },

  }
</script>
<style lang="less" scoped>
  @import '../../assets/mixin.less';
  @import './css/photoswipe.css';
  @import './css/default-skin.css';
  #designerDet {
    .top {
      position: relative;
      width: 100%;
      padding: 0.48rem 0.44rem 0.48rem 0.44rem;
      .img {
        position: relative;
        width:1.99rem;
        height:1.99rem;
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          border-radius: 50%;
        }
        .bg-img {
          position: absolute;
          width: 100%;
          opacity: 0;
        }
      }
      p {
        .rem(margin-top,9);
        .rem(line-height,28);
        .rem(font-size,28);
        color: #F6F6F6;
        text-align: center;
      }
      .adres {
        .rem(margin-top,17);
        .rem(margin-bottom,33);
        .rem(line-height,22);
        .rem(font-size,22);
        color: #F6F6F6;
      }
      .top-bottom {
        display: flex;
        width: 100%;
        overflow: hidden;
        align-items: center;
        justify-content: space-between;
        .stars {
          .rem(margin-bottom,20);
          overflow: hidden;
        }
        .span {
          float: left;
          .rem(width,20);
          .rem(height,19);
          .rem(margin-right,2);
          background: url(./image/stars-2.png) no-repeat;
          background-size: 100% 100%;
        }
        .action {
          background: url(./image/stars-1.png) no-repeat;
          background-size: 100% 100%;
        }
        .num {
          .rem(line-height,22);
          .rem(font-size,22);
          color: #F6F6F6;
        }
        .btn {
          display: inline-block;
          width:2.55rem;
          height:0.83rem;
          line-height:0.83rem;
          font-size: 0.35rem;
          color: #F6F6F6;
          text-align: center;
          .border-radius(10);
          background: #DE731C;
        }
      }
    }
    .introduce {
      position: relative;
      width: 100%;
      padding-top: 0.57rem;
      padding-bottom: 0.81rem;
      padding-left: 0.45rem;
      padding-right: 0.59rem;
      background: #fff;
      .like {
        padding: 0.3rem;
        position: absolute;
        top: 0.43rem;
        right: 0.54rem;
        width:0.52rem;
        height:0.44rem;
        z-index: 999;
        background: url(./image/bottom_ico_4_collection.png) no-repeat center;
        background-size: 0.52rem, 0.44rem;
      }
      .action {
        background: url(./image/bottom_ico_4_collection_state.png) no-repeat center;
        background-size: 0.52rem, 0.44rem;
      }
      .title{
        color: #000;
        font-size:0.37rem;
        font-weight: bold;
        margin-bottom: 0.47rem;
      }
      .txt-hide {
        color: #8F8F8F;
        font-size:0.32rem;
        width: 100%;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 4; /** 显示的行数 **/
        overflow: hidden;  /** 隐藏超出的内容 **/
      }

    }
    .nav {
      width: 100%;
      display: flex;
      justify-content: space-around;
      background: #fff;
      margin-top: 0.2rem;
      border-bottom:1px solid #eee;
      div{
        padding-top:0.44rem;
        padding-bottom: 0.29rem;
      }
      span{
        font-size:0.45rem;
        color: #000;
      }
      .action {
        .border(border-bottom,6,#DE731C);
      }
    }
    .programmeList {
      li {
        width: 100%;
        padding: 0.81rem 0.51rem 0 0.49rem;
        overflow: hidden;
        background: #fff;
        &:last-of-type {
          border-bottom: 0;
          padding-bottom: 0.5rem;
        }
        p {
          font-size:0.4rem;
          color: #000;
          font-weight: bold;
          margin-bottom: 0.41rem;
        }
        div {
         width: 100%;
          img {
            width: 100%;
            .rem(min-height,105.75);
          }
        }
      }
    }
    .messageList {
      .message {
        width: 100%;
        .rem(padding-top,26);
        .rem(padding-left,24);
        .rem(padding-right,26);
        font-size: 0;
        background: #fff;
        overflow: hidden;
        textarea {
          width: 100%;
          .rem(height,158);
          .rem(margin-bottom,10);
          .rem(padding-top,25);
          .rem(padding-bottom,25);
          .rem(padding-left,15);
          .rem(padding-right,15);
          .rem(font-size,22);
          color: #999;
          border: 0;
          .border-radius(10);
          outline: none;
          resize: none;
          background: #eee;
        }
        .fr-btn {
          float: right;
          .rem(width,138);
          .rem(height,44);
          .rem(margin-bottom,16);
          .rem(line-height,44);
          .rem(font-size,22);
          color: #fff;
          text-align: center;
          .border-radius(10);
          background: #d65317;
        }
      }
      .list {
        >ul>li {
          width: 100%;
          .rem(margin-top,2);
          .rem(padding-top,30);
          .rem(padding-bottom,30);
          .rem(padding-left,25);
          .rem(padding-right,25);
          background: #fff;
        }
        .msg-top {
          position: relative;
          width: 100%;
          overflow: hidden;
          > div {
            float: left;
          }
        }
        .msg-img {
          .rem(width,70);
          .rem(height,70);
          overflow: hidden;
          img {
            width: 100%;
            .rem(min-height,70);
            border-radius: 50%;
          }
        }
        .msg-info {
          width: 100%;
          .rem(margin-left,-70);
          .rem(padding-left,90);
          color: #333;
          .name {
            .rem(margin-top,3);
            .rem(line-height,28);
            .rem(font-size,28);
          }
          .time {
            .rem(margin-top,20);
            .rem(line-height,22);
            .rem(font-size,22);
            color: #999;
          }
          .content {
            .rem(margin-top,9);
            .rem(margin-bottom,20);
            .rem(line-height,44);
            .rem(font-size,26);
          }
        }
        .icon {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 0;
          > span {
            .rem(font-size,22);
            color: #999;
            vertical-align: middle;
          }
          .icon-msg {
            display: inline-block;
            .rem(width,20);
            .rem(height,20);
            .rem(margin-right,15);
            background: url(./image/reply.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        .reply-list {
          width: 100%;
          .rem(padding-left,90);
          ul {
            .rem(padding-top,10);
            .rem(padding-left,24);
            .rem(padding-right,4);
            .rem(padding-bottom,14);
            .border-radius(10);
            background: #eee;
            > p {
              .rem(font-size,24);
              color: #333;
              span {
                color: #306aad;
              }
            }
          }
          li {
            .rem(line-height,44);
            .rem(font-size,24);
            span {
              color: #306aad;
            }
          }
        }
      }
    }
    .reply-layer {
    position: relative;
    bottom: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    .rem(height,94);
    .rem(padding-top,20);
    .rem(padding-bottom,20);
    .rem(padding-left,20);
    .rem(padding-right,20);
    .rem(line-height,54);
    background: #fff;
    input {
      float: left;
      width: 80%;
      .rem(height,54);
      padding: 0;
      .rem(padding-left,20);
      .rem(padding-right,20);
      .rem(font-size,22);
      color: #333;
      border: 0;
      .border-radius(10);
      background: #eee;
      outline: none;
    }
    span {
      float: right;
      width: 15%;
      .rem(height,54);
      .rem(line-height,54);
      .rem(font-size,22);
      color: #fff;
      text-align: center;
      .border-radius(10);
      background: #d65317;
    }
  }
  }
</style>
