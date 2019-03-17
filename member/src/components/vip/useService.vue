<template>
	<div id="useService">
		<p class="title">已申请设计服务</p>
		<router-link :to="list.status == 1 ? '/vip/vipOrderDet/'+list.order_id : (list.type == 1 ? '/vip/designCaseWhole/'+list.order_id : '/vip/designCaseSoftOutfit/'+list.order_id)"
			class="service-btn"
			:class="list.type == 1 ? 'wholeHouse' : 'softOutfit' "
			tag="div"
			v-for="list in caseList"
			:key="2">{{ list.title }}</router-link>
		<myLoading :isLoading='isLoading' :isList="isList"></myLoading>
	</div>
</template>
<script>
	import { vipDesigncaseLoadList } from '../../common/axios/api.js';
	import { iscrollAjax } from '../../common/public/iscroll.js';
	import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				caseList: [],
				page: 1,
				pageSize: 15,
				isLoading: true,
        isList:true
			}
		},
		components: {
			myLoading
		},
		methods: {
			iscroll: function() {
				iscrollAjax(() => {
					if (this.isLoading) {
						this.isLoading = false;
						this.page += 1;
						this.ajaxFun();
					}
				});
			},
			ajaxFun: function() {
				let obj = {'page':this.page,'pageSize':this.pageSize}
				vipDesigncaseLoadList(obj).then(data => {
					data.caseList.map((key) => {
						this.caseList.push(key);
					});
					if(this.caseList.length==0){
					    this.isList=false
          }else{
					    this.isList=true
          }
					if (data.caseList.length < this.pageSize) {
						this.isLoading = false;
					}else {
						this.isLoading = true;
					}
				})
			}
		},
		created() {
			this.ajaxFun();
			this.iscroll();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	.title {
		width: 100%;
		.rem(margin-top,15);
		.rem(margin-bottom,50);
		.rem(font-size,36);
		color: #333;
		text-align: center;
	}
	.service-btn {
		.rem(width,690);
		.rem(height,148);
		margin: 0 auto;
		.rem(margin-bottom,20);
		.rem(padding-left,30);
		.rem(line-height,148);
		.rem(font-size,30);
		color: #fff;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.wholeHouse {
		background-image: url(./image/vip_15.png);
	}
	.softOutfit {
		background-image: url(./image/vip_16.png);
	}
</style>
