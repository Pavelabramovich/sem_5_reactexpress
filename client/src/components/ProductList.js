import { useContext } from 'react';
import styles from './ProductList.module.css';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_URL } from '../utils/urls';


function ProductItem(props) {
    const navigate = useNavigate();

    return (
        <div 
            {...props} 
            className={`${styles.productItem} ${props.selected ? styles.selected : ''}`} 
            onClick={() => navigate(PRODUCT_URL.replace(':id', props.product.id))}
        >
            <img src={props.product.img} alt={`${props.product.name}`} width={'100%'}/>
            <p>{props.product.name}</p>
            <p>{props.product.price}</p>
            <p>{props.product.description}</p>
        </div>
    );
}


const ProductList = () => {
    const {productStore} = useContext(Context);
    const products = productStore.products;

    return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}>
            {products.map(p => 
                <ProductItem 
                    key={p.id} 
                    product={p}
            //      onClick={() => { productStore.selectCategory(c); forceUpdate(); }} 
                    />
            )}
        </div>
    );
}

export default ProductList;