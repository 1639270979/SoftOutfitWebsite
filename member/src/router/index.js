import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	//mode: 'history',
	routes: [
		{
			path: '*',
			redirect: {path: '/index'}
		},
		/********** 登录 **********/
		{
			path: '/login',
			component: function(resolve) {
				require(['../components/login/index.vue'],resolve)
			},
			name: '登录页面'
		},
		{
			path: '/login/register',
			component: function(resolve) {
				require(['../components/login/register.vue'],resolve)
			},
			name: '注册页面'
		},
		{
			path: '/login/perfect',
			component: function(resolve) {
				require(['../components/login/perfect.vue'],resolve)
			},
			name: '完善页面'
		},
		{
			path: '/login/verification',
			component: function(resolve) {
				require(['../components/login/verification.vue'],resolve)
			},
			name: '忘记密码'
		},
		{
			path: '/login/change',
			component: function(resolve) {
				require(['../components/login/change.vue'],resolve)
			},
			name: '修改密码'
		},
		/********** 首页 **********/
		{
			path: '/index',
			component: function(resolve) {
				require(['../components/index/Index.vue'],resolve);
			},
			name: '大美首页',
			meta: {
				keepAlive: true// 需要被缓存
			}
		},
		{
			path: '/index/promise/:type',
			component: function(resolve) {
				require(['../components/index/promise.vue'],resolve);
			},
			name: '购物保障',
			meta: {
				keepAlive: false // 需要被缓存
			}
		},
		/********** 设计师 **********/
		{
			path: '/designer/:set',
			component: function(resolve) {
				require(['../components/designer/designer.vue'],resolve)
			},
			name: '设计师列表',
			meta: {
				keepAlive: false // 需要被缓存
			}
		},
		{
			path: '/index/designer/designerDet/:did',
			component: function(resolve) {
				require(['../components/designer/designerDet.vue'],resolve)
			},
			name: '设计师详情',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/index/designer/programmeDet/:cid',
			component: function(resolve) {
				require(['../components/designer/programmeDet.vue'],resolve)
			},
			name: '设计师案例详情',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/index/designer/planDet/:cid',
			component: function(resolve) {
				require(['../components/designer/planDet.vue'],resolve)
			},
			name: '非本软件制作的案例详情',
      meta: {
        keepAlive: false
      }

		},
		{
			path: '/index/designer/det/please/:did',
			component: function(resolve) {
				require(['../components/designer/please.vue'],resolve)
			},
			name: '请他做设计',
      meta: {
        keepAlive: false
      }
		},
		/********** 名师 **********/
		{
			path: '/index/master/det',
			component: function(resolve) {
				require(['../components/master/masterDet'],resolve)
			},
			name: '名师详情',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/index/master/introduce/:mid',
			component: function(resolve) {
				require(['../components/master/introduce.vue'],resolve)
			},
			name: '名师介绍',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/index/master/caseDet/:cid',
			component: function(resolve) {
				require(['../components/master/caseDet.vue'],resolve)
			},
			name: '名师案例详情',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/index/master/please/:mid',
			component: function(resolve) {
				require(['../components/master/please.vue'],resolve)
			},
			name: '委托设计',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/index/master/association',
			component: function(resolve) {
				require(['../components/master/association'],resolve)
			},
			name: '华英会',
      meta: {
        keepAlive: false
      }
		},
    {
      path:'/index/myMaster/index',
      component:function(resolve){
        require(['../components/myMaster/index'],resolve)
      },
      name:'新华英会',
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/index/myMaster/initiator',
      component:function(resolve){
        require(['../components/myMaster/initiator'],resolve)
      },
      name:'联合发起人',
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/index/myMaster/apply/:type',
      component:function(resolve){
        require(['../components/myMaster/apply'],resolve)
      },
      name:'申请会员',
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/index/myMaster/designerDet/:did',
      component:function(resolve){
        require(['../components/myMaster/designerDet'],resolve)
      },
      name:'华英会设计师详情',
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/index/myMaster/worksDet/:cid',
      component:function(resolve){
        require(['../components/myMaster/worksDet'],resolve)
      },
      name:'作品详情',
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/index/myMaster/newDet/:id',
      component:function(resolve){
        require(['../components/myMaster/newDet'],resolve)
      },
      name:'新闻详情',
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/index/myMaster/drive/:aid',
      component:function(resolve){
        require(['../components/myMaster/drive'],resolve)
      },
      name:'设计驱动',
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/index/myMaster/pay/:aid',
      component:function(resolve){
        require(['../components/myMaster/pay'],resolve)
      },
      name:'我要报名',
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/index/myMaster/please/:did',
      component:function(resolve){
        require(['../components/myMaster/please'],resolve)
      },
      name:'华英会委托设计',
      meta:{
        keepAlive:false
      }
    },
		/********** 套装 **********/
		{
			path: '/suit/:set',
			component: function(resolve) {
				require(['../components/suit/Index.vue'],resolve)
			},
			name: '套装列表',
      meta: {
        keepAlive: true
      }
		},
		{
			path: '/index/suit/suitDet/:cid',
			component: function(resolve) {
				require(['../components/suit/suitDet.vue'],resolve)
			},
			name: '套装详情',
      meta: {
        keepAlive:false
      }
		},
    {
      path:'/index/suit/panorama',
      component:function(resolve){
        require(['../components/suit/panorama.vue'],resolve)
      },
      name:'套装全景图',
      meta:{
        keepAlive:false
      }
    },
		/********** 商品 **********/
		{
			path: '/index/shopList/:cid/:sort',
			component: function(resolve) {
				require(['../components/shop/shop.vue'],resolve);
			},
			name: '商品列表',
			meta: {
				keepAlive: true  // 需要被缓存
			}
		},
		{
			path: '/index/shop/shopDet/:pid',
			component: function(resolve) {
				require(['../components/shop/shopDet.vue'],resolve);
			},
			name: '商品详情',
			meta: {
				keepAlive:false //
			}
		},
		{
			path: '/index/cart',
			component: function(resolve) {
				require(['../components/shop/cart.vue'],resolve)
			},
			name: '购物车',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/index/shop/shopConfirm/:carts/:sid/:cid',
			component: function(resolve) {
				require(['../components/shop/shopConfirm.vue'],resolve)
			},
			name: '立即结算',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/index/shop/seckillShopConfirm/:carts',
			component: function(resolve) {
				require(['../components/shop/seckillShopConfirm.vue'],resolve)
			},
			name: '秒杀立即结算',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/index/shop/show/:oid',
			component: function(resolve) {
				require(['../components/shop/show.vue'],resolve)
			},
			name: '支付接口开发中',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/index/shop/show1/:oid',
			component: function(resolve) {
				require(['../components/shop/show1.vue'],resolve)
			},
			name: '支付接口开发中1',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/index/shop/det/brand/:bid',
			component: function(resolve) {
				require(['../components/shop/brand.vue'],resolve)
			},
			name: '品牌页',
			meta: {
				keepAlive: true // 需要被缓存
			}
		},
		{
			path: '/index/shop/det/brandList/brandDet/:bid',
			component: function(resolve) {
				require(['../components/shop/brandDet.vue'],resolve)
			},
			name: '品牌详情',
      meta: {
        keepAlive: false
      }
		},
		/********** 发现 **********/
		{
			path: '/find',
			component: function(resolve) {
				require(['../components/find/Index.vue'],resolve)
			},
			name: '发现',
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/find/findDetail/:id/:is_page',
			component: function(resolve) {
				require(['../components/find/FindDetail.vue'],resolve)
			},
			name: '发现详情',
			meta: {
				keepAlive: false
			}
		},
		/********** 我家 **********/
		{
			path: '/myHome',
			component: function(resolve) {
				require(['../components/myHome/Index.vue'],resolve)
			},
			name: '我家',
			meta: {
				keepAlive: true // 需要被缓存
			}
		},
		{
			path: '/myHome/myHomeList/:cityId/:areaId/:houseId',
			component: function(resolve) {
				require(['../components/myHome/myHomeList.vue'],resolve)
			},
			name: '我家列表',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/myHome/list/myHomeDet/:aid',
			component: function(resolve) {
				require(['../components/myHome/myHomeDet.vue'],resolve)
			},
			name: '我家详情',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/myHome/list/det/myHomeSuit/:aid/:type',
			component: function(resolve) {
				require(['../components/myHome/myHomeSuit.vue'],resolve)
			},
			name: '我家套装详情',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/myHome/list/det/suit/sketch/:aid',
			component: function(resolve) {
				require(['../components/myHome/sketch.vue'],resolve)
			},
			name: '我家套装效果图',
      meta: {
        keepAlive: false
      }
		},
		/********** 收藏 **********/
		{
			path: '/collection',
			component: function(resolve) {
				require(['../components/collection/Index.vue'],resolve)
			},
			name: '收藏',
			meta: {
				keepAlive: true // 需要被缓存
			}
		},
		/********** 我的 **********/
		{
			path: '/member',
			component: function(resolve) {
				require(['../components/member/Index.vue'],resolve)
			},
			name: '我的',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/set/memberDet',
			component: function(resolve) {
				require(['../components/member/memberDet.vue'],resolve)
			},
			name: '用户详情',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/set',
			component: function(resolve) {
				require(['../components/member/set.vue'],resolve)
			},
			name: '设置',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/orderList/:status',
			component: function(resolve) {
				require(['../components/member/orderList.vue'],resolve)
			},
			name: '订单列表',
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/member/order/orderDet/:oid/:sid',
			component: function(resolve) {
				require(['../components/member/orderDet.vue'],resolve)
			},
			name: '订单详情',
			meta: {
				keepAlive: false
			}
		},
		{
			path: '/member/masterOrderList',
			component: function(resolve) {
				require(['../components/member/masterOrderList.vue'],resolve)
			},
			name: '名师订单列表',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/order/det/service/:Oid/:Iid',
			component: function(resolve) {
				require(['../components/member/service.vue'],resolve)
			},
			name: '售后类型',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/order/det/ser/refunds/:Oid/:Iid',
			component: function(resolve) {
				require(['../components/member/refunds.vue'],resolve)
			},
			name: '申请退货',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/order/det/ser/changeGoods/:Oid/:Iid',
			component: function(resolve) {
				require(['../components/member/changeGoods.vue'],resolve)
			},
			name: '申请换货',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/order/det/changeGoodsDet/:Oid/:Iid',
			component: function(resolve) {
				require(['../components/member/changeGoodsDet.vue'],resolve)
			},
			name: '退换货详情',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/designOrder',
			component: function(resolve) {
				require(['../components/member/designOrder.vue'],resolve)
			},
			name: '设计订单',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/designOrder/residualCost/:oid',
			component: function(resolve) {
				require(['../components/member/residualCost.vue'],resolve)
			},
			name: '设计剩余费用',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/adres',
			component: function(resolve) {
				require(['../components/member/adres.vue'],resolve)
			},
			name: '收货地址',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/set/serviceAgreement',
			component: function(resolve) {
				require(['../components/member/serviceAgreement.vue'],resolve)
			},
			name: '服务协议',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/set/about',
			component: function(resolve) {
				require(['../components/member/about.vue'],resolve)
			},
			name: '关于我们',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/set/changePsw',
			component: function(resolve) {
				require(['../components/member/changePsw.vue'],resolve)
			},
			name: '更改密码',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/view',
			component: function(resolve) {
				require(['../components/member/view.vue'],resolve)
			},
			name: '识图规范',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/panoList',
			component: function(resolve) {
				require(['../components/member/panoList.vue'],resolve)
			},
			name: '已购户型全景图',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/comboList',
			component: function(resolve) {
				require(['../components/member/comboList.vue'],resolve)
			},
			name: '已购户型套餐',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/member/degOrder/jumpPage',
			component: function(resolve) {
				require(['../components/member/jumpPage.vue'],resolve)
			},
			name: '空白页后退',
      meta: {
        keepAlive: false
      }
		},
    {
      path:'/member/delay/:oid/:reason/:memo',
      component:function(resolve){
        require(['../components/member/delay.vue'],resolve)
      },
      name:'延迟通知',
      meta:{
        keepAlive:false
      }
    },
		{
			path: '/member/messageList',
			component: function(resolve) {
				require(['../components/member/messageList.vue'],resolve)
			},
			name: '消息列表',
      meta: {
        keepAlive: false
      }
		},
		/********** VIP **********/
		{
			path: '/vip/openVIP',
			component: function(resolve) {
				require(['../components/vip/openVIP.vue'],resolve)
			},
			name: '开通会员',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/openedVIP',
			component: function(resolve) {
				require(['../components/vip/openedVIP.vue'],resolve)
			},
			name: '已开通会员',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/openVIPInfo',
			component: function(resolve) {
				require(['../components/vip/openVIPInfo.vue'],resolve)
			},
			name: '立即开通VIP',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/vipRenew',
			component: function(resolve) {
				require(['../components/vip/vipRenew.vue'],resolve)
			},
			name: '续费vip',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/freeService',
			component: function(resolve) {
				require(['../components/vip/freeService.vue'],resolve)
			},
			name: 'vip免费设计申请服务',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/wholeDesign',
			component: function(resolve) {
				require(['../components/vip/wholeDesign.vue'],resolve)
			},
			name: 'vip整屋装修设计需求',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/softOutfitDesign',
			component: function(resolve) {
				require(['../components/vip/softOutfit_design.vue'],resolve)
			},
			name: 'vip软装设计需求',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/vipOrderDet/:oid',
			component: function(resolve) {
				require(['../components/vip/vip_order_det.vue'],resolve)
			},
			name: 'vip订单详情',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/useService',
			component: function(resolve) {
				require(['../components/vip/useService.vue'],resolve)
			},
			name: '已申请设计服务',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/designCaseWhole/:oid',
			component: function(resolve) {
				require(['../components/vip/design_case_whole.vue'],resolve)
			},
			name: 'vip整体装修设计方案',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/auxiliaryFile/:cid',
			component: function(resolve) {
				require(['../components/vip/auxiliaryFile.vue'],resolve)
			},
			name: 'vip请辅工程',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/principalFile/:cid',
			component: function(resolve) {
				require(['../components/vip/principalFile.vue'],resolve)
			},
			name: 'vip主材套餐包',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/designCaseSoftOutfit/:oid',
			component: function(resolve) {
				require(['../components/vip/design_case_softOutfit.vue'],resolve)
			},
			name: 'vip软装设计方案',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/vipCaseDet/:cid',
			component: function(resolve) {
				require(['../components/vip/vip_case_det.vue'],resolve)
			},
			name: 'vip查看案例详情',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/vipDesignModify/:cid',
			component: function(resolve) {
				require(['../components/vip/vip_design_modify.vue'],resolve)
			},
			name: 'vip申请修改',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/VIPcoupon',
			component: function(resolve) {
				require(['../components/vip/coupon.vue'],resolve)
			},
			name: 'vip现金劵',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/vipUseCoupons',
			component: function(resolve) {
				require(['../components/vip/vipUseCoupons.vue'],resolve)
			},
			name: 'vip使用现金劵',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/vip/vip_dobut',
			component: function(resolve) {
				require(['../components/vip/vip_dobut.vue'],resolve)
			},
			name: 'vip免费设计服务说明',
      meta: {
        keepAlive: false
      }
		},
		/********** 搜索 **********/
		{
			path: '/search',
			component: function(resolve) {
				require(['../components/search/index.vue'],resolve)
			},
			name: '搜索',
			meta: {
				keepAlive: true
			}
		},
		/********** pdf显示 **********/
		{
			path: '/member/pdf',
			component: function(resolve) {
				require(['../components/member/pdf.vue'],resolve)
			},
			name: 'pdf显示',
      meta: {
        keepAlive: false
      }
		},
		/********** 订单支付 **********/
		{
			//path: '/orderPay/:oid/:type/:money',
			path: '/orderPay',
			component: function(resolve) {
				require(['../components/orderPay/index.vue'],resolve)
			},
			name: '订单支付',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/orderPay/splitPay',
			component: function(resolve) {
				require(['../components/orderPay/splitPay.vue'],resolve)
			},
			name: '分多次支付',
      meta: {
        keepAlive: false
      }
		},
		/********** H5单页 **********/
		{
			path: '/H5/index/:id',
			component: function(resolve) {
				require(['../components/SPA/index.vue'],resolve)
			},
			name: 'H5单页',
      meta: {
        keepAlive: false
      }
		},
		{
			path: '/H5/spa/redeemCode',
			component: function(resolve) {
				require(['../components/SPA/redeemCode.vue'],resolve)
			},
			name: '领取优惠券',
      meta: {
        keepAlive: false
      }
		},
    /*********** 活动页面 **************/
    {
      path:'/index/activity/eleven',
      component:function(resolve){
        require(['../components/activity/eleven.vue'],resolve)
      },
      name:'双十一',
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/index/activity/wxeleven',
      component:function(resolve){
        require(['../components/activity/wxeleven.vue'],resolve)
      },
      name:'微信双十一',
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/index/activity/wxpre',
      component:function(resolve){
        require(['../components/activity/wxpre.vue'],resolve)
      },
      name:'完善资料',
      meta:{
        keepAlive:false
      }
    },
  ]
})
