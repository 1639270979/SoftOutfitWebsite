<template>
	<div id="footer" v-if="isFooter">
		<router-link to="/index" class="tabbar_item" replace>
			<span class="icon-index"></span>
			<p>首页</p>
		</router-link>
		<router-link to="/suit/2" class="tabbar_item" replace>
			<span class="icon-find"></span>
			<p>套装</p>
		</router-link>
		<router-link to="/myHome" class="tabbar_item" replace>
			<span class="icon-muHome"></span>
			<p>我家</p>
		</router-link>
		<router-link to="/designer/2"  class="tabbar_item" replace>
			<span class="icon-collect"></span>
			<p>设计师</p>
		</router-link>
		<router-link to="/member"   class="tabbar_item" replace>
			<span class="icon-member"></span>
			<p>我的</p>
		</router-link>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
  import { needLogin } from './../../common/axios/api.js';
  export default {
		props: ['isFooter'],
		computed: {
			...mapGetters([
				'wxSystem'
			])
		},
    methods:{
//		    fun(str){
//          needLogin().then(data=>{
//            if (!data.status && !this.wxSystem) {
//              window.localStorage.setItem('url', '/'+str);
//              this.$router.push({path:'/login'});
//            }else if(data.status && !this.wxSystem){
//              if(str=='member'){
//                this.$router.push({path:'/member'});
//              }else if(str=='collection'){
//                this.$router.push({path:'/collection'});
//              }
//            }
//          })
//        }
    }
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#footer {
		position: fixed;
		bottom: 0;
		z-index: 100;
		display: flex;
		width: 100%;
    max-width: 640px;
    margin: auto;
    height:1.33rem;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-shadow: 0px -1px 5px #f0f0f0;
		background: #F9F9F9;
		.tabbar_item {
			position: relative;
			display: block;
			padding-top: 5px;
			font-size: 0;
			text-align: center;
			flex: 1;
			>span {
        margin-top: 0.1rem;
				display: inline-block;
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}
			.icon-index {
        width: 0.49rem;
        height: 0.48rem;
				background-image: url('image/bottom_ico_1_home.png');
			}
			.icon-find {
        width:0.53rem;
        height:0.45rem;
				background-image: url('image/bottom_ico_2_found.png');
			}
      .icon-muHome {
        width:0.48rem;
        height:0.48rem;
        background-image: url('image/bottom_ico_3_model.png');
      }
			.icon-collect {
        width:0.53rem;
        height:0.46rem;
				background-image: url('image/bottom_ico_4_collection.png');
			}
			.icon-member {
        width:0.48rem;
        height:0.48rem;
				background-image: url('image/bottom_ico_5_my.png');
			}
			p {
        height:0.32rem;
				margin-top: 0.28rem;
				line-height: 0rem;
        font-size:0.32rem;
        color:rgba(0,0,0,1);
			}
		}
		.router-link-active {
			p {
				color: #ed7631;
			}
			.icon-index {
				background-image: url(./image/bottom_ico_1_home_state.png);
			}
			.icon-find {
				background-image: url(./image/bottom_ico_2_found_state.png);
			}
			.icon-muHome {
				background-image: url(./image/bottom_ico_3_model_state.png);
			}
			.icon-collect {
				background-image: url(./image/bottom_ico_4_collection_state.png);
			}
			.icon-member {
				background-image: url(./image/bottom_ico_5_my_state.png);
			}
		}
	}
</style>
