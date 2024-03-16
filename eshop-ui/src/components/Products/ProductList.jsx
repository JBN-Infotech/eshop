import React, { useState, useEffect } from 'react';
import EsDataTable from '../Shared/esDataTable';
import PageInfo from '../Shared/PageInfo';
import PageInfoContext from '../../context/PageInfo.context';
import ProductApi from '../../API/Product.api';
import { AppConfig } from '../../constants/App.config';
import { ProtectedRoute } from '../Shared/ProtectedRoute';

const pageKey = AppConfig.productList.pageKey;

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'description',
    header: 'Description',
  },
  {
    key: 'category_id',
    header: 'Category',
  },
  {
    key: 'quantity',
    header: 'Quantity',
  },
  {
    key: 'price',
    header: 'Price',
  },
  {
    key: 'created_at',
    header: 'Created At',
  },
];

const ProductList = () => {
  
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const updateSearchText = (text) => setSearchText(text);
  
  const updateList = () => ProductApi.getProducts(undefined, { params: { searchText } })
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
    <div className='es-content-page'>
      <div className='es-content-page-info'>
        <PageInfo pageKey={pageKey}/>
      </div>
      <div className='es-content-page-data'>
        <ProtectedRoute />
        <EsDataTable
          rows={products}
          headers={headers}
          clickHandler={(listData) => console.log('clicked')}/>
      </div>
    </div>
  </PageInfoContext.Provider>)
}

export default ProductList
