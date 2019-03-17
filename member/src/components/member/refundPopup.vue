<template>
	<div id="refundPopup" v-show="isRefund">
		<div class="mask" @click.self="closeFun">
			<div class="popout animated" :class="name">
				<div class="title">退款原因<div class="icon-close1" @click="closeFun"><i></i></div></div>
				<div>
					<ul class="list">
						<li class="inp"
							:class="refund == 1 ? 'action':''"
							@click="clickFun(1)">
							<span class="fl">操作有误(商品、地址等选错)</span>
							<div class="check">
								<input type="radio" name="refund" :value="1" v-model="refund">
								<i></i>
							</div>
						</li>
						<li class="inp"
							:class="refund == 2 ? 'action':''"
							@click="clickFun(2)">
							<span class="fl">重复下单/误下单</span>
							<div class="check">
								<input type="radio" name="refund" :value="2" v-model="refund">
								<i></i>
							</div>
						</li>
						<li class="inp"
							:class="refund == 3 ? 'action':''"
							@click="clickFun(3)">
							<span class="fl">不想买了</span>
							<div class="check">
								<input type="radio" name="refund" :value="3" v-model="refund">
								<i></i>
							</div>
						</li>
						<li class="inp"
							:class="refund == 4 ? 'action':''"
							@click="clickFun(4)">
							<span class="fl">其它原因</span>
							<div class="check">
								<input type="radio" name="refund" :value="4" v-model="refund">
								<i></i>
							</div>
						</li>
					</ul>
				</div>
				<div class="btn" :class="refund != ''?'action':''" @click="confirmFun">提交</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['isRefund','refundStr'],
		data() {
			return {
				name: 'fadeInTop',
				refund: ''
			}
		},
		methods: {
			clickFun: function(num) {
				this.refund = num;
			},
			confirmFun: function() {
				let n = this.refund;
				if (n == '') return;
				if (n == 1) {
					this.$emit('update:refundStr','操作有误(商品、地址等选错)');
				}else if (n == 2) {
					this.$emit('update:refundStr','重复下单/误下单');
				}else if (n == 3) {
					this.$emit('update:refundStr','不想买了');
				}else {
					this.$emit('update:refundStr','其它原因');
				}
				this.$emit('increment');
				this.closeFun();
			},
			closeFun: function() {
				this.name = "fadeInDown";
				setTimeout(() => {
					this.$emit('update:isRefund',false);
					this.name = "fadeInTop";
				},400);
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#refundPopup {
		.mask {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 5000;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
		}
		.popout {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #fff;
		}
		.title {
			position: relative;
			width: 100%;
			.rem(height,70);
			.rem(line-height,70);
			text-align: center;
			.rem(font-size,28);
			.icon-close1 {
				position: absolute;
				top: 0;
				right: 0;
				.rem(width,100);
				height: 100%;
				i {
					position: absolute;
					top: 0;
					right: 0;
					.rem(width,40);
					.rem(height,40);
					background: url(./image/close.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.list {
			.rem(padding-left,20);
			.rem(padding-right,20);
			.inp {
				position: relative;
				width: 100%;
				.rem(height,70);
				.rem(line-height,70);
				.rem(font-size,24);
				.border(border-top,2,#eee);
				overflow: hidden;
				&.action {
					i {
						background-image: url(./image/check.png);
					}
				}
			}
			.check {
				position: absolute;
				top: 0;
				right: 0;
				.rem(width,50);
				height: 100%;
				input {
					position: absolute;
					top: 0;
					opacity: 0;
				}
				i {
					position: absolute;
					.rem(top,20);
					right: 0;
					.rem(width,30);
					.rem(height,30);
					background: url(./image/check_1.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.btn {
			width: 100%;
			.rem(height,60);
			.rem(line-height,60);
			.rem(font-size,26);
			color: #fff;
			text-align: center;
			background: #ddd;
			&.action {
				background: #ed7631;
			}
		}
		.animated {
			animation-duration: .4s;
			animation-fill-mode: both;
		}
		.fadeInDown {
			animation-name: fadeInDown;
		}
		.fadeInTop {
			animation-name: fadeInTop;
		}
		@keyframes fadeInDown {
			from {
				transform: translate3d(0,0,100%);
			}
			to {
				transform: translate3d(0,100%,0);
			}
		}
		@keyframes fadeInTop {
			from {
				transform: translate3d(0,100%,0);
			}
			to {
				transform: translate3d(0,0,100%);
			}
		}
	}
</style>
