<template>
	<div id="numberKey">
		<div class="keyboard animated" :class="name" v-if="numberKeyShow" @click.self="backFun">
			<ul>
				<li @click="numFun(1)">1</li>
				<li @click="numFun(2)">2</li>
				<li @click="numFun(3)">3</li>
				<li @click="numFun(4)">4</li>
				<li @click="numFun(5)">5</li>
				<li @click="numFun(6)">6</li>
				<li @click="numFun(7)">7</li>
				<li @click="numFun(8)">8</li>
				<li @click="numFun(9)">9</li>
				<li class="gray" @click="numFun('.')">.</li>
				<li @click="numFun(0)">0</li>
				<li class="gray" @click="delFun"><span class="icon-del"></span></li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	export default {
		props: ['num'],
		data() {
			return {
				name: 'fadeInTop'
			}
		},
		methods: {
			numFun: function(n) {
				var str = this.num;
				str += n;
				var reg1 = new RegExp('^[.]','g');				//第一个为.就输出0.
				var reg2 = new RegExp('^[0]{1}[0]{1}','g');		//第一个和第二个为0，就输出0
				var reg3 = new RegExp('^[0]{1}[1-9]{1}','g');	//第一个是0，第二个是1-9就去除首位0
				var reg4 = new RegExp('^[0-9]{1,8}$','g');		//八位数
				var reg5 = new RegExp('^[0-9]+[.]{1}([0-9]{1,2})?$','g');	//两位小数
				if (reg1.test(str)) {
					this.$emit('update:num','0.');
				}else if (reg2.test(str)) {
					this.$emit('update:num','0');
				}else if (reg3.test(str)) {
					this.$emit('update:num','1');
				}else if (reg4.test(str)) {
					this.$emit('update:num',str);
				}else if (reg5.test(str)) {
					this.$emit('update:num',str);
				}
			},
			delFun: function() {
				this.$emit('update:num',this.num.substring(0,this.num.length-1));
			},
			backFun: function() {
				this.name = 'fadeInDown';
				setTimeout(() => {
					this.$store.commit('isNumberKeyShow');
					this.name = 'fadeInTop';
				},400);
			}
		},
		computed: {
			...mapGetters([
				'numberKeyShow'
			])
		}
	}
</script>
<style lang="less" scoped>
	#numberKey {
		.keyboard {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1000;
			width: 100%;
			height: 100%;
			ul {
				position: fixed;
				left: 0;
				bottom: 0;
				width: 100%;
				font-size: 20px;
				color: #000;
				background: #fff;
			}
			li {
				float: left;
				width: 33.333%;
				height: 57.33px;
				line-height: 57.33px;
				text-align: center;
				border-bottom: 1px solid #ccc;
				border-right: 1px solid #ccc;
				&:nth-child(3n) {
					border-right: 0;
				}
				&:nth-child(10),&:nth-child(11),&:nth-child(12) {
					border-bottom: 0;
				}
			}
			.icon-del {
				display: inline-block;
				width: 30px;
				height: 30px;
				background: url(./image/del.png) no-repeat;
				background-size: 100% 100%;
				vertical-align: middle;
			}
			.gray {
				background: #d1d5db;
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