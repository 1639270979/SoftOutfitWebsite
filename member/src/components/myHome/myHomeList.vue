  <template>
	<div id="myHomeList" v-if="Object.keys(area).length != 0" @touchmove="bgScroll">
		<div class="nav">
			<div @click="typeFun(1)"><span>{{ cityName }}<i class="icon-down"></i></span></div>
			<div @click="typeFun(2)"><span>{{ areaName }}<i class="icon-down"></i></span></div>
			<div @click="typeFun(3)"><span>{{ houseName }}<i class="icon-down"></i></span></div>
		</div>
		<div class="box"></div>
		<p class="prompt">为您找到 <span>{{ items.length }}</span> 个符合条件的户型</p>
		<div class="list">
			<ul>
				<li @click="isPopupFun(item.picture,item.name,item.area,item.id,item.describe)" v-for="item in items">
					<div class="img"><img v-lazy="item.thumb"></div>
					<div class="info">
						<p>{{ item.address }}</p>
						<p>{{ item.house_name }}</p>
						<p>{{ item.name }}　{{ item.area }}㎡</p>
						<div class="introduce">{{ item.describe }}</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="popup" v-if="isPopup" @touchmove.prevent>
			<div class="popout">
				<div class="img">
					<img :src="showObj.url">
				</div>
				<p><span class="left">{{ showObj.name }}</span><span>{{ showObj.area }}㎡</span></p>
				<p class="describe">{{ showObj.describe}}</p>
				<div class="btn">
					<span @click="cancelFun">取消</span>
					<span @click="confirmFun()" class="confirm">确定</span>
				</div>
			</div>
		</div>
		<!-- 选择层' 城市、区县、小区' -->
		<stylePrompt @increment="styleAjaxFun"></stylePrompt>
		<myLoading :isLoading='isLoading' :isList="isList"></myLoading>
	</div>
</template>
<script>
	import { myHome,houseLists,caseLists } from '../../common/axios/api.js';
	import { iscrollAjax } from '../../common/public/iscroll.js';
	import myLoading from '../loading/Loading.vue';
	export default {
		data() {
			return {
				items    : [],
				page     : 1,
				pageSize : 16,
				area     : {},
				house    : [],
				showObj  : {
					url : '',
					name: '',
					area: '',
					aid : '',
					describe: ''
				},
				isPopup  : false,
				type     : '',
				typeObj  : {
					city   : this.$route.params.cityId,
					area   : this.$route.params.areaId,
					village: this.$route.params.houseId
				},
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
						this.isData = false;
						let obj = {'page':this.page,'pageSize':this.pageSize,'area_id':aid,'house_id':hid}
						this.ajaxFun(obj);
					}
				});
			},
			ajaxFun: function(obj) {
				caseLists(obj).then(data => {
					this.items = [];
					this.area = data.areaList;
					for (var i = 0; i < data.list.length; i++) {
						this.items.push(data.list[i]);
					}
					if(this.items.length==0){
					    this.isList=false;
          }else{
					    this.isList=true;
          }
					if (data.list.length < this.pageSize) {
						this.isData = false;
						this.isLoading = false;
						return;
					}else {
						this.isData = true;
						this.isLoading = true;
						this.page ++;
					}
				})
			},
			houseFun: function(aidObj) {//小区
				houseLists(aidObj).then(data => {
					if (data.code == 1) {
						this.house = [];
						for (var i = 0; i < data.lists.length; i++) {
							this.house.push(data.lists[i]);
						}
					}
				})
			},
			typeFun: function(n) {
				this.type = n;
				if (n == 1) {
					let obj = {};
					for (let k in this.area) {
						obj[k] = this.area[k].city_name;
					}
          this.$store.state.publicJS.styleTitle = '城市';
					this.$store.state.publicJS.styleFirstStr = '热门城市';
					this.$store.state.publicJS.styleLastStr = '更多城市陆续开发中...';
					this.$store.state.publicJS.styleObject = obj;
					this.$store.commit('isStyleShow');
				}else if (n == 2) {
          if (this.typeObj.city == 'city') {
						this.isTxtFun('必须选择城市')
						return;
					}
					this.$store.state.publicJS.styleTitle = '区县';
					this.$store.state.publicJS.styleObject = this.area[this.typeObj.city].area;
					this.$store.commit('isStyleShow');
				}else{
					let obj = {};
					let houseObj = {};
          if (this.typeObj.area == 'area') {
						this.isTxtFun('必须选择区县')
						return;
					}
					if (this.typeObj.area == 'area') {
						obj = {'aid':this.typeObj.city}
					}else {
						obj = {'aid':this.typeObj.area}
					}
					houseLists(obj).then(data => {
						if (data.code == 1) {
							this.house = data.lists;
							if (this.house.length == 0) {
                this.$store.state.publicJS.styleLastStr = '该区尚未覆盖';
//                this.$store.state.publicJS.styleTitle = '小区';
							}
							this.$store.state.publicJS.styleTitle = '小区';
							this.house.map(val => {
								houseObj[val.house_id] = val.name;
							});
							this.$store.state.publicJS.styleObject = houseObj;
							this.$store.commit('isStyleShow');
						}
					})
				}
			},
			styleAjaxFun: function() {//选择后返回来重新加载
				let aid = '';
				let hid = '';
				this.page = 1;
				if (this.type == 1) {
					aid = this.$store.state.publicJS.styleIndex;
					this.typeObj.city = aid;
        }else if (this.type == 2) {
					aid = this.$store.state.publicJS.styleIndex;
					this.typeObj.area = aid;
				}else {
					hid = this.$store.state.publicJS.styleIndex;
					this.typeObj.village = hid;
				}
				let obj = {'page':this.page,'pageSize':this.pageSize,'area_id':aid,'house_id':hid}
				this.ajaxFun(obj);
			},
			isPopupFun: function(url,name,area,id,describe) {
				this.showObj.url = url;
				this.showObj.name = name;
				this.showObj.area = area;
				this.showObj.aid  = id;
				this.showObj.describe = describe;
				this.isPopup = true;
			},
			cancelFun: function() {
				this.isPopup = false;
			},
			confirmFun: function() {
				this.$router.push({name:'我家详情',params:{aid:this.showObj.aid}});
				this.isPopup = false;
			},
			isTxtFun: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1000);
			},
      bgScroll(e){
//        if(this.type==1||this.type == 2||this.type == 3){
//          e.preventDefault();
//        }
      }
		},
		computed: {
			cityName: function() {
        let typeObjCity = this.typeObj.city;
				if (typeObjCity == 'city') {
					return '城市';
				}else {
          return this.area[typeObjCity].city_name;
        }
			},
			areaName: function() {
        let typeObjArea = this.typeObj.area;
				if (typeObjArea == 'area'){
					return '区县';
				} else {
					let areaObj = this.area[this.typeObj.city].area;
					if(areaObj[typeObjArea]==undefined){
            return '区县';
          }else{
            return areaObj[typeObjArea];
          }
				}
			},
			houseName: function() {
				let typeObjHouse = this.typeObj.village;
				if (typeObjHouse == 'house') {
					return '小区';
				}else {
					let houseArr = this.house;
					let name = '';
					houseArr.map(val => {
						if (val.house_id = typeObjHouse) {
							name = val.name;
						}
					});
					return name;
				}
			}
		},
		created() {
			let aid = '';
			let hid = '';
			if (this.typeObj.city != 'city' && this.typeObj.area != 'area') {
				aid = this.typeObj.area;
			}else if (this.typeObj.city != 'city' && this.typeObj.area == 'area') {
				aid = this.typeObj.city;
			}
			if (this.typeObj.village != 'house') {
				hid = this.typeObj.village
			}

			let obj = {'page':this.page,'pageSize':this.pageSize,'area_id':aid,'house_id':hid}
			this.ajaxFun(obj);

			let aidObj = {'aid':aid}
			this.houseFun(aidObj);

			this.iscroll();
		}
	}
