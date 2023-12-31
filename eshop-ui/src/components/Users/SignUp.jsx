import React, { useState } from 'react'
import {
  TextInput,
  Button,
  Form,
  FormGroup,
  InlineNotification,
} from '@carbon/react';
import { Link } from "react-router-dom";
import EsContentPageInfo from '../Shared/PageInfo';
import EsNotification from '../Shared/esNotification';
import { AppConfig } from '../../constants/App.config';
import { useParams, useNavigate } from 'react-router-dom';
import UserApi from '../../API/User.api';

const SignUp = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
  })
  const [formData, setFormData] = useState({
    showNotification: false,
    notification: undefined,
    confirmPassword: '',
  });

  const updateNotification = (kind, messages) => {
    setFormData({
      ...formData,
      notification: {
        kind,
        messages: messages.join(', '),
      }
    })
  }
  
  const renderError = (error) => {
    if (error && error.response && error.response.data && error.response.data.message) {
      updateNotification('error', error.response.data.message);
    }
  }

  const redirectPage = (message, id) => {
    alert(message);
    navigate(`${AppConfig.home.url}`);
  }

  const handleSignUp = () => {
    UserApi.createOrUpdateUser(undefined, userData)
        .then((response) => redirectPage(response.status, response.id))
        .catch((error) => renderError(error));
  };

  const updateUserData = (fieldData) => {
    console.log(fieldData)
    setUserData({
      ...userData,
      ...fieldData
    })
  }

  return (
    <div className='es-content-page'>
      <div className='es-content-page-info'>
        <EsContentPageInfo pageKey={'signUp'}/>
      </div>
      <div className='es-content-page-data'>
        <div className='es-content-page-form'>
        {
            formData.notification && (
              <EsNotification
                kind={formData.notification.kind}
                title={formData.notification.messages} />
            )
          }
          <Form className='center-form'>
            <FormGroup legendText="Sign up">
              <TextInput
                id="username"
                labelText="Username"
                value={userData.username}
                onChange={(e) => updateUserData({username: e.target.value})}
              />
              <TextInput
                id="password"
                labelText="Password"
                type="password"
                value={userData.password}
                onChange={(e) => updateUserData({password: e.target.value})}
              />
              <TextInput
                id="confirm_password"
                labelText="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              <TextInput
                id="email"
                labelText="Email"
                value={userData.email}
                onChange={(e) => updateUserData({email: e.target.value})}
              />
              <br/>
              <Button onClick={handleSignUp}>Sign up</Button>
            </FormGroup>
          </Form>

          {formData.showNotification && (
            <InlineNotification
              kind="success"
              title="Welcome user"
              subtitle="Welcome!"
              onCloseButtonClick={() => setFormData({
                ...formData,
                showNotification: false,
              })
            }
            />
          )}
          <br/>
          <Link to="/">Login</Link>
          <br/> <br/>
          <Link to="/categories">Categories</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
