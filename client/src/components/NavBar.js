import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink } from 'react-router-dom';

import { useState } from 'react'
import styles from './NavBar.module.css';

import { SHOP_URL, LOGIN_URL } from '../utils/urls';


const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const {userStore} = useContext(Context);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };


  const removeActive = () => {
    setIsActive(false)
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
            <NavLink className={styles.navLink} to={SHOP_URL}>Catalog (home)</NavLink>
          </li>
          <li onClick={removeActive}>
            <NavLink className={styles.navLink} to={SHOP_URL}>Products (home)</NavLink>
          </li>
          <li onClick={removeActive}>
            <NavLink className={styles.navLink} to={SHOP_URL}>Contect (home)</NavLink>
          </li>

          <li onClick={removeActive}>
            {userStore.isAuth
              ? <NavLink className={styles.navLink} to={SHOP_URL}>Logout (home)</NavLink>
              : <NavLink 
                  className={styles.navLink} 
                  to={LOGIN_URL} 
                  onClick={function() {userStore.setIsAuth(true); setIsAuth(true);}}
                >
                  Login
                </NavLink>
            }
          </li>

        </ul>

        <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`}  onClick={toggleActiveClass}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </nav>
    </header>
  );
};


export default Navbar;
