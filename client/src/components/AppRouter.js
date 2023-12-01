import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes } from '../routes';
import { publicRoutes } from '../routes';
import { SHOP_URL } from '../utils/urls';
import { Context } from '../index';


const AppRouter = () => {
    const {userStore} = useContext(Context);

    return (
        <Routes>
            {userStore.isAuth && Object.entries(authRoutes).map(([path, component]) => 
                <Route key={path} path={path} Component={component} exact />
            )}

            {Object.entries(publicRoutes).map(([path, component]) =>
                <Route key={path} path={path} Component={component} exact />
            )}
            
            <Route path='*' Component={publicRoutes[SHOP_URL]} />
        </Routes>
    );
}

export default AppRouter;