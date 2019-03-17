<template>
	<div id="brand">
		<div class="top" :style="'backgroundImage:url('+item.background+')'">
			<router-link class="img" :to="'/index/shop/det/brandList/brandDet/'+bid" tag="div">
				<img :src="item.logo">
			</router-link>
			<router-link class="info" :to="'/index/shop/det/brandList/brandDet/'+bid" tag="div">
				<div class="brand-name"><p>{{ item.brand_name }}<i></i></p></div>
				<div class="follow">{{ item.collect_num }}人关注</div>
			</router-link>
			<div class="like"
				:class="item.is_collect == 'Y'? 'action':''"
				@click="collectFun">
			</div>
		</div>
		<div class="nav">
			<div :class="type == 0?'action':''" @click="typeFun(0)">
				<p>{{ item.all_num }}</p>
				<p>全部商品</p>
				<span class="line"></span>
				<i></i>
			</div>
			<div :class="type == 1?'action':''" @click="typeFun(1)">
				<p>{{ item.new_num }}</p>
				<p>上新</p>
				<span class="line"></span>
				<i></i>
			</div>
			<div :class="type == 2?'action':''" @click="typeFun(2)">
				<p>{{ item.seckill_num }}</p>
				<p>促销</p>
				<span class="line"></span>
			</div>
		</div>
		<div class="list">
			<ul>
				<li v-for="info in infos">
					<router-link :to="'/index/shop/shopDet/'+info.product_id">
						<div class="img"><img v-lazy="info.picture"></div>
						<div class="content">
							<div class="title">
								<p>{{info.product_name}}</p>
							</div>
							<div class="money">
                <!--¥<span>{{info.price}}</span>-->
              </div>
						</div>
					</router-link>
					<div class="like" v-if="!isHide"
						:class="info.is_collect == 'Y'? 'action':''"
						@click="collectShopFun(info)">
						<span class="icon-like"></span>
						<span class="txt">{{ info.is_collect == 'Y'? '收藏':'收藏' }}</span>
					</div>
				</li>
			</ul>
		</div>
		<confirmPrompt
			@rightBtn="goLoginFun"></confirmPrompt>
		<myLoading :isLoading='isLoading' :isList="isList"></myLoading>
	</div>
