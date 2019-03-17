<template>
	<div id="changeGoods">
		<p class="top">申请换货</p>
		<div class="content">
			<p class="orderNum">订单编号：{{ items.order_id }}</p>
			<div class="container">
				<div class="img"><img :src="items.picture"></div>
				<div class="info">
					<div><img :src="items.logo">{{ items.goods_name}}</div>
          <div class="num">尺寸：{{ items.size }}</div>
					<div class="num">数量：{{ items.quantity }}件</div>
				</div>
			</div>
		</div>
		<div class="problem">
			<p class="title">问题描述</p>
			<textarea placeholder="请您再次描述问题" v-model="content"></textarea>
			<p class="title">添加图片</p>
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
					<div id="boxBtn3" class="boxBtn" v-show="imgNum.length > 2">
						<img src="./image/add.jpg" id="img3">
					</div>
					<div id="boxBtn4" class="boxBtn" v-show="imgNum.length > 3">
						<img src="./image/add.jpg" id="img4">
					</div>
				</div>
			</div>
		</div>
    <div class="refunds-mode">
      <p class="mode">商品退回方式</p>
      <span>上门取件</span>
      <p class="txt">我们将在1-3个工作日内上门取回商品</p>
    </div>
		<div class="user">
			<p>联系人：{{ obj.recevier }}</p>
			<p>联系电话：{{ obj.mobile }}</p>
			<div>
				<p>取件地址</p>
				<span class="icon"></span>
				<div>{{ obj.address}}</div>
			</div>
		</div>
		<div class="btn"><span @click="confirmFun">提交</span></div>
	</div>
</template>
<script>
	import { orderDet,service } from '../../common/axios/api.js';
	import './js/qiniu.min.js';
	export default {
		data() {
			return {
				oid: this.$route.params.Oid,
				iid: this.$route.params.Iid,
				items: {},
				obj  : {},
				token: '',
				img     : {},
				imgNum	: [],
				content : ''
			}
		},
		methods: {
			ajaxFun: function() {
				orderDet(this.oid).then(data => {
					if (data.code == 1) {
						this.obj = data.order.ship_detail;
						this.token = data.token;
						this.upImg('boxBtn','img');
						for (var i = 0; i < data.order.items.length; i++) {
							if (data.order.items[i].item_id == this.iid) {
								this.items = data.order.items[i];
							}
						}
					}
				})
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
					num:5,										//上传数量
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
							}else if (this_.imgNum.length == 3) {
								this_.upImg('boxBtn3','img3');
							}else if (this_.imgNum.length == 4) {
								this_.upImg('boxBtn4','img4');
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
				let obj = {'item_id':this.iid,'type':1,'content':this.content,'picture':this.imgNum};
				if ((/\S/.test(this.content))) {
					service(obj).then(data => {
						if (data.code == 1) {
							this.$store.state.publicJS.promptBoxMsg = data.msg;
							this.$store.commit('txtPrompt');
							setTimeout(() => {
								this.$store.commit('txtPrompt');
								this.$router.go(-2);
							},1000);
						}else {
							this.txtShowFun(data.msg);
						}
					})
				}else {
					this.txtShowFun('填写问题描述');
				}
			},
			txtShowFun: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1000);
			}
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	.top {
		width: 100%;
		height: 34px;
		margin: 1px 0;
		line-height: 34px;
		font-size: 13;
		text-align: center;
		background: #fff;
	}
	.content {
		margin-bottom: 7px;
		.rem(padding-left,30);
		.rem(padding-right,30);
		.rem(padding-bottom,15);
		background: #fff;
		.orderNum {
			width: 100%;
			.rem(height,62);
			.rem(line-height,62);
			.rem(font-size,22);
			color: #333;
		}
		.container {
			overflow: hidden;
		}
		.img {
			float: left;
			.rem(width,118);
			.rem(height,118);
			overflow: hidden;
			img {
				width: 100%;
				.rem(min-height,118);
			}
		}
		.info {
			width: 100%;
			.rem(padding-left,140);
			.rem(font-size,26);
			vertical-align: middle;
			img {
				.rem(width,30);
				.rem(height,30);
				.rem(margin-right,10);
        margin-bottom: -0.05rem;
			}
			.num {
				.rem(margin-top,20);
				.rem(font-size,20);
				color: #666;
			}
		}
	}
	.problem {
		margin-bottom: 7px;
		.rem(padding-left,30);
		.rem(padding-right,30);
		font-size: 0;
		background: #fff;
		.title {
			width: 100%;
			height: 37px;
			line-height: 37px;
			font-size: 13px;
		}
		textarea {
			width: 100%;
			height: 75px;
			.rem(padding,20);
			font-size: 11px;
			color: #999;
			border: 0;
			.border-radius(10);
			background: #eee;
			outline: none;
			resize: none;
		}
		.up-img {
			font-size: 0;
			.boxBtn {
				display: inline-block;
				.rem(width,118);
				.rem(height,118);
				.rem(margin-bottom,30);
				.rem(margin-right,25);
				img {
					width: 100%;
					.rem(min-height,118);
				}
			}
		}
	}
  .refunds-mode {
    width: 100%;
    margin-bottom: 7px;
    .rem(padding-left,30);
    .rem(padding-right,30);
    .rem(padding-bottom,20);
    font-size: 0;
    background: #fff;
    .mode {
      width: 100%;
      height: 37px;
      line-height: 37px;
      font-size: 13px;
    }
    span {
      display: inline-block;
      width: 69px;
      height: 27px;
      line-height: 27px;
      font-size: 13px;
      color: #fff;
      text-align: center;
      .border-radius(10);
      background: #FF8104;
    }
    .txt {
      margin-top: 11.5px;
      padding-bottom: 12.5px;
      line-height: 11px;
      font-size: 11px;
      color: #999;
    }
  }
	.user {
		margin-bottom: 11px;
		padding-bottom: 17.5px;
		background: #fff;
		overflow: hidden;
		> div,> p {
			.rem(padding-left,30);
			.rem(padding-right,30);
		}
		> p {
			width: 100%;
			height: 35px;
			line-height: 35px;
			font-size: 13px;
			border-bottom: 1px solid #eee;
		}
		> div {
			p {
				width: 100%;
				height: 38px;
				line-height: 38px;
				font-size: 13px;
			}
			.icon {
				float: left;
				width: 22px;
				height: 21px;
				background: url(./image/adres.png) no-repeat;
				background-size: 100% 100%;
			}
			div {
				width: 100%;
				padding-left: 33px;
				font-size: 12px;
			}
		}
	}
	.btn {
		width: 100%;
		margin-bottom: 12.5px;
		font-size: 0;
		text-align: center;
		span {
			display: inline-block;
			width: 119px;
			height: 27px;
			line-height: 27px;
			font-size: 13px;
			color: #fff;
			.border-radius(10);
			background: #FF8104;
		}
	}
</style>
