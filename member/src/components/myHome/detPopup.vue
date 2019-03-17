<template>
	<div id="detPopup" v-if="isShow">
		<div class="popout" v-if="type == 1 && !isBool">
			<div class="top">整屋全景效果图套餐</div>
			<div class="content-list">
				<ul>
					<li>
						<div class="txt">所在城市:</div>
						<div class="content">{{ item.city_name+item.area_name}}</div>
					</li>
					<li>
						<div class="txt">所在小区:</div>
						<div class="content">{{ item.house_name }}</div>
					</li>
					<li>
						<div class="txt">所属户型:</div>
						<div class="content">{{ item.name+'　'+item.area }}㎡</div>
					</li>
					<li>
						<div class="txt">套餐包含:</div>
						<div class="package">
							<ul>
								<li>
									<div class="left">{{ item.space_name }}</div>
									<div class="right">X1</div>
								</li>
							</ul>
						</div>
					</li>
					<li>
						<div class="txt">平米单价:</div>
						<div class="content">20/㎡</div>
					</li>
					<li>
						<div class="txt">赠送面积:</div>
						<div class="content">客厅 {{ item.parlour_area}}㎡</div>
					</li>
					<li>
						<div class="txt">套餐价格:</div>
						<div class="money">¥{{ item.pano_price }}</div>
					</li>
					<li>
						<div class="txt">支付方式:</div>
						<div class="payment">
							<label for="wx">
								<div>
									<input type="radio" name="radius" id="wx" checked>
									<span class="icon-y"></span>
									<span class="icon icon-wx"></span>
								</div>
							</label>
							<label for="zfb">
								<div>
									<input type="radio" name="radius" id="zfb">
									<span class="icon-y"></span>
									<span class="icon icon-zfb"></span>
								</div>
							</label>
							<label for="yl">
								<div>
									<input type="radio" name="radius" id="yl">
									<span class="icon-y"></span>
									<span class="icon icon-yl"></span>
								</div>
							</label>
						</div>
					</li>
				</ul>
			</div>
			<div class="btn">
				<span class="cancel" @click="cancelFun">取消</span>
				<span class="confirm" @click="paymentFun(item.id)">去支付,获得套餐</span>
			</div>
		</div>
		<div class="popout" v-if="type == 2 && !isBool">
			<div class="top">轻辅工程参考方案</div>
			<div class="content-list">
				<ul>
					<li>
						<div class="txt">所在城市:</div>
						<div class="content">{{ item.city_name+item.area_name}}</div>
					</li>
					<li>
						<div class="txt">所在小区:</div>
						<div class="content">{{ item.house_name }}</div>
					</li>
					<li>
						<div class="txt">所属户型:</div>
						<div class="content">{{ item.name+'　'+item.area }}㎡</div>
					</li>
					<li>
						<div class="txt">套餐包含:</div>
						<div class="package">
							<ul>
								<li>
									<div class="left">{{ item.production_name }}</div>
									<div class="right">X1</div>
								</li>
								<li>
									<div class="left">{{ item.estimates_name }}</div>
									<div class="right">X1</div>
								</li>
							</ul>
						</div>
					</li>
					<li>
						<div class="txt">平米单价:</div>
						<div class="content">20/㎡</div>
					</li>
					<li>
						<div class="txt">套餐价格:</div>
						<div class="money">¥{{ item.auxiliary_price }}</div>
					</li>
					<li>
						<div class="txt">支付方式:</div>
						<div class="payment">
							<label for="wx">
								<div>
									<input type="radio" name="radius" id="wx" checked>
									<span class="icon-y"></span>
									<span class="icon icon-wx"></span>
								</div>
							</label>
							<label for="zfb">
								<div>
									<input type="radio" name="radius" id="zfb">
									<span class="icon-y"></span>
									<span class="icon icon-zfb"></span>
								</div>
							</label>
							<label for="yl">
								<div>
									<input type="radio" name="radius" id="yl">
									<span class="icon-y"></span>
									<span class="icon icon-yl"></span>
								</div>
							</label>
						</div>
					</li>
				</ul>
			</div>
			<div class="btn">
				<span class="cancel" @click="cancelFun">取消</span>
				<span class="confirm" @click="paymentFun(item.id)">去支付,获得套餐</span>
			</div>
		</div>
		<div class="popout" v-if="type == 3 && !isBool">
			<div class="top">主材程参考方案</div>
			<div class="content-list">
				<ul>
					<li>
						<div class="txt">所在城市:</div>
						<div class="content">{{ item.city_name+item.area_name}}</div>
					</li>
					<li>
						<div class="txt">所在小区:</div>
						<div class="content">{{ item.house_name }}</div>
					</li>
					<li>
						<div class="txt">所属户型:</div>
						<div class="content">{{ item.name+'　'+item.area }}㎡</div>
					</li>
					<li>
						<div class="txt">套餐包含:</div>
						<div class="package">
							<ul>
								<li>
									<div class="left">{{ item.material_name }}</div>
									<div class="right">X1</div>
								</li>
							</ul>
						</div>
					</li>
					<li>
						<div class="txt">平米单价:</div>
						<div class="content">10/㎡</div>
					</li>
					<li>
						<div class="txt">套餐价格:</div>
						<div class="money">¥{{ item.material_price }}</div>
					</li>
					<li>
						<div class="txt">支付方式:</div>
						<div class="payment">
							<label for="wx">
								<div>
									<input type="radio" name="radius" id="wx" checked>
									<span class="icon-y"></span>
									<span class="icon icon-wx"></span>
								</div>
							</label>
							<label for="zfb">
								<div>
									<input type="radio" name="radius" id="zfb">
									<span class="icon-y"></span>
									<span class="icon icon-zfb"></span>
								</div>
							</label>
							<label for="yl">
								<div>
									<input type="radio" name="radius" id="yl">
									<span class="icon-y"></span>
									<span class="icon icon-yl"></span>
								</div>
							</label>
						</div>
					</li>
				</ul>
			</div>
			<div class="btn">
				<span class="cancel" @click="cancelFun">取消</span>
				<span class="confirm" @click="paymentFun(item.id)">去支付,获得套餐</span>
			</div>
		</div>
		<div class="popout" v-if="type == 1 && isBool">
			<div class="top">整屋全景效果图套餐</div>
			<div class="content-list">
				<ul>
					<li>
						<div class="txt">所在城市:</div>
						<div class="content">{{ item.city_name+item.area_name}}</div>
					</li>
					<li>
						<div class="txt">所在小区:</div>
						<div class="content">{{ item.house_name }}</div>
					</li>
					<li>
						<div class="txt">所属户型:</div>
						<div class="content">{{ item.name+'　'+item.area }}㎡</div>
					</li>
				</ul>
			</div>
			<div class="btn">
				<span class="confirm" @click="cancelFun">关闭</span>
			</div>
		</div>
		<div class="popout" v-if="type == 2 && isBool">
			<div class="top">轻辅工程参考方案</div>
			<div class="content-list">
				<ul>
					<li>
						<div class="txt">所在城市:</div>
						<div class="content">{{ item.city_name+item.area_name}}</div>
					</li>
					<li>
						<div class="txt">所在小区:</div>
						<div class="content">{{ item.house_name }}</div>
					</li>
					<li>
						<div class="txt">所属户型:</div>
						<div class="content">{{ item.name+'　'+item.area }}㎡</div>
					</li>
					<li>
						<div class="txt">下载文件:</div>
						<div class="package">
							<ul>
								<li>
									<div class="left"><a :href="item.production_pic">{{ item.production_name }}</a></div>
									<div class="right">X1</div>
								</li>
								<li>
									<div class="left"><a :href="item.estimates">{{ item.estimates_name }}</a></div>
									<div class="right">X1</div>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
			<div class="btn">
				<span class="confirm" @click="cancelFun">关闭</span>
			</div>
		</div>
		<div class="popout" v-if="type == 3 && isBool">
			<div class="top">主材参考套餐</div>
			<div class="content-list">
				<ul>
					<li>
						<div class="txt">所在城市:</div>
						<div class="content">{{ item.city_name+item.area_name}}</div>
					</li>
					<li>
						<div class="txt">所在小区:</div>
						<div class="content">{{ item.house_name }}</div>
					</li>
					<li>
						<div class="txt">所属户型:</div>
						<div class="content">{{ item.name+'　'+item.area }}㎡</div>
					</li>
					<li>
						<div class="txt">下载文件:</div>
						<div class="package">
							<ul>
								<li>
									<div class="left"><a :href="item.material">{{ item.material_name }}</a></div>
									<div class="right">X1</div>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
			<div class="btn">
				<span class="confirm" @click="cancelFun">关闭</span>
			</div>
		</div>
		<confirmPrompt
			@rightBtn="goLoginFun"></confirmPrompt>
	</div>
</template>
<script>
	import { createPayment,payPayment } from '../../common/axios/api.js';
	export default {
		props: ['isShow','item','type','isBool'],
		data() {
			return {
				wxSystem: this.$store.state.publicJS.wxSystem	//微信
			}
		},
		methods: {
			cancelFun: function() {
				this.$emit('update:isShow',false);
			},
			paymentFun: function(id) {
				let obj = {'cid':id,'type':this.type}
				createPayment(obj).then(data => {
					if (data.code == 1) {
						payPayment({'pid':data.payment_id}).then(data => {
							if (data.code == 1) {
								this.$store.state.publicJS.promptBoxMsg = '支付成功';
								this.$store.commit('txtPrompt');
								setTimeout(() => {
									this.$store.commit('txtPrompt');
									if (this.type == 1) {
										this.$router.push({name: '已购户型全景图'});
									}else {
										this.$router.push({name: '已购户型套餐'});
									}
								},1000);
							}else {
								this.$store.state.publicJS.promptBoxMsg = data.msg;
								this.$store.commit('txtPrompt');
								setTimeout(() => {
									this.$store.commit('txtPrompt');
								},1000);
							}
						});
					}else {
						if (this.wxSystem) {
							this.$store.state.publicJS.promptBoxMsg = '请先完善资料';
							this.$store.state.publicJS.confirmPromptBtnRight = '去完善';
						}else {
							this.$store.state.publicJS.promptBoxMsg = '请先登陆';
							this.$store.state.publicJS.confirmPromptBtnRight = '去登录';
						}
						this.$store.commit('confirmPrompt');
						return
					}
				})
			},
			goLoginFun: function() {
				let url = this.$route.path;
				window.localStorage.setItem('url',url);
				if (this.wxSystem) {
					this.$router.push({path:'/login/perfect'});
					return;
				}
				this.$router.replace({path:'/login'});
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#detPopup {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 100%;
		background: rgba(159,160,160,.8);
		.popout {
			position: fixed;
			top: 50%;
			left: 50%;
			z-index: 1000;
			.rem(width,554);
			.rem(padding-bottom,30);
			.border(border,2,#d65317);
			.border-radius(10);
			transform: translate(-50%,-50%);
			background: #fff;
		}
		.top {
			width: 100%;
			.rem(height,56);
			.rem(line-height,54);
			.rem(font-size,26);
			color: #d65317;
			.border(border-bottom,2,#eee);
			text-align: center;
		}
		.content-list {
			.rem(padding-left,30);
			.rem(padding-right,30);
			>ul >li {
				overflow: hidden;
				> div {
					float: left;
					.rem(margin-top,30);
					.rem(font-size,24);
					color: #333;
				}
			}
			.txt {
				.rem(width,120);
			}
			.package {
				.rem(width,370);
				li {
					display: flex;
					align-items: center;
					.rem(margin-bottom,15);
					overflow: hidden;
					&:last-of-type {
						margin-bottom: 0;
					}
				}
			}
			.left {
				.rem(width,340);
			}
			.right {
				.rem(width,30);
				.rem(font-size,26);
				color: #da6a3c;
			}
			.money {
				color: #d65317;
			}
			.payment {
				font-size: 0;
				vertical-align: top;
			}
			.icon {
				display: inline-block;
				.rem(height,24);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				vertical-align: middle;
			}
			.icon-wx {
				.rem(width,84);
				background-image: url(./image/wx.png);
			}
			.icon-zfb {
				.rem(width,80);
				background-image: url(./image/zfb.png);
			}
			.icon-yl {
				.rem(width,97);
				background-image: url(./image/yl.png);
			}
			label {
				display: inline-block;
				.rem(margin-right,10);
				font-size: 0;
				&:last-of-type {
					margin-right: 0;
				}
				> div {
					position: relative;
				}
				.icon-y {
					display: inline-block;
					.rem(width,20);
					.rem(height,20);
					.rem(margin-right,8);
					background: url(./image/radio.png) no-repeat;
					background-size: 100% 100%;
					vertical-align: middle;
				}
				input {
					position: absolute;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
				input:checked + span {
					background-image: url(./image/radio_1.png);
				}
			}
		}
		.btn {
			width: 100%;
			.rem(margin-top,30);
			font-size: 0;
			color: #fff;
			text-align: center;
			> span {
				display: inline-block;
				.rem(width,200);
				.rem(height,44);
				.rem(margin-right,20);
				.rem(line-height,44);
				.rem(font-size,22);
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
	}
</style>