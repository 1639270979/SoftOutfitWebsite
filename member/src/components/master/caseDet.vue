<template>
	<div id="caseDet">
		<div class="banner">
			<div class="swiper">
				<div class="swiper-container swiper-container1">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="pic in info.pictures">
							<img src="" :src="pic">
						</div>
					</div>
					<!-- 如果需要导航按钮 -->
					<div class="swiper-button-prev swiper-button-white"></div>
					<div class="swiper-button-next swiper-button-white"></div>
				</div>
			</div>
			<div class="content">
				<p class="title">{{ info.title }}</p>
				<span class="fl">{{ info.master_name }}</span>
				<span class="fr">{{ info.addtime }}</span>
				<div
					class="like"
					:class="info.is_collect == 'Y'?'action':''"
					@click="likeFun(info.is_collect)"><i></i>{{ info.is_collect == 'Y'?'已收藏':'收藏'}}</div>
			</div>
		</div>
		<div class="box-gray8"></div>
		<div class="container" v-html="info.content"></div>
		<div class="box-gray16" v-if="othercases.length != 0"></div>
		<div class="other" v-if="othercases.length != 0">
			<p class="title">TA的其他作品</p>
			<div class="swiper">
				<div class="swiper-container swiper-container2">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="caseList in othercases" @click="jump(caseList.case_id)">
							<img :src="caseList.pictures">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="box-gray16"></div>
		<div class="message">
			<ul class="list" v-if="msgLists.length != 0">
				<li v-for="msgList in msgLists">
					<div class="user-img">
						<div class="img">
							<img :src="msgList.headimg">
						</div>
					</div>
					<div class="txt">
						<div class="txt-box">
							<p class="name">{{ msgList.name }}</p>
							<p class="time">{{ msgList.addtime }}</p>
							<p class="content">{{ msgList.content }}</p>
						</div>
					</div>
				</li>
			</ul>
			<myLoading :isLoading='isLoading' :isList="isList"></myLoading>
			<div class="bottom-msg">
				<div class="inp">
					<div class="txt"><input type="text" v-model="msg"></div>
					<div class="btn" @click="msgBtnFun">提交</div>
				</div>
			</div>
		</div>
		<confirmPrompt
			@rightBtn="goLoginFun"></confirmPrompt>
	</div>
