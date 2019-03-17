<template>
	<div id="designerDet">
		<div class="top">
			<div class="introduce-box">
				<router-link
					:to="'/index/master/introduce/'+info.master_id"
					class="designer-introduce"
					tag="div"
					:style="'backgroundImage:url('+info.homepage_bg+')'"
					v-if="Object.keys(info).length != 0">
					<div class="introduce-txt">
						<p class="name">{{ info.name }}</p>
						<p class="company">{{ info.company }}<i></i></p>
						<div class="line"></div>
						<p class="p1" v-for="(key,index) in prize">{{ index +'　'+ key }}</p>
						<p class="p1" v-if="Object.keys(info.prize).length >= 3">......</p>
					</div>
				</router-link>
				<router-link
					class="entrust-btn"
					v-if="Object.keys(info).length != 0"
					:to="'/index/master/please/'+info.master_id"
					tag="div">找经纪人委托设计</router-link>
			</div>
			<div class="box-gray7"></div>
			<div class="nav">
				<div @click="navAction = 1;">
					<div class="txt" :class="navAction == 1?'action':''">
						<span>案例</span>
						<i></i>
					</div>
				</div>
				<div @click="navAction = 2;">
					<div class="txt" :class="navAction == 2?'action':''">
						<span>留言</span>
						<i></i>
					</div>
				</div>
			</div>
		</div>
		<div class="top-box"></div>
		<div class="box-gray4"></div>
		<div class="case" v-show="navAction == 1">
			<div class="list" v-for="list in caseList">
				<div class="banner">
					<div class="swiper-container">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="banner in list.pictures">
								<router-link :to="'/index/master/caseDet/'+list.case_id">
									<img :src="banner">
								</router-link>
							</div>
						</div>
						<!-- 如果需要导航按钮 -->
						<div class="swiper-button-prev swiper-button-white"></div>
						<div class="swiper-button-next swiper-button-white"></div>
					</div>
				</div>
				<div class="container-txt">
					<p class="title">{{ list.title }}</p>
					<div
						class="like"
						:class="list.is_collect == 'Y' ? 'action':''"
						@click="collectionFun(list)"><i></i></div>
					<span class="time">发表于　{{ list.addtime }}</span>
				</div>
				<div class="box-gray27"></div>
			</div>
		</div>
		<div class="message" v-show="navAction == 2">
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
			<div class="bottom-msg">
				<div class="inp">
					<div class="txt"><input type="text" v-model="msg"></div>
					<div class="btn" @click="msgBtnFun">提交</div>
				</div>
			</div>
		</div>
		<myLoading :isLoading='isLoading' :isList="isList" v-show="navAction == 1"></myLoading>
    <myLoading :isLoading='isLoading' :isList="isList1" v-show="navAction == 2"></myLoading>
    <div class="bottom-msg-box" v-show="navAction == 2"></div>
		<confirmPrompt
			@rightBtn="goLoginFun"></confirmPrompt>
	</div>
