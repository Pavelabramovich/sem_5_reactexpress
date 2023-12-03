import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import ProductStore from './store/ProductStore';
import AdminStore from './store/AdminStore';


export const Context = createContext(null);


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Context.Provider value={{
      userStore: new UserStore(),
      productStore: new ProductStore(),
      adminStore: new AdminStore(),
    }}>

      <App />
    </Context.Provider>
  </React.StrictMode>
);
