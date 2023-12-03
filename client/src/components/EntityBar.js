import React, { useContext } from 'react';
import styles from './EntityBar.module.css';
import { Context } from '../index';
import useForceUpdate from '../utils/useForceUpdate';
import { observer } from 'mobx-react-lite';



function EntityItem(props) {
    return (
        <div {...props} className={`${styles.categoryItem} ${props.selected ? styles.selected : ''}`}>
            <span>{props.name}</span>
        </div>
    );
}


const EntityBar = observer(() => {
    const {adminStore} = useContext(Context);
    const entities = Object.entries(adminStore.entities).map(e => { return {id: e[0], name: e[1]}});

    const forceUpdate = useForceUpdate();
   
    return (
        <div style={{textAlign: 'center'}}>
            <h1 style={{fontSize: '20px', fontWeight: 'bold', marginTop: '8px'}}>Categories</h1>

            <div>
                {entities.map(c => 
                    <EntityItem 
                        selected={c.id === adminStore.selectedEntityId}
                        key={c.id} 
                        name={c.name} 
                        onClick={() => {  adminStore.selectEntityById(c.id); forceUpdate(); }} 
                    />
                )}
            </div> 
        </div>
    ); 
});

export default EntityBar;