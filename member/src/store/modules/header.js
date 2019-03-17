let state = {
	headerCityShow: false,	//城市是否显示
	cityName: '',	//城市名称
	cityId: 440300,	//城市id
	districtId: 0,	//地区id
	switchoverCityShow: false,	//选择城市弹出层
	backName: '',
	isSearch: false,	//搜索
	isMessage: false,	//信息
	isSet: false,	//设置
	isHeaderBack: false
}

let getters = {
	switchoverCityShow: state => state.switchoverCityShow,
	cityName: state => state.cityName,
	cityId: state => state.cityId,
	districtId: state => state.districtId,
	headerCityShow: state => state.headerCityShow,
	backName: state => state.backName,
	isHeaderBack: state => state.isHeaderBack
}

const mutations = {
	headerCity(state) {
		state.switchoverCityShow = !state.switchoverCityShow;
	},
	headerBack(state,B) {
		state.isHeaderBack = B;
	}
}

export default {
	state,
	getters,
	mutations
}