import axios from 'axios';
import qs from 'qs';

// const url  = 'http://member.dm.com';
// const url1 = 'http://member.dm.com';
const url  = window.location.protocol+'//'+window.location.host;
// const url = 'http://member.idmei.com';
/********************* 验证登录 ******  ***************/
//检测是否登录
export const needLogin = () => {
	return axios.get(`${url}/login/checkLogin`).then(res => res.data);
}
//登录
export const login = params => {
	return axios.post(`${url}/login/check`,qs.stringify(params)).then(res => res.data);
}
//验证码
export const getVf = params => {
	return axios.post(`${url}/login/getVf`,qs.stringify(params)).then(res => res.data);
}
//注册
export const register = params => {
	return axios.post(`${url}/login/register`,qs.stringify(params)).then(res => res.data);
}
//完善
export const perfect = params => {
	return axios.post(`${url}/login/perfect`,qs.stringify(params)).then(res => res.data);
}
//setCookie
export const setCookie = params => {
	return axios.get(`${url}/login/setCookie?openid=${params.openid}&source=${params.source}`).then(res => res.data);
}
//验证验证码
export const checkVf = params => {
	return axios.post(`${url}/login/checkVf`,qs.stringify(params)).then(res => res.data);
}
//忘记密码的修改密码
export const changePsw = params => {
	return axios.post(`${url}/login/changePw`,qs.stringify(params)).then(res => res.data);
}
//退出登录
export const LogOut = () => {
	return axios.get(`${url}/member/Setting/LogOut`).then(res => res.data);
}
/********************* 首页 *********************/
//首页
export const index = () => {
	return axios.post(`${url}/index/lists`).then(res => res.data);
}
//城市列表
export const switchoverCity = () => {
	return axios.get(`${url}/area`).then(res => res.data);
	// return axios.get('../../memberStatic/js/city.json').then(res => res.data);
	// return axios.get('../../static/js/city.json').then(res => res.data);
}
//添加地址
export const areaJson = () => {
  return axios.get('../../memberStatic/js/area_all.json').then(res => res.data);
  // return axios.get('../../static/js/area_all.json').then(res => res.data);
}
//设置所在城市
export const setArea = params => {
	return axios.post(`${url}/index/setArea`,qs.stringify(params)).then(res => res.data);
}
//获取位置
export const getCityNameByLocation = params => {
	return axios.post(`${url}/index/getCityNameByLocation`,qs.stringify(params)).then(res => res.data);
}
/********************* 套装 *********************/
//套装列表页
export const suitList = params => {
	return axios.post(`${url}/Suit/loadList`,qs.stringify(params)).then(res => res.data);
}
//套装详情页
export const suitDet = params => {
	return axios.get(`${url}/Suit/detail?sid=${params}`).then(res => res.data);
}
//套装收藏
export const suitCollect = params => {
	return axios.post(`${url}/suit/collect`,qs.stringify(params)).then(res => res.data);
}
//套装点击量
export const suitAddHits = params => {
	return axios.get(`${url}/suit/addHits?sid=${params}`).then(res => res.data);
}
/********************* 设计师 *********************/
//设计师列表
export const designer = params => {
	return axios.post(`${url}/designer/loadList`,qs.stringify(params)).then(res => res.data);
}
//设计师留言内容
export const designerMsg = params => {
	return axios.post(`${url}/designer/message`,qs.stringify(params)).then(res => res.data);
}
//设计师留言发布
export const designerPostMsg = params => {
	return axios.post(`${url}/designer/postMessage`,qs.stringify(params)).then(res => res.data);
}
//设计师详情
export const designerDet = params => {
	return axios.get(`${url}/designer/detail?did=${params.did}&page=${params.page}&pageSize=${params.pageSize}`).then(res => res.data)
}
//设计师收藏
export const designerCollect = params => {
	return axios.post(`${url}/designer/collect`,qs.stringify(params)).then(res => res.data);
}
//设计师请他设计
export const designerPlease = params => {
	return axios.post(`${url}/orders/Orders/addOrder`,qs.stringify(params)).then(res => res.data);
}
//方案列表
export const programmeList = params => {
	return axios.post(`${url}/Designcase/loadList`,qs.stringify(params)).then(res => res.data);
}
//方案详情
export const programmeDet = params => {
	return axios.get(`${url}/designcase/detail?cid=${params}`).then(res => res.data);
}
//案例取消收藏
export const programmeCollect = params => {
	return axios.post(`${url}/Designcase/collect`,qs.stringify(params)).then(res => res.data);
}
/********************* 华英会 *********************/
//华英会-翠提春晓简介
export const eliteSupplier = params => {
  return axios.get(`${url}/elite/eliteSupplier`).then(res => res.data);
}
//华英会-事件记录
export const eliteEvent = params => {
  return axios.get(`${url}/elite/eliteEvent`).then(res => res.data);
}
//华英会-联合发起人信息
export const eliteIntro = params => {
  return axios.get(`${url}/elite/eliteIntro`).then(res => res.data);
}
//华英会设计师详情
export const designerDetail = params => {
  return axios.get(`${url}/elite/designerDetail?did=${params.did}`).then(res => res.data);
}
//华英会-设计师列表
export const designerList = params => {
  return axios.post(`${url}/elite/designerList`,qs.stringify(params)).then(res => res.data);
}
//华英会-会员申请
export const applyMember = params => {
  return axios.post(`${url}/elite/applyMember`,qs.stringify(params)).then(res => res.data);
}
//华英会-设计师案例列表
export const eliteCaseList = params => {
  return axios.post(`${url}/elite/caseList`,qs.stringify(params)).then(res => res.data);
}
//华英会-案例详情
export const elitecaseDetail = params => {
  return axios.get(`${url}/elite/caseDetail?cid=${params.cid}`).then(res => res.data);
};
//华英会-新闻资讯列表
export const newsList = params => {
  return axios.post(`${url}/elite/newsList`,qs.stringify(params)).then(res => res.data);
}
//华英会-新闻详情
export const newsDetail = params => {
  return axios.get(`${url}/elite/newsDetail?id=${params.id}`).then(res => res.data);
};
//华英会委托设计
export const elitaddorder = params => {
  return axios.post(`${url}/elite/addorder`,qs.stringify(params)).then(res => res.data);
};
//华英会-品牌列表
export const brandList = params => {
  return axios.post(`${url}/elite/brandList`,qs.stringify(params)).then(res => res.data);
};
//华英会-设计驱动列表
export const activityList = params => {
  return axios.post(`${url}/elite/activityList`,qs.stringify(params)).then(res => res.data);
}
//华英会-设计驱动详情
export const activityDetail = params => {
  return axios.get(`${url}/elite/activityDetail?aid=${params.aid}`).then(res => res.data);
};
//华英会-发布留言
export const elitaMessage = params => {
  return axios.post(`${url}/elite/postMessage`,qs.stringify(params)).then(res => res.data);
};
//华英会-验证码
export const elitegetVf = params => {
  return axios.post(`${url}/elite/getVf`,qs.stringify(params)).then(res => res.data);
};
//华英会-报名活动
export const applyActivity = params => {
  return axios.post(`${url}/elite/applyActivity`,qs.stringify(params)).then(res => res.data);
};
//华英会-收藏设计师
export const eliteCollect = params => {
  return axios.post(`${url}/elite/collect`,qs.stringify(params)).then(res => res.data);
};
//名师详情
export const masterDet = params => {
	return axios.get(`${url}/Master/detail?mid=${params.mid}&page=${params.page}&pageSize=${params.pageSize}`).then(res => res.data)
}
//名师案例收藏
export const masterCollect = params => {
	return axios.post(`${url}/Mastercase/collect`,qs.stringify(params)).then(res => res.data);
}
//名师信息
export const masterInfor = params => {
	return axios.get(`${url}/Master/information?mid=${params}`).then(res => res.data);
}
//名师案例详情
export const masterCaseDet = params => {
	return axios.get(`${url}/Mastercase/detail?mcid=${params}`).then(res => res.data);
}
//名师留言
export const masterMsg = params => {
	return axios.post(`${url}/master/messageList`,qs.stringify(params)).then(res => res.data);
}
//名师发表留言
export const masterPostMsg = params => {
	return axios.post(`${url}/master/postMessage`,qs.stringify(params)).then(res => res.data);
}
//名师委托设计
export const masterOrder = params => {
	return axios.post(`${url}/orders/masterorder/addorder`,qs.stringify(params)).then(res => res.data);
}
//华英会
export const eliteclub = () => {
	return axios.post(`${url}/eliteclub/index/`).then(res => res.data);
}
//七牛
export const getQiniuToken = () => {
	return axios.get(`${url}/Master/getQiniuToken`).then(res => res.data);
}
/********************* 商品 *********************/
//商品列表
export const shop = params => {
	return axios.post(`${url}/shop/index/loadList`,qs.stringify(params)).then(res => res.data);
}
//商品列表分类选项的子类
export const getCategory = params => {
	return axios.post(`${url}/shop/index/getCategory`,qs.stringify(params)).then(res => res.data);
}
//商品详情
export const shopDet = params => {
	return axios.get(`${url}/shop/product/index?pid=${params}`).then(res => res.data);
}
//产品说明信息
export const productExplain = params => {
  return axios.get(`${url}/shop/product/productExplain`).then(res => res.data);
}
//商品详情收藏
export const shopDetCollect = params => {
	return axios.post(`${url}/shop/product/collect`,qs.stringify(params)).then(res => res.data);
}
//商品详情加入购物车
export const shopAddCart = params => {
	return axios.post(`${url}/shop/cart/add`,qs.stringify(params)).then(res => res.data);
}
//已有商品加入购物车
export const addHasCart = params => {
	return axios.post(`${url}/shop/cart/addHasCart`,qs.stringify(params)).then(res => res.data);
}
//品牌
export const brand = params => {
	return axios.post(`${url}/shop/product/ajaxBrand`,qs.stringify(params)).then(res => res.data);
}
//品牌收藏
export const collectBrand = params => {
	return axios.post(`${url}/shop/product/collectBrand`,qs.stringify(params)).then(res => res.data);
}
//买家评价
export const appraiseList = params => {
	return axios.post(`${url}/shop/product/appraiseList`,qs.stringify(params)).then(res => res.data);
}
//产品相关套装
export const prosuitList = params => {
  return axios.post(`${url}/shop/product/suitList`,qs.stringify(params)).then(res => res.data);
}
/********************* 购物车 *********************/
//我的购物车
export const cart = () => {
	return axios.post(`${url}/shop/cart/index`).then(res => res.data);
}
//购物车删除
export const cartDel = params => {
	return axios.post(`${url}/shop/cart/delete`,qs.stringify(params)).then(res => res.data);
}
//购物车立即结算信息
export const cartConfirm = params => {
	return axios.get(`${url}/shop/order/confirm?carts=${params.carts}&sid=${params.sid}`).then(res => res.data);
}
//秒杀立即结算信息
export const seckillConfirm = params => {
	return axios.get(`${url}/shop/order/seckillConfirm?carts=${params}`).then(res => res.data);
}
//收货地址是否有合伙人
export const hasPartner = params => {
  return axios.post(`${url}/shop/order/hasPartner`,qs.stringify(params)).then(res => res.data);
}
/********************* 确认订单 *********************/
//确认订单设置默认地址
export const adrSetDefault = params => {
	return axios.post(`${url}/member/address/setDefault`,qs.stringify(params)).then(res => res.data);
}
//确定订单删除地址
export const adrDelete = params => {
	return axios.post(`${url}/member/address/delete`,qs.stringify(params)).then(res => res.data);
}
//保存添加地址
export const adrSave = params => {
	return axios.post(`${url}/member/address/save`,qs.stringify(params)).then(res => res.data);
}
//立即结算
export const create = params => {
	return axios.post(`${url}/shop/order/create`,qs.stringify(params)).then(res => res.data);
}
//秒杀立即结算
export const seckillCreate = params => {
	return axios.post(`${url}/shop/order/seckillCreate`,qs.stringify(params)).then(res => res.data);
}
//支付接口
export const pay = params => {
	return axios.post(`${url}/shop/order/pay`,qs.stringify(params)).then(res => res.data);
}
//支付接口1
export const pay1 = params => {
	return axios.post(`${url}/orders/Orders/payOrder`,qs.stringify(params)).then(res => res.data);
}
/********************* 发现 *********************/
//发现
export const find = params => {
	return axios.post(`${url}/find/loadList`,qs.stringify(params)).then(res => res.data);
}
//发现详情
export const findDetail = params => {
	return axios.get(`${url}/find/detail?id=${params}`).then(res => {
		let str = '';
		str += '<style>.content {overflow:hidden;} .content img {float:left;max-width: 100%;}</style>' + res.data.article.content;
		res.data.article.content = str;
		return res.data
	});
}
//发现详情收藏
export const findCollect = params => {
	return axios.post(`${url}/find/collect`,qs.stringify(params)).then(res => res.data);
}
/********************* 我家 *********************/
export const myHome = () => {
	return axios.post(`${url}/home/index`).then(res => res.data);
}
//小区
export const houseLists = params => {
	return axios.post(`${url}/home/index/houseLists`,qs.stringify(params)).then(res => res.data);
}
//立即所搜
export const caseLists = params => {
	return axios.post(`${url}/home/index/caseLists`,qs.stringify(params)).then(res => res.data);
}
//详情
export const caseDetail = params => {
	return axios.post(`${url}/home/index/caseDetail`,qs.stringify(params)).then(res => res.data);
}
//我家套装详情
export const comboDetail = params => {
	return axios.post(`${url}/home/index/comboDetail`,qs.stringify(params)).then(res => res.data);
}
//我的全景效果图
export const effectPic = params => {
	return axios.get(`${url}/member/combo/effectPic?cid=${params}`).then(res => res.data);
}
//套餐订单
export const createPayment = params => {
	return axios.post(`${url}/home/index/createPayment`,qs.stringify(params)).then(res => res.data);
}
//支付接口
export const payPayment = params => {
	return axios.post(`${url}/home/index/payPayment`,qs.stringify(params)).then(res => res.data);
}
/********************* 收藏 *********************/
export const collection = params => {
	return axios.post(`${url}/member/collect/listLoad`,qs.stringify(params)).then(res => res.data);
}
//取消收藏
export const cancelCollect = params => {
	return axios.post(`${url}/member/collect/cancel`,qs.stringify(params)).then(res => res.data);
}
/********************* 我的 *********************/
export const member = () => {
	return axios.post(`${url}/member/index`).then(res => res.data);
}
export const editInfo = params => {
	return axios.post(`${url}/member/Vipinfo/editInfo`,qs.stringify(params)).then(res => res.data);
}
//获取当前版本号
export const getAndroidVersion = () => {
	return axios.get(`${url}/version/getAndroidVersion`).then(res => res.data);
}
//反馈
export const saveFeed = params => {
	return axios.post(`${url}/member/index/saveFeed`,qs.stringify(params)).then(res => res.data);
}
//认证密码
export const change = params => {
	return axios.post(`${url}/member/Vipinfo/check`,qs.stringify(params)).then(res => res.data);
}
//修改密码
export const changePw = params => {
	return axios.post(`${url}/member/Vipinfo/changePw`,qs.stringify(params)).then(res => res.data);
}
//设计订单
export const designOrder = params => {
	return axios.post(`${url}/orders/Orders/ajaxOrders`,qs.stringify(params)).then(res => res.data);
}
//设计订单确认
export const designConfirm = params => {
	return axios.post(`${url}/orders/Orders/confirm`,qs.stringify(params)).then(res => res.data);
}
//设计订单修改
export const designModify = params => {
	return axios.post(`${url}/orders/Orders/modify`,qs.stringify(params)).then(res => res.data);
}
//设计订单取消/关闭
export const designCancel = params => {
	return axios.post(`${url}/orders/Orders/cancel`,qs.stringify(params)).then(res => res.data);
}
//设计订单退款
export const designRefund = params => {
	return axios.post(`${url}/orders/Orders/refund`,qs.stringify(params)).then(res => res.data);
}
//设计订单取消退款
export const cancelRefund = params => {
	return axios.post(`${url}/orders/Orders/cancelRefund`,qs.stringify(params)).then(res => res.data);
}
//设计订单延时申请
export const agreeDelay = params =>{
  return axios.post(`${url}/orders/Orders/agreeDelay`,qs.stringify(params)).then(res => res.data);
}
//名师订单列表
export const masterorder = params => {
	return axios.post(`${url}/member/masterorder/loadList`,qs.stringify(params)).then(res => res.data);
}
//收货地址
export const adresList = () => {
	return axios.get(`${url}/member/Address/lists`).then(res => res.data);
}
//商品评价
export const appraise = params => {
	return axios.post(`${url}/member/order/appraise`,qs.stringify(params)).then(res => res.data);
}
//申请退款/换货
export const service = params => {
	return axios.post(`${url}/member/Order/service`,qs.stringify(params)).then(res => res.data);
}
//退换详情
export const serviceDetail = params => {
	return axios.post(`${url}/member/Order/serviceDetail`,qs.stringify(params)).then(res => res.data);
}
//退换详情提交
export const deliver = params => {
	return axios.post(`${url}/member/Order/deliver`,qs.stringify(params)).then(res => res.data);
}
//退换货详情取消申请
export const cancelService = params => {
	return axios.post(`${url}/member/Order/cancelService`,qs.stringify(params)).then(res => res.data);
}
//已购户型全景图
export const panoList = () => {
	return axios.get(`${url}/member/Combo/panoList`).then(res => res.data);
}
//已购户型套餐
export const comboList = () => {
	return axios.get(`${url}/member/Combo/comboList`).then(res => res.data);
}
//剩余设计费用
export const prepayCase = params => {
	return axios.get(`${url}/orders/orders/prepayCase?oid=${params}`).then(res => res.data);
}
//消息首页
export const informsIndex = () => {
	return axios.get(`${url}/informs/informsIndex`).then(res => res.data);
}
//消息列表
export const informsList = params => {
	return axios.post(`${url}/informs/informsList`,qs.stringify(params)).then(res => res.data);
}
//修改消息状态
export const updateInsStatus = params => {
	return axios.post(`${url}/informs/updateInsStatus`,qs.stringify(params)).then(res => res.data);
}
/********************* VIP *********************/
//VIP信息
export const vipInfo = () => {
	return axios.get(`${url}/member/vipinfo/vipInfo`).then(res => res.data);
}
//开通VIP
export const saveVip = params => {
	return axios.post(`${url}/member/vipinfo/saveVip`,qs.stringify(params)).then(res => res.data);
}
//装修需求
export const vipAddOrder = params => {
	return axios.post(`${url}/orders/viporder/addorder`,qs.stringify(params)).then(res => res.data);
}
//订单详情
export const vipOrderDet = params => {
	return axios.get(`${url}/orders/viporder/orderDetail?oid=${params}`).then(res => res.data);
}
//vip方案列表
export const vipDesigncaseLoadList = params => {
	return axios.post(`${url}/vipdesigncase/loadList`,qs.stringify(params)).then(res => res.data);
}
//vip方案详情
export const vipDesignCase = params => {
	return axios.get(`${url}/vipdesigncase/detail?oid=${params}`).then(res => res.data);
}
//vip设计申请修改
export const vipOrderModify = params => {
	return axios.post(`${url}/orders/viporder/modify`,qs.stringify(params)).then(res => res.data);
}
//vip方案确定
export const vipOrderConfirm = params => {
	return axios.post(`${url}/orders/viporder/confirm`,qs.stringify(params)).then(res => res.data);
}
//vip方案收藏
export const vipDesignCaseCollect = params => {
	return axios.post(`${url}/vipdesigncase/collect`,qs.stringify(params)).then(res => res.data);
}
//vip现金劵
export const vipCardList = () => {
	return axios.get(`${url}/member/vipinfo/cardList`).then(res => res.data);
}
//vip现金券兑换
export const vipRedeemCard = params => {
	return axios.post(`${url}/member/vipinfo/redeemCard`,qs.stringify(params)).then(res => res.data);
}
/********************* 订单 *********************/
export const order = params => {
	return axios.post(`${url}/member/order/loadList`,qs.stringify(params)).then(res => res.data);
}
//订单详情
export const orderDet = params => {
	return axios.get(`${url}/member/order/detail?oid=${params}`).then(res => res.data);
}
//取消订单
export const cancel = params => {
	return axios.post(`${url}/member/order/cancel`,qs.stringify(params)).then(res => res.data);
}
/********************* 搜索 *********************/
export const search = params => {
	return axios.post(`${url}/search/loadlist`,qs.stringify(params)).then(res => res.data);
}
//搜索记录
export const searchHistory = params => {
	return axios.post(`${url}/search`,qs.stringify(params)).then(res => res.data);
}
//清除历史记录
export const clearHistory = () => {
	return axios.post(`${url}/search/clearLog`).then(res => res.data);
}
/********************* 订单支付 *********************/
export const payment = params => {
	return axios.post(`${url}/orders/orders/payment`,qs.stringify(params)).then(res => res.data);
}
export const payType = params => {
	return axios.post(`${url}/member/order/payType`,qs.stringify(params)).then(res => res.data);
}
//获取微信支付信息
export const topay = params => {
	return axios.get(`${url}/wechat/topay?oid=${params.oid}&type=${params.type}`).then(res => res.data);
}
//分开支付
export const multipleCreate = params => {
	return axios.post(`${url}/shop/order/multipleCreate`,qs.stringify(params)).then(res => res.data);
}
/********************* 单页面 *********************/
export const SPA = params => {
	return axios.get(`${url}/H5/getHouseCase?cid=${params}`).then(res => res.data);
}
export const getRedeemCode = () => {
	return axios.get(`${url}/h5/getRedeemCode`).then(res => res.data);
}
//产品订单确认
export const confirmOrder = params => {
  return axios.post(`${url}/member/Order/confirmOrder`,qs.stringify(params)).then(res => res.data);
}
//新城市列表
export const newCity = () => {
  return axios.get(`http://member.idmei.com/area/getDesignerCity`).then(res => res.data);
}
//优惠券领取信息
export const cardinfo = () => {
  return axios.get(`${url}/Activity/cardinfo`).then(res => res.data);
}
//领取优惠券
export const getCard = () => {
  return axios.get(`${url}/Activity/getCard`).then(res => res.data);
}
//微信双十一
export const wechatCard = params => {
  return axios.post(`${url}/Activity/wechatCard`,qs.stringify(params)).then(res => res.data);
}
