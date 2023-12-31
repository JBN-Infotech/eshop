import React, { useState, useEffect } from 'react'
import PageInfo from '../Shared/PageInfo';
import UserApi from '../../API/User.api';

import { AppConfig } from '../../constants/App.config';
import { useParams } from 'react-router-dom';
import SharedSummary from '../Shared/SharedSummary';

const pageKey = AppConfig.userShow.pageKey;

const UserShow = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    user: undefined,
    loading: true,
    notification: undefined,
  });

  useEffect(() => {
    UserApi.getUsers(id)
      .then((item) =>  setData({...data, user: item, loading: false }))
      .catch((error) => setData({
        ...data,
        loading: false,
        notification: {
          title: error?.response?.data?.message,
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
                  moduleName={data.user && data.user.username}
                  getUrlParams={id}
                />
              </div>
              <div className='es-content-page-data'>
                {
                  <SharedSummary
                    data={data.user}
                    title='User'
                    notification={data.notification}
                  />
                }
              </div>
            </>
      }
    </div>
  )
}

export default UserShow
