<template>
	<div id="suit">
		<div class="list">
			<ul>
				<li v-for="item in items">
					<router-link :to="'/index/suit/suitDet/'+item.suit_id">
						<img v-lazy="item.cover">
					</router-link>
					<div class="suit-info">
						<div class="top">
							<p class="title">{{ item.suit_name }}</p>
							<div class="right">
								<div class="like" :class="item.is_collect == 'Y'?'action':''" @click="likeFun(item)">
									<i class="icon icon-like"></i><span class="txt">{{ item.collection }}</span>
								</div>
								<div class="eye">
									<i class="icon icon-eye"></i><span class="txt">{{ item.hits }}</span>
								</div>
							</div>
						</div>
						<div class="bottom">{{ item.description }}</div>
					</div>
				</li>
			</ul>
		</div>
		<my-loading :isLoading='isLoading' :isList="isList"></my-loading>
		<confirmPrompt @rightBtn="goLoginFun"></confirmPrompt>
	</div>
</template>
<script>
	import { suitList,suitCollect } from '../../common/axios/api.js';
	import { iscrollAjax } from '../../common/public/iscroll.js';
	import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				items: [],
				page: 1,
				pageSize: 25,
				isLoading: true,
				isList:true,
				isData: true,
				wxSystem: this.$store.state.publicJS.wxSystem,
        isKeep:'1'
			}
		},
		components: {
			myLoading
		},
		methods: {
			iscroll: function() {
				iscrollAjax(() => {
					if (this.isData) {
						this.isData = false;
						this.page += 1;
						let obj = {'page':this.page,'pageSize':this.pageSize,}
						this.ajaxFun(obj);
					}
				});
			},
			ajaxFun: function(obj) {
				suitList(obj).then(data => {
					if (data.code == 1) {
						for (var i = 0; i < data.suitList.length; i++) {
							this.items.push(data.suitList[i]);
						}
						if(this.items.length==0){
						    this.isList=false;
            }else{
						    this.isList=true;
            }
						if (data.suitList.length < this.pageSize) {
							this.isData = false;
							this.isLoading = false;
						}else {
							this.isData = true;
							this.isLoading = true;
						}
					}
				})
			},
			likeFun: function(item) {
				let status = item.is_collect == 'Y'?'del':'add';
				let obj = {'sid':item.suit_id,'type':status}
				suitCollect(obj).then(data => {
					if (data.islogin == false) {
						if (this.wxSystem) {
							this.confirmPrompt('请先完善资料','去完善');
							return;
						}
						this.confirmPrompt('请先登陆','去登陆');
					}else {
						item.is_collect = item.is_collect == 'Y'?'N':'Y';
						if (item.is_collect == 'N') {
							item.collection --
						}else {
							item.collection ++
						}
					}
				});
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
		created() {
			let obj = {'page': this.page,'pageSize': this.pageSize}
			this.ajaxFun(obj);
			this.iscroll();
		},
    beforeRouteLeave(to, from, next) {
      if(to.name=='套装详情' ){
//        to.meta.keepAlive=false;
      }
      next();
    },
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#suit {
		.rem(padding-left,25);
		.rem(padding-right,25);
	}
	.list {
		width: 100%;
		.rem(padding-left,4);
		.rem(padding-right,4);
		overflow: hidden;
		li {
			position: relative;
			float: left;
			width: 100%;
			.rem(margin-bottom,27);
			box-shadow: 0px 0px 27px rgba(0,0,0,.1);
			overflow: hidden;
			a {
				display: block;
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
			img {
				float: left;
				width: 100%;
			}
      img[lazy=loading] {
        width: 200px;
        height: 200px;
        display: block;
        margin: 0 2.3rem;
        margin-bottom: 0.3rem;
      }
		}
		.suit-info {
			width: 100%;
			.rem(padding-top,30);
			.rem(padding-left,30);
			.rem(padding-right,30);
			.rem(padding-bottom,20);
			background: #fff;
			.top {
				position: relative;
				width: 100%;
				.border(border-bottom,1,#eee);
				.title {
					width: 100%;
					.rem(margin-bottom,25);
					.rem(font-size,30);
				}
				.right {
					position: absolute;
					bottom: 0;
					right: 0;
					> div {
						float: right;
						.rem(margin-left,25);
						.rem(line-height,46);
						vertical-align: middle;
					}
					.icon {
						position: relative;
						.rem(top,1);
						display: inline-block;
						.rem(width,25);
						.rem(height,22);
						.rem(margin-right,7);
						background-repeat: no-repeat;
						background-size: 100% 100%;
					}
					.icon-eye {
						background-image: url(./image/eye.png);
					}
					.icon-like {
						background-image: url(./image/bottom_ico_4_collection.png);
					}
					.txt {
						display: inline-block;
						.rem(font-size,22);
						color: #333;
					}
					.action {
						.icon-like {
							background-image: url(./image/bottom_ico_4_collection_state.png);
						}
					}
				}
			}
			.bottom {
				width: 100%;
				.rem(padding-top,20);
				.rem(line-height,30);
				.rem(font-size,20);
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}
</style>
