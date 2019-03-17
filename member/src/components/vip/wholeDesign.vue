<template>
	<div id="wholeDesign">
		<p class="title">提交整屋装修设计需求</p>
		<ul>
			<li class="inp">
				<span class="txt"><i>*</i>您的姓名</span>
				<div><input type="text" v-model.trim="name"></div>
			</li>
			<li class="inp">
				<span class="txt"><i>*</i>联系电话</span>
				<div><input type="tel" v-model.trim="mobile"></div>
			</li>
			<li class="inp">
				<span class="txt">联系QQ</span>
				<div><input type="tel" v-model="qq"></div>
			</li>
			<li class="inp">
				<span class="txt"><i>*</i>房屋所在地</span>
				<div class="choice">
					<input id="adr" name="area" class="region-btn" type="text" readonly/>
					<input id="adrVal" type="hidden" name="area_id"/>
					<input id="city" type="hidden" name="city_id"/>
					<i class="icon-right"></i>
				</div>
			</li>
			<li class="textarea">
				<textarea placeholder="请填写您的详细地址，不少于5个字" v-model="address"></textarea>
			</li>
			<li class="inp">
				<span class="txt"><i>*</i>面积</span>
				<div class="choice" @click="pleasePopupShow('acreage')">{{ acreage }}<i class="icon-right"></i></div>
			</li>
			<!--  v-if="statusObj.acreage > 1" -->
			<li class="acreage-money" v-if="statusObj.acreage > 1">
				您已选择面积{{ acreage }}，还需支付 <span>{{ house_money }}</span> 元<i class="icon-doubt" @click="isDoubt = true"></i>
			</li>
			<li class="inp">
				<span class="txt"><i>*</i>平面图</span>
				<div class="right-plan">
					<span :class="isPlane == false ? 'action':''" @click="isPlane = false">无平面图</span>
					<span :class="isPlane == true ? 'action':''" @click="isPlane = true">有平面图</span>
				</div>
			</li>
			<li class="plan-img" v-show="isPlane">
				<div class="img-box" id="planBox">
					<div class="img-btn" id="planBoxBtn"><img src="./image/addImg.jpg" id="planImg"></div>
				</div>
			</li>
			<li class="inp">
				<span class="txt">装修价格预算</span>
				<div class="choice" @click="pleasePopupShow('expectPrice')">{{ expect_price }}<i class="icon-right"></i></div>
			</li>
			<li class="inp">
				<p class="p1">期望设计风格的表述</p>
			</li>
			<li class="textarea">
				<textarea placeholder="喜欢实木家具，北欧风格" v-model="expect_style"></textarea>
			</li>
			<li class="message">
				<span>留言</span>
				<div><textarea v-model="message"></textarea></div>
			</li>
		</ul>
		<div class="prompt">
			<p class="p1">大美设计中心私人定制部位于广东深圳，线下一对一服务说明：</p>
			<p class="p2">沟通说明：</p>
			<p class="p3"><i></i>请您亲往大美设计中心私人定制部进行沟通；</p>
			<p class="p3"><i></i>大美设计师与您进行视频沟通；</p>
			<p class="p2">服务说明：</p>
			<p class="p3"><i></i>大美设计师免费现场服务1次，但如果在异地需客户提前准备差旅费；</p>
			<p class="p3"><i></i>如需增加设计师现场服务次数，2次后按2000元/次，每次不超过2天。</p>
		</div>
		<div class="bottom-btn">
			<span class="close" @click="close">取消</span><span @click="submitFun">提交给VIP会员专属客服</span>
		</div>
		<div class="popout" v-if="isDoubt">
			<div class="mask">
				<p class="p1">住宅平层户型面积收费说明</p>
				<p class="p2">150㎡以内     VIP会员免费</p>
				<p class="p2">150㎡-200㎡ 会员年费的40%</p>
				<p class="p2">201㎡-235㎡ 会员年费的80%</p>
				<p class="p2">236㎡-270㎡ 会员年费的120%</p>
				<p class="p2">271㎡-300㎡ 会员年费的160%</p>
				<p class="p2">301㎡-400㎡ 会员年费的200%</p>
				<p class="p2">400㎡以上  超出“大美软装VIP会员免费设计服务”范围</p>
				<div class="layer-btn"><div class="btn" @click="isDoubt = false">确定</div></div>
			</div>
		</div>
		<pleasePopup
			:isShow="isShow"
			@update:isShow="val => isShow = val"
			:status="status"
			:statusObj="statusObj"
			@update:statusObj="val => statusObj = val"></pleasePopup>
	</div>
