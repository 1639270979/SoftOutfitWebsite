<template>
	<div id="picZoom">
		<!-- 图片放大 -->
		<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" v-if="isPic">
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
	import PhotoSwipeUI_Default from './js/photoswipe-ui-default.js';
	export default {
		props: ['isPic','items'],
		data() {
			return {

			}
		},
		methods: {
			openPhotoSwipe: function() {
				var pswpElement = document.querySelectorAll('.pswp')[0];
				// var items = [
				// 	{
				// 		src: 'http://mpic.tiankong.com/ef2/c6e/ef2c6e8ac1a39a6166fb838eaa936751/640.jpg',
				// 		w: this.width,
				// 		h: this.height
				// 	}
				// ];
				var options = {      
					history: false,
					focus: false,
					showAnimationDuration: 0,
					hideAnimationDuration: 0
				};
				var gallery = new PhotoSwipe(pswpElement,PhotoSwipeUI_Default,this.items,options);
				gallery.init();
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	@import './css/photoswipe.css';
	@import './css/default-skin.css';
</style>