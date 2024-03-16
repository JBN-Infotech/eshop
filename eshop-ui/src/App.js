import './App.scss';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import { AppConfig } from './constants/App.config';
import { pagePath } from './helpers/routes.helper';

import EsHeader from './components/layout/esHeader';
import EsSideNav from './components/layout/esSideNav';

import Home from './components/Home';

import Login from './components/Users/Login';
import SignUp from './components/Users/SignUp';

import CategoryList from './components/Categories/CategoryList';
import CategoryShow from './components/Categories/CategoryShow';
import CategoryForm from './components/Categories/CategoryForm';

import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';
import UserShow from './components/Users/UserShow';
import ProductList from './components/Products/ProductList';
import ProductForm from './components/Products/ProductForm';
import ProductShow from './components/Products/ProductShow';


function App() {
  const sideBarVisibility = useSelector(state => state.sideBar.visible);
  return (
    <div className="App">
      <div className='es-app-header'>
        <EsHeader/>
      </div>
      <div className='es-app-body'>
        {
          sideBarVisibility && (
            <div className='es-app-side-nav'>
              <EsSideNav/>
            </div>
            )
        }
        <div className='es-app-content'>
          <Routes>
            <Route path={pagePath(AppConfig.home.pageKey)} element={<Home />} />
            <Route path={pagePath(AppConfig.signIn.pageKey)} element={<Login />} />
            <Route path={pagePath(AppConfig.signUp.pageKey)} element={<SignUp />} />
            
            <Route path={pagePath(AppConfig.categoryList.pageKey)} element={<CategoryList/>} />
            <Route path={`${pagePath(AppConfig.categoryForm.pageKey)}/:id?`} element={<CategoryForm />} />
            <Route path={`${pagePath(AppConfig.categoryShow.pageKey)}/:id`} element={<CategoryShow />} />

            <Route path={pagePath(AppConfig.productList.pageKey)} element={<ProductList/>} />
            <Route path={`${pagePath(AppConfig.productForm.pageKey)}/:id?`} element={<ProductForm />} />
            <Route path={`${pagePath(AppConfig.productShow.pageKey)}/:id`} element={<ProductShow />} />


            <Route path={pagePath(AppConfig.userList.pageKey)} element={<UserList/>} />
            <Route path={`${pagePath(AppConfig.userForm.pageKey)}/:id?`} element={<UserForm />} />
            <Route path={`${pagePath(AppConfig.userShow.pageKey)}/:id`} element={<UserShow />} />
          </Routes>
        </div>
      </div>
      
    </div>
  );
}

export default App;
