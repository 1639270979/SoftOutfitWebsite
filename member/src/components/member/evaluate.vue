<template>
	<div id="evaluate">
		<div class="popout">
			<div class="top">商品评价</div>
			<div class="stars">
				<div>
					<span class="txt">相符描述</span>
					<span class="icon-x" :class="describe > 0?'action':''" @click="describeFun(1)"></span>
					<span class="icon-x" :class="describe > 1?'action':''" @click="describeFun(2)"></span>
					<span class="icon-x" :class="describe > 2?'action':''" @click="describeFun(3)"></span>
					<span class="icon-x" :class="describe > 3?'action':''" @click="describeFun(4)"></span>
					<span class="icon-x" :class="describe > 4?'action':''" @click="describeFun(5)"></span>
				</div>
				<div>
					<span class="txt">物流速度</span>
					<span class="icon-x" :class="speed > 0?'action':''" @click="speedFun(1)"></span>
					<span class="icon-x" :class="speed > 1?'action':''" @click="speedFun(2)"></span>
					<span class="icon-x" :class="speed > 2?'action':''" @click="speedFun(3)"></span>
					<span class="icon-x" :class="speed > 3?'action':''" @click="speedFun(4)"></span>
					<span class="icon-x" :class="speed > 4?'action':''" @click="speedFun(5)"></span>
				</div>
				<div>
					<span class="txt">购物体验</span>
					<span class="icon-x" :class="shop > 0?'action':''" @click="shopFun(1)"></span>
					<span class="icon-x" :class="shop > 1?'action':''" @click="shopFun(2)"></span>
					<span class="icon-x" :class="shop > 2?'action':''" @click="shopFun(3)"></span>
					<span class="icon-x" :class="shop > 3?'action':''" @click="shopFun(4)"></span>
					<span class="icon-x" :class="shop > 4?'action':''" @click="shopFun(5)"></span>
				</div>
			</div>
			<div class="proposal">
				<textarea placeholder="请在此处写下您的意见及建议。" v-model="proposal"></textarea>
			</div>
			<div class="up-img">
				<div id="box">
					<div id="boxBtn" class="boxBtn">
						<img src="./image/add.jpg" id="img">
					</div>
					<div id="boxBtn1" class="boxBtn" v-show="imgNum.length > 0">
						<img src="./image/add.jpg" id="img1">
					</div>
					<div id="boxBtn2" class="boxBtn" v-show="imgNum.length > 1">
						<img src="./image/add.jpg" id="img2">
					</div>
				</div>
			</div>
			<div class="btn">
				<span @click="cancelFun">取消</span>
				<span class="confirm" @click="confirmFun">提交</span>
			</div>
		</div>
	</div>
