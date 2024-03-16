import React from 'react';
import { AppConfig } from '../../constants/App.config';
import { Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { StarFilled, StarHalf } from '@carbon/icons-react';
import { countOccurrences, availableItems } from '../../helpers/products.helper';
import { useDispatch, useSelector } from 'react-redux'
import LocalStorage from '../../API/LocalStorage';
import allActions from '../../redux/actions';
import ProductCounter from './ProductCounter';

const HomeProductItem = (props) => {
  const dispatch = useDispatch();

  const {item} = props;
  const currentUser = LocalStorage.getCurrentUser();
  const navigate = useNavigate();

  let reduxCart = useSelector(state => state.eCart.items);
  
  if (typeof reduxCart === 'string') {
    // Updated array passed through redux is coming in as string array.
    reduxCart = JSON.parse(reduxCart);
  }

  const addToCart = () => {
    if (currentUser) {
      LocalStorage.setCart(item.id);
      const cartItems = LocalStorage.getCart();
      dispatch(allActions.cartActions.updateCart(cartItems));
      alert('Item added to cart');
    } else {
      alert ('You need to sign in.');
      navigate(AppConfig.signIn.url);
    }
  }

  const deleteFromCart = () => {
    if (currentUser) {
      LocalStorage.deleteCartItem(item.id);
      const cartItems = LocalStorage.getCart();
      dispatch(allActions.cartActions.updateCart(cartItems));
      alert('Item removed from cart');
    } else {
      alert ('You need to sign in.');
      navigate(AppConfig.signIn.url);
    }
  }

  const updateCart = (type) => {
    if (type === 'add') {
      addToCart();
    } else {
      deleteFromCart();
    }
  }

  return (
    <div className='home-product'>
      <div className='product-name'
        onClick={() => navigate(`${AppConfig.productShow.url}/${item.id}`)}>
        {item.name}
      </div>
      <div className='product-desc'>{item.description}</div>
      <div className='product-price'>Rs. {item.price}/-</div>
      <div className='product-remaining'>{availableItems(reduxCart, item)} items remaining!</div>
      <div className='product-ratings'>
        <StarFilled></StarFilled>
        <StarFilled></StarFilled>
        <StarFilled></StarFilled>
        <StarFilled></StarFilled>
        <StarHalf></StarHalf>
      </div>
      {
        item.quantity > 0 && (
          <div className='add-to-cart-wrapper'>
            {
              currentUser && reduxCart && reduxCart.includes(item.id)
                ? <ProductCounter
                    limit={item.quantity}
                    inCart={countOccurrences(reduxCart, item.id)}
                    updateCart={(type) => updateCart(type)}/>
                : <Button onClick={() => addToCart()}>Add to cart</Button>
            }
            
            
          </div>
        )
      }
    </div>
  )
}

export default HomeProductItem
