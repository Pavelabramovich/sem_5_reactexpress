import React from 'react';
import CategoryBar from '../components/CategoryBar';
import ProductList from '../components/ProductList';

const Shop = () => {
    return (
        <div style={{display: 'flex'}}>
            <div style={{width: 'calc(100% /4)'}}>
                <CategoryBar />
            </div>

            <div style={{width: 'calc(100% * 3/4)'}}>
                <ProductList />
            </div>
        </div>
    );
}

export default Shop;