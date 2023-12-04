import React, { useContext } from 'react';
import styles from './CategoryBar.module.css';
import { Context } from '../index';
import useForceUpdate from '../utils/useForceUpdate';
import { observer } from 'mobx-react-lite';



function CategoryItem(props) {
    return (
        <div {...props} className={`${styles.categoryItem} ${props.selected ? styles.selected : ''}`}>
            <span>{props.name}</span>
        </div>
    );
}


const CategoryBar = observer(() => {
    const {productStore} = useContext(Context);
    const categories = productStore.categories;

    const forceUpdate = useForceUpdate();
   
    return (
        <div style={{textAlign: 'center'}}>
            <h1 style={{fontSize: '20px', fontWeight: 'bold', marginTop: '8px'}}>Categories</h1>

            <div>
                 <CategoryItem 
                    selected={null === productStore.selectedCategory}
                    key={0} 
                    name={"All"} 
                    onClick={() => { productStore.selectCategory(null); forceUpdate(); }} 
                />


                {categories.map(c => 
                    <CategoryItem 
                        selected={c.id === productStore.selectedCategory?.id}
                        key={c.id} 
                        name={c.name} 
                        onClick={() => { productStore.selectCategory(c); forceUpdate(); }} />
                )}
            </div> 
        </div>
    ); 
});

export default CategoryBar;