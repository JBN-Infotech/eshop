import React, { useState, useEffect } from 'react';
import PageInfo from '../Shared/PageInfo';
import ProductApi from '../../API/Product.api';
import SharedSummary from '../Shared/SharedSummary';
import { AppConfig } from '../../constants/App.config';
import { useParams } from 'react-router-dom';

const pageKey = AppConfig.productShow.pageKey;

const ProductShow = () => {
  const {id} = useParams();
  const [data, setData] = useState({
    product: undefined,
    loading: true,
    notification: undefined,
  });

  useEffect(() => {
    ProductApi.getProducts(id)
      .then((item) =>  setData({...data, product: item, loading: false }))
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
                  moduleName={data.product && data.product.name}
                  getUrlParams={id}
                />
              </div>
              <div className='es-content-page-data'>
                {
                  <SharedSummary
                    data={data.product}
                    title='Product'
                    notification={data.notification}
                  />
                }
              </div>
            </>
      }
    </div>
  )
}

export default ProductShow
