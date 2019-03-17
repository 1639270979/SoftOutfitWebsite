<template>
	<div id="freeService" v-if="Object.keys(info).length != 0">
		<p class="title">免费设计申请服务</p>
		<router-link
			class="service-btn"
			tag="div"
			v-for="item in info.whole_house"
			:class="item == '' ? 'wholeHouse' : 'useWholeHouse'"
			:to="item == '' ? '/vip/wholeDesign' : '/vip/vipOrderDet/'+item">{{ item == '' ? '1次 整屋装修设计' : '1次 整屋装修设计（已申请)'}}</router-link>
		<router-link
			class="service-btn"
			tag="div"
			v-for="item in info.soft_decor"
			:class="item == '' ? 'softOutfit' : 'useSoftOutfit'"
			:to="item == '' ? '/vip/softOutfitDesign' : '/vip/vipOrderDet/'+item">{{ item == '' ? '1次 软装设计' : '1次 软装设计（已申请）'}}</router-link>
	</div>
</template>
<script>
	import { vipInfo } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				info: {}
			}
		},
		methods: {
			ajaxFun: function() {
				vipInfo().then(data => {
					this.info = data.info;
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
	.title {
		width: 100%;
		.rem(margin-top,15);
		.rem(margin-bottom,50);
		.rem(font-size,36);
		color: #333;
		text-align: center;
	}
	.service-btn {
		.rem(width,690);
		.rem(height,148);
		margin: 0 auto;
		.rem(margin-bottom,20);
		.rem(padding-left,30);
		.rem(line-height,148);
		.rem(font-size,30);
		color: #fff;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.wholeHouse {
		background-image: url(./image/vip_15.png);
	}
	.useWholeHouse {
		background-image: url(./image/vip_15_1.png);
	}
	.softOutfit {
		background-image: url(./image/vip_16.png);
	}
	.useSoftOutfit {
		background-image: url(./image/vip_16_1.png);
	}
</style>