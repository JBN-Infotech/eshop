import LocalStorage from "../../API/LocalStorage";

const initCartItems = () => JSON.parse(LocalStorage.getCart()) || 0;

const eCart = (state = {items: initCartItems()}, action) => {
  switch(action.type){
      case "UPDATE_CART":
        return {
            ...state,
            items: action.payload,
        }
      default:
        return state
  }
}

export default eCart;
