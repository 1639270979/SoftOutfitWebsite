<template>
	<div id="addressPopup" v-if="isShowAdre">
		<div class="popout" v-if="isShow">
			<div class="title">
				<span class="left" @click="backFun"><i class="icon-left"></i></span>
				<p>收货地址</p>
			</div>
			<div class="addAddress" @click="addAdreFun()">
				<span class="icon-add"></span>
				<span>新增收货地址</span>
			</div>
			<div class="list">
				<ul>
					<li v-for="adr in address">
						<div class="top" @click="clickFun(adr.address_id)">
							<p><span class="fl">{{adr.recevier}}</span><span class="fr">{{adr.mobile}}</span></p>
							<div>{{adr.address}}</div>
						</div>
						<div class="bottom">
							<div class="fl">
								<label :for="'s'+adr.address_id" @change="adrDefaultFun">
									<div :class="adr.address_id === radioVal?'action':''">
										<input type="radio" name="adr"
											:id="'s'+adr.address_id"
											:value="adr.address_id"
											v-model="radioVal">
										<span class="icon-radio"></span>
										<span class="txt">{{adr.address_id === radioVal?'默认地址':'设为默认'}}</span>
									</div>
								</label>
							</div>
							<div class="fr">
								<div class="edt" @click="addAdreFun(adr.address_id)">
									<span class="icon icon-edt"></span>
									<span>编辑</span>
								</div>
								<div class="del" @click="delAdreFun(adr.address_id)">
									<span class="icon icon-del"></span>
									<span>删除</span>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<addAdrPopup
			:isShowAdd="isShowAdd"
			@update:isShowAdd="val => isShowAdd = val"
			:address="address"
			@update:address="val => address = val"
			:aid="aid"></addAdrPopup>
		<confirmPrompt
			@rightBtn="delAjaxFun"></confirmPrompt>
	</div>
