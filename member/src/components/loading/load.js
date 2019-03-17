import Vue from 'vue';
import load from './pageLoad.vue';

const pageLoad = {
	install: function(Vue) {
		Vue.component('pageLoad',load);
	}
}

export default {
	pageLoad
}
Vue.use(pageLoad);