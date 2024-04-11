import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      cart: [],
    };
  },
  mutations: {
    ADD_TO_CART(state, item) {
      const existing = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        existing.count = existing.count + 1;
        existing.total = existing.count * existing.price;
      } else {
        state.cart.push({...item, count: 1, total: item.price});
      }
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
