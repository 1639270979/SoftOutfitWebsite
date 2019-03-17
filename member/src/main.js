import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueLazyload from 'vue-lazyload';
/* 图片懒加载 */
Vue.use(VueLazyload,{
  // loading: '../static/image/idmei.png',
  loading: '../memberStatic/image/idmei.png',
  preLoad: 1
});

/* 百度统计 */
router.beforeEach((to, from, next) => {
	// 统计代码
	if (to.path) {
		_hmt.push(['_setAutoPageview', false]);
		_hmt.push(['_trackPageview', '/#' + to.fullPath]);
	}
	next();
});

		// var _hmt = _hmt || [];
		// (function() {
		// 	var hm = document.createElement("script");
		// 	hm.src = "https://hm.baidu.com/hm.js?3c31f27efb9e35e78df55d80493098ab";
		// 	var s = document.getElementsByTagName("script")[0];
		// 	s.parentNode.insertBefore(hm, s);
		// })();
		// _hmt.push(['_setAutoPageview', false]);
		// _hmt.push(['_trackPageview', '/#' + to.fullPath]);

import './components/promptBox/dialogs';//弹出层对话框

import './components/loading/load.js';

// FastClick.attach(document.body);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
  VueLazyload,
	render: h => h(App)
})
