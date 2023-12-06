import React, { useContext, useEffect } from 'react';
import styles from './CategoryBar.module.css';
import { Context } from '../index';
import useForceUpdate from '../utils/useForceUpdate';
import { observer } from 'mobx-react-lite';
import { getCategories, getCategoryBooks } from '../http/bookAPI';



function CategoryItem(props) {
    return (
        <div {...props} className={`${styles.categoryItem} ${props.selected ? styles.selected : ''}`}>
            <span>{props.name}</span>
        </div>
    );
}


const CategoryBar = observer(() => {
    const {bookStore} = useContext(Context);

    const forceUpdate = useForceUpdate();

    useEffect(() => {
        getCategories()
            .then(categories => {
                // bookStore.setCategories(categories.map(async (c) => {
                //     c.books = await getCategoryBooks(c.id);
                //     return c;
                // }));

                bookStore.setCategories(categories);
            })
    }, []);

    async function onChange(category) {
        const categoryBooks = await getCategoryBooks(category.id);
        category.books = categoryBooks;

        //alert(categoryBooks)

        bookStore.selectCategory(category); 
        forceUpdate();
    }
   
    return (
        <div style={{textAlign: 'center'}}>
            <h1 style={{fontSize: '20px', fontWeight: 'bold', marginTop: '8px'}}>Categories</h1>

            <div>
                 <CategoryItem 
                    selected={null === bookStore.selectedCategory}
                    key={0} 
                    name={"All"} 
                    onClick={() => { bookStore.selectCategory(null); forceUpdate(); }} 
                />


                {bookStore.categories.map(c => 
                    <CategoryItem 
                        selected={c.id === bookStore.selectedCategory?.id}
                        key={c.id} 
                        name={c.name} 
                        onClick={async () => await onChange(c)} 
                    />
                )}
            </div> 
        </div>
    ); 
});

export default CategoryBar;