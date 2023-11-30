import React, { useContext } from 'react';
import Context from '../index';


const NavBar = () => {
    const {user} = useContext(Context);

    return (
        <div>
            NavBar
        </div>
    );
}

export default NavBar;