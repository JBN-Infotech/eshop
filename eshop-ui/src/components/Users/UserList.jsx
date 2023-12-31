import React, {useState, useEffect} from 'react'
import EsDataTable from '../Shared/esDataTable';
import PageInfo from '../Shared/PageInfo';
import PageInfoContext from '../../context/PageInfo.context';
import { AppConfig } from '../../constants/App.config';
import UserApi from '../../API/User.api';
import { ProtectedRoute } from '../Shared/ProtectedRoute';

const pageKey = AppConfig.userList.pageKey;

const headers = [
  {
    key: 'username',
    header: 'Username',
  },
  {
    key: 'password',
    header: 'Password',
  },
  {
    key: 'email',
    header: 'Email',
  },
  {
    key: 'created_at',
    header: 'Created At',
  },
];

const UserList = () => {
  
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const updateSearchText = (text) => setSearchText(text);
  
  const updateList = () => UserApi.getUsers(undefined, { params: { searchText } })
    .then((response) => 
      response.map((item) => ({
        ...item,
        redirect: `${AppConfig.userShow.url}/${item.id}`
      })))
    .catch((error) => console.log('error=', error));;

  
  useEffect(() => {
    updateList().then((items) => setUsers(items));
  }, []);

  useEffect(() => {
    updateList().then((items) => setUsers(items));
  }, [searchText]);

  return (<PageInfoContext.Provider value={{searchText, updateSearchText}}>
    <div className='es-content-page'>
      <div className='es-content-page-info'>
        <PageInfo pageKey={pageKey}/>
      </div>
      <div className='es-content-page-data'>
        <ProtectedRoute />
        <EsDataTable
          rows={users}
          headers={headers}
          clickHandler={(listData) => console.log('clicked')}/>
      </div>
    </div>
  </PageInfoContext.Provider>)
}

export default UserList
