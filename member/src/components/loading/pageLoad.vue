<template>
	<div id="pageLoad" v-if="pageLoadShow">
		<span class="icon-load" ref="load"></span>
	</div>	
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters([
				'pageLoadShow'
			])
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#pageLoad {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 300;
		width: 100%;
		height: 100%;
		background: #fff;
		.icon-load {
			position: fixed;
			top: 50%;
			left: 50%;
			.rem(width,50);
			.rem(height,50);
			.rem(margin-top,-25);
			.rem(margin-left,-25);
			animation: weuiLoading .6s steps(20, end) infinite;
			background: url(./image/load_1.png) no-repeat;
			background-size: 100% 100%;
		}
		@keyframes weuiLoading {
			0% {
				 transform: rotate(0deg);
			}
			100% {
				 transform: rotate(360deg);
			}
		}
	}
</style>