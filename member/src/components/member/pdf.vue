<template>
	<div id="pdf">
		<div id="example1"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				url: this.$route.params.url
			}
		},
		created() {
			var body = document.getElementsByTagName('body')[0];
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "https://cdn.bootcss.com/pdfobject/2.0.201604172/pdfobject.js";
			body.appendChild(script);
		},
		mounted() {
			var pdf = window.localStorage.getItem('pdf');
			//http://member.idmei.cn/static/combo/2/7/27ebecfc896ae7cd99ab0e5be303cb67.pdf
			setTimeout(() => {
				PDFObject.embed(pdf,"#example1");
			},1000)
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	// #pdf {
	// 	width: 100%;
	// 	height: 100%;
	// }
	.pdf {
		width: 100%;
	}
	.pdfobject-container { height: 500px;}
</style>