import React from 'react';
import { Button } from '@carbon/react';
import { Link } from "react-router-dom";
import LocalStorage from '../../../API/LocalStorage';

const HeaderCartItems = (props) => {

  const currentUser = LocalStorage.getCurrentUser();

  const getTotal = () => props.cartItems.reduce((accumulator, currentValue) => 
    accumulator + (currentValue.cartQuantity * currentValue.price), 0);

  const buyItems = () => {
    let cartData = props.cartItems.map((item) => ({
      id: item.id,
      quantity: item.cartQuantity,
      price: item.price,
    }));
    cartData = {
      cart_data: cartData,
      user_id: currentUser
    };
    console.log(cartData);
    alert('Todo');
  }

  return (
    currentUser
      ? <div className='es-app-side-nav-right-section' id='header-cart'>
          <div className='header-cart-item cart-header'>
            <div className='header-cart-item-slno'>No.</div>
            <div className='header-cart-item-name'>Product</div>
            <div className='header-cart-item-qty'>Qty</div>
            <div className='header-cart-item-price'>Price</div>
          </div>
          {
            props.cartItems.map((item, index) => (
              <div className='header-cart-item' key={item.id}>
                <div className='header-cart-item-slno'>{index + 1}</div>
                <div className='header-cart-item-name'>{item.name}</div>
                <div className='header-cart-item-qty'>{item.cartQuantity}</div>
                <div className='header-cart-item-price'>Rs. {item.price * item.cartQuantity}</div>
              </div>
            ))
          }
          <div className='header-cart-item grand-total'>
            <div className='header-cart-item-slno'></div>
            <div className='header-cart-item-name'></div>
            <div className='header-cart-item-qty'></div>
            <div className='header-cart-item-price'><b>{getTotal()}</b></div>
          </div>
          <Button onClick={() => buyItems()}>Buy!</Button>
        </div>
      : <div className='es-app-side-nav-right-section' id='header-cart'> <Link to="/signin">Sign in</Link> </div>
  )
}

export default HeaderCartItems;
