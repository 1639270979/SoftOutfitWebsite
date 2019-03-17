<template>
	<div id="view">
		<div class="top">
			<p class="title">识图规范</p>
			<p class="prompt">适用于大美家扫描识别的CAD制图标准</p>
		</div>
		<div class="body">
			<img src="./image/view_01.jpg" @click="openPhotoSwipe('/static/m/image/view_01.jpg')">
			<img src="./image/view_02.jpg" @click="openPhotoSwipe('/static/m/image/view_02.jpg')">
			<img src="./image/view_03.jpg" @click="openPhotoSwipe('/static/m/image/view_03.jpg')">
			<img src="./image/view_04.jpg" @click="openPhotoSwipe('/static/m/image/view_04.jpg')">
			<img src="./image/view_05.jpg" @click="openPhotoSwipe('/static/m/image/view_05.jpg')">
		</div>
		<!-- 图片放大 -->
		<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="pswp__bg"></div>
			<div class="pswp__scroll-wrap">
				<div class="pswp__container">
					<div class="pswp__item"></div>
					<div class="pswp__item"></div>
					<div class="pswp__item"></div>
				</div>
				<div class="pswp__ui pswp__ui--hidden">
					<div class="pswp__top-bar">
					<div class="pswp__counter"></div>
					<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
						<div class="pswp__preloader">
							<div class="pswp__preloader__icn">
								<div class="pswp__preloader__cut">
									<div class="pswp__preloader__donut"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
						<div class="pswp__share-tooltip"></div> 
					</div>

					<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

					<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>

					<div class="pswp__caption">
						<div class="pswp__caption__center"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import PhotoSwipe from 'photoswipe';
	export default {
		methods: {
			openPhotoSwipe: function(img) {
				// var img = img;
				// var pswpElement = document.querySelectorAll('.pswp')[0];
				// var items = [
				// 	{
				// 		src: img,
				// 		w: '640',
				// 		h: '906'
				// 	}
				// ];
				// var options = {      
				// 	history: false,
				// 	focus: false,
				// 	showAnimationDuration: 0,
				// 	hideAnimationDuration: 0
				// };
				// var gallery = new PhotoSwipe(pswpElement,PhotoSwipeUI_Default,items,options);
				// gallery.init();
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	@import './css/photoswipe.css';
	@import './css/default-skin.css';
	.top {
		.rem(margin-bottom,30);
		.border(border-top,4,#eee);
	}
	.title {
		.rem(height,92);
		.rem(line-height,92);
		.rem(font-size,32);
		color: #333;
		text-align: center;
	}
	.prompt {
		width: 100%;
		.rem(line-height,22);
		.rem(font-size,22);
		color: #333;
		text-align: center;
	}
	.body {
		img {
			float: left;
			width: 100%;
		}
	}
</style>