import { Add, Edit, ArrowLeft } from '@carbon/react/icons';

export const AppConfig = {
  home: {
    pageKey: 'home',
    title: 'Home',
    url: '/'
  },
  

  // CAREGORIES
  categoryList: {
    pageKey: 'categoryList',
    title: 'Categories',
    url: '/categories',
    actions: [{icon: Add, page: 'categoryForm', label: 'Add Category'}],
    search: true,
  },
  categoryForm: {
    pageKey: 'categoryForm',
    title: 'Category',
    url: '/categories/form',
    breadcrumbs: ['categoryList'],
    actions: [{icon: ArrowLeft, page: 'categoryList'}],
  },
  categoryShow: {
    pageKey: 'categoryShow',
    title: 'Category',
    url: '/category/show',
    breadcrumbs: ['categoryList'],
    actions: [
      {icon: ArrowLeft, page: 'categoryList'},
      {icon: Edit, page: 'categoryForm', label: 'Edit Category', getParams: true}
    ]
  },

  // USERS
  signIn: {
    pageKey: 'signIn',
    title: 'Sign In',
    url: '/signin'
  },
  signUp: {
    pageKey: 'signUp',
    title: 'Sign Up',
    url: '/signup'
  },
  userList: {
    pageKey: 'userList',
    title: 'Users',
    url: '/users',
    actions: [{icon: Add, page: 'userForm', label: 'Add User'}],
    search: true,
  },
  userForm: {
    pageKey: 'userForm',
    title: 'User',
    url: '/user/form',
    breadcrumbs: ['userList'],
    actions: [{icon: ArrowLeft, page: 'userList'}],
  },
  userShow: {
    pageKey: 'userShow',
    title: 'User',
    url: '/user/show',
    breadcrumbs: ['userList'],
    actions: [
      {icon: ArrowLeft, page: 'userList'},
      {icon: Edit, page: 'userForm', label: 'Edit User', getParams: true}
    ]
  },

  //PRODUCTS
  productList: {
    pageKey: 'productList',
    title: 'Products',
    url: '/products',
    actions: [{icon: Add, page: 'productForm', label: 'Add Product'}],
    search: true,
  },
  productForm: {
    pageKey: 'productForm',
    title: 'Product',
    url: '/products/form',
    breadcrumbs: ['productList'],
    actions: [{icon: ArrowLeft, page: 'productList'}],
  },
  productShow: {
    pageKey: 'productShow',
    title: 'Product',
    url: '/product/show',
    breadcrumbs: ['productList'],
    actions: [
      {icon: ArrowLeft, page: 'productList'},
      {icon: Edit, page: 'productForm', label: 'Edit Product', getParams: true}
    ]
  },
};
