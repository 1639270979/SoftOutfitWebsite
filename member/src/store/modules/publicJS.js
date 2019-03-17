import * as types from '../mutation-types';

let state = {
	isAnimation: true,
	/* alertPrompt */
	alertPromptShow: false,	//显示隐藏
	alertPromptBtn: '确定',	//按钮名称
	/* confirmPrompt */
	confirmPromptShow: false, 		//显示隐藏
	confirmPromptBtnLeft: '取消',	//左边按钮
	confirmPromptBtnRight: '确定',	//右边按钮
	/*txtPrompt*/
	txtPromptShow: false,	//显示隐藏
	/*iconPrompt*/
	iconPromptShow: false,

	promptBoxMsg: '',	//弹出框内容


	wxSystem: false, 	//是否微信浏览器

	/* load */
	pageLoadShow: false, 	//页面加载

	/* 购物车已有商品 */
	existShopCartArr: [],
	ExistShopCartShow: false,

	/* 选择层stylePrompt */
	styleShow: false,
	styleIndex: '',		//返回选择的id
	styleTitle: '',
	styleFirstStr: '',		//部分第一行提示文字
	styleLastStr: '',		//部分最后一行提示文字
	styleObject: {},		//数据

	/*数组键盘*/
	numberKeyShow: false

}

let getters = {
	alertPromptShow: state => state.alertPromptShow,
	alertPromptBtn: state => state.alertPromptBtn,

	confirmPromptShow: state => state.confirmPromptShow,
	confirmPromptBtnLeft: state => state.confirmPromptBtnLeft,
	confirmPromptBtnRight: state => state.confirmPromptBtnRight,
	
	txtPromptShow: state => state.txtPromptShow,

	iconPromptShow: state => state.iconPromptShow,

	promptBoxMsg: state => state.promptBoxMsg,

	wxSystem: state => state.wxSystem,

	pageLoadShow: state => state.pageLoadShow,

	existShopCartArr: state => state.existShopCartArr,
	ExistShopCartShow: state => state.ExistShopCartShow,

	styleShow: state => state.styleShow,
	styleIndex: state => state.styleIndex,
	styleTitle: state => state.styleTitle,
	styleFirstStr: state => state.styleFirstStr,
	styleLastStr: state => state.styleLastStr,
	styleObject: state => state.styleObject,

	numberKeyShow: state => state.numberKeyShow
}

let actions = {
	alertPrompt: ({commit}) => {
		commit(types.ALERT_PROMPT_SHOW)
	}
}

const mutations = {
	[types.ALERT_PROMPT_SHOW](state) {
		state.alertPromptShow = !state.alertPromptShow
	},
	txtPrompt(state) {
		state.txtPromptShow = !state.txtPromptShow;
	},
	iconPrompt(state) {
		state.iconPromptShow = !state.iconPromptShow;
	},
	confirmPrompt(state) {
		state.confirmPromptShow = !state.confirmPromptShow;
	},
	isWeChat(state) {
		state.wxSystem = !state.wxSystem;
	},
	isPageLoad(state) {
		state.pageLoadShow = !state.pageLoadShow;
	},
	isExistShopCartShow(state,arr) {
		state.existShopCartArr = arr;
		state.ExistShopCartShow = !state.ExistShopCartShow;
	},
	isStyleShow(state) {
		state.styleShow = !state.styleShow;
	},
	isNumberKeyShow(state) {
		state.numberKeyShow = !state.numberKeyShow;
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}