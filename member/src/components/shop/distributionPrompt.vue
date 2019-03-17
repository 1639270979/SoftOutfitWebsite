<template>
	<div id="distributionPrompt" v-show="isDistribution">
		<div class="popout" @click.self="backFun">
			<div class="mask animated" :class="name">
				<div class="time" v-if="distributionType == 1">
					<p class="title">配送时间</p>
					<ul class="list">
						<li @click="clickFun(1)" :class="timeNum == 1 ? 'action':''">
							<span class="fl">不限</span>
							<div class="radio">
								<input type="radio" name="dly_time" value="1" v-model="timeNum">
								<i class="icon-radio"></i>
							</div>
						</li>
						<li @click="clickFun(2)" :class="timeNum == 2 ? 'action':''">
							<span class="fl">周一至周五</span>
							<div class="radio">
								<input type="radio" name="dly_time" value="2" v-model="timeNum">
								<i class="icon-radio"></i>
							</div>
						</li>
						<li @click="clickFun(3)" :class="timeNum == 3 ? 'action':''">
							<span class="fl">仅限周末</span>
							<div class="radio">
								<input type="radio" name="dly_time" value="3" v-model="timeNum">
								<i class="icon-radio"></i>
							</div>
						</li>
					</ul>
					<div class="btn" @click="backFun">取消</div>
				</div>
				<div class="mode" v-if="distributionType == 2">
					<p class="title">配送方式</p>
					<ul class="list">
						<li @click="clickFun(1)" :class="wayNum == 1 ? 'action':''">
							<span class="fl">电梯送货入户</span>
							<div class="radio">
								<input type="radio" name="dly_way" value="1" v-model="wayNum">
								<i class="icon-radio"></i>
							</div>
						</li>
						<li @click="clickFun(2)" :class="wayNum == 2 ? 'action':''">
							<span class="fl">走楼梯入户</span>
							<div class="radio">
								<input type="radio" name="dly_way" value="2" v-model="wayNum">
								<i class="icon-radio"></i>
							</div>
						</li>
						<li @click="clickFun(3)" :class="wayNum == 3 ? 'action':''">
							<span class="fl">送到楼下</span>
							<div class="radio">
								<input type="radio" name="dly_way" value="3" v-model="wayNum">
								<i class="icon-radio"></i>
							</div>
						</li>
						<li @click="clickFun(4)" :class="wayNum == 4 ? 'action':''">
							<span class="fl">自行提取</span>
							<div class="radio">
								<input type="radio" name="dly_way" value="4" v-model="wayNum">
								<i class="icon-radio"></i>
							</div>
						</li>
					</ul>
					<div class="btn" @click="backFun">取消</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['isDistribution','distributionType','dlyTime','dlyWay'],
		data() {
			return {
				name: 'fadeInTop',
				timeNum: this.dlyTime,
				wayNum: this.dlyWay
			}
		},
		methods: {
			clickFun: function(n) {
				if (this.distributionType == 1) {
					this.timeNum = n;
					this.$emit('update:dlyTime',n);
					this.backFun();
					return;
				}
				this.wayNum = n;
				this.$emit('update:dlyWay',n);
				this.backFun();
			},
			backFun: function() {
				this.name = "fadeInDown";
				setTimeout(() => {
					this.$emit('update:isDistribution',false);
					this.name = "fadeInTop";
				},400);
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#distributionPrompt {
		.popout {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 5000;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.4);
		}
		.mask {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #fff;
		}
		.title {
			width: 100%;
			.rem(height,92);
			.rem(line-height,92);
			.rem(font-size,32);
			text-align: center;
		}
		.list {
			li {
				position: relative;
				width: 100%;
				.rem(height,100);
				.rem(padding-left,30);
				.rem(line-height,100);
				.rem(font-size,28);
				.border(border-bottom,2,#eee);
				&:last-of-type {
					border-bottom: 0;
				}
			}
		}
		.radio {
			position: absolute;
			.rem(top,30);
			.rem(right,40);
			.rem(width,40);
			.rem(height,40);
			input {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
			i {
				float: left;
				.rem(width,40);
				.rem(height,40);
				background: url(./image/check_1.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.action {
			i {
				background-image: url(./image/check.png);
			}
		}
		.btn {
			width: 100%;
			.rem(height,95);
			.rem(line-height,95);
			.rem(font-size,30);
			color: #fff;
			text-align: center;
			background: #ed7631;
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