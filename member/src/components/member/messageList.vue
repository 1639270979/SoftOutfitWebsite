<template>
	<div id="messageList">
		<div class="top-title-box"></div>
		<ul class="list">
			<li class="list-info" v-for="list in lists">
				<div class="time">{{ list.addtime }}</div>
				<div :class="list.status==1?'info1':'info'" >
					<div class="info-txt">
						<p :class="list.status==1?'title1':'title'" >{{ list.title }}</p>
						<p :class="list.status==1?'txt1':'txt'">{{ list.content }}</p>
					</div>
					<div :class="list.status==1?'message-det1':'message-det'" v-if="list.type > 0" @click="jumpFun(list.type,list.jump_id ,list.id)">查看详情>></div>
				</div>
			</li>
		</ul>
		<myLoading :isLoading='isLoading' :isList="isList"></myLoading>
	</div>
</template>
<script>
	import { informsList,updateInsStatus } from '../../common/axios/api.js';
	import { iscrollAjax } from '../../common/public/iscroll.js';
	import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				page: 1,
				pageSize: 15,
				lists: [],
				isLoading: true,
				isList:true,
				isData: true
			}
		},
		components: {
			myLoading
		},
		methods: {
			iscroll: function() {
				iscrollAjax(() => {
					if (this.isData) {
						this.page += 1;
						let obj = {'page':this.page,'pageSize':this.pageSize};
						this.ajaxFun(obj);
					}
				});
			},
			ajaxFun: function(obj) {
				informsList(obj).then(data => {
          data.list.map((val) => {
						this.lists.push(val);
          });
          if(this.lists.length==0){
              this.isList = false;
          }else{
              this.isList = true;
          }
					if (data.list.length < this.pageSize) {
						this.isLoading = false;
						this.isData = false;
					}else {
						this.isData = true;
					}
				});
			},
			jumpFun: function(num,jump_id,id) {
				if (num == 1) {
					this.$router.push({ name: '订单详情',params: { oid: jump_id }});
				}else if (num == 2) {
					this.$router.push({ name: 'vip现金劵'});
				}else if(num ==3) {
					this.$router.push({ name: '设计师案例详情',params: { cid: jump_id }});
				}else if(num ==8){
          this.$router.push({ name: '设计订单'});
        }
				let obj = {id:id};
        updateInsStatus(obj).then(data=>{

        })
			}
		},
		created() {
			let obj = {'page':this.page,'pageSize':this.pageSize};
			this.ajaxFun(obj);
			this.iscroll();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin_750.less';
	#messageList {
    /*background: #F5F5F5;*/
		.top-title-box {
			width: 100%;
			.rem(height,70);
		}
		.list {
			width: 100%;
			.rem(padding-left,30);
			.rem(padding-right,30);
			overflow: hidden;
			.time {
				width: 100%;
				.rem(height,95);
				.rem(line-height,95);
				.rem(font-size,24);
				text-align: center;
				color: #999;
			}
			.info {
				width: 100%;
				.rem(min-height,170);
				.rem(border-radius,20);
				background: #fff;
			}
      .info1{
        width: 100%;
        .rem(min-height,170);
        .rem(border-radius,20);
        background: #FAFAFA;
      }
			.info-txt {
				.rem(padding,30);
			}
			.title {
				.rem(line-height,44);
				.rem(font-size,32);
			}
      .title1{
        .rem(line-height,44);
        .rem(font-size,32);
        color: #ABABAB;
      }
			.txt {
				.rem(margin-top,20);
				.rem(font-size,24);
				color: #666;
			}
      .txt1{
        .rem(margin-top,20);
        .rem(font-size,24);
        color: #ABABAB;
      }
			.message-det {
				width: 100%;
				.rem(height,72);
				.rem(padding-left,30);
				.rem(line-height,70);
				.rem(font-size,24);
				color: #666;
				.border(border-top,2,#e1e1e1);
			}
      .message-det1{
        width: 100%;
        .rem(height,72);
        .rem(padding-left,30);
        .rem(line-height,70);
        .rem(font-size,24);
        color:#ABABAB;
        .border(border-top,2,#e1e1e1);
      }
		}
	}
</style>
