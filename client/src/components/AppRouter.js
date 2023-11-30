import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { authRoutes } from '../routes';
import { publicRoutes } from '../routes';
import { SHOP_URL } from '../utils/urls';


const AppRouter = () => {
    const isAuth = false;

    return (
        <Routes>
            {isAuth && Object.entries(authRoutes).map(([path, component]) => 
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