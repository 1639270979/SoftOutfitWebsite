<template>
	<div id="login">
    <div class="back" @click="backFun" >
      <span class="icon-back"></span>
      <span class="in">用户登录</span>
    </div>
    <!--<div class="logo"></div>-->
		<div class="info">
			<div class="tel">
				<span>手机</span>
				<div class="inp"><input type="tel" class="input" v-model.trim="tel" placeholder="请输入手机号码" onpaste="return false"></div>
			</div>
			<div class="psw">
				<span>密码</span>
				<div class="inp"><input type="password" class="input" v-model.trim="psw" placeholder="请输入登录密码" onpaste="return false"></div>
			</div>
		</div>
		<div class="forget-psw"><router-link to="/login/change" tag="span">忘记密码?</router-link></div>
		<div class="btn">
			<span @click="loginFun">登录</span>
			<router-link class="register" to="/login/register" tag="span">注册</router-link>
		</div>
		<div class="entrance" v-if="isWxShow != false || isQqShow != false">
			<div class="title"><span>使用第三方账号登陆</span></div>
			<div class="icon-qq" @click="qqLogin" v-if="isQqShow"><span></span></div>
      <div class="icon-wx" @click="wxLogin" v-if="isWxShow"><span></span></div>
		</div>
	</div>
</template>
<script>
	import { login,setCookie } from '../../common/axios/api.js';
  let Base64 = require("js-base64").Base64//还是require
	export default {
		data() {
			return {
				tel: '',
				psw: '',
				isWxShow  : false,
				isQqShow  : false,
        pw  : '', //加密密码
			}
		},
		methods: {
      backFun(){
        this.$router.push({path:'/index'})
      },
			loginFun: function() {
				if (!(/^1[3|4|5|6|7|8|9]{1}\d{9}$/.test(this.tel))) {
					this.txtPromptFun('手机号码有误');
					return;
				}else if (!(/\S/.test(this.psw))) {
					this.txtPromptFun('密码还未输入');
					return;
				}
        this.pw = Base64.encode(this.psw); //还是那些操作
				let obj = {'mobile':this.tel,'password':this.pw}
				login(obj).then(data => {
					if (data.status) {
						var url = window.localStorage.getItem('url');
						url = url == '' ? '/index' : url;
            console.log(url);
            this.$router.replace({path:url});
						window.appModel.postMessage(JSON.stringify({'funName':'cookie','url':'member.idmei.com','cookie':'member_id='+data.mid}));//调用原生设置cookie
						window.appModel.postMessage(JSON.stringify({'funName':'setAlias'}));//调用原生启用通知
					}else {
						this.txtPromptFun(data.msg);
						return;
					}
				});
			},
			txtPromptFun: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1500);
			},
			wxLogin: function() {
				let message = {'funName':'wxLogin'};
				this.sendInfoToNative(message);
			},
			qqLogin: function() {
				let message = {'funName':'qqLogin'};
				this.sendInfoToNative(message);
			},
			sendInfoToNative: function(msg) {//发给原生
				let isAndroid = window.navigator.appVersion.match(/android/gi);
				let isIPhone = window.navigator.appVersion.match(/iphone/gi);
				if (isAndroid) {
					window.appModel.postMessage(JSON.stringify(msg));//发给安卓
				}else if (isIPhone) {
					// AppModel就是已经注入的名称，注入以后，就可以在JS端调用了
					window.webkit.messageHandlers.AppModel.postMessage(msg);//发给IOS
				}
			}
		},
		mounted() {
			document.querySelector('body').addEventListener('touchend', function(e) {
				if(e.target.className != 'input' && document.querySelector('.input') != null) {
					document.querySelector('.input').blur();
				}
			});
		},
		created() {
			(function sendInfoToNative () {//发给原生
				let message = {'funName':'isWXInstalled'};
				let message1 = {'funName':'isQQInstalled'}
				let isAndroid = window.navigator.appVersion.match(/android/gi);
				let isIPhone = window.navigator.appVersion.match(/iphone/gi);
				if (isAndroid) {
					window.appModel.postMessage(JSON.stringify(message));//发给安卓
				}else if (isIPhone) {
					// AppModel就是已经注入的名称，注入以后，就可以在JS端调用了
					window.webkit.messageHandlers.AppModel.postMessage(message);//发给IOS
					window.webkit.messageHandlers.AppModel.postMessage(message1);
				}
			})();
			var this_ = this;
			window.getInfoFromNative = function(returnStr) {//原生调用
				let obj = JSON.parse(returnStr);
				if (obj.funName == 'isWXInstalled') {
					if (obj.code == 0) {
						this_.isWxShow = true;
					}
				}else if (obj.funName == 'isQQInstalled') {
					if (obj.code == 0) {
						this_.isQqShow = true;
					}
				}
				if (obj.funName == 'wxLogin') {
					if (obj.code == 'perfect') {//完善页面
						window.localStorage.setItem('openid',obj.openid);
						window.localStorage.setItem('source',1);
						this_.$router.push({path:'/login/perfect'});
					}else if (obj.code == 'success') {
						let objStr = {'openid':obj.openid,'source':1};
						setCookie(objStr).then(data => {
							if (data.status) {
								var url = window.localStorage.getItem('url');
								url = url == '' ? '/index' : url;
								this_.$router.replace({path:url});
								window.appModel.postMessage(JSON.stringify({'funName':'cookie','url':'member.idmei.com','cookie':'member_id='+data.mid}));//调用原生设置cookie
							}else {
								this_.txtPromptFun(data.msg);
							}
						})

					}
				}else if (obj.funName == 'qqLogin') {
					if (obj.code == 'perfect') {//完善页面
						window.localStorage.setItem('openid',obj.openid);
						window.localStorage.setItem('source',2);
						this_.$router.push({path:'/login/perfect'});
					}else if (obj.code == 'success') {
						let objStr = {'openid':obj.openid,'source':2};
						setCookie(objStr).then(data => {
							if (data.status) {
								var url = window.localStorage.getItem('url');
								url = url == '' ? '/index' : url;
								this_.$router.replace({path:url});
							}else {
								this_.txtPromptFun(data.msg);
							}
						})
					}
				}
			}
		},