</template>
<script>
	import { masterCaseDet,masterMsg,masterPostMsg,masterCollect } from '../../common/axios/api.js';
	import { iscrollAjax } from '../../common/public/iscroll.js';
	import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				cid: this.$route.params.cid,
				msgPage: 0,
				pageSize: 15,
				info: {},
				othercases: [],
				msgLists: [],
				msg: '',
				isLoading: true,
				isList:true,
				islogin: false
			}
		},
		components: {
			myLoading
		},
		methods: {
			iscroll: function() {
				iscrollAjax(() => {
					if (this.isLoading) {
						this.isLoading = false;
						this.msgPage += 1;
						this.msgAjaxFun();
					}
				});
			},
			ajaxFun: function() {
				masterCaseDet(this.cid).then(data => {
					this.info = data.mastercaseInfo;
					this.othercases = data.othercases;
					this.islogin = data.islogin;
					this.banner();
					this.imgLoadFun();
				});
			},
			msgAjaxFun: function() {
        let obj = {'cid':this.cid,'page':this.msgPage,'pageSize':this.pageSize}
				masterMsg(obj).then(data => {
					data.list.forEach((key) => {
						this.msgLists.push(key);
					})
          if(this.msgLists.length==0){
					    this.isList = false;
          }else{
              this.isList = true;
          }
					if (data.list.length >= this.pageSize) {
						this.isLoading = true;
					}else {
						this.isLoading = false;
					}
				});
			},
			banner: function() {
				this.$nextTick(function () {
					new Swiper ('.swiper-container1', {
						autoplay: 4000,
						autoplayDisableOnInteraction: false,
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev'
					});
					new Swiper ('.swiper-container2', {
						slidesPerView: 'auto',	//可见容器显示多少个
						spaceBetween: 12,	//模块之间的距离
						slidesOffsetBefore: 14,	//距离左边距的距离
						autoplayDisableOnInteraction: false
					});
				});
			},
			likeFun: function(status) {
				if (!this.islogin) {
					if (this.wxSystem) {
						this.$store.state.publicJS.promptBoxMsg = '请先完善资料';
						this.$store.state.publicJS.confirmPromptBtnRight = '去完善';
					}else {
						this.$store.state.publicJS.promptBoxMsg = '请先登录';
						this.$store.state.publicJS.confirmPromptBtnRight = '去登录';
					}
					this.$store.commit('confirmPrompt');
				}else {
					let type = status == 'Y' ? 'del' : 'add';
					let obj = {'mcid':this.cid,'type':type};
					masterCollect(obj).then(data => {
						if (data.islogin) {
							this.info.is_collect = status == 'Y' ? 'N' : 'Y';
						}
					})
				}
			},
			msgBtnFun: function() {
				if (!this.islogin) {
					if (this.wxSystem) {
						this.$store.state.publicJS.promptBoxMsg = '请先完善资料';
						this.$store.state.publicJS.confirmPromptBtnRight = '去完善';
					}else {
						this.$store.state.publicJS.promptBoxMsg = '请先登录';
						this.$store.state.publicJS.confirmPromptBtnRight = '去登录';
					}
					this.$store.commit('confirmPrompt');
				}else {
					if ((/\S/.test(this.msg))) {
						let obj = {'cid':this.cid,'content':this.msg};
						masterPostMsg(obj).then(data => {
							if (data.code != 1) {
								this.$store.state.publicJS.promptBoxMsg = data.msg;
								this.$store.commit('txtPrompt');
								setTimeout(() => {
									this.$store.commit('txtPrompt');
								},1000);
							}else {
								this.msgLists.unshift(data.data);
								this.msg = '';
							}
						});
					}else {
						this.$store.state.publicJS.promptBoxMsg = '留言内容不能为空';
						this.$store.commit('txtPrompt');
						setTimeout(() => {
							this.$store.commit('txtPrompt');
						},1000);
					}
				}
			},
			goLoginFun: function() {
				this.$store.state.header.backName = this.$route.name;
				if (this.wxSystem) {
					this.$router.push({path:'/login/perfect'});
					return;
				}
				this.$router.push({path:'/login'});
			},
			jump: function(cid) {
				this.cid = cid;
				this.ajaxFun();
				document.body.scrollTop =0;
				this.msgLists = [];
				this.msgPage = 1;
				this.isLoading = true;
			},
			imgLoadFun: function() {	//先放张占位图的图片
				this.$nextTick(function() {
					let img = document.getElementsByClassName('container')[0].querySelectorAll('img');
					for (var i = 0; i < img.length; i++) {
						let oldImg = img[i].src;
						img[i].src = 'http://www.idmei.com/static/www/image/suit_bg.jpg';
						img[i].onload = function() {
							this.src = oldImg;
							this.onload = null;
						};
					}
				});
			}
		},
		created() {
			this.ajaxFun();
			this.iscroll();
		}
	}
