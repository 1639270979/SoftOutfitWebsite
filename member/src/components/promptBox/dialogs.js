import Vue from 'vue';
import alert from './alertPrompt.vue';
import text from './txtPrompt.vue';
import joinCart from './iconPrompt.vue';
import confirm from './confirmPrompt.vue';
import cartShop from './existShopCart.vue';
import styleLayer from './stylePrompt.vue';
import numberKeyboard from './numberKey.vue';

const alertPrompt = {
	install: function(Vue) {
		Vue.component('alertPrompt',alert);
	}
}

const txtPrompt = {
	install: function(Vue) {
		Vue.component('txtPrompt',text);
	}
}

const iconPrompt = {
	install: function(Vue) {
		Vue.component('iconPrompt',joinCart);
	}
}

const confirmPrompt = {
	install: function(Vue) {
		Vue.component('confirmPrompt',confirm);
	}
}

const existShopCart = {
	install: function(Vue) {
		Vue.component('existShopCart',cartShop);
	}
}

const stylePrompt = {
	install: function(Vue) {
		Vue.component('stylePrompt',styleLayer);
	}
}

const numberKey = {
	install: function(Vue) {
		Vue.component('numberKey',numberKeyboard);
	}
}

export default {
	alertPrompt,
	txtPrompt,
	iconPrompt,
	confirmPrompt,
	existShopCart,
	stylePrompt,
	numberKey
}
Vue.use(alertPrompt);
Vue.use(txtPrompt);
Vue.use(iconPrompt);
Vue.use(confirmPrompt);
Vue.use(existShopCart);
Vue.use(stylePrompt);
Vue.use(numberKey);