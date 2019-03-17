<template>
	<transition name="bounce">
		<div id="txtPrompt" v-if="txtPromptShow">
			<div class="popout">
				{{ promptBoxMsg }}
			</div>
		</div>
	</transition>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters([
				'txtPromptShow',
				'promptBoxMsg'
			])
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#txtPrompt {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
		.popout {
			position: fixed;
			top: 50%;
			left: 50%;
			.rem(width,360);
			.rem(height,180);
			.rem(line-height,180);
			.rem(font-size,26);
			text-align: center;
			.border(border,2,#d65317);
			.border-radius(18);
			background: #fff;
			transform: translate(-50%,-50%);
		}
	}
	.bounce-enter-active {
		animation: bounce-in .5s;
	}
	@keyframes bounce-in {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		100% {
			transform: scale(1);
		}
	}
	.bounce-leave-active {
		transition: opacity 1s
	}
	.bounce-leave-to {
		opacity: 0
	}
</style>