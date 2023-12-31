import React, {useState, useEffect} from 'react'
import PageInfoContext from '../../context/PageInfo.context';
import { AppConfig } from '../../constants/App.config';
import ProductApi from '../../API/Product.api';
import HomeProductItem from './HomeProductItem';


const EshopHome = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const updateSearchText = (text) => setSearchText(text);
  
  const updateList = () => ProductApi.getProducts(undefined, { params: { searchText, available: true } })
    .then((response) => 
      response.map((item) => ({
        ...item,
        redirect: `${AppConfig.productShow.url}/${item.id}`
      })))
    .catch((error) => console.log('error=', error));

  
  useEffect(() => {
    updateList().then((items) => setProducts(items));
  }, []);

  useEffect(() => {
    updateList().then((items) => setProducts(items));
  }, [searchText]);

  return (<PageInfoContext.Provider value={{searchText, updateSearchText}}>
    <div className='home-products-wrapper'>
      {
        products.map((item, index) => (<HomeProductItem item={item} key={index}/>))
      }
    </div>
  </PageInfoContext.Provider>)
}

export default EshopHome
