<template>
	<div id="myHomeDet" v-if="Object.keys(item).length != 0">
		<div class="top">
			<div class="top-box">
				<div class="package">{{ item.city_name+item.area_name+item.house_name+'　'+item.name+'　'+item.area+'㎡'}}</div>
				<!-- <a class="btn">查看平面图</a> -->
			</div>
		</div>
		<a class="panorama" :href="'/pano/index?cid='+item.id">
			<img :src="item.pano_thump"><span class="btn">全景效果图</span>
		</a>
		<div class="list">
			<ul>
				<li @click="dobutFun(1)">
					<div class="img">
						<img src="./image/m1.png">
					</div>
					<div class="info">
						<p>全屋效果图套餐包<span class="icon-dobut"></span></p>
						<span>¥ 20/㎡</span>
						<i class="icon-right"></i>
					</div>
				</li>
				<li @click="dobutFun(2)">
					<div class="img">
						<img src="./image/m2.png">
					</div>
					<div class="info">
						<p>轻辅工程套餐包<span class="icon-dobut"></span></p>
						<span>¥ 20/㎡</span>
						<i class="icon-right"></i>
					</div>
				</li>
				<li @click="dobutFun(3)">
					<div class="img">
						<img src="./image/m3.png">
					</div>
					<div class="info">
						<p>装修主材套餐包<span class="icon-dobut"></span></p>
						<span>¥ 10/㎡</span>
						<i class="icon-right"></i>
					</div>
				</li>
			</ul>
		</div>
		<div class="layer-dobut" v-show="isDobut">
			<div class="mask"></div>
			<div class="popout">
				<div class="dobut-top" v-if="type == 1">全屋效果图套餐包</div>
				<div class="dobut-top" v-else-if="type == 2">轻辅工程套餐包</div>
				<div class="dobut-top" v-else-if="type == 3">装修主材套餐包</div>
				<div class="body">
					<div class="txt" v-if="type == 1">　　全屋效果图套餐包内含一套全屋超清全景效果图， 它能够360度无死角环绕展现整个室内空间设计方案；以及一套全屋4K超清效果图，100%色彩还原，像给您的新家拍照片一样，所有空间均可逼真细腻呈现。<br/>　　各空间效果图场景内应用展现的主要物品皆为大美软装平台的商品，在大美软装APP中都有对应的组合清单可以直接下单购买。</div>
					<div class="txt" v-if="type == 2">　　《室内装饰装修工程施工图》是我司根据您的具体户型和设计方案制作的工程施工的参考图纸，为您另行自理的具体装修工程施工工作提供参考。其中包含平面图、立面图等。<br>　　《室内装饰装修工程施工预算清单》是我司根据您的具体户型和设计方案及施工图，结合装饰装修行业市场基础造价体系，对您的装修工程造价进行的估算列表，其中包含对实施该装修工程所涉及的轻辅材料单价、用量、总价及各工种人工成本和组织管理成本的估算。为您另行自理的具体装修工程施工工作提供参考。它与《室内装饰装修主要材料配置清单》、《室内装饰装修软装物品配置清单》一起，构成一个装修工程的所有成本。注：所有家电和家居日用品未包含在内。</div>
					<div class="txt" v-if="type == 3">　　《室内装饰装修主要材料配置清单》是我司根据您的具体户型和设计方案整体效果，挑选出的适合本方案的主要材料配置列表，为您另行自理的具体装修工程施工工作提供参考。包含门、门锁、瓷砖、木地板、洁具、橱柜、厨卫五金、厨卫吊顶、厨房电器等。</div>
				</div>
				<div class="read">
					<div class="box">
						<label>
							<input type="checkbox" value="one" v-model="picked">
							<span class="icon-radio"></span>
						</label>
						<div>我已阅读<span class="read-txt"></span></div>
					</div>
				</div>
				<div class="btn-box">
					<div class="btn" @click="isDobut=false">取消</div>
					<router-link
						class="btn confirm"
						:to="'/myHome/list/det/myHomeSuit/'+cid+'/'+type"
						tag="div"
						v-if="picked != ''">已阅读以上说明，确认支付</router-link>
					<div class="btn" @click="readFun" v-else>已阅读以上说明，确认支付</div>
				</div>
			</div>
		</div>
		<confirmPrompt
			@rightBtn="goLoginFun"></confirmPrompt>
	</div>
