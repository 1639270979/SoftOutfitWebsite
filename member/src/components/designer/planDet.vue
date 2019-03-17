<template>
	<div id="planDet">
		<div class="banner">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img :src="info.cover">
						<!--<div class="placeholder" v-if="list.description">{{ list.description }}</div>-->
					</div>
				</div>
				<!-- 如果需要分页器 -->
				<div class="swiper-pagination"></div>
			</div>
		</div>
		<div class="main">
			<p class="title">{{ info.title }}</p>
      <img :src="info.homepage_headimg" class="header">
      <p class="description">{{info.description}}</p>
			<div class="list">
				<ul>
					<li v-for="list in picList" >
						<img :src="list.picture" @click="zoom($event)">
						<p class="description" v-if="list.description">{{ list.description }}</p>
					</li>
				</ul>
			</div>
		</div>
    <my-zoom
      :isZoomShow="isZoomShow"
      @update:isZoomShow="val => isZoomShow = val"
      :zoomImgArr='zoomImgArr'
      :zoomIndex='zoomIndex'></my-zoom>
	</div>
</template>
<script>
	import { programmeDet } from '../../common/axios/api.js';
  import myZoom from '../public/zoom.vue'

  export default {
		data() {
			return {
				info   : {},
				picList: [],
				cid    : this.$route.params.cid,
        isZoomShow: false,
        zoomImgArr: [],
        zoomIndex: 0,
			}
		},
    components: {
      myZoom
    },
		methods: {
			ajaxFun: function() {
				programmeDet(this.cid).then(data => {
					this.info = data.caseInfo;
					data.picList.forEach((k) => {
						this.picList.push(k);
					});
					this.bannerFun();
				});
			},
      zoom(e){
        this.zoomImgArr = [];
        this.isZoomShow = true;
        this.zoomImgArr.push(e.currentTarget);
        this.zoomIndex = 0;
      },
			bannerFun: function() {
//				this.$nextTick(function () {
//					var banner = new Swiper ('.swiper-container', {
//						autoplay: 4000,
//						autoplayDisableOnInteraction: false,
//						pagination: '.swiper-pagination'
//					});
//				});
			}
		},
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	@import './css/swiper-3.4.2.min.css';
	.banner {
		position: relative;
		width: 100%;
		.rem(height,357);
		overflow: hidden;
		.swiper-container {
			.rem(height,357);
		}
		.swiper-slide {
			width: 100%;
		}
		img {
			width: 100%;
			.rem(min-height,357);
		}
		.placeholder {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			.rem(min-height,42);
			.rem(padding-top,13);
			.rem(padding-bottom,13);
			.rem(padding-left,38);
			.rem(padding-right,38);
			.rem(line-height,25);
			.rem(font-size,20);
			color: #fff;
			background: rgba(0,0,0,.5);
		}
	}
	.main {
    position: relative;
		width: 100%;
		padding-left: 0.49rem;
		padding-right: 0.52rem;
		.title {
      font-size:0.4rem;
      font-weight: bold;
      margin-top: 0.55rem;
      margin-bottom: 0.37rem;
			color: #000;
		}
    .header{
      position: absolute;
      top: -0.22rem;
      right: 0.52rem;
      width: 0.85rem;
      height: 0.85rem;
      border-radius: 50%;
    }
		img {
			width: 100%;
			.rem(margin-bottom,17);
		}
		.description {
			width: 100%;
			.rem(margin-bottom,20);
			.rem(line-height,25);
			.rem(font-size,20);
			color: #474747;
		}
	}
</style>e
