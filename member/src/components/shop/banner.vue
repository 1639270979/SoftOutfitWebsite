<template>
	<div id="shopBanner">
		<!-- <swiper :options="swiperOption" v-if="banner">
			<div class="swiper-slide" v-for="item in banner">
				<a :href="item.url"><img :src="item.thumb"></a>
			</div>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper> -->
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="item in banner">
					<a :href="item.url"><img :src="item.thumb"></a>
				</div>
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>
		</div>
	</div>
</template>
<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		props: ['banner'],
		data() {
			return {
				swiperOption: {
					autoplay: 3000,
					setWrapperSize :true,
					pagination : '.swiper-pagination',
					paginationClickable :true,
					mousewheelControl : true,
					observeParents:true
				}
			}
		},
		components: {
			swiper,
			swiperSlide
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#shopBanner {
		width: 100%;
		.rem(height,640);
		font-size: 0;
		overflow: hidden;
		img {
			width: 100%;
			.rem(min-height,640);
		}
		.swiper-slide {
			.rem(height,640);
		}
		.swiper-pagination .swiper-pagination-bullet {
			.rem(width,6);
			.rem(height,6);
		}
		.swiper-pagination .swiper-pagination-bullet-active {
			background: #e68821;
		}
	}
</style>