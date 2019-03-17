<template>
	<div id="vipDesignModify">
		<div class="title">申请修改</div>
		<ul>
			<li v-for="list in modifyList">
				<div class="img"><img :src="list.picture"></div>
				<p class="name">{{ list.space_name }}</p>
				<div class="message"><textarea placeholder="请在此写下您的修改意见" v-model="textareaStr[list.space_id]"></textarea></div>
			</li>
		</ul>
		<div class="add-btn" @click="addModifyFun">
			<div><span class="icon-add"></span></div>
			<p>增加其他空间的修改意见</p>
		</div>

		<div class="modify-popout" v-if="isModify">
			<div class="mask">
				<p class="popoutTitle">您想修改增加其他哪些空间？</p>
				<ul class="list">
					<li v-for="list in spaceList"><div class="check"><input type="checkbox" :value="list.space_id" v-model="check"><span></span></div>{{ list.space_name }}</li>
				</ul>
				<div class="modify-btn">
					<span class="close" @click="isModify = false">取消</span><span @click="confirmFun">确认</span>
				</div>
			</div>
		</div>

		<div class="submit-btn" @click="submitFun">提交申请</div>
	</div>
</template>
<script>
	import { vipDesignCase,vipOrderModify } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				cid: this.$route.params.cid,
				spaceList: [],
				newSpaceList: [],
				check: [],
				modifyList: [],
				textareaStr: {},
				isModify: false
			}
		},
		methods: {
			ajaxFun: function() {
				vipDesignCase(this.cid).then(data => {
					this.spaceList = data.caseInfo.spaceList;
				});
			},
			addModifyFun: function() {
				this.isModify = true;
			},
			confirmFun: function() {
				this.newSpaceList = [];
				this.spaceList.map((val) => {
					if (this.check.indexOf(val.space_id) > -1) {
						this.modifyList.push(val);
					}else {
						this.newSpaceList.push(val);
					}
				});
				this.isModify = false;
				this.spaceList = this.newSpaceList;
			},
			submitFun: function() {
				if (Object.keys(this.textareaStr).length != 0) {
					for (var i = 0; i < this.check.length; i++) {
						if (this.textareaStr[this.check[i]] == undefined) {
							this.txtFun('修改意见不能为空',1000);
							return;
						}
					}
					let obj = {'oid':this.cid,'modify':this.textareaStr}
					vipOrderModify(obj).then(data => {
						if (data.code == 1) {
							this.$store.state.publicJS.promptBoxMsg = data.message;
							this.$store.commit('txtPrompt');
							setTimeout(() => {
								this.$store.commit('txtPrompt');
								this.$router.go(-1);
							},1500);
						}else {
							this.txtFun(data.message,1500);
						}
					});
				}else {
					this.txtFun('修改意见不能为空',1000);
				}
			},
			txtFun: function(str,time) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},time);
			}
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#vipDesignModify {
		.title {
			width: 100%;
			.rem(height,70);
			.rem(line-height,70);
			.rem(font-size,32);
			text-align: center;
			letter-spacing: 2px;
		}
		.img {
			width: 100%;
			.rem(height,470);
			overflow: hidden;
			img {
				width: 100%;
				.rem(min-height,470);
			}
		}
		.name {
			width: 100%;
			.rem(height,70);
			.rem(padding-left,48);
			.rem(padding-right,48);
			.rem(line-height,70);
			.rem(font-size,28);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			letter-spacing: 1px;
		}
		.message {
			width: 100%;
			.rem(padding,30);
			.rem(padding-right,40);
			textarea {
				width: 100%;
				.rem(height,238);
				.rem(padding,25);
				.rem(font-size,24);
				color: #999;
				resize: none;
				outline: none;
				border: 0;
				.border-radius(15);
				background: #eee;
			}
		}
		.add-btn {
			width: 100%;
			.rem(margin-bottom,60);
			.rem(padding-bottom,20);
			text-align: center;
			.icon-add {
				display: inline-block;
				.rem(width,54);
				.rem(height,55);
				.rem(margin-top,20);
				background: url(./image/vip_18.png) no-repeat;
				background-size: 100% 100%;
			}
			p {
				.rem(margin-top,20);
				.rem(font-size,24);
			}
		}
		.submit-btn {
			.rem(width,528);
			.rem(height,70);
			margin: 0 auto;
			.rem(margin-bottom,70);
			.rem(line-height,70);
			.rem(font-size,28);
			color: #fff;
			text-align: center;
			.border-radius(10);
			background: #ed7631;
		}
		.modify-popout {
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
				.rem(width,598);
				.rem(min-height,330);
				.border-radius(20);
				transform: translate(-50%,-50%);
				background: #fff;
			}
			.popoutTitle {
				width: 100%;
				.rem(height,98);
				.rem(padding-left,50);
				.rem(line-height,98);
				.rem(font-size,28);
			}
			.list {
				li {
					position: relative;
					width: 100%;
					.rem(height,82);
					.rem(padding-left,98);
					.rem(line-height,80);
					.rem(font-size,28);
					.border(border-top,2,#eee);
				}
				.check {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 10;
					width: 100%;
					height: 100%;
					input {
						position: absolute;
						top: 0;
						left: 0;
						z-index: 10;
						width: 100%;
						height: 100%;
						margin: 0;
						padding: 0;
						opacity: 0;
					}
					span {
						position: absolute;
						.rem(top,29);
						.rem(left,44);
						.rem(width,26);
						.rem(height,26);
						background: url(./image/case_check.png) no-repeat;
						background-size: 100% 100%;
					}
					input:checked + span {
						background-image: url(./image/case_check_1.png);
					}
				}
			}
			.modify-btn {
				.rem(margin-top,34);
				.rem(margin-bottom,34);
				text-align: center;
				span {
					display: inline-block;
					.rem(width,258);
					.rem(height,60);
					.rem(line-height,60);
					.rem(font-size,24);
					color: #fff;
					.border-radius(10);
					background: #ed7631;
				}
				.close {
					.rem(margin-right,15);
					background-color: #b5b5b6;
				}
			}
		}
	}
</style>