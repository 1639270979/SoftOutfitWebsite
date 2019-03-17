<template>
	<div id="adres">
		<div class="themes">收货地址</div>
		<div class="list">
			<ul>
				<li v-for="item in address">
					<div class="info">
						<div class="top">
							<div class="name"><span class="txt">收件人：</span>{{ item.recevier }}</div>
							<div class="tel"><span class="txt">联系方式：</span>{{ item.mobile }}</div>
						</div>
						<div class="bottom"><span class="txt">收货地址：</span>{{ item.address }}</div>
					</div>
					<div class="operation">
						<div class="left">
							<label :for="'s'+item.address_id" @change="radioFun(item.address_id)">
								<div>
									<input type="radio"
										:id="'s'+item.address_id"
										:value="item.address_id"
										v-model="picked">
									<span></span>
								</div>
							</label>
						</div>
						<div class="left-txt">默认地址</div>
						<div class="right">
							<div class="det" @click="addAdreFun(item.address_id)"><span class="icon icon-det"></span><span class="txt">编辑</span></div>
							<div class="del" @click="delAdreFun(item.address_id)"><span class="icon icon-del"></span><span class="txt">删除</span></div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="bottom-btn"><div @click="addFun('')"><span class="icon-add"></span><span class="txt">新建地址</span></div></div>
		<adrPopup
			:isShowAdd="isShowAdd"
			@update:isShowAdd="val => isShowAdd = val"
			:address="address"
			@update:address="val => address = val"
			:aid="aid"></adrPopup>
		<confirmPrompt
			@rightBtn="delAjaxFun"></confirmPrompt>
	</div>
</template>
<script>
	import { adresList,adrDelete,adrSetDefault } from '../../common/axios/api.js';
	import adrPopup from './adrPopup.vue';
	export default {
		data() {
			return {
				address  : [],
				picked   : '',
				isShowAdd: false,
				aid      : ''
			}
		},
		components: {
			adrPopup
		},
		methods: {
			ajaxFun: function() {
				adresList().then(data => {
					for (var i = 0; i < data.addressList.length; i++) {
						this.address.push(data.addressList[i]);
						if (data.addressList[i].isdefault == 1) {
							this.picked = data.addressList[i].address_id;
						}
					}
				})
			},
			addFun: function(aid) {
				this.aid  = aid;
				this.isShowAdd = true;
			},
			addAdreFun: function(aid) {
				this.aid  = aid;
				this.isShowAdd = true;
			},
			delAdreFun: function(aid) {//删除
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
						this.address = arr;
					}else {
						this.isTxtShow = true;
						this.msg = data.msg;
						setTimeout(() => {
							this.isTxtShow = false;
						},1000);
					}
				})
			},
			radioFun: function(id) {
				let obj = {'aid':id};
				adrSetDefault(obj).then(data => {
					if (data.code == 1) {
						this.isTxtShow = true;
						this.msg = data.message;
						setTimeout(() => {
							this.isTxtShow = false;
						},1000);
					}else {
						this.isTxtShow = true;
						this.msg = data.message;
						setTimeout(() => {
							this.isTxtShow = false;
						},1000);
					}
				})
			}
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#adres {
		.rem(min-height,1136);
	}
	.themes {
		width: 100%;
		.rem(height,80);
		.rem(margin-top,2);
		.rem(margin-bottom,2);
		.rem(line-height,80);
		.rem(font-size,26);
		color: #333;
		text-align: center;
		background: #fff;
	}
	.list {
		.rem(padding-bottom,98);
		li {
			width: 100%;
			.rem(margin-bottom,6);
			.rem(padding-top,26);
			.rem(padding-left,30);
			.rem(padding-right,30);
			background: #fff;
			overflow: hidden;
			&:last-of-type {
				margin-bottom: 0;
			}
		}
		.info {
			.rem(padding-bottom,26);
			.border(border-bottom,2,#eee);
		}
		.top {
			.rem(margin-bottom,28);
			font-size: 0;
			> div {
				display: inline-block;
				.rem(line-height,24);
			}
		}
		.name {
			.rem(width,238);
		}
		.name,.tel,.bottom {
			display: inline-block;
			.rem(font-size,24);
			color: #333;
			> span {
				color: #999;
			}
		}
		.operation {
			width: 100%;
			.rem(height,68);
			.rem(line-height,68);
			.left {
				position: relative;
				.rem(width,30);
				.rem(height,68);
				display: inline-block;
				font-size: 0;
				label {
					width: 100%;
					height: 100%;
				}
				div {
					display: flex;
					width: 100%;
					height: 100%;
					align-items: center;
					justify-content: center;
				}
				input {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 10;
					.rem(width,114);
					.rem(height,68);
					opacity: 0;
				}
				span {
					display: inline-block;
					.rem(width,30);
					.rem(height,30);
					background: url(./image/round_check1.png) no-repeat;
					background-size: 100% 100%;
				}
				input:checked + span {
					background-image: url(./image/round_check.png);
				}
			}
			.left-txt {
				display: inline-block;
				.rem(margin-left,10);
				.rem(line-height,68);
				.rem(font-size,24);
				color: #999;
				vertical-align: top;
			}
			.right {
				float: right;
				> div {
					display: inline-block;
					.rem(height,68);
					.rem(line-height,68);
				}
			}
		}
		.txt {
			display: inline-block;
			.rem(font-size,24);
			color: #999;
			vertical-align: middle;
		}
		.icon {
			display: inline-block;
			.rem(width,30);
			.rem(height,30);
			.rem(margin-right,12);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			vertical-align: middle;
		}
		.del {
			.rem(margin-left,32);
		}
		.icon-det {
			background-image: url(./image/post.png);
		}
		.icon-del {
			background-image: url(./image/delete.png);
		}
	}
	.bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		.rem(padding,14);
		.rem(padding-right,30);
		.rem(padding-left,30);
		background: #fff;
		> div {
			width: 100%;
			.rem(height,70);
			.rem(line-height,70);
			text-align: center;
			.border-radius(10);
			background: #d65317;
			span {
				vertical-align: middle;
			}
		}
		.icon-add {
			display: inline-block;
			.rem(width,39);
			.rem(height,38);
			.rem(margin-right,15);
			background: url(./image/round_add.png) no-repeat;
			background-size: 100% 100%;
		}
		.txt {
			.rem(font-size,26);
			color: #fff;
		}
	}
</style>
