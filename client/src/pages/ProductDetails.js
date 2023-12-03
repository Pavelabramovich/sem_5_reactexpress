import React from 'react';

import styles from './ProductDetails.module.css';

const ProductDetails = () => {
    const product = {
        id: 1, 
        name: "lol", 
        description: "d esdsdsf fdsasdsf dgefd s adesd adsfas afesfd bfdbfdfds casd", 
        price: Math.round(Math.random() * 1000), 
        img: 'https://metanit.com/web/react/pics/2.16.png'
    };

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: 'calc(100% /2)'}}>
                <div style={{padding: '25px'}}>
                    <img 
                        src={product.img} 
                        alt={`${product.name}`} 
                        style={{borderRadius: '20px', width: '100%'}}
                    />
                </div>
                
            </div>

            <div style={{width: 'calc(100% /2)', background: 'yellow'}}>
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