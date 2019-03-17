<template>
	<div id="pleasePopup" v-if="isShow">
		<div class="popout">
			<p class="title">{{ statusStr[status] }}</p>
			<span class="btn" @click="confirmFun" v-if="status == 'expectSpace'">确定</span>
			<ul class="list" v-if="status == 'expectPrice'">
				<li
					:class="statusObj.expectPrice == key?'action':''"
					v-for="(item,key) in expectPrice"
					@click="expectPriceFun(key)">{{ item }}<div class="icon-selected"><span></span></div></li>
			</ul>
			<ul class="list" v-if="status == 'expectSpace'">
				<li @click="allFun">全部</li>
				<li
					:class="statusObj.expectSpace.indexOf(key) > -1?'action':''"
					v-for="(item,key) in expectSpace"
					@click="expectSpaceFun(key)">{{ item }}<div class="icon-selected"><span></span></div></li>
			</ul>
			<ul class="list" v-if="status == 'expectStyle'">
				<li
					:class="statusObj.expectStyle == key?'action':''"
					v-for="(item,key) in expectStyle"
					@click="expectStyleFun(key)">{{ item }}<div class="icon-selected"><span></span></div></li>
			</ul>
			<ul class="list" v-if="status == 'hardStatus'">
				<li
					:class="statusObj.hardStatus == key?'action':''"
					v-for="(item,key) in hardStatus"
					@click="hardStatusFun(key)">{{ item }}<div class="icon-selected"><span></span></div></li>
			</ul>
      <ul class="list" v-if="status == 'pic'">
        <li
        :class="statusObj.pic == key?'action':''"
					v-for="(item,key) in pic"
					@click="picFun(key)">{{ item }}<div class="icon-selected"><span></span></div></li>
      </ul>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['isShow','status','expectPrice','expectSpace','expectStyle','hardStatus','statusObj','pic'],
		data() {
			return {
				statusStr: {
					'expectPrice' : '期望软装价格',
					'expectSpace' : '期望软装空间',
					'expectStyle' : '期望软装风格',
					'hardStatus'  : '目前硬装阶段',
          'pic'         : '效果图类型'
				}
			}
		},
		methods: {
			expectPriceFun: function(n) {
				this.statusObj.expectPrice = n;
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
				this.statusObj.expectSpace = [];
				for (var i in this.expectSpace) {
					this.statusObj.expectSpace.push(i)
				}
			},
			expectStyleFun: function(n) {
				this.statusObj.expectStyle = n;
				this.$emit('update:isShow',false);
			},
			hardStatusFun: function(n) {
				this.statusObj.hardStatus = n;
				this.$emit('update:isShow',false);
			},
			picFun :function(n){
        this.statusObj.pic = n;
        this.$emit('update:isShow',false);
      },
			confirmFun: function() {
				this.$emit('update:isShow',false);
			},


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
