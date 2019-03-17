<template>
	<div id="memberDet">
		<div class="list">
			<ul>
				<li id="box">
					<div id="btn">
						<span class="txt">头像</span>
						<span class="icon-right"></span>
						<div class="img">
							<img :src="headimg" v-if="headimg" id="img">
							<img src="./image/dsgImg.png" v-else>
						</div>
					</div>
				</li>
				<li @click="userFocus"><span class="txt">用户名</span><span class="icon-edit"></span><input type="text" class="name" v-model.trim="nickname" placeholder="填写姓名" ref="nickname" @blur="userBlur"></li>
				<li @click="selectFun(1)"><span class="txt">性别</span><span class="icon-right"></span><span class="select">{{ sexTxt }}</span></li>
				<li @click="selectFun(2)"><span class="txt">年龄段</span><span class="icon-right"></span><span class="select">{{ ageTxt }}</span></li>
				<li @click="selectFun(3)"><span class="txt">风格喜好</span><span class="icon-right"></span><span class="select">{{ styleTxt }}</span></li>
				<li @click="industryFocus"><span class="txt">行业</span><span class="icon-edit"></span><input type="text" class="industry" v-model.trim="industry" placeholder="填写所在行业" ref="industry" @blur="industryBlur"></li>
			</ul>
		</div>
		<div class="select-box" v-show="isSelect">
			<div class="mask" @click.self="isShow()"></div>
			<div class="popout" :class="isAnimation?'in':'out'">
				<div class="set-box">
					<div class="title">{{ title }}</div>
					<div class="popout-list">
						<ul v-show='select == 1 || select == 2'>
							<li
							 	v-show="select == 1"
								v-for="(index,key) in sexList"
								:class="item.sex == key?'action':''"
								@click="sexSelectFun(key)">{{ index }}<span></span></li>
							<li
							 	v-show="select == 2"
								v-for="(index,key) in ageGroup"
								:class="item.age_group == key?'action':''"
								@click="ageSelectFun(key)">{{ index }}<span></span></li>
							<li class="close" @click="isShow()">取消</li>
						</ul>
						<ul class="style" v-show="select == 3">
							<li
								v-for="(index,key) in styleList"
								:class="item.style_like == key?'action':''"
								@click="styleSelectFun(key)">{{ index }}<span></span></li>
							<li class="close" @click="isShow()">取消</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import './js/qiniu.min.js';
	import { member,editInfo } from "../../common/axios/api.js";
	export default {
		data() {
			return {
				item      : {},
				sexList   : {},
				ageGroup  : {},
				styleList : {},
				token     : '',
				headimg   : '',
				nickname  : '',
				industry  : '',
				select    : 1,
				isSelect  : false,
				isAnimation: true
			}
		},
		methods: {
			ajaxFun: function() {
				member().then(data => {
					this.item = data.info;
					this.sexList = data.sexList;
					this.ageGroup = data.ageGroup;
					this.styleList = data.styleList;
					this.nickname = data.info.nickname;
					this.headimg = data.info.headimg;
					this.industry = data.info.trade;
					this.token = data.token;
					this.upImg();
				})
			},
			upImg: function() {//七牛云
				var this_ = this;
				var upToken = this.token;
				Qiniu.uploader({
					runtimes: 'html5,flash,html4',				// 上传模式，依次退化
					browse_button: 'btn',					// 上传选择的点选按钮，必需
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
					num:1,										//上传数量
					// filters : [ {
					//    title : 'Image files',
					//    extensions : 'jpg,gif,png,bmp'
					// }],
				   init: {
						'Key': function(up, files) {
							//修改文件名
							var name = files.name;
							var info = name.split(".");
							var type = info[info.length - 1];
							var filename = new Date().getTime().toString();
							filename += Math.floor(Math.random() * 100);
							filename = filename + "." + type;
              console.log(filename);

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
              console.log(url);
              let obj = {'headimg':url,'nickname':''};
							editInfo(obj).then(data => {
								if (data.status) {
									this_.headimg = url;
									this_.txtPrompt('上传成功');
								}
							})
						},
						'UploadComplete': function(up, file) {
						},
						'Error': function(up, err, errTip) {
							this_.msg = errTip;
							this_.isTxtShow = true;
							setTimeout(() => {
								this_.isTxtShow = false;
							},1500);
							return;
						}
					}
				});
			},
			selectFun: function(num) {
				this.select = num;
				this.isSelect = true;
			},
			sexSelectFun: function(num) {
				this.item.sex = num;
				let obj = {'sex':num};
				this.isShow(obj);
			},
			ageSelectFun: function(num) {
				this.item.age_group = num;
				let obj = {'ageGroup':num};
				this.isShow(obj);
			},
			styleSelectFun: function(num) {
				this.item.style_like = num;
				let obj = {'style':num};
				this.isShow(obj);
			},
			isShow: function(obj) {
				if (obj) {
					editInfo(obj).then(data => {
						if (!data.status) {
							this.txtPrompt(data.msg);
						}
					});
				}
				this.isAnimation = false;
				setTimeout(() => {
					this.isSelect = false;
					this.isAnimation = true;
				},400);
			},
			userFocus: function() {
				this.$refs.nickname.focus;
			},
			userBlur: function() {
				if (!(/\S/.test(this.nickname))) {
          this.txtPrompt('用户名称不能为空');
				}else if(this.nickname.length>20){
					this.txtPrompt('你输入的用户名过长');
				}else{
          let obj = {'nickname':this.nickname}
          editInfo(obj).then(data => {
            if (!data.status) {
              this.txtPrompt(data.msg);
            }
          });
        }
			},
			industryFocus: function() {
				this.$refs.industry.focus;
			},
			industryBlur: function() {
				if (this.industry != '') {
					let obj = {'trade':this.industry}
					editInfo(obj).then(data => {
						if (!data.status) {
							this.txtPrompt(data.msg);
						}
					});
				}
			},
			txtPrompt: function(str,num) {
				let time = num?num:1500;
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1500);
			}
		},
		computed: {
			title: function() {
				let status = this.select;
				if (status == 1) {
					return '性别'
				}else if (status == 2) {
					return '年龄段'
				}else {
					return '风格喜好'
				}
			},
			sexTxt: function() {
				let sex = this.item.sex;
				let obj = this.sexList;
				let str = '';
				for (var k in obj) {
					if (k == sex) {
						str = obj[k];
					}
				}
				if (str == '') {
					return '选择性别';
				}else {
					return str;
				}
			},
			ageTxt: function() {
				let age = this.item.age_group;
				let obj = this.ageGroup;
				let str = '';
				for (var k in obj) {
					if (k == age) {
						str = obj[k];
					}
				}
				if (str == '') {
					return '选择年龄段';
				}else {
					return str;
				}
			},
			styleTxt: function() {
				let style = this.item.style_like;
				let obj = this.styleList;
				let str = '';
				for (var k in obj) {
					if (k == style) {
						str = obj[k];
					}
				}
				if (str == '') {
					return '选择风格喜好';
				}else {
					return str;
				}
			}
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#memberDet {
		width: 100%;
		height: 100%;
		background: #eee;
	}
	.list {
		.rem(margin-top,12);
		li {
			width: 100%;
			.rem(height,78);
			.rem(margin-bottom,2);
			.rem(padding-left,30);
			.rem(padding-right,30);
			.rem(line-height,78);
			.rem(font-size,22);
			background: #fff;
			#btn {
				width: 100%;
				height: 100%;
			}
			.select {
				float: right;
				.rem(font-size,22);
				color: #666;
			}
			.industry,.name {
				float: right;
				.rem(margin-top,25);
				.rem(font-size,22);
				color: #666;
				text-align: right;
				border: 0;
				border-radius: 0;
				outline: none;
			}
			.icon-right {
				float: right;
				.rem(width,13);
				.rem(height,24);
				.rem(margin-top,27);
				.rem(margin-left,25);
				background: url(./image/right.png) no-repeat;
				background-size: 100% 100%;
			}
			.icon-edit {
				float: right;
				.rem(width,30);
				.rem(height,30);
				.rem(margin-top,25);
				.rem(margin-left,10);
				background: url(./image/edit.png) no-repeat;
				background-size: 100% 100%;
			}
			.img {
				float: right;
				.rem(width,50);
				.rem(height,50);
				.rem(margin-top,14);
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
					.rem(min-height,50);
					border-radius: 50%;
				}
			}
		}
	}
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 5000;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.4);
	}
	.popout {
		position: fixed;
		left: 0;
		z-index: 6000;
		width: 100%;
		opacity: 0;
		animation-duration: .5s;
		animation-fill-mode: both;
		&.in {
			animation-name: in;
		}
		&.out {
			animation-name: out;
		}
		> div {
			width: 100%;
			text-align: center;
			background: #dfdfdf;
		}
		.title {
			width: 100%;
			.rem(height,60);
			.rem(line-height,60);
			.rem(font-size,20);
			color: #aaa;
		}
		.popout-list {
			li {
				position: relative;
				width: 100%;
				.rem(height,80);
				.rem(line-height,80);
				.rem(font-size,24);
				color: #333;
				.border(border-top,1,#a6a6a6);
				&.action span {
					position: absolute;
					.rem(top,34);
					.rem(right,20);
					.rem(width,18);
					.rem(height,12);
					background: url(./image/selected.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			.style {
				.rem(height,500);
				overflow-y: auto;
			}
			.close {
				.border(border-bottom,1,#333);
			}
		}
		@keyframes in {
			0% {
				bottom: -50%;
				opacity: 0;
			}
			100% {
				bottom: 0;
				opacity: 1;
			}
		}
		@keyframes out {
			0% {
				bottom: 0%;
				opacity: 1;
			}
			100% {
				bottom: -50%;
				opacity: 0;
			}
		}
	}
</style>
