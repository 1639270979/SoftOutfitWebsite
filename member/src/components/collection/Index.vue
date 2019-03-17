<template>
	<div id="collection" :class="isMinHeight?'minHeight':''">
		<div class="nav">
			<ul>
				<li @click="typeFun('designer')"><span :class="type=='designer'?'action':''">设计师</span></li>
				<li @click="typeFun('brand')"><span :class="type=='brand'?'action':''">品牌</span></li>
				<li @click="typeFun('product')"><span :class="type=='product'?'action':''">商品</span></li>
				<li @click="typeFun('case')"><span :class="type=='case'?'action':''">案例组合</span></li>
				<li @click="typeFun('find')"><span :class="type=='find'?'action':''">发现</span></li>
			</ul>
		</div>
		<div class="emptyBox"></div>
		<div class="list4" v-if="this.type == 'designer'">
			<ul>
				<li v-for="item in items">
					<router-link :to="'/index/designer/designerDet/'+item.designer_id" v-if="item.type=='designer'">
						<div class="img"><img :src="item.headimg" ></div>
						<div class="info">
              <p class="name">{{ item.name }}</p>
              <p class="adrs">{{ item.area_name }}</p>
              <div class="right">{{item.type=='designer'?'接单量：'+item.orders:'华英' }}</div>
              <div class="lei">
                <span v-for="val in item.label">{{val}}</span>
              </div>
						</div>
					</router-link>
          <router-link :to="'/index/myMaster/designerDet/'+item.designer_id" v-else>
            <div class="img"><img :src="item.headimg" ></div>
            <div class="info">
              <p class="name">{{ item.name }}</p>
              <p class="adrs">{{ item.area_name }}</p>
              <div class="right">{{item.type=='designer'?'接单量：'+item.orders:'华英' }}</div>
              <div class="lei">
                <span v-for="val in item.label">{{val}}</span>
              </div>
            </div>
          </router-link>
					<div class="like" @click="cancelFun(item.designer_id,item.type)">
						<!--<span class="icon-like"></span>-->
						<span class="txt">取消收藏</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="list2" v-if="this.type == 'brand'">
			<ul>
				<li v-for="item in items">
					<router-link :to="'/index/shop/det/brand/'+item.brand_id">
						<div class="barnd-img"><img :src="item.logo" ></div>
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
					<div class="like" @click="cancelFun(item.brand_id,'brand')">
						<!--<span class="icon-like"></span>-->
						<span class="txt">取消收藏</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="list3" v-if="this.type == 'product'">
			<ul>
				<li v-for="item in items">
					<router-link :to="'/index/shop/shopDet/'+item.product_id">
						<div class="img"><img :src="item.picture" ></div>

            <!--vip-->
						<div class="info" v-if="isVip">
							<div class="logo"><img :src="item.logo" ></div>
							<p class="title">{{ item.product_name }}</p>
              <!--<p class="money" v-if="item.seckill_id > 0">秒杀价<i class="iconfont icon-jine">{{ item.seckill_price }}</i></p>-->
              <!--<p :class="item.seckill_id > 0?'bfprice1':'bfprice'"><i class="iconfont icon-jine">{{ item.vip_price }}</i></p>-->
						</div>

            <!--no vip-->
            <div class="info" v-else>
              <div class="logo"><img :src="item.logo" ></div>
              <p class="title">{{ item.product_name }}</p>
              <!--<p class="money" v-if="item.seckill_id > 0">秒杀价<i class="iconfont icon-jine">{{ item.seckill_price }}</i></p>-->
              <!--<p :class="item.seckill_id > 0?'bfprice1':'bfprice'"><i class="iconfont icon-jine">{{ item.price }}</i></p>-->
            </div>

					</router-link>
					<div class="sold-out" v-if="item.is_show == 'N'">
						<div class="img"><img src="./image/Sold-Out.png"></div>
					</div>
					<div class="like" @click="cancelFun(item.product_id,'product')">
						<!--<span class="icon-like"></span>-->
						<span class="txt">取消收藏</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="list1" v-if="this.type == 'case'">
			<ul>
				<li v-for="item in items">
					<router-link
						v-if="item.type == 'case'"
						:to="'/index/designer/programmeDet/'+item.case_id">
						<div class="img"><img :src="item.pic" ></div>
					</router-link>
					<router-link
						v-else-if="item.type == 'mastercase'"
						:to="'/index/master/caseDet/'+item.case_id">
						<div class="img"><img :src="item.pic" ></div>
					</router-link>
					<router-link
						v-else
						:to="'/index/suit/suitDet/'+item.suit_id">
						<div class="img"><img :src="item.pic" ></div>
					</router-link>
					<div class="title">
						<p>{{ item.title}}</p>
						<div class="like" @click="cancelFun(item.case_id,'case')" v-if="item.type=='case'">
							<span class="icon-like"></span>
							<span class="txt">取消收藏</span>
						</div>
						<div class="like" @click="cancelFun(item.case_id,'mastercase')" v-else-if="item.type=='mastercase'">
							<span class="icon-like"></span>
							<span class="txt">取消收藏</span>
						</div>
						<div class="like" @click="cancelFun(item.suit_id,'suit')" v-else>
							<!--<span class="icon-like"></span>-->
							<span class="txt">取消收藏</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="list1" v-if="this.type == 'find'">
			<ul>
				<li v-for="item in items" >
					<router-link :to="'/find/findDetail/'+item.article_id+'/2'">
						<div class="img"><img :src="item.list_pic"></div>
					</router-link>
					<div class="title">
						<p>{{ item.title }}</p>
						<div class="like" @click="cancelFun(item.article_id,'find')">
							<!--<span class="icon-like"></span>-->
							<span class="txt">取消收藏</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
    <myLoading :isList="isList" :isLoading="isLoading"></myLoading>
	</div>
</template>
<script>
	import { collection,cancelCollect } from '../../common/axios/api.js';
  import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				items    : [],
				type     : 'designer',
				isMinHeight: false,
        isVip:false,
        isList:true,
        isLoading:false,
			}
		},
		methods: {
			initFun: function() {
				let obj = {'type':this.type}
				this.ajaxFun(obj);
			},
			ajaxFun: function(obj) {
				collection(obj).then(data => {
				    this.isVip=data.is_vip;
					if (data.code == 1) {
						this.items = data.list;
						if(this.items.length==0){
						    this.isList=false;
            }else{
              this.isList=true;
            }
          }
				})
			},
			typeFun: function(str) {
				this.type = str;
				let obj = {'type':str}
				this.ajaxFun(obj);
			},
			cancelFun: function(id,str) {
        let obj = {'type':str,'id':id};
				cancelCollect(obj).then(data => {
					if (data.code == 1) {
						this.delFun(id,str);
						this.txtPrompt(data.msg);
					}else {
						this.txtPrompt(data.msg);
					}
				})
			},
			txtPrompt: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1000);
			},
			delFun: function(id,type) {
				if (type == 'designer') {
					let arr = [];
					for (var i = 0; i < this.items.length; i++) {
						if (this.items[i].designer_id != id) {
							arr.push(this.items[i])
						}
					}
					this.items = arr;
				}else if (type == 'brand') {
					let arr = [];
					for (var i = 0; i < this.items.length; i++) {
						if (this.items[i].brand_id != id) {
							arr.push(this.items[i])
						}
					}
					this.items = arr;
				}else if (type == 'product') {
					let arr = [];
					for (var i = 0; i < this.items.length; i++) {
						if (this.items[i].product_id != id) {
							arr.push(this.items[i])
						}
					}
					this.items = arr;
				}else if (type == 'find') {
					let arr = [];
					for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].article_id != id) {
							arr.push(this.items[i])
						}
					}
					this.items = arr;
        }else {
					let arr = [];
					if (type == 'case' || type == 'mastercase') {
						for (var i = 0; i < this.items.length; i++) {
							if (this.items[i].case_id != id) {
								arr.push(this.items[i])
							}
						}
					}else {
						for (var i = 0; i < this.items.length; i++) {
							if (this.items[i].suit_id != id) {
								arr.push(this.items[i])
							}
						}
					}
					this.items = arr;
				}
			}
		},
		beforeRouteEnter(to, from, next) {
			// 在渲染该组件的对应路由被 confirm 前调用
			// 不！能！获取组件实例 `this`
			// 因为当钩子执行前，组件实例还没被创建
			if (from.name != '收藏') {
				window.localStorage.setItem('scrollTop',0);
			}
			next(vm => {
				let scrollTop = window.localStorage.getItem('scrollTop');
				window.scrollTo(0,scrollTop);
				if (from.name != '收藏') {
					vm.initFun();
				}
			});
		},
		created() {
			let isAndroid = window.navigator.appVersion.match(/android/gi);
			let isIPhone = window.navigator.appVersion.match(/iphone/gi);
			if (isAndroid) {
				this.isMinHeight = false;
			}else if (isIPhone) {
				this.isMinHeight = true;
			}
		},
		activated() {
		},
		beforeRouteLeave(to, from, next) {
			if (to.name == '商品详情' || to.name == '设计师详情' || to.name == '品牌页' || to.name == '发现详情' || to.name == '设计师案例详情' || to.name == '套装详情') {
				let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				window.localStorage.setItem('scrollTop',scrollTop);
			}
			next();
		},
    components: {
      myLoading
    },
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	.minHeight {
		.rem(min-height,1136);
	}
	.nav {
		position: fixed;
		z-index: 100;
		width: 100%;
    max-width: 640px;
    margin: auto;
		.rem(height,70);
		.rem(line-height,60);
		.border(border-top,2,#eee);
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
	.emptyBox {
		width: 100%;
		.rem(height,70);
	}
	.list1 {
		li {
			position: relative;
			width: 100%;
			.rem(height,340);
			.rem(margin-top,2);
			background: #fff;
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
				.like {
					position: absolute;
					top: 0;
          right: -0.3rem;
					.rem(width,140);
					height: 100%;
					> span {
            color: #929292;
            display: inline-block;
						.rem(font-size,22);
						vertical-align: middle;
					}
					.icon-like {
						.rem(width,20);
						.rem(height,18);
						.rem(margin-right,6);
						background: url(./image/bottom_ico_4_collection_state.png) no-repeat;
						background-size: 100% 100%;
					}
				}
			}
		}
	}
	.list2 {
		li {
			position: relative;
			.rem(margin-top,2);
			.rem(padding-top,35);
			.rem(padding-bottom,35);
			.rem(padding-left,28);
			.rem(padding-right,28);
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
		.barnd-img {
			display: flex;
			.rem(width,158);
			.rem(height,158);
			.rem(border-radius,10);
			align-items: center;
			justify-content: center;
			overflow: hidden;
			img {
				.rem(max-width,158);
				.rem(max-height,158);
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
        padding-top: .1rem;
				width: 100%;
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
				.rem(line-height,24);
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
		.like {
			position: absolute;
			top: 0;
      right: -0.3rem;
			.rem(width,140);
			.rem(height,100);
			.rem(line-height,100);
			color: #929292;
			> span {
				display: inline-block;
				.rem(font-size,22);
				vertical-align: middle;
			}
			.icon-like {
				.rem(width,20);
				.rem(height,18);
				.rem(margin-right,6);
				background: url(./image/bottom_ico_4_collection_state.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.list3 {
		li {
			position: relative;
			.rem(margin-top,2);
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
				display: flex;
				.rem(width,40);
				.rem(height,40);
				align-items: center;
				justify-content: center;
				overflow: hidden;
				img {
					.rem(max-width,40);
					.rem(max-height,40);
				}
			}
			.title {
				.rem(margin-top,15);
				.rem(line-height,30);
				.rem(font-size,28);
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.money {
        display: inline-block;
				.rem(margin-top,15);
				.rem(font-size,23);
				color: #d65317;
			}
      .bfprice{
        width: 100%;
        .rem(font-size,23);
        color: #d65317;
        margin-top: 0.2rem;
        /*text-decoration: line-through;*/
      }
      .bfprice1{
        display: inline-block;
        color: #000;
        text-decoration: line-through;
        i{
          font-size: 0.32rem;
        }
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
		.like {
			position: absolute;
			top: 0;
      right: -0.3rem;
			z-index: 50;
			.rem(width,140);
			.rem(height,100);
			.rem(line-height,100);
			> span {
        color: #929292;
        display: inline-block;
				.rem(font-size,22);
				vertical-align: middle;
			}
			.icon-like {
				.rem(width,20);
				.rem(height,18);
				.rem(margin-right,6);
				background: url(./image/bottom_ico_4_collection_state.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
  .list4{
    li{
      position: relative;
      width: 100%;
      padding: 0.5rem 0.45rem;
      background: #fff;
      border-bottom: 1px solid #D5D5D5;
      .img{
        position: absolute;
        top: 0.5rem;
        left: 0.45rem;
        width: 2.41rem;
        height: 2.41rem;
        border-radius: 50%;
        overflow: hidden;
        >img{
          width: 100%;
          height: 100%;
        }
      }
      .info{
        padding-left: 3.12rem;
        .name{
          font-size:0.4rem;
          font-weight:bold;
          color:rgba(40,40,40,1);
        }
        >p{
          margin-bottom: 0.2rem;
        }
        .adrs,.right{
          font-size:0.32rem;
          font-weight:400;
          color:rgba(146,146,146,1);
        }
        .lei{
          margin-top: 0.22rem;
          >span{
            display: inline-block;
            border: 1px solid #D5D5D5;
            padding: 0.05rem 0.2rem;
            margin-right: 0.1rem;
            margin-bottom: 0.1rem;
            border-radius: 0.1rem;
            font-size:0.27rem;
            color:rgba(146,146,146,1);
          }
        }
      }
      .like {
        position: absolute;
        top: 0.5rem;
        right: -0.3rem;
        .rem(width,140);
        height: 100%;
        > span {
          color: #929292;
          display: inline-block;
          .rem(font-size,22);
          vertical-align: middle;
        }
        .icon-like {
          .rem(width,20);
          .rem(height,18);
          .rem(margin-right,6);
          background: url(./image/bottom_ico_4_collection_state.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
