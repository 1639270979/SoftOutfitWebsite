<template>
	<div id="changePsw">
		<ul>
			<li @click="changeFun">修改登录密码 <span class="icon-right"></span></li>
		</ul>
		<div class="mask" v-if="isShowMask">
			<div class="verifyPsw" v-if="isShowVerif">
				<div class="top">修改密码</div>
				<div class="psw">
					<span>登录密码</span>
					<div><input type="password" v-model.trim="loginPsw"></div>
				</div>
				<div class="btn"><span class="cancel" @click="cancelFun">取消</span><span @click="changePswFun">修改密码</span></div>
			</div>
			<div class="newPsw" v-if="isShowNew">
				<div class="top">新密码</div>
				<div class="psw">
					<span>新密码</span>
					<div><input type="password" v-model.trim="newPsw"></div>
				</div>
				<div class="psw">
					<span>确认密码</span>
					<div><input type="password" v-model.trim="confirmPsw"></div>
				</div>
				<div class="btn"><span class="cancel" @click="cancelFun">取消</span><span @click="confirmFun">确定</span></div>
			</div>
		</div>
	</div>
</template>
<script>
	import { change,changePw } from '../../common/axios/api.js';
  let Base64 = require("js-base64").Base64//还是require
  export default {
		data() {
			return {
				loginPsw   : '',
        loginPw : '', //加密登录密码
        newPsw     : '',
				Pw        : '',
				confirmPsw : '',
				isShowMask : false,
				isShowVerif: false,
				isShowNew  : false
			}
		},
		methods: {
			changeFun: function() {
				this.isShowMask  = true;
				this.isShowVerif = true;
			},
			changePswFun: function() {	//认证登录密码
				if ((/\S/.test(this.loginPsw))) {
          this.loginPw = Base64.encode(this.loginPsw); //还是那些操作
          let obj = {'pwd':this.loginPw};
					change(obj).then(data => {
						if (data.status) {
							this.isShowVerif = false;
							this.isShowNew   = true;
						}else {
							this.txtShow(data.msg);
						}
					})
				}else {
					this.txtShow('不能为空');
				}
			},
			confirmFun: function() {
        if(!(/\S/.test(this.newPsw))||!(/\S/.test(this.confirmPsw))){
//				if (this.newPsw == '' || this.confirmPsw == '') {
					this.txtShow('不能为空');
				}else {
					if (this.newPsw != this.confirmPsw) {
						this.txtShow('两次密码不相同');
					}else {
            this.loginPw = Base64.encode(this.loginPsw); //还是那些操作
            this.Pw = Base64.encode(this.confirmPsw); //还是那些操作
						let obj = {'pwd':this.Pw,'old_pwd':this.loginPw};
						changePw(obj).then(data => {
							if (data.status) {
								this.isShowMask = false;
								this.isShowNew  = false;
								this.confirmPsw = '';
								this.newPsw     = '';
								this.txtShow('修改成功');
                this.loginPsw = '';
							}else {
								this.txtShow(data.msg);
							}
						})
					}
				}
			},
			cancelFun: function() {		//取消
				this.isShowMask  = false;
				this.isShowVerif = false;
				this.isShowNew   = false;
			},
			txtShow: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1000);
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	ul {
		.rem(margin-top,14);
	}
	li {
		width: 100%;
		.rem(height,78);
		.rem(padding-left,30);
		.rem(padding-right,30);
		.rem(line-height,78);
		.rem(font-size,26);
		color: #333;
		background: #fff;
	}
	.icon-right {
		float: right;
		.rem(width,13);
		.rem(height,24);
		.rem(margin-top,28);
		background: url(./image/right.png) no-repeat;
		background-size: 100% 100%;
	}
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 100%;
		background: rgba(159,160,160,.8);
		.top {
			width: 100%;
			.rem(height,64);
			.rem(line-height,64);
			.rem(font-size,26);
			text-align: center;
			.border(border-bottom,2,#eee);
		}
		.btn {
			position: absolute;
			left: 0;
			.rem(bottom,20);
			width: 100%;
			font-size: 0;
			text-align: center;
			> span {
				display: inline-block;
				.rem(width,200);
				.rem(height,54);
				margin: 0 auto;
				.rem(line-height,54);
				.rem(font-size,24);
				color: #fff;
				.border-radius(10);
				background: #d65317;
			}
			.cancel {
				.rem(margin-right,10);
				background: #999;
			}
		}
		.psw {
			.rem(width,500);
			.rem(height,50);
			margin: 0 auto;
			.rem(margin-top,20);
			.rem(font-size,24);
			.border(border,2,#8c8c8c);
			> span {
				float: left;
				.rem(width,150);
				.rem(line-height,47);
				text-align: center;
				.border(border-right,1px,#8c8c8c);
			}
			> div {
				width: 100%;
				height: 100%;
				padding: 1px 0;
				.rem(padding-left,170);
				input {
					width: 100%;
					height: 100%;
					.rem(font-size,24);
					outline: none;
          /*border: 1px solid red;*/
          -webkit-appearance: none;
        }
			}
		}
	}
	.verifyPsw,.newPsw {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 1000;
		.rem(width,554);
		.rem(height,350);
		.border(border,2,#d65317);
		.border-radius(10);
		transform: translate(-50%,-50%);
		background: #fff;
	}
</style>
