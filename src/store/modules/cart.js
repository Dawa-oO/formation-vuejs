export default {
    state: {
        cartList: []
    },
    getters: {
        getCart: state => {
            return state.cartList;
        }
    },
    mutations: {
        updateCart(state, payload) {
            state.cartList = payload;
        },
        addToCart(state, book) {
            state.cartList.push(book);
        },
        removeToCart(state, book) {
            const index = state.cartList.indexOf(book);
            state.cartList.splice(index, 1);
        }
    },
    actions: {
        updateCart({commit}, payload) {
            commit('updateCart', payload);
        },
        addToCart({commit}, payload) {
            commit('addToCart', payload);
        },
        removeToCart({commit}, payload) {
            commit('removeToCart', payload);
        }
    }
};