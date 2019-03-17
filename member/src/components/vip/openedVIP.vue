<template>
	<div id="openedVIP">
		<div class="top">
			<div class="topBg"></div>
			<div class="user-info">
				<div class="img"><img :src="info.headimg" v-if="info.headimg != ''"><img src="./image/dsgImg.png" v-else></div>
				<div class="txt">
					<p class="name">{{ info.nickname ? info.nickname : info.mobile }}<i></i></p>
					<p class="time">会员将于{{ info.vip_endtime }}到期</p>
					<router-link to="/vip/vipRenew" tag="span">立即续费</router-link>
				</div>
			</div>
		</div>
		<div class="list">
			<ul>
				<!--<li>-->
					<!--<i class="icon-list1"></i>-->
					<!--<div class="txt">-->
						<!--<p class="p1">正价折扣</p>-->
						<!--<p class="p2">商城全场正价商品享受 9.3 折优惠</p>-->
					<!--</div>-->
				<!--</li>-->
				<li>
					<i class="icon-list2"></i>
					<div class="txt">
						<p class="p1">套装折扣</p>
						<p class="p2">商城套装商品享受 9.5 折优惠</p>
					</div>
				</li>
				<li>
					<router-link class="icon-list3" to="/vip/vip_dobut" tag="i"></router-link>
					<div class="txt">
						<p class="p1">免费设计<router-link class="dobut" to="/vip/vip_dobut" tag="i"></router-link></p>
						<p class="p2">每个年度享受 2 次免费设计服务</p>
					</div>
					<router-link class="btn" to="/vip/freeService" tag="span" v-if="info.has_free_design==true">点击使用</router-link>
          <span class="action" v-else>已使用</span>
				</li>
				<li>
					<i class="icon-list4"></i>
					<div class="txt">
						<p class="p1">设计折扣</p>
						<p class="p2">超出次数的设计服务享受 9 折优惠</p>
					</div>
				</li>
				<li>
					<i class="icon-list9"></i>
					<div class="txt">
						<p class="p1">"我家"套餐折扣</p>
						<p class="p2">找我家</p>
					</div>
				</li>
				<li>
					<i class="icon-list10"></i>
					<div class="txt">
						<p class="p1">免费仓储</p>
						<p class="p2">VIP会员专享免费仓储180天</p>
					</div>
				</li>
				<li>
					<i class="icon-list5"></i>
					<div class="txt">
						<p class="p1">VIP会员日</p>
						<p class="p2">会员日当天丰富的礼品优惠等你来领</p>
					</div>
				</li>
				<li>
					<i class="icon-list6"></i>
					<div class="txt">
						<p class="p1">设计需求优先</p>
						<p class="p2">接到您的设计需求后，优先为你选择设计师</p>
					</div>
				</li>
				<li>
					<i class="icon-list7"></i>
					<div class="txt">
						<p class="p1">VIP会员专属客服</p>
						<p class="p2">专项服务，每一次都无微不至</p>
					</div>
					<span @click="telFun('0755-86337169')">点击沟通</span>
				</li>
				<li>
					<i class="icon-list8"></i>
					<div class="txt">
						<p class="p1">专属身份标识</p>
						<p class="p2">点亮身份标识，彰显尊贵</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="popout" v-if="isRenew">
			<div class="mask">
				<p>尊敬的VIP会员，您在大美办理的VIP会员即将到期，请您及时续费，如过期未办理，您将享受不到大美为您提供的会员特权(或折扣等)，详情请咨询0755-86337169</p>
				<router-link to="/vip/vipRenew" tag="div" class="btn">续费会员</router-link>
				<div class="btn close" @click="isRenew = false">取消</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { vipInfo } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				info: {},
				isRenew: false,
				endTime: ''
			}
		},
		methods: {
			ajaxFun: function() {
				vipInfo().then(data => {
					this.info = data.info;
					this.isRenew = data.is_remind;
//					let date = data.info.vip_endtime * 1000;
//					let time = new Date(date);
//					let y = time.getFullYear();
//					let m = time.getMonth()+1;
//					let d = time.getDate();
//					this.endTime = y + '.' + m + '.' + d;
				});
			},
			telFun: function(num) {
				window.appModel.postMessage(JSON.stringify({'funName':'tel','num':num}));
			}
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#openedVIP {
		.top {
			position: relative;
			.rem(padding-top,32);
			.topBg {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 0;
				width: 100%;
				.rem(height,258);
				background: -webkit-linear-gradient(left, #ffac35, #f1831b, #ea6f0d);
			}
			.user-info {
				position: relative;
				z-index: 1;
				.rem(width,652);
				.rem(height,328);
				margin: 0 auto;
				.rem(padding-top,48);
				.rem(padding-left,40);
				background: url(./image/vip_11.png) no-repeat;
				background-size: 100% 100%;
			}
			.img {
				float: left;
				.rem(width,128);
				.rem(height,128);
				.border(border,2,#fff);
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
					.rem(min-height,98);
				}
			}
			.txt {
				width: 100%;
				.rem(padding-left,150);
				span {
					display: inline-block;
					.rem(width,128);
					.rem(height,40);
					.rem(margin-top,10);
					.rem(line-height,40);
					.rem(font-size,22);
					color: #fff;
					text-align: center;
					.border-radius(10);
					background: -webkit-linear-gradient(left, #ff9000, #ffaa3c, #ffb04a);
				}
			}
			.name {
				.rem(line-height,58);
				.rem(font-size,32);
				color: #333;
				letter-spacing: 2px;
				.font-family-m();
				i {
					position: relative;
					.rem(top,3);
					display: inline-block;
					.rem(width,50);
					.rem(height,31);
					.rem(margin-left,20);
					background: url(./image/vip_12.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			.time {
				.rem(line-height,44);
				.rem(font-size,24);
				color: #000;
				letter-spacing: 1px;
			}
		}
		.list {
			.rem(margin-top,43);
			li {
				position: relative;
				width: 100%;
				.rem(height,130);
				.rem(padding-right,48);
				.border(border-top,2,#eee);
				.txt {
					width: 100%;
					.rem(padding-top,20);
					.rem(padding-left,120);
					color: #333;
				}
				.p1 {
					.rem(font-size,32);
					.font-family-m();
					letter-spacing: 2px;
					.dobut {
						position: relative;
						.rem(top,3);
						display: inline-block;
						.rem(width,28);
						.rem(height,28);
						background: url(./image/doubt_1.png) no-repeat;
						background-size: 100% 100%;
					}
				}
				.p2 {
					.rem(margin-top,5);
					.rem(font-size,24);
					letter-spacing: 1px;
				}
				> i {
					position: absolute;
					.rem(left,43);
					.rem(top,26);
					.rem(width,48);
					.rem(height,50);
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}
				> span {
					position: absolute;
					.rem(top,44);
					.rem(right,48);
					z-index: 1;
					.rem(width,128);
					.rem(height,44);
					.rem(line-height,44);
					.rem(font-size,22);
					color: #fff;
					text-align: center;
					.border-radius(10);
					background: -webkit-linear-gradient(left, #ff9000, #ffa939, #ffb04a);
				}
				.action {
					background: -webkit-linear-gradient(left, #d6d6d6, #b8b8b8, #adadad);
				}
				.icon-list1 {
					background-image: url(./image/vip_3.png);
				}
				.icon-list2 {
					background-image: url(./image/vip_4.png);
				}
				.icon-list3 {
					background-image: url(./image/vip_5.png);
				}
				.icon-list4 {
					background-image: url(./image/vip_6.png);
				}
				.icon-list5 {
					background-image: url(./image/vip_7.png);
				}
				.icon-list6 {
					background-image: url(./image/vip_8.png);
				}
				.icon-list7 {
					background-image: url(./image/vip_9.png);
				}
				.icon-list8 {
					background-image: url(./image/vip_10.png);
				}
				.icon-list9 {
					background-image: url(./image/vip_19.png);
				}
				.icon-list10 {
					background-image: url(./image/vip_20.png);
				}
			}
		}
		.popout {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1000;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
			.mask {
				position: fixed;
				top: 50%;
				left: 50%;
				.rem(width,680);
				.rem(height,500);
				.rem(padding-top,50);
				.rem(padding-left,40);
				.rem(padding-right,40);
				.border-radius(20);
				transform: translate(-50%,-50%);
				background: #fff;
			}
			p {
				width: 100%;
				.rem(margin-bottom,10);
				.rem(line-height,60);
				.rem(font-size,24);
				letter-spacing: 1px;
			}
			.btn {
				.rem(width,528);
				.rem(height,70);
				margin: 0 auto;
				.rem(line-height,70);
				.rem(font-size,24);
				color: #fff;
				text-align: center;
				.border-radius(10);
				background: #ed7631;
			}
			.close {
				.rem(margin-top,20);
				background: #c9caca;
			}
		}
	}
</style>
