import React, { useContext } from 'react';
import { Context } from '../index';


import { useState } from 'react'
import styles from './NavBar.module.css';

import {observer} from 'mobx-react-lite';



const Navbar = observer(() => {
  // adding the states 
  const [isActive, setIsActive] = useState(false);
  const {user} = useContext(Context);

  //add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };


  //clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false)
  }

  return (
    <header>
      <nav className={styles.navbar}>
        <a href='#home' className={styles.logo}>Shop</a>

        <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
          <li onClick={removeActive}>
            <a href='#home' className={styles.navLink}>Home</a>
          </li>
          <li onClick={removeActive}>
            <a href='#home' className={styles.navLink}>Catalog</a>
          </li>
          <li onClick={removeActive}>
            <a href='#home' className={styles.navLink}>All products</a>
          </li>
          <li onClick={removeActive}>
            <a href='#home' className={styles.navLink}>Contact</a>
          </li>

          <li onClick={removeActive}>
            {user.isAuth
              ? <a href='#home' className={styles.navLink}>Logout</a>
              : <a href='#home' className={styles.navLink} onClick={() => user.setIsAuth(true)}>Login</a>
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
});


export default Navbar;
