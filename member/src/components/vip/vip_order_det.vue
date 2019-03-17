  <template>
	<div id="vipOrderDet">
		<div class="top">
			<div class="icon"><span class="icon-submit"></span></div>
			<p class="p1">提交成功</p>
			<p class="p2">VIP会员专属客服将根据您的需求，为您指派专属设计师为您进行一对一线下服务，24小时内我们专属设计师将与您联系</p>
		</div>
		<div class="box-gray10"></div>
		<ul class="list">
			<p class="title">查看订单详情</p>
			<li class="vipNumber">
				VIP会员专属服务编号　<span>{{ order.order_id }}</span>
			</li>
			<li class="inp">
				<span class="txt">提交时间</span>
				<div class="content">{{ order.addtime }}</div>
			</li>
			<li class="inp">
				<span class="txt">您的姓名</span>
				<div class="content">{{ order.name }}</div>
			</li>
			<li class="inp">
				<span class="txt">联系电话</span>
				<div class="content">{{ order.mobile }}</div>
			</li>
			<li class="inp">
				<span class="txt">您的QQ</span>
				<div class="content">{{ order.qq }}</div>
			</li>
			<li class="city">
				<span class="txt">房屋地址</span>
				<p class="cityDet">{{ order.address }}</p>
			</li>
			<li class="inp">
				<span class="txt">建筑面积</span>
				<div class="content">{{ order.acreage }}</div>
			</li>
			<li class="inp">
				<span class="txt">软装预算</span>
				<div class="content">{{ order.price }}</div>
			</li>
			<li class="plan-img">
				<span class="txt">平面图</span>
				<div>
					<div class="img"><img :src="order.planer_graph"></div>
				</div>
			</li>
			<li class="inp">
				<span class="txt">软装空间</span>
				<div class="content">{{ order.expect_space }}</div>
			</li>
			<li class="inp">
				<span class="txt">风格表述</span>
				<div class="content">{{ order.expect_style }}</div>
			</li>
			<li class="inp">
				<span class="txt">留言</span>
				<div class="content">{{ order.message }}</div>
			</li>
			<li class="inp">
				<span class="txt">全景效果图</span>
				<div class="content">{{ need_pano == 1 ? '需要' : '不需要'}}</div>
			</li>
		</ul>
		<p class="proposal"> 如果您有任何意见或建议，请拨打大美客服热线：0755-86337169转VIP会员专属服务部</p>
		<router-link to="/member" tag="div" class="bottom-btn">确定</router-link>
	</div>
</template>
<script>
	import { vipOrderDet } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				oid: this.$route.params.oid,
				order: {}
			}
		},
		methods: {
			ajaxFun: function() {
				vipOrderDet(this.oid).then(data => {
					this.order = data.order;
				});
			}
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#vipOrderDet {
		.top {
			width: 100%;
			.rem(padding-top,40);
			.rem(padding-bottom,15);
			.rem(padding-left,40);
			.rem(padding-right,40);
			text-align: center;
			.icon {
				span {
					display: inline-block;
					.rem(width,98);
					.rem(height,98);
					background: url(./image/vip_17.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			.p1 {
				width: 100%;
				.rem(margin-top,10);
				.rem(margin-bottom,10);
				.rem(font-size,32);
				color: #ed7631;
				.font-family-m();
			}
			.p2 {
				width: 100%;
				.rem(line-height,54);
				.rem(font-size,24);
				color: #666;
			}
		}
		.box-gray10 {
			width: 100%;
			.rem(height,10);
			background: #eee;
		}
		.list {
			.title {
				width: 100%;
				.rem(height,72);
				.rem(line-height,70);
				.rem(font-size,30);
				text-align: center;
				.border(border-bottom,2,#eee);
			}
			.vipNumber {
				width: 100%;
				.rem(height,72);
				.rem(padding-left,30);
				.rem(line-height,70);
				.rem(font-size,28);
				.border(border-bottom,2,#eee);
				span {
					color: #666;
				}
			}
			.inp {
				position: relative;
				width: 100%;
				.rem(height,72);
				.rem(line-height,70);
				color: #666;
				.border(border-bottom,2,#eee);
				.content {
					position: absolute;
					top: 0;
					width: 100%;
					.rem(padding-left,190);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.txt {
				float: left;
				.rem(width,190);
				.rem(padding-left,30);
				.rem(font-size,28);
			}
			.city {
				width: 100%;
				.border(border-bottom,2,#eee);
				.txt {
					.rem(line-height,70);
				}
				.cityDet {
					width: 100%;
					.rem(padding-top,8);
					.rem(padding-bottom,15);
					.rem(padding-left,190);
					.rem(padding-right,37);
					.rem(line-height,63);
					.rem(font-size,28);
					color: #666;
				}
			}
			.plan-img {
				width: 100%;
				.border(border-bottom,2,#eee);
				overflow: hidden;
				.txt {
					.rem(line-height,70);
				}
				>div {
					width: 100%;
					.rem(padding-left,190);
				}
				.img {
					float: left;
					display: flex;
					.rem(width,158);
					.rem(height,158);
					.rem(margin-right,24);
					.rem(margin-top,24);
					.rem(margin-bottom,24);
					align-items: center;
					justify-content: center;
				}
				img {
					.rem(max-width,158);
					.rem(max-height,158);
				}
			}
		}
		.proposal {
			width: 100%;
			.rem(margin-top,19);
			.rem(padding-left,20);
			.rem(padding-right,20);
			.rem(line-height,42);
			.rem(font-size,24);
			color: #ea7600;
			text-align: center;
		}
		.bottom-btn {
			.rem(width,528);
			.rem(height,70);
			margin: 0 auto;
			.rem(margin-top,30);
			.rem(margin-bottom,54);
			.rem(line-height,70);
			.rem(font-size,32);
			color: #fff;
			text-align: center;
			.border-radius(10);
			background: #ed7631;
		}
	}
</style>
