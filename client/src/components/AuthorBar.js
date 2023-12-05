import React, { useContext } from 'react';
import styles from './AuthorBar.module.css';
import { Context } from '../index';
import useForceUpdate from '../utils/useForceUpdate';
import { observer } from 'mobx-react-lite';



function AuthorItem(props) {
    return (
        <div {...props} className={`${styles.authorItem} ${props.selected ? styles.selected : ''}`}>
            <span>{props.name}</span>
        </div>
    );
}


const AuthorBar = observer(() => {
    const {bookStore} = useContext(Context);
    const authors = bookStore.authors;

    const forceUpdate = useForceUpdate();
   
    return (
        <div style={{textAlign: 'center'}}>
            <h1 style={{fontSize: '20px', fontWeight: 'bold', marginTop: '8px'}}>Authors</h1>

            <div>
                 <AuthorItem 
                    selected={null === bookStore.selectedAuthor}
                    key={0} 
                    name={"All"} 
                    onClick={() => { bookStore.selectAuthor(null); forceUpdate(); }} 
                />


                {authors.map(a => 
                    <AuthorItem 
                        selected={a.id === bookStore.selectedAuthor?.id}
                        key={a.id} 
                        name={a.name} 
                        onClick={() => { bookStore.selectAuthor(a); forceUpdate(); }} />
                )}
            </div> 
        </div>
    ); 
});

export default AuthorBar;