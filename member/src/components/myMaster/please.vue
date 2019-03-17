<template>
	<div id="please">
		<div class="title">请填写你的需求</div>
		<div class="inp">
			<i class="sign">*</i>
			<span class="txt">您的姓名</span>
			<div class="input"><input type="text"v-model.trim="name" placeholder="请输入您的姓名"></div>
		</div>
		<div class="inp">
			<i class="sign">*</i>
			<span class="txt">联系电话</span>
			<div class="input"><input type="tel" v-model.trim="mobile" placeholder="请输入您的联系电话"></div>
		</div>
		<div class="inp">
			<span class="txt">联系QQ</span>
			<div class="input"><input type="tel" v-model.trim="qq" placeholder="请输入您的QQ"></div>
		</div>
		<div class="inp">
			<i class="sign">*</i>
			<span class="txt">房屋所在地</span>
			<div class="right">
				<input id="adr" name="area" class="region-btn" type="text" readonly/>
				<input id="adrVal" type="hidden" name="area_id"/>
				<input id="city" type="hidden" name="city_id"/>
				<span class="icon-right"></span>
			</div>
		</div>
		<div class="textarea">
			<textarea placeholder="请填写您的详细地址，不少于5个字" v-model="address"></textarea>
		</div>
		<div class="inp">
			<i class="sign">*</i>
			<span class="txt">面积</span>
			<div class="input"><input type="tel" v-model="acreage" placeholder="请输入您房屋的实际面积"></div>
		</div>
		<div class="inp">
			<i class="sign">*</i>
			<span class="txt">平面图</span>
			<div class="inp-btn">
				<span :class="isPlane == true ? 'action':''" @click="isPlane = false">无平面图</span>
				<span :class="isPlane == false ? 'action':''" @click="isPlane = true">有平面图</span>
			</div>
		</div>
		<div class="plan-img" v-show="isPlane">
			<div class="img-box" id="planBox">
				<div class="img-btn" id="planBoxBtn"><img src="./image/addImg.jpg" id="planImg"></div>
			</div>
		</div>
		<div class="inp budget">
			<span class="leftTxt">装修价格预算</span>
			<div class="leftInp"><input type="number" v-model="budget" @blur="blurFun" placeholder="请输入价格预算"></div>
		</div>
		<div class="inp">
			<span class="left">期望设计风格的表述</span>
		</div>
		<div class="textarea">
			<textarea placeholder="喜欢实木家具，北欧风格" v-model="expectStyle"></textarea>
		</div>
		<div class="feel">
			<p>期望设计感觉的图片</p>
			<div class="img-box" id="box">
				<div id="boxBtn" class="btn">
					<img src="./image/addImg.jpg" id="img">
				</div>
				<div id="boxBtn1" class="btn" v-show="expectPic.length > 0">
					<img src="./image/addImg.jpg" id="img1">
				</div>
				<div id="boxBtn2" class="btn" v-show="expectPic.length > 1">
					<img src="./image/addImg.jpg" id="img2">
				</div>
				<div id="boxBtn3" class="btn" v-show="expectPic.length > 2">
					<img src="./image/addImg.jpg" id="img3">
				</div>
				<div id="boxBtn4" class="btn" v-show="expectPic.length > 3">
					<img src="./image/addImg.jpg" id="img4">
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="message">
				<span class="txt">留言</span>
				<div class="bottom-texttrea">
					<textarea v-model="message"></textarea>
				</div>
			</div>
			<div class="bottom-btn">
				<span @click="backFun">取消</span>
				<span class="submit" @click="submitBtnFun">提交给经纪人</span>
			</div>
		</div>
		<div class="layer" v-show="isLayer">
			<div class="mask">
				<div class="check"><img src="./image/check.png"></div>
				<p class="p1">我们已经收到您的需求订单，24小时内将会有经纪人联系您，请保持手机畅通。</p>
				<p class="p2">委托设计的流程</p>
				<div class="list"><i class="i1"></i><span>签订设计服务合同</span></div>
				<div class="list"><i class="i2"></i><span>平面布局设计及概念设计</span></div>
				<div class="list"><i class="i3"></i><span>方案效果图设计</span></div>
				<div class="list"><i class="i4"></i><span>硬装施工图及主要材料物料图设计</span></div>
				<div class="list"><i class="i5"></i><span>软装物料图纸设计</span></div>
				<div class="layer-btn" @click="backFun">我知道了</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { areaJson,elitaddorder,getQiniuToken } from '../../common/axios/api.js';
	import './js/qiniu.min.js';
	import LArea from './js/LArea.js';
	export default {
		data() {
			return {
				did: this.$route.params.did,
				name: '',
				mobile: '',
				qq: '',
				area_id: '',
				address: '',
				acreage: '',
				isPlane: true,
				planer_graph: '',
				budget: '',
				expectStyle: '',
				expectPic: [],
				message: '',
				province   : [],
				city       : {},
				area       : {},
				token: '',
				img     : {},
				isLayer: false
			}
		},
		methods: {
			areaJson: function() {//获取地址信息
				areaJson().then(data => {
					var cityArr = [];
					var areadataArr = [];
					for (var i = 0; i < data.length; i++) {
						this.province.push({'text':data[i].province_name,'value':data[i].province_id});
						cityArr = [];
						for (var j = 0; j < data[i].city.length; j++) {
								cityArr.push({"text":data[i].city[j].city_name,'value':data[i].city[j].city_id});
								this.city[data[i].province_id] = cityArr;
							for (var k = 0; k < data[i].city[j].area.length; k++) {
								areadataArr.push({'text':data[i].city[j].area[k].area_name,'value':data[i].city[j].area[k].area_id})
								this.area[data[i].city[j].city_id] = areadataArr;
							}
							areadataArr = [];
						}
					}
					var larea = new LArea();
					larea.init({
						'trigger': '#adr',
						'cityVal': '#city',
						'valueTo': '#adrVal',
						'keys': {
							id: 'value',
							name: 'text'
						},
						'type': 2,
						'data': [this.province,this.city,this.area]
					});
				});
				getQiniuToken().then(data => {
					this.token = data.token;
					this.upImg();
					this.feelUpImg('boxBtn','img');
				});
			},
			blurFun: function() {
				this.budget = parseInt(this.budget);
			},
			submitBtnFun: function() {
				if (!(/^[a-zA-Z\s\u4e00-\u9fa5]{2,16}$/.test(this.name))) {
					this.alertPrompt('姓名为2-16位且不能为数字');
				}else if(!(/\S/.test(this.name))){
          this.alertPrompt('姓名不能为空');
        }else if (!(/^1[3|4|5|6|7|8|9]{1}\d{9}$/.test(this.mobile))){
					this.alertPrompt('联系电话有误');
				}else if (document.getElementById('adrVal').value == '') {
					this.alertPrompt('请选择房屋所在地');
				}else if (!(/\S/.test(this.acreage))) {
					this.alertPrompt('面积大小不能为空');
				}else if (this.acreage<0) {
          this.alertPrompt('面积输入不能为负数，请重新输入');
        }else if (this.isPlane && this.planer_graph == '') {
					this.alertPrompt('平面图不能为空');
				}else if(this.budget<0){
          this.alertPrompt('装修预算价格输入不能为负数，请从新输入');
        }else if(!(/\S/.test(this.address))){
          this.alertPrompt("详细地址不能为空");
        }else if(this.address.length<5){
          this.alertPrompt('您输入的详细地址少于5个字，请重新输入');
        }else{
					let obj = {
						'did': this.did,
						'name': this.name,
						'mobile': this.mobile,
						'qq': this.qq,
						'area_id': document.getElementById('adrVal').value,
						'address': this.address,
						'acreage': this.acreage,
						'planer_graph': this.planer_graph,
						'budget': parseInt(this.budget),
						'expectStyle': this.expectStyle,
						'expectPic': this.expectPic,
						'message': this.message
					}
          elitaddorder(obj).then(data => {
						if (data.code==1) {
							this.isLayer = true;
						}else {
							this.alertPrompt(data.msg);
						}
					})
				}
			},
			upImg: function() {//七牛云
				var this_ = this;
				var upToken = this.token;
				Qiniu.uploader({
					runtimes: 'html5,flash,html4',				// 上传模式，依次退化
					browse_button: 'planBoxBtn',					// 上传选择的点选按钮，必需
					uptoken : upToken,							// uptoken是上传凭证，由其他程序生成
					get_new_uptoken: false,						// 设置上传文件的时候是否每次都重新获取新的uptoken
					domain: 'http://public.idmei.cn/',			// bucket域名，下载资源时用到，必需
					container: 'planBox',							// 上传区域DOM ID，默认是browser_button的父元素
					max_file_size: '100mb',						// 最大文件体积限制
					flash_swf_url: './js/plupload/Moxie.swf',	//引入flash，相对路径
					max_retries: 3,								// 上传失败最大重试次数
					dragdrop: true,								// 开启可拖曳上传
					drop_element: 'planBox',						// 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
					chunk_size: '4mb',							// 分块上传时，每块的体积
					auto_start: true,							//选择文件后自动上传，若关闭需要自己绑定事件触发上传
					num:1,
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
							document.getElementById('planImg').setAttribute('src',url);
							this_.planer_graph = url;
						},
						'UploadComplete': function(up, file) {
						},
						'Error': function(up, err, errTip) {
							alert(errTip);return;
						}
					}
				});
			},
			feelUpImg: function(btn,img) {//七牛云
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
							this_.expectPic = [];
							for (var i in this_.img) {
								this_.expectPic.push(this_.img[i]);
							}
							if (this_.expectPic.length == 1) {
								this_.feelUpImg('boxBtn1','img1');
							}else if (this_.expectPic.length == 2) {
								this_.feelUpImg('boxBtn2','img2');
							}else if (this_.expectPic.length == 3) {
								this_.feelUpImg('boxBtn3','img3');
							}else if (this_.expectPic.length == 4) {
								this_.feelUpImg('boxBtn4','img4');
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
			alertPrompt: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.dispatch('alertPrompt');
			},
			backFun: function() {
				this.$router.go(-1);
			}
		},
		created() {
			this.areaJson();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	@import './css/LArea.min.css';
	#please {
		.rem(padding-bottom,40);
		> div {
			position: relative;
			width: 100%;
			.rem(padding-left,40);
			.rem(padding-right,28);
			.border(border-top,2,#eee);
			.sign {
				position: absolute;
				top: 0;
				left: 0;
				.rem(width,30);
				.rem(line-height,72);
				.rem(font-size,24);
				color: #ed7631;
				text-align: right;
				font-style: normal;
			}
		}
		.title {
			.rem(height,72);
			.rem(line-height,70);
			.rem(font-size,28);
			color: #ed7631;
			text-align: center;
		}
		.inp {
			.rem(height,72);
			.rem(line-height,70);
			overflow: hidden;
			.txt {
				float: left;
				.rem(width,180);
				.rem(font-size,28);
			}
			.left {
				float: left;
				.rem(font-size,28);
			}
			.input {
				width: 100%;
				.rem(padding-left,180);
				input {
					float: left;
					width: 100%;
					.rem(height,70);
					.rem(font-size,24);
					color: #000;
					border: 0;
					outline: none;
					background: #fff;
				}
			}
			.right {
				position: relative;
				width: 100%;
				.rem(padding-left,180);
				input {
					width: 100%;
					.rem(height,70);
					.rem(padding-right,50);
					text-align: right;
					border: 0;
				}
				.icon-right {
					position: absolute;
					right: 0;
					.rem(top,23);
					.rem(width,13);
					.rem(height,24);
					background: url(./image/back.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			.inp-btn {
				width: 100%;
				> span {
					float: right;
					.rem(width,128);
					.rem(height,54);
					.rem(margin-top,8);
					.rem(margin-left,20);
					.rem(line-height,54);
					.rem(font-size,24);
					color: #fff;
					text-align: center;
					.border-radius(10);
					background: #ed7631;
				}
				.action {
					background: #b5b5b6;
				}
			}
		}
		.plan-img {
			width: 100%;
			.rem(padding-top,15);
			.rem(padding-bottom,15);
			.img-box {
				width: 100%;
				.img-btn {
					.rem(width,128);
					.rem(height,128);
					overflow: hidden;
					img {
						width: 100%;
					}
				}
			}
		}
		.budget {
			.leftTxt {
				float: left;
				.rem(width,200);
				.rem(font-size,28);
			}
			.leftInp {
				width: 100%;
				.rem(padding-left,250);
				input {
					width: 100%;
					.rem(height,70);
					.rem(font-size,24);
					color: #666;
					border: 0;
					outline: none;
					background: #fff;
				}
			}
		}
		.textarea {
			.rem(height,160);
			textarea {
				width: 100%;
				.rem(height,158);
				.rem(padding-top,25);
				.rem(padding-bottom,25);
				.rem(font-size,24);
				color: #999;
				border: 0;
				resize: none;
				outline: none;
			}
		}
		.feel {
			width: 100%;
			p {
				width: 100%;
				.rem(height,70);
				.rem(line-height,70);
				.rem(font-size,28);
			}
			.img-box {
				.rem(margin-top,9);
				.rem(margin-bottom,23);
				overflow: hidden;
				.btn {
					float: left;
					.rem(width,128);
					.rem(height,128);
					.rem(margin-right,20);
					overflow: hidden;
					img {
						width: 100%;
					}
				}
			}
		}
		.bottom {
			.message {
				.rem(margin-top,20);
				.txt {
					float: left;
					.rem(width,84);
					.rem(font-size,28);
				}
				.bottom-texttrea {
					width: 100%;
					.rem(padding-left,84);
					textarea {
						width: 100%;
						.rem(height,104);
						.rem(padding,20);
						.rem(font-size,24);
						border: 0;
						.border-radius(10);
						resize: none;
						background: #eee;
						outline: none;
					}
				}
			}
			.bottom-btn {
				.rem(margin-top,60);
				text-align: center;
				span {
					display: inline-block;
					.rem(width,188);
					.rem(height,60);
					.rem(line-height,60);
					.rem(font-size,24);
					text-align: center;
					color: #fff;
					.border-radius(10);
					background: #b5b5b6;
				}
				.submit {
					.rem(margin-left,30);
					background: #ed7631;
				}
			}
		}
		.layer {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 5000;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.68);
			.mask {
				position: fixed;
				top: 50%;
				left: 50%;
				z-index: 1500;
				.rem(width,598);
				.rem(height,838);
				.rem(padding-top,35);
				.rem(padding-left,39);
				.rem(padding-right,39);
				color: #333;
				.border(border,1,#000);
				.border-radius(50);
				background: #fff;
				transform: translate(-50%,-50%);
			}
			.check {
				.rem(width,80);
				.rem(height,80);
				margin: 0 auto;
				.rem(margin-bottom,20);
				img {
					width: 100%;
				}
			}
			.p1 {
				width: 100%;
				.rem(margin-bottom,40);
				.rem(line-height,50);
				.rem(font-size,28);
				color: #333;
			}
			.p2 {
				width: 100%;
				.rem(font-size,30);
				text-align: center;
			}
			.list {
				width: 100%;
				.rem(margin-top,40);
				i {
					display: inline-block;
					.rem(width,30);
					.rem(height,32);
					background-size: 100% 100%;
					background-repeat: no-repeat;
					vertical-align: middle;
				}
				span {
					display: inline-block;
					.rem(margin-left,12);
					.rem(font-size,24);
					vertical-align: middle;
				}
			}
			.i1 {
				background-image: url(./image/icon_1.png);
			}
			.i2 {
				background-image: url(./image/icon_2.png);
			}
			.i3 {
				background-image: url(./image/icon_3.png);
			}
			.i4 {
				background-image: url(./image/icon_4.png);
			}
			.i5 {
				background-image: url(./image/icon_5.png);
			}
			.layer-btn {
				.rem(width,218);
				.rem(height,60);
				margin: 0 auto;
				.rem(margin-top,40);
				.rem(line-height,60);
				.rem(font-size,28);
				color: #fff;
				text-align: center;
				.border-radius(12);
				background-color: #ed7631;
			}
		}
	}
</style>
