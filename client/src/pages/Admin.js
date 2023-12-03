import Button from '../components/Button';
import CreateCategory from "../components/modals/CreateCategory";
import CreateProduct from "../components/modals/CreateProduct";
import CreateRole from "../components/modals/CreateRole";
import React, { useState } from "react";

import styles from './Admin.module.css';

const Admin = () => {
    const [isProductCreating, setIsProductCreating] = useState(false);
    const [isCategoryCreating, setIsCategoryCreating] = useState(false);
    const [isRoleCreating, setIsRoleCreating] = useState(false);

    return (
        <div style={{display: 'flex', padding: '5px'}}>
            <div style={{width: 'calc(100% /4)'}}>
                <Button style={{width: '95%', background: 'cornflowerblue'}} onClick={() => setIsProductCreating(true)}>
                    Add product
                </Button>
                <Button style={{width: '95%', background: '#A419F2'}} onClick={() => setIsCategoryCreating(true)}>
                    Add category
                </Button>
                <Button style={{width: '95%', background: 'purple'}} onClick={() => setIsRoleCreating(true)}>
                    Add role
                </Button>

                <CreateProduct isOpen={isProductCreating} setIsOpen={setIsProductCreating} />
                <CreateCategory isOpen={isCategoryCreating} setIsOpen={setIsCategoryCreating} />
                <CreateRole isOpen={isRoleCreating} setIsOpen={setIsRoleCreating} />
            </div>

            <div style={{width: 'calc(100% * 3/4)'}}>
                
            </div>
        </div>
    )
}

export default Admin;