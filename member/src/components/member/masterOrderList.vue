<template>
	<div id="masterOrderList">
		<div class="list">
			<ul>
				<li v-for="list in orderList">
					<div class="top">
						<p>订单号：{{ list.order_id }}</p>
					</div>
					<div class="body">
						<div class="adres">{{ list.address }}</div>
						<p class="type">设计师名称：{{ list.designer_name }}</p>
						<p class="type">期望价格：{{ list.budget == null ? '未填写' : list.budget }}</p>
						<p class="type">期望软装风格：{{ list.expect_style == null ? '未填写' : list.expect_style }}</p>
						<p class="type">客户留言：{{ list.message == null ? '未填写' : list.message }}</p>
					</div>
					<div class="money">
						<p class="num"><span class="time">提交时间：{{ list.addtime }}</span></p>
					</div>
				</li>
			</ul>
		</div>
		<myLoading :isLoading='isLoading' :isList = 'isList'></myLoading>
	</div>
</template>
<script>
	import { masterorder } from '../../common/axios/api.js';
	import { iscrollAjax } from '../../common/public/iscroll.js';
	import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				page: 1,
				pageSize: 15,
				orderList: [],
				isLoading: true,
				isList:true,
				isData: true
			}
		},
		components: {
			myLoading
		},
		methods: {
			iscroll: function() {
				iscrollAjax(() => {
					if (this.isData) {
						this.page += 1;
						this.ajaxFun();
					}
				});
			},
			ajaxFun: function() {
				let obj = {page:this.page,pageSize:this.pageSize}
				masterorder(obj).then(data => {
					if (data.code == 1) {
						for (var i = 0; i < data.orderList.length; i++) {
							this.orderList.push(data.orderList[i]);
						}
            if(this.orderList.length==0){
              this.isList = false;
              this.isLoading = false;
            }else{
              this.isList = true;
            }
						if (data.orderList.length >= this.pageSize) {
							this.isData = true;
            }else{
							this.isData = false;
							this.isLoading = false;
						}
					}
				})
			}
		},
		created() {
			this.ajaxFun();
			this.iscroll();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	.list {
		li {
			width: 100%;
			.rem(margin-top,12);
			.rem(padding-bottom,20);
			background: #fff;
			> div {
				.rem(padding-left,30);
				.rem(padding-right,30);
				.border(border-bottom,2,#eee);
				&:last-of-type {
					border-bottom: 0;
				}
			}
		}
		.top {
			.rem(height,56);
			.rem(line-height,56);
			.rem(font-size,22);
			color: #666;
			span {
				color: #d65317;
			}
		}
		.body {
			.rem(padding-bottom,8);
			.adres {
				.rem(margin-top,9);
				.rem(margin-bottom,24);
				.rem(line-height,48);
				.rem(font-size,26);
				color: #333;
			}
			.type {
				.rem(line-height;44);
				.rem(font-size,22);
				color: #999;
			}
		}
		.money {
			text-align: right;
			.rem(padding-bottom,20);
			.name {
				.rem(margin-top,15);
				.rem(line-height,26);
				.rem(font-size,26);
				color: #333;
			}
			.time {
				float: left;
				.rem(font-size,20);
				color: #999;
			}
			.num {
				.rem(margin-top,19);
				.rem(line-height,28);
				.rem(font-size,28);
				color: #d65317;
			}
		}
	}
</style>
