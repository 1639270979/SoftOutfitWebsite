<template>
	<div id="myHomeSuit">
		<div class="title"><span>{{ suitName }}</span><span class='icon' v-if="!isPayment" @click="doubtFun"></span></div>
		<div class="info">
			<ul v-if="Object.keys(info).length != 0">
				<li>
					<span class="txt">所在城市</span>
					<span class="fr">{{ info.city_name+info.area_name }}</span>
				</li>
				<li>
					<span class="txt">所在小区</span>
					<span class="fr">{{ info.house_name }}</span>
				</li>
				<li v-if="isPayment">
					<span class="txt">所属户型</span>
					<span class="fr">{{ info.name+'　'+info.area+'㎡' }}</span>
				</li>
				<!--<li v-if="!isPayment && type == 1">-->
        <li  v-if="!isPayment">
					<span class="txt">套餐包含</span>
					<div class="right">
						<p>{{ info.space_name }}全景效果图</p>
						<a>X1</a>
						<p>{{ info.space_name }}三维效果图</p>
						<a>X1</a>
					</div>
				</li>
				<li v-if="isDownload">
					<span class="txt">下载文件</span>
					<div class="right" v-if="type == 2">
						<p>{{ info.production_name }}</p>
						<a :href="'http://member.idmei.com'+info.production_pic" v-if="wxSystem">查看</a>
						<a :href="'/member/pdf?http://member.idmei.com'+info.production_pic" v-else>查看</a>
						<p>{{ info.estimates_name }}</p>
						<a :href="'http://member.idmei.com'+info.estimates" v-if="wxSystem">查看</a>
						<a :href="'/member/pdf?http://member.idmei.com'+info.estimates" v-else>查看</a>
					</div>
					<div class="right" v-if="type == 3">
						<p>{{ info.material_name }}</p>
						<a :href="'http://member.idmei.com'+info.material" v-if="wxSystem">查看</a>
						<a :href="'/member/pdf?http://member.idmei.com'+info.material" v-else>查看</a>
					</div>
					<p class="prompt">请前往官网www.idmei.com凭下载码<span>{{ info.download_code }}</span>下载</p>
				</li>
				<!--<li v-if="!isPayment && (type == 2 || type == 3)">-->
        <li  v-if="!isPayment">
					<span class="txt">平面单价(元/㎡)</span>
					<span class="fr" v-if="type == 2 || type == 1">20元/㎡</span>
					<span class="fr" v-else-if="type == 3">10元/㎡</span>
				</li>
				<div class="box-gray-14" v-if="!isPayment"></div>
				<li v-if="!isPayment">
					<span class="txt">套餐价格</span>
					<span class="fr" :class="info.is_vip ? 'deleting-line' : 'yellow'" v-if="type == 1">¥&nbsp;{{ info.pano_price }}</span>
					<span class="fr" :class="info.is_vip ? 'deleting-line' : 'yellow'" v-if="type == 2">¥&nbsp;{{ info.auxiliary_price }}</span>
					<span class="fr" :class="info.is_vip ? 'deleting-line' : 'yellow'" v-if="type == 3">¥&nbsp;{{ info.material_price }}</span>
				</li>
				<li class="vip-price" :class="info.is_vip ? 'vip-price-action' : ''" v-if="!isPayment">
					<span class="vip-icon"></span>
					<div class="fr" v-if="type == 1">¥&nbsp;<span>{{ info.vip_pano_price }}</span></div>
					<div class="fr" v-if="type == 2">¥&nbsp;<span>{{ info.vip_auxiliary_price }}</span></div>
					<div class="fr" v-if="type == 3">¥&nbsp;<span>{{ info.vip_material_price }}</span></div>
				</li>
				<li class="advertisement" v-if="(type == 2 && info.recoList != '') || type == 3">认证联盟单位</li>
				<li class="advertisement-list" v-if="type == 2 && info.recoList != ''">
					<div v-for="list in info.recoList"><img :src="list.logo"></div>
				</li>
				<li class="advertisement-list" v-if="type == 3">
					<div><img src="./image/dj_logo.jpg"></div>
				</li>
				<div class="btn" v-if="isPayment && type == 1">
					<router-link class="sketch" :to="'/myHome/list/det/suit/sketch/'+aid" tag="span">三维效果图</router-link>
					<a :href="info.pano_url" class="confirm">查看全景图</a>
				</div>
				<div class="btn2" v-if="isPayment && type != 1"><span class='confirm' @click="$router.go(-1)">确定</span></div>
			</ul>
		</div>
		<div class="btn2" v-if="!isPayment">
			<!-- <span @click="cancelFun">取消</span> -->
			<span class="confirm" @click="paymentFun">去支付,获得套餐</span>
		</div>
		<div class="mask" v-if="isShow">
			<div class="popup">
				<div class="top"><span class="fr" @click="cancelFun"></span></div>
				<div class="content" v-if="type == 1">
					<p>　　全屋效果图套餐包内含一套全屋超清全景效果图， 它能够360度无死角环绕展现整个室内空间设计方案；以及一套全屋4K超清效果图，100%色彩还原，像给您的新家拍照片一样，所有空间均可逼真细腻呈现。</p>
					<p>　　各空间效果图场景内应用展现的主要物品皆为大美软装平台的商品，在大美软装APP中都有对应的组合清单可以直接下单购买。</p>
				</div>
				<div class="content" v-if="type == 2">
					<p>　　《室内装饰装修工程施工图》是我司根据您的具体户型和设计方案制作的工程施工的参考图纸，为您另行自理的具体装修工程施工工作提供参考。其中包含平面图、立面图等。</p>
					<p>　　《室内装饰装修工程施工预算清单》是我司根据您的具体户型和设计方案及施工图，结合装饰装修行业市场基础造价体系，对您的装修工程造价进行的估算列表，其中包含对实施该装修工程所涉及的轻辅材料单价、用量、总价及各工种人工成本和组织管理成本的估算。为您另行自理的具体装修工程施工工作提供参考。它与《室内装饰装修主要材料配置清单》、《室内装饰装修软装物品配置清单》一起，构成一个装修工程的所有成本。注：所有家电和家居日用品未包含在内。</p>
				</div>
				<div class="content" v-if="type == 3">
					<p>　　《室内装饰装修主要材料配置清单》是我司根据您的具体户型和设计方案整体效果，挑选出的适合本方案的主要材料配置列表，为您另行自理的具体装修工程施工工作提供参考。包含门、门锁、瓷砖、木地板、洁具、橱柜、厨卫五金、厨卫吊顶、厨房电器等。</p>
				</div>
			</div>
		</div>
		<confirmPrompt
			@rightBtn="goLoginFun"></confirmPrompt>
	</div>
