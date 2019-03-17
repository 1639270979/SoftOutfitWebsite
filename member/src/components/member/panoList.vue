<template>
	<div id="panoList">
		<div class="list">
			<ul>
				<li v-for="item in items"><router-link :to="'/myHome/list/det/myHomeSuit/'+item.case_id+'/1'"><span class="txt">{{ item.name }}</span><span class="icon-right"></span></router-link></li>
			</ul>
		</div>
    <myLoading :isLoading='isLoading' :isList = 'isList'></myLoading>
	</div>
</template>
<script>
	import { panoList } from '../../common/axios/api.js';
  import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				items: [],
        isLoading: true,
        isList:true,
			}
		},
		methods: {
			ajaxFun: function() {
				panoList().then(data => {
					if (data.code == 1) {
						for (var i = 0; i < data.list.length; i++) {
							this.items.push(data.list[i]);
						}
					}
					if(this.items.length==0){
            this.isList=false;
            this.isLoading = false;
          }else{
            this.isList = true;
            this.isLoading = false;
          }
				});
			}
		},
    components: {
      myLoading
    },
		created() {
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	.list {
		.border(border-top,1,#eee);
		li {
			width: 100%;
			.rem(height,78);
			.rem(padding-left,30);
			.rem(padding-right,30);
			.rem(line-height,78);
			.rem(font-size,22);
			.border(border-bottom,2,#eee);
			background: #fff;
			&:last-of-type {
				border-bottom: 0;
			}
			a {
				display: block;
			}
			.icon-right {
				float: right;
				.rem(width,13);
				.rem(height,24);
				.rem(margin-top,27);
				background: url(./image/right.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
</style>