</template>
<script>
	import { adrSetDefault,areaJson,adrDelete } from '../../common/axios/api.js';
	import addAdrPopup from './addAdrPopup.vue';
	export default {
		props: ['isShowAdre','address'],
		data() {
			return {
				radioVal : '',
				isShowAdd: false,
				type     : '',
				aid      : ''
			}
		},
		watch: {
			'address': function() {
				this.radioFun()
			}
		},
		components: {
			addAdrPopup
		},
		methods: {
			radioFun: function() {
				for (var i = 0; i < this.address.length; i++) {
					if (this.address[i].isdefault == 1) {
						this.radioVal = this.address[i].address_id;
					}
				}
			},
			adrDefaultFun: function() {
				let aid = this.radioVal;
				let obj = {'aid':this.radioVal}
				adrSetDefault(obj).then(data => {
					this.radioVal == ''
					if (data.code === 1) {
						this.radioVal = aid;
						for (var i = 0; i < this.address.length; i++) {
							if (this.address[i].address_id === aid) {
								this.address[i].isdefault = 1;
							}else {
								this.address[i].isdefault = 0;
							}
						}
						this.$emit('update:address',this.address);
					}
				});
			},
			backFun: function() {
				this.$emit('update:isShowAdre',false);
			},
			addAdreFun: function(aid) {
				this.aid  = aid;
				this.isShowAdd = true;
			},
			clickFun: function(id) {
				for (var i = 0; i < this.address.length; i++) {
					if (this.address[i].address_id === id) {
						this.address[i].isdefault = 1;
					}else {
						this.address[i].isdefault = 0;
					}
				}
				this.$emit('update:address',this.address);
				this.$emit('update:isShowAdre',false);
			},
			delAdreFun: function(aid) {
				this.aid = aid;
				this.$store.state.publicJS.promptBoxMsg = '是否确定删除该地址';
				this.$store.state.publicJS.confirmPromptBtnRight = '删除';
				this.$store.commit('confirmPrompt');
			},
			delAjaxFun: function() {
				let isIsdefault = false;
				let obj = {"aid":this.aid}
				adrDelete(obj).then(data => {
					if (data.code === 1) {
						let arr = [];
						for (var i = 0; i < this.address.length; i++) {
							if (this.address[i].address_id == this.aid && this.address[i].isdefault == 1) {
								isIsdefault = true;
							}else if (this.address[i].address_id != this.aid) {
								arr.push(this.address[i]);
							}
						}
						if (isIsdefault && arr != "") {
							arr[0].isdefault = 1;
						}
						this.$emit('update:address',arr);
					}else {
						this.$store.state.publicJS.promptBoxMsg = data.msg;
						this.$store.commit('txtPrompt');
						setTimeout(() => {
							this.$store.commit('txtPrompt');
						},1500);
					}
				})
			},
			areaJson: function() {
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
						'valueTo': '#adrVal',
						'keys': {
							id: 'value',
							name: 'text'
						},
						'type': 2,
						'data': [this.province,this.city,this.area]
					});
				});
			}
		},
		computed: {
			isShow: function() {
				let isShow = false;
				let isShowAdd = this.isShowAdd;
				if (!isShowAdd) {
					isShow = true
				}
				return isShow;
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#addressPopup {
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
			z-index: 1000;
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
		}
		.addAddress {
			.rem(height,68);
			.rem(line-height,68);
			color: #333;
			text-align: center;
			.border(border-top,2,#eee);
			.border(border-bottom,2,#eee);
			background: #fff;
			>span {
				display: inline-block;
				.rem(font-size,22);
				vertical-align: middle;
			}
			.icon-add {
				.rem(width,28);
				.rem(height,28);
				.rem(margin-right,9);
				background: url(./image/add_2.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.list {
			.rem(width,550);
			overflow: auto;
			ul {
				.rem(width,496);
				.rem(height,540);
			}
			li {
				position: relative;
				background: #fff;
				overflow: hidden;
				&:after {
					content: '';
					display: block;
					width: 100%;
					.rem(height,10);
					background: #eee;
				}
			}
			.top {
				.rem(padding-left,32);
				.rem(padding-right,20);
				.rem(padding-top,26);
				.rem(padding-bottom,22);
				color: #333;
				p {
					.rem(margin-bottom,22);
					.rem(font-size,22);
					overflow: hidden;
				}
				div {
					.rem(font-size,22);
				}
			}
			.bottom {
				width: 100%;
				.rem(height,55);
				.rem(padding-right,20);
				.rem(line-height,55);
				.border(border-top,2,#eee);
				overflow: hidden;
				label {
					position: relative;
					display: inline-block;
					.rem(padding-left,32);
					vertical-align: top;
					div {
						font-size: 0;
						vertical-align: top;
					}
					input {
						position: absolute;
						width: 100%;
						height: 100%;
						opacity: 0;
					}
					.icon-radio {
						display: inline-block;
						.rem(width,26);
						.rem(height,26);
						background: url(./image/radio1.png) no-repeat;
						background-size: 100% 100%;
						vertical-align: middle;
					}
					input:checked + .icon-radio {
						background-image: url(./image/radio1_1.png);
					}
					.txt {
						display: inline-block;
						.rem(margin-left,8);
						.rem(font-size,22);
						vertical-align: middle;
					}
					.action {
						color: #d65317;
					}
				}
				.fr {
					font-size: 0;
					> div {
						display: inline-block;
						font-size: 0;
						vertical-align: middle;
					}
					.edt {
						.rem(margin-right,10);
					}
					span {
						display: inline-block;
						.rem(font-size,22);
						vertical-align: middle;
					}
					.icon {
						.rem(width,26);
						.rem(height,26);
						.rem(margin-right,5);
						background-size: 100% 100%;
						background-repeat: no-repeat;
					}
					.icon-del {
						background-image: url(./image/delete.png);
					}
					.icon-edt {
						background-image: url(./image/edit.png);
					}
				}
			}
		}
	}
</style>
