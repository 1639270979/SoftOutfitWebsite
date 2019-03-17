<template>
	<div id="login">
		<!-- <div class="top"><p>{{msg}}</p></div> -->
		<input type="text" v-model="txt">
		<input type="password" v-model='pas'>
		<span class="btn">提交</span>
	</div>
</template>
<script>
	window.location.href="idmei://login";
	import { needTest } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				msg: '',
				txt: '',
				pas: ''
			}
		},
		methods: {
			ajaxFun: function() {
				setInterval(()=> {
					needTest().then(data => {
						this.msg += data.time+'---';
					})
				},1000)
			}
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	.top {
		margin-top: 50px;
		.rem(width,300);
		overflow-y: auto;
	}
</style>