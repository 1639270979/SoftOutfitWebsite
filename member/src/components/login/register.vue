<template>
	<div id="register">
		<div class="info">
			<div class="tel">
				<div class="txt">手机</div>
				<div class="inp"><input type="tel" class="input" placeholder="请输入手机号码" v-model.trim="tel" ref="tel"></div>
				<div class="verification" :class="status == 1 ?'code':'num'" @click="obtainFun">{{ status == 1 ?'获取验证码':num}}</div>
			</div>
			<div>
				<span class="txt">验证码</span>
				<div class="inp"><input type="tel" class="input" placeholder="请输入手机验证码" v-model.trim="getVf" ref="getVf"></div>
			</div>
			<div>
				<span class="txt">登录密码</span>
				<div class="inp"><input type="password" class="input" placeholder="6-20个字符" v-model.trim="psw" ref="psw"></div>
			</div>
			<div>
				<span class="txt">确认密码</span>
				<div class="inp"><input type="password" class="input" placeholder="请再次输入密码" v-model.trim="repeat" ref="repeat"></div>
			</div>
		</div>
		<div class="btn"><span @click="registerFun">注册</span></div>
		<div class="prompt">已有账号,<router-link to="/login" class="login">登录</router-link></div>
		<div class="prompt underline">点击注册，表示同意《<router-link to="/member/set/serviceAgreement">大美软装用户协议</router-link>》</div>
	</div>
</template>
<script>
	import { getVf,register } from '../../common/axios/api.js';
  let Base64 = require("js-base64").Base64//还是require
	export default {
		data() {
			return {
				status: 1,
				num   : 60,
				tel   : '',
				getVf : '',
				psw   : '',
        pw    : '' ,  //加密密码
				repeat: ''
			}
		},
		methods: {
			obtainFun: function() {
				if (this.status == 1 && /^1[3|4|5|6|7|8|9]{1}\d{9}$/.test(this.tel)) {
					this.status = 2;
					var time = setInterval(()=> {
						this.num --;
						if (this.num == 1) {
							clearInterval(time);
							this.status = 1;
						}
					},1000);
					let obj = {'mobile':this.tel,'type':1};
					getVf(obj).then(data => {
						if (!data.status) {
							this.txtPromptFun(data.msg);
						}
					})
				}else if (!(/^1[3|4|5|6|7|8|9]{1}\d{9}$/.test(this.tel))) {
					this.txtPromptFun('手机号码有误');
					this.$refs.tel.focus();
				}
			},
			registerFun: function() {
				if (!(/^1[3|4|5|6|7|8|9]{1}\d{9}$/.test(this.tel))) {
					this.txtPromptFun('手机号码有误');
					this.$refs.tel.focus();
					return
				}else if (this.getVf == '') {
					this.txtPromptFun('验证码不能为空');
					this.$refs.getVf.focus();
					return
				}else if (this.psw == '') {
					this.txtPromptFun('密码不能为空');
					this.$refs.psw.focus();
					return
				}else if (this.repeat == '') {
					this.txtPromptFun('确认密码不能为空');
					this.$refs.repeat.focus();
					return
				}else if (this.psw !== this.repeat) {
					this.txtPromptFun('两个密码不一样');
					this.$refs.repeat.focus();
					return
				}
        this.pw = Base64.encode(this.psw); //还是那些操作
        let obj = {'mobile':this.tel,'password':this.pw,'verify':this.getVf}
        //活动时间跳转
        var time =Date.parse(new Date());
        var log =Date.parse('2018-11-17');
				register(obj).then(data => {
					if (data.status) {
						this.txtPromptFun('注册成功');
						setTimeout(()=>{
              if(time<log){ // 双11注册成功跳转页面
                this.$router.push({path:'/index/activity/eleven'});
              }else{
                this.$router.push({path:'/index'});
              }
							window.appModel.postMessage(JSON.stringify({'funName':'setAlias'}));//调用原生启用通知
						},1000)
					}else {
						this.txtPromptFun(data.msg);
					}
				})
			},
			txtPromptFun: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1500);
			}
		},
		mounted() {
			document.querySelector('body').addEventListener('touchend', function(e) {
				if(e.target.className != 'input' && document.querySelector('.input') != null) {
					document.querySelector('.input').blur();
				}
			});
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#register {
		width: 100%;
		height: 100%;
		background: #eee;
		.info {
			width: 100%;
			margin-top: 10px;
			padding: 0 17.5px;
			background: #fff;
			> div {
				position: relative;
				width: 100%;
				height: 46px;
				line-height: 45px;
				.border(border-bottom,1,#eee);
				&:last-of-type {
					border: 0;
				}
			}
			.txt {
				position: absolute;
				left: 0;
				width: 25%;
				font-size: 14px;
				color: #333;
			}
			.inp {
				width: 100%;
				padding-left: 25%;
				padding-right: 29%;
			}
			.tel {
				.verification {
					position: absolute;
					top: 8.5px;
					right: 0;
					z-index: 5;
					width: 29%;
					height: 28.5px;
					line-height: 28.5px;
					font-size: 11px;
					color: #fff;
					text-align: center;
				}
				.code {
					background: #d65317;
				}
				.num {
					background: #eee;
				}
			}
			input {
				width: 100%;
				height: 45px;
				padding: 0;
				border: 0;
				outline: none;
				font-size: 14px;
			}
		}
		.btn {
			width: 100%;
			margin-top: 12.5px;
			padding: 0 17.5px;
			text-align: center;
			span {
				display: inline-block;
				width: 100%;
				height: 34px;
				line-height: 34px;
				font-size: 14px;
				color: #fff;
				.border-radius(10);
				background: #d65317;
			}
		}
		.prompt {
			width: 100%;
			margin-top: 10px;
			margin-bottom: 15px;
			font-size: 11px;
			color: #999;
			text-align: center;
			> a {
				color: #d65317;
			}
		}
		.underline {
			a {
				text-decoration:underline
			}
		}
	}
</style>
