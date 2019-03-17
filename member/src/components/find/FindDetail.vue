<template>
	<div id="findDetail" v-if="Object.keys(item).length != 0">
    <div class="back" @click="backFun"><span class="icon-back"></span></div>
    <div id="findicon" ref="myIcon" @click="share"><span></span></div>
		<div class="box"></div>
		<div class="banner">
			<img :src="item.pic">
		</div>
		<div class="box"></div>
		<div class="body">
			<div class="title">
				<p>{{item.title}}</p>
				<div class="like" :class="collect=='yes'?'action':''" @click="likeFun">
					<span class="icon-like"></span>
					<!-- <span class="txt" v-if='collect == "yes"'>已收藏</span>
					<span class="txt" v-else>收藏</span> -->
				</div>
			</div>
			<div class="content" id="content" v-html="item.content">

      </div>
		</div>
		<div class="box"></div>
		<div class="page" v-if="is_page != 1">
			<a class="pre" @click="jump(pre)" v-if="pre">{{ne}}</a>
			<a class="next" @click="jump(next)" v-if="next">下一篇>></a>
		</div>
		<div class="box"></div>
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
		<confirmPrompt
			@rightBtn="goLoginFun"></confirmPrompt>
		<my-zoom
			:isZoomShow="isZoomShow"
			@update:isZoomShow="val => isZoomShow = val"
			:zoomImgArr='zoomImgArr'
			:zoomIndex='zoomIndex'></my-zoom>
	</div>
</template>
<script>
	import { findDetail,findCollect } from '../../common/axios/api.js';
	import myZoom from '../public/zoom.vue'
  import Clipboard from 'clipboard';
  export default {
		data() {
			return {
				id           : this.$route.params.id,
				is_page      : this.$route.params.is_page?this.$route.params.is_page:'',
				item         : {},
				next         : '',
				pre          : '',
				collect      : '',
				wxSystem: this.$store.state.publicJS.wxSystem,
				isZoomShow: false,
				zoomImgArr: [],
				zoomIndex: 0,
        ne:'<<上一篇',
        bfUrl:'',
        isWx:'',
        isShare:false,
        link:'',
        scroll:null,
        clipboard:null
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
        findDetail(this.id).then(data => {
					this.collect = data.collect;
					this.item = data.article;
          if (data.nextArticle) {
						this.next = data.nextArticle.article_id;
					}else {
						this.next = '';
					}
					if (data.preArticle) {
						this.pre = data.preArticle.article_id;
					}else{
						this.pre= '';
					}
          this.setBR();
					this.imgLoadFun();
				});
			},
			likeFun: function() {
				let type = this.collect == 'yes' ? 'del' : 'add';
				let obj = {'id':this.id,'type':type};
				findCollect(obj).then(data => {
					if (data.islogin) {
						this.collect = this.collect == 'yes' ? 'no' : 'yes';
					}else {
						if (this.wxSystem) {
							this.$store.state.publicJS.promptBoxMsg = '请先完善资料';
							this.$store.state.publicJS.confirmPromptBtnRight = '去完善';
						}else {
							this.$store.state.publicJS.promptBoxMsg = '请先登陆';
							this.$store.state.publicJS.confirmPromptBtnRight = '去登录';
						}
						this.$store.commit('confirmPrompt');
					}
				});
			},
			goLoginFun: function() {
				let url = this.$route.path;
				window.localStorage.setItem('url',url);
				if (this.wxSystem) {
					this.$router.push({path:'/login/perfect'});
					return;
				}
				this.$router.replace({path:'/login'});
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
          let p = document.getElementsByTagName('p');
          for (let i = 0;i < p.length;i++) {
            if (p[i].firstChild.nodeName == 'BR') {
              p[i].style.height = 10 + 'px';
            }
          }
          p = null;
          //图片放大
          let content = document.getElementsByClassName('content')[0];
          content.addEventListener('click',(e) => {
            if (e.target.nodeName == 'IMG') {
              this.zoomImgArr = [];
              this.isZoomShow = true;
              this.zoomImgArr.push(e.target);
              this.zoomIndex = 0;
            }
          })
        });
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
      shareFun:function(type){
        var id = this.id;
        var imgUrl= this.item.pic;
        var title = this.item.title;
        if(type=='wx') {
          this.isShare=false;
          this.scroll. beforeClose();
          window.appModel.postMessage(JSON.stringify({
            "funName":'share',
            "platform":'wechat',
            "title":title,
            "url" :'member.idmei.com/topage?i=find&c=findDetail&a='+id+'&id=1',
            "imageUrl":imgUrl,
            "text":"大美软装-新零售创意家饰网络平台！"
          }))
        }else if(type=='circle'){
          this.isShare=false;
          this.scroll. beforeClose();
          window.appModel.postMessage(JSON.stringify({
            "funName":'share',
            "platform":'wechatMoments',
            "title":title,
            "url" :'member.idmei.com/topage?i=find&c=findDetail&a='+id+'&id=1',
            "imageUrl":imgUrl,
            "text":"大美软装-新零售创意家饰网络平台！"
          }))
        }
      },
      share:function(){
        this.isShare=true;
        this.scroll.afterOpen();
      },
		},
		components: {
			myZoom
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
      this.clipboard = new Clipboard('.getCopy');
      this.link='member.idmei.com/topage?i=find&c=findDetail&a='+this.id+'&id=1';
      this.clipboard.on('success', e => {
        this.txtFun('复制链接成功',1000);
      });

      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") { //判断是否为微信浏览器
        this.isWx=true;
      }else{
        this.isWx=false;
      }
      this.$nextTick(function() {
        setTimeout(()=>{
          var back = document.getElementsByClassName('back')[0];
          var icon = document.getElementById('findicon');
          if(this.isWx){
            var close = document.getElementsByClassName('wxheader')[0].children[0];
            close.onclick = function () {
              back.setAttribute('style', 'top:0rem');
              icon.setAttribute('style', 'top:0rem');
            };
            back.setAttribute('style','top:1.5rem');
            icon.setAttribute('style','top:1.5rem');
          }else{
            back.setAttribute('style','top:0rem');
            icon.setAttribute('style', 'top:0rem');
          }
        },500)
      });
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
<style lang="less">
	@import '../../assets/mixin.less';
	#findDetail{
    .back {
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
        background: url(../login/image/back.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    #findicon {
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
