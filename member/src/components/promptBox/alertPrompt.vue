<template>
	<transition name="fade">
		<div id="alert" v-if="alertPromptShow">
			<div class="mask"></div>
			<div class="popout">
				<!-- <div class="title" v-if="title != ''">{{ title }}</div> -->
				<div class="msg">{{ promptBoxMsg }}</div>
				<div class="btn"><span @click="alertPrompt">{{ alertPromptBtn }}</span></div>
			</div>
		</div>
	</transition>
</template>
<script>
	import { mapGetters,mapActions } from 'vuex'
	export default {
		methods: {
			...mapActions([
				'alertPrompt'
			])
		},
		computed: {
			...mapGetters([
				'alertPromptShow',
				'promptBoxMsg',
				'alertPromptBtn'
			])
		}
	}
</script>
<style lang='less' scoped>
	@import '../../assets/mixin.less';
	#alert {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 5000;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.3);
	}
	.popout {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 9999;
		width: 80%;
		.rem(max-width,600);
		.rem(padding-left,40);
		.rem(padding-right,40);
		.border-radius(18);
		.border(border,2,#d65317);
		transform: translate(-50%, -50%);
		background-color: #FFFFFF;
		overflow: hidden;
	}
	.title {
		.rem(padding-top,36);
		.rem(font-size,42);
		font-weight: 400;
	}
	.msg {
		.rem(padding-top,24);
		.rem(padding-bottom,40);
		.rem(line-height,46);
		.rem(font-size,32);
		color: #999;
	}
	.btn {
		width: 100%;
		overflow: hidden;
		span {
			float: right;
			.rem(width,200);
			.rem(height,84);
			.rem(line-height,84);
			.rem(font-size,32);
			text-align: right;
			color: #d65317;
		}
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0
	}
</style>