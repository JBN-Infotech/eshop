import React, { useState } from 'react'
import {
  TextInput,
  Button,
  Form,
  FormGroup,
  InlineNotification,
} from '@carbon/react';
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import allActions from '../../redux/actions';
import { useNavigate } from "react-router-dom";
import PageInfo from '../Shared/PageInfo';
import UserApi from '../../API/User.api';
import LocalStorage from '../../API/LocalStorage';

const Login = () => {
  const currentUser = LocalStorage.getCurrentUser();
  const user = useSelector(state => state.currentUser);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [data, setData] = useState({
      username: undefined,
      password: undefined,
    });
  
    const [formData, setFormData] = useState({
      notification: undefined,
    });

  if (currentUser) {
    return (
    <>
      <InlineNotification
        kind={'success'}
        title={'User already logged in'}
        subtitle={''}
      />
      <Button onClick={() => navigate('/')}>Home</Button>
    </>)
  } else {
    
  
    const handleLogin = () => {
      console.log(data)
      if (data.username && data.password) {
        UserApi.loginUser(data).then((response) => {
          console.log(response)
          if (response.status === 'success') {
            LocalStorage.setCurrentUser(response.user_id)
            setFormData({
              ...formData,
              notification: undefined,
            })
            dispatch(allActions.userActions.setUser({
            username: data.username,
            password: data.password
          }))
            alert('Success');
            navigate("/");
          } else {
            setFormData({
              ...formData,
              notification: {
                kind: 'error',
                message: response.message.join(', '),
              }
            })
          }
          
        });
        
      }
    };
  
    console.log(formData.notification)
  
    return (
      <div className='es-content-page'>
        <div className='es-content-page-info'>
          <PageInfo pageKey={'signIn'}/>
        </div>
        <div className='es-content-page-data'>
          <div className='es-content-page-form'>
          {
            formData.notification && (
              <>
                <InlineNotification
                  kind={formData.notification.kind}
                  title={formData.notification.message}
                  subtitle={''}
                  onCloseButtonClick={() => setFormData({
                    ...formData,
                    notification: undefined,
                  })}
                />
              <br/>
            </>)
          }
            <Form className='center-form'>
              <FormGroup legendText="Sign In">
                <TextInput
                  id="username"
                  labelText="Username"
                  value={data.username}
                  onChange={(e) => setData({ ...data, username: e.target.value })}
                />
                <TextInput
                  id="password"
                  labelText="Password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                <br/>
                <Button onClick={handleLogin}>Login</Button>
              </FormGroup>
            </Form>
  
            <br/>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>
    )
  }

  
}

export default Login;
