<template>
	<div id="addAdrPopup" v-if="isShowAdd" @touchmove.prevent>
		<div class="popout">
			<div class="title">
				<span class="left" @click="backFun"><i class="icon-left"></i></span>
				<p>添加新地址</p>
				<span class="right" @click="saveFun">保存</span>
			</div>
			<div class="edit">
				<ul>
					<li>
						<div class="txt">收货人</div>
						<div class="inp"><input type="text" v-model.trim="name"></div>
					</li>
					<li>
						<div class="txt">联系电话</div>
						<div class="inp"><input type="tel" v-model.trim="tel"></div>
					</li>
					<li>
						<div class="txt">所在地区</div>
						<div class="address">
							<input id="adr"
                     name="area"
                     class="region-btn"
                     type="text"
                     readonly="readonly"
                     placeholder="点击选择"
                     :vaule="adr"/>
							<input id="adrVal" type="hidden" name="area_id"/>
							<span class="icon-right"></span>
						</div>
					</li>
					<li class="textarea">
						<textarea placeholder="请填写详细地址" v-model="detailed"></textarea>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import { areaJson,adrSave } from '../../common/axios/api.js';
	import LArea from './js/LArea.js';
	export default {
		props: ['isShowAdd','address','aid'],
		data() {
			return {
				province : [],
				city     : {},
				area     : {},
				name       : '',
				tel        : '',
				adr        : '',
				detailed   : ''
			}
		},
		watch: {
			'isShowAdd': function() {
				this.areaJson();
			}
		},
		methods: {
			backFun: function() {
				this.$emit('update:isShowAdd',false);
				//this.$emit('update:isShowAdre',true);
			},
			saveFun: function() {
				let adrVal = document.getElementById('adrVal').value;
				if (!(/^[a-zA-Z\s\u4e00-\u9fa5]{2,16}$/.test(this.name))) {
					this.textFun('姓名为2-16位且不能为数字');
				}else if(!(/\S/.test(this.name))){
          this.textFun('姓名不能为空');
        }else if (!(/^1[3|4|5|6|7|8|9]{1}\d{9}$/.test(this.tel))) {
					this.textFun('输入正确的手机号码');
				}else if (adrVal === '') {
					this.textFun('地区不能留空');
				}else if (!(/\S/.test(this.detailed))) {
					this.textFun('详细地址不能留空');
				}else {
					if (this.aid) {//编辑
						let obj = {'recevier':this.name,'mobile':this.tel,'area_id':adrVal,'address':this.detailed,'aid':this.aid};
						adrSave(obj).then(data => {
							if (data.code === 1) {
								let adr = document.getElementById('adr');
								let adrVal = document.getElementById('adrVal');
                console.log(this.address);
                for (var i = 0; i < this.address.length; i++) {
									if (this.address[i].address_id == data.address_id) {
										this.address[i].mobile = this.tel;
										this.address[i].recevier = this.name;
										this.address[i].area_name = adr.value;
										this.address[i].area_id = adrVal.value;
										this.address[i].adr = this.detailed;
										this.address[i].address = adr.value + this.detailed;
									}
								}
								this.$emit('update:address',this.address);
								this.$emit('update:isShowAdd',false);
								this.Initialization();
                this.textFun('保存成功');
							}
						})
					}else {//添加
						let obj = {'recevier':this.name,'mobile':this.tel,'area_id':adrVal,'address':this.detailed};
						adrSave(obj).then(data => {
							if (data.code === 1) {
								let obj = data.info;
								obj['adr'] = data.info.address;
								obj['address'] = data.info.area_name+data.info.address;
								this.address.push(obj);
								this.$emit('update:isShowAdd',false);
								this.Initialization();
                this.textFun('保存成功');
							}
						})
					}
				}
			},
			areaJson: function() {//获取地址信息
				areaJson().then(data => {
					this.province = [];
					this.editFun();
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
			editFun: function() {//点编辑的时候把内容补上
				if (this.aid) {
					let arr = this.address;
					let adr = document.getElementById('adr');
					let adrVal = document.getElementById('adrVal');
					for (var i = 0; i < arr.length; i++) {
						if (this.aid === arr[i].address_id) {
							this.tel      = arr[i].mobile;
							this.name     = arr[i].recevier;
							adr.value     = arr[i].area_name;
							adrVal.value  = arr[i].area_id;
							this.detailed = arr[i].adr;
						}
					}
				}
			},
			Initialization: function() {//初始化
				let adr       = document.getElementById('adr');
				let adrVal    = document.getElementById('adrVal');
				this.tel      = '';
				this.name     = '';
				adr.value     = '';
				adrVal.value  = '';
				this.detailed = '';
			},
			textFun: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1500);
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	@import './css/LArea.min.css';
	#addAdrPopup {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 100%;
		background: rgba(102,102,102,.8);
		.popout {
			position: fixed;
			top: 50%;
			left: 50%;
			z-index: 1500;
			.rem(width,500);
			.rem(height,680);
			.rem(padding-top,68);
			.border(border,2,#d65317);
			transform: translate(-50%, -50%);
			background: #eee;
			overflow: hidden;
		}
		.title {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			.rem(height,68);
			.rem(font-size,22);
			text-align: center;
			background: #fff;
			p {
				.rem(line-height,68);
			}
			span {
				position: absolute;
				top: 0;
				.rem(width,100);
				.rem(height,68);
				.rem(line-height,68);
			}
			.icon-left {
				display: inline-block;
				.rem(width,16);
				.rem(height,28);
				background: url(./image/back.png) no-repeat;
				background-size: 100% 100%;
    			vertical-align: middle;
			}
			.left {
				left: 0;
			}
			.right {
				right: 0;
				color: #d65317;
			}
		}
		.edit {
			li {
				width: 100%;
				.rem(height,70);
				.rem(padding-left,20);
				.rem(padding-right,20);
				.rem(line-height,70);
				.rem(font-size,24);
				.border(border-top,2,#eee);
				background: #fff;
				overflow: hidden;
				.txt {
					float: left;
					.rem(width,120);
				}
				.inp {
					position: relative;
					width: 100%;
					height: 100%;
					.rem(padding-left,120);
					input {
						width: 100%;
						height: 100%;
						.rem(line-height,70);
						.rem(font-size,24);
						border: 0;
						outline: none;
					}
				}
				.address {
					position: relative;
					width: 100%;
					height: 100%;
					.rem(padding-left,120);
					.region-btn {
						width: 100%;
						height: 100%;
						.rem(padding-right,30);
						.rem(font-size,24);
						color: #ccc;
						text-align: right;
						border: 0;
						outline: none;
						//user-select: none;
					}
					.icon-right {
						position: absolute;
						.rem(top,23);
						right: 0;
						display: inline-block;
						.rem(width,12);
						.rem(height,22);
						background: url(./image/right.png) no-repeat;
						background-size: 100% 100%;
						vertical-align: middle;
					}
				}
			}
			.textarea {
				width: 100%;
				.rem(height,120);
				textarea {
					width: 100%;
					height: 100%;
					padding: 0;
					.rem(padding-top,20);
					.rem(padding-bottom,20);
					.rem(font-size,22);
					color: #333;
					border: 0;
					outline: none;
					resize: none;
				}
			}
		}
	}
</style>
