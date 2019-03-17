<template>
	<div id="Index">
		<div class="title">户型选择</div>
		<div class="type">
			<ul>
				<li @click="choiceFun(1)">
					<span>选择城市</span>
					<div class="fr">
						<span class="txt">{{ cityName }}</span>
						<span class="icon-right"></span>
					</div>
				</li>
				<li @click="choiceFun(2)">
					<span>选择区县</span>
					<div class="fr">
						<span class="txt">{{ areaName }}</span>
						<span class="icon-right"></span>
					</div>
				</li>
				<li @click="choiceFun(3)">
					<span>选择小区</span>
					<div class="fr">
						<span class="txt">{{ houseName }}</span>
						<span class="icon-right"></span>
					</div>
				</li>
			</ul>
		</div>
		<div class="btn"><span @click="searchFun">立即搜索</span></div>
    <p class="p1">收集最新户型 免费试看360度全景效果图</p>
		<!-- 选择层' 城市、区县、小区' -->
    <div class="fort">

    </div>
		<stylePrompt @increment="styleAjaxFun"></stylePrompt>


  </div>
</template>
<script>
	import { myHome,houseLists } from '../../common/axios/api.js';
	export default {
		data() {
			return {
				area     : {},
				house    : [],
				type   : '',
				typeObj: {
					city   : 'city',
					area   : 'area',
					village: 'house'
				}
			}
		},
		methods: {
			ajaxFun: function() {
				myHome().then(data => {
					this.area = data.areaList;
				})
			},
			choiceFun: function(n) {
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
				if (this.type == 1) {
					this.typeObj.city = this.$store.state.publicJS.styleIndex;
				}else if (this.type == 2) {
					this.typeObj.area = this.$store.state.publicJS.styleIndex;
				}else {
					this.typeObj.village = this.$store.state.publicJS.styleIndex;
				}
			},
			searchFun: function() {
				this.$router.push({name:'我家列表',params:{houseId:this.typeObj.village,areaId:this.typeObj.area,cityId:this.typeObj.city}});
			},
			isTxtFun: function(str) {
				this.$store.state.publicJS.promptBoxMsg = str;
				this.$store.commit('txtPrompt');
				setTimeout(() => {
					this.$store.commit('txtPrompt');
				},1000);
			}
		},
		computed: {
			cityName: function() {
				let typeObjCity = this.typeObj.city;
				if (typeObjCity == 'city') {
					return '';
				}else {
					return this.area[typeObjCity].city_name;
				}
			},
			areaName: function() {
				let typeObjArea = this.typeObj.area;
				if (typeObjArea == 'area') {
					return '';
				}else {
					let areaObj = this.area[this.typeObj.city].area;
					return areaObj[typeObjArea];
				}
			},
			houseName: function() {
				let typeObjHouse = this.typeObj.village;
				if (typeObjHouse == 'house') {
					return '';
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
			this.ajaxFun();
		}
	}
</script>
<style lang="less" scoped>
  @import '../../assets/mixin.less';
  #Index {
    width: 100%;
    margin: auto;
    .title{
      margin: 0.54rem 0;
      width: 100%;
      .rem(height,74);
      .rem(line-height,74);
      font-size: 0.48rem;
      color: #000;
      text-align: center;
      /*<!--.border(border-top,2,#eee);-->*/
      background: #fff;
    }
    .type {
      width: 80%;
      height: 3.52rem;
      margin: auto;
      ul {
        background: #fff;
      }
      li {
        width: 100%;
        .rem(height,74);
        .rem(padding-left,30);
        .rem(padding-right,27);
        .rem(line-height,74);
        .rem(font-size,22);
        color: #616161;
        .border(border-bottom,2,#eee);
        overflow: hidden;
      }
      .fr {
        font-size: 0;
        span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .txt {
        .rem(margin-right,10);
        .rem(font-size,22);
        color: #999;
      }
      .icon-right {
        .rem(width,13);
        .rem(height,24);
        background: url(./image/right_1.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .btn {
      width: 100%;
      .rem(margin-top,22);
      color: #fff;
      text-align: center;
      span {
        display: inline-block;
        .rem(width,500);
        .rem(height,58);
        margin: 0 auto;
        .rem(line-height,58);
        .rem(font-size,24);
        .border-radius(5);
        background: #D55317;
      }
    }
    .p1{
      margin-top: 0.4rem;
      width: 100%;
      text-align: center;
      color: #BABABA;
      font-size: 0.4rem;
    }
    .fort{
      /*position: absolute;*/
      /*bottom: 0;*/
      margin-top: 0.8rem;
      width: 100%;
      max-width: 640px;
      height: 5.4rem;
      background:url('image/door_model_bg.png') no-repeat;
      background-size: 100%,100%;
    }
  }
</style>
