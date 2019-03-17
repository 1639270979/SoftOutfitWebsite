<template>
	<transition name="fade">
		<div id="confirmPrompt" v-show="confirmPromptShow">
			<div class="mask" @touchmove.prevent></div>
			<div class="popout">
				<div class="msg">{{ promptBoxMsg }}</div>
				<div class="weui-dialog__ft">
					<a	href="javascript:;"
						class="weui-dialog__btn weui-dialog__btn_default"
						@click="cancelFun">{{confirmPromptBtnLeft}}</a>
					<a	href="javascript:;"
						class="weui-dialog__btn weui-dialog__btn_primary"
						@click="confirmFun">{{confirmPromptBtnRight}}</a>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import { mapGetters,mapActions } from 'vuex'
	export default {
		methods: {
			cancelFun: function() {
				this.$emit('leftBtn');
				this.$store.commit('confirmPrompt');
			},
			confirmFun: function() {
				this.$emit('rightBtn');
				this.$store.commit('confirmPrompt');
			}
		},
		computed: {
			...mapGetters([
				'confirmPromptShow',
				'confirmPromptBtnLeft',
				'confirmPromptBtnRight',
				'promptBoxMsg'
			])
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#confirmPrompt {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
	}
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 8888;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.6);
	}
	.popout {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 9999;
		width: 80%;
		.rem(max-width,600);
		text-align: center;
		.border-radius(18);
		.border(border,2,#d65317);
		transform: translate(-50%, -50%);
		background-color: #FFFFFF;
		overflow: hidden;
	}
	.msg {
		width: 100%;
		.rem(min-height,80);
		.rem(padding-top,80);
		.rem(padding-left,48);
		.rem(padding-right,48);
		.rem(padding-bottom,24);
		line-height: 1.3;
		.rem(font-size,30);
		color: #999;
	}
	.weui-dialog__ft {
		position: relative;
		display: flex;
		.rem(line-height,96);
		.rem(font-size,36);
	}
	.weui-dialog__btn {
		position: relative;
		display: block;
		flex: 1;
		text-decoration: none;
	}
	.weui-dialog__btn_default {
		color: #333;
	}
	.weui-dialog__btn_primary {
		color: #d65317;
	}
	.weui-dialog__ft:after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #D5D5D6;
		color: #D5D5D6;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}
	.weui-dialog__btn:after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		bottom: 0;
		border-left: 1px solid #D5D5D6;
		color: #D5D5D6;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleX(0.5);
		transform: scaleX(0.5);
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s
	}
	.fade-enter, .fade-leave-to {
		opacity: 0
	}
</style>
