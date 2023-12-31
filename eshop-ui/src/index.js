import React from 'react';
import '../src/assets/stylesheets/index.scss';
import App from './App';
import {createStore} from 'redux'
import { createRoot } from 'react-dom/client';
import {BrowserRouter}  from "react-router-dom";
import rootReducer from '../src/redux/reducers';
import {Provider} from 'react-redux'

const container = document.getElementById('root');
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
)

const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
