<template>
	<div id="service">
		<div class="top">选择售后类型</div>
		<div class="content">
			<p class="orderNum">订单编号：{{ items.order_id }}</p>
			<div class="container">
				<div class="img"><img :src="items.picture"></div>
				<div class="info">
					<div><img :src="items.logo">{{ items.goods_name}}</div>
					<div class="num">数量：{{ items.quantity }}件</div>
				</div>
			</div>
		</div>
		<div class="list">
			<ul>
				<router-link :to="'/member/order/det/ser/changeGoods/'+oid+'/'+iid" tag="li">换货 <span class="icon-right"></span></router-link>
				<router-link :to="'/member/order/det/ser/refunds/'+oid+'/'+iid" tag="li">退货退款 <span class="icon-right"></span></router-link>
			</ul>
		</div>
	</div>
</template>
<script>
	import { orderDet } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				oid: this.$route.params.Oid,
				iid: this.$route.params.Iid,
				items: {}
			}
		},
		methods: {
			ajaxFun: function() {
				orderDet(this.oid).then(data => {
					if (data.code == 1) {
            for (var i = 0; i < data.order.items.length; i++) {
							if (data.order.items[i].item_id == this.iid) {
								this.items = data.order.items[i];
							}
						}
					}
				})
			}
		},
		created() {
			this.ajaxFun();
    }
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#service {
		width: 100%;
		height: 100%;
		background: #eee;
	}
	.top {
		width: 100%;
		.rem(height,68);
		.rem(margin-top,2);
		.rem(margin-bottom,2);
		.rem(line-height,68);
		.rem(font-size,26);
		color: #333;
		text-align: center;
		background: #fff;
	}
	.content {
		.rem(padding-left,30);
		.rem(padding-right,30);
		.rem(padding-bottom,15);
		background: #fff;
		.orderNum {
			width: 100%;
			.rem(height,62);
			.rem(line-height,62);
			.rem(font-size,22);
			color: #333;
		}
		.container {
			overflow: hidden;
		}
		.img {
			float: left;
			.rem(width,118);
			.rem(height,118);
			overflow: hidden;
			img {
				width: 100%;
				.rem(min-height,118);
			}
		}
		.info {
			width: 100%;
			.rem(padding-left,140);
			.rem(font-size,26);
			vertical-align: middle;
			img {
				.rem(width,30);
				.rem(height,30);
				.rem(margin-right,10);
			}
			.num {
				.rem(margin-top,20);
				.rem(font-size,24);
				color: #666;
			}
		}
	}
	.list {
		.rem(margin-top,15);
		li {
			width: 100%;
			.rem(height,70);
			.rem(margin-bottom,2);
			.rem(padding-left,30);
			.rem(padding-right,30);
			.rem(line-height,70);
			.rem(font-size,26);
			background: #fff;
		}
		.icon-right {
			float: right;
			.rem(width,18);
			.rem(height,33);
			.rem(margin-top,19);
			background: url(./image/right.png) no-repeat;
			background-size: 100% 100%;
		}
	}
</style>
