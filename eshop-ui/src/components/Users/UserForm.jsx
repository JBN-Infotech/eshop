import React, { useState, useEffect } from 'react'
import {
  TextInput,
  Button,
  Form,
  FormGroup,
  InlineNotification,
} from '@carbon/react';
import EsContentPageInfo from '../Shared/PageInfo';
import EsNotification from '../Shared/esNotification';
import { AppConfig } from '../../constants/App.config';
import { useParams, useNavigate } from 'react-router-dom';
import UserApi from '../../API/User.api';
import { isValidEmail } from '../../helpers/users';

const UserForm = () => {
  const pageKey = AppConfig.userForm.pageKey;
  console.log(pageKey)

  const navigate = useNavigate();
  const {id} = useParams();

  const [data, setData] = useState({
    username: '',
    password: '',
    email: '',
  })
  const [formData, setFormData] = useState({
    loading: false,
    notification: undefined,
    confirmPassword: '',
  });

  useEffect(() => {
    if (id) {
      UserApi.getUsers(id)
      .then(({username, password, email}) =>  setData({
        ...data,
        username,
        password,
        email
      }))
      .catch((error) => setFormData({
        ...formData,
        loading: false,
        notification: {
          title: error?.response?.data?.message || 'Unknown error has occured',
          kind: 'error',
        }
      }));
    }
  }, [id]);

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
    if (error?.response?.data?.message) {
      updateNotification('error', error.response.data.message);
    }
  }

  const redirectPage = (message, id) => {
    alert(message);
    navigate(`${AppConfig.userShow.url}/${id}`);
  }

  const handleSignUp = () => {
    if (data.password !== formData.confirmPassword) {
      updateNotification('error', ['Passwords do not match.']);
    } else {
      if (isValidEmail(data.email)) {
        UserApi.createOrUpdateUser(id, data)
        .then((response) => redirectPage(response.status, response.id))
        .catch((error) => renderError(error));
      } else {
        updateNotification('error', ['Please enter a valid email.']);
      }
      
    }
    
  };

  const updateUserData = (fieldData) => {
    setData({
      ...data,
      ...fieldData
    })
  }

  return (
    <div className='es-content-page'>
      <div className='es-content-page-info'>
        <EsContentPageInfo pageKey={pageKey}/>
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
            <FormGroup legendText="User">
              <TextInput
                id="username"
                labelText="Username"
                value={data.username}
                onChange={(e) => updateUserData({username: e.target.value})}
              />
              <TextInput
                id="password"
                labelText="Password"
                type="password"
                value={data.password}
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
                value={data.email}
                onChange={(e) => updateUserData({email: e.target.value})}
              />
              <br/>
              <Button onClick={handleSignUp}>
                {
                  id ? 'Update' : 'Add'
                }
              </Button>
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
          
        </div>
      </div>
    </div>
  )
}

export default UserForm
