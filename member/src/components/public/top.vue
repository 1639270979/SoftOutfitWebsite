<template>
	<div id="top" v-if="isTop">
		<div class="return-top" @click="backTop"><img src="./image/top.png"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				isTop: false
			}
		},
		methods: {
			scrollFun: function() {
				if (window.scrollY > 2100) {
					this.isTop = true;
				}else {
					this.isTop = false;
				}
			},
			backTop: function() {
				let back = setInterval(() => {
					if(document.body.scrollTop||document.documentElement.scrollTop){
						document.body.scrollTop -= 100;
						document.documentElement.scrollTop -= 100;
					}else {
						clearInterval(back);
					}
				});
			}
		},
		created() {
			window.addEventListener('scroll', this.scrollFun)
		}
	}
</script>
<style lang="less" scoped>
	#top {
		.return-top {
			position: fixed;
			right: 0px;
			bottom: 70px;
			z-index: 50;
			width: 30px;
			height: 30px;
			img {
				float: left;
				width: 100%;
				opacity: .5;
			}
		}
	}
</style>