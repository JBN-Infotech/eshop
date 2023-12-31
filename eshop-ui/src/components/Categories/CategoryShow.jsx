import React, { useState, useEffect } from 'react';
import PageInfo from '../Shared/PageInfo';
import CategoryApi from '../../API/Category.api';

import { AppConfig } from '../../constants/App.config';
import { useParams } from 'react-router-dom';
import SharedSummary from '../Shared/SharedSummary';

const pageKey = AppConfig.categoryShow.pageKey;

const CategoryShow = () => {
  const {id} = useParams();
  const [data, setData] = useState({
    category: undefined,
    loading: true,
    notification: undefined,
  });

  useEffect(() => {
    CategoryApi.getCategories(id)
      .then((item) =>  setData({...data, category: item, loading: false }))
      .catch((error) => setData({
        ...data,
        loading: false,
        notification: {
          title: error.response.data.message,
          kind: 'error',
        }
      }));
  }, []);

  return (
    <div className='es-content-page'>
      {
        data.loading
          ? <>loading...</>
          : <>
              <div className='es-content-page-info'>
                <PageInfo
                  pageKey={pageKey}
                  moduleName={data.category && data.category.name}
                  getUrlParams={id}
                />
              </div>
              <div className='es-content-page-data'>
                {
                  <SharedSummary
                    data={data.category}
                    title='Category'
                    notification={data.notification}
                  />
                }
              </div>
            </>
      }
    </div>
  )
}

export default CategoryShow
