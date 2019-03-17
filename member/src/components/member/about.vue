<template>
	<div id="about">
		<div class="top">
			<!-- <div class="img"><img src="./image/LOGO.png"></div>
			<p class="num">V1.0</p>
			<p class="company">深圳兴汇大美网络科技有限公司</p>
			<p class="adres">公司地址：深圳市南山区华侨城创意园北区B1栋301</p>
			<p class="adres">大美官网：www.idmei.com</p>
			<p class="mailbox">服务邮箱：service@idmei.cn(问题与咨询)</p>
			<p class="mailbox">bd@idmei.cn（商务合作）</p> -->
			<img src="./image/about_1.jpg">
			<img src="./image/about_2.jpg">
			<img src="./image/about_3.jpg">
			<img src="./image/about_4.jpg">
			<img src="./image/about_5.jpg">
			<img src="./image/about_6.jpg">
		</div>
		<div class="list">
			<ul>
				<!-- <router-link to="/index/demo" tag="li">给大美家评分</router-link> -->
				<!-- <li>给大美软装评分</li> -->
				<li>联系我们<span class="fr">0755-86337169</span></li>
				<li>当前版本<span class="fr">V{{num}}</span></li>
			</ul>
		</div>
		<div class="jurisdiction">
			<p>{{ msg }}</p>
			<p>Copyright ©2017</p>
			<p>深圳兴汇大美网络科技有限公司</p>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				msg: '',
        num:''
			}
		},
		methods: {
			sendInfoToNative: function() {//发给原生
                var message = {'methodName':'sendInfoToNative','body':{'Phone':'0755-86337169'}};
                // AppModel就是已经注入的名称，注入以后，就可以在JS端调用了
                window.webkit.messageHandlers.AppModel.postMessage(message);
			},
        	getInfoFromNative: function(returnStr) {
        		this.msg = returnStr;
        	}
		},
    created(){
      this.num = window.appModel.getNativeVersion();
    }
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	.top {
		width: 100%;
		//.rem(margin-top,4);
		//.rem(padding-top,48);
		.rem(padding-bottom,50);
		background: #fff;
		overflow: hidden;
		.img {
			.rem(width,270);
			margin: 0 auto;
			.rem(margin-bottom,30);
			overflow: hidden;
			img {
				float: left;
				width: 100%;
			}
		}
		.num {
			width: 100%;
			.rem(margin-bottom,50);
			.rem(font-size,26);
			color: #d65317;
			text-align: center;
		}
		.company {
			width: 100%;
			.rem(margin-bottom,30);
			.rem(line-height,26);
			.rem(font-size,26);
			color: #333;
			text-align: center;
		}
		.adres {
			width: 100%;
			.rem(margin-bottom,20);
			.rem(line-height,22);
			.rem(font-size,22);
			color: #666;
			text-align: center;
		}
		.mailbox {
			width: 100%;
			.rem(margin-bottom,18);
			.rem(line-height,22);
			.rem(font-size,22);
			color: #666;
			text-align: center;
		}
		img {
			width: 100%;
		}
	}
	.list {
		.rem(margin-top,14);
		li {
			.rem(height,78);
			.rem(padding-left,30);
			.rem(padding-right,30);
			.rem(line-height,78);
			.rem(font-size,26);
			color: #333;
			.border(border-bottom,2,#eee);
			background: #fff;
			&:last-of-type {
				border-bottom: 0;
			}
		}
	}
	.jurisdiction {
		width: 100%;
		//.rem(margin-top,240);
		.rem(margin-top,100);
		.rem(padding-bottom,30);
		p {
			.rem(font-size,22);
			color: #ccc;
			text-align: center;
		}
	}
</style>
