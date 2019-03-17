<template>
	<div id="loading">
		<div class="weui-loadmore" v-if="isLoading">
			<i class="weui-loading"></i>
			<span class="weui-loadmore__tips">正在加载更多的数据...</span>
		</div>
		<div class="weui-loadmore weui-loadmore_line" v-if="(!isLoading && isList)">
			<span class="weui-loadmore__tips">暂无更多数据</span>
		</div>
    <div class="bg" v-if="(!isLoading && !isList)">
        <span>空空如也</span>
    </div>
	</div>
</template>
<script>
	export default {
		props: ['isLoading','isList'],
		data() {
			return {

			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#loading {
		/*overflow: hidden;*/
	}
  .bg{
    padding-bottom: 1rem;
    position: relative;
    top: 1rem;
    margin: auto;
    width:3.45rem;
    height:3.84rem;
    background:url("image/sofa.png") no-repeat;
    background-size:100%,100%;
    span{
      position: absolute;
      top: 2.9rem;
      left: 1rem;
      color: #C5C5C5;
      font-size:0.32rem;
    }
  }
	.weui-loadmore {
		width: 65%;
		margin: 0 auto;
		.rem(margin-top,21);
		.rem(margin-bottom,21);
		.rem(line-height,44);
		.rem(font-size,22);
		text-align: center;
	}
	.weui-loading {
		.rem(width,34);
		.rem(height,34);
		display: inline-block;
		vertical-align: middle;
		animation: weuiLoading .8s steps(12, end) infinite;
		background: url('./image/loading.png') no-repeat;
		background-size: 100%;
	}
	.weui-loadmore__tips {
		display: inline-block;
		vertical-align: middle;
	}
	@keyframes weuiLoading {
		0% {
			 transform: rotate(0deg);
		}
		100% {
			 transform: rotate(360deg);
		}
	}
	.weui-loadmore_line {
		/*border-top: 1px solid #E5E5E5;*/
		.rem(margin-top,62.4);
	}
	.weui-loadmore_line .weui-loadmore__tips {
		position: relative;
		top: -0.9em;
		.rem(padding-left,14.3);
		.rem(padding-right,14.3);
		/*background-color: #FFF;*/
		color: #999;
	}
</style>