</template>
<script>
	import { brand,collectBrand,shopDetCollect } from '../../common/axios/api.js';
	import { iscrollAjax } from '../../common/public/iscroll.js';
	import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				page: 1,
				pageSize: 20,
				bid: this.$route.params.bid,
				item: {},
				infos: [],
				type: 0,
				msg          : '',
				isConfirmShow: false,
				btn          : '',
				isLoading    : true,
				isList  : true,
				wxSystem: this.$store.state.publicJS.wxSystem,
        isHide:true
			}
		},
		components: {
			myLoading
		},
		methods: {
			initFun: function() {
				this.page  = 1;
				this.bid   = this.$route.params.bid;
				this.item  = {};
				this.infos = [];
				this.type  = 0;
				let sort   = this.type;
				let obj    = {'page':this.page,'pageSize':this.pageSize,'bid':this.bid,'sort':sort};
				this.ajaxFun(obj);
			},
			iscroll: function() {
				iscrollAjax(() => {
					if (this.isLoading) {
						this.isLoading = false;
						this.page += 1;
						let sort = this.type;
						let obj = {'page':this.page,'pageSize':this.pageSize,'bid':this.bid,'sort':sort};
						this.ajaxFun(obj);
					}
				});
			},
			ajaxFun: function(obj) {
				brand(obj).then(data => {
					this.item = data.brandInfo;
					for (var i = 0; i < data.info.length; i++) {
						this.infos.push(data.info[i])
					}
					if(this.infos.length==0){
					    this.isList=false;
          }else{
					    this.isList=true;
          }
					if (data.info.length < this.pageSize) {
						this.isLoading = false;
					}else {
							this.isLoading = true;
					}
				})
			},
			collectFun: function() {//品牌收藏
				let type = this.item.is_collect == 'Y'? 'del':'add';
				let obj = {'type':type,'bid':this.bid};
				collectBrand(obj).then(data => {
					if (data.islogin == false) {
						if (this.wxSystem) {
							this.confirmPrompt('请先完善资料','去完善');
							return;
						}
						this.confirmPrompt('请先登陆','去登陆');
					}else {
						this.item.is_collect = this.item.is_collect == 'Y'?'N':'Y';
					}
				})
			},
			collectShopFun: function(item) {//商品收藏
				let type = item.is_collect == 'Y'? 'del':'add';
				let obj = {'type':type,'pid':item.product_id};
				shopDetCollect(obj).then(data => {
					if (data.islogin == false) {
						if (this.wxSystem) {
							this.confirmPrompt('请先完善资料','去完善');
							return;
						}
						this.confirmPrompt('请先登陆','去登陆');
					}else {
						item.is_collect = item.is_collect == 'Y'?'N':'Y';
					}
				})
			},
			typeFun: function(n) {
				this.type = n;
				this.page = 1;
				this.infos = [];
				this.isLoading = true;
				let sort = this.type;
				let obj = {'page':this.page,'pageSize':this.pageSize,'bid':this.bid,'sort':sort};
				this.ajaxFun(obj);
			},
			confirmPrompt: function(str,btn) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.state.publicJS.confirmPromptBtnRight = btn;
				this.$store.commit('confirmPrompt');
			},
			goLoginFun: function() {
				this.$store.state.header.backName = this.$route.name;
				if (this.wxSystem) {
					this.$router.push({path:'/login/perfect'});
					return;
				}
				this.$router.push({path:'/login'});
			}
		},
		beforeRouteEnter(to, from, next) {
			// 在渲染该组件的对应路由被 confirm 前调用
			// 不！能！获取组件实例 `this`
			// 因为当钩子执行前，组件实例还没被创建
			let isInit = window.localStorage.getItem('brandIsInit');
			if (isInit == 'true') {
				window.localStorage.setItem('brandScrollTop',0);
			}
			next(vm => {
				let scrollTop = window.localStorage.getItem('brandScrollTop');
				window.scrollTo(0,scrollTop);
				let isInit = window.localStorage.getItem('brandIsInit');
				if (isInit == 'true') {
					vm.initFun();
				}
			});
		},
		created() {
			this.iscroll();
			window.localStorage.setItem('brandIsInit',true);
		},
		activated() {
			this.iscroll();
			let bid = window.localStorage.getItem('brandId');
			if (this.$route.params.bid != bid) {
				this.initFun();
			}
		},
		beforeRouteLeave(to, from, next) {
			if (to.name == '商品详情') {
				let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				window.localStorage.setItem('brandScrollTop',scrollTop);
				window.localStorage.setItem('brandIsInit',false);
				window.localStorage.setItem('brandId',this.$route.params.bid);
			}
			next();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	.top {
		position: relative;
		width: 100%;
		.rem(height,220);
		.rem(margin-top,2);
		.rem(margin-bottom,2);
		.rem(padding-top,139);
		.rem(padding-left,28);
		.rem(padding-right,28);
		//background: url(./image/brand.jpg) no-repeat;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		letter-spacing: 1px;
		overflow: hidden;
		> div {
			float: left;
		}
		.img {
			position: relative;
			z-index: 1;
			float: left;
			display: flex;
			.rem(width,64);
			.rem(height,64);
			overflow: hidden;
			.rem(border-radius,10);
			background: #fff;
			align-items: center;
			justify-content: center;
			img {
				.rem(max-width,64);
				.rem(max-height,64);
			}
		}
		.info {
			position: relative;
			.rem(width,400);
			.rem(padding-left,20);
		}
		.brand-name {
			p {
				position: relative;
				display: inline-block;
				max-width: 100%;
				.rem(padding-right,35);
				.rem(line-height,27);
				.rem(font-size,24);
				color: #fff;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				> i {
					position: absolute;
					.rem(top,3);
					right: 0;
					.rem(width,24);
					.rem(height,24);
					background: url(./image/brand-right.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.follow {
			.rem(padding-right,35);
			.rem(line-height,27);
			.rem(font-size,24);
			color: #fff;
		}
		.like {
			position: absolute;
			.rem(top,139);
			.rem(right,28);
			.rem(width,120);
			.rem(height,44);
			background: url(./image/brand-like.png) no-repeat;
			background-size: 100% 100%;
		}
		.like.action {
			background-image: url(./image/brand-like_1.png);
		}
	}
	.nav {
		width: 100%;
		.rem(height,88);
		background: #fff;
		overflow: hidden;
		> div {
			position: relative;
			float: left;
			.rem(height,88);
			width: 33.333%;
			.rem(padding-top,15);
			.rem(padding-left,10);
			.rem(padding-right,10);
			.rem(font-size,24);
			color: #333;
			text-align: center;
			> i {
				position: absolute;
				.rem(top,24);
				right: 0;
				.rem(width,2);
				.rem(height,40);
				background: #d2d2d2;
			}
		}
		.action {
			color: #e37820;
			>span {
				position: absolute;
				bottom: 0;
				right: 5%;
				width: 90%;
				.rem(height,3);
				background: #e37820;
			}
		}
	}
	.list {
		width: 100%;
		.rem(margin-top,20);
		ul {
			width: 100%;
			.rem(padding-left,4);
			.rem(padding-right,4);
			overflow: hidden;
		}
		li {
			position: relative;
			float: left;
			width: 49.5%;
			.rem(margin-top,4);
			margin-right: .5%;
			background: #fff;
			&:nth-child(2n) {
				margin-right: 0;
			}
		}
		.img {
			width: 100%;
			.rem(height,260);
			margin-bottom: 13.5px;
			padding: 13.5px;
			padding-bottom: 0;
			overflow: hidden;
			img {
				width: 100%;
				.rem(min-height,260);
			}
		}
		.content {
			.rem(margin-top,40);
			.rem(padding-left,16);
			.rem(padding-right,16);
		}
		.title {
			width: 100%;
			font-size: 0;
      position: relative;
      top:0.35rem;
			p {
				width: 100%;
				.rem(margin-bottom,6.5);
				line-height: 13px;
				font-size: 13px;
				color: #333;
        padding-top: 0.1rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.money {
			width: 100%;
      height: 25px;
			line-height: 25px;
			font-size: 14px;
			color: #e37820;
			span {
				.rem(margin-left,10);
			}
		}
		.like {
			position: absolute;
			bottom: 0;
			.rem(right,23);
			.rem(width,100);
			.rem(height,80);
			.rem(padding-top,40);
			font-size: 0;
			text-align: right;
			> span {
				display: inline-block;
				.rem(font-size,22);
				vertical-align: middle;
			}
			.icon-like {
				.rem(width,27);
				.rem(height,24);
				.rem(margin-right,6);
				background: url(./image/bottom_ico_4_collection.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.like.action {
			.txt {
				color: #d65317;
			}
			.icon-like {
				background-image: url(./image/bottom_ico_4_collection_state.png);
			}
		}
	}
</style>
