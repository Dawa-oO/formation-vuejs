export default {
    state: {
        wishList: []
    },
    getters: {
        getWish: state => {
            return state.wishList;
        }
    },
    mutations: {
        updateWish(state, payload) {
            state.wishList = payload;
        },
        addToWish(state, book) {
            state.wishList.push(book);
        },
        removeToWish(state, book) {
            const index = state.wishList.indexOf(book);
            state.wishList.splice(index, 1);
        }
    },
    actions: {
        updateWish({commit}, payload) {
            commit('updateWish', payload);
        },
        addToWish({commit}, payload) {
            commit('addToWish', payload);
        },
        removeToWish({commit}, payload) {
            commit('removeToWish', payload);
        }
    }
};