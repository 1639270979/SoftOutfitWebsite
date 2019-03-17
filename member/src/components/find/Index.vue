<template>
	<div id="find">
		<div class="find-list">
			<ul>
				<li v-for="item in items">
					<router-link :to="{ name: '发现详情',params: {id:item.article_id,is_page:2} }">
						<img v-lazy="item.list_pic">
						<span>{{item.title}}</span>
            <p>{{item.brief}}</p>
					</router-link>
				</li>
			</ul>
		</div>
		<myLoading :isLoading='isLoading' :isList="isList"></myLoading>
	</div>
</template>
<script>
	import { find } from '../../common/axios/api.js';
	import { iscrollAjax } from '../../common/public/iscroll.js';
	import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				items: [],
				page: 1,
				pageSize: 15,
				isLoading: true,
				isList:true,
				isData: true,
			}
		},
		components: {
			myLoading,
		},
		methods: {
			initFun: function() {
				this.items = [];
				this.page  = 1;
				let obj = {'page':this.page,'pageSize':this.pageSize}
				this.ajaxFun(obj);
			},
			iscroll : function() {
				iscrollAjax(() => {
					if (this.isData) {
						this.isData = false;
						this.page += 1;
						let obj = {'pageSize':this.pageSize,'page':this.page,'status':this.num}
						this.ajaxFun(obj);
					}
				});
			},
			ajaxFun: function(obj) {
				find(obj).then(data => {
					if (!data.empty) {
            this.isList = true;
						for (var i = 0; i < data.articleList.length; i++) {
							this.items.push(data.articleList[i]);
						}
						if (data.articleList.length < this.pageSize) {
							this.isLoading = false;
							this.isData = false;
						}else {
							this.isData = true;
							this.isLoading = true;
						}
					}else {
						this.isLoading = false;
						this.isData = false;
						this.isList = false;
					}
					this.iscroll();
				})
			}
		},
		beforeRouteEnter(to,from,next) {
			if (from.name != '发现详情') {
				window.localStorage.setItem('scrollTop',0);
			}
			next(vm => {
				let scrollTop = window.localStorage.getItem('scrollTop');
				window.scrollTo(0,scrollTop);
        // if (from.name != '发现详情') {
				// 	vm.initFun();
				// }
			});
		},
		created() {
			let obj = {'page':this.page,'pageSize':this.pageSize}
			this.ajaxFun(obj);
		},
		activated() {
			this.iscroll();
		},
		beforeRouteLeave(to,from,next) {
			if (to.name == '发现详情') {
				let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				window.localStorage.setItem('scrollTop',scrollTop);
			}
			next();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	.find-list {
    width: 93%;
    margin: auto;
		li {
			position: relative;
			width: 100%;
			.rem(margin-top,10);
      background-color: #fff;
			overflow: hidden;
      margin-bottom: 0.5rem;
			&:first-of-type {
				margin-top: 0;
			}
			a {
				display: block;
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
			img {
				float: left;
				width: 100%;
				margin: auto;
        margin-bottom: 0.3rem;
			}
			img[lazy=loading] {
        width: 200px;
        height: 200px;
        display: block;
        margin: 0 2.3rem;
        margin-bottom: 0.3rem;
			}
			span {
        width: 100%;
        padding-left: 0.39rem;
        .rem(line-height,54);
        font-size:0.45rem;
        color: #000000;
			}
      p{
        width: 92%;
        margin: auto;
        text-align: left;
        font-size:0.40rem;
        color:#616161;
        overflow: hidden;  /** 隐藏超出的内容 **/
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
        margin-top: 0.15rem;
        margin-bottom: 0.2rem;
        padding-top: 0.2rem;
        border-top: 1px solid #eee;
      }
		}
	}
</style>