</template>
<script>
	import { caseDetail } from '../../common/axios/api.js';
	import { WeChatConfig } from '../../common/public/WeChatConfig.js';
	export default {
		data() {
			return {
				item  : {},
				cid   : this.$route.params.aid,
				type  : 1,
				isDobut: false,
				picked: '',
				wxSystem : this.$store.state.publicJS.wxSystem,
				signPackage: {},
				isLogin: false,
			}
		},
		methods: {
			ajaxFun: function(obj) {
				caseDetail(obj).then(data => {
					if (data.code == 1) {
						this.item = data.info;
						this.isLogin = data.isLogin;
						if (this.wxSystem) {
							this.signPackage = data.signPackage;
							this.wxConfig();
						}
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
						title: this_.item.house_name, // 分享标题
						link: 'http://member.idmei.com/topage?i=myHome&c=list&a=myHomeDet&id='+this_.cid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this_.item.picture, // 分享图标
						success: function () {
							// 用户确认分享后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
					//分享给朋友
					wx.onMenuShareAppMessage({
						title: this_.item.house_name, // 分享标题
						desc: '大美软装-新零售创意家饰网络平台！', // 分享描述
						link: 'http://member.idmei.com/topage?i=myHome&c=list&a=myHomeDet&id='+this_.cid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this_.item.picture, // 分享图标
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
			dobutFun: function(type) {
				if (!this.isLogin && !this.wxSystem) {
					this.confirmPrompt('请先登陆');
					return
				}else if (!this.isLogin && this.wxSystem) {
					this.confirmPrompt('请先完善资料');
					return
				}
				if (type == 2) {
					if (this.item.estimates == '' && this.item.production_pic == '') {
						this.$store.state.publicJS.promptBoxMsg = '该项目为精装楼盘，无需装修施工';
						this.$store.dispatch('alertPrompt');
						return;
					}
					if (this.item.auxiliary_buy) {
						this.$router.push({ path: '/myHome/list/det/myHomeSuit/'+this.cid+'/'+type })
						return;
					}
					this.isDobutFun(type);
				}else if (type == 3) {
					if (this.item.material == '') {
						this.$store.state.publicJS.promptBoxMsg = '该项目为精装楼盘，无需装修施工';
						this.$store.dispatch('alertPrompt');
						return;
					}
					if (this.item.material_buy) {
						this.$router.push({ path: '/myHome/list/det/myHomeSuit/'+this.cid+'/'+type })
						return;
					}
					this.isDobutFun(type);
				}else if (type == 1) {
					if (this.item.pano_buy) {
						this.$router.push({ path: '/myHome/list/det/myHomeSuit/'+this.cid+'/'+type })
						return;
					}
					this.isDobutFun(type);
				}
			},
			isDobutFun: function(type) {
				this.type = type;
				this.isDobut = true;
			},
			readFun: function() {
				this.$store.state.publicJS.promptBoxMsg = '请勾选已阅读按钮';
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1500);
			},
			confirmPrompt: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				if (this.wxSystem) {
					this.$store.state.publicJS.confirmPromptBtnRight = '去完善';
				}else {
					this.$store.state.publicJS.confirmPromptBtnRight = '去登录';
				}
				this.$store.commit('confirmPrompt');
			},
			goLoginFun: function() {
				let url = this.$route.path;
				window.localStorage.setItem('url',url);
				if (this.wxSystem) {
					this.$router.push({path:'/login/perfect'});
					return;
				}
				this.$router.replace({path:'/login'});
			}
		},
		created() {
			let obj = {'cid':this.cid};
			this.ajaxFun(obj);
			document.body.style.backgroundColor = '#f7f8f8';
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	.top {
		width: 100%;
		.rem(padding-left,29);
		.rem(padding-right,29);
		.border(border-top,2,#eee);
		background: #fff;
		.top-box {
			position: relative;
			width: 100%;
			.rem(height,70);
			//.rem(padding-right,130);
			.rem(line-height,68);
			overflow: hidden;
			.package {
				/*display: -webkit-box;*/
				width: 100%;
        text-align: center;
				.rem(height,90);
				.rem(font-size,24);
				overflow-x: scroll;
				white-space: nowrap;
			}
			.btn {
				position: absolute;
				right: 0;
				.rem(top,16);
				.rem(width,120);
				.rem(height,38);
				.rem(line-height,38);
				.rem(font-size,20);
				color: #fff;
				text-align: center;
				.border-radius(10);
				background: #999;
			}
		}
	}
	.panorama {
		position: relative;
		display: block;
		width: 100%;
		.rem(height,406);
		.border(border-top,2,#eee);
		overflow: hidden;
		img {
			width: 100%;
			.rem(min-height,404);
		}
		.btn {
			position: absolute;
			.rem(right,29);
			.rem(top,26);
			z-index: 10;
			.rem(width,120);
			.rem(height,38);
			.rem(line-height,38);
			.rem(font-size,20);
			color: #fff;
			text-align: center;
			.border-radius(10);
			background: #d65419;
		}
	}
	.list {
		.rem(padding-left,25);
		.rem(padding-right,25);
		li {
			width: 100%;
			.rem(height,154);
			.rem(margin-top,15);
			.rem(padding-top,16);
			.rem(padding-left,40);
			.border-radius(10);
			background: #eee;
			.img {
				float: left;
				.rem(width,122);
				.rem(height,122);
				overflow: hidden;
			}
			img {
				width :100%;
			}
			.info {
				position: relative;
				.rem(padding-top,36);
				.rem(padding-left,158);
			}
			p {
				width: 100%;
				.rem(margin-bottom,13);
				.rem(line-height,28);
				.rem(font-size,28);
				color: #333333;
			}
			.icon-dobut {
				display: inline-block;
				.rem(width,28);
				.rem(height,28);
				.rem(margin-left,8);
				background: url(./image/doubt.png) no-repeat;
				background-size: 100% 100%;
				vertical-align: sub;
			}
			> span {
				.rem(line-height,24);
				.rem(font-size,24);
				color: #999;
			}
			.icon-right {
				position: absolute;
				.rem(top,50);
				.rem(right,14);
				.rem(width,13);
				.rem(height,22);
				background: url(./image/right.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.layer-dobut {
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 500;
			width: 100%;
			height: 100%;
			background: rgba(102,102,102,.8);
		}
		.popout {
			position: fixed;
			top: 50%;
			left: 50%;
			z-index: 1000;
			.rem(width,554);
			.rem(min-height,824);
			.rem(padding-bottom,20);
			.border(border,2,#d65317);
			.border-radius(10);
			transform: translate(-50%,-50%);
			background: #fff;
		}
		.dobut-top {
			width: 100%;
			.rem(height,72);
			.rem(line-height,70);
			.rem(font-size,26);
			color: #333;
			text-align: center;
			.border(border-bottom,2,#eee);
		}
		.body {
			.rem(padding-top,30);
			.rem(padding-left,20);
			.rem(padding-right,20);
		}
		.txt {
			width: 100%;
			.rem(height,507);
			.rem(padding-top,4);
			.rem(margin-bottom,23);
			.rem(line-height,46);
			.rem(font-size,26);
			color: #666;
			.border-radius(10);
			background: #f4f4f4;
			overflow-y: auto;
		}
		.btn-box {
			.rem(padding-left,20);
			.rem(padding-right,20);
		}
		.read {
			.rem(height,32);
			.rem(line-height,32);
			.rem(margin-top,20);
			.rem(margin-bottom,20);
			.rem(font-size,24);
			color: #666;
			text-align: center;
			.box {
				display: inline-block;
				.rem(font-size,26);
				label {
					position: relative;
					float: left;
					.rem(width,30);
					input {
						opacity: 0;
					}
				}
				.icon-radio {
					position: absolute;
					.rem(top,2);
					.rem(left,-2);
					.rem(width,26);
					.rem(height,26);
					background-image: url(./image/radio_3.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
				input:checked+.icon-radio {
					background-image: url(./image/radio_2.png);
				}
				div {
					float: left;
				}
				.read-txt {
					color: #f38b00;
				}
			}
		}
		.btn {
			width: 100%;
			.rem(height,80);
			.rem(margin-top,20);
			.rem(line-height,80);
			.rem(font-size,30);
			color: #fff;
			text-align: center;
			.border-radius(10);
			background: #999;
		}
		.confirm {
			background: #f38b00;
		}
	}
</style>
