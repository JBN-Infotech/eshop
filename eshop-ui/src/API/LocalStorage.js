import { LocalStorageKeys } from "../constants/LocalStorageKeys";

class LocalStorage {

  static getCurrentUser = () => {
    return localStorage.getItem(LocalStorageKeys.currentUserId);
  };

  static setCurrentUser = (userId) => {
    localStorage.setItem(LocalStorageKeys.currentUserId, userId);
  };

  static deleteCurrentUser = () => {
    localStorage.removeItem(LocalStorageKeys.currentUserId);
  };


  // CART - this will be an array.
  static getCart = () => {
    return localStorage.getItem(LocalStorageKeys.cart);
  };

  static setCart = (productId) => {
    let cart = JSON.parse(this.getCart());
    if (cart) {
      cart.push(productId);
    } else {
      cart = [productId];
    }
    localStorage.setItem(LocalStorageKeys.cart, JSON.stringify(cart));
  }

  static deleteCartItem = (productId) => {
    let cart = JSON.parse(this.getCart());
    if (cart) {
      const index = cart.indexOf(productId);
      if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem(LocalStorageKeys.cart, JSON.stringify(cart));
      }
    }
  }

}



export default LocalStorage;
