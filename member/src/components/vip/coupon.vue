<template>
	<div id="coupon">
		<div class="search">
			<div class="inp"><input type="text" placeholder="请在此处输入兑换码" v-model="cardCode"></div>
			<div class="search-btn" @click="exchangeFun">兑换</div>
		</div>
		<div class="list">
			<ul>
				<li v-for="list in cardList" :class="list.can_use?'':'action'">
					<span class="icon-txt">{{ list.card_tag }}</span>
					<div class="left">
						<p class="money">¥<span>{{ list.money }}</span></p>
						<p class="condition">满{{ list.fulfil_money }}元可用</p>
					</div>
					<i class="up circular"></i>
					<i class="down circular"></i>
					<i class="line"></i>
					<div class="right">
						<p class="p1">{{ list.range_name }}</p>
						<p class="p2">不可与其他优惠叠加使用</p>
						<p class="p2">有效期：{{ list.endtime }}</p>
					</div>
					<span class="state-img" :class="list.reason == 2 ? 'invalid':'used'"></span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { vipCardList,vipRedeemCard } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				cardList: [],
				cardCode: ''
			}
		},
		methods: {
			ajaxFun: function() {
				vipCardList().then(data => {
					if (data.code == 1) {
						this.cardList = data.list
					}
				});
			},
			exchangeFun: function() {
        if(!(/\S/.test(this.cardCode))){
          this.$store.state.publicJS.promptBoxMsg = '兑换码不能为空';
          this.$store.commit('txtPrompt');
          setTimeout(() => {
            this.$store.commit('txtPrompt');
          },1000);
        }else{
          vipRedeemCard({'code':this.cardCode}).then(data => {
            if (data.code == 1) {
              this.ajaxFun();
              this.cardCode = '';
              this.$store.state.publicJS.promptBoxMsg = data.msg;
              this.$store.commit('txtPrompt');
              setTimeout(() => {
                this.$store.commit('txtPrompt');
              },1000);
            }else {
              this.$store.state.publicJS.promptBoxMsg = data.msg;
              this.$store.dispatch('alertPrompt');
            }
          });
        }
      }
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	.search {
		width: 100%;
		.rem(height,88);
		.rem(padding-top,14);
		.rem(padding-left,29);
		background: #fff;
		overflow: hidden;
		.inp {
			float: left;
			width: 75%;
			.rem(height,60);
			.border-radius(10);
			background: #eee;
			overflow: hidden;
			input {
				width: 100%;
				height: 100%;
				margin: 0;
				padding: 0;
				.rem(padding-left,17);
				.rem(font-size,24);
				color: #999;
				border: 0;
				background: #eee;
				outline: none;
			}
		}
		.search-btn {
      border:1px solid #000;
      float: right;
      margin-right: 0.3rem;
			width: 18%;
			.rem(height,60);
			.rem(line-height,55);
			.rem(font-size,28);
			color: #ed7631;
			text-align: center;
			.border(border,2,#ed7631);
			.border-radius(10);
		}
	}
	.list {
		.rem(margin-top,30);
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
			.rem(line-height,33);
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
					.rem(font-size,62);
					letter-spacing: -3px;
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
				.rem(height,75);
				.rem(font-size,28);
				.rem(margin-bottom,10);
			}
			.p2 {
				.rem(margin-bottom,10);
				.rem(font-size,22);
				color: #999;
			}
		}
		.action {
			.icon-txt {
				background-image: url(./image/vip_13_1.png);
			}
			.left {
				color: #999;
			}
			.right {
				.p1 {
					color: #999;
				}
			}
			.state-img {
				position: absolute;
				.rem(right,19);
				.rem(bottom,19);
				z-index: 1;
				.rem(width,72);
				.rem(height,72);
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
			.used {
				background-image: url(./image/vip_14_1.png);
			}
			.invalid {
				background-image: url(./image/vip_14.png);
			}
		}
	}
</style>
