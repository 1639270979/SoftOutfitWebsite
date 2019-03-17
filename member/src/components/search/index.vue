<template>
	<div id="search">
		<div class="header">
			<div class="navbar">
				<div class="back" @click="backFun"><span class="icon-back"></span></div>
				<div class="inp">
          <form @submit.prevent="searchFun">
            <input type="search" v-model="search">
          </form>
        </div>
				<span class="btn-search" @click="searchFun">搜索</span>
			</div>
		</div>
    <div v-if="ishistory" class="bg"></div>
		<div class="history" v-if="ishistory">
			<p class="title">历史搜索<span class="fr" @click="clearFun">清除记录</span></p>
			<div class="list" v-if="historyArr.length > 0">
				<span v-for="item in historyArr" @click="historyFun(item)">{{ item }}</span>
			</div>
		</div>
		<div class="nav" v-show="!ishistory">
			<ul>
				<li @click="typeFun(1)"><span :class="type==1?'action':''">设计师</span></li>
				<li @click="typeFun(2)"><span :class="type==2?'action':''">品牌</span></li>
				<li @click="typeFun(3)"><span :class="type==3?'action':''">商品</span></li>
				<li @click="typeFun(4)"><span :class="type==4?'action':''">案例组合</span></li>
				<li @click="typeFun(5)"><span :class="type==5?'action':''">发现</span></li>
			</ul>
		</div>
		<div class="list2" v-if="this.type == '1' && !ishistory">
			<ul>
				<li v-for="item in items">
					<router-link :to="'/index/designer/designerDet/'+item.designer_id">
						<div class="img"><img src="" v-lazy="item.homepage_headimg"></div>
						<div class="info">
							<div class="left design-left">
								<p class="name">{{ item.name }}</p>
								<p class="adrs">{{ item.province+item.city }}</p>
								<div class="box-x">
									<span class="icon" v-for="n in item.level / 1"></span>
								</div>
								<p class="status">{{ item.design_style_name }}</p>
							</div>
							<div class="right design-right">接单量：{{ item.orders }}</div>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="list2" v-if="this.type == '2' && !ishistory">
			<ul>
				<li v-for="item in items">
					<router-link :to="'/index/shop/det/brand/'+item.brand_id">
						<div class="img"><img src="" v-lazy="item.logo"></div>
						<div class="info">
							<div class="left">
								<p class="name">{{ item.brand_name }}</p>
								<div class="box-x">
									<span>口碑值：</span>
									<span class="icon" v-for="n in item.praise / 1"></span>
								</div>
								<p class="status">主营：{{ item.business }}</p>
							</div>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="list3" v-if="this.type == '3' && !ishistory">
			<ul>
				<li v-for="item in items">
					<router-link :to="'/index/shop/shopDet/'+item.product_id">
						<div class="img"><img src="" v-lazy="item.picture"></div>
						<div class="info">
							<div class="logo"><img src="" v-lazy="item.logo"></div>
							<p class="title">{{ item.product_name }}</p>
							<!--<p class="money">¥{{ isVip?item.vip_price:item.price }}</p>-->
						</div>
					</router-link>
					<div class="sold-out" v-if="item.is_show == 'N'">
						<div class="img"><img src="./image/Sold-Out.png"></div>
					</div>
				</li>
			</ul>
		</div>
		<div class="list1" v-if="this.type == '4' && !ishistory">
			<ul>
				<li v-for="item in items">
					<router-link
            v-if="item.type == 'case'"
            :to="'/index/designer/programmeDet/'+item.case_id">
						<div class="img"><img src="" v-lazy="item.pic"></div>
					</router-link>
          <router-link
            v-else-if="item.type == 'suit'"
            :to="'/index/suit/suitDet/'+item.case_id">
            <div class="img"><img src="" v-lazy="item.pic"></div>
          </router-link>
					<div class="title">
						<p>{{ item.title }}</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="list1" v-if="this.type == '5' && !ishistory">
			<ul>
				<li v-for="item in items">
					<router-link :to="{ name: '发现详情',params: {id:item.article_id,is_page:2}}">
						<div class="img"><img src="" v-lazy="item.pic"></div>
					</router-link>
					<div class="title">
						<p>{{ item.title }}</p>
					</div>
				</li>
			</ul>
		</div>
		<myLoading :isLoading='isLoading' v-show="isShow" :isList="isList"></myLoading>
	</div>
