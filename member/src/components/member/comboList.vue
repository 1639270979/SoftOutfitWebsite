<template>
	<div id="comboList">
		<div class="list">
			<ul>
				<router-link v-for="item in items" :key="item" :to="'/myHome/list/det/myHomeSuit/'+item.case_id+'/'+item.type" tag="li"><span class="txt">{{ item.name }}</span><span class="icon-right"></span></router-link>
			</ul>
		</div>
		<div class="mask" v-show="isShow">
			<div class="popout">
				<p class="title">{{ title }}</p>
				<a :href="'member/pdf?http://member.idmei.com'+estimates" v-if="estimates != ''">{{ estimates_name }}</a>
				<a :href="'member/pdf?http://member.idmei.com'+production" v-if="production != ''">{{ production_name }}</a>
				<a :href="'member/pdf?http://member.idmei.com'+material" v-if="material != ''">{{ material_name }}</a>
				<div class="clear"><span @click="clearFun">关闭</span></div>
			</div>
		</div>
    <myLoading :isLoading='isLoading' :isList = 'isList'></myLoading>
	</div>
</template>
<script>
	import { comboList } from '../../common/axios/api.js';
  import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				items: [],
				title: '',
				estimates: '',
				estimates_name: '',
				production: '',
				production_name: '',
				material: '',
				material_name: '',
				isShow: false,
        isLoading: true,
        isList:true,
			}
		},
		methods: {
			ajaxFun: function() {
				comboList().then(data => {
					if (data.code == 1) {
						for (var i = 0; i < data.list.length; i++) {
							this.items.push(data.list[i]);
						}
					}
          if(this.items.length==0){
            this.isList=false;
            this.isLoading = false;
          }else{
            this.isList = true;
            this.isLoading = false;
          }
				});
			},
			clickFun: function(obj) {
				this.title = obj.name;
				this.estimates = obj.estimates ? obj.estimates : '';
				this.estimates_name = obj.estimates_name;
				this.production = obj.production_pic ? obj.production_pic : '';
				this.production_name = obj.production_name;
				this.material = obj.material ? obj.material : '';
				this.material_name = obj.material_name;
				this.isShow = true;
			},
			jumpFun: function(url) {
				this.$router.push({path:'/member/pdf'});
				window.localStorage.setItem('pdf',url);
			},
			clearFun: function() {
				this.isShow = false;
			}
		},
    components: {
      myLoading
    },
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	.list {
		.border(border-top,1,#eee);
		li {
			width: 100%;
			.rem(height,78);
			.rem(padding-left,30);
			.rem(padding-right,30);
			.rem(line-height,78);
			.rem(font-size,22);
			.border(border-bottom,2,#eee);
			background: #fff;
			&:last-of-type {
				border-bottom: 0;
			}
			.icon-right {
				float: right;
				.rem(width,13);
				.rem(height,24);
				.rem(margin-top,27);
				background: url(./image/right.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 100%;
		background: rgba(102,102,102,.8);
		.popout {
			position: absolute;
			top: 50%;
			left: 50%;
			z-index: 1000;
			.rem(width,580);
			.rem(height,300);
			.rem(padding-left,20);
			.rem(padding-right,20);
			.border-radius(30);
			transform: translate(-50%,-50%);
			background: #fff;
		}
		.title {
			width: 100%;
			.rem(height,80);
			.rem(line-height,80);
			.rem(font-size,24);
			text-align: center;
		}
		a {
			display: block;
			.rem(height,50);
			.rem(line-height,50);
			border-bottom: 1px solid #eee;
		}
		.clear {
			width: 100%;
			.rem(margin-top,50);
			text-align: center;
			span {
				display: inline-block;
				.rem(width,130);
				.rem(height,50);
				.rem(line-height,50);
				.rem(font-size,24);
				color: #fff;
				.border-radius(10);
				background: #d65317;
			}
		}
	}
</style>
