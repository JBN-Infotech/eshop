import React, { useState, useEffect } from 'react';
import {
  TextInput,
  TextArea,
  Button,
  Form,
  FormGroup,
  Select, SelectItem,
} from '@carbon/react';
import { AppConfig } from '../../constants/App.config';
import { useParams, useNavigate } from 'react-router-dom';
import { selectOptions } from '../../helpers/categories.helper';
import CategoryApi from '../../API/Category.api';
import ProductApi from '../../API/Product.api';
import PageInfo from '../Shared/PageInfo';
import EsNotification from '../Shared/esNotification';

const pageKey = AppConfig.productForm.pageKey;

const ProductForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState({
    name: undefined,
    description: undefined,
    category_id: undefined,
    quantity: undefined,
    price: undefined,
  })
  const [formData, setFormData] = useState({
    notification: undefined,
    categories: [],
  });

  useEffect(() => {
    CategoryApi.getCategories()
      .then((response) => {
        setFormData({
          ...formData,
          categories: selectOptions(response),
        })
      })
  }, []);

  useEffect(() => {
    if (id) {
      ProductApi.getProducts(id)
      .then(({name, description, category_id, quantity, price}) =>  setData({
        ...data,
        name,
        description,
        category_id,
        quantity,
        price,
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
  }, [formData.categories]);

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
    navigate(`${AppConfig.productShow.url}/${id}`);
  }

  const onSubmit = () => {
    ProductApi.createOrUpdateProduct(id, data)
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
          moduleName={id ? 'Edit Product' : 'Add Product'}
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
            <FormGroup legendText="Add Product">
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
              {
                formData.categories && formData.categories.length > 0 &&
                  <Select id="category_id"
                    defaultValue={data.category_id || undefined}
                    labelText="Category"
                    onChange={(e) => updateData({category_id: e.target.value})}>
                    {
                      formData.categories.map((cat) => 
                        <SelectItem
                          key={cat.value}
                          value={cat.value}
                          text={cat.text} />)
                    }
                    
                </Select>
              }
              
              <TextInput
                id="quantity"
                labelText="Quantity"
                value={data.quantity}
                onChange={(e) => updateData({quantity: e.target.value})}
              />
              <TextInput
                id="price"
                labelText="Price"
                value={data.price}
                onChange={(e) => updateData({price: e.target.value})}
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

export default ProductForm
