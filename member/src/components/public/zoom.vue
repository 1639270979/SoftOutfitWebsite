<template>
	<div class="pswp" id="iosMask">
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
</template>
<script>
	import PhotoSwipe from 'photoswipe';
	export default {
		props: ['isZoomShow','zoomImgArr','zoomIndex'],//zoomImgArr 图片数组	zoomIndex 点击要显示的这张图片是该数组的第几张
		data() {
			return {
			}
		},
		watch: {
			'isZoomShow': function (newVal,oldVal) {
			    oldVal='';
				if (newVal) {
					document.getElementById('iosMask').style.display = 'block';
					if (this.zoomImgArr) {
						let items = new Array();
						for (var i = 0; i < this.zoomImgArr.length; i++) {
							items.push({
								src: this.zoomImgArr[i].src,
								w  : this.zoomImgArr[i].width,
								h  : this.zoomImgArr[i].height
							});
							if (i == this.zoomImgArr.length -1) {
								let pswpElement = document.querySelectorAll('#iosMask')[0];
								let options = {
									history: false,
									focus: false,
									showAnimationDuration: 0,
									hideAnimationDuration: 0,
									index: this.zoomIndex
								};
								let gallery = new PhotoSwipe(pswpElement,PhotoSwipeUI_Default,items,options);
								gallery.init();
							}
						};
					}
					this.$emit('update:isZoomShow', false);
				}
			}
		},
	}
</script>
<style lang="less" scoped>
	@import './css/photoswipe.css';
	@import './css/default-skin.css';
</style>
