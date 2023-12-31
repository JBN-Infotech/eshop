import React, { useState, useEffect } from 'react';
import {
  TextInput,
  TextArea,
  Button,
  Form,
  FormGroup,
} from '@carbon/react';
import CategoryApi from '../../API/Category.api';
import PageInfo from '../Shared/PageInfo';
import EsNotification from '../Shared/esNotification';
import { AppConfig } from '../../constants/App.config';
import { useParams, useNavigate } from 'react-router-dom';

const pageKey = AppConfig.categoryForm.pageKey;

const CategoryForm = () => {
  const navigate = useNavigate();

  const {id} = useParams();
  const [data, setData] = useState({
    name: '',
    description: '',
    active: '',
  })
  const [formData, setFormData] = useState({
    notification: undefined,
  })  

  useEffect(() => {
    if (id) {
      CategoryApi.getCategories(id)
      .then(({name, description, active}) =>  setData({
        ...data,
        name,
        description,
        active
      }))
      .catch((error) => setData({
        ...data,
        loading: false,
        notification: {
          title: error?.response?.data?.message || 'unknown error',
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
    if (error && error.response && error.response.data && error.response.data.message) {
      updateNotification('error', error.response.data.message);
    }
  }

  const redirectPage = (message, id) => {
    alert(message);
    navigate(`${AppConfig.categoryShow.url}/${id}`);
  }

  const onSubmit = () => {
    CategoryApi.createOrUpdateCategory(id, data)
        .then((response) => redirectPage(response.status, response.id))
        .catch((error) => renderError(error));
  };

  const updateData = (fieldData) => {
    setData({
      ...data,
      ...fieldData
    })
  }

  return (
    <div className='es-content-page'>
      <div className='es-content-page-info'>
        <PageInfo
          pageKey={pageKey}
          moduleName={id ? 'Edit Category' : 'Add Category'}
        />
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
            <FormGroup legendText="Add Category">
              <TextInput
                id="name"
                labelText="Name"
                value={data.name}
                onChange={(e) => updateData({name: e.target.value})}
              />
              <TextArea
                id="description"
                labelText="Description"
                value={data.description}
                onChange={(e) => updateData({description: e.target.value})}
              />
              
              <br/>
              <Button onClick={onSubmit}>
                {
                  id ? 'Update' : 'Add'
                }
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CategoryForm
