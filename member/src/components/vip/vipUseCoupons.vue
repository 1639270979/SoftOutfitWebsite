<template>
	<div id="vipUseCoupons">
		<div class="notUse">不使用现金劵<div class="check"><input type="checkbox"><i></i></div></div>
		<div class="explain"><i></i>现金券不能同时使用多张</div>
		<ul class="list">
			<li>
				<span class="icon-txt">新人劵</span>
				<div class="left">
					<p class="money">¥<span>100</span></p>
					<p class="condition">满999元可用</p>
				</div>
				<i class="up circular"></i>
				<i class="down circular"></i>
				<i class="line"></i>
				<div class="right">
					<p class="p1">全场通用（特殊商品除外）</p>
					<p class="p2">不可与其他优惠叠加使用</p>
					<p class="p2">此券将于2018.01.31号失效</p>
				</div>
				<div class="check"><input type="checkbox"><i></i></div>
			</li>
		</ul>
	</div>
</template>
<script>
	
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#vipUseCoupons {
		.notUse {
			position: relative;
			width: 100%;
			.rem(height,88);
			.rem(padding-left,38);
			.rem(padding-right,30);
			.rem(line-height,88);
			.rem(font-size,28);
			background: #fff;
			.check {
				position: absolute;
				top: 0;
				right: 0;
				.rem(width,88);
				.rem(height,88);
				.rem(line-height,88);
				text-align: center;
				input {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 5;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
				i {
					display: inline-block;
					.rem(width,30);
					.rem(height,30);
					background: url(./image/check_2.png) no-repeat;
					background-size: 100% 100%;
				}
				input:checked + i {
					background-image: url(./image/check.png);
				}
			}
		}
		.explain {
			position: relative;
			width: 100%;
			.rem(height,72);
			.rem(padding-left,72);
			.rem(line-height,72);
			.rem(font-size,22);
			color: #999;
			i {
				position: absolute;
				.rem(top,21);
				.rem(left,30);
				.rem(width,28);
				.rem(height,29);
				background: url(./image/explain.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.list {
			li {
				position: relative;
				.rem(width,680);
				.rem(height,224);
				margin: 0 auto;
				.rem(margin-bottom,18);
				background: #fff;
			}
			.icon-txt {
				position: absolute;
				.rem(top,15);
				.rem(width,88);
				.rem(height,32);
				.rem(line-height,32);
				.rem(font-size,22);
				text-align: center;
				color: #fff;
				background: url(./image/vip_13.png) no-repeat;
				background-size: 100% 100%;
			}
			.left {
				float: left;
				.rem(width,204);
				.rem(height,224);
				.rem(padding-top,60);
				.rem(padding-left,27);
				color: #ed7631;
				.money {
					.rem(font-size,28);
					span {
						.rem(font-size,72);
					}
				}
				.condition {
					.rem(font-size,24);
				}
			}
			.circular {
				position: absolute;
				.rem(left,185);
				z-index: 5;
				.rem(width,38);
				.rem(height,38);
				border-radius: 50%;
				background: #eee;
			}
			.up {
				.rem(top,-19);
			}
			.down {
				.rem(bottom,-19);
			}
			.line {
				position: absolute;
				.rem(top,43);
				.rem(left,203);
				width: 1px;
				.rem(height,142);
				background: url(./image/vip_1.jpg) no-repeat;
				background-size: 100% 100%;
			}
			.right {
				width: 100%;
				.rem(padding-top,49);
				.rem(padding-left,240);
				.p1 {
					.rem(font-size,32);
					.rem(margin-bottom,30);
				}
				.p2 {
					.rem(margin-bottom,10);
					.rem(font-size,22);
					color: #999;
				}
			}
			.check {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				input {
					position: absolute;
					z-index: 5;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
				i {
					position: absolute;
					.rem(top,99);
					.rem(right,24);
					z-index: 1;
					.rem(width,30);
					.rem(height,30);
					background: url(./image/check_2.png) no-repeat;
					background-size: 100% 100%;
				}
				input:checked + i {
					background-image: url(./image/check.png);
				}
			}
			.not {
				background: #f8f8f8;
			}
		}
	}
</style>