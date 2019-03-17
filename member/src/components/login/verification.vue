<template>
	<div id="verification">
		<div class="top">为了您的账户安全，重置密码前，大美家需要验证您的身份</div>
		<div class="info">
			<div class="tel">
				<span class="txt">手机</span>
				<div class="inp"><input type="tel" class="input" placeholder="请输入手机号码" v-model.trim="tel" ref="tel"></div>
				<span class="verification" :class="status == 1 ?'code':'num'" @click="obtainFun">{{ status == 1 ?'获取验证码':num}}</span>
			</div>
			<div>
				<span class="txt">验证码</span>
				<div class="inp"><input type="tel" class="input" placeholder="请输入手机验证码" v-model.trim="getVf" ref="getVf"></div>
			</div>
		</div>
		<div class="btn"><span @click="verificationFun">立即验证</span></div>
		<p class="p">您是否已经忘记注册时填写的信息了？</p>
		<p class="p">请联系客服4008-4008-400帮您找回密码。</p>
	</div>
</template>
<script>
	import { getVf,checkVf } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				status: 1,
				num   : 60,
				tel   : '',
				getVf : ''
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
			verificationFun: function() {
				if (!(/^1[3|4|5|6|7|8|9]{1}\d{9}$/.test(this.tel))) {
					this.txtPromptFun('手机号码有误');
					this.$refs.tel.focus();
					return
				}else if (this.getVf == '') {
					this.txtPromptFun('验证码不能为空');
					this.$refs.getVf.focus();
					return
				}
				let obj = {'mobile':this.tel,'verify':this.getVf}
				checkVf(obj).then(data => {
					if (data.status) {
						this.$router.push({path:'/login/vf/change'})
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
	#verification {
		width: 100%;
		height: 100%;
		background: #eee;
	}
	.top {
		width: 100%;
		height: 37px;
		line-height: 37px;
		font-size: 11px;
		color: #666;
		text-align: center;
	}
	.inp {
		width: 100%;
		height: 45px;
		.rem(padding-left,132);
	}
	.txt {
		float: left;
		.rem(width,132);
		font-size: 14px;
		color: #333;
	}
	.info {
		width: 100%;
		padding: 0 17.5px;
		background: #fff;
		> div {
			height: 46px;
			line-height: 45px;
			.border(border-bottom,1,#eee);
			&:last-of-type {
				border: 0;
			}
		}
		.tel {
			position: relative;
			.inp {
				width: 100%;
				height: 45px;
				.rem(padding-left,132);
				.rem(padding-right,173);
			}
			.verification {
				position: absolute;
				top: 8.5px;
				right: 0;
				z-index: 5;
				.rem(width,170);
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
		}
	}
	.btn {
		width: 100%;
		margin-top: 20px;
		margin-bottom: 17.5px;
		padding: 0 17.5px;
		text-align: center;
		span  {
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
	.p {
		width: 100%;
		margin-bottom: 10px;
		line-height: 11px;
		font-size: 11px;
		color: #999;
		text-align: center;
	}
</style>