</template>
<script>
	import { masterDet,masterCollect,masterMsg,masterPostMsg } from '../../common/axios/api.js';
	import { iscrollAjax } from '../../common/public/iscroll.js';
	import { WeChatConfig } from '../../common/public/WeChatConfig.js';
	import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				mid: this.$route.query.mid,
				casePage: 1,
				msgPage: 1,
				pageSize: 15,
				info: {},
				caseList: [],
				msgLists: [],
				islogin: false,
				navAction: 1,
				msg: '',
				isLoading: true,
				isList:true,
				isList1:true,
				isData: true,
				wxSystem: this.$store.state.publicJS.wxSystem
			}
		},
		components: {
			myLoading
		},
		methods: {
			iscroll: function() {
				iscrollAjax(() => {
					if (this.isData && this.navAction == 1) {
						this.isData = false;
						this.casePage += 1;
						this.ajaxFun();
					}else if (this.isData && this.navAction == 2) {
						this.isData = false;
						this.msgPage += 1;
						this.msgAjaxFun();
					}
				});
			},
			ajaxFun: function() {
				let obj = {'mid':this.mid,'page':this.casePage,'pageSize':this.pageSize}
				masterDet(obj).then(data => {
					this.info = data.masterInfo;
					data.masterCase.forEach((key) => {
						this.caseList.push(key);
					})
          if(this.caseList.length==0){
					    this.isList = false;
          }else{
              this.isList = true;
          }
					this.islogin = data.islogin;
					if (data.masterCase.length >= this.pageSize) {
						this.isData = true;
						this.isLoading = true;
					}else {
						this.isData = false;
						this.isLoading = false;
					}
					this.bannerFun();
				});
			},
			msgAjaxFun: function() {
        let obj = {'mid':this.mid,'page':this.msgPage,'pageSize':this.pageSize}
				masterMsg(obj).then(data => {
					data.list.forEach((key) => {
						this.msgLists.push(key);
					})

					if (this.msgLists.length==0){
					    this.isList1 = false;
          }else{
					    this.isList1 = true;
          }
					if (data.list.length >= this.pageSize) {
						this.isData = true;
						this.isLoading = true;
					}else {
						this.isData = false;
						this.isLoading = false;
					}
				});
			},
			bannerFun: function() {
				this.$nextTick(function () {
					let swiperBanner = new Swiper ('.swiper-container', {
						//loop: true,
						//autoplay: 4000,
						autoplayDisableOnInteraction: false,
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev'
					});
					/*if (swiperBanner.length > 0) {
						for (var i = 0; i < swiperBanner.length; i++) {
							if(swiperBanner[i].slides.length <= 3){	//如果只有一张图片就锁住
								swiperBanner[i].lockSwipes();
							}else {
								swiperBanner[i].unlockSwipes();
							}
						}
					}else {	//如果只有一张图片就锁住
						if (swiperBanner.slides.length <= 3) {
							console.log(1);
							swiperBanner.lockSwipes();
						}
					}*/
				});
			},
			collectionFun: function(list) {
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
					let type = list.is_collect == 'Y' ? 'del' : 'add';
					let obj = {'mcid':list.case_id,'type':type};
					masterCollect(obj).then(data => {
						if (data.islogin) {
							list.is_collect = list.is_collect == 'Y' ? 'N' : 'Y';
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
						let obj = {'mid':this.mid,'content':this.msg};
						masterPostMsg(obj).then(data => {
							if (data.code != 1) {
								this.$store.state.publicJS.promptBoxMsg = data.msg;
								this.$store.commit('txtPrompt');
								setTimeout(() => {
									this.$store.commit('txtPrompt');
								},1000);
							}else {
								this.msgLists.unshift(data.data);
								document.body.scrollTop = 0;
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
			}
		},
		computed: {
			prize: function() {
				let obj = this.info.prize;
				let prize = {};
				let arr = Object.keys(obj).sort((a,b)=>{return b - a});
				for (var i = 0; i < arr.length; i++) {
					if (i < 3) {
						prize[arr[i]] = obj[arr[i]];
					}else {
						break;
					}
				}
				return prize;
			}
		},
		created() {
			this.ajaxFun();
			this.msgAjaxFun();
			this.iscroll();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	@import './css/swiper-3.4.2.min.css';
	.top {
		width: 100%;
		background: #fff;
	}
	.introduce-box {
		position: relative;
	}
	.designer-introduce {
		width: 100%;
		.rem(height,464);
		color: #fff;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-color: #000;
		overflow: hidden;
		.introduce-txt {
			float: right;
			.rem(width,390);
			.rem(margin-top,93);
			.rem(margin-right,30);
		}
		.name {
			.rem(font-size,32);
			.rem(line-height,42);
		}
		.company {
			position: relative;
			width: 100%;
			.rem(padding-right,30);
			.rem(font-size,24);
			.rem(line-height,34);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			i {
				position: absolute;
				.rem(top,6);
				right: 0;
				.rem(width,24);
				.rem(height,24);
				.rem(margin-left,15);
				background: url(./image/check_icon.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.line {
			width: 100%;
			.rem(height,2);
			.rem(margin-top,10);
			.rem(margin-bottom,10);
			background: #888;
		}
		.p1 {
			width: 100%;
			.rem(font-size,22);
			.rem(line-height,32);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.entrust-btn {
		position: absolute;
		.rem(bottom,75);
		.rem(right,200);
		z-index: 100;
		.rem(width,228);
		.rem(height,54);
		.rem(line-height,50);
		.rem(font-size,24);
		color: #ed7631;
		text-align: center;
		.border(border,2,#ed7631);
		.border-radius(10);
	}
	.box-gray7 {
		width: 100%;
		.rem(height,7);
		background: #eee;
	}
	.nav {
		width: 100%;
		overflow: hidden;
		> div {
			float: left;
			width: 50%;
			.rem(padding-top,7);
		}
		.txt {
			.rem(width,98);
			.rem(height,64);
			margin: 0 auto;
			.rem(line-height,58);
			.rem(font-size,28);
			color: #333;
			text-align: center;
			i {
				display: block;
				width: 100%;
				.rem(height,6);
				.border-radius(50);
				background: #fff;
			}
		}
		.action {
			color: #ed7631;
			i {
				background: #ed7631;
			}
		}
	}
	.top-box {
		// width: 100%;
		// .rem(height,542);
	}
	.box-gray4 {
		width: 100%;
		.rem(height,4);
		background: #eee;
	}
	.case {
		width: 100%;
		.banner {
			img {
				width: 100%;
			}
			.swiper-container {
				width: 100%;
				.rem(height,421.8);
			}
			.swiper-button-next, .swiper-button-prev {
				.rem(width,21);
				.rem(height,35);
				.rem(margin-top,17.5);
				background-size: 100% 100%;
			}
		}
		.container-txt {
			position: relative;
			width: 100%;
			.rem(padding-top,24);
			.rem(padding-left,28);
			.rem(padding-right,28);
			overflow: hidden;
			.title {
				width: 100%;
				.rem(margin-bottom,24);
				.rem(padding-right,40);
				.rem(font-size,32);
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.like {
				position: absolute;
				.rem(top,20);
				.rem(right,18);
				.rem(width,50);
				.rem(height,50);
				.rem(line-height,50);
				text-align: center;
				i {
					display: inline-block;
					.rem(width,40);
					.rem(height,38);
					background: url(./image/bottom_ico_4_collection.png) no-repeat;
					background-size: 100% 100%;
					vertical-align: middle;
				}
			}
			.action {
				i {
					background-image: url(./image/bottom_ico_4_collection_state.png);
				}
			}
			.time {
				float: right;
				.rem(font-size,24);
				color: #999;
			}
		}
		.box-gray27 {
			width: 100%;
			.rem(height,27);
			.rem(margin-top,25);
			background: #eee;
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
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 100;
			width: 100%;
			.rem(height,87);
			.rem(padding-top,17);
			.rem(padding-left,28);
			.rem(padding-right,28);
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
	.bottom-msg-box {
		width: 100%;
		.rem(height,87);
	}
</style>