</template>
<script>
	import './js/qiniu.min.js';
	import { areaJson,vipInfo,vipAddOrder } from '../../common/axios/api.js';
	import pleasePopup from './pleasePopup.vue';
	import LArea from './js/LArea.js';
	export default {
		data() {
			return {
				token: '',
				name: '',
				mobile: '',
				qq: '',
				province: [],
				city: {},
				area: {},
				address: '',
				isShow: false,
				status: 'acreage',
				statusObj  : {
					acreage: 1, //房屋面积
					expectPrice: 0	//期望软装价格
				},
				isPlane: true,
				planer_graph: '',
				expect_style: '',
				message: '',
				isDoubt: false
			}
		},
		components: {
			pleasePopup
		},
		methods: {
			ajaxFun: function() {
				vipInfo().then(data => {
					this.token = data.token;
					this.upImg();
				})
			},
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
			submitFun: function() {
        if (!(/^[a-zA-Z\s\u4e00-\u9fa5]{2,16}$/.test(this.name))) {
          this.txtPrompt('姓名为2-16位且不能为数字');
        }else if(!(/\S/.test(this.name))){
          this.txtPrompt('姓名不能为空');
        }else if (!(/^1[3|4|5|7|8]{1}\d{9}$/.test(this.mobile))) {
					this.txtPrompt('联系电话有误',1500);
        }else if (document.getElementById('adrVal').value == '') {
					this.txtPrompt('请选择房屋所在地')
				}else if (!(/\S/.test(this.address))) {
					this.txtPrompt('详细地址不能为空')
				}else if(this.address.length<5){
          this.txtPrompt('详细地址不能低于五个字')
        }else if (this.planer_graph == '' && this.isPlane) {
					this.txtPrompt('请上传平面图')
				}else {
					let obj = {
						type: 1,
						name: this.name,
						mobile: this.mobile,
						qq: this.qq,
						area_id: document.getElementById('adrVal').value,
						address: this.address,
						acreage: this.statusObj.acreage,
						planer_graph: this.planer_graph,
						expect_price: this.statusObj.expectPrice,
						expect_style: this.expect_style,
						message: this.message
					};
					vipAddOrder(obj).then(data => {
						if (data.status) {
							if (data.need_pay) {
								//let money = 10000 * (this.statusObj.acreage - 1);
								this.$router.replace({ path: '/orderPay',query:{oid:data.oid,'type':'vip_design_pay','money':house_money}});
							}else {
								this.$router.replace({ path: '/vip/vipOrderDet/'+data.oid});
							}
						}else {
							this.$store.state.publicJS.promptBoxMsg = data.msg;
							this.$store.dispatch('alertPrompt');
						}
					});
				}
			},
			txtPrompt: function(str) {
        this.$store.state.publicJS.promptBoxMsg = str;
        this.$store.commit('txtPrompt');
        setTimeout(() => {
          this.$store.commit('txtPrompt');
        },1000);
			},
			pleasePopupShow: function(status) {
				this.status = status;
				this.isShow = true;
			},
			close: function() {
				this.$router.go(-1);
			}
		},
		computed: {
			acreage: function() { //房屋面积
				let status = this.statusObj.acreage;
				if (status == 1) {
					return '150m²以下';
				}else if (status == 2) {
					return '150m²-200m²';
				}else if (status == 3) {
					return '201m²-235m²';
				}else if (status == 4) {
					return '236m²-270m²';
				}else if (status == 5) {
					return '271m²-300m²';
				}else {
					return '301m²-400m²';
				}
			},
			expect_price: function() { //期望软装价格
				let status = this.statusObj.expectPrice;
				if (status == 1) {
					return '不限';
				}else if (status == 2) {
					return '≤10000';
				}else if (status == 3) {
					return '10001-50000';
				}else {
					return '≥50000';
				}
			},
			house_money: function() {	//房屋价格
				if (this.statusObj.acreage == 2) {
					return 5000
				}else if (this.statusObj.acreage == 3) {
					return 10000
				}else if (this.statusObj.acreage == 4) {
					return 15000
				}else if (this.statusObj.acreage == 5) {
					return 20000
				}else if (this.statusObj.acreage == 1) {
					return 0
				}else {
					return 25000
				}
			}
		},
		created() {
			this.ajaxFun();
			this.areaJson();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	@import './css/LArea.min.css';
	#wholeDesign {
		.rem(padding-bottom,40);
		.title {
			width: 100%;
			.rem(height,72);
			.rem(line-height,70);
			.rem(font-size,32);
			text-align: center;
			.border(border-bottom,2,#eee);
		}
		.inp {
			width: 100%;
			.rem(height,72);
			.rem(padding-right,28);
			.border(border-bottom,2,#eee);
			.txt {
				position: relative;
				float: left;
				.rem(width,220);
				.rem(height,70);
				.rem(padding-left,40);
				.rem(line-height,70);
				.rem(font-size,28);
				i {
					position: absolute;
					.rem(left,15);
					.rem(font-size,24);
					color: #ed7631;
					font-style: normal;
				}
			}
			input {
				margin: 0;
				padding: 0;
				border: 0;
				outline: none;
			}
			> div {
				position: relative;
				.rem(padding-left,220);
				.rem(height,70);
				.rem(line-height,70);
				.rem(font-size,24);
				color: #666;
				input {
					float: left;
					width: 100%;
					height: 100%;
					.rem(font-size,24);
					background: #fff;
				}
				.icon-right {
					position: absolute;
					right: 0;
					.rem(top,23);
					.rem(width,13);
					.rem(height,24);
					background: url(./image/icon-right_1.png) no-repeat;
					background-size: 100% 100%;
				}
			}
			.choice {
				.rem(padding-right,33);
				text-align: right;
				#adr {
					display: inline-block;
					text-align: right;
				}
				#adrVal {
					position: absolute;
					left: -99999px;
				}
			}
			.right-plan {
				span {
					float: right;
					.rem(width,128);
					.rem(height,54);
					.rem(margin-left,10);
					.rem(margin-top,8);
					.rem(line-height,54);
					.rem(font-size,24);
					color: #fff;
					text-align: center;
					.border-radius(10);
					background: #b5b5b6;
				}
				.action {
					background: #ed7631;
				}
			}
			.p1 {
				.rem(height,70);
				.rem(padding-left,40);
				.rem(line-height,70);
				.rem(font-size,28);
			}
		}
		.acreage-money {
			position: relative;
			width: 100%;
			.rem(height,72);
			.rem(padding-left,40);
			.rem(line-height,72);
			.rem(font-size,24);
			color: #666;
			.border(border-bottom,2,#eee);
			span {
				color: #ed7631;
			}
			.icon-doubt {
				position: absolute;
				.rem(top,19);
				.rem(right,30);
				.rem(width,32);
				.rem(height,32);
				background: url(./image/doubt.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.textarea {
			width: 100%;
			.rem(height,142);
			.rem(padding-left,40);
			.rem(padding-right,40);
			.border(border-bottom,2,#eee);
			textarea {
				width: 100%;
				height: 100%;
				.rem(padding-top,24);
				.rem(font-size,24);
				color: #999;
				border: 0;
				resize: none;
				outline: none;
			}
		}
		.plan-img {
			width: 100%;
			.rem(padding-top,15);
			.rem(padding-bottom,15);
			.rem(padding-left,40);
			.border(border-bottom,2,#eee);
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
		.message {
			width: 100%;
			.rem(height,150);
			.rem(padding-top,20);
			.rem(padding-left,40);
			.rem(padding-right,40);
			.border(border-bottom,2,#eee);
			span {
				float: left;
				.rem(width,80);
				.rem(font-size,28);
			}
			div {
				width: 100%;
				.rem(height,104);
				.rem(padding-left,80);
				textarea {
					width: 100%;
					height: 100%;
					font-size: 12px;
					border: 0;
					border-radius: 5px;
					resize: none;
					outline: none;
					background: #eee;
				}
			}
		}
		.prompt {
			width: 100%;
			.rem(padding-left,40);
			.rem(padding-right,40);
			.rem(padding-bottom,55);
			letter-spacing: 2px;
			.p1 {
				.rem(margin-top,35);
				.rem(font-size,22);
				.font-family-m();
				letter-spacing: 1.5px;
			}
			.p2 {
				.rem(margin-top,40);
				.rem(font-size,24);
				.font-family-m();
			}
			.p3 {
				.rem(margin-top,20);
				.rem(line-height,49);
				.rem(font-size,24);
				i {
					display: inline-block;
					.rem(width,6);
					.rem(height,6);
					.rem(margin-left,10);
					.rem(margin-right,10);
					background: url(./image/spot.png) no-repeat;
					background-size: 100% 100%;
					vertical-align: middle;
				}
			}
		}
		.bottom-btn {
			.rem(margin-top,40);
			text-align: center;
			span {
				display: inline-block;
				.rem(width,288);
				.rem(height,60);
				.rem(line-height,60);
				.rem(font-size,24);
				color: #fff;
				.border-radius(10);
				background: #ed7631;
			}
			.close {
				.rem(margin-right,32);
				background: #b5b5b6;
			}
		}
		.popout {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1000;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.6);
			.mask {
				position: fixed;
				top: 50%;
				left: 50%;
				.rem(width,600);
				.rem(height,800);
				.rem(padding-top,40);
				.rem(padding-left,40);
				.rem(padding-right,50);
				.border-radius(20);
				background-color: #fff;
				transform: translate(-50%,-50%);
			}
			.p1 {
				.rem(margin-bottom,20);
				.rem(line-height,50);
				.rem(font-size,28);
				letter-spacing: 1.5px;
			}
			.p2 {
				.rem(margin-bottom,20);
				.rem(line-height,50);
				.rem(font-size,26);
				letter-spacing: 1.5px;
			}
			.layer-btn {
				position: absolute;
				.rem(bottom,50);
				left: 0;
				width: 100%;
				.rem(padding-left,40);
				.rem(padding-right,50);
				.btn {
					width: 100%;
					.rem(height,70);
					.rem(line-height,70);
					.rem(font-size,24);
					color: #fff;
					text-align: center;
					background-color: #ed7631;
				}
			}
		}
	}
</style>