</script>
<style lang="less">
	@import '../../assets/mixin_750.less';
	@import './css/swiper-3.4.2.min.css';
	#caseDet {
		.banner {
			width: 100%;
			.swiper {
				overflow: hidden;
				img {
					width: 100%;
				}
				img[lazy=loading] {
					display: block;
					.rem(width,300);
					.rem(height,300);
					margin: auto;
				}
				.swiper-container {
					width: 100%;
					.rem(height,400);
				}
				.swiper-button-next, .swiper-button-prev {
					.rem(width,21);
					.rem(height,35);
					background-size: 100% 100%;
				}
			}
			.content {
				position: relative;
				.rem(padding-top,25);
				.rem(padding-bottom,25);
				.rem(padding-left,26);
				.rem(padding-right,28);
				overflow: hidden;
				.title {
					.rem(margin-bottom,20);
					.rem(padding-right,144);
					.rem(font-size,32);
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.fl {
					.rem(font-size,28);
				}
				.fr {
					.rem(font-size,24);
					color: #999;
				}
				.like {
					position: absolute;
					.rem(top,20);
					.rem(right,28);
					.rem(width,144);
					.rem(height,54);
					.rem(line-height,54);
					.rem(font-size,28);
					color: #999;
					text-align: center;
					.border(border,2,#999);
					.border-radius(10);
					i {
						position: relative;
						.rem(top,2);
						display: inline-block;
						.rem(width,30);
						.rem(height,28);
						.rem(margin-right,5);
						background: url(./image/bottom_ico_4_collection.png) no-repeat;
						background-size: 100% 100%;
					}
				}
				.action {
					color: #ed7631;
					border-color: #ed7631;
					i {
						background-image: url(./image/bottom_ico_4_collection_state.png);
					}
				}
			}
		}
		.box-gray8 {
			width: 100%;
			.rem(height,8);
			background-color: #eee;
		}
		.container {
			width: 100%;
			.rem(padding-top,16);
			.rem(padding-bottom,23);
			.rem(padding-left,28);
			.rem(padding-right,30);
			.rem(line-height,42);
			font-size: 14px;
			p {
				overflow: hidden;
			}
			img {
				float: left;
				max-width: 100%;
			}
		}
		.box-gray16 {
			width: 100%;
			.rem(height,16);
			background-color: #eee;
		}
		.other {
			.rem(padding-top,30);
			.rem(padding-bottom,30);
			.title {
				.rem(margin-bottom,30);
				padding-left: 14px;
				.rem(font-size,28);
			}
			.swiper {
				.swiper-slide {
					.rem(width,320);
					.rem(height,205);
					overflow: hidden;
					img {
						width: 100%;
						.rem(min-height,205);
					}
				}
			}
		}
		.message {
			.list {
				.rem(padding-left,28);
			}
			li {
				.rem(padding-top,30);
				overflow: hidden;
				.user-img {
					float: left;
					.rem(width,87);
				}
				.img {
					.rem(width,64);
					.rem(height,64);
					border-radius: 50%;
					overflow: hidden;
					img {
						width: 100%;
						.rem(min-height,64);
					}
				}
				.txt {
					width: 100%;
					.rem(padding-left,87);
				}
				.txt-box {
					.rem(padding-bottom,20);
					.border(border-bottom,1,#eee);
				}
				.name {
					.rem(font-size,28);
				}
				.time {
					.rem(font-size,22);
					color: #999;
				}
				.content {
					.rem(margin-top,10);
					.rem(line-height,60);
					.rem(font-size,28);
				}
			}
			.bottom-msg {
				width: 100%;
				.rem(height,87);
				.rem(padding-top,17);
				.rem(padding-left,28);
				.rem(padding-right,28);
        margin-top: 1rem;
				box-shadow: 6px 0px 9px #efefef;
				background: #fff;
			}
			.inp {
				width: 100%;
				overflow: hidden;
				> div {
					float: left;
					.rem(height,54);
					.rem(line-height,54);
					.rem(font-size,28);
					.border-radius(10);
				}
				.txt {
					width: 76%;
					background: #eee;
					overflow: hidden;
					input {
						width: 100%;
						height: 100%;
						padding: 0;
						.rem(padding-left,20);
						border: 0;
						background: #eee;
						outline: none;
					}
				}
				.btn {
					width: 20%;
					.rem(line-height,50);
					margin-left: 4%;
					color: #ed7631;
					text-align: center;
					.border(border,2,#ed7631);
				}
			}
		}
	}
</style>
