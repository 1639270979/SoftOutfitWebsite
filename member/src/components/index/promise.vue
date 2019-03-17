<template>
	<div id="promise">
    <img v-if="type==1" src="./image/img_promise_1.png" alt="">
    <img v-if="type==2" src="./image/img_promise_2.png" alt="">
    <img v-if="type==3" src="./image/img_promise_3.png" alt="">
    <img v-if="type==4" src="./image/img_promise_4.png" alt="">
		<div @click="clickFun"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				coo: '',
        type: this.$route.params.type,
			}
		},
		methods: {
			clickFun: function() {
				this.$store.state.publicJS.promptBoxMsg = this.coo+'11';
				this.$store.dispatch('alertPrompt');
			}
		},
		created() {
      this.coo = localStorage.getItem('coo');
		}
	}
</script>
<style lang="less" scoped>
	#promise {
		font-size: 8px;
		img {
			width: 100%;
		}
		div {
			width: 100%;
			height: 12px;
		}
	}
</style>