</script>
<style lang="less" scoped>
	@import '../../assets/mixin.less';
	#myHomeList {
		width: 100%;
		.nav {
			position: fixed;
			//top: 64px;
			z-index: 100;
			width: 100%;
      max-width: 640px;
      margin: auto;
			.border(border-top,2,#eee);
			background: #fff;
			overflow: hidden;
			> div {
				float: left;
				width: 30%;
				.rem(padding-top,5);
				.rem(padding-bottom,5);
				.rem(line-height,54);
				color: #333;
				text-align: center;
				&:last-of-type {
					width: 40%;
				}
				span {
					display: inline-block;
					width: 100%;
					height:100%;
					.rem(font-size,22);
					.border(border-right,2,#eee);
				}
				&:last-of-type span {
					border-right: 0;
				}
			}
			.icon-down {
				position: relative;
				.rem(top,-3);
				display: inline-block;
				.rem(width,10);
				.rem(height,8);
				.rem(margin-left,10);
				background: url(./image/down.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.box {
			width: 100%;
			.rem(height,66);
		}
		.prompt {
			width: 100%;
			.rem(height,48);
			.rem(line-height,48);
			.rem(font-size,22);
			color: #999;
			text-align: center;
			span {
				color: #d7581e;
			}
		}
		.list {
			width: 100%;
			ul {
				overflow: hidden;
			}
			li {
				width: 100%;
				.rem(padding,20);
				.rem(padding-bottom,26);
				.rem(padding-top,26);
				.rem(margin-bottom,4);
				background: #fff;
				overflow: hidden;
				&:last-of-type {
					border-right: 0;
				}
				.img {
					float: left;
					.rem(width,210);
					.rem(height,210);
					overflow: hidden;
					img {
						width: 100%;
					}
				}
				.info {
					width: 100%;
					.rem(padding-left,235);
					.rem(font-size,24);
					color: #333;
					p {
						width: 100%;
						.rem(margin-bottom,10);
						.rem(line-height,34);
					}
					.introduce {
						display: -webkit-box;
						width: 100%;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}
				}
			}
		}
		.popup {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 500;
			width: 100%;
			height: 100%;
			background: rgba(159,160,160,.8);
			.popout {
				position: absolute;
				top: 50%;
				left: 50%;
				.rem(width,480);
				.rem(min-height,600);
				.rem(padding,12);
				.border(border,2,#d65317);
				.border-radius(10);
				transform: translate(-50%,-50%);
				background: #fff;
			}
			.img {
				.rem(width,454);
				.rem(height,454);
				overflow: hidden;
				img {
					width: 100%;
					.rem(min-height,454);
				}
			}
			p {
				width: 100%;
				.rem(line-height,66);
				.rem(font-size,22);
				color: #333;
				text-align: center;
			}
			.describe {
				width: 100%;
				.rem(margin-bottom,20);
				.rem(line-height,40);
				text-align: left;
			}
			.left {
				.rem(margin-right,32);
			}
			.btn {
				width: 100%;
				text-align: center;
				span {
					display: inline-block;
					.rem(width,150);
					.rem(height,44);
					.rem(line-height,44);
					.rem(margin-right,68);
					.rem(font-size,22);
					color: #fff;
					.border-radius(10);
					text-align: center;
					background: #a5a5a5;
				}
				.confirm {
					margin-right: 0;
					background: #d65317;
				}
			}
		}
	}
</style>
