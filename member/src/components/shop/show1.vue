<template>
	<div id="show">
		<div class="content">
			<p>支付接口开发中，默认支付完成</p>
			<p>订单支付成功，请返回订单列表查看</p>
			<div class="btn"><router-link to="/member/designOrder" replace>查看订单</router-link></div>
		</div>
	</div>
</template>
<script>
	import { pay1 } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				oid: this.$route.params.oid
			}
		},
		created() {
			pay1({'oid':this.oid}).then();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#show {
		width: 100%;
		height: 100%;
		background: #eee;
		.content {
			width: 100%;
			.rem(padding-top,265);
			p {
				.rem(margin-bottom,40);
				.rem(line-height,22);
				.rem(font-size,22);
				color: #666;
				text-align: center;
			}
			.btn {
				width: 100%;
				.rem(margin-top,55);
				text-align: center;
				a {
					display: inline-block;
					.rem(width,154);
					.rem(height,54);
					.rem(line-height,54);
					.rem(font-size,22);
					color: #fff;
					.border-radius(10);
					background: #d65317;
				}
			}
		}
	}
</style>