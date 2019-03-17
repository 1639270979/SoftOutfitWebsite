<template>
	<div id="auxiliaryFile">
		<p class="p title">轻辅工程套餐包</p>
		<p class="p p1"><span class="fl">服务编号</span><span class="fr">{{ caseInfo.service_no }}</span></p>
		<p class="p p1"><span class="fl">提交时间</span><span class="fr">{{ caseInfo.addtime }}</span></p>
		<p class="p p1"><span class="fl">完成时间</span><span class="fr">{{ caseInfo.finish_time }}</span></p>
		<div class="box">
			<a class="d1" v-if="wxSystem" :href="'http://member.idmei.com'+caseInfo.production_pic"><span>查看文件<i></i></span><div><p>{{ caseInfo.production_name }}</p></div></a>
			<a class="d1" v-else :href="'http://member.idmei.com'+caseInfo.production_pic"><span>查看文件<i></i></span><div><p>{{ caseInfo.production_name }}</p></div></a>

			<a class="d1" v-if="wxSystem" :href="'http://member.idmei.com'+caseInfo.estimates"><span>查看文件<i></i></span><div><p>{{ caseInfo.estimates_name }}</p></div></a>
			<a class="d1" v-else :href="'/member/pdf?http://member.idmei.com'+caseInfo.estimates"><span>查看文件<i></i></span><div><p>{{ caseInfo.estimates_name }}</p></div></a>
		</div>
		<p class="p2">也可前往大美官网www.idmei.com凭下载码 <span>{{ caseInfo.download_code }}</span> 下载以上文件至电脑。</p>
	</div>
</template>
<script>
	import { vipDesignCase } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				cid: this.$route.params.cid,
				caseInfo: {},
				wxSystem: this.$store.state.publicJS.wxSystem
			}
		},
		methods: {
			ajaxFun() {
				vipDesignCase(this.cid).then(data => {
					this.caseInfo = data.caseInfo;
				});
			}
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#auxiliaryFile {
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
			display: block;
			width: 100%;
			.rem(height,98);
			.rem(margin-bottom,30);
			.rem(padding-left,26);
			.rem(padding-right,26);
			.rem(line-height,98);
			.border(border,2,#d2d2d2);
			.border-radius(10);
			div {
				width: 100%;
				height: 100%;
				.rem(padding-right,160);
			}
			p {
				width: 100%;
				height: 100%;
				.rem(font-size,24);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			span {
				float: right;
				.rem(width,150);
				color: #999;
			}
			i {
				position: relative;
				.rem(top,-2);
				display: inline-block;
				.rem(width,14);
				.rem(height,24);
				.rem(margin-left,8);
				background: url(./image/icon-right_1.png) no-repeat;
				background-size: 100% 100%;
				vertical-align: middle;
			}
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
	}
</style>