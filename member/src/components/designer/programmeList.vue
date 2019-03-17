<template>
	<div id="programmeList">
		<div class="list">
			<ul>
				<li></li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { programmeList } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				page: 1,
				pageSize: 15
			}
		},
		methods: {
			ajaxFun: function() {

			}
		},
		created() {

		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
</style>