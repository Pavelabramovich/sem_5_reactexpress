import { useContext } from 'react';
import styles from './ProductList.module.css';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_URL } from '../utils/urls';
import { observer } from 'mobx-react-lite';


function ProductItem(props) {
    const navigate = useNavigate();

    return (
        <div 
            {...props} 
            className={`${styles.productItem} ${props.selected ? styles.selected : ''}`} 
            onClick={() => navigate(PRODUCT_URL.replace(':id', props.product.id))}
            style={{display: 'grid', alignItems: 'end'}}
        >
            <img 
                src={process.env.REACT_APP_API_URL + props.product.img} 
                alt={`${props.product.name}`} 
                style={{width: '100%', borderRadius: '15px'}}
            />
            <div>
                <p>{props.product.name}</p>
                <br/>
                <p style={{fontWeight: 'bold'}}>${props.product.price}</p>
                <br/>
                <p style={{fontSize: '15px'}}>{props.product.description}</p>
            </div>
        </div>
    );
}


const ProductList = observer(() => {
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
});

export default ProductList;