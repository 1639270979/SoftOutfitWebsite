<template>
	<div id="invoice" v-if="isInvoice">
		<div class="invoice-header">
			<div class="navbar">
				<div class="back" @click="backFun"><span class="icon-back"></span></div>
				<div class="img"><img src="./image/LOGO.png"></div>
				<div class="right">
					<router-link to="/search" tag="div" class="serch-box"><span class="icon-search"></span></router-link>
				</div>
			</div>
		</div>
		<p class="invoice-title">发票信息</p>
		<div class="invoice-content">
			<p class="title">发票类型</p>
			<div class="tab-box">
				<span
					class="tab"
					:class="isinvoice == 2 ? 'action' : ''"
					@click="isinvoice = 2">不开发票</span>
				<span
					class="tab"
					:class="isinvoice == 1 ? 'action' : ''"
					@click="isinvoice = 1">普通发票</span>
				<span
					class="tab"
					:class="isinvoice == 3 ? 'action' : ''"
					@click="isinvoice = 3">电子发票</span>
			</div>
			<div class="gray-box-8"></div>
		</div>
		<div class="invoice-content" v-if="isinvoice != 2">
			<p class="title">发票抬头</p>
			<div class="tab-box">
				<span
					class="tab"
					:class="invoiceType == 1 ? 'action' : ''"
					@click="invoiceType = 1">个人</span>
				<span
					class="tab"
					:class="invoiceType == 2 ? 'action' : ''"
					@click="invoiceType = 2">企业</span>
			</div>
			<div class="inp-box" v-if="invoiceType == 2">
				<div class="inp">
					<span class="txt">发票抬头</span>
					<input type="text" placeholder="填写发票抬头" v-model="invoice_title" @focus="focusFun" @blur="blurFun">
				</div>
				<div class="inp">
					<span class="txt">纳税人识别号</span>
					<input type="text" placeholder="填写纳税人识别号" v-model="duty_num" @focus="focusFun" @blur="blurFun">
				</div>
			</div>
			<div class="gray-box-8"></div>
		</div>
		<div class="invoice-content" v-if="isinvoice == 3">
			<p class="title">收票人信息</p>
			<div class="inp-box">
				<div class="inp">
					<span class="txt">*&nbsp;收票人手机</span>
					<input type="tel" placeholder="填写手机号码" v-model="invoice_mobile" @focus="focusFun" @blur="blurFun">
				</div>
				<div class="inp">
					<span class="txt">*&nbsp;收票人邮箱</span>
					<input type="text" placeholder="填写邮箱" v-model="invoice_email" @focus="focusFun" @blur="blurFun">
				</div>
			</div>
			<div class="gray-box-8"></div>
		</div>
		<div class="invoice-content" v-if="isinvoice != 2">
			<p class="title">发票内容</p>
			<div class="tab-box">
				<span
					class="tab"
					:class="invoice_content == 1 ? 'action' : ''"
					@click="invoice_content = 1">商品明细</span>
				<span
					class="tab"
					:class="invoice_content == 2 ? 'action' : ''"
					@click="invoice_content = 2">商品类型</span>
			</div>
			<p class="synopsis" v-if="invoice_content == 1">发票内容将显示详细商品名称及价格信息</p>
			<p class="synopsis" v-else>发票内容将显示本单商品所属类别</p>
		</div>
		<div class="btn" @click="confirmFun" v-if="isBtn">确定</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: ['isInvoice','isinvoice','invoiceType','invoice_title','duty_num','invoice_mobile','invoice_email','invoice_content'],
		data() {
			return {
				isBtn: true,
				time: ''
			}
		},
		methods: {
			backFun: function() {
				this.$emit('update:isInvoice',false);
			},
			confirmFun: function() {
				if (this.isinvoice == 1) {	//发票类型1的情况
					let B = this.invoiceTypeFun();
					if (!B) return false;
				}else if (this.isinvoice == 3) {
					let B = this.invoiceTypeFun();
					if (!B) return false;
					if (!(/^1[3|4|5|6|7|8|9]{1}\d{9}$/.test(this.invoice_mobile))) {
						this.txtPromptFun('票人手机号格式有误');
						return false;
					}
					if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.invoice_email))) {
						this.txtPromptFun('收票人邮箱格式有误');
						return false;
					}
				}
				this.$emit('update:isinvoice',this.isinvoice);//发票类型
				this.$emit('update:invoiceType',this.invoiceType);//抬头类型
				this.$emit('update:invoice_title',this.invoice_title);//发票抬头
				this.$emit('update:duty_num',this.duty_num);//纳税人识别号
				this.$emit('update:invoice_mobile',this.invoice_mobile);//手机号
				this.$emit('update:invoice_email',this.invoice_email);//邮箱
				this.$emit('update:invoice_content',this.invoice_content);//商品明细或类型
				this.$emit('update:isInvoice',false);
			},
			invoiceTypeFun: function() {
				if (this.invoiceType == 2) { //发票抬头类型2的情况
					if (!(/^[a-zA-Z\s\d\u4e00-\u9fa5]{2,16}$/.test(this.invoice_title))) {
						this.txtPromptFun('发票抬头为2-16位');
						return false;
					}
					if(!(/\S/.test(this.invoice_title))){
            this.txtPromptFun('发票抬头不能为空');
            return false;
          }
					if (!(/\S/.test(this.duty_num))) {
						this.txtPromptFun('纳税人识别号不能为空');
						return false;
					}
					if(!(/^[A-Z0-9]{15}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(this.duty_num))){
            this.txtPromptFun('请输入正确的纳税人识别号');
            return false;
          }
				}
				return true;
			},
			txtPromptFun: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1000);
			},
			focusFun: function() {
				//this.isBtn = false;
			},
			blurFun: function() {
				//this.isBtn = true;
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#invoice {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 5000;
		width: 100%;
		height: 100%;
		background: #eee;
		overflow-y: auto;
		.invoice-header {
			.navbar {
				position: relative;
				width: 100%;
				height: 44px;
				background: #fff;
				> div {
					height: 100%;
				}
				.back {
					position: absolute;
					display: flex;
					width: 41px;
					height: 44px;
					align-items: center;
					justify-content: center;
					.icon-back {
						display: inline-block;
						width: 11px;
						height: 19px;
						background: url(./image/back.png) no-repeat;
						background-size: 100% 100%;
					}
				}
				.img {
					float: left;
					margin-left: 12px;
					padding-left: 60px;
					line-height: 44px;
					img {
						display: inline-block;
						width: 102px;
						vertical-align: middle;
					}
				}
				.right {
					position: absolute;
					right: 0;
					top: 0;
					> div {
						float: right;
					}
				}
				.serch-box,.set {
					display: flex;
					width: 39px;
					height: 100%;
					align-items: center;
					justify-content: center;
				}
				.icon-search {
					display: inline-block;
					width: 17px;
					height: 17px;
					background: url(./image/search.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.invoice-title {
			width: 100%;
			.rem(height,70);
			.rem(margin-bottom,2);
			.rem(line-height,70);
			.rem(font-size,32);
			text-align: center;
			background: #fff;
		}
		.invoice-content {
			width: 100%;
			.rem(padding-top,10);
			.rem(padding-left,30);
			background: #fff;
			.title {
				width: 100%;
				.rem(height,80);
				.rem(line-height,80);
				.rem(font-size,32);
			}
			.tab-box {
				.rem(padding-bottom,30);
				overflow: hidden;
				.tab {
					float: left;
					.rem(width,178);
					.rem(height,54);
					.rem(margin-right,30);
					.rem(line-height,52);
					.rem(font-size,28);
					color: #999;
					text-align: center;
					.border(border,2,#999);
					.border-radius(5);
				}
				.action {
					color: #ed7631;
					border-color: #ed7631;
				}
			}
			.inp {
				width: 100%;
				.rem(font-size,28);
				color: #666;
				.border(border-top,2,#eee);
				overflow: hidden;
			}
			.txt {
				position: relative;
				z-index: 5;
				float: left;
				.rem(width,180);
				.rem(line-height,70);
			}
			input {
				width: 100%;
				.rem(height,70);
				.rem(margin-left,-180);
				.rem(padding-left,200);
				.rem(padding-right,30);
				outline: none;
			}
			.synopsis {
				width: 100%;
				.rem(padding-bottom,17);
				.rem(font-size,22);
				color: #999;
			}
			.gray-box-8{
				width: 100%;
				height: 4px;
				background: #eee;
			}
		}
		.btn {
			position: absolute;
			bottom: 10px;
			left: 50%;
			z-index: -1;
			.rem(width,280);
			.rem(height,60);
			 .rem(margin-left,-140);
			.rem(line-height,60);
			.rem(font-size,28);
			color: #fff;
			text-align: center;
			.border-radius(10);
			background: #ed7631;
		}
	}
</style>
