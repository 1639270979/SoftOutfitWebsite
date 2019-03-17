<template>
	<div id="header" v-show="isHeader">
		<div class="navbar">
			<div class="back" @click="backFun" v-if="isBack"><span class="icon-back"></span></div>
			<div
				class="city"
				@click="cityFun"
				v-if="headerCityShow && cityName != ''"><font>{{ cityName }}</font><span></span></div>
			<div class="img" v-if="isTitle">
        <span>大美软装</span>
      </div>
			<div class="right">
				<div class="serch-box" v-if="isSerch" @click="searchFun"><span class="icon-search"></span></div>
				<router-link to="/member/set" tag="div" class="set" v-if="isSet"><span class="icon-set"></span></router-link>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	export default {
		props: ['isBack','isSet','isSerch','isMessage','isHeader','isTitle'],
		data(){
		  return{
      }
    },
		methods: {
			backFun: function() {
        if (this.$route.path == '/login') {
					let url = window.localStorage.getItem('url');
					if (url == '收藏' || url == '我的' || url == '设置' || url == '更改密码' || url == '订单列表' || url == '设计订单' || url == '立即结算') {
						this.$router.push({path:'/index'})
					}else {
						this.$router.go(-1)
					}
				}else if (this.$route.path == '/login/perfect' && this.wxSystem) {
					let url = window.localStorage.getItem('url');
					if (url == '收藏' || url == '我的' || url == '设置' || url == '更改密码' || url == '订单列表' || url == '设计订单' || url == '立即结算') {
						this.$router.push({path:'/index'})
					}else {
						this.$router.go(-1)
					}
				}else {
					if (this.wxSystem && window.history.length == 1) {
						this.$router.push({path:'/index'});
						return;
					}
					this.$router.go(-1)
				}
				this.$store.state.publicJS.pageLoadShow = false;
			},
			cityFun: function() {
				this.$store.commit('headerCity');
			},
			searchFun: function() {
				window.localStorage.setItem('isSearchInit',true);	//初始化
				this.$router.push('/search');
			},
		},
    computed: {
			...mapGetters([
				'cityName',
				'headerCityShow',
				'wxSystem'
			])
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#header {
		position: fixed;
		top: 0;
		z-index: 400;
		width: 100%;
    max-width: 640px;
    margin: auto;
		font-size: 0;
		.navbar {
			position: relative;
			width: 100%;
			height: 1.2rem;
			background: #fff;
			> div {
				height: 100%;
			}
			.back {
				position: absolute;
				z-index: 1;
				display: flex;
				width: 1.1rem;
				height: 1.2rem;
				align-items: center;
				justify-content: center;
				.icon-back {
					display: inline-block;
					width: 11px;
					height: 19px;
					background: url(../login/image/back.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			.city {
				position: absolute;
				top: 0.5rem;
				left: 0.3rem;
				z-index: 1;
				height: 0.8rem;
				font-size: 12px;
				color: #a0a0a0;
				text-align: center;
				overflow: hidden;
				font {
					display: inline-block;
					max-width: 40px;
					height: 15px;
					text-align: left;
					overflow: hidden;
				}
				span {
					position: relative;
					top: -5px;
					display: inline-block;
					width: 8px;
					height: 3.5px;
					background: url(./image/triangle.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			.img {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 0;
				width: 100%;
				line-height: 1.2rem;
				text-align: center;
        span{
          position: absolute;
          top: 0;
          left: 43%;
          font-size:0.42rem;
          color: #D55317;
        }
				img {
					display: inline-block;
					width: 4rem;
          height: 0.51rem;
					vertical-align: middle;
				}
			}
			.right {
				position: absolute;
				right: 0;
				top: 0;
				> div {
					float: right;
				}
			}
			.serch-box,.set {
				display: flex;
				width: 39px;
				height: 100%;
				align-items: center;
				justify-content: center;
			}
			.icon-search {
				display: inline-block;
				width: 17px;
				height: 17px;
				background: url(./image/search.png) no-repeat;
				background-size: 100% 100%;
			}
			.icon-set {
				display: inline-block;
				width: 17px;
				height: 17px;
				background: url(./image/my_ico_set.png) no-repeat;
				background-size: 100% 100%;
			}
			.message {
				display: flex;
				width: 43.5px;
				height: 100%;
				.rem(padding-left,22);
				align-items: center;
			}
			.icon-msg {
				display: inline-block;
				width: 16.5px;
				height: 16.5px;
				background: url(./image/message.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
</style>
