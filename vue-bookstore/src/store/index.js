import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      cart: [],
    };
  },
  mutations: {
    ADD_TO_CART(state, item) {
      state.cart.push(item);
    },
  },
  actions: {
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item);
    },
  },
  getters: {
    cartItems: (state) => state.cart,
  },
})
