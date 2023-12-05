import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import BookStore from './store/BookStore';
import AdminStore from './store/AdminStore';


export const Context = createContext(null);


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Context.Provider value={{
      userStore: new UserStore(),
      bookStore: new BookStore(),
      adminStore: new AdminStore(),
    }}>

      <App />
    </Context.Provider>
  </React.StrictMode>
);
