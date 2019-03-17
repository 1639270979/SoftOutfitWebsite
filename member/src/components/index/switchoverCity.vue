<template>
	<div id="switchoverCity" v-show="switchoverCityShow" :class="isAnimation?'in':'out'">
		<div class="top">
			<div class="gary-box"></div>
			<div class="title"><div class="icon-close1" @click="closeFun"><span></span></div>切换城市</div>
			<div class="location">
				当前位置：{{ cityName }}
				<span class="fr"
					v-if="areaList.length != 0"
					@click="isAreaShow=!isAreaShow;">
					切换区县<i class="icon-down"></i>
				</span>
			</div>
			<div class="area" v-if="areaList.length != 0 && isAreaShow">
				<ul>
					<li :class="districtId==0?'action':''"
						@click="areaFun(0)">全城</li>
					<li :class="list.area_id==districtId?'action':''"
						v-for="list in areaList"
						@click='areaFun(list.area_id,list.area_name)'>{{ list.area_name }}</li>
				</ul>
			</div>
		</div>
		<div class="list" id="list">
			<ul id="switchoverCityScroll">
				<li :id="key" v-for="(lists,key) in cityLists">
					<div class="letter">{{ key }}</div>
					<div v-for="item in lists" @click="areaIdFun(item)">{{ item.area_name }}</div>
				</li>
			</ul>
		</div>
		<div class="right-letter">
			<ul class="letter-ul">
				<li><span class="icon-star"></span></li>
				<li @click="jump(k)" v-for="(lists,k) in cityLists" :class="key == k?'action':''">{{ k }}<span class="drum" :ref="k">{{ k }}</span></li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { switchoverCity,setArea } from '../../common/axios/api.js';
	import { mapGetters } from 'vuex';
	export default {
		props: ['areaId','cityShow'],
		data() {
			return {
				cityLists: {},
				superCityList: {},
				isAnimation: true,
				key: 'A',
				isAreaShow: false
			}
		},
		methods: {
			ajaxFun: function() {
				switchoverCity().then(data => {
					this.cityLists = data.cityList;
					this.superCityList = data.superCityList;
				})
			},
			areaFun: function(id,name) {
				var obj = {};
				if (id != 0) {
					this.$store.state.header.districtId = id;
					this.$store.state.header.cityName = name;
					obj = {'area_id':id};
				}else {
					this.$store.state.header.districtId = 0;
					obj = {'area_id':this.cityId};
				}
				setArea(obj).then((data) => {
					if (data.status) {
						this.$emit('increment');
						this.isAnimation = false;
						setTimeout(() => {
							this.$store.commit('headerCity');
							this.isAnimation = true;
							this.isAreaShow = false;
						},300);
					}
				});
			},
			areaIdFun: function(item) {
				this.$emit('update:areaId', item.area_id);
				this.$store.state.header.cityName = item.area_name;
				setArea({'area_id':item.area_id}).then((data) => {
					if (data.status) {
						this.$emit('increment');
						this.isAnimation = false;
						setTimeout(() => {
							this.$store.commit('headerCity');
							this.isAnimation = true;
						},300);
						window.appModel.postMessage(JSON.stringify({'funName':'cookie','url':'member.idmei.com','cookie':'area_id='+item.area_id}));//调用原生设置cookie
					}
				});
			},
			jump: function(num) {
				this.key = num;
				document.getElementById(num).scrollIntoView(true);
				this.$refs[num][0].style.display = 'block';
				setTimeout(() => {
					this.$refs[num][0].style.display = 'none';
				},200);
			},
			closeFun: function() {
				this.isAnimation = false;
				setTimeout(() => {
					this.$store.commit('headerCity');
					this.isAnimation = true;
				},300);
			}
		},
		computed: {
			...mapGetters([
				'switchoverCityShow',
				'cityName',
				'cityId',
				'districtId'
			]),
			areaList: function() {
				let cityId = this.cityId;
				let superCityList = this.superCityList;
				let cityArr = [];
				for (var key in superCityList) {
					if (key == cityId) {
						superCityList[key].areas.forEach((val) => {
							cityArr.push(val);
						})
					}
				}
				return cityArr;
			}
		},
		created() {
			this.ajaxFun();
		},
		mounted() {
			var this_ = this;
      document.getElementById('switchoverCityScroll').onscroll = function(e) {//点击字母跳到对应位置
				let key = '';
				let li = e.target.children;
				let scrollTop = document.getElementById('switchoverCityScroll').scrollTop;
				for (var i = 0; i < li.length; i++) {
					if (i < li.length - 1) {
						if (li[i].offsetTop - 108 <= scrollTop && scrollTop <= li[i+1].offsetTop) {
							this_.key = li[i].id;
						}
					}else {
						if (li[i].offsetTop - 108 <= scrollTop) {
							this_.key = li[i].id;
						}
					}
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#switchoverCity {
		position: fixed;
		left: 0;
		z-index: 1000;
		width: 100%;
		height: 100%;
		background: #fff;
		animation-duration: .4s;
		animation-fill-mode: both;
	}
	.in {
		animation-name: in;
	}
	.out {
		animation-name: out;
	}
	.top {
		position: fixed;
		z-index: 1;
		width: 100%;
		background: #fff;
		box-shadow: 0 3px 4px #d9d9d9;
		.gary-box {
			width: 100%;
			height: 20px;
			background: #999;
		}
		.title {
			position: relative;
			width: 100%;
			height: 53px;
			line-height: 53px;
			font-size: 16px;
			color: #333;
			text-align: center;
		}
		.icon-close1 {
			position: absolute;
			top: 0;
			left: 0;
			width: 52px;
			height: 53px;
			span {
				display: inline-block;
				width: 12px;
				height: 12px;
				background: url(./image/close.png) no-repeat;
				background-size: 100% 100%;
				vertical-align: middle;
			}
		}
		.location {
			width: 100%;
			height: 35px;
			line-height: 35px;
			padding-left: 16px;
			font-size: 12px;
			color: #333;
		}
		.icon-down {
			display: inline-block;
			.rem(width,22);
			.rem(height,13);
			.rem(margin-left,15);
			.rem(margin-right,15);
			background: url(./image/down.png) no-repeat;
			background-size: 100% 100%;
			vertical-align: baseline;
		}
		.area {
			padding-left: 16px;
			li {
				float: left;
				width: 79px;
				height: 27px;
				margin-right: 10px;
				margin-bottom: 10px;
				line-height: 27px;
				font-size: 12px;
				text-align: center;
				border: 1px solid #e6e6e6;
				border-radius: 5px;
			}
			.action {
				background: #eee;
			}
		}
	}
	.list {
		margin-top: 108px;
		ul {
			.rem(height,920);
			overflow-y: auto;
			padding-bottom: 40px;
		}
		li {
			> div {
				width: 100%;
				height: 45px;
				line-height: 45px;
				padding-left: 15px;
				font-size: 14px;
			}
		}
		.letter {
			height: 48px;
			line-height: 48px;
			font-size: 17px;
		}
	}
	.right-letter {
		position: absolute;
		top: 130px;
		right: 0;
		z-index: 5;
		width: 29px;
		li {
			position: relative;
			width: 100%;
			height: 17px;
			line-height: 17px;
			font-size: 10px;
			color: #333;
			text-align: center;
			.drum {
				position: absolute;
				.rem(top,-35);
				.rem(left,-100);
				display: none;
				.rem(width,80);
				.rem(height,80);
				.rem(line-height,80);
				.rem(font-size,30);
				font-weight: 900;
				color: #333;
				background: url(./image/drum.png) no-repeat;
				background-size: 100% 100%;
				opacity: .5;
			}
		}
		.action {
			color: #e94d3a;
		}
		.icon-star {
			display: inline-block;
			width: 10px;
			height: 8.5px;
			background: url(./image/star.png) no-repeat;
			background-size: 100% 100%;
			vertical-align: middle;
		}
	}
	@keyframes in {
		0% {
			top: 100%;
		}
		100% {
			top: 0%;
		}
	}
	@keyframes out {
		0% {
			top: 0%;
		}
		100% {
			top: 100%;
		}
	}
</style>