</template>
<script>
	import { comboDetail,createPayment,payPayment } from '../../common/axios/api.js';
	import confirmPrompt from '../promptBox/confirmPrompt.vue';
	export default {
		data() {
			return {
				aid: this.$route.params.aid,
				type: this.$route.params.type,
				info: {},
				isDownload: false,
				isShow: false,
				wxSystem: this.$store.state.publicJS.wxSystem
			}
		},
		components: {
			confirmPrompt
		},
		methods: {
			ajaxFun: function(obj) {
				comboDetail(obj).then(data => {
					if (data.code == 1) {
						this.info = data.info;
					}
				})
			},
			paymentFun: function(id) {
				let obj = {'cid':this.aid,'type':this.type}
				createPayment(obj).then(data => {
					if (data.code == 1) {
						let money;
						if(this.info.is_vip){
              if (this.type == 1) {
                money = this.info.vip_pano_price
              }else if (this.type == 2) {
                money = this.info.vip_auxiliary_price
              }else {
                money = this.info.vip_material_price
              }
            }else{
              if (this.type == 1) {
                money = this.info.pano_price
              }else if (this.type == 2) {
                money = this.info.auxiliary_price
              }else {
                money = this.info.material_price
              }
            }

						this.$router.replace({ path: '/orderPay',query:{oid:data.payment_id,'type':'payment_pay','money':money}})
					}else {
						if (this.wxSystem) {
							this.$store.state.publicJS.promptBoxMsg = '请先完善资料';
							this.$store.state.publicJS.confirmPromptBtnRight = '去完善';
						}else {
							this.$store.state.publicJS.promptBoxMsg = '请先登陆';
							this.$store.state.publicJS.confirmPromptBtnRight = '去登陆';
						}
						this.$store.commit('confirmPrompt');
					}
				})
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
			doubtFun: function() {
				this.isShow = true;
			},
			cancelFun: function() {
				this.isShow = false;
			}
		},
		computed: {
			suitName: function() {
				if (this.type == 1) {
					return '整屋全景效果图套装';
				}else if (this.type == 2) {
					return '轻辅工程参考套餐';
				}else {
					return '主材参考套餐'
				}
			},
			isPayment: function() {
				let isBool = false;
				let type = this.type;
				let info = this.info;
				if (info.pano_buy && type == 1) {
					return true;
				}else if (info.auxiliary_buy && type == 2) {
					this.isDownload = true;
					return true;
				}else if (info.material_buy && type == 3) {
					this.isDownload = true;
					return true;
				}
				return isBool;
			}
		},
		created() {
			let obj = {'cid':this.aid,'type':this.type};
			this.ajaxFun(obj);
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	.title {
		width: 100%;
		.rem(height,74);
		.rem(line-height,70);
		color: #333;
		text-align: center;
		background-color: #fff;
		span {
			display: inline-block;
			.rem(font-size,30);
			vertical-align: middle;
		}
		.icon {
			.rem(width,25);
			.rem(height,25);
			.rem(margin-left,10);
			background: url(./image/doubt.png) no-repeat;
			background-size: 100% 100%;
		}
	}
	.info {
		background: #fff;
		li {
			width: 100%;
			.rem(min-height,72);
			.rem(padding-left,30);
			.rem(padding-right,30);
			.rem(line-height,70);
			.rem(font-size,26);
			.border(border-top,2,#eee);
			overflow: hidden;
		}
		.txt {
			.rem(font-size,28);
			color: #d65418;
		}
		.right {
			float: right;
			text-align: right;
			a {
				display: block;
				line-height: normal;
				color: #e37921;
			}
		}
		.prompt {
			float: right;
			text-align: right;
			.rem(font-size,20);
			color: #999;
			span {
				color: #e37921;
				font-weight: 900;
			}
		}
		.yellow {
      color: #e37921;
      /*text-decoration: line-through;*/
		}
		.box-gray-14 {
			width: 100%;
			.rem(height,14);
			background-color: #eee;
		}
		.deleting-line {
			color: #333;
			text-decoration: line-through;
		}
		.vip-price {
      color: #333;
			border-top: 0;
			background: #fff;
			box-shadow: 0 3px 4px #e5e5e5;
			.vip-icon {
				display: inline-block;
				.rem(width,108);
				.rem(height,30);
				background: url(./image/vip_price.png) no-repeat;
				background-size: 100% 100%;
				vertical-align: middle;
			}
			.fr {
				.rem(font-size,22);
				span {
					.rem(font-size,28);
				}
			}
		}
		.vip-price-action {
			color: #ed7631;
			background-color: #fff;
		}
		.payment {
			.rem(padding-left,140);
			font-size: 0;
			vertical-align: top;
		}
		.icon {
			display: inline-block;
			.rem(height,28);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			vertical-align: middle;
		}
		.icon-wx {
			.rem(width,98);
			background-image: url(./image/wx.png);
		}
		.icon-zfb {
			.rem(width,94);
			background-image: url(./image/zfb.png);
		}
		.icon-yl {
			.rem(width,113);
			background-image: url(./image/yl.png);
		}
		label {
			display: inline-block;
			.rem(margin-right,14);
			font-size: 0;
			&:last-of-type {
				margin-right: 0;
			}
			> div {
				position: relative;
			}
			.icon-y {
				display: inline-block;
				.rem(width,20);
				.rem(height,20);
				.rem(margin-right,8);
				background: url(./image/radio.png) no-repeat;
				background-size: 100% 100%;
				vertical-align: middle;
			}
			input {
				position: absolute;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
			input:checked + span {
				background-image: url(./image/radio_1.png);
			}
		}
		.advertisement {
			.rem(height,77);
			.rem(font-size,28);
			color: #d65418;
			text-align: center;
		}
		.advertisement-list {
			padding: 0;
			div {
				width: 100%;
				.rem(height,102);
				.border(border-bottom,2,#eee);
				overflow: hidden;
				img {
					width: 100%;
					.rem(min-height,102);
				}
			}
		}
	}
  .btn{
    width: 100%;
    .rem(margin-top,30);
    font-size: 0;
    text-align: center;
    span,a {
      display: inline-block;
      margin-right: 0.5rem;
      .rem(width,200);
      .rem(height,70);
      .rem(margin-bottom,20);
      .rem(line-height,70);
      .rem(font-size,28);
      color: #fff;
      .border-radius(10);
      background: #999;
    }
    .confirm {
      //.rem(margin-left,17);
      background: #e37a23;
    }
    .sketch {
      background: #e37a23;
    }
  }
	.btn2 {
		width: 100%;
		.rem(margin-top,30);
		font-size: 0;
		text-align: center;
		span,a {
			display: inline-block;
			.rem(width,528);
			.rem(height,70);
			.rem(margin-bottom,20);
			.rem(line-height,70);
			.rem(font-size,28);
			color: #fff;
			.border-radius(10);
			background: #999;
		}
		.confirm {
			//.rem(margin-left,17);
			background: #e37a23;
		}
		.sketch {
			background: #e37a23;
		}
	}
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 100%;
		background: rgba(102,102,102,.8);
		.popup {
			position: fixed;
			top: 50%;
			left: 50%;
			z-index: 1000;
			.rem(width,540);
			.rem(padding-bottom,44);
			.border-radius(20);
			transform: translate(-50%,-50%);
			background: #fff;
		}
		.top {
			width: 100%;
			.rem(height,76);
			.rem(padding-top,14);
			.rem(padding-right,15);
			span {
				.rem(width,44);
				.rem(height,44);
				background: url(./image/cancel.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.content {
			width: 100%;
			.rem(padding-left,36);
			.rem(padding-right,36);
			.rem(line-height,46);
			.rem(font-size,26);
			color: #333;
		}
	}
</style>
