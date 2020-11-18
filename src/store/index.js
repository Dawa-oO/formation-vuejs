import Vue from 'vue';
import Vuex from 'vuex';
import panier from '@/store/modules/cart';
import souhait from '@/store/modules/wish';
import utilisateur from '@/store/modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		panier,
		souhait,
		utilisateur
	}
});
