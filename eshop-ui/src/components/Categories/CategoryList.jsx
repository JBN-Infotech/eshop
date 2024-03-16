import React, { useState, useEffect } from 'react';
import EsDataTable from '../Shared/esDataTable';
import PageInfo from '../Shared/PageInfo';
import PageInfoContext from '../../context/PageInfo.context';
import CategoryApi from '../../API/Category.api';
import { AppConfig } from '../../constants/App.config';
import { ProtectedRoute } from '../Shared/ProtectedRoute';

const pageKey = AppConfig.categoryList.pageKey;

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
    key: 'active',
    header: 'Active',
  },
  {
    key: 'created_at',
    header: 'Created At',
  },
];

const CategoryList = () => {
  
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const updateSearchText = (text) => setSearchText(text);
  
  const updateList = () => CategoryApi.getCategories(undefined, { params: { searchText } })
    .then((response) => 
      response.map((item) => ({
        ...item,
        redirect: `${AppConfig.categoryShow.url}/${item.id}`
      })))
    .catch((error) => console.log('error=', error));

  
  useEffect(() => {
    updateList().then((items) => setCategories(items));
  }, []);

  useEffect(() => {
    updateList().then((items) => setCategories(items));
  }, [searchText]);

  return (<PageInfoContext.Provider value={{searchText, updateSearchText}}>
    <div className='es-content-page'>
      <div className='es-content-page-info'>
        <PageInfo pageKey={pageKey}/>
      </div>
      <div className='es-content-page-data'>
        <ProtectedRoute />
        <EsDataTable
          rows={categories}
          headers={headers}
          clickHandler={(listData) => console.log('clicked')}/>
      </div>
    </div>
  </PageInfoContext.Provider>)
}

export default CategoryList
