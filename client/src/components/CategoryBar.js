import React, { useContext } from 'react';
import styles from './CategoryBar.module.css';
import { Context } from '../index';
import useForceUpdate from '../utils/useForceUpdate';

import {observer} from 'mobx-react-lite';


function CategoryItem(props) {
    return (
        <div {...props} className={`${styles.categoryItem} ${props.selected ? styles.selected : ''}`}>
            <span>{props.name}</span>
        </div>
    );
}


const CategoryBar = (props) => {
    const {productStore} = useContext(Context);
    const categories = productStore.categories;

    const forceUpdate = useForceUpdate();
   
    return (
        <div style={{textAlign: 'center'}}>
            <h2>Categories</h2>

            <div>
                {categories.map(c => 
                    <CategoryItem 
                        selected={c.id === productStore.selectedCategory?.id}
                        key={c.id} 
                        name={c.name} 
                        onClick={() => { productStore.selectCategory(c); forceUpdate();}} />
                )}
            </div> 
        </div>
    ); 
}

export default CategoryBar;