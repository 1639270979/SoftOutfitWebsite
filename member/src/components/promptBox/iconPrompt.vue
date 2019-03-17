<template>
	<div id="iconPrompt" v-show="iconPromptShow">
		<div class="popout">
			<span class="icon-g"></span>
			<p>已成功加入购物车</p>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	export default {
		computed: {
			...mapGetters([
				'iconPromptShow'
			])
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#iconPrompt {
		.popout {
			position: fixed;
			top: 50%;
			left: 50%;
			z-index: 9999;
			.rem(width,360);
			.rem(height,180);
			.rem(font-size,0);
			text-align: center;
			.border(border,2,#d65317);
			.border-radius(18);
			background: #fff;
			transform: translate(-50%,-50%);
			.icon-g {
				display: inline-block;
				.rem(width,44);
				.rem(height,34);
				.rem(margin-top,34);
				.rem(margin-bottom,27);
				background: url(./image/right.png) no-repeat;
				background-size: 100% 100%;
			}
			p {
				width: 100%;
				.rem(font-size,26);
			}
		}
	}
</style>