<template>
	<div id="vipRenew">
		<div class="top">
			<div class="img">
				<img :src="info.headimg" v-if="info.headimg != ''">
				<img src="./image/dsgImg.png" v-else>
			</div>
			<div class="user-info">
				<p class="name">{{ info.nickname ? info.nickname : info.mobile }}<span></span></p>
				<p class="txt">您的会员将于{{ this.endTime }}到期</p>
			</div>
		</div>
		<div class="cost">
			<p>续费VIP会员</p>
			<div class="price" :class="vip_type == 1 ? 'action' : ''" @click="vip_type = 1">
				<div class="left">
					<p class="p1">一年制VIP会员</p>
					<p class="p2">有效时间为365天</p>
				</div>
				<p class="right"><span>¥</span>12666</p>
			</div>
			<div class="price" :class="vip_type == 2 ? 'action' : ''" @click="vip_type = 2">
				<div class="left">
					<p class="p1">两年制VIP会员</p>
					<p class="p2">有效时间为730天</p>
				</div>
				<div class="fr">
					<p class="p1"><span>¥</span>20666</p>
					<p class="p2">¥<span>25332</span></p>
				</div>
			</div>
		</div>
		<div class="read">
			<div class="check">
				<input type="checkbox" value="read" v-model="checkedNames">
				<span class="icon-check"></span>
			</div>
			我已阅读并同意<span @click="isAgreement = true">《VIP会员协议》</span>
		</div>
		<div class="bottom-btn" :class="checkedNames.length != 0 ? 'action' : ''" @click="renewFun">立即续费</div>
		<div class="popout" v-if="isAgreement">
			<div class="mask">
				<p class="title">大美软装VIP会员服务协议</p>
				<div class="agreement-info">
					<p class="content">　　您好！欢迎您与“深圳兴汇大美网络科技有限公司”签订“大美软装”VIP会员用户协议(以下简称本协议)并使用“大美软装”为您提供的会员服务。您在申请注册流程中点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。您点击“确定”按钮后，本协议即构成对双方有约束力的法律文件。</p>
					<p class="content"><span>1.服务条款的接受与修改</span></p>
					<p class="content">　　1.1 本协议是“大美软装”用户与深圳兴汇大美网络科技有限公司（以下简称“大美软装”）之间关于用户成为“大美软装”VIP会员且使用“大美软装”提供的会员服务所订立的协议。本协议描述“大美软装”与用户之间关于软件许可以及服务使用及相关方面的权利义务。“VIP会员”或“您”是指享受“大美软装”提供的VIP会员服务的个人或单一实体。本服务协议构成您（无论个人或者单位）使用“大美软装”所提供的VIP会员服务之先决条件，除非您接受本协议条款，否则您无权使用本协议的相关服务。您的使用行为将视为同意接受本协议各项条款的约束。</p>
					<p class="content">　　1.2“深圳兴汇大美网络科技有限公司”有权随时对服务条款进行修改，一旦服务条款发生变更和修改，“大美软装”将在相关页面上提示修改的内容；如果VIP会员不同意本协议的修改，可以取消已经获取的服务并停止使用；如果VIP会员继续使用“大美软装”提供的服务，则视为VIP会员已经接受本协议的全部修改。</p>
					<p class="content">　　1.3请您审阅并接受或不接受本协议，未成年人（未满16周岁）应在法定监护人陪同下审阅和履行，未成年人行使和履行本协议项下的权利和义务视为已获得了法定监护人的认可，您在享受“大美软装”VIP会员服务时必须完全、严格遵守本服务协议条款。</p>
					<p class="content"><span>2.服务说明</span></p>
					<p class="content">　　2.1 VIP会员服务涉及的“大美软装”产品所有权以及相关软件知识产权归“大美软装”所有。“大美软装”所提供的服务将按照其服务条款和操作规则严格执行。VIP会员在享受“大美软装”任何单项服务时，应当受本协议以及<span>《大美软装用户注册协议》</span>的约束。</p>
					<p class="content">　　2.2 “深圳兴汇大美网络科技有限公司”享有对“大美软装”VIP会员网上一切活动的监督、提示、检查的权利，如“大美软装”VIP会员的行为违反有关法律法规或违反本协议条款的约定，“大美软装”享有要求其纠正及追究其责任等权利。</p>
					<p class="content">　　2.3 “深圳兴汇大美网络科技有限公司”向“大美软装”VIP会员提供的全部服务，均仅限于VIP会员在“大美软装”平台使用，任何以恶意破解等非法手段将“大美软装”提供的服务内容与“大美软装”平台分离的行为，均不属于本协议中约定的“大美软装”提供的服务。由此引起的一切法律后果由行为人负责，“大美软装”将依法追究行为人的法律责任。</p>
					<p class="content">　　2.4 当VIP会员使用“大美软装”各单项服务时，VIP会员的使用行为视为其对各单项服务的服务条款以及“大美软装”在该单项服务中发出各类公告的同意。</p>
					<p class="content">　　2.5 您明确了解并同意，“大美软装”VIP会员的付费方式为通过第三方平台支付方式（微信、支付宝、银联等），您通过此种付费方式付费可能存在一定的商业风险，包括但不限于不法分子利用您账户或银行卡等有价卡等进行违法活动，该等风险均会给您造成相应的经济损失。您应自行承担向侵权方追究侵权责任和追究责任不能的后果。</p>
					<p class="content">　　2.6 您应自行负责妥善且正确地保管、使用、维护您在“大美软装”申请取得的账户、账户信息及账户密码。您应对您账户信息和账户密码采取必要和有效的保密措施。非“大美软装”原因致使您账户密码泄漏以及因您保管、使用、维护不当造成损失的，“大美软装”无须承担与此有关的任何责任。</p>
					<p class="content">　　2.7 “深圳兴汇大美网络科技有限公司”不对您因第三方的行为或不作为造成的损失承担任何责任，包括但不限于支付服务和网络接入服务、任意第三方的侵权行为。</p>
					<p class="content"><span>3. 成为VIP会员的程序</span></p>
					<p class="content">　　3.1 在成为“大美软装”VIP会员之前，您必须先根据真实、准确信息注册成为“大美软装”用户。用户所填写的内容与个人资料必须真实有效，否则“大美软装”有权拒绝其申请或撤销其VIP会员资格，并不予任何赔偿或退还VIP会员服务费。VIP会员的个人资料发生变化，应及时修改注册的个人资料，否则由此造成的VIP会员权利不能全面有效行使的责任由VIP会员自己承担，“大美软装”有权因此取消其VIP会员资格，并不予退还VIP会员费或其他任何形式的任何赔偿。</p>
					<p class="content">　　3.2 用户可通过各种已有和未来新增的渠道成为VIP会员，包括但不限于：通过网银支付、手机支付或第三方支付等方式成为VIP会员。在用户使用具体某种方式成为VIP会员时，须阅读并确认接受相关的服务条款和使用方法。“大美软装”在此声明：“大美软装”从未授权任何第三方单位或个人销售、转让VIP会员资格，任何未经授权销售“大美软装”VIP会员的属于非法销售，“大美软装”有权追究其法律责任。</p>
					<p class="content">　　3.3 成为“大美软装”VIP会员后，VIP会员有权利不接受“大美软装”的服务，可申请取消VIP会员服务，但不获得VIP会员服务费的退还。</p>
					<p class="content">　　3.4 “大美软装”VIP会员账号所有权归“深圳兴汇大美网络科技有限公司”所有，“大美软装”VIP会员拥有其账号的有限使用权。</p>
					<p class="content">　　3.5“大美软装”仅提供相关的网络服务，除此之外与相关网络服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均应由VIP会员自行负担。</p>
					<p class="content"><span>4. VIP会员服务和账号查询</span></p>
					<p class="content">　　4.1 一旦您成为“大美软装”VIP会员，即视为您认可该项服务标明之价格；成为“大美软装”VIP会员后，该项服务即时生效。</p>
					<p class="content">　　4.2 VIP会员的增值服务资费标准以“大美软装”上标注的详细资费标价为准，“大美软装”有权基于自身业务发展需要变更上述资费标准，但“大美软装”会根据实际运营情况对不同阶段已经激活且持续有效的VIP会员给予续费、升级方面的不同资费优惠，具体优惠政策以“大美软装”在相关服务页面公告的内容为准。</p>
					<p class="content">　　4.3 您可以通过登录“大美软装”VIP会员中心免费查询您的账号信息详情，包括已开通的服务内容、服务期限、消费金额、交易状态等。</p>
					<p class="content"><span>5. VIP会员权限及服务期限</span></p>
					<p class="content">　　5.1 VIP会员服务提供的服务都有固定的服务期限，您一旦成为VIP会员即视为认可它的服务期限。</p>
					<p class="content">　　5.2 您在购买“大美软装”VIP会员后可享受的全部权益以“大美软装”官方网站公布的会员权益为准，“大美软装”有权基于“大美软装”自身业务发展需要变更全部或部分会员权益。就前述权益调整“大美软装”将在相应服务页面进行通知或公告，您也可通过“大美软装”官方网站查询最新的会员权益内容。</p>
					<p class="content"><span>6. VIP会员的权利及限制</span></p>
					<p class="content">　　6.1 在VIP会员有效期内，VIP会员可优先参加由“大美软装”组织的活动并享有由“大美软装”提供的各项优惠及增值服务。</p>
					<p class="content">　　6.2 VIP会员服务仅限于申请账号自行使用；VIP会员服务期内不能在“大美软装”帐号之间转移，禁止赠与、借用、作用、转让或售卖。否则“大美软装”有权在未经通知的情况下取消转让账户、受让账户的VIP会员服务资格，由此带来的损失由VIP会员自行承担。</p>
					<p class="content">　　6.3 同一软装”VIP账号只允许在最多二种设备上使用，且同一时间同一账号仅可在二种设备上登录，超出上述范围使用的，“大美软装”系统将自动登出其他设备上的账号。</p>
					<p class="content">　　6.4 若VIP会员的行为持续违反本协议或违反国家相关法律法规，或“大美软装”认为VIP会员行为有损“大美软装”或他人的声誉及利益，“大美软装”有权取消该VIP会员的VIP会员资格而无须给与任何补偿。</p>
					<p class="content">　　6.5 VIP会员不得以盗窃、利用系统漏洞等非法途径以及在未获“大美软装”授权的非法销售“大美软装”VIP会员的网站上获取或购买VIP会员服务，否则“大美软装”有权取消VIP会员的服务资格。有此引发的问题由VIP会员自行承担，“大美软装”不负任何责任。</p>
					<p class="content">　　6.6 任何VIP会员不得使用带有非法、淫秽、污辱或人身攻击的含义污辱或人身攻击的呢称和签名档，一经发现，“大美软装”有权取消其VIP会员资格而无需给与任何补偿和退费。</p>
					<p class="content">　　6.7 被取消VIP会员资格的VIP会员，不能再参加由“大美软装”组织的活动并不可再享有由“大美软装”提供的各项优惠及增值服务，即不再享有VIP会员权利。</p>
					<p class="content">　　6.8 “大美软装”提供的VIP会员服务内容不得用于商业、盈利等用途，只可供私人使用。</p>
					<p class="content">　　6.9 除非“大美软装”提前书面许可，禁止复制、下载、上传、修改、编目排序、翻译、发行、开发、转让、销售、展示、传播VIP会员服务提供的产品；禁止合成、嵌套、链接会员服务提供的产品；禁止利用VIP会员服务提供的产品及其他产品进行创作衍生作品、制作设计方案、进行教学或研究、进行商业开发或推广；禁止以商业目的使用VIP会员服务提供的产品；包括但不限于下列情况：</p>
					<p class="content">　　　　6.9.1 通过非法手段对VIP会员账户的服务期限、消费金额、交易状态进行修改，或用非法的方式或为了非法的目的使用已购买的VIP会员服务提供的产品；</p>
					<p class="content">　　　　6.9.2 将您的“大美软装”VIP会员账户有偿或无偿提供给任何第三人，并允许他人通过您的账户购买VIP会员内所享有产品服务。</p>
					<p class="content">　　　　6.9.3 将VIP会员服务提供的产品复制、销售、出租或授权给任何第三方。</p>
					<p class="content">　　　　6.9.4 主动对“大美软装”用于保护VIP会员服务提供的产品的任何安全措施技术进行破解、更改、反操作、破坏或其他篡改，或协助他人进行上述行为。</p>
					<p class="content">　　　　6.9.5 通过非“大美软装”认可的方式获得VIP会员服务。</p>
					<p class="content">　　　　6.9.6 损害第三方利益，通过“大美软装”收集第三方资料信息，破坏或盗取第三方账号，发送诈骗邮件和垃圾邮件等非法信息，侵犯第三方合法权益，包括但不限于隐私权、知识产权、财产权等。</p>
					<p class="content"><span>7. 协议的变更</span></p>
					<p class="content">　　7.1 “大美软装”依据本协议的约定变更服务内容、服务方式以及本用户协议内容的，如果VIP会员不同意“大美软装”的变更，有权选择取消并停止使用已经获取的对应的全部或部分服务；如果VIP会员继续使用“大美软装”提供的上述服务，则视为VIP会员已经接受“大美软装”的上述调整。</p>
					<p class="content">　　7.2 “大美软装”对VIP会员协议一旦进行修改，将在页面上公示修改的内容。一经公布即视为通知VIP会员。</p>
					<p class="content">　　7.3 VIP会员所提供的服务使用期限中包含“大美软装”解决故障、服务器维修、调整、升级等所需用的合理时间，对上述情况所需用的时间“大美软装”不予补偿并保留解释权。</p>
					<p class="content">　　7.4 VIP会员在使用“大美软装”所提供的服务时，如遭受任何人身或财务的损失、损害或伤害，不论原因如何，“大美软装”均不负责任。由于VIP会员将个人密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露，“大美软装”不负任何责任。</p>
					<p class="content">　　7.5 VIP会员如果不同意条款的修改，可主动向“大美软装”提出终止VIP会员服务，但“大美软装”不退还自开通VIP会员服务至提出终止VIP会员服务所在月的已享受VIP会员服务的部分费用；如果VIP会员继续享用VIP会员服务，则视为VIP会员已经接受条款的修改。</p>
					<p class="content"><span>8. 服务的中断和终止</span></p>
					<p class="content">　　8.1 因发生“大美软装”不可抗拒的事由，如政府行为、不可抗力，导致VIP会员服务无法继续，“大美软装”会以最快的速度通知VIP会员，但不承担由此对VIP会员造成的任何损失并不退还VIP会员服务费。</p>
					<p class="content">　　8.2 如VIP会员违反或被视为违反本服务条款中的内容，“大美软装”有权在不通知VIP会员的情况下立即终止您已购买的所有服务，以及取消您的“大美软装”VIP会员账户和使用权限，但不退还任何已缴纳的VIP会员服务费用。</p>
					<p class="content">　　8.3 “大美软装”未行使或延迟行使其在本协议项下的权利并不构成对这些权利的放弃，而单一或部分行使其在本协议项下的任何权利并不排斥其任何其它权利的行使。“大美软装”随时有权要求您继续履行义务并承担相应的违约责任。</p>
					<p class="content"><span>9. 法律的适用和管辖</span></p>
					<p class="content">　　9.1 本服务条款的生效、履行、解释及争议的解决均适用中华人民共和国法律，本服务条款因与中华人民共和国现行法律相抵触而导致部分无效，不影响其他部分的效力。</p>
					<p class="content">　　9.2 如就本协议内容或其执行发生任何争议，应尽量友好协商解决；协商不成时，则争议各方一致同意将发生的争议提交协商不成时，任何一方均可向深圳市南山区人民法院提起诉讼。</p>
					<p class="content fr">深圳兴汇大美网络科技有限公司</p>
				</div>
				<div class="bottom">
					<div class="btn">
						<span class="close" @click="isAgreement = false">取消</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { vipInfo,saveVip } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				info: {},
				vip_type: 1,
				checkedNames: [],
				endTime: '',
				isAgreement: false
			}
		},
		methods: {
			ajaxFun: function() {
				vipInfo().then(data => {
					this.info = data.info;
					let date = data.info.vip_endtime * 1000;
					let time = new Date(date);
					let y = time.getFullYear();
					let m = time.getMonth()+1;
					let d = time.getDate();
					this.endTime = y + '.' + m + '.' + d;
				});
			},
			renewFun: function() {
				if (this.checkedNames.length != 0) {
					let obj = {'vip_type':this.vip_type,'is_renewal':1}
					saveVip(obj).then(data => {
						if (data.code == 1) {
							let money = this.vip_type == 1 ? 12666 : 20666;
							this.$router.replace({ path: '/orderPay',query:{oid:data.order_id,'type':'payment_pay','money':money}});
						}else {
							this.$store.state.publicJS.promptBoxMsg = data.msg;
							this.$store.dispatch('alertPrompt');
						}
					});
				}
			}
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#vipRenew {
		.top {
			width: 100%;
			.rem(height,198);
			.rem(padding-top,62);
			.rem(padding-left,35);
			.rem(padding-right,35);
			background: #fff;
			.img {
				float: left;
				.rem(width,98);
				.rem(height,98);
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
					.rem(min-height,98);
				}
			}
			.user-info {
				width: 100%;
				.rem(padding-left,134);
				.name {
					width: 100%;
					.rem(line-height,52);
					.rem(font-size,32);
					span {
						display: inline-block;
						.rem(width,50);
						.rem(height,31);
						.rem(margin-top,3);
						.rem(margin-left,30);
						background: url(./image/vip_12.png) no-repeat;
						background-size: 100% 100%;
					}
				}
				.txt {
					.rem(font-size,24);
				}
			}
		}
		.cost {
			width: 100%;
			.rem(padding-left,30);
			.rem(padding-right,30);
			.rem(padding-bottom,25);
			> p {
				width: 100%;
				.rem(height,100);
				.rem(line-height,100);
				.rem(font-size,32);
			}
			.price {
				width: 100%;
				.rem(height,128);
				.rem(margin-bottom,15);
				.rem(padding-left,23);
				.rem(padding-right,30);
				.border(border,2,#d2d2d2);
				.border-radius(10);
				.left {
					float: left;
					.rem(padding-top,20);
					.p1 {
						.rem(line-height,52);
						.rem(font-size,32);
						font-weight: 600;
						letter-spacing: 2px;
					}
					.p2 {
						.rem(line-height,34);
						.rem(font-size,24);
						letter-spacing: 1px;
					}
				}
				.right {
					float: right;
					.rem(line-height,128);
					.rem(font-size,36);
					text-align: right;
					color: #ed7631;
					span {
						.rem(margin-right,20);
						.rem(font-size,28);
					}
				}
				.fr {
					.rem(padding-top,20);
					text-align: right;
					.p1 {
						.rem(font-size,36);
						color: #ed7631;
						span {
							.rem(margin-right,20);
							.rem(font-size,28);
						}
					}
					.p2 {
						.rem(font-size,24);
						color: #999;
						span {
							text-decoration: line-through;
						}
					}
				}
				&.action {
					border-color: #f8ceb5;
					background-color: #fbe4d6;
				}
			}
		}
		.read {
			position: relative;
			.rem(width,500);
			margin: 0 auto;
			.rem(margin-top,20);
			.rem(margin-bottom,100);
			.rem(font-size,24);
			text-align: center;
			> span {
				color: #f08e56;
				text-decoration: underline;
			}
			.check {
				position: relative;
				.rem(top,8);
				display: inline-block;
				.rem(width,40);
				.rem(height,30);
				.rem(padding-top,3);
				text-align: left;
				input {
					position: absolute;
					top: 0;
					left: 0;
					display: inline-block;
					width: 100%;
					.rem(height,30);
					opacity: 0;
				}
				span {
					display: inline-block;
					.rem(width,30);
					.rem(height,30);
					background: url(./image/check_1.png) no-repeat;
					background-size: 100% 100%;
				}
				input:checked+span {
					background-image: url(./image/check.png);
				}
			}
		}
		.bottom-btn {
			.rem(width,530);
			.rem(height,70);
			margin: 0 auto;
			.rem(margin-bottom,40);
			.rem(line-height,70);
			.rem(font-size,28);
			text-align: center;
			color: #fff;
			.border-radius(10);
			background: #ccc;
			&.action {
				background: #ed7631;
			}
		}
		.popout {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 500;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.6);
			.mask {
				position: fixed;
				top: 50%;
				left: 50%;
				z-index: 1000;
				.rem(width,680);
				.rem(height,1050);
				.border-radius(20);
				background: #fff;
				transform: translate(-50%,-50%);
				overflow: hidden;
			}
			.title {
				width: 100%;
				.rem(margin-top,40);
				.rem(margin-bottom,20);
				.rem(font-size,30);
				text-align: center;
				letter-spacing: 1.5px;
			}
			.agreement-info {
				width: 100%;
				.rem(height,800);
				overflow-y: auto;
			}
			.content {
				.rem(padding-left,50);
				.rem(padding-right,50);
				.rem(font-size,22);
				span {
					font-weight: 900;
				}
			}
			.bottom {
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 1;
				width: 100%;
				.rem(height,100);
				text-align: center;
				background: #fff;
				.btn {
					> span {
						display: inline-block;
						.rem(width,528);
						.rem(height,70);
						.rem(margin-bottom,20);
						.rem(line-height,70);
						.rem(font-size,24);
						color: #fff;
						text-align: center;
						.border-radius(10);
						background-color: #c9caca;
					}
					.action {
						background-color: #ed7631;
					}
				}
			}
		}
	}
</style>