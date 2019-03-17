<template>
	<div id="shop" :class="isNoScroll" @touchmove="bgScroll">
		<div class="nav">
			<ul>
				<li @click="typeFun(1,layerNum)">
					<span class="small action" v-if="cid==''">全部<i class="icon-down"></i></span>
					<span class="small action" v-else>{{cidStr}}<i class="icon-down"></i></span>
				</li>
				<li @click="typeFun(2)">
					<span class="small" :class="styles != 0?'action':''">{{ styleStr }}<i class="icon-down"></i></span>
				</li>
				<li @click="typeFun(3)">
					<span class="small" :class="sort != 'null' ? 'action' : ''">{{ sortStr }}<i class="icon-down"></i></span>
				</li>
			</ul>
		</div>
		<div class="list">
			<ul v-if="items">
				<router-link :to="{name:'商品详情',params:{pid:item.product_id}}" v-for="item in items" :key="1" tag="li" >
					<div class="img">
						<!-- <img src="" v-lazy="item.picture"> -->
						<img :src="item.picture" style=".rem(min-height,260);">
						<!-- <img class="img-layer" src="./image/layer.png"> -->
						<img class="img-layer" src="./image/layer.png" style=".rem(min-height,260);">
            <img v-if="item.seckill_id > 0" src="./image/ee3.jpg" alt="" style="position: absolute;bottom: 0;left: 0;">
					</div>
					<div class="content">
						<div class="title">
							<!-- <div class="logo">
								<img src="" v-lazy="item.logo">
							</div> -->
							<p>{{item.product_name}}</p>
						</div>
						<div class="city">{{item.delivery_place}}</div>

						<div class="money2" v-if="isVip">
              <div class="vip-money">
              <span v-if="item.seckill_id > 0">¥{{ item.price }}</span>&nbsp;&nbsp;&nbsp;
              <span style="color: #888;text-decoration: line-through" v-if="item.seckill_id > 0">¥{{ item.price_market }}</span>
              <!--<span v-else>¥{{ item.vip_price }}</span>-->
              </div>
              <!--<i class="icon-vip" v-if="item.seckill_id == 0"></i>-->
              <!--<span class='money-num'>¥{{item.price}}</span>-->
            </div>
            <div class="money" v-else>
              <div class="vip-money">
                <span v-if="item.seckill_id > 0">¥{{ item.price }}</span>&nbsp;&nbsp;&nbsp;
                <span style="color: #888;text-decoration: line-through" v-if="item.seckill_id > 0">¥{{ item.price_market }}</span>
                <!--<span  v-else>¥{{ item.price }}</span>-->
              </div>
            </div>
					</div>

				</router-link>
			</ul>
		</div>
		<!-- 分类弹出层1 -->
		<div class="shopTypePopup1 animated" :class="cidObj1.name" v-if="cidObj1.isShow">
			<div class="popout" ></div>
			<div class="mask">
				<div class="mask-box">
					<div class="title">
						<span class="back" @click="backFun1">返回</span>
						<p>分类</p>
					</div>
					<div class="content">
						<ul>
							<li @click="allFun1()">全部</li>
							<li :class="cid==arr.category_id?'action':''"
								v-for="arr in cidObj1.cidArr"
								@click="cidFun1(arr.nextLevel,arr.category_id,arr.category_name)">
								{{arr.category_name}}
								<div class="right" v-if="arr.nextLevel">
									{{arr.nextLevel}}
									<span class="icon-right"></span>
								</div>
								<div class="icon-selected" v-else><span></span></div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- 分类弹出层2 -->
		<div class="shopTypePopup2 animated" :class="cidObj2.name" v-if="cidObj2.isShow">
			<div class="popout" ></div>
			<div class="mask">
				<div class="mask-box">
					<div class="title">
						<span class="back" @click="backFun2">返回</span>
						<p>{{cidObj2.title}}</p>
					</div>
					<div class="content">
						<ul>
							<li @click="allFun2">全部</li>
							<li :class="cid==arr.category_id?'action':''"
								v-for="arr in cidObj2.cidArr"
								@click="cidFun2(arr.nextLevel,arr.category_id,arr.category_name)">
								{{arr.category_name}}
								<div class="right" v-if="arr.nextLevel">
									{{arr.nextLevel}}
									<span class="icon-right"></span>
								</div>
								<div class="icon-selected" v-else><span></span></div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- 分类弹出层3 -->
		<div class="shopTypePopup3 animated" :class="cidObj3.name" v-if="cidObj3.isShow">
			<div class="popout"></div>
			<div class="mask">
				<div class="mask-box">
					<div class="title">
						<span class="back" @click="backFun3">返回</span>
						<p>{{cidObj3.title}}</p>
					</div>
					<div class="content">
						<ul>
							<li @click="allFun3">全部</li>
							<li :class="cid==arr.category_id?'action':''"
								v-for="arr in cidObj3.cidArr"
								@click="cidFun3(arr.category_id,arr.category_name)">
								{{arr.category_name}}
								<div class="icon-selected"><span></span></div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- 选择层'风格和综合排序' -->
		<stylePrompt @increment="styleAjaxFun" ></stylePrompt>
		<myLoading :isLoading='isLoading' :isList="isList"></myLoading>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { shop,getCategory } from '../../common/axios/api.js';
	import { iscrollAjax } from '../../common/public/iscroll.js';
	import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				items    : [],
				page     : 1,
				pageSize : 20,
				cid      : this.$route.params.cid?this.$route.params.cid:'',
				cidStr   : '',
				cidObj1   : {
					cidArr : [],
					name   : 'fadeInRight',
					isShow : false
				},
				cidObj2 : {
					cidArr : [],
					name   : 'fadeInRight',
					isShow : false,
					title  : '',
					cid    : ''
				},
				cidObj3 : {
					cidArr : [],
					name   : 'fadeInRight',
					isShow : false,
					title  : '',
					cid    : ''
				},
				styles   : 0,
				sort     : this.$route.params.sort?this.$route.params.sort:'null',
				stylesObj: {},
				sortObj  : {
					'null'			: '默认',
					'sales'			: '销量',
					'addtime'		: '上架时间',
					'price_desc'	: '价格由高到低',
					'price_asc'		: '价格由低到高',
					'seckill'		: '秒杀'
				},
				layerNum   : 1,
				isNoScroll : '',
				type       : '',
				isLoading: true,
				isList:true,
				isInit: false,
				isData: true,	//下拉加载判断是否还有数据
        Prompt:false ,// 弹出层是否弹出
        isVip:false

			}
		},
		components: {
			myLoading
		},
		methods: {
			initFun: function() {
				this.items  = [];
				this.page   = 1;
				this.cid    = this.$route.params.cid?this.$route.params.cid:'';
				this.styles = 0;
				this.sort   = this.$route.params.sort?this.$route.params.sort:'';
				this.layerNum  = 1;
				let obj     = {'page':this.page,'pageSize':this.pageSize,'cid':this.cid,'style':this.styles,'sort':this.sort}
				this.ajaxFun(obj);
			},
			iscroll: function() {
				iscrollAjax(() => {
					if (this.isData) {
						this.isData = false;
						this.page += 1;
						let obj = {'page':this.page,'pageSize':this.pageSize,'cid':this.cid,'style':this.styles,'sort':this.sort}
						this.ajaxFun(obj);
					}
				});
			},
			ajaxFun: function(obj) {
				shop(obj).then(data => {
          this.isVip = data.is_vip;
          this.cidStr = data.category_name;
					this.cidObj1.cidArr = [];
					for (var i = 0; i < data.categoryList.length; i++) {
						this.cidObj1.cidArr.push(data.categoryList[i]);
					}
					this.stylesObj = data.styleList;
					if (!data.empty) {
					    this.isList = true;
						for (var i = 0; i < data.productList.length; i++) {
							this.items.push(data.productList[i]);
						}
						if (data.productList.length < this.pageSize) {
							this.isLoading = false;
							this.isData = false;
						}else {
							this.isData = true;
						}
					}else {
					    this.isList = false;
						this.isLoading = false;
						this.isData = false;
					}
					this.$store.state.publicJS.pageLoadShow = false;
				});
			},
			typeFun: function(n,layerNum) {
				this.type = n;
				if (n == 1) {
					if (layerNum == 2) {
						this.cidObj2.name = 'fadeInRight';
						this.cidObj2.isShow = true;
						return;
					}else if (layerNum == 3) {
						this.cidObj3.name = 'fadeInRight';
						this.cidObj3.isShow = true;
						return;
					}
					this.isNoScroll = 'noScroll';
					this.cidObj1.name = 'fadeInRight';
					this.cidObj1.isShow = true;
				}else {
					if (n == 2) {
						this.stylesObj[0] = '全部';
						this.$store.state.publicJS.styleObject = this.stylesObj;
						this.$store.state.publicJS.styleIndex = this.styles;
						this.$store.commit('isStyleShow');
						return;
					}
          this.$store.state.publicJS.styleObject = this.sortObj;
					this.$store.state.publicJS.styleIndex = this.sort;
					this.$store.commit('isStyleShow');
				}
			},
			cidFun1: function(str,pid,title) {//一层分类
				if (str != '') {
					this.cidObj2.title = title;
					this.cidObj2.cid = pid;
					let obj = {'pid':pid};
					getCategory(obj).then(data => {
						this.cidObj2.cidArr = [];
						this.cidObj2.isShow = true;
						for (var i = 0; i < data.categoryList.length; i++) {
							this.cidObj2.cidArr.push(data.categoryList[i]);
						}
						this.cidObj2.name = 'fadeInRight';
						setTimeout(() => {
							this.cidObj1.isShow = false;
						},300);
					});
				}else {
					this.layerNum = 1;	//打开第几层
					this.items = [];
					this.page = 1;
					this.cid = pid;
					this.cidStr = title;
					this.type = '';
					this.backFun1();
					let obj = {'page':this.page,'pageSize':this.pageSize,'cid':this.cid,'style':this.styles,'sort':this.sort}
					this.ajaxFun(obj);
				}
			},
			backFun1: function() {//一层分类返回
				this.isNoScroll = '';
				this.cidObj1.name = 'fadeInLeft';
				this.isNoScroll = '';
				setTimeout(() => {
					this.cidObj1.isShow = false;
				},300);
			},
			allFun1: function() {
        this.layerNum = 1;	//打开第几层
				this.isNoScroll = '';
				this.items = [];
				this.page = 1;
				this.cid = '';
				this.cidStr = '全部';
				this.type = '';
				this.backFun1();
				let obj = {'page':this.page,'pageSize':this.pageSize,'cid':this.cid,'style':this.styles,'sort':this.sort}
				this.ajaxFun(obj);
			},
			cidFun2: function(str,pid,title) {//二层分类
				if (str != '') {
					this.cidObj3.title = title;
					this.cidObj3.cid = pid;
					let obj = {'pid':pid};
					getCategory(obj).then(data => {
						this.cidObj3.cidArr = [];
						for (var i = 0; i < data.categoryList.length; i++) {
							this.cidObj3.cidArr.push(data.categoryList[i]);
						}
						this.cidObj3.isShow = true;
						this.cidObj3.name = 'fadeInRight';
						setTimeout(() => {
							this.cidObj2.isShow = false;
						},300);
					})
				}else {
					this.layerNum = 2;	//打开第几层
					this.isNoScroll = '';
					this.items = [];
					this.page = 1;
					this.cid = pid;
					this.cidStr = title;
					this.type = '';
					let obj = {'page':this.page,'pageSize':this.pageSize,'cid':this.cid,'style':this.styles,'sort':this.sort}
					this.ajaxFun(obj);
					this.cidObj2.name = 'fadeInLeft';
					setTimeout(() => {
						this.cidObj2.isShow = false;
					},300);
				}
			},
			backFun2: function() {//二层分类返回
				this.cidObj2.name = 'fadeInLeft';
				this.cidObj1.isShow = true;
				this.cidObj1.name = 'fadeInRight';
				setTimeout(() => {
					this.cidObj2.isShow = false;
				},300);
			},
			allFun2: function() {
				this.layerNum = 2;	//打开第几层
				this.isNoScroll = '';
				this.items = [];
				this.page = 1;
				this.cid = this.cidObj2.cid;
				this.cidStr = this.cidObj2.title;
				this.type = '';
				this.cidObj2.name = 'fadeInLeft';
				setTimeout(() => {
					this.cidObj2.isShow = false;
				},300);
				let obj = {'page':this.page,'pageSize':this.pageSize,'cid':this.cid,'style':this.styles,'sort':this.sort}
				this.ajaxFun(obj);
			},
			cidFun3: function(pid,title) {//三层分类
				this.layerNum = 3;	//打开第几层
				this.isNoScroll = '';
				this.items = [];
				this.page = 1;
				this.cid = pid;
				this.cidStr = title;
				this.type = '';
				this.isNoScroll = '';
				this.cidObj3.name = 'fadeInLeft';
				setTimeout(() => {
					this.cidObj3.isShow = false;
				},300);
				let obj = {'page':this.page,'pageSize':this.pageSize,'cid':this.cid,'style':this.styles,'sort':this.sort}
				this.ajaxFun(obj);
			},
			backFun3: function() {//三层分类返回
				this.cidObj3.name = 'fadeInLeft';
				this.cidObj2.isShow = true;
				this.cidObj2.name = 'fadeInRight';
				setTimeout(() => {
					this.cidObj3.isShow = false;
				},300);
			},
			allFun3: function() {
        this.layerNum = 3;	//打开第几层
				this.isNoScroll = '';
				this.items = [];
				this.page = 1;
				this.cid = this.cidObj3.cid;
				this.cidStr = this.cidObj3.title;
				this.type = '';
				this.cidObj3.name = 'fadeInLeft';
				setTimeout(() => {
					this.cidObj3.isShow = false;
				},300);
				let obj = {'page':this.page,'pageSize':this.pageSize,'cid':this.cid,'style':this.styles,'sort':this.sort}
				this.ajaxFun(obj);
			},
			styleAjaxFun: function() {
				if (this.type == 2) {
					this.styles = this.styleIndex;
				}else if (this.type == 3) {
					this.sort = this.styleIndex;
				}
				this.items = [];
				this.page = 1;
				let obj = {'page':this.page,'pageSize':this.pageSize,'cid':this.cid,'style':this.styles,'sort':this.sort}
				this.ajaxFun(obj);
			},
      bgScroll(e){
			    if(this.cidObj1.isShow||this.cidObj2.isShow||this.cidObj3.isShow){
			        e.preventDefault();
          }
      }
		},
		computed: {
			...mapGetters([
				'styleIndex',
				'styleObject'
			]),
			styleStr: function() {
				let styles = this.styles;
				if (styles == 0) {
					return '风格'
				}
				return this.stylesObj[styles];
			},
			sortStr: function() {
				let sort = this.sort;
				if (sort == 'null') {
					return '综合排序';
				}
				return this.sortObj[sort];
			}
		},
		beforeRouteEnter(to, from, next) {
			// 在渲染该组件的对应路由被 confirm 前调用
			// 不！能！获取组件实例 `this`
			// 因为当钩子执行前，组件实例还没被创建
			if (from.name == '大美首页') {
				window.localStorage.setItem('scrollTop',0);
			}
			next(vm => {
				let scrollTop = window.localStorage.getItem('scrollTop');
				window.scrollTo(0,scrollTop);
			});
		},
		created() {
			this.isInit = true;
			this.iscroll();
			window.localStorage.setItem('brandIsInit',true);
    },
		activated() {
			if (this.isInit) {
				this.initFun();
				this.$store.commit('isPageLoad');
			}else {
				this.$store.state.publicJS.pageLoadShow = false;
			}
			this.iscroll();
		},
		beforeRouteLeave(to, from, next) {
			if (to.name == '商品详情') {
				this.isInit = false;
				let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				window.localStorage.setItem('scrollTop',scrollTop);
			}else {
				this.isInit = true;
				window.localStorage.setItem('scrollTop',0);
			}
			next();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#shop {
		width: 100%;
		background: #eee;
		.nav {
			position: fixed;
			z-index: 100;
			width: 100%;
      max-width: 640px;
      margin: auto;
			.border(border-top,2,#eee);
			background: #fff;
			ul {
				overflow: hidden;
			}
			li {
				float: left;
				display: flex;
				width: 33.3333%;
				.rem(height,60);
				.rem(line-height,60);
				color: #222;
				text-align: center;
				background: #fff;
				justify-content: center;
				flex-direction: column;
			}
			.txt {
				.rem(font-size,26);
				.rem(line-height,26);
			}
			.small {
				.rem(font-size,26);
				color: #222;
			}
			.action {
				color: #e37820;
			}
			.icon-down {
				position: relative;
				.rem(top,-7);
				display: inline-block;
				.rem(width,10);
				.rem(height,8);
				.rem(margin-left,10);
				background: url(./image/down.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.list {
			.rem(padding-top,62);
			ul {
				width: 100%;
				.rem(padding-left,4);
				.rem(padding-right,4);
				overflow: hidden;
			}
			li {
				float: left;
				width: 49.75%;
				.rem(margin-top,4);
				margin-right: 0.5%;
				background: #fff;
				&:nth-child(2n) {
					margin-right: 0;
				}
				.img {
					position: relative;
					width: 100%;
					.rem(height,287);
					.rem(padding-left,27);
					.rem(padding-top,27);
					.rem(padding-right,27);
					overflow: hidden;
					img {
						width: 100%;
						/*<!--.rem(min-height,260);-->*/
					}
					.img-layer {
						position: absolute;
						.rem(top,27);
						.rem(left,27);
						.rem(width,260);
						.rem(height,260);
					}
				}
				.content {
					.rem(margin-top,40);
					.rem(padding-left,16);
					.rem(padding-right,16);
					> div {
						width: 100%;
					}
				}
				.title {
					position: relative;
					p {
						width: 100%;
						.rem(margin-bottom,6.5);
						font-size: 13px;
						color: #333;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				// .logo {
				// 	position: absolute;
				// 	top: 0;
				// 	left: 0;
				// 	.rem(width,36);
				// 	.rem(height,36);
				// 	overflow: hidden;
				// 	img {
				// 		width: 100%;
				// 		.rem(min-height,36);
				// 	}
				// }
				.city {
					//.rem(line-height,42);
					height: 22px;
					line-height: 22px;
					font-size: 13px;
					//.rem(font-size,20);
					color: #999;
				}
				.money {
					line-height: 25px;
					font-size: 12px;
					color: #e37820;
					.vip-money {
						display: inline-block;
						font-size: 12px;
						> span {
							font-size: 14px;
						}
					}
				}
        .money2 {
          line-height: 25px;
          font-size: 12px;
          color: #000;
          .money-num {
            font-size: 12px;
            text-decoration: line-through;
          }
          .vip-money {
            display: inline-block;
            font-size: 12px;
            color: #e37820;
            > span {
              font-size: 14px;
            }
          }
          .icon-vip {
            position: relative;
            top: 0.15rem;
            display: inline-block;
            width: 0.48rem;
            height: 0.44rem;
            background: url(./image/vip_ico_small.png) no-repeat;
            background-size: 80% 80%;
          }
        }
			}
		}
		.weui-loadmore_line {
			border-top: 1px solid #fff;
		}
		.weui-loadmore_line .weui-loadmore__tips {
			background-color: #eee;
		}
	}
	.shopTypePopup1 {
		z-index: 500;
		.popout {
			z-index: 500;
		}
		.mask {
			z-index: 1000;
		}
	}
	.shopTypePopup2 {
		z-index: 1500;
		.popout {
			z-index: 1500;
		}
		.mask {
			z-index: 2000;
		}
	}
	.shopTypePopup3 {
		z-index: 2500;
		.popout {
			z-index: 2500;
		}
		.mask {
			z-index: 3000;
		}
	}
  .shopTypePopup1,.shopTypePopup2,.shopTypePopup3 {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 640px;
    margin: auto;
    height: 100%;
    z-index: 99999;
    .popout {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(159, 160, 160, .8);
    }
    .mask {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 70%;
      height: 80%;
      overflow: scroll;
      .mask-box {
        width: 100%;
        height: 100%;
        background: #efefef;
        .title {
          position: relative;
          width: 100%;
          .rem(height, 70);
          .rem(line-height, 70);
          .rem(font-size, 28);
          color: #666;
          text-align: center;
          .back {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
            .rem(width,108);
            .rem(height,70);
            .rem(line-height,70);
            color: #e37820;
          }
        }
        .content {
          width: 100%;
          height: 100%;
          color: #666;
          background: #fff;
          ul {
            width: 100%;
            height: 100%;
            li {
              width: 100%;
              .rem(height,60);
              .rem(line-height,60);
              .rem(padding-left,28);
              .rem(padding-right,28);
              .rem(font-size,28);
              .border(border-top,2,#efefef);
            }
            .action {
              color: #e37820;
              .icon-selected {
                float: right;
                .rem(width,44);
                .rem(height,60);
                .rem(line-height,60);
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
            .right {
              position: relative;
              float: right;
              .rem(width,150);
              height: 100%;
              .rem(padding-right,34);
              .rem(font-size,20);
              color: #999;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .icon-right {
              position: absolute;
              .rem(top,19);
              right: 0;
              .rem(width,12);
              .rem(height,22);
              background: url(./image/right.png) no-repeat;
              background-size: 100% 100%;
            }
            .action {
              color: #e37820;
            }
          }
        }
      }
    }
  }
	.animated {
		animation-duration: .4s;
		animation-fill-mode: both;
	}
	.fadeInRight {
		animation-name: fadeInRight;
	}
	.fadeInLeft {
		animation-name: fadeInLeft;
	}
	@keyframes fadeInRight {
		from {
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
		}
		to {
			transform: none;
		}
	}
	@keyframes fadeInLeft {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			//transform: none;
			transform: translate3d(100%, 0, 0);
		}
	}
</style>
