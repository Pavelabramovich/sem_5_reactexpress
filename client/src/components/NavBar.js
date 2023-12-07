import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import { useState } from 'react'
import styles from './NavBar.module.css';

import { SHOP_URL, LOGIN_URL, ADMIN_URL, REGISTRATION_URL, CART_URL, ORDERS_URL } from '../utils/urls';


const Navbar = observer(() => {
  const [isActive, setIsActive] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const {userStore} = useContext(Context);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false)
  }

  const logOut = () => {
    userStore.setUser(null);
    userStore.setIsAuth(false);
  }


  return (
    <header>
      <nav className={styles.navbar}>
        <NavLink to={SHOP_URL} className={`${styles.logo} ${styles.navLink}`}>Shop</NavLink>

        <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
          <li onClick={removeActive}>
            <NavLink className={styles.navLink} to={SHOP_URL}>Home</NavLink>
          </li>
          <li onClick={removeActive}>
            <NavLink className={styles.navLink} to={SHOP_URL}>Books (home)</NavLink>
          </li>

          

          {userStore.isAuth
            ? <>
                {userStore.user.roleId == 2 &&
                  <li onClick={removeActive}>
                    <NavLink className={styles.navLink} to={ADMIN_URL}>Admin</NavLink>
                  </li>
                }  
                <li onClick={removeActive}>
                  <NavLink className={styles.navLink} to={CART_URL}>Cart</NavLink>
                </li>
                <li onClick={removeActive}>
                  <NavLink className={styles.navLink} to={ORDERS_URL}>Orders</NavLink>
                </li>
                <li onClick={removeActive}>
                  <NavLink className={styles.navLink} to={SHOP_URL} onClick={logOut}>Logout</NavLink>
                </li>
              </> 
            : <>
                <li onClick={removeActive}>
                  <NavLink className={styles.navLink} to={REGISTRATION_URL}>Register</NavLink>
                </li>
                <li onClick={removeActive}>
                  <NavLink className={styles.navLink} to={LOGIN_URL}>Login</NavLink>
                </li>
              </>
          }
        </ul>

        <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`}  onClick={toggleActiveClass}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </nav>
    </header>
  );
});


export default Navbar;
