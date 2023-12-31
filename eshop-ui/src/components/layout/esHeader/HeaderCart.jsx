import React, { useState, useEffect } from 'react';
import LocalStorage from '../../../API/LocalStorage';
import EsCounter from './EsCounter';
import ProductApi from '../../../API/Product.api';
import HeaderCartItems from './HeaderCartItems';
import { ShoppingCart } from '@carbon/icons-react';
import { useSelector } from 'react-redux';
import { HeaderGlobalAction } from '@carbon/react';
import { RightSideNavItem } from '../../../constants/RightSideNavItems';
import { onlyUnique, countItems } from '../../../helpers/cart.helper';

const HeaderCart = (props) => {
  const currentUser = LocalStorage.getCurrentUser();

  const localCart = JSON.parse(LocalStorage.getCart()) || [];
  
  let reduxCart = useSelector(state => state.eCart.items);
  
  /** Updated array passed through redux is coming in as string array. */
  if (typeof reduxCart === 'string') {
    reduxCart = JSON.parse(reduxCart);
  }

  const [count, setCount] = useState(localCart.length);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCount(reduxCart.length);
  }, [reduxCart.length]);

  /** Function to fetch the cart items. */
  const fetchCartItems = () => {
    const itemCounter = reduxCart ? countItems(reduxCart): [];
    const unique = reduxCart ? reduxCart.filter(onlyUnique) : [];
      
    ProductApi.getProducts(undefined, { params: { ids: unique} })
      .then((response) => {
        
        const newResponse = response.map((item) => ({
          ...item,
          cartQuantity: itemCounter[item.id],
        }));
        setCartItems(newResponse);
      })
      .catch((error) => console.log('error=', error));
  };

  useEffect(() => {
    fetchCartItems();
  },[count]);


  return (
    <>
      <HeaderGlobalAction
        aria-label="Cart"
        className={props.selected === RightSideNavItem.cart ? 'selected-side-nav-item': 'side-nav-item'}
        onClick={() => props.callback(RightSideNavItem.cart)}>

        <ShoppingCart size={20}/>

        {currentUser && count > 0 && <EsCounter count={count} />}
        
      </HeaderGlobalAction>
      {
        props.selected === RightSideNavItem.cart && <HeaderCartItems cartItems={cartItems} />
      }
    </>
  )
}

export default HeaderCart;
