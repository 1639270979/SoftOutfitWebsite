<template>
	<div id="introduce">
		<div class="top">
			<div class="img"><img :src="info.headimg"></div>
			<div class="txt">
				<p class="name">{{ info.name }}<span>{{ info.area_id }}</span></p>
				<p class="company">{{ info.company }}<i></i></p>
			</div>
		</div>
		<div class="concept">
			<p class="title">设计理念</p>
			<p class="content">{{ info.concept }}</p>
		</div>
		<div class="prize">
			<p class="title">获奖经历</p>
			<p class="p1" v-for="(key,index) in info.prize">{{ index +'　'+ key }}</p>
		</div>
	</div>
</template>
<script>
	import { masterInfor } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				mid: this.$route.params.mid,
				info: {}
			}
		},
		methods: {
			ajaxFun: function() {
				masterInfor(this.mid).then(data => {
					this.info = data.information;
				});
			}
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#introduce {
		.rem(padding-left,28);
		.rem(padding-right,28);
		> div {
			.border(border-bottom,2,#eee);
			&:last-of-type {
				border-bottom: 0;
			}
		}
	}
	.top {
		width: 100%;
		.rem(padding-top,23);
		.rem(padding-bottom,34);
		overflow: hidden;
		.img {
			float: left;
			.rem(width,120);
			.rem(height,120);
			border-radius: 50%;
			overflow: hidden;
			img {
				width: 100%;
			}
		}
		.txt {
			width: 100%;
			.rem(padding-left,155);
		}
		.name {
			.rem(margin-top,18);
			.rem(font-size,32);
			span {
				.rem(margin-left,25);
				.rem(font-size,24);
				color: #666;
			}
		}
		.company {
			.rem(margin-top,10);
			i {
				display: inline-block;
				.rem(width,24);
				.rem(height,24);
				.rem(margin-left,15);
				vertical-align: middle;
				background: url(./image/check_icon.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.concept,.prize {
		width: 100%;
		.rem(padding-top,35);
		.rem(padding-bottom,25);
		.title {
			.rem(margin-bottom,17);
			.rem(font-size,30);
		}
		.content,.p1 {
			.rem(line-height,60);
			.rem(font-size,24);
			color: #666;
		}
	}
</style>