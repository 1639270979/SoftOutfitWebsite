<template>
	<div id="pleasePopup" v-if="isShow">
		<div class="popout">
			<p class="title">{{ statusStr[status] }}</p>
			<span class="btn" 
				@click="confirmFun"
				v-if="status == 'expectSpace'">确定</span>
			<ul class="list" v-if="status == 'expectPrice'">
				<li 
					:class="statusObj.expectPrice == 1?'action':''"
					@click="expectPriceFun(1)">不限<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.expectPrice == 2?'action':''"
					@click="expectPriceFun(2)">≤10000<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.expectPrice == 3?'action':''"
					@click="expectPriceFun(3)">10001-50000<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.expectPrice == 4?'action':''"
					@click="expectPriceFun(4)">≥50000<div class="icon-selected"><span></span></div></li>
			</ul> 
			<ul class="list" v-if="status == 'expectSpace'">
				<li @click="allFun">全部</li>
				<li 
					:class="statusObj.expectSpace.indexOf(1) > -1?'action':''"
					@click="expectSpaceFun(1)">客厅<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.expectSpace.indexOf(2) > -1?'action':''"
					@click="expectSpaceFun(2)">次卧<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.expectSpace.indexOf(3) > -1?'action':''"
					@click="expectSpaceFun(3)">餐厅<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.expectSpace.indexOf(4) > -1?'action':''"
					@click="expectSpaceFun(4)">卧室<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.expectSpace.indexOf(5) > -1?'action':''"
					@click="expectSpaceFun(5)">儿童房<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.expectSpace.indexOf(6) > -1?'action':''"
					@click="expectSpaceFun(6)">书房<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.expectSpace.indexOf(7) > -1?'action':''"
					@click="expectSpaceFun(7)">厨房<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.expectSpace.indexOf(8) > -1?'action':''"
					@click="expectSpaceFun(8)">餐厅<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.expectSpace.indexOf(9) > -1?'action':''"
					@click="expectSpaceFun(9)">客房<div class="icon-selected"><span></span></div></li>
			</ul>
			<ul class="list" v-if="status == 'acreage'">
				<li 
					:class="statusObj.acreage == 1?'action':''"
					@click="acreageFun(1)">150m²以下<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.acreage == 2?'action':''"
					@click="acreageFun(2)">150m²-200m²<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.acreage == 3?'action':''"
					@click="acreageFun(3)">201m²-235m²<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.acreage == 4?'action':''"
					@click="acreageFun(4)">236m²-270m²<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.acreage == 5?'action':''"
					@click="acreageFun(5)">271m²-300m²<div class="icon-selected"><span></span></div></li>
				<li 
					:class="statusObj.acreage == 6?'action':''"
					@click="acreageFun(6)">301m²-400m²<div class="icon-selected"><span></span></div></li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['isShow','status','statusObj'],
		data() {
			return {
				statusStr: {
					'acreage': '房屋面积',
					'expectPrice' : '期望软装价格',
					'expectSpace' : '期望软装空间'
				}
			}
		},
		methods: {
			expectPriceFun: function(n) {
				this.statusObj.expectPrice = n;
				this.$emit('update:isShow',false);
			},
			acreageFun: function(n) {
				this.statusObj.acreage = n;
				this.$emit('update:isShow',false);
			},
			expectSpaceFun: function(n) {
				let arr = this.statusObj.expectSpace;
				if (arr.indexOf(n) > -1) {
					for (var i = 0; i < arr.length; i++) {
						if (arr[i] == n) {
							this.statusObj.expectSpace.splice(i,1);
						}
					}
				}else {
					this.statusObj.expectSpace.push(n);
				}
			},
			allFun: function() {
				this.statusObj.expectSpace = [1,2,3,4,5,6,7,8,9];
			},
			confirmFun: function() {
				this.$emit('update:isShow',false);
			}
		},
		computed: {
			isAction: function() {
				
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#pleasePopup {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 100%;
		background: rgba(102,102,102,.8);
		.popout {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 1000;
			.rem(width,640);
			.rem(height,600);
			background: #fff;
		}
		.title {
			width: 100%;
			.rem(height,70);
			.rem(line-height,70);
			.rem(font-size,26);
			color: #d65317;
			text-align: center;
			.border(border-bottom,2,#eee);
		}
		.btn {
			position: absolute;
			top: 0;
			right: 0;
			.rem(width,150);
			.rem(height,70);
			.rem(line-height,70);
			.rem(font-size,26);
			text-align: center;
		}
		.list {
			width: 100%;
			.rem(height,530);
			overflow-y: auto;
			ul {
				width: 100%;
				.rem(height,530);
			}
			li {
				width: 100%;
				.rem(height,54);
				.rem(padding-left,32);
				.rem(padding-right,20);
				.rem(line-height,54);
				.rem(font-size,26);
				color: #333;
				.border(border-bottom,2,#eee);
			}
			.action {
				color: #d65317;
				.icon-selected {
					float: right;
					.rem(width,44);
					.rem(height,54);
					.rem(line-height,54);
					text-align: center;
					span {
						display: inline-block;
						.rem(width,18);
						.rem(height,12);
						background: url(./image/selected.png) no-repeat;
						background-size: 100% 100%;
						vertical-align: middle;
					}
				}
			}
		}
	}
</style>