</template>
<script>
	import { search,searchHistory,clearHistory } from '../../common/axios/api.js';
	import { iscrollAjax } from '../../common/public/iscroll.js';
	import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				ishistory: true,
				historyArr: [],
				page     : 1,
				pageSize : 20,
				search   : '',
				items    : [],
				type     : 3,
				isLoading: true,
				isList    :true,
				isShow   : false,
				isInit: true,	//是否重置数据
				isData: true,	//下拉加载判断是否还有数据
        isVip:false
			}
		},
		components: {
			myLoading
		},
		methods: {
			initFun: function() {
				this.ishistory = true;
				this.page = 1;
				this.search = '';
				this.type = 3;
				this.isLoading = true;
				this.isShow = false;
				this.isData = true;
				this.ajaxFun();
			},
			iscroll: function() {
				iscrollAjax(() => {
					if (this.isData) {
						this.isData = false;
						this.isShow = true;
						this.ishistory = false;
            let obj = {'kw':this.search,'type':this.type,'page':this.page,'pageSize':this.pageSize}
						search(obj).then(data => {
							if (data.code == 1) {
								for (var i = 0; i < data.list.length; i++) {
									this.items.push(data.list[i]);
								}
								if (data.list.length < this.pageSize) {
                  this.isLoading = false;
								}else {
                  this.isLoading = true;
                  this.isData = true;
									this.page+=1;
								}
							}
						})
					}
				});
			},
			ajaxFun: function() {
				searchHistory().then(data => {
          this.historyArr=[];
					for (var i = 0; i < data.searchList.length; i++) {
						this.historyArr.push(data.searchList[i]);
          }
				})
			},
			searchFun: function() {
				this.page = 1;
				this.isShow = true;
				this.ishistory = false;
				this.items = [];
				let obj = {'kw':this.search,'type':this.type,'page':this.page,'pageSize':this.pageSize}
				search(obj).then(data => {
          this.isVip=data.is_vip;
					if (data.code == 1) {
						for (var i = 0; i < data.list.length; i++) {
							this.items.push(data.list[i]);
						}
						if(this.items.length==0){
						    this.isList=false;
            }else{
						    this.isList=true;
            }
						if (data.list.length < this.pageSize) {
							this.isData = false;
							this.isLoading = false;
						}else {
							this.isData = true;
							this.isLoading = true;
							this.page+=1;
						}
					}
				})
			},
			typeFun: function(str) {
				this.ishistory = false;
				this.isLoading = true;
				this.items = [];
				this.type = str;
				this.page = 1;
				this.searchFun();
			},
			backFun: function() {
//				this.$router.push('/index');
        this.$router.go(-1);
			},
			historyFun: function(str) {	//搜索历史记录
				this.ishistory = false;
				this.search = str;
				this.page = 1;
				this.searchFun();
			},
			clearFun: function() {//清除
				clearHistory().then(data => {})
				this.historyArr = [];
			}
		},
		mounted(){

    },
		beforeRouteEnter(to, from, next) {
			// 在渲染该组件的对应路由被 confirm 前调用
			// 不！能！获取组件实例 `this`
			// 因为当钩子执行前，组件实例还没被创建
			if (window.localStorage.getItem('isSearchInit') == 'true') {
				window.localStorage.setItem('searchScrollTop',0);
			}
			next(vm => {
				let scrollTop = window.localStorage.getItem('searchScrollTop');
				window.scrollTo(0,scrollTop);
			});
		},
		activated() {
			if (this.isInit || window.localStorage.getItem('isSearchInit') == 'true') {
				this.initFun();
			}
			this.iscroll();
      var header = document.getElementsByClassName('header')[0]
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") { //判断是否为微信浏览器
        header.style.top='1.5rem';
      }else{
        header.style.top='0';
      }
      var close = document.getElementsByClassName('wxheader')[0].children[0];
      close.onclick=function(){
        header.style.top='0rem';
      }
    },
		beforeRouteLeave(to, from, next) {
      if (to.name != '大美首页') {
				this.isInit = false;
				let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				window.localStorage.setItem('searchScrollTop',scrollTop);
				window.localStorage.setItem('isSearchInit',false);
			}
			next();
		},
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	.header {
		position: fixed;
		top: 0;
		z-index: 1000;
		width: 100%;
    max-width: 640px;
    margin: auto;
		font-size: 0;
		.navbar {
			position: relative;
			width: 100%;
			height: 44px;
			font-size: 0;
			background: #fff;
			> div {
				height: 100%;
			}
			.back {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 50;
				display: flex;
				width: 41px;
				height: 44px;
				align-items: center;
				justify-content: center;
				.icon-back {
					display: inline-block;
					width: 11px;
					height: 19px;
					background: url(./image/back.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.inp {
			display: flex;
			float: left;
			width: 80%;
			.rem(padding-left,92);
			align-items: center;
			input {
				width: 100%;
				.rem(height,48);
				padding: 0;
				.rem(padding-left,20);
				.rem(padding-right,20);
				.rem(font-size,26);
				border: 0;
				.border-radius(30);
				background: #eee;
				outline: none;
			}
		}
		.btn-search {
			float: left;
			width: 20%;
			height: 44px;
			line-height: 1.2rem;
			.rem(font-size,26);
			text-align: center;
			color: #e37820;
		}
	}
  .bg{
    width: 100%;
    height: 1.2rem;
  }
	.history {
		width: 100%;
    /*margin-top: 1.2rem;*/
		.rem(padding-top,42);
		.rem(padding-left,25);
		.rem(padding-right,25);
		.border(border-top,10,#eee);
		.title {
			width: 100%;
			.rem(line-height,30);
			.rem(font-size,30);
			span {
				.rem(font-size,24);
				color: #e99759;
			}
		}
		.list {
			span {
				display: inline-block;
				.rem(margin-top,32);
				.rem(margin-right,18);
				.rem(padding-left,32);
				.rem(padding-right,32);
				.rem(line-height,54);
				.rem(font-size,24);
				.border-radius(30);
				background: #eee;
			}
		}
	}
	.nav {
		width: 100%;
		height: 1.25rem;
    margin-top: 1.2rem;
		.border(border-top,10,#eee);
		background: #fff;
		ul {
			overflow: hidden;
		}
		li {
			float: left;
			width: 20%;
			.rem(font-size,24);
			color: #333;
			text-align: center;
			> span {
				display: inline-block;
				.rem(line-height,60);
				.rem(width, 128);
			}
			.action {
				color: #d65317;
				.border(border-bottom,10,#d65317);
			}
		}
	}
	.list1 {
		li {
			position: relative;
			width: 100%;
			.rem(height,340);
			background: #fff;
			.border(border-top,2,#eee);
			> a {
				display: block;
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
			img {
				width: 100%;
				.rem(min-height,340);
			}
      img[lazy=loading] {
        width: 200px;
        height: 200px;
        display: block;
        margin: 0 2.3rem;
        margin-bottom: 0.4rem;
      }
			.title {
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 5;
				width: 100%;
				.rem(height,70);
				.rem(padding-left,30);
				.rem(line-height,70);
				.rem(font-size,26);
				color: #fff;
				background: rgba(0,0,0,.5);
				p {
					width: 100%;
					.rem(padding-right,140);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
	.list2 {
		li {
			position: relative;
			.rem(padding-top,35);
			.rem(padding-bottom,35);
			.rem(padding-left,28);
			.rem(padding-right,28);
			.border(border-top,2,#eee);
			background: #fff;
			overflow: hidden;
			a {
				display: block;
				width: 100%;
				height: 100%;
			}
			a > div {
				float: left;
			}
		}
		.img {
			.rem(width,158);
			.rem(height,158);
			border-radius: 50%;
			overflow: hidden;
			img {
				width: 100%;
				.rem(min-height,158);
				border-radius: 50%;
			}
		}
		.info {
			display: flex;
			width: 100%;
			.rem(margin-left,-158);
			.rem(padding-left,178);
		}
		.left {
			float: left;
			.rem(width,270);
			p {
				width: 100%;
        padding-top: 0.1rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.name {
				.rem(margin-top,5);
				.rem(line-height,30);
				.rem(font-size,28);
				color: #333;
			}
			.adrs {
				.rem(margin-top,17);
				.rem(line-height,26);
				.rem(font-size,24);
				color: #999;
			}
			.status {
				.rem(margin-top,18);
				.rem(line-height,26);
				.rem(font-size,22);
				color: #999;
			}
			.box-x {
				.rem(margin-top,17);
				font-size: 0;
				span {
					display: inline-block;
					margin-right: 1px;
					.rem(line-height,24);
					.rem(font-size,22);
					color: #999;
					vertical-align: middle;
				}
				.icon {
					.rem(width,25);
					.rem(height,24);
					background: url(./image/fav_fill.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.right {
			.rem(width,140);
			.rem(font-size,22);
			color: #999;
			text-align: right;
			align-self: flex-end;
		}
		.design-left {
			width: 60%;
		}
		.design-right {
			width: 40%;
		}
	}
	.list3 {
		li {
			position: relative;
			.border(border-top,2,#eee);
			overflow: hidden;
			> a {
				display: block;
				width: 100%;
				height: 100%;
				.rem(padding-top,35);
				.rem(padding-bottom,35);
				.rem(padding-left,28);
				.rem(padding-right,28);
				background: #fff;
				overflow: hidden;
			}
			.img {
				float: left;
				.rem(width,158);
				.rem(height,158);
				overflow: hidden;
				img {
					width: 100%;
					.rem(min-height,158);
				}
			}
			.info {
				.rem(padding-left,178);
			}
			.logo {
				.rem(width,40);
				.rem(height,40);
				overflow: hidden;
				img {
					width: 100%;
					.rem(min-height,40);
				}
			}
			.title {
				display: -webkit-box;
				.rem(margin-top,15);
				.rem(line-height,30);
				.rem(font-size,28);
				color: #333;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.money {
				.rem(margin-top,15);
				.rem(font-size,28);
				color: #d65317;
			}
		}
		.sold-out {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
			display: flex;
			width: 100%;
			height: 100%;
			align-items: center;
			background: rgba(238,238,238,.8);
			.img {
				.rem(width,158);
				.rem(height,158);
				margin: auto;
				img {
					width: 100%;
				}
			}
		}
	}
</style>
