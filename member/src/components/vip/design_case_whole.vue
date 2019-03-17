<template>
	<div id="designCaseWhole">
		<p class="p title">VIP会员整体装修设计方案</p>
		<p class="p p1"><span class="fl">服务编号</span><span class="fr">{{ caseInfo.service_no }}</span></p>
		<p class="p p1"><span class="fl">提交时间</span><span class="fr">{{ caseInfo.addtime }}</span></p>
		<p class="p p1"><span class="fl">完成时间</span><span class="fr">{{ caseInfo.finish_time }}</span></p>
		<div class="box">
			<div class="d1 pano"><router-link :to="'/vip/designCaseSoftOutfit/'+oid">全屋效果图套餐包<div class="fr">查看文件<i></i></div></router-link></div>
			<router-link :to="'/vip/auxiliaryFile/'+oid" class="d1 engineering" tag="div"><a>轻辅工程套餐包<div class="fr">查看文件<i></i></div></a></router-link>
			<router-link :to="'/vip/principalFile/'+oid" class="d1 principal" tag="div"><a>装修主材套餐包<div class="fr">查看文件<i></i></div></a></router-link>
		</div>
		<p class="p2">也可前往大美官网www.idmei.com凭下载码 <span>{{ caseInfo.download_code }}</span> 下载以上文件至电脑。</p>
		<div class="btn">确认</div>
	</div>
</template>
<script>
	import { vipDesignCase } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				oid: this.$route.params.oid,
				caseInfo: {},
				wxSystem: this.$store.state.publicJS.wxSystem
			}
		},
		methods: {
			ajaxFun: function() {
				vipDesignCase(this.oid).then(data => {
					this.caseInfo = data.caseInfo;
				})
			}
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#designCaseWhole {
		.p {
			width: 100%;
			.rem(height,72);
			.rem(padding-left,30);
			.rem(padding-right,30);
			.rem(line-height,70);
			.rem(font-size,28);
			color: #333;
			.border(border-bottom,2,#eee);
		}
		.title {
			text-align: center;
			.rem(font-size,32);
		}
		.p1 {
			.fr {
				color: #666;
			}
		}
		.box {
			.rem(margin-top,26);
			.rem(padding-left,30);
			.rem(padding-right,30);
		}
		.d1 {
			width: 100%;
			.rem(height,128);
			.rem(margin-bottom,30);
			.rem(padding-left,28);
			.rem(padding-right,28);
			.rem(line-height,128);
			.border-radius(10);
			a {
				display: block;
				width: 100%;
				height: 100%;
				.rem(font-size,30);
				color: #fff;
			}
			.fr {
				.rem(font-size,24);
			}
			i {
				position: relative;
				.rem(top,-2);
				display: inline-block;
				.rem(width,14);
				.rem(height,24);
				.rem(margin-left,8);
				background: url(./image/icon-right.png) no-repeat;
				background-size: 100% 100%;
				vertical-align: middle;
			}
		}
		.pano {
			background: -webkit-linear-gradient(left, #ff6d2d, #ff8349, #ff925d);
		}
		.engineering {
			background: -webkit-linear-gradient(left, #ff9000, #ffa42e, #ffb04a);
		}
		.principal {
			background: -webkit-linear-gradient(left, #f7b016, #fcc34a, #ffd06c);
		}
		.p2 {
			width: 100%;
			.rem(padding-left,30);
			.rem(padding-right,30);
			.rem(line-height,37);
			.rem(font-size,24);
			span {
				color: #ed7631;
			}
		}
		.btn {
			position: fixed;
			left: 50%;
			.rem(bottom,64);
			.rem(width,528);
			.rem(height,70);
			.rem(margin-left,-264);
			.rem(line-height,70);
			.rem(font-size,28);
			color: #fff;
			text-align: center;
			.border-radius(10);
			background: #ed7631;
		}
		.popout {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1000;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.6);
			.mask {
				position: fixed;
				top: 50%;
				left: 50%;
				.rem(width,500);
				.rem(height,300);
				.rem(padding-top,20);
				.rem(padding-left,20);
				.rem(padding-right,20);
				.border-radius(20);
				background: #fff;
				transform: translate(-50%,-50%);
				> div {
					width: 100%;
					.rem(height,70);
					.rem(margin-bottom,20);
					.rem(line-height,70);
					.rem(font-size,24);
					text-align: center;
					color: #fff;
					.border-radius(20);
					background: #e37921;
					a {
						display: block;
						width: 100%;
						height: 100%;
						color: #fff;
					}
				}
			}
		}
	}
</style>