</template>
<script>
	import { appraise } from '../../common/axios/api.js';
	import './js/qiniu.min.js';
	export default {
		props: ['token','itemId','isEvaluate'],
		data() {
			return {
				describe: 1,
				speed   : 1,
				shop    : 1,
				proposal: '',
				img     : {},
				imgNum	: []
			}
		},
		watch: {
			'itemId': function() {
				this.upImg('boxBtn','img');
			}
		},
		methods: {
			describeFun: function(n) {
				this.describe = n;
			},
			speedFun: function(n) {
				this.speed = n;
			},
			shopFun: function(n) {
				this.shop = n;
			},
			upImg: function(btn,img) {//七牛云
				var this_ = this;
				var upToken = this.token;
				Qiniu.uploader({
					runtimes: 'html5,flash,html4',				// 上传模式，依次退化
					browse_button: btn,					// 上传选择的点选按钮，必需
					uptoken : upToken,							// uptoken是上传凭证，由其他程序生成
					get_new_uptoken: false,						// 设置上传文件的时候是否每次都重新获取新的uptoken
					domain: 'http://public.idmei.cn/',			// bucket域名，下载资源时用到，必需
					container: 'box',							// 上传区域DOM ID，默认是browser_button的父元素
					max_file_size: '100mb',						// 最大文件体积限制
					flash_swf_url: './js/plupload/Moxie.swf',	//引入flash，相对路径
					max_retries: 3,								// 上传失败最大重试次数
					dragdrop: true,								// 开启可拖曳上传
					drop_element: 'box',						// 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
					chunk_size: '4mb',							// 分块上传时，每块的体积
					auto_start: true,							//选择文件后自动上传，若关闭需要自己绑定事件触发上传
					num:3,										//上传数量
				   init: {
						'Key': function(up, files) {
							//修改文件名
							var name = files.name;
							var info = name.split(".");
							var type = info[info.length - 1];
							var filename = new Date().getTime().toString();
							filename += Math.floor(Math.random() * 100);
							filename = filename + "." + type;

							var key = filename;
							return key;
						},
						'FilesAdded': function(up, file) {
						},
						'BeforeUpload': function(up, file) {
						},
						'UploadProgress': function(up, file) {
						},
						'FileUploaded': function(up, file, info) {
							var res = JSON.parse(info);
							var url;
							if (res.url) {
								url = res.url;
							} else {
								var domain = up.getOption('domain');
								url = domain + encodeURI(res.key);
							}
							document.getElementById(img).setAttribute('src',url);
							this_.img[btn] = url;
							this_.imgNum = [];
							for (var i in this_.img) {
								this_.imgNum.push(this_.img[i]);
							}
							if (this_.imgNum.length == 1) {
								this_.upImg('boxBtn1','img1');
							}else if (this_.imgNum.length == 2) {
								this_.upImg('boxBtn2','img2');
							}
						},
						'UploadComplete': function(up, file) {
						},
						'Error': function(up, err, errTip) {
							alert(errTip);return;
						}
					}
				});
			},
			confirmFun: function() {
				if ((/\S/.test(this.proposal))) {
					let obj = {'item_id':this.itemId,'conform_level':this.describe,'delivery_level':this.speed,'experience_level':this.shop,'content':this.proposal,'picture':this.imgNum}
					appraise(obj).then(data => {
						if (data.code == 1) {
							this.$store.state.publicJS.promptBoxMsg = data.msg;
							this.$store.commit('txtPrompt');
							setTimeout(() => {
								this.$store.commit('txtPrompt');
								this.$emit('update:isEvaluate', false);
								this.$emit('increment');
							},1000);
						}else {
							this.txtShowFun(data.msg);
						}
					})
				}else {
					this.txtShowFun('内容不能为空');
				}
			},
			cancelFun: function() {
				this.$emit('update:isEvaluate', false);
			},
			txtShowFun: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1000);
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#evaluate {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 100%;
		background: rgba(102,102,102,.8);
	}
	.popout {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 1000;
		.rem(width,554);
		.rem(height,824);
		.border(border,2,#d65317);
		.border-radius(10);
		transform: translate(-50%,-50%);
		background: #fff;
	}
	.top {
		width: 100%;
		.rem(height,72);
		.rem(line-height,70);
		.rem(font-size,26);
		color: #333;
		text-align: center;
		.border(border-bottom,2,#eee);
	}
	.stars {
		width: 100%;
		.rem(margin-top,39);
		.rem(padding-bottom,36);
		text-align: center;
		.border(border-bottom,2,#eee);
		> div {
			.rem(margin-top,24);
			font-size: 0;
		}
		span {
			display: inline-block;
			.rem(font-size,22);
			color: #333;
			vertical-align: middle;
		}
		.txt {
			.rem(margin-right,15);
		}
		.icon-x {
			.rem(width,36);
			.rem(height,35);
			.rem(margin-right,8);
			background: url(./image/stars_1.png) no-repeat;
			background-size: 100% 100%;
			&:last-of-type {
				margin-right: 0;
			}
		}
		.action {
			background-image: url(./image/stars.png);
		}
	}
	.proposal {
		width: 100%;
		.rem(padding-top,22);
		.rem(padding-bottom,18);
		.rem(padding-left,30);
		.rem(padding-right,30);
		.border(border-bottom,2,#eee);
		textarea {
			width: 100%;
			.rem(height,188);
			.rem(padding,15);
			.rem(font-size,22);
			color: #999;
			border: 0;
			.border-radius(10);
			background: #eee;
			resize: none;
			outline: none;
		}
	}
	.up-img {
		width: 100%;
		.rem(padding-top,20);
		.rem(padding-bottom,20);
		.rem(padding-left,30);
		.rem(padding-right,30);
		font-size: 0;
		#box {
			width: 100%;
			.boxBtn {
				display: inline-block;
				.rem(width,138);
				.rem(height,138);
				.rem(margin-right,10);
				overflow: hidden;
				&:last-of-type {
					margin-right: 0;
				}
				img {
					width: 100%;
					.rem(min-height,138);
				}
			}
		}
	}
	.btn {
		width: 100%;
		.rem(margin-top,10);
		font-size: 0;
		text-align: center;
		> span {
			display: inline-block;
			.rem(width,218);
			.rem(height,60);
			.rem(margin-right,24);
			.rem(line-height,60);
			.rem(font-size,22);
			color: #fff;
			.border-radius(10);
			background: #999;
			&:last-of-type {
				margin-right: 0;
			}
		}
		.confirm {
			background: #d65317;
		}
	}
</style>