//    beforeRouteLeave(to,from,next) {
//      if(to.name=='大美首页'){
//        to.meta.keepAlive=false;
//      }
//      next();
//    }
	}
</script>
<style lang="less" scoped>
@import '../../assets/mixin.less';
#login {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.back {
  position: relative;
  margin-left: 0.3rem;
  margin-top: 0.3rem;
  width:100%;
  height:0.55rem;
  .in{
    position: absolute;
    top: 0.08rem;
    left: 4rem;
    font-size:0.4rem;
    color: #292A2D
  }
  .icon-back {
    display: block;
    width:0.32rem;
    height:0.55rem;
    background: url('image/back.png') no-repeat;
    background-size: 100% 100%;
    }
  }
.logo{
  width: 2.19rem;
  height: 1.5rem;
  margin:0.85rem auto 1.83rem;
  background:url("image/idmei-login@2x.png") no-repeat;
  background-size:100%,100%;
}
.info {
  width: 80%;
  margin: auto;
  padding: 0 17.5px;
  padding-top: 2rem;
  background: #fff;
> div {
    width: 100%;
    height: 45px;
    margin-top: 10px;
    line-height: 45px;
  }
.tel,.psw {
    height: 46px;
  .border(border-bottom,1,#eee);
  }
  span {
    float: left;
  .rem(width,94);
    line-height: 45px;
    font-size: 14px;
  }
.inp {
    width: 100%;
    height: 45px;
  .rem(padding-left,94);
    input {
      width: 100%;
      height: 45px;
      padding: 0;
      font-size: 14px;
      color: #333;
      border: 0;
      outline: none;
    }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #C8C8C8;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #C8C8C8;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:   #C8C8C8;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #C8C8C8;
  }
  }
}
.forget-psw {
  margin: auto;
  width: 70%;
  height: 30px;
  line-height: 30px;
  font-size: 11px;
  color: #000;
  text-align: right;
  padding-bottom: 35px;
}
.btn {
  width: 80%;
  margin: auto;
  padding: 0 17.5px;
  //font-size: 0;
  text-align: center;
  span {
    display: inline-block;
    width: 100%;
    height: 34px;
    margin-bottom: 15px;
    line-height: 34px;
    font-size: 14px;
    color: #fff;
    /*<!--.border-radius(10);-->*/
    background: #D55317;
  }
.register {
    background: #fff;
    color: #000;
    border: 1px solid #888;
  }
}
.entrance {
  width: 90%;
  margin: auto;
  margin-top: 1.09rem;
  padding: 0 .95rem;
  text-align: center;
.title {
  .border(border-top,2,#ddd);
    text-align: center;
    span {
      position: relative;
      top: -10px;
      display: inline-block;
      width: 135px;
      font-size: 11px;
      color: #C8C8C8;
      background: #fff;
    }
  }
.icon-wx {
    display: inline-block;
    span {
      display: inline-block;
      width:0.91rem;
      height:0.73rem;
      background:rgba(200,200,200,1);
      background: url(./image/wechat_logo.png) no-repeat;
      background-size: 100% 100%;
    }
  }
.icon-qq {
  display: inline-block;
  margin-right: 0.36rem;
    span {
      width:0.93rem;
      height:0.73rem;
      display: inline-block;
      background:rgba(200,200,200,1);
      background: url(./image/qq_logo.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
