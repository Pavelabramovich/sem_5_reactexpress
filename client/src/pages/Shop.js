import React, { useContext, useEffect, useState } from 'react';
import CategoryBar from '../components/CategoryBar';
import ProductList from '../components/ProductList';
import { InputGroup, Control, ErrorLabel, TextControl } from '../components/Control';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { getCategories, getProducts } from '../http/productAPI';

const Shop = observer(() => {
    const {productStore} = useContext(Context);

    const [search, setSearch] = useState("");

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
                <InputGroup >
                    <Control style={{width: '90%', margin: '15px'}}
                        value={search}
                        placeholder="Search"
                        onChange={ev => {setSearch(ev.target.value); productStore.setPattern(ev.target.value);}} 
                    />
                </InputGroup>

                <CategoryBar />
            </div>

            <div style={{width: 'calc(100% * 3/4)'}}>
                <ProductList />
            </div>
        </div>
    );
});

export default Shop;