import React, { useContext, useEffect } from 'react';
import CategoryBar from '../components/CategoryBar';
import ProductList from '../components/ProductList';

import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { getCategories, getProducts } from '../http/productAPI';

const Shop = observer(() => {
    const {productStore} = useContext(Context);

    useEffect(() => {
        getCategories()
            .then(categories => {
                productStore.setCategories(categories);
            });

        getProducts()
            .then(products => {
                productStore.setProducts(products.rows);
            });
    }, []);

    useEffect(() => {
        getProducts(productStore.selectedCategory?.id)
            .then(products => {
                productStore.setProducts(products.rows);
            });
    }, [productStore.selectedCategory])

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
});

export default Shop;