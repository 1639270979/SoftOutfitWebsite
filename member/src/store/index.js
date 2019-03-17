import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import publicJS from './modules/publicJS.js';
import header from './modules/header.js';

Vue.use(Vuex);

export default new Vuex.Store ({
	modules: {
		publicJS,
		header
	},
	actions
})