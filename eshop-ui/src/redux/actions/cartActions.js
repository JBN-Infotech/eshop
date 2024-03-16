const updateCart = (cartObject) => {
  console.log(cartObject)
  return {
      type: "UPDATE_CART",
      payload: cartObject
  }
}

export const cartActions = {
  updateCart
};
