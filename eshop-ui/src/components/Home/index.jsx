import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Grid, Column, AspectRatio, Button,
} from '@carbon/react';
import CategoryApi from '../../API/Category.api';
import UserApi from '../../API/User.api';
import LocalStorage from '../../API/LocalStorage';
import ProductApi from '../../API/Product.api';
import EshopHome from './EshopHome';

const Home = () => {
  const navigate = useNavigate();

  const currentUser = LocalStorage.getCurrentUser()

  const [data, setData] = useState({
    categories: [],
    users: [],
    products: [],
  });

  useEffect(() => {
    Promise.all([
      CategoryApi.getCategories(),
      UserApi.getUsers(),
      ProductApi.getProducts(),
    ])
    .then((results) => {
      setData({
        ...data,
        categories: results[0],
        users: results[1],
        products: results[2],
      });
    })
    .catch((error) => {
      console.error('At least one promise rejected:', error);
    });
  }, []);

  const logoutUser = () => {
    LocalStorage.deleteCurrentUser();
    alert('logged out...')
    navigate('/')
  }

  return (
    <div className='home-page'>
      <div className='sub-header'>
        {
          data.categories && data.categories.map((item) => (
            <div className='sub-header-items' key={item.id}>{item.name}</div>
          ))
        }
      </div>
      <div className='es-content-page'>
        <div className='es-content-page-info'>
          <Grid className='es-home-grid'>
            {
              currentUser ? (
                <>
                <Column sm={1} md={2} lg={4}>
                  <AspectRatio ratio="1x1">
                    <Link to="/categories">
                      {
                        `Categories (${data.categories ? data.categories.length : '0'})`
                      }
                    </Link>
                  </AspectRatio>
                </Column>
                  <Column sm={1} md={2} lg={4}>
                    <AspectRatio ratio="1x1">
                      <Link to="/users">
                        {
                          `Users (${data.users ? data.users.length : '0'})`
                        }
                      </Link>
                    </AspectRatio>
                  </Column>
                  <Column sm={1} md={2} lg={4}>
                    <AspectRatio ratio="1x1">
                      <Link to="/products">
                        {
                          `Products (${data.products ? data.products.length : '0'})`
                        }
                      </Link>
                    </AspectRatio>
                  </Column>
                  <Column sm={1} md={2} lg={4}>
                    <AspectRatio ratio="1x1">
                      <Button onClick={() => logoutUser()}>Logout</Button>
                    </AspectRatio>
                  </Column>
                </>
                
              )
              : (
                <>
                  <Column sm={1} md={2} lg={4}>
                    <AspectRatio ratio="1x1"><Link to="/signin">Sign in</Link></AspectRatio>
                  </Column>
                  <Column sm={1} md={2} lg={4}>
                    <AspectRatio ratio="1x1"><Link to="/signup">Sign up</Link></AspectRatio>
                  </Column>
                </>
              )
            }
            
            
          </Grid>
          
        </div>
        
      </div>
      <EshopHome/>
    </div>
    
  )
}

export default Home;
