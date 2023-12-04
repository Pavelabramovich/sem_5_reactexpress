import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ProductDetails.module.css';
import { getProduct } from '../http/productAPI';

const ProductDetails = () => {
    // const product = {
    //     id: 1, 
    //     name: "lol", 
    //     description: "d esdsdsf fdsasdsf dgefd s adesd adsfas afesfd bfdbfdfds casd", 
    //     price: Math.round(Math.random() * 1000), 
    //     img: 'https://metanit.com/web/react/pics/2.16.png'
    // };
    const [product, setProduct] = useState({});
    const {id} = useParams();

    useEffect(() => {
        getProduct(id)
            .then(product => {
                setProduct(product);
            });
    }, [])

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: 'calc(100% /2)'}}>
                <div style={{padding: '25px'}}>
                    <img 
                        src={process.env.REACT_APP_API_URL + product.img} 
                        alt={product.name} 
                        style={{borderRadius: '20px', width: '100%'}}
                    />
                </div>
                
            </div>

            <div style={{width: 'calc(100% /2)'}}>
                <div style={{padding: '25px'}}>
                    <h1 style={{marginBottom: '45px'}}>{product.name}</h1>
                    <div style={{fontSize: '25px', marginBottom: '35px', wordBreak: 'break-all'}}>
                        {product.description}
                    </div>
                    <p style={{fontSize: '30px'}}>Price: ${product.price}</p>
                </div>
                
            </div>
        </div>
    );
}

export default ProductDetails;