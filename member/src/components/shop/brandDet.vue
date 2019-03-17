<template>
	<div id="brandDet">
		<div class="title">品牌详情</div>
		<div class="top">
			<div class="img"><img :src="item.logo"></div>
			<div class="info">
				<div class="brand-name"><p>{{ item.brand_name }}</p></div>
				<div class="follow">{{ item.collect_num }}人关注</div>
			</div>
			<div class="like"
				:class="item.is_collect == 'Y'? 'action':''"
				@click="collectFun">
			</div>
		</div>
		<div class="nav">
			<div>
				<p>{{ item.all_num }}</p>
				<p>全部商品</p>
				<i></i>
			</div>
			<div>
				<p>{{ item.new_num }}</p>
				<p>上新</p>
				<i></i>
			</div>
			<div>
				<p>{{ item.seckill_num }}</p>
				<p>促销</p>
			</div>
		</div>
		<div class="stars">
			<span>店铺星级：</span>
			<div v-html="stars"></div>
		</div>
		<div class="shopInfo">
			<div class="info1">
				<div class="txt">主营业务：</div>
				<div class="info">{{ item.business }}</div>
			</div>
			<div class="info1">
				<div class="txt">联系人：</div>
				<div class="info">{{ item.linkman }}</div>
			</div>
			<div class="info1">
				<div class="txt">所在地：</div>
				<div class="info">{{ item.location }}</div>
			</div>
			<div class="info2">
				<div class="txt">品牌介绍：</div>
				<div class="info">{{ item.introduce }}</div>
			</div>
		</div>
		<confirmPrompt
			@rightBtn='goLoginFun'></confirmPrompt>
	</div>
</template>
<script>
	import { brand,collectBrand,shopDetCollect } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				bid: this.$route.params.bid,
				item: {},
				infos: [],
				wxSystem: this.$store.state.publicJS.wxSystem
			}
		},
		methods: {
			ajaxFun: function(obj) {
				brand(obj).then(data => {
					this.item = data.brandInfo;
					for (var i = 0; i < data.info.length; i++) {
						this.infos.push(data.info[i])
					}
				});
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
		computed: {
			stars: function() {
				let len = this.item.praise;
				let html = '';
				for (var i = 0; i < 5; i++) {
					if (i < len) {
						html += '<i class="action"></i>';
					}else {
						html += '<i></i>';
					}
				}
				return html;
			}
		},
		created() {
			let obj = {'page':this.page,'pageSize':this.pageSize,'bid':this.bid,'sort':1};
			this.ajaxFun(obj);
		}
	}
</script>
<style lang="less">
	@import '../../assets/mixin.less';
	#brandDet {
		width: 100%;
		.rem(min-height,1136);
		background: #eee;
		.title {
			width: 100%;
			.rem(height,68);
			.rem(line-height,68);
			.rem(font-size,28);
			color: #333;
			text-align: center;
			background: #fff;
		}
		.top {
			width: 100%;
			.rem(height,120);
			.rem(margin-top,2);
			.rem(padding-top,33);
			.rem(padding-left,28);
			.rem(padding-right,28);
			letter-spacing: 1px;
			background: #fff;
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
				.rem(border-radius,10);
				overflow: hidden;
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
					.rem(line-height,27);
					.rem(font-size,24);
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.follow {
				.rem(padding-right,35);
				.rem(line-height,27);
				.rem(font-size,24);
				color: #333;
			}
			.like {
				position: relative;
				.rem(top,9);
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
			.rem(margin-bottom,1);
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
		}
		.stars {
			width: 100%;
			.rem(height,70);
			.rem(line-height,70);
			.rem(padding-left,30);
			background: #fff;
			span {
				display: inline-block;
				.rem(font-size,26);
				color: #333;
				vertical-align: middle;
			}
			div {
				display: inline-block;
				i {
					display: inline-block;
					.rem(width,29);
					.rem(height,28);
					.rem(margin-right,3);
					background: url(./image/stars_3.png) no-repeat;
					background-size: 100% 100%;
					vertical-align: middle;
				}
				.action {
					background-image: url(./image/stars_2.png);
				}
			}
		}
		.shopInfo {
			.rem(margin-top,20);
			background: #fff;
			> div {
				.rem(padding-left,28);
				.rem(padding-right,28);
				.rem(font-size,24);
				color: #333;
				.border(border-bottom,2,#eee);
				overflow: hidden;
				&:last-of-type {
					border-bottom: 0;
				}
				> div {
					float: left;
				}
			}
			.info1 {
				width: 100%;
				.rem(height,64);
				.rem(line-height,64);
			}
			.info2 {
				width: 100%;
				.rem(padding-top,20);
				.rem(padding-bottom,30);
				.info,.txt {
					.rem(line-height,44);
				}
			}
			.txt {
				width: 22%;
			}
			.info {
				width: 78%;
			}
		}
	}
</style>
