<template>
	<div id="set">
		<router-link to="/member/set/memberDet" class="user" tag="div">
			<div class="img">
				<img :src="items.headimg" v-if="items.headimg != ''">
				<img src="./image/dsgImg.png" v-else>
			</div>
			<div class="info">
				<p class="name">{{ items.nickname ? items.nickname : items.mobile }}</p>
				<!-- <p class="adres">广东深圳</p> -->
			</div>
			<div class="icon"><span class="icon-right"></span></div>
		</router-link>
		<div class="list">
			<ul>
				<router-link to="/member/set/changePsw" tag="li"><span class="txt">账户安全</span><span class="icon-right"></span></router-link>
			</ul>
		</div>
		<div class="list">
			<ul>
				<!-- <li v-if="!wxSystem"><span class="txt">清理缓存</span><span class="icon-right"></span></li> -->
				<li v-if="!wxSystem"><span class="txt">当前版本号</span><span class="txt fr">V{{ num }}</span></li>
				<li v-if="!wxSystem" @click="versionFun"><span class="txt">检测更新</span><span class="icon-right"></span></li>
				<router-link to="/member/set/serviceAgreement" tag="li"><span class="txt">服务协议</span><span class="icon-right"></span></router-link>
				<router-link to="/member/set/about" tag="li"><span class="txt">关于我们</span><span class="icon-right"></span></router-link>
			</ul>
		</div>
		<a @click="LogOutFun" class="bottom-btn" v-show="!wxSystem">退出登录</a>
		<div class="alert" v-if="isAlert">
			<div class="mask"></div>
			<div class="popout">
				<div class="title">提示</div>
				<div class="msg">{{ alertMsg }}</div>
				<div class="btn"><span @click="alertPrompt">{{ isUpdate ? '去更新' : '确定'}}</span></div>
			</div>
		</div>
	</div>
</template>
<script>
	import { member,LogOut,getAndroidVersion } from "../../common/axios/api.js";
	export default {
		data() {
			return {
				items: {},
				wxSystem: this.$store.state.publicJS.wxSystem,
				num: '',
				isAlert: false,
				isUpdate: false,
				alertMsg: '',
        iswx:false
			}
		},
		methods: {
			ajaxFun: function() {
				member().then(data => {
					this.items = data.info;
				});
			},
			LogOutFun: function() {
				LogOut().then(data => {
					if (data.status) {
            window.localStorage.getItem('url','/index');
            this.$router.push({path:'/login'});
						window.appModel.postMessage(JSON.stringify({'funName':'clearAlias'}));//调用原生清除通知
					}
				})
			},
			versionFun: function() {
				getAndroidVersion().then(data => {
					if (data.version != this.num) {
						this.isAlert = true;
						this.isUpdate = true;
						this.alertMsg = '请更新版本至'+data.version;
					}else {
						this.isAlert = true;
						this.isUpdate = false;
						this.alertMsg = '当前已是最新版本';
					}
				});
			},
			alertPrompt: function() {
				if (this.isUpdate) {
					appModel.updateApk("http://api.idmei.com/app-release.apk",true);
					this.isAlert = false;
				}else {
					this.isAlert = false;
				}
			}
		},
		created() {
			this.ajaxFun();
			this.num = window.appModel.getNativeVersion();
			//appModel.updateApk("http://imtt.dd.qq.com/16891/911897D5270FEE5BF8F62DDB3CAB75C6.apk?fsname=com.tencent.weishi_4.2.0.88_420.apk",true)
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#set {
		width: 100%;
		.rem(min-height,1136);
		background: #eee;
		.user {
			position: relative;
			.rem(margin-top,2);
			.rem(padding,30);
			background: #fff;
			overflow: hidden;
			> div {
				float: left;
			}
			.img {
				.rem(width,128);
				.rem(height,128);
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
					.rem(min-height,128);
					border-radius: 50%;
				}
			}
			.info {
				.rem(width,500);
				.rem(margin-left,-128);
				.rem(padding-left,150);
				color: #333;
			}
			.name {
				width: 100%;
				.rem(margin-top,24);
				.rem(line-height,26);
				.rem(font-size,26);
			}
			.adres {
				width: 100%;
				.rem(margin-top,33);
				.rem(line-height,22);
				.rem(font-size,22);
			}
			.icon {
				position: absolute;
				.rem(right,30);
			}
			.icon-right {
				display: inline-block;
				.rem(width,13);
				.rem(height,24);
				.rem(margin-top,52);
				background: url(./image/right.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.list {
			.rem(margin-top,12);
			li {
				width: 100%;
				.rem(height,78);
				.rem(margin-bottom,2);
				.rem(padding-left,30);
				.rem(padding-right,30);
				.rem(line-height,78);
				.rem(font-size,22);
				background: #fff;
				.icon-right {
					float: right;
					.rem(width,13);
					.rem(height,24);
					.rem(margin-top,27);
					background: url(./image/right.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.bottom-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			.rem(height,78);
			.rem(line-height,78);
			.rem(font-size,26);
			color: #fff;
			text-align: center;
			background: -webkit-linear-gradient(top, #e77620, #fb661d);
		}
		.alert {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 5000;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.3);
			.popout {
				position: fixed;
				top: 50%;
				left: 50%;
				z-index: 9999;
				width: 80%;
				.rem(max-width,600);
				.border-radius(18);
				transform: translate(-50%, -50%);
				background-color: #FFFFFF;
				overflow: hidden;
			}
			.title {
				.rem(padding-top,36);
				.rem(font-size,42);
				font-weight: 400;
				text-align: center;
			}
			.msg {
				.rem(padding-left,40);
				.rem(padding-right,40);
				.rem(padding-top,24);
				.rem(padding-bottom,40);
				.rem(line-height,46);
				.rem(font-size,32);
				color: #999;
				text-align: center;
			}
			.btn {
				width: 100%;
				overflow: hidden;
				span {
					float: right;
					width: 100%;
					.rem(height,84);
					.rem(line-height,84);
					.rem(font-size,32);
					text-align: center;
					color: #fff;
					background: #d65317;
				}
			}
		}
	}
</style>
