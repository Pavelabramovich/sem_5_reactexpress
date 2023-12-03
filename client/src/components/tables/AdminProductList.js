import { useContext, useState } from 'react';
import styles from './AdminProductList.module.css';
import { Context } from '../../index';
import { useNavigate } from 'react-router-dom';
//import { PRODUCT_URL } from '../utils/urls';
import { InputGroup, Control, ErrorLabel } from '../Control';
import { observer } from 'mobx-react-lite';
import Button from '../Button';
import UpdateProduct from '../modals/UpdateProduct';

import useForceUpdate from '../../utils/useForceUpdate';


function ProductItem(props) {
    //const navigate = useNavigate();
    const [isProductUpdating, setIsProductUpdating] = useState(false);
    const [product, setProduct] = useState(props.product || null);
    

    return (
        <div
            {...props} 
            className={`${styles.productItem} ${props.selected ? styles.selected : ''}`} 
            style={{display: 'flex', justifyContent: 'space-between'}}
        >
            <img 
                src={process.env.REACT_APP_API_URL + product.img} 
                alt={`${product.name}`} 
                style={{height: '100px', borderRadius: '15px', display: 'flex'}}
            />
            <span style={{display: 'flex'}}>

            <div style={{display: 'flex'}}>
                <div style={{alignSelf: 'center'}}>{product.name}</div>
            </div>
            
            <Button style={{width: '50%', marginLeft: '10px', background: 'red'}} onClick={() => {}}>
                Delete
            </Button>

            <Button 
                style={{width: '95%', marginLeft: '10px', background: 'purple'}} 
                onClick={() => setIsProductUpdating(true)}
            >
                Update
            </Button>

            <UpdateProduct product={product} isOpen={isProductUpdating} setIsOpen={setIsProductUpdating} reload={setProduct}/>
            
           </span>
        </div>
    );
}


const ProductList = observer(() => {
    const {productStore} = useContext(Context);
    const products = productStore.products;

    return (
        <div style={{display: 'block'}}>
            {products.map(p => 
                <ProductItem 
                    key={p.id} 
                    product={p}
                />
            )}
        </div>
    );
});

export default ProductList;