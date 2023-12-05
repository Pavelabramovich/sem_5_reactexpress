import Button from '../components/Button';
import CreateAuthor from "../components/modals/CreateAuthor";
import CreateBook from "../components/modals/CreateBook";
import CreateRole from "../components/modals/CreateRole";
import AdminBookList from "../components/tables/AdminBookList";
import EntityBar from '../components/EntityBar';
import React, { useState } from "react";
import { observer } from 'mobx-react-lite';


const Admin = observer(() => {
    const [isBookCreating, setIsBookCreating] = useState(false);
    const [isAuthorCreating, setIsAuthorCreating] = useState(false);
    const [isRoleCreating, setIsRoleCreating] = useState(false);

    return (
        <div style={{display: 'flex', padding: '5px'}}>
            <div style={{width: 'calc(100% /4)'}}>
                <EntityBar />

                <Button style={{width: '95%', background: 'cornflowerblue'}} onClick={() => {setIsBookCreating(true)}}>
                    Add book
                </Button>
                <Button style={{width: '95%', background: '#A419F2'}} onClick={() => setIsAuthorCreating(true)}>
                    Add author
                </Button>
                <Button style={{width: '95%', background: 'purple'}} onClick={() => setIsRoleCreating(true)}>
                    Add role
                </Button>

                <CreateBook isOpen={isBookCreating} setIsOpen={setIsBookCreating} />
                <CreateAuthor isOpen={isAuthorCreating} setIsOpen={setIsAuthorCreating} />
                <CreateRole isOpen={isRoleCreating} setIsOpen={setIsRoleCreating} />
            </div>

            <div style={{width: 'calc(100% * 3/4)'}}>
                <AdminBookList />
            </div>
        </div>
    )
});

export default Admin